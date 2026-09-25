"use client";

import { useEffect, type RefObject } from "react";

type Box = { left: number; top: number; right: number; bottom: number };

function overlap(a: Box, b: Box) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  return right - left > 1 && bottom - top > 1
    ? { left, top, right, bottom }
    : null;
}

// Text is measured word by word: masking the paragraph's bounding box would
// also erase the artwork in empty space beside or between its lines.
function wordRects(root: Element) {
  const rects: DOMRect[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent || "";
    const words = /\S+/g;
    let match: RegExpExecArray | null;
    while ((match = words.exec(text))) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      rects.push(...Array.from(range.getClientRects()));
      range.detach();
    }
  }
  return rects;
}

export function useHeroOverlapMask(
  layoutRef: RefObject<HTMLDivElement | null>,
  intent: string | null,
) {
  useEffect(() => {
    const layout = layoutRef.current;
    const art = layout?.querySelector<HTMLElement>(".hero-art > .service-art");
    const image = art?.querySelector<HTMLImageElement>("img");
    const heading = layout?.querySelector<HTMLElement>(".hero-copy h1");
    const description = layout?.querySelector<HTMLElement>(".hero-description");
    if (!layout || !art || !image || !heading || !description) return;

    let frame = 0;
    let disposed = false;
    const clear = () => {
      art.style.removeProperty("mask-image");
      art.style.removeProperty("-webkit-mask-image");
      art.dataset.overlapMaskWords = "0";
    };

    const update = () => {
      frame = 0;
      if (disposed || !image.complete || !image.naturalWidth) return;
      const artBox = art.getBoundingClientRect();
      const imageBox = image.getBoundingClientRect();
      if (artBox.width < 1 || artBox.height < 1) return clear();

      // The transparent padding in the WebP is not a visual overlap. Sample
      // its alpha before touching the artwork at a given word.
      const sample = document.createElement("canvas");
      sample.width = 160;
      sample.height = 160;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;
      try {
        sampleCtx.drawImage(image, 0, 0, 160, 160);
      } catch {
        return;
      }
      const pixels = sampleCtx.getImageData(0, 0, 160, 160).data;
      const hasVisiblePixels = (box: Box) => {
        const left = Math.max(0, Math.floor(((box.left - imageBox.left) / imageBox.width) * 160));
        const right = Math.min(159, Math.ceil(((box.right - imageBox.left) / imageBox.width) * 160));
        const top = Math.max(0, Math.floor(((box.top - imageBox.top) / imageBox.height) * 160));
        const bottom = Math.min(159, Math.ceil(((box.bottom - imageBox.top) / imageBox.height) * 160));
        for (let y = top; y <= bottom; y += 2) {
          for (let x = left; x <= right; x += 2) {
            if (pixels[(y * 160 + x) * 4 + 3] > 48) return true;
          }
        }
        return false;
      };

      const overlaps = [...wordRects(heading), ...wordRects(description)]
        .map((word) => overlap(word, artBox))
        .filter((box): box is Box => box !== null && hasVisiblePixels(box));
      if (!overlaps.length) return clear();

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const mask = document.createElement("canvas");
      mask.width = Math.ceil(artBox.width * ratio);
      mask.height = Math.ceil(artBox.height * ratio);
      const ctx = mask.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, artBox.width, artBox.height);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.86)";
      ctx.filter = "blur(3px)";
      for (const box of overlaps) {
        ctx.fillRect(
          box.left - artBox.left - 2,
          box.top - artBox.top - 2,
          box.right - box.left + 4,
          box.bottom - box.top + 4,
        );
      }
      const url = `url("${mask.toDataURL("image/png")}")`;
      art.style.setProperty("mask-image", url);
      art.style.setProperty("-webkit-mask-image", url);
      art.dataset.overlapMaskWords = String(overlaps.length);
    };
    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(layout);
    observer.observe(art);
    observer.observe(heading);
    observer.observe(description);
    image.addEventListener("load", schedule);
    art.addEventListener("animationend", schedule);
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      image.removeEventListener("load", schedule);
      art.removeEventListener("animationend", schedule);
      window.removeEventListener("resize", schedule);
      clear();
    };
  }, [layoutRef, intent]);
}
