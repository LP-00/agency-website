"use client";
import { useState } from "react";
import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { WordReveal } from "./WordReveal";
import { ServiceArt } from "./ServiceArt";
import { DisclosurePanel } from "./DisclosurePanel";
import { QuoteButton } from "./QuoteButton";
import { Icon } from "./Icon";
import { HorizontalRail } from "./HorizontalRail";
export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section
      id="servizi"
      className="section services passo-services"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Cosa possiamo realizzare"
          id="services-heading"
        >
          <WordReveal text="Il prossimo passo" />
          <br />
          <em>del tuo business.</em>
        </SectionHeading>
        <HorizontalRail
          label="Servizi"
          className="service-collection grid-on-desktop"
          autoplay
        >
          {services.map((s, i) => (
            <article className="service-poster" key={s.id}>
              <div className="service-poster-top">
                <span className="eyebrow">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="service-from">
                  {s.price ? (
                    <>
                      Da <strong>{s.price} €</strong>
                    </>
                  ) : (
                    "Su misura"
                  )}
                </span>
              </div>
              <ServiceArt name={s.image} />
              <div className="service-poster-copy">
                <h3>{s.title}</h3>
                <p>{s.note}</p>
                <button
                  className="service-row service-disclosure"
                  aria-expanded={expanded === s.id}
                  aria-controls={`service-${i}`}
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <span>Ad esempio</span>
                  <Icon name="plus" />
                </button>
                <DisclosurePanel
                  id={`service-${i}`}
                  open={expanded === s.id}
                  className="service-examples"
                >
                  <ul>
                    {s.examples.map((example) => (
                      <li key={example}>
                        <Icon name="check" />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <p>{s.description}</p>
                  <QuoteButton
                    className="button-text"
                    intent={s.intent}
                    service={s.title}
                    arrow
                  >
                    Parliamo del progetto
                  </QuoteButton>
                </DisclosurePanel>
              </div>
            </article>
          ))}
        </HorizontalRail>
        <a href="#prezzi" className="text-link service-link">
          Vedi tutti i servizi <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
