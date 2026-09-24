"use client";
import { useEffect } from "react";

export function MotionDirector() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading, .project-visual, .project-copy, .benefits li, .service-poster, .process-list li, .price-package, .payment-stages li, .faq-list, .final-copy, .motion-signature, [data-words], .call-sculpture, .call-window",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    const artworks = document.querySelectorAll<HTMLElement>(
      ".hero-art, .call-sculpture, .service-poster",
    );
    const artObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          entry.target.classList.toggle("art-active", entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    artworks.forEach((element) => artObserver.observe(element));
    function configure() {
      observer.disconnect();
      // Read layout once before any style writes to avoid a reflow per element.
      const initiallyVisible = elements.map(
        (element) => element.getBoundingClientRect().top < innerHeight,
      );
      for (const [index, element] of elements.entries()) {
        element.style.setProperty("--reveal-delay", `${(index % 3) * 45}ms`);
        if (preference.matches) {
          element.classList.remove("reveal-ready");
          element.classList.add("is-revealed");
          continue;
        }
        // Keep the initial viewport and previously revealed content visible.
        if (initiallyVisible[index]) {
          element.classList.add("is-revealed");
        }
        element.classList.add("reveal-ready");
        observer.observe(element);
      }
    }
    function revealFocus(event: FocusEvent) {
      const target = event.target as HTMLElement;
      for (const element of elements) {
        if (element.contains(target)) element.classList.add("is-revealed");
      }
    }
    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", revealFocus);
    return () => {
      observer.disconnect();
      artObserver.disconnect();
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", revealFocus);
      for (const element of elements) element.classList.remove("reveal-ready");
    };
  }, []);
  return null;
}
