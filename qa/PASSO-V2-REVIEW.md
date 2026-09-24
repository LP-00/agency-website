# PASSO 2.0.0 — verifica

## Tre passaggi visivi

1. `passo-pass1`: prima composizione completa a 390 e 1440 px, confrontata con i blocchi Poch e l'identità allegata. Controllati hero, servizi, pricing, call, finestra e form. Individuati vuoti eccessivi nelle schede, peso insufficiente del marchio finale e testo della call poco separato dal fondale.
2. `passo-pass2`: schede più compatte, logo finale ingrandito, finestra call più opaca, allineamenti e motion rifiniti. Acquisite tutte le sei risoluzioni. Emersi overflow di 2 px a 375 px e una larghezza ereditata dalla v1 nel testo dei progetti desktop.
3. `passo-final`: gutter corretto, portfolio desktop a piena larghezza, hero tablet affiancata, contrasti corretti. Verificati immagini, form, footer e headline. Nessun overflow del documento nelle sei risoluzioni.

## Dieci punti di refinement controllati

- Identità PASSO e proporzione del monogramma rispetto al lettering.
- Scala del visual nella hero e rapporto con le tre righe dell'H1.
- Composizione tablet autonoma: copy e immagine affiancate, selector sotto.
- Leggibilità dei selettori glass e stato selezionato pieno.
- Densità e spaziature interne delle sei schede servizio.
- Prezzo ancorato alla base del contenuto e CTA separata nel pricing.
- Larghezza del testo portfolio e continuità delle gallerie.
- Contrasto del blocco call, finestra, lettering e label.
- Grandezza del wordmark finale e allineamento delle informazioni nel footer.
- Gutter, swipe, focus, tipografia e assenza di overflow a 375/390/430/768/1280/1440 px.

## Verifiche funzionali

11 test Playwright passati: cinque intent e query, storage opzionale, navigazione radio da tastiera, menu, FAQ, servizi espandibili, gallerie, prezzi, contatori, caricamento immagini, starter del progetto, validazione e percorso completo del preventivo, ritorno agli step, focus, Escape, demo dichiarata. Nessun errore browser in produzione. Axe WCAG A/AA: nessuna violazione nella pagina e nei passaggi del form.

Lint e TypeScript superati; export statico Next.js compilato. Le acquisizioni finali riportano dimensioni e verifiche in `passo-final/measurements.json`. Gli elementi grafici ruotati possono oltrepassare il proprio box ma sono ritagliati dalla sezione; il documento non scorre orizzontalmente.

## Prestazioni e limiti

Prima misurazione Lighthouse 13.5 locale su Python HTTP senza compressione: Performance 52, Accessibilità 100, Best Practices 100, SEO 100; LCP 6,4 s, CLS 0,001. Il JSON completo è locale in `qa/lighthouse-passo-v2.json`. Il processo ha scritto il report e ha poi segnalato EPERM nella pulizia della cartella temporanea Chrome. Non è un errore del sito. Il successivo intervento ha separato letture e scritture del layout in MotionDirector. Il punteggio Performance non è presentato come obiettivo raggiunto; la misurazione pubblica viene registrata dopo il deploy.

Il preventivo resta una demo frontend esplicita finché non viene configurato `NEXT_PUBLIC_QUOTE_ENDPOINT`. I pulsanti call usano il percorso preventivo: nessun recapito o calendario è stato inventato. Logo ricostruito dalla reference, sostituibile col master ufficiale.

## Pubblicazione

La versione e il commit realmente pubblicati sono verificabili in https://lp-00.github.io/agency-website/deployment.json. Il branch di pubblicazione è `codex/pages`; i sorgenti sono su `main`.

Pubblicazione verificata il 24 settembre 2026: Pages `built`, versione `2.0.0`, sorgente applicativo `db2f0fdb3282b542bb6773014a5c1f8b4f8d226e`, commit Pages `4aafbd2d1a11136498a39b8c6872d8755256818e`. Smoke test sull'URL pubblico: intent e-commerce, versione footer, tutte le immagini, starter Web app AI e trasferimento del brief al contatto, desktop senza overflow e nessun errore JavaScript.

Lighthouse 13.5 mobile sul sito pubblico, dopo l'ottimizzazione dei layout: **66 Performance / 100 Accessibilità / 100 Best Practices / 100 SEO**. LCP **2,7 s**, TBT **1.650 ms**, CLS **0**. Report locale: `qa/lighthouse-passo-live.json`. Il target Performance >90 rimane aperto: la priorità successiva è ridurre il lavoro iniziale di rendering e idratazione sui dispositivi meno potenti, preservando le interazioni. Non si attribuiscono alla v2 i punteggi della vecchia landing.
