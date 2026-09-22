import type { Intent } from "./intents";
export const services: {
  title: string;
  price: string;
  timing: string;
  intent: Intent;
  description: string;
  symbol: "site" | "pages" | "shop" | "calendar";
}[] = [
  {
    title: "Sito vetrina",
    price: "1.800",
    timing: "Circa 2 settimane",
    intent: "site",
    description:
      "Una presenza online essenziale e curata per presentare la tua attività e renderti facile da contattare.",
    symbol: "site",
  },
  {
    title: "Sito web",
    price: "4.500",
    timing: "Circa 4–6 settimane",
    intent: "site",
    description:
      "Un sito strutturato intorno ai tuoi contenuti, ai tuoi servizi e alle esigenze delle persone che lo usano.",
    symbol: "pages",
  },
  {
    title: "E-commerce",
    price: "8.500",
    timing: "Circa 6–10 settimane",
    intent: "ecommerce",
    description:
      "Un’esperienza di acquisto completa, dal catalogo al checkout, pensata per il tuo modo di vendere.",
    symbol: "shop",
  },
  {
    title: "Prenotazioni / Gestionale",
    price: "7.500",
    timing: "Tempistiche su progetto",
    intent: "booking",
    description:
      "Prenotazioni, ordini e flussi operativi in uno strumento progettato sulle necessità della tua attività.",
    symbol: "calendar",
  },
];
