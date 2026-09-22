import { SectionHeading } from "./SectionHeading";
export function Payment() {
  return (
    <section className="section payment" aria-labelledby="payment-heading">
      <div className="container split-layout">
        <div>
          <SectionHeading eyebrow="Pagamenti" id="payment-heading">
            Flessibilità
            <br />
            quando serve.
          </SectionHeading>
          <p className="payment-description">
            Il saldo finale può essere concordato anche in forma dilazionata. La
            consegna definitiva avviene una volta completato il pagamento.
          </p>
        </div>
        <ol className="payment-list">
          {[
            ["30%", "Per iniziare"],
            ["20%", "Durante il progetto"],
            ["50%", "Saldo finale"],
          ].map(([value, label]) => (
            <li key={value}>
              <span className="payment-value">{value}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
