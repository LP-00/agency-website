"use client";
import { ServiceObject } from "./ServiceObject";
import { DisclosurePanel } from "./DisclosurePanel";
import { useState } from "react";
import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { Icon } from "./Icon";
import { QuoteButton } from "./QuoteButton";
export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section
      id="servizi"
      className="section services"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Cosa possiamo realizzare"
          id="services-heading"
        >
          Soluzioni pensate
          <br />
          per il tuo <strong>business.</strong>
        </SectionHeading>
        <div className="service-list">
          {services.map((service, index) => (
            <div className="service" key={service.title}>
              <button
                className="service-row"
                aria-expanded={expanded === service.title}
                aria-controls={`service-${index}`}
                onClick={() =>
                  setExpanded(expanded === service.title ? null : service.title)
                }
              >
                <span className={`service-preview service-preview-${index}`}>
                  <ServiceObject name={service.symbol} />
                </span>
                <span className="service-name">{service.title}</span>
                <span className="service-price">Da {service.price} €</span>
                <Icon name="arrow" className="service-arrow" />
              </button>
              <DisclosurePanel
                id={`service-${index}`}
                open={expanded === service.title}
                className="service-detail"
              >
                <p>{service.description}</p>
                <QuoteButton
                  className="button-text"
                  intent={service.intent}
                  service={service.title}
                  arrow
                >
                  Parliamo del progetto
                </QuoteButton>
              </DisclosurePanel>
            </div>
          ))}
        </div>
        <a href="#prezzi" className="text-link service-link">
          Vedi tutti i servizi <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
