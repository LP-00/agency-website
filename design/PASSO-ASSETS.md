# PASSO — asset originali v2

Gli otto visual sono stati generati con il tool ImageGen integrato, il 24 settembre 2026. Non sono fotografie dello studio né schermate di lavori per clienti. I prompt integrali e i percorsi degli originali sono in [passo-assets.json](passo-assets.json).

## File utilizzati

| File in public/passo | Concetto | Formato |
| --- | --- | --- |
| landing.webp | Pagina, cursore e progressione | 640 × 640, alpha |
| website.webp | Pagine e architettura dei contenuti | 640 × 640, alpha |
| commerce.webp | Shopping bag e prodotti | 640 × 640, alpha |
| software.webp | Calendario, tempo e flussi | 640 × 640, alpha |
| ai-app.webp | Applicazione e processore connesso | 640 × 640, alpha |
| iot.webp | Camera, sensori e inventario | 640 × 640, alpha |
| call.webp | Conversazione, cornetta scultorea | 640 × 640, alpha |
| hero.webp | Scala architettonica, progresso | 1440 × 960, opaco |

Ceramica avorio, grafite opaca, piccoli dettagli in metallo. Tutti gli alpha sono verificati tramite metadata Sharp. Le immagini quadrate hanno dimensioni esplicite e sono decorative: i titoli e gli esempi comunicano la stessa informazione. Il visual della hero cambia con l'intent.

`scripts/prepare-passo.mjs` converte gli originali nei WebP senza alterare o cancellare i PNG originali. È uno script di produzione asset, non un requisito per avviare o compilare il sito; gli originali sono esterni alla repository. `npm run assets:responsive` rigenera le varianti 480/768/1440 a partire dai master WebP già inclusi.

## Portfolio reale

Screenshot acquisiti dai siti pubblici il 24 settembre 2026, viewport 1440 × 1080. Nessuna UI inventata:

- `public/projects/real/florame-01.webp`: https://florame.ai/
- `public/projects/real/florame-02.webp`: https://florame.ai/pages/florame-ai-landing
- `public/projects/real/1719-01.webp`: https://1719urbanbistrot.it/ — apertura
- `public/projects/real/1719-02.webp`: stesso sito — menu e proposte

I vecchi placeholder rimangono disponibili nei percorsi originali ma non sono utilizzati dalla v2. Si possono sostituire le nuove acquisizioni con screenshot selezionati dall'agenzia, preservando dimensioni e rapporto 4:3.

## Identità e riferimenti

Monogramma SVG e wordmark ricostruiti in `components/Brand.tsx` dalla tavola PASSO fornita dall'utente. Favicon coerente in `public/favicon.svg`. Il lettering usa Manrope: il master vettoriale ufficiale potrà sostituirlo senza cambiare l'impaginazione.

Poch, 21st.dev, Uiverse, LottieFiles e Florame sono stati usati come riferimenti di struttura, interazione e ritmo. Nessun asset Poch, personaggio, volto, componente premium o animazione di terzi è incorporato. I movimenti sono CSS/SVG originali; non servono GIF pesanti, WebGL o dipendenze Lottie per gli effetti presenti.
