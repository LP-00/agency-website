export const intents = [
  {
    id: "site",
    label: "Nuovo sito",
    longLabel: "Un nuovo sito",
    headline: ["Siti web", "che lavorano", "per te."],
    description:
      "Strategia, design e sviluppo per attività e aziende che vogliono crescere online.",
  },
  {
    id: "redesign",
    label: "Rifare il sito",
    longLabel: "Rifare il mio sito",
    headline: ["Il tuo sito.", "Un nuovo", "inizio."],
    description:
      "Ripensiamo design, contenuti e funzionalità per dare al tuo business il sito che merita.",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    longLabel: "Un e-commerce",
    headline: ["Il tuo negozio.", "Anche", "online."],
    description:
      "E-commerce curati in ogni dettaglio, dal primo prodotto al completamento dell’ordine.",
  },
  {
    id: "booking",
    label: "Prenotazioni",
    longLabel: "Prenotazioni / gestionale",
    headline: ["Meno passaggi.", "Più tempo", "per te."],
    description:
      "Prenotazioni e strumenti di gestione costruiti intorno al modo in cui lavori.",
  },
  {
    id: "other",
    label: "Altro",
    longLabel: "Altro",
    headline: ["La tua idea.", "Il prossimo", "passo."],
    description:
      "Raccontaci cosa vuoi ottenere. Troviamo insieme la soluzione digitale più adatta.",
  },
] as const;
export type Intent = (typeof intents)[number]["id"];
export const isIntent = (value: unknown): value is Intent =>
  intents.some((intent) => intent.id === value);
