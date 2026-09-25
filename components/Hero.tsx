"use client";
import { useRef } from "react";
import { ServiceArt } from "./ServiceArt";
import { RichText } from "./RichText";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { intents } from "@/data/intents";
import { useAgency } from "./AgencyProvider";
import { IntentSelector } from "./IntentSelector";
import { QuoteButton } from "./QuoteButton";
import { Header } from "./Header";
import { useHeroOverlapMask } from "./useHeroOverlapMask";
export function Hero() {
  const { intent, selectIntent } = useAgency();
  const copy = intents.find((item) => item.id === intent) || intents[0];
  const layoutRef = useRef<HTMLDivElement>(null);
  useHeroOverlapMask(layoutRef, intent);
  return (
    <section
      className="hero dark passo-hero"
      data-intent={intent || "site"}
      id="inizio"
      aria-labelledby="hero-heading"
    >
      <div className="hero-image">
        <Image
          src={asset("/passo/hero.webp")}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="container hero-inner">
        <Header />
        <div className="hero-layout" ref={layoutRef}>
          <div className="hero-copy" aria-live="polite" aria-atomic="true">
            <p className="eyebrow hero-eyebrow">Strategia. Design. Sviluppo.</p>
            <h1 id="hero-heading">
              {copy.headline.map((line, index) => (
                <span key={line}>
                  {index === 1 ? (
                    <strong>{line}</strong>
                  ) : index === 2 ? (
                    <em className="headline-accent">{line}</em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            <p className="hero-description">
              <RichText text={copy.description} />
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <ServiceArt key={intent || "site"} name={copy.visual} eager />
          </div>
          <div className="hero-conversion">
            <IntentSelector value={intent} onChange={selectIntent} />
            <QuoteButton className="button-light button-full" />
            <p className="microcopy">
              <RichText text="Nessun impegno. Ti ricontattiamo per capire il progetto." />
            </p>
          </div>
        </div>
        <div className="hero-signoff">
          <span>PASSO — Digital studio</span>
          <span>Ogni progetto, un passo avanti.</span>
          <span aria-hidden="true">↓</span>
        </div>
      </div>
    </section>
  );
}
