import Image from "next/image";
import { asset } from "@/lib/assets";
export function ServiceArt({
  name,
  className = "",
  eager = false,
}: {
  name: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <span className={`service-art ${className}`} aria-hidden="true">
      <Image
        src={asset(`/passo/${name}.webp`)}
        alt=""
        width={640}
        height={640}
        unoptimized
        loading={eager ? "eager" : "lazy"}
      />
    </span>
  );
}
