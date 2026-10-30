import Image from "next/image";
import { asset } from "@/lib/assets";
export function ProjectVisual({
  src,
  name,
  label,
  className = "",
}: {
  src: string;
  name: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`project-visual ${className}`}>
      <Image
        src={asset(src)}
        alt={`Vista mobile di ${name}, ${label}`}
        width={780}
        height={1688}
        sizes="(max-width: 599px) 72vw, (max-width: 1023px) 36vw, 320px"
      />
    </figure>
  );
}
