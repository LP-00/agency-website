import Image from "next/image";
import { asset } from "@/lib/assets";
export function ServiceObject({
  name,
}: {
  name: "site" | "pages" | "shop" | "calendar";
}) {
  return (
    <span className="service-object" aria-hidden="true">
      <Image
        src={asset(`/icons-3d/${name}.webp`)}
        alt=""
        width={256}
        height={256}
        unoptimized
        loading="lazy"
      />
    </span>
  );
}
