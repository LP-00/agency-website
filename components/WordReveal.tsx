import type { CSSProperties } from "react";
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`word-reveal ${className}`} data-words="true">
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i) => (
        <span className="word-mask" aria-hidden="true" key={`${word}-${i}`}>
          <span style={{ "--word-index": i } as CSSProperties}>
            {word}
          </span>{" "}
        </span>
      ))}
    </span>
  );
}
