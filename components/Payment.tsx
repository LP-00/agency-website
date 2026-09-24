import { SectionHeading } from "./SectionHeading";
import { CountUp } from "./CountUp";
import { WordReveal } from "./WordReveal";
export function Payment() {
  return (
    <section
      className="section payment passo-payment"
      aria-labelledby="payment-heading"
    >
      <div className="container">
        <div className="payment-intro">
          <SectionHeading eyebrow="Un passo alla volta" id="payment-heading">
            <WordReveal text="Flessibilità" />
            <br />
            <em>quando serve.</em>
          </SectionHeading>
          <p>
            Un percorso chiaro, anche nei pagamenti. Ogni fase accompagna un
            passo avanti nel progetto.
          </p>
        </div>
        <ol className="payment-stages">
          {[
            [30, "Per iniziare"],
            [20, "Alla prima revisione"],
            [50, "All’approvazione finale"],
          ].map(([value, label], i) => (
            <li key={value}>
              <span className="payment-step">0{i + 1}</span>
              <strong className="payment-figure">
                <CountUp value={Number(value)} />
              </strong>
              <h3>{label}</h3>
              <span className="payment-rule" aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="payment-description">
          Il saldo finale può essere concordato{" "}
          <mark>anche in forma dilazionata</mark>. La{" "}
          <strong>consegna definitiva</strong> avviene una volta{" "}
          <strong>completato il pagamento</strong>.
        </p>
      </div>
    </section>
  );
}
