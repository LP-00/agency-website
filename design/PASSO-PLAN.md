# PASSO — piano e checklist v2.0.0

## Ricerca completata prima dell'implementazione

- [x] Poch: analizzati DOM e screenshot dei blocchi Pricing, Call Us, Start Project e Call 2. Pricing: card chiare su nero, prezzo grande in fondo, contenuti concreti, CTA separata. Call: tipografia grande e oggetto protagonista. Call 2: finestra sovrapposta al marchio. Start Project: illustrazione, titolo e percorso guidato.
- [x] Florame AI landing: esaminata la pagina reale, enfasi per parole e sequenze narrative. Si riprende il ritmo, non le promesse commerciali del prodotto.
- [x] 21st.dev: confrontati blur reveal, animazioni di testo, gallerie orizzontali e pricing. Uiverse: controlli tattili e trasparenti. LottieFiles: microanimazioni di chiamata e icone. Implementazione originale, senza copiare pacchetti a pagamento o aggiungere dipendenze per effetti semplici.
- [x] Orangekit: tentata consultazione via web e browser; il dominio non risolve (ERR_NAME_NOT_RESOLVED). Non si attribuiscono componenti a una risorsa non consultabile.
- [x] Identità allegata: PASSO., monogramma P a gradini, slogan «Ogni progetto, un passo avanti.», avorio, grafite, solidità e progressione.

## Decisioni

La direzione precedente evolve secondo l'ultima richiesta: maggiore presenza delle immagini, sequenze 2D/3D, vetro limitato al selettore della hero e alla finestra call; blu profondo per le CTA. Manrope per il sito. Logo vettoriale ricostruito dalla reference, da sostituire con il master ufficiale se disponibile. Nessun volto/team o stato «online» inventato.

Servizi: sito vetrina 1.200 €, sito web 4.500 €, e-commerce 8.500 €, software gestionale 7.500 €, web app AI 10.000 €, IoT AI 10.000 €. Gli ultimi due sono nuovi, gli altri prezzi restano quelli approvati salvo il vetrina. Esempi specifici per ciascuno. Pagamenti: 30% per iniziare, 20% alla prima revisione, 50% all'approvazione finale.

## Ordine di lavoro e criteri di completamento

- [x] Brand: wordmark, monogramma, favicon, metadata e slogan coerenti.
- [x] Asset: sei illustrazioni trasparenti, hero architettonica, telefono; ottimizzazione WebP e provenienza documentata.
- [x] Hero: composizione dedicata mobile/desktop, intent conservati, selettori glass leggibili, CTA blu, visual dinamico.
- [x] Portfolio: screenshot reali dove accessibili, gallerie orizzontali con swipe e frecce, niente slot vuoti o screenshot inventati.
- [x] Servizi: sei proposte con immagini, esempi e dettagli espandibili.
- [x] Pricing: nuova composizione ispirata a Poch, prezzi coerenti, esempi, CTA per servizio.
- [x] Call: grande blocco «Parliamone» e finestra con identità PASSO, collegati a un'azione reale dell'interfaccia.
- [x] Start Project: ingresso dedicato al preventivo, selezione servizio e funnel esistente con validazione.
- [x] Motion: reveal per parola, movimento di immagini, contatori 30/20/50, interazioni; stop fuori viewport e movimento ridotto.
- [x] QA visiva: almeno tre passaggi, sei viewport, nessun overflow o headline spezzata male, immagini complete.
- [x] QA funzionale: intent, gallerie, FAQ, servizi, preventivo, focus, reduced motion, audit accessibilità.
- [x] Consegna: README, versione 2.0.0, lint, TypeScript, build, commit, deploy, verifica URL pubblico.

Si spuntano le voci dopo verifica; non si dichiara perfezione assoluta. Foto del team, recapiti e backend di contatto richiedono dati reali: nell'attesa il percorso usa la demo frontend già dichiarata.

Verifica pubblica completata: versione 2.0.0, commit applicativo `db2f0fd`, asset caricati, intent e passaggio del brief al contatto funzionanti. Lighthouse mobile pubblico: Performance 66, Accessibilità 100, Best Practices 100, SEO 100. Il target Performance >90 non è raggiunto: rimane una priorità di ottimizzazione, documentata nel report QA.

Fonti: https://poch.studio/ · https://21st.dev/community/components/explore/scroll-animation-component · https://uiverse.io/buttons · https://lottiefiles.com/free-animations/phone-call · https://florame.ai/pages/florame-ai-landing
