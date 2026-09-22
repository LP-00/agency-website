"use client";
import { useAgency } from "./AgencyProvider";
import { Icon } from "./Icon";
import type { Intent } from "@/data/intents";
export function QuoteButton({
  children = "Richiedi un preventivo",
  className = "",
  intent,
  service,
  arrow = false,
}: {
  children?: React.ReactNode;
  className?: string;
  intent?: Intent;
  service?: string;
  arrow?: boolean;
}) {
  const { openQuote, ready } = useAgency();
  return (
    <button
      type="button"
      className={`button ${className}`}
      disabled={!ready}
      onClick={() => openQuote(intent, service)}
    >
      <span className="button-label">{children}</span>
      {(arrow || className.includes("button-light")) && (
        <Icon name="arrow" className="button-arrow" />
      )}
    </button>
  );
}
