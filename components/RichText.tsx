import { Fragment } from "react";

// Exact phrases only: add semantic emphasis without rewriting any copy.
const emphasis: Record<string, "strong" | "em" | "mark"> = {
  "Strategia, design e sviluppo": "strong",
  "crescere online": "em",
  "design, contenuti e funzionalità": "strong",
  "ogni dettaglio": "strong",
  "modo in cui lavori": "em",
  "soluzione digitale": "strong",
  "e-commerce, AI": "strong",
  "pochi tocchi": "em",
  "Il progetto è tuo": "strong",
  "Nessun canone obbligatorio": "strong",
  "Prezzo definito": "strong",
  "Revisioni incluse": "strong",
  "completato il pagamento": "strong",
  "il progetto viene consegnato a te": "em",
  "non per continuare a possederlo": "em",
  "nessuna sorpresa": "em",
  "Vedi e approvi": "strong",
  "piattaforma digitale": "strong",
  "fioristi, clienti e tecnologia": "em",
  "gestione completa degli ordini": "strong",
  "anche in forma dilazionata": "mark",
  "consegna definitiva": "strong",
  "Non serve un brief tecnico.": "em",
  "cosa vuoi ottenere": "strong",
  "Nessun impegno.": "em",
};
const phrases = Object.keys(emphasis).sort((a, b) => b.length - a.length);
export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    let next = text.length;
    let match = "";
    for (const phrase of phrases) {
      const index = text.indexOf(phrase, cursor);
      if (index >= 0 && index < next) {
        next = index;
        match = phrase;
      }
    }
    if (next > cursor) nodes.push(text.slice(cursor, next));
    if (!match) break;
    const Tag = emphasis[match];
    nodes.push(<Tag key={next}>{match}</Tag>);
    cursor = next + match.length;
  }
  return <Fragment>{nodes}</Fragment>;
}
