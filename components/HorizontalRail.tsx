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
  controls = true,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const direction = useRef(1);
  const resumeAt = useRef(0);
  const scheduleNext = useRef<((delay: number) => void) | null>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);
  const pauseForInteraction = useCallback(() => {
    resumeAt.current = Date.now() + 10_000;
    scheduleNext.current?.(10_000);
  }, []);
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
    const track = el;
    let visible = false;
    let timer: number | undefined;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) schedule(3600);
        else clearTimeout(timer);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    function schedule(delay: number) {
      clearTimeout(timer);
      if (!autoplay || count < 2) return;
      timer = window.setTimeout(() => {
        if (
          !visible ||
          document.hidden ||
          media.matches ||
          track.scrollWidth <= track.clientWidth + 2
        ) {
          schedule(3600);
          return;
        }
        const remaining = resumeAt.current - Date.now();
        if (remaining > 0) {
          schedule(remaining);
          return;
        }
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2)
          direction.current = -1;
        if (track.scrollLeft <= 2) direction.current = 1;
        move(current.current + direction.current);
        schedule(3600);
      }, delay);
    }
    scheduleNext.current = schedule;
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      scheduleNext.current = null;
    };
  }, [autoplay, count, move]);
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
        onPointerDown={(e) => {
          pauseForInteraction();
          suppressClick.current = false;
          if (e.pointerType === "mouse" && e.button === 0) {
            drag.current = {
              x: e.clientX,
              scroll: e.currentTarget.scrollLeft,
              moved: false,
            };
          }
        }}
        onPointerMove={(e) => {
          const start = drag.current;
          if (!start) return;
          const distance = e.clientX - start.x;
          if (!start.moved && Math.abs(distance) < 7) return;
          start.moved = true;
          suppressClick.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.classList.add("is-dragging");
          e.currentTarget.scrollLeft = start.scroll - distance;
        }}
        onPointerUp={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("is-dragging");
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onLostPointerCapture={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("is-dragging");
        }}
        onPointerCancel={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("is-dragging");
        }}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        onWheel={pauseForInteraction}
        onTouchStart={pauseForInteraction}
        onFocusCapture={pauseForInteraction}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            pauseForInteraction();
            move(index + (e.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {children}
      </div>
      {controls && (
        <div className="rail-controls">
          <span className="rail-progress" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}{" "}
            <span>/ {String(count).padStart(2, "0")}</span>
          </span>
          <div>
            <button
              className="icon-button"
              aria-label={`Precedente: ${label}`}
              disabled={index === 0}
              onClick={() => {
                pauseForInteraction();
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
                pauseForInteraction();
                move(index + 1);
              }}
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
