export const intents = [
  {
    id: "site",
    label: "Sito",
    longLabel: "Un sito",
    visual: "website-v3",
    caption: "Un sito che racconta meglio chi sei.",
    headline: ["Il tuo sito.", "Un nuovo", "inizio."],
    description:
      "Ripensiamo design, contenuti e funzionalità per dare al tuo business il sito che merita.",
  },
  {
    id: "ecommerce",
    visual: "commerce-v6",
    caption: "Dal catalogo al carrello, senza attriti.",
    label: "E-commerce",
    longLabel: "Un e-commerce",
    headline: ["Il tuo negozio.", "Anche", "online."],
    description:
      "E-commerce curati in ogni dettaglio, dal primo prodotto al completamento dell’ordine.",
  },
  {
    id: "booking",
    label: "Gestionale",
    longLabel: "Software gestionale e prenotazioni",
    visual: "software-v4",
    caption: "Il lavoro in ordine. Il tempo restituito.",
    headline: ["Meno passaggi.", "Più tempo", "per te."],
    description:
      "Prenotazioni e strumenti di gestione costruiti intorno al modo in cui lavori.",
  },
  {
    id: "ai-app",
    label: "Web app AI",
    longLabel: "Web app con AI avanzata",
    visual: "ai-app-v6",
    caption: "La tua conoscenza, pronta a rispondere.",
    headline: ["La tua app.", "L’AI, al tuo", "servizio."],
    description:
      "Web app su misura con AI avanzata, per semplificare processi e dare forma a nuovi servizi.",
  },
  {
    id: "iot",
    label: "IoT + AI",
    longLabel: "Sistemi IoT con AI avanzata",
    visual: "iot-v6",
    caption: "Ogni segnale diventa un’azione utile.",
    headline: ["Dispositivi.", "Connessi e", "intelligenti."],
    description:
      "Sensori, dispositivi e AI per monitorare scorte, riconoscere ciò che conta e automatizzare il lavoro.",
  },
  {
    id: "other",
    visual: "other-v6",
    caption: "Diamo forma anche alle idee fuori schema.",
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
// Preserve links and preferences saved before the site/redesign consolidation.
export const parseIntent = (value: unknown): Intent | null =>
  value === "redesign" ? "site" : isIntent(value) ? value : null;
