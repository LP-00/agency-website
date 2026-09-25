# PASSO 2.3.4 — maschera locale dei visual hero

La sfumatura fissa sul telefono Web app AI è stata rimossa. La hero misura le parole del titolo e del sottotitolo, confronta i loro rettangoli con i pixel visibili dell'immagine e applica una piccola maschera morbida solo nei punti di sovrapposizione. Se non ci sono sovrapposizioni, non imposta alcuna maschera. Il calcolo si aggiorna al cambio di intent, immagine, font e dimensioni della finestra.

Verifica visiva: [390 px, telefono AI con sfumatura puntuale](v234-local-mask/390-ai-app.png) e [700 px, telefono AI integro](v234-local-mask/700-ai-app.png).

Verifica automatica: il test Playwright controlla che a 390 px siano attenuati solo pochi pixel dell'area illustrata, mentre a 700, 768 e 1440 px il telefono AI non abbia maschera. Il controllo responsive completo attraversa tutti gli intent e conferma l'assenza di overflow orizzontale.
