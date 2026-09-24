"use client";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "./Icon";
export function HorizontalRail({
  children,
  label,
  className = "",
  autoplay = false,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  autoplay?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = Children.count(children);
  const move = useCallback(
    (next: number) => {
      const el = rail.current;
      if (!el) return;
      const slide = el.children[
        Math.max(0, Math.min(next, count - 1))
      ] as HTMLElement;
      el.scrollTo({
        left: slide.offsetLeft - (el.children[0] as HTMLElement).offsetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    },
    [count],
  );
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let visible = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    const interval = autoplay
      ? window.setInterval(() => {
          if (
            visible &&
            !paused &&
            !media.matches &&
            !document.hidden &&
            !el.matches(":hover") &&
            !el.contains(document.activeElement)
          )
            move((current.current + 1) % count);
        }, 5500)
      : undefined;
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [autoplay, paused, count, move]);
  function onScroll() {
    const el = rail.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement;
    let nearest = 0;
    let distance = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const d = Math.abs(
        (child as HTMLElement).offsetLeft - first.offsetLeft - el.scrollLeft,
      );
      if (d < distance) {
        distance = d;
        nearest = i;
      }
    });
    current.current = nearest;
    setIndex(nearest);
  }
  return (
    <div className={`horizontal-rail ${className}`}>
      <div
        ref={rail}
        className="rail-track"
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={onScroll}
        onPointerDown={() => setPaused(true)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            setPaused(true);
            move(index + (e.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {children}
      </div>
      <div className="rail-controls">
        <span className="rail-progress" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}{" "}
          <span>/ {String(count).padStart(2, "0")}</span>
        </span>
        <div>
          {autoplay && (
            <button
              className="icon-button rail-pause"
              aria-label={
                paused ? "Riprendi la galleria" : "Metti in pausa la galleria"
              }
              onClick={() => setPaused(!paused)}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                {paused ? (
                  <path d="m9 5 10 7-10 7Z" />
                ) : (
                  <path d="M8 5v14M16 5v14" />
                )}
              </svg>
            </button>
          )}
          <button
            className="icon-button"
            aria-label={`Precedente: ${label}`}
            disabled={index === 0}
            onClick={() => {
              setPaused(true);
              move(index - 1);
            }}
          >
            <Icon name="arrow" className="rotate-180" />
          </button>
          <button
            className="icon-button"
            aria-label={`Successivo: ${label}`}
            disabled={index === count - 1}
            onClick={() => {
              setPaused(true);
              move(index + 1);
            }}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
