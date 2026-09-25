# PASSO 2.3.3 — allineamento visual hero

Gli asset trasparenti non condividono lo stesso margine superiore: il soggetto di Web app AI, IoT + AI e Altro appariva più in alto dei primi tre intent pur avendo un contenitore simile. La correzione applica spostamenti verticali al visual, specifici per mobile, fascia intermedia/tablet e desktop, senza modificare la posizione di titolo, sottotitolo, selettore e CTA.

I soggetti visibili iniziano a 390 px circa a 109–116 px; a 700 px i primi tre iniziano a 152–175 px e i tre corretti a 167–175 px. I confronti a 768 e 1440 px e tutte le sei varianti sono negli [screenshot](v233-hero). Le [misure](v233-hero/measurements.json) comprendono top/bottom del soggetto, larghezza della pagina ed errori JavaScript.

Sul telefono AI mobile la parte inferiore sfuma prima del sottotitolo per conservarne la leggibilità. La suite Playwright controlla l'intervallo di allineamento ai quattro viewport e la hero mobile continua a rientrare nel primo schermo.
