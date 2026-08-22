"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import MessageBubble from "@/components/MessageBubble";
import SearchBar from "@/components/AI/SearchBar";
import { useSmartAutoScroll } from "@/hooks/useSmartAutoScroll";
import { useSession } from "@/lib/SessionContext";
import type { Message, ModelOption } from "@/lib/types";
import { TbGalaxy } from "react-icons/tb";
import { useCreateConversation } from "@/hooks/useCreateConversation";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { LuMessageSquareShare } from "react-icons/lu";
import ShareModal from "@/components/ShareModal";

export default function Chat({
  initialConversation,
  activeConversationId,
  setActiveConversationId,
}: {
  initialConversation?: { id: string; data: Message[] };
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
}){
  const { session } = useSession();
  const userId = session?.user?.id ?? null;
  const params = useParams();
  const router = useRouter();
  const conversationIdFromUrl = (params as { conversationId?: string })?.conversationId;

  // keep messages state and a ref to avoid stale closures
  const [messages, setMessages] = useState<Message[]>(initialConversation?.data ?? []);
  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [models, setModels] = useState<ModelOption[]>([]);
  const [model, setModel] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const { containerRefChat, bottomRef, autoScroll, scrollToBottom } = useSmartAutoScroll<HTMLDivElement>([messages]);

  // toast helper
  const showToast = useCallback((text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // load models
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/models`);
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        setModels((json?.data ?? []) as ModelOption[]);
        if (Array.isArray(json?.data) && json.data.length > 0) setModel((json.data[0] as ModelOption).id);
      } catch (err) {
        console.warn("Failed to fetch models", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // save message helper (fire-and-forget)
  const saveMessageToBackend = useCallback(async (m: Message) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: m.conversation_id,
          userId: m.user_id ?? null,
          role: m.role,
          content: m.content,
          model: m.model_used ?? null,
        }),
      });
    } catch (err) {
      console.warn("saveMessage failed", err);
    }
  }, []);

  const { createConversation } = useCreateConversation({ model, setActiveConversationId, showToast });

  // sync activeConversationId with URL param
  useEffect(() => {
    if (conversationIdFromUrl && conversationIdFromUrl !== activeConversationId) {
      setActiveConversationId(conversationIdFromUrl);
    }
  }, [conversationIdFromUrl, activeConversationId, setActiveConversationId]);

  // send message (robust — avoids stale closures)
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      let cid = activeConversationId;

      // If no conversation exists, create one
      if (!cid) {
        const newCid = await createConversation(text.slice(0, 50));
        if (!newCid) {
          showToast("Failed to create conversation");
          return;
        }
        cid = newCid;
        setActiveConversationId(newCid);
        try {
          router.replace(`/chat/${encodeURIComponent(newCid)}`);
        } catch {
          // ignore
        }
      }

      const userMsgId = uuidv4();
      const assistantMsgId = uuidv4();
      const createdAt = new Date().toISOString();

      const userMsg: Message = {
        id: userMsgId,
        conversation_id: cid!,
        user_id: userId,
        role: "user",
        content: text,
        model_used: model ?? undefined,
        created_at: createdAt,
      };

      const assistantPlaceholder: Message = {
        id: assistantMsgId,
        conversation_id: cid!,
        user_id: userId,
        role: "assistant",
        content: "",
        model_used: model ?? undefined,
        created_at: createdAt,
      };

      // Optimistic UI: append user message and assistant placeholder
      setMessages((prev) => {
        const next = [...prev, userMsg, assistantPlaceholder];
        messagesRef.current = next;
        return next;
      });

      // persist user message
      void saveMessageToBackend(userMsg);
      setIsStreaming(true);

      try {
        // compose history to send: take latest messagesRef for consistent snapshot
        const history = messagesRef.current
          .filter((m) => m.role !== "system" && m.conversation_id === cid)
          .map((m) => ({ role: m.role, content: m.content }));

        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            model,
            userMessages: [...history, { role: "user", content: text }],
          }),
        });

        if (!resp.ok) {
          throw new Error(`Backend returned ${resp.status}`);
        }

        const json = await resp.json();
        const reply =
          (json?.providerResp?.choices?.[0]?.message?.content as string | undefined) ??
          (json?.providerResp?.choices?.[0]?.text as string | undefined) ??
          "…";

        // update placeholder with reply
        setMessages((prev) => {
          const updated = prev.map((m) => (m.id === assistantMsgId ? { ...m, content: reply } : m));
          messagesRef.current = updated;
          return updated;
        });

        const finalMsg: Message = { ...assistantPlaceholder, content: reply };
        void saveMessageToBackend(finalMsg);
      } catch (err) {
        console.error("sendMessage error", err);
        showToast("AI response failed");
        setMessages((prev) => {
          const updated = prev.map((m) => (m.id === assistantMsgId ? { ...m, content: "Error: Could not generate response." } : m));
          messagesRef.current = updated;
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [activeConversationId, createConversation, model, saveMessageToBackend, setActiveConversationId, showToast, userId, router]
  );

  const currentMessages = useMemo(() => messages.filter((m) => m.conversation_id === activeConversationId), [messages, activeConversationId]);

  const handleExport = useCallback(async () => {
    try {
      const cid = activeConversationId;
      if (!cid) return;
      const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${encodeURIComponent(cid)}`);
      if (!r.ok) return;
      const j = await r.json();
      const arr: Message[] = Array.isArray(j.data) ? j.data : [];
      const txt = arr.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
      const blob = new Blob([txt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `galuxium-${cid}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  }, [activeConversationId]);

  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="h-[7vh] text-center justify-center flex items-center px-4 shadow-xs shadow-secondary ">
          <h1 className="text-xl font-normal text-primary-text">Galuxium</h1>

          {currentMessages.length !== 0 && (
            <div className="px-3 flex flex-row gap-1 md:gap-5 absolute right-0 md:right-10">
              <button onClick={() => setIsShareOpen(true)} className="w-full flex px-2 py-1 flex-row gap-2 text-left text-sm hover:bg-secondary/50 rounded-md">
                <LuMessageSquareShare size={20} />
                <p className="hidden md:block">Share</p>
              </button>

              <button onClick={handleExport} className="w-full flex px-2 py-1 flex-row gap-2 text-left text-sm hover:bg-secondary/50 rounded-md">
                <FaEnvelopeOpenText aria-hidden />
                <p className="hidden md:block">Export</p>
              </button>
            </div>
          )}
        </header>

        <div ref={containerRefChat} className="flex-1 px-5 md:px-8 py-6 overflow-y-auto custom-scrollbar">
          {currentMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="text-center opacity-80">
                <p className="text-sm md:text-xl text-gray-500 flex flex-row gap-2 items-center">
                  Powered by{" "}
                  <span className="font-semibold text-primary animate-pulse flex flex-row gap-2 justify-center items-center">
                    Galuxium Intelligence
                    <TbGalaxy />
                  </span>
                </p>
              </div>

              <SearchBar disabled={isStreaming} onSend={(t) => void sendMessage(t)} scrollToBottom={scrollToBottom} autoScroll={autoScroll} models={models} selectedModel={model ?? undefined} onModelChange={(id) => setModel(id)} />
            </div>
          ) : (
            <div className="pb-[15vh]">
              {currentMessages.map((m) => (
                <MessageBubble key={m.id} msg={m} model={m.model_used ?? ""} />
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {currentMessages.length > 0 && (
          <div className="fixed bottom-5 left-0 right-0">
            <SearchBar disabled={isStreaming} onSend={(t) => void sendMessage(t)} scrollToBottom={scrollToBottom} autoScroll={autoScroll} models={models} selectedModel={model ?? undefined} onModelChange={(id) => setModel(id)} />
          </div>
        )}
      </div>

      <ShareModal open={isShareOpen} onClose={() => setIsShareOpen(false)} conversationId={activeConversationId ?? ""} />

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
