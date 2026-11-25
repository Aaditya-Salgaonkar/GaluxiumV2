// Central place for URL configuration. None of these are required at build
// time; missing values fall back to safe defaults instead of producing
// "undefined/..." URLs or crashing prerendering.

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/** Base URL of the backend API. Empty string means "same origin". */
export const BACKEND_URL = trimSlash(
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE || ""
);

/** Public URL of this frontend, falling back to the current origin in the browser. */
export function getFrontendUrl(): string {
  if (process.env.NEXT_PUBLIC_FRONTEND_URL) {
    return trimSlash(process.env.NEXT_PUBLIC_FRONTEND_URL);
  }
  return typeof window !== "undefined" ? window.location.origin : "";
}
