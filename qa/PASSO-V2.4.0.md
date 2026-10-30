# PASSO 2.4.0 — portfolio mobile e rail

Verifiche completate il 30 ottobre 2026 sull'export statico di produzione.

- [x] Sei screenshot reali acquisiti a 390 × 844 px, DPR 2: Florame, demo pubblica Hub, pagina fiorista, pagina Florame AI, home 17/19 e menu.
- [x] Screenshot verticali senza cornici, bordi, padding o didascalie visibili aggiunte. Gallerie sempre navigabili con swipe, mouse e tastiera.
- [x] Loghi trasparenti centrati sul blocco numero + nome, verificati su entrambi i progetti a 375, 390, 430, 768 e 1440 px.
- [x] Domanda della hero a 18–21 px con peso 600; pulsanti non selezionati con bordo più visibile, rilievo discreto e freccia. Selezione, tastiera e focus mantengono il funzionamento originale.
- [x] Titolo servizi: «Possiamo realizzare tutto!».
- [x] Rail servizi e prezzi senza scroll verticale interno. Rotellina e swipe verticale scorrono la pagina; frecce e swipe orizzontale scorrono le card. Testate anche le card servizi espanse.
- [x] Nessun overflow pagina a 375 × 812, 390 × 844, 430 × 932, 768 × 1024, 1280 × 800 e 1440 × 900.
- [x] Tre passaggi visivi: prima composizione, refinement di allineamenti e scroll desktop, controllo dell'export statico con immagini decodificate.
- [x] Lint, TypeScript e build superati. 22 test passati nella suite completa; il restante controllo geometrico della call è passato dopo aver disabilitato l'animazione durante la misura e atteso il font. Totale: 23 verifiche superate.

Screenshot: [hero mobile](v240-final/390-hero.png), [Florame mobile](v240-final/390-florame.png), [17/19 mobile](v240-final/390-1719.png), [servizi mobile](v240-final/390-services.png), [prezzi mobile](v240-final/390-pricing.png), [portfolio desktop](v240-final/1440-florame.png).

Le nuove catture e le varianti WebP pesano complessivamente circa 2 MB. Provenienza e procedura di acquisizione: `public/projects/ASSETS.md` e `scripts/capture-mobile-projects.mjs`.
