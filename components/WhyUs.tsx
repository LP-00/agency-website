import { SectionHeading } from "./SectionHeading";
import { Icon, type IconName } from "./Icon";
import { QuoteButton } from "./QuoteButton";
const benefits: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Il progetto è tuo",
    description:
      "Una volta completato il pagamento, il progetto viene consegnato a te.",
    icon: "key",
  },
  {
    title: "Nessun canone obbligatorio",
    description: "Paghi per il lavoro, non per continuare a possederlo.",
    icon: "file",
  },
  {
    title: "Prezzo definito prima di iniziare",
    description: "Massima trasparenza, nessuna sorpresa.",
    icon: "tag",
  },
  {
    title: "Revisioni incluse",
    description: "Vedi e approvi il lavoro prima della pubblicazione.",
    icon: "revision",
  },
];
export function WhyUs() {
  return (
    <section
      id="approccio"
      className="section dark why-us"
      aria-labelledby="why-heading"
    >
      <div className="container split-layout">
        <div className="sticky-heading">
          <SectionHeading eyebrow="Perché noi" id="why-heading">
            Un approccio
            <br />
            diverso,
            <br />
            più giusto.
          </SectionHeading>
        </div>
        <div>
          <ul className="benefits">
            {benefits.map((item) => (
              <li key={item.title}>
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <QuoteButton className="button-light why-cta" />
        </div>
      </div>
    </section>
  );
}
