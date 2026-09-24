import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { QuoteButton } from "./QuoteButton";
import { ServiceArt } from "./ServiceArt";
import { WordReveal } from "./WordReveal";
import { HorizontalRail } from "./HorizontalRail";
export function Pricing() {
  return (
    <section
      id="prezzi"
      className="section dark pricing passo-pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <SectionHeading eyebrow="Pricing" id="pricing-heading">
          <WordReveal text="Grandi idee." />
          <br />
          <em>Prezzi chiari.</em>
        </SectionHeading>
        <HorizontalRail
          label="Prezzi e soluzioni"
          className="price-collection grid-on-desktop"
          autoplay
        >
          {services
            .filter((s) => s.price)
            .map((s, i) => (
              <article
                className={`price-package price-package-${i}`}
                key={s.id}
              >
                <div className="package-body">
                  <div className="package-heading">
                    <span className="eyebrow">
                      PASSO / {String(i + 1).padStart(2, "0")}
                    </span>
                    <ServiceArt name={s.image} />
                    <h3>{s.shortTitle}</h3>
                    <p>{s.note}</p>
                  </div>
                  <ul className="package-features">
                    {s.examples.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <div className="package-price">
                    <span>A partire da</span>
                    <p>
                      {s.price}
                      <span> €</span>
                    </p>
                    <small>{s.timing}</small>
                  </div>
                </div>
                <QuoteButton
                  className="button-light package-cta"
                  intent={s.intent}
                  service={s.title}
                  arrow
                >
                  <span aria-hidden="true">Parliamo del progetto</span>
                  <span className="sr-only">
                    Richiedi un preventivo per {s.title}
                  </span>
                </QuoteButton>
              </article>
            ))}
        </HorizontalRail>
        <p className="pricing-footnote">
          Ogni progetto ha il suo percorso. Definiamo insieme funzionalità,
          tempi e prezzo prima di iniziare.
        </p>
      </div>
    </section>
  );
}
