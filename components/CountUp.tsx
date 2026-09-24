"use client";
import { useEffect, useRef, useState } from "react";
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const stop = () => {
      cancelAnimationFrame(frame);
      setCurrent(value);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        if (media.matches) return;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / 1250, 1);
          setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", stop);
    };
  }, [value]);
  return (
    <span ref={ref} className="counter">
      <span aria-hidden="true">
        {current}
        <span className="counter-unit">%</span>
      </span>
      <span className="sr-only">{value}%</span>
    </span>
  );
}
