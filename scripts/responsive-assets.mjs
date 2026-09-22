import sharp from "sharp";
for (const source of [
  "images/workspace",
  "projects/florame-01",
  "projects/florame-02",
  "projects/1719-01",
  "projects/1719-02",
]) {
  for (const width of [480, 768, 1440])
    await sharp(`public/${source}.webp`)
      .resize(width)
      .webp({ quality: 82 })
      .toFile(`public/${source}-${width}.webp`);
}
