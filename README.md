# /A — Agency website

Landing editoriale mobile-first in italiano, basata su `design/reference-mobile.png`.
**Versione 1.0.0** · Next.js App Router · React · TypeScript · Tailwind CSS 4.

## Avvio

Richiede Node.js 24 e npm.

```sh
npm ci
npm run dev
```

Aprire `http://localhost:3000`.

```sh
npm run lint
npm run typecheck
npm run build
```

L’export statico è in `out/`. Il progetto usa `output: "export"`: per la build di produzione usare un server statico, per esempio `npx serve out`, non `next start`.

## Funzionalità

- Hero dinamica per `site`, `redesign`, `ecommerce`, `booking`, `other`.
- Query `?intent=ecommerce` con precedenza sulla preferenza salvata nel browser. Parametri non validi vengono ignorati. Se lo storage è disabilitato il sito continua a funzionare.
- La selezione non apre il form. Il preventivo salta il primo step quando esiste un intent; il tasto indietro consente comunque di cambiarlo.
- Funnel a 3 step con validazione, campi condizionali, ritorno ai passaggi precedenti, gestione errori, loading e conferma.
- Dialog nativo: focus contenuto, Escape, ripristino del focus, blocco dello scroll e pagina sottostante non interagibile.
- Accordion FAQ, servizi espandibili, menu mobile e navigazione fra due visual Florame.
- CSS responsive dedicato, focus visibile e `prefers-reduced-motion`. Nessuna libreria UI o di animazione.

## Funnel: demo frontend e invio reale

**Senza configurazione il funnel è una demo esplicita: non spedisce e non conserva i dati di contatto.** Solo l’intent viene salvato in localStorage. I campi rimangono in memoria finché il dialog è aperto.

La conferma conserva la copy richiesta, con una nota visibile “Demo completata · nessuna richiesta inviata”. Non usarla come raccolta contatti prima di collegare il backend.

Per attivare un endpoint, impostare `NEXT_PUBLIC_QUOTE_ENDPOINT` prima della build (vedi `.env.example`). Il browser invia JSON via POST, attende una risposta HTTP 2xx e gestisce errori e timeout di 15 secondi. L’endpoint deve consentire CORS per il dominio pubblicato. I campi sono `intent`, `service` opzionale, `description`, `hasSite`, `url`, `name`, `company`, `phone`, `email`, `version`.

Prima dell’attivazione: implementare validazione server, protezione antiabuso e consegna effettiva; inserire identità del titolare, contatti e informativa privacy reali. Nessun segreto va inserito nelle variabili `NEXT_PUBLIC_*`.

## Asset da fornire

Sostituire i placeholder dichiarati, senza cambiare i percorsi:

```text
public/projects/florame-01.webp
public/projects/florame-02.webp
public/projects/1719-01.webp
public/projects/1719-02.webp
```

Consigliati almeno 1440 × 1080 px, in WebP. Dopo la sostituzione eseguire `npm run assets:responsive` per rigenerare le tre dimensioni del `srcset`. Aggiornare testo alternativo e didascalie in `components/ProjectVisual.tsx` una volta inserite le anteprime vere. Il file `public/projects/ASSETS.md` riepiloga il contratto degli slot.

`public/images/workspace.webp` è un’immagine atmosferica originale generata con imagegen, non una fotografia dello studio. Il prompt e le scelte progettuali sono in `design/DESIGN-SYSTEM.md`. Il wordmark `/A` è temporaneo. Non sono presenti social o dati aziendali inventati.

## Struttura

```text
app/                 Layout, pagina, design tokens e stili responsive
components/          Sezioni e controlli riutilizzabili
data/                Intent, progetti, servizi e FAQ
lib/                 Gestione percorsi asset per GitHub Pages
public/              Font locale, immagini, favicon e slot progetto
design/              Reference e decisioni di design
tests/               Verifiche funzionali e accessibilità
scripts/             Preparazione placeholder e screenshot responsive
qa/                  Screenshot e report dei passaggi di refinement
deployment/          Workflow Actions opzionale
```

## Verifiche browser

Con server locale avviato:

```sh
npx playwright install chromium
npm run test:e2e
npm run qa:screenshots
```

È possibile usare un Chromium esistente impostando `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. `QA_URL` cambia l’URL, `QA_PASS` la cartella di output; `QA_QUICK=1` limita gli screenshot a 390 × 844.

Le acquisizioni complete coprono 375 × 812, 390 × 844, 430 × 932, 768 × 1024, 1280 × 800 e 1440 × 900. Ogni acquisizione registra overflow, dimensioni delle sezioni ed errori browser. I test verificano intent, storage, interazioni, form e audit axe WCAG A/AA.

## Deploy

GitHub Pages pubblica l’export dal branch `codex/pages`. Lo script seguente verifica lint e TypeScript, esegue la build con il base path corretto e pubblica solo `out/`, senza cambiare branch o modificare i sorgenti:

```sh
npm run deploy
```

Richiede Git e GitHub CLI (`gh`) autenticata con accesso alla repository. Committare e pubblicare prima i sorgenti su `main`, poi eseguire il deploy. La pubblicazione Pages prosegue in GitHub: verificarne il completamento con `gh run list`.

L’accesso disponibile durante l’implementazione non comprendeva il permesso OAuth `workflow`, quindi è stato usato il deploy da branch. Per attivare in seguito il deploy automatico a ogni push, il template completo è in `deployment/github-pages.workflow.yml`: copiarlo in `.github/workflows/deploy.yml` usando un accesso autorizzato e impostare Pages su GitHub Actions.

URL previsto: https://lp-00.github.io/agency-website/

Il deploy usa `NEXT_PUBLIC_BASE_PATH=/agency-website`. Per un dominio dedicato impostare il base path vuoto, aggiornare `NEXT_PUBLIC_SITE_URL` e la configurazione Pages. Font e immagini sono serviti localmente, senza dipendenze da CDN esterni.

## Copy e personalizzazione

La headline predefinita è quella richiesta. Le quattro varianti per intent sono copy proposte in `data/intents.ts`. Prezzi e tempi vengono da `data/services.ts`; non sono state aggiunte promesse commerciali numeriche. La gestione IVA e i termini finali del preventivo restano da concordare con l’agenzia.
