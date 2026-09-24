import sharp from "sharp";
import { readFile, mkdir, readdir } from "node:fs/promises";
const items = JSON.parse(await readFile("design/passo-assets.json", "utf8"));
await mkdir("public/passo", { recursive: true });
for (const item of items) {
  const metadata = await sharp(item.source).metadata();
  console.log(item.name, metadata.hasAlpha);
  await sharp(item.source)
    .resize(item.name === "hero" ? 1440 : 640)
    .webp({ quality: 84, alphaQuality: 95 })
    .toFile(`public/passo/${item.name}.webp`);
  if (item.name === "hero")
    for (const width of [480, 768, 1440])
      await sharp(item.source)
        .resize(width)
        .webp({ quality: 82 })
        .toFile(`public/passo/hero-${width}.webp`);
}
for (const file of await readdir("public/projects/real")) {
  if (!file.endsWith(".webp") || /-\d{3,4}\.webp$/.test(file)) continue;
  for (const width of [480, 768, 1440])
    await sharp(`public/projects/real/${file}`)
      .resize(width)
      .webp({ quality: 85 })
      .toFile(
        `public/projects/real/${file.replace(".webp", `-${width}.webp`)}`,
      );
}
