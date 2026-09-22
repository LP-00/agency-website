import sharp from "sharp";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
await mkdir("public/fonts", { recursive: true });
await mkdir("public/images", { recursive: true });
await mkdir("public/projects", { recursive: true });
await copyFile(
  "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  "public/fonts/manrope-latin-variable.woff2",
);
await copyFile(
  "node_modules/@fontsource-variable/manrope/LICENSE",
  "public/fonts/OFL.txt",
);
const original = process.argv[2];
if (original)
  await sharp(resolve(original))
    .resize(1536)
    .webp({ quality: 82 })
    .toFile("public/images/workspace.webp");
// Explicit graphic placeholders, not screenshots or fictional client work.
for (const [slug, title, dark] of [
  ["florame", "Florame", true],
  ["1719", "17/19 Urban Bistrot", false],
]) {
  for (const index of [1, 2]) {
    const bg =
      index === 2 && dark ? "#191d1b" : index === 2 ? "#dad7cf" : "#e5e2da";
    const ink = index === 2 && dark ? "#c3c7bd" : "#706f67";
    const line = index === 2 && dark ? "#424740" : "#c2bfb6";
    const svg = `<svg width="1440" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1440" height="1080" fill="${bg}"/><g stroke="${line}" stroke-width="1" fill="none"><path d="M80 140V80h60m1160 0h60v60M80 940v60h60m1160 0h60v-60"/><path d="M690 475h60m-30-30v60"/></g><g fill="${ink}" font-family="Arial,sans-serif" text-anchor="middle"><text x="720" y="572" font-size="32">${title}</text><text x="720" y="620" font-size="13" letter-spacing="3">ANTEPRIMA DA INSERIRE</text><text x="720" y="972" font-size="14" letter-spacing="2">0${index} / 02</text></g></svg>`;
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(`public/projects/${slug}-0${index}.webp`);
  }
}
await writeFile(
  "public/projects/ASSETS.md",
  "# Asset da sostituire\n\nI quattro WebP sono placeholder dichiarati, non screenshot dei progetti. Sostituirli con immagini reali mantenendo i nomi e, idealmente, una dimensione di 1440 × 1080 px o superiore. I ritagli editoriali sono definiti in CSS. Aggiornare alt e didascalie in components/ProjectVisual.tsx quando si inseriscono gli asset reali.\n",
);
