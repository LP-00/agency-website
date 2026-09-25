# PASSO — Digital studio

Landing editoriale mobile-first in italiano, con identità PASSO, immagini originali e composizioni responsive.
**Versione 2.3.1** · Next.js App Router · React · TypeScript · Tailwind CSS 4.

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

- Hero dinamica per `site`, `ecommerce`, `booking`, `ai-app`, `iot`, `other`. I vecchi link `?intent=redesign` selezionano «Sito».
- Query `?intent=ecommerce` con precedenza sulla preferenza salvata nel browser. Parametri non validi vengono ignorati. Se lo storage è disabilitato il sito continua a funzionare.
- La selezione non apre il form. Il preventivo salta il primo step quando esiste un intent; il tasto indietro consente comunque di cambiarlo.
- Funnel a 3 step con validazione, campi condizionali, ritorno ai passaggi precedenti, gestione errori, loading e conferma.
- Dialog nativo: focus contenuto, Escape, ripristino del focus, blocco dello scroll e pagina sottostante non interagibile.
- Accordion FAQ, servizi espandibili, menu mobile e gallerie Florame e 17/19.
- CSS responsive dedicato, focus visibile e `prefers-reduced-motion`. Nessuna libreria UI o di animazione.
- PASSO: wordmark e monogramma ricostruiti in SVG, favicon e slogan. Hero con scala architettonica, visual per intent, scelte glass e CTA blu.
- Sette servizi con illustrazioni 3D trasparenti originali ed esempi espandibili. «Tanto altro» è su misura e non ha un prezzo inventato; il pricing mostra le sei offerte definite: 1.200 / 4.500 / 8.500 / 7.500 / 10.000 / 10.000 €.
- Portfolio con sei screenshot reali: Florame include sito, hub, pagina fiorista e AI. Gallerie portfolio senza frecce, contatori o pausa; swipe, trascinamento con il mouse e tastiera restano disponibili. Progetti, servizi e prezzi scorrono automaticamente quando visibili: dopo un’interazione manuale si fermano per 10 secondi, poi ripartono. Nessun movimento automatico con `prefers-reduced-motion`. Loghi ufficiali in trasparenza senza modificare il layout dei testi.
- Blocchi «Parliamone», finestra call e «Inizia un progetto». Il brief scritto nella pagina passa direttamente al contatto nel funnel, con possibilità di tornare indietro.
- Reveal delle parole, SVG animati, movimenti brevi degli oggetti e contatori dei pagamenti 30/20/50. Nessuna libreria di animazione o WebGL da caricare.

## Funnel: demo frontend e invio reale

**Senza configurazione il funnel è una demo esplicita: non spedisce e non conserva i dati di contatto.** Solo l’intent viene salvato in localStorage. I campi rimangono in memoria finché il dialog è aperto.

La conferma conserva la copy richiesta, con una nota visibile “Demo completata · nessuna richiesta inviata”. Non usarla come raccolta contatti prima di collegare il backend.

Per attivare un endpoint, impostare `NEXT_PUBLIC_QUOTE_ENDPOINT` prima della build (vedi `.env.example`). Il browser invia JSON via POST, attende una risposta HTTP 2xx e gestisce errori e timeout di 15 secondi. L’endpoint deve consentire CORS per il dominio pubblicato. I campi sono `intent`, `service` opzionale, `description`, `hasSite`, `url`, `name`, `company`, `phone`, `email`, `version`.

Prima dell’attivazione: implementare validazione server, protezione antiabuso e consegna effettiva; inserire identità del titolare, contatti e informativa privacy reali. Nessun segreto va inserito nelle variabili `NEXT_PUBLIC_*`.

## Asset e personalizzazione

Screenshot reali attualmente utilizzati:

```text
public/projects/real/florame-01.webp
public/projects/real/florame-02.webp
public/projects/real/florame-hub.webp
public/projects/real/florame-fiorista.webp
public/projects/real/1719-01.webp
public/projects/real/1719-02.webp
```

