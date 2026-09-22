import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { QuoteButton } from "./QuoteButton";
export function Pricing() {
  return (
    <section
      id="prezzi"
      className="section dark pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <SectionHeading eyebrow="Pricing" id="pricing-heading">
          Prezzi chiari,
          <br />
          senza sorprese.
        </SectionHeading>
        <div className="pricing-grid">
          {services.map((service, index) => (
            <article className="price-card" key={service.title}>
              <span className="price-index" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>
                {service.title === "Prenotazioni / Gestionale"
                  ? "Gestionale / Prenotazioni"
                  : service.title}
              </h3>
              <p className="price-value">Da {service.price} €</p>
              <p className="price-timing">{service.timing}</p>
              <QuoteButton
                className="price-card-link"
                arrow
                intent={service.intent}
                service={service.title}
              >
                <span className="sr-only">
                  Richiedi un preventivo per {service.title}
                </span>
              </QuoteButton>
            </article>
          ))}
        </div>
        <QuoteButton className="button-light pricing-cta" />
      </div>
    </section>
  );
}
