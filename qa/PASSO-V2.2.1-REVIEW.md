# PASSO 2.2.1 — hero mobile

- [x] Visual dei sei intent posizionati in alto a destra e centrati sull'area del titolo; la descrizione resta separata.
- [x] Selector disposto su tre colonne e due righe, con altezza minima 54 px e label non spezzate.
- [x] Hero intera nel primo viewport per tutti i sei intent a 375×812, 390×844 e 430×932.
- [x] Didascalie separate dal corpo, incluse le versioni IoT e Altro.
- [x] Tablet e desktop invariati nell'architettura; verificati a 768, 1280 e 1440 px.
- [x] Nessun overflow orizzontale o errore browser nelle acquisizioni.
- [x] Lint, TypeScript, build e 15 test Playwright passati sull'export di produzione.

La hero termina a 793 px nel caso più lungo verificato, e-commerce a 375×812; a 390×844 l'intent Sito termina a 755 px. Screenshot e misure sono in `qa/v221-release/`.

GitHub Pages pubblicato in versione `2.2.1` dal commit `456962c57a58637ce2cbbb024697c7dc4039135a`. La hero è stata ricontrollata sulla pagina online a 375 e 390 px: stesse misure dell'export locale. Passati sul deploy anche il test dei 18 casi mobile (tre viewport × sei intent) e l'audit di accessibilità della pagina e del funnel. Screenshot live in `qa/v221-release/live-375-ecommerce.png` e `live-390-site.png`.
