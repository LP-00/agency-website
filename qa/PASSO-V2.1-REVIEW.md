# PASSO 2.1 — revisione richiesta

## Modifiche verificate

- [x] Florame: quattro schermate reali, inclusi hub pubblico e pagina Fiori e piante di Nino; ogni immagine apre la pagina corretta.
- [x] Gallerie portfolio e focus senza contatori, frecce e pausa. Swipe, tastiera e trascinamento mouse; il portfolio compie un solo avanzamento automatico, disabilitato con movimento ridotto o interazione.
- [x] Nuove illustrazioni trasparenti per vetrina, sito multipagina, gestionale e telefono a rotella completo. File WebP da 28–62 KB, originali PNG preservati.
- [x] Hero con sei intent: Sito, E-commerce, Gestionale, Web app AI, IoT + AI, Altro. Titolo Sito ripreso dalla precedente variante redesign.
- [x] Alias legacy `redesign` → `site`, query string, persistenza facoltativa e preselezione nel funnel.
- [x] Headline «Cosa abbiamo già costruito quest’anno.» e loghi reali, ruotati e semitrasparenti, posizionati senza modificare il flusso dei testi.
- [x] Processo: lampadina, schizzo e prodotto pronto in SVG; sequenza finita, senza librerie e con fallback statico.
- [x] Prezzi, condizioni di pagamento e copy non coinvolta nella richiesta preservati.

## Verifica visiva

Primo passaggio: individuati e corretti il minimo intrinseco della griglia portfolio che causava overflow mobile, la stringa del titolo e la didascalia sovrapposta alla base del telefono.

Secondo passaggio: ispezione screenshot mobile e desktop; loghi allineati verticalmente ai blocchi testo, nuove illustrazioni leggibili e griglie dei sei intent equilibrate.

Risoluzioni: 375×812, 390×844, 430×932, 768×1024, 1280×800, 1440×900. Nessun overflow del documento o errore browser; headline dei sei intent su tre righe, senza ritorni indesiderati. Gli elementi decorativi segnalati in `measurements.json` sono contenuti dal loro wrapper, non allargano il documento.

Screenshot compressi e misure: `qa/v21-release/`. PNG completi dei passaggi conservati localmente in `qa/v21-pass1/` e `qa/v21-final/`.

## Controlli funzionali

Suite completa: 12 test superati, inclusi accessibilità WCAG A/AA con axe sulla pagina e nei tre step, funnel, prezzi, intent, immagini, riduzione del movimento e sei viewport. Dopo l'aggiunta del trascinamento mouse, ripetuta la suite PASSO comprendente il nuovo test di trascinamento senza apertura accidentale del progetto.

Build di produzione e TypeScript superati. Lint verificato anche dalla procedura di deploy.

Nessun nuovo benchmark Lighthouse: non si attribuiscono punteggi di performance non misurati.

## Limite preesistente

Il funnel resta una demo frontend esplicita finché non viene configurato un endpoint di invio reale. L'immagine hub è la landing pubblica di `hub.florame.ai`, non una schermata amministrativa autenticata.

## Pubblicazione verificata

GitHub Pages: versione **2.1.0**, sorgente `5e45ee19b72aa8cd94c8a62fbb7e8b1832a1428f`, commit di pubblicazione `679d15b5cea753d0ce6b0ef1f360a95f7ef36737`.
Controllo sul sito pubblico: tutte le immagini decodificate, quattro slide Florame, assenza dei controlli galleria, intent IoT e AI nel funnel, zero errori browser e nessun overflow a 390 e 1440 px. Evidenze in `qa/v21-release/live-verification.json`.
