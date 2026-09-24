# PASSO 2.2 — revisione visiva e funzionale

- [x] Vetrina: nuovo visual di landing page su telefono e desktop, con CTA leggibile.
- [x] Gestionale: calendario, prenotazioni, attività e presenze su desktop e telefono.
- [x] Web app AI: app documentale con risposte, fonti e chip come dettaglio secondario.
- [x] Tanto altro: visual di un prodotto digitale su misura, con esempi nel pannello espandibile e nessun prezzo inventato. Il pricing mantiene le sei offerte con prezzo definito.
- [x] Sezione Focus rimossa; descrizione della piattaforma spostata sotto `florame.ai` in «I nostri progetti».
- [x] Progetti, servizi e pricing: avanzamento orizzontale quando visibili; pausa immediata dopo input manuale e ripartenza dopo 10 secondi; swipe, mouse e tastiera disponibili. Nessun avanzamento automatico con movimento ridotto.
- [x] Wordmark PASSO: monogramma P ridimensionato e avvicinato alle lettere, baseline verificata. La versione decorativa inclinata è interamente visibile sopra la call anche a 375 px.
- [x] Didascalia specifica per ciascuno dei sei intent della hero.
- [x] Versione aggiornata in app, package, lockfile e README.

Verifica visiva: screenshot di 375×812, 390×844, 430×932, 768×1024, 1280×800 e 1440×900; nessun overflow del documento o errore browser. Passaggio finale con wordmark verificato geometricamente: intervallo orizzontale 63–312 px a 375 px e 65–325 px a 390 px. Screenshot finali ed esiti responsive in `qa/v22-release/`.

La suite funzionale ha coperto 14 test. Un primo controllo axe ha rilevato contrasto insufficiente nel wordmark decorativo; dopo la correzione il test WCAG A/AA della pagina e dei tre step del funnel è passato. Il test temporizzato conferma avanzamento, pausa manuale e ripartenza dopo 10 secondi. Verificato l'avanzamento autonomo su desktop anche per servizi e prezzi. Build TypeScript e lint passati.

Il form mantiene la modalità demo frontend finché non viene configurato un endpoint reale.
