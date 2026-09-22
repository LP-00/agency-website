import { MotionSignature } from "./MotionSignature";
import { SectionHeading } from "./SectionHeading";
const steps = [
  ["Raccontaci cosa vuoi fare", "Compila il breve questionario."],
  ["Ne parliamo insieme", "Una call per capire obiettivi e funzionalità."],
  ["Ricevi la proposta", "Definiamo lavoro, tempi e prezzo."],
  ["Progettiamo", "Struttura, esperienza e design."],
  ["Sviluppiamo", "Trasformiamo il progetto in un prodotto funzionante."],
  ["Rivediamo insieme", "Completiamo le revisioni."],
  ["Andiamo online", "Il progetto diventa operativo."],
];
export function Process() {
  return (
    <section className="section process" aria-labelledby="process-heading">
      <div className="container split-layout">
        <div className="sticky-heading">
          <SectionHeading eyebrow="Come funziona" id="process-heading">
            Dall’idea
            <br />
            alla <strong>pubblicazione.</strong>
          </SectionHeading>
          <MotionSignature variant="process" />
        </div>
        <ol className="process-list">
          {steps.map(([title, description], index) => (
            <li key={title}>
              <span className="step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
