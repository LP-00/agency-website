# /A — Sistema di icone e motion, v1.1.0

## Direzione

Il nuovo livello visivo conserva integralmente la copy approvata. Grassetti semantici selezionati, corsivi, sottolineature sottili e un evidenziatore crema migliorano la scansione. Le CTA hanno una freccia dedicata, feedback alla pressione e bordi leggibili. Le righe dei servizi e FAQ espongono esplicitamente il controllo di apertura.

## Pictogrammi 3D originali

Quattro immagini create con imagegen per questo progetto, senza marchi o riferimenti a clienti: browser con cursore (`site`), pagine sovrapposte (`pages`), shopping bag (`shop`), calendario con conferma (`calendar`). Ceramica avorio e alluminio grafite opaco, prospettiva ortografica coerente, luce morbida da sinistra. Si usano soltanto nei servizi, con alternative decorative vuote perché il titolo adiacente descrive già il significato.

File trasparenti WebP, 256 × 256 px: `public/icons-3d/`. Ottimizzati con Sharp senza alterare le immagini generate. Le versioni originali sono rimaste nella cartella locale generated_images di Codex. I file WebP sono inclusi nella repository e non dipendono da quella cartella per build o deploy.

Prompt comune:

> Create a single original 3D editorial pictogram on a genuinely transparent background, isolated and centered with generous clear margins, square 1024x1024. Personal icon system for a high-end Italian digital design agency. Restrained tactile sculpture, precisely machined matte graphite black aluminum paired with warm ivory ceramic, monochrome only, understated orthographic three-quarter view, soft upper-left studio light, subtle contact shadows on object itself, crisp bevel edges, exceptionally legible silhouette even at 80px. No surrounding scene, no pedestal, no border, no text, no labels, no logos, no colorful accent, no neon, no chrome glare, no toy-like puffiness, no emoji face. Icon must fill about 65 percent of the image, with entire object visible.

Soggetti aggiunti al prompt: browser verticale con cornice ceramica e cursore grafite; tre lastre pagina sfalsate con pannello frontale avorio; borsa architettonica grafite con manico rigido avorio; calendario avorio con anelli grafite e segno di conferma.

## SVG e movimento

- `BenefitGlyph`: quattro disegni originali con tratti e riferimenti tecnici coerenti.
- `MotionSignature`: percorso fra pagina, struttura e pubblicazione. Tracciamento della linea, comparsa dei nodi e segnale lungo il percorso. Hero desktop e processo su tutti i dispositivi.
- `MotionDirector`: apparizione una sola volta all'ingresso in viewport; spostamento massimo 12 px. Contenuto visibile prima dell'idratazione e con focus da tastiera.
- Accordion a griglia CSS, 240 ms, contenuti chiusi `inert` e nascosti alle tecnologie assistive.
- Interazioni 180–240 ms; sequenze illustrative terminate entro 2,6 secondi. Nessuna animazione perpetua, GIF, canvas, video o libreria aggiuntiva.
- `prefers-reduced-motion` elimina tutte le animazioni e transizioni, anche quando cambia durante la visita.

Le animazioni SVG conservano nitidezza su ogni schermo. Le immagini 3D vengono caricate solo sotto la prima schermata.
