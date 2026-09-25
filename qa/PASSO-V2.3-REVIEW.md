# PASSO 2.3 — verifica finale

## Interventi completati

- Web app AI: un solo smartphone con interfaccia di assistente AI riconoscibile, senza chip.
- E-commerce: monitor con catalogo prodotti e telefono con scheda prodotto e acquisto.
- Sistemi IoT con AI: telecamera industriale e monitor che rileva le scorte in magazzino.
- Tanto altro: cartella con brief «Raccontaci la tua idea. Siamo pronti a tutto.».
- Le immagini sono condivise tra hero, servizi e prezzi; asset WebP 640 × 640 con trasparenza.
- Su mobile i visual della hero sono più grandi, con una lieve sfumatura locale quando si avvicinano al testo.
- Il selettore ha due colonne, etichette e SVG più leggibili, maggiore spazio attorno agli elementi e aree interattive alte almeno 50 px.
- La grande firma PASSO è ingrandita e posizionata sotto la card «Facciamo il primo passo».
- Versione aggiornata coerentemente a 2.3.0.

## Verifiche

- `npm run lint`: superato.
- `npm run typecheck`: superato.
- `npm run build`: export statico riuscito.
- Playwright: 16 test superati, inclusi funnel, navigazione da tastiera, accessibilità, rail, viewport hero, immagini e posizionamento della firma.
- Screenshot finali in [`v23-release`](v23-release): hero 375, 390, 430, tablet 768 e desktop 1440; servizi e invito alla call a 390 e 1440.
- Misure in [`measurements.json`](v23-release/measurements.json): nessun overflow orizzontale o errore JavaScript alle larghezze catturate; la hero per tutti e sei gli intent a 390 × 844 resta entro il primo viewport.

## Controllo visivo

Tre passaggi di affinamento hanno corretto scala e significato dei visual, distanza e leggibilità del selettore, collocazione della firma, caption sovrapposte e margine tra card e firma. Le immagini rimangono sostituibili mantenendo gli stessi percorsi dei dati di servizio.

I prompt e il metodo di generazione degli asset sono in [`PASSO-V2.3-ASSETS.md`](../design/PASSO-V2.3-ASSETS.md).
