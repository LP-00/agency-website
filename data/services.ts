import type { Intent } from "./intents";
export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  price: string;
  timing: string;
  intent: Intent;
  description: string;
  examples: string[];
  symbol: "site" | "pages" | "shop" | "calendar";
  image: string;
  note: string;
};
export const services: Service[] = [
  {
    id: "landing",
    title: "Sito vetrina",
    shortTitle: "Sito vetrina",
    price: "1.200",
    timing: "Circa 2 settimane",
    intent: "site",
    symbol: "site",
    image: "landing-v3",
    description:
      "Una presenza essenziale, progettata per presentarti bene e trasformare l’interesse in un primo contatto.",
    examples: [
      "Landing page",
      "Presentazione attività",
      "Richieste e nuovi contatti",
    ],
    note: "Il tuo primo passo online.",
  },
  {
    id: "website",
    title: "Sito web",
    shortTitle: "Sito web",
    price: "4.500",
    timing: "Circa 4–6 settimane",
    intent: "site",
    symbol: "pages",
    image: "website-v3",
    description:
      "Contenuti, servizi e identità organizzati in un sito completo, facile da esplorare e da aggiornare.",
    examples: [
      "Siti aziendali multipagina",
      "Cataloghi e portfolio",
      "CMS e contenuti multilingua",
    ],
    note: "Spazio a tutto quello che fai.",
  },
  {
    id: "commerce",
    title: "E-commerce",
    shortTitle: "E-commerce",
    price: "8.500",
    timing: "Circa 6–10 settimane",
    intent: "ecommerce",
    symbol: "shop",
    image: "commerce",
    description:
      "Un’esperienza di acquisto curata, con prodotti, pagamenti e ordini che lavorano insieme.",
    examples: [
      "Shopify e altre piattaforme",
      "Vendita multicanale",
      "Cataloghi, ordini e integrazioni",
    ],
    note: "Il tuo negozio. Ovunque serva.",
  },
  {
    id: "software",
    title: "Software gestionale e prenotazioni",
    shortTitle: "Software gestionale",
    price: "7.500",
    timing: "Tempistiche su progetto",
    intent: "booking",
    symbol: "calendar",
    image: "software-v3",
    description:
      "Meno passaggi manuali, più controllo. Strumenti costruiti intorno alle persone e al modo in cui lavori.",
    examples: [
      "Prenotazioni e appuntamenti",
      "Gestione presenze",
      "Automazioni e flussi operativi",
    ],
    note: "Più tempo per il tuo lavoro.",
  },
  {
    id: "ai-app",
    title: "Web app con AI avanzata",
    shortTitle: "Web app AI",
    price: "10.000",
    timing: "Tempistiche su progetto",
    intent: "ai-app",
    symbol: "pages",
    image: "ai-app",
    description:
      "Applicazioni su misura che integrano l’intelligenza artificiale nei processi, nei contenuti e nei servizi della tua azienda.",
    examples: [
      "Assistenti su documenti aziendali",
      "Analisi e classificazione dati",
      "Generazione e automazione contenuti",
    ],
    note: "L’intelligenza, dentro il prodotto.",
  },
  {
    id: "iot",
    title: "Sistemi IoT con AI avanzata",
    shortTitle: "Sistemi IoT + AI",
    price: "10.000",
    timing: "Tempistiche su progetto",
    intent: "iot",
    symbol: "site",
    image: "iot",
    description:
      "Colleghiamo dispositivi, sensori e software per leggere ciò che succede nel mondo reale e trasformarlo in azioni utili.",
    examples: [
      "Monitoraggio scorte intelligente",
      "Riconoscimento visivo",
      "Sensori, alert e automazioni",
    ],
    note: "Il mondo fisico, connesso.",
  },
];
