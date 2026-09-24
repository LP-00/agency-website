"use client";
import { intents, type Intent } from "@/data/intents";
import { Icon, type IconName } from "./Icon";
const intentIcons: Record<Intent, IconName> = {
  site: "site",
  "ai-app": "chip",
  iot: "sensor",
  ecommerce: "shop",
  booking: "calendar",
  other: "plus",
};
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
            <Icon name={intentIcons[item.id]} className="intent-glyph" />
            <span className="radio-mark" aria-hidden="true">
              <Icon name="check" />
            </span>
            <span>{variant === "hero" ? item.label : item.longLabel}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
