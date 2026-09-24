"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { parseIntent, type Intent } from "@/data/intents";
const QuoteFlow = dynamic(() => import("./QuoteFlow"), { ssr: false });
type AgencyContext = {
  ready: boolean;
  intent: Intent | null;
  selectIntent: (intent: Intent) => void;
  openQuote: (intent?: Intent, service?: string, description?: string) => void;
};
const Context = createContext<AgencyContext | null>(null);
export function useAgency() {
  const value = useContext(Context);
  if (!value) throw new Error("AgencyProvider missing");
  return value;
}
export function AgencyProvider({ children }: { children: React.ReactNode }) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [service, setService] = useState<string>();
  const [draft, setDraft] = useState<string>();
  useEffect(() => {
    function restore() {
      const query = new URLSearchParams(window.location.search).get("intent");
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("agency-intent");
      } catch {
        /* Storage is optional. */
      }
      const value = parseIntent(query) ?? parseIntent(saved);
      setIntent(value);
      setReady(true);
      if (value) {
        try {
          localStorage.setItem("agency-intent", value);
        } catch {
          /* Private browsing. */
        }
      }
    }
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  const selectIntent = useCallback((value: Intent) => {
    setIntent(value);
    try {
      localStorage.setItem("agency-intent", value);
    } catch {
      /* Optional preference only. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("intent", value);
    window.history.replaceState(null, "", url);
  }, []);
  const openQuote = useCallback(
    (value?: Intent, requestedService?: string, description?: string) => {
      if (value) selectIntent(value);
      setService(requestedService);
      setDraft(description);
      setOpen(true);
    },
    [selectIntent],
  );
  return (
    <Context.Provider value={{ ready, intent, selectIntent, openQuote }}>
      {children}
      {isOpen && (
        <QuoteFlow
          service={service}
          draftDescription={draft}
          onClose={() => setOpen(false)}
        />
      )}
    </Context.Provider>
  );
}
