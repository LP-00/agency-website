# PASSO 2.3.2 — hero intermedia e selettore progetto

La fascia 600–767 px dispone il visual dell'intent a destra del testo e conserva il selettore sotto l'introduzione. E-commerce e gestionale usano una sfumatura locale più marcata dove il dispositivo passa sotto le parole. Caption e orbita della hero sono state rimosse dal markup e dai dati; «Da dove partiamo?» mostra i sette servizi senza «Non so ancora».

Screenshot statici in [`v232-hero`](v232-hero), inclusi 375, 390, 430, 600, 640, 700, 767, 768, 1024 e 1440 px e il form a 390 px. Le [misure](v232-hero/measurements.json) non riportano overflow orizzontale, elementi decorativi rimasti o errori JavaScript. Tutte le sei varianti di intent sono state verificate a 600, 640, 700 e 767 px nei test Playwright; la suite completa ha 18 test superati. Lint, TypeScript ed export statico sono riusciti.
