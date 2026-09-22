"use client";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { intents } from "@/data/intents";
import { useAgency } from "./AgencyProvider";
import { IntentSelector } from "./IntentSelector";
import { QuoteButton } from "./QuoteButton";
import { Header } from "./Header";
export function Hero() {
  const { intent, selectIntent } = useAgency();
  const copy = intents.find((item) => item.id === intent) || intents[0];
  return (
    <section
      className="hero dark"
      data-intent={intent || "site"}
      id="inizio"
      aria-labelledby="hero-heading"
    >
      <div className="hero-image">
        <Image
          src={asset("/images/workspace.webp")}
          alt=""
          fill
          sizes="(min-width: 1024px) 65vw, (min-width: 768px) 1500px, 1000px"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="container hero-inner">
        <Header />
        <div className="hero-layout">
          <div className="hero-copy" aria-live="polite" aria-atomic="true">
            <p className="eyebrow hero-eyebrow">Strategia. Design. Sviluppo.</p>
            <h1 id="hero-heading">
              {copy.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-description">{copy.description}</p>
          </div>
          <div className="hero-conversion">
            <IntentSelector value={intent} onChange={selectIntent} />
            <QuoteButton className="button-light button-full" />
            <p className="microcopy">
              Nessun impegno. Ti ricontattiamo per capire il progetto.
            </p>
          </div>
          <div className="hero-side-note" aria-hidden="true">
            Costruito intorno a te.<span>Design & sviluppo indipendente</span>
          </div>
        </div>
      </div>
    </section>
  );
}
