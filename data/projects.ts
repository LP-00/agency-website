export const projects = [
  {
    name: "florame.ai",
    description:
      "Abbiamo costruito una piattaforma digitale che connette fioristi, clienti e tecnologia, con e-commerce, AI e gestione completa degli ordini.",
    tags: ["E-commerce", "AI", "Marketplace", "Ordini"],
    url: "https://florame.ai",
    logo: "/projects/logos/florame.webp",
    images: [
      {
        src: "/projects/real/florame-01.webp",
        label: "E-commerce",
        url: "https://florame.ai",
      },
      {
        src: "/projects/real/florame-hub.webp",
        label: "Hub fioristi",
        url: "https://hub.florame.ai/",
      },
      {
        src: "/projects/real/florame-fiorista.webp",
        label: "Pagina del fiorista",
        url: "https://florame.ai/pages/fiori-nino",
      },
      {
        src: "/projects/real/florame-02.webp",
        label: "Florame AI",
        url: "https://florame.ai/pages/florame-ai-landing",
      },
    ],
    number: "01",
  },
  {
    name: "17/19 Urban Bistrot",
    description: "Dal menu alla prenotazione, tutto in pochi tocchi.",
    tags: ["Sito", "Menu", "Eventi", "Prenotazioni"],
    url: "https://1719urbanbistrot.it/",
    logo: "/projects/logos/1719.svg",
    images: [
      {
        src: "/projects/real/1719-01.webp",
        label: "Il bistrot",
        url: "https://1719urbanbistrot.it/",
      },
      {
        src: "/projects/real/1719-02.webp",
        label: "Menu e prenotazioni",
        url: "https://1719urbanbistrot.it/",
      },
    ],
    number: "02",
  },
] as const;
