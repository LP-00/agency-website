import Image from "next/image";
import { asset } from "@/lib/assets";
export function ProjectVisual({
  src,
  name,
  number,
  className = "",
}: {
  src: string;
  name: string;
  number: string;
  className?: string;
}) {
  return (
    <figure className={`project-visual ${className}`}>
      <Image
        src={asset(src)}
        alt={`Schermata del sito ${name}, vista ${number}`}
        width={1440}
        height={1080}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 65vw"
      />
      <figcaption>
        <span>{name}</span>
        <span>Sito online · {number}</span>
      </figcaption>
    </figure>
  );
}
