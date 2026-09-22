"use client";
import { intents, type Intent } from "@/data/intents";
import { Icon } from "./Icon";
export function IntentSelector({
  value,
  onChange,
  variant = "hero",
}: {
  value: Intent | null;
  onChange: (value: Intent) => void;
  variant?: "hero" | "form";
}) {
  return (
    <fieldset className={`intent-selector intent-${variant}`}>
      <legend>
        {variant === "hero" ? (
          "Cosa vuoi realizzare?"
        ) : (
          <span className="sr-only">Tipo di progetto</span>
        )}
      </legend>
      <div className="intent-options">
        {intents.map((item) => (
          <label
            key={item.id}
            className={`intent-option ${value === item.id ? "selected" : ""}`}
          >
            <input
              type="radio"
              name={`intent-${variant}`}
              value={item.id}
              checked={value === item.id}
              onChange={() => onChange(item.id)}
              required={variant === "form"}
            />
            <span className="radio-mark" aria-hidden="true" />
            <span>{variant === "hero" ? item.label : item.longLabel}</span>
            {variant === "hero" && item.id === "other" && <Icon name="arrow" />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
