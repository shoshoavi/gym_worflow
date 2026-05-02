import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const ASSETS = "/home/a/workspace/whatsapp_bot/assets";
const PUBLIC = "/home/a/workspace/whatsapp_bot/web/public";

// ──────────────────────────────────────────────────────────────
// 1) Logo cleanup: black background → transparent, then trim.
// ──────────────────────────────────────────────────────────────
async function processLogo() {
  const src = `${ASSETS}/logo/image.png`;
  const out = `${PUBLIC}/logo-clever-fit.png`;

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const buf = Buffer.from(data);

  // Convert near-black pixels to transparent. Anything below this luminance
  // gets fully transparent; everything above keeps its color and opacity.
  const THRESHOLD = 60;
  const FEATHER = 30; // soft edge band for partial alpha

  for (let i = 0; i < buf.length; i += channels) {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luma <= THRESHOLD) {
      buf[i + 3] = 0;
    } else if (luma < THRESHOLD + FEATHER) {
      const t = (luma - THRESHOLD) / FEATHER;
      buf[i + 3] = Math.round(255 * t);
    }
  }

  const cleaned = await sharp(buf, { raw: { width, height, channels } })
    .trim({ threshold: 5 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  // Write to both /web/public (served) and /assets/logo (source archive)
  writeFileSync(out, cleaned);
  writeFileSync(`${ASSETS}/logo/clever-fit-transparent.png`, cleaned);

  const meta = await sharp(out).metadata();
  console.log(`logo → ${out}  ${meta.width}×${meta.height}`);
  console.log(`logo → ${ASSETS}/logo/clever-fit-transparent.png`);
}

// ──────────────────────────────────────────────────────────────
// 2) Hero AI watermark removal: crop the bottom strip containing
//    the Gemini sparkle. The sparkle sits around y=1355-1450; the
//    very bottom of the frame is also-just dark floor texture, so
//    losing it costs nothing visually.
// ──────────────────────────────────────────────────────────────
async function processHero() {
  const src = `${ASSETS}/Gemini_Generated_Image_w56td1w56td1w56t.png`;
  const out = `${PUBLIC}/hero-gemini-desktop.png`;

  const meta = await sharp(src).metadata();
  const newHeight = 1340;
  console.log(`hero source: ${meta.width}×${meta.height} → ${meta.width}×${newHeight}`);

  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: newHeight })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`hero → ${out}`);
}

await processLogo();
await processHero();
console.log("done");
