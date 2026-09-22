"use client";
import type { ImageLoaderProps } from "next/image";
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const size = width <= 480 ? 480 : width <= 768 ? 768 : 1440;
  return src.replace(/\.webp$/, `-${size}.webp`);
}
