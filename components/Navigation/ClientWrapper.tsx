"use client";

import { useState, useCallback } from "react";
import { useSession } from "@/lib/SessionContext";
import Sidebar from "./Sidebar";
import LandingPage from "@/components/LandingPage";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();

  const [collapsed, setCollapsed] = useState(true);
  const [mobileToogleCollapsed, setMobileToogleCollapsed] = useState(false);

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const setActiveConversationIdCb = useCallback((id: string | null) => {
    setActiveConversationId(id);
  }, []);

  if (loading) return null;

  return (
    <div className="flex">
      {session && (
        <div className="z-10">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileToogleCollapsed={mobileToogleCollapsed}
            setMobileToogleCollapsed={setMobileToogleCollapsed}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationIdCb}
          />
        </div>
      )}

      <main
        className={`transition-all duration-300 flex-1 ${
          session ? (collapsed ? "lg:ml-15" : "lg:ml-60") : ""
        }`}
      >
        {session ? children : <LandingPage />}
      </main>
    </div>
  );
}