Acquisiti il 24 settembre 2026 a 1440 × 1080 px. Dopo una sostituzione eseguire `npm run assets:responsive` per rigenerare il `srcset`. I vecchi placeholder nei percorsi originali non sono più mostrati.

I visual attivi sono in `public/passo/`: sette illustrazioni di servizio, il telefono e la hero architettonica. Sono immagini generate, non foto dello studio. La v2.3 sostituisce i visual di e-commerce, web app AI, IoT e Tanto altro con immagini che mostrano la funzione reale di ciascun servizio; prompt e fonti sono in `design/PASSO-V2.3-ASSETS.md`. La hero mobile mantiene le immagini accanto al titolo, le ingrandisce, sfuma leggermente il bordo sotto al testo e dispone il selettore in due colonne con testi e simboli più leggibili. Il wordmark decorativo della call appare sotto la card. La v2.2.1 ha introdotto la composizione affiancata della hero; la v2.2 ha aggiunto `landing-v4.webp` e `software-v4.webp`, con prompt e fonti in `design/PASSO-V2.2-ASSETS.json`. La sezione Focus è confluita nella descrizione di florame.ai. La v2.1 ha introdotto il telefono e la sequenza SVG lampadina → schizzo → pronto; le fonti sono in `design/PASSO-V2.1-ASSETS.json`. Prompt integrali e provenienza precedenti: `design/PASSO-ASSETS.md` e `design/passo-assets.json`. Il logo SVG è una ricostruzione della reference; può essere sostituito con il master ufficiale. Restano da fornire recapiti reali, eventuale link per le call e dati per l'invio effettivo del preventivo. Non sono presenti social, volti o disponibilità del team inventati.

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

I test includono le cinque headline approvate, le preferenze di movimento, il caricamento degli asset, i sei prezzi, i contatori e il passaggio del brief dalla pagina al funnel. Il report della revisione corrente è in `qa/PASSO-V2-REVIEW.md`. Gli screenshot dei tre passaggi sono in `qa/passo-pass1`, `qa/passo-pass2` e `qa/passo-final`. I punteggi Lighthouse delle versioni precedenti non descrivono questa versione.

Lighthouse mobile sul sito pubblico v2: **66 Performance / 100 Accessibilità / 100 Best Practices / 100 SEO**, LCP 2,7 s e CLS 0. Il target Performance >90 non è ancora raggiunto. Tutti gli 11 test funzionali/accessibilità passano; l'ultimo intervento sul layout è stato ricontrollato con i test di accessibilità e reduced motion.

## Deploy

GitHub Pages pubblica l’export dal branch `codex/pages`. Lo script seguente verifica lint e TypeScript, esegue la build con il base path corretto e pubblica solo `out/`, senza cambiare branch o modificare i sorgenti:

```sh
npm run deploy
```

Richiede Git e GitHub CLI (`gh`) autenticata con accesso alla repository. Committare e pubblicare prima i sorgenti su `main`, poi eseguire il deploy. La pubblicazione Pages prosegue in GitHub: verificarne il completamento con `gh api repos/LP-00/agency-website/pages/builds/latest --jq .status`.

L’accesso disponibile durante l’implementazione non comprendeva il permesso OAuth `workflow`, quindi è stato usato il deploy da branch. Per attivare in seguito il deploy automatico a ogni push, il template completo è in `deployment/github-pages.workflow.yml`: copiarlo in `.github/workflows/deploy.yml` usando un accesso autorizzato e impostare Pages su GitHub Actions.

URL previsto: https://lp-00.github.io/agency-website/

Il deploy usa `NEXT_PUBLIC_BASE_PATH=/agency-website`. Per un dominio dedicato impostare il base path vuoto, aggiornare `NEXT_PUBLIC_SITE_URL` e la configurazione Pages. Font e immagini sono serviti localmente, senza dipendenze da CDN esterni.

## Copy e personalizzazione

La headline predefinita è quella richiesta. Le sei varianti per intent sono copy proposte in `data/intents.ts`. Prezzi e tempi vengono da `data/services.ts`; non sono state aggiunte promesse commerciali numeriche. La gestione IVA e i termini finali del preventivo restano da concordare con l’agenzia.
