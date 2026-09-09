import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(projectRoot, "public", "index.html");
const configPath = path.join(projectRoot, "config", "portfolio-variants.json");

const [sourceHtml, configText] = await Promise.all([
  readFile(sourcePath, "utf8"),
  readFile(configPath, "utf8"),
]);
const { variants } = JSON.parse(configText);

if (!Array.isArray(variants) || variants.length === 0) {
  throw new Error("portfolio-variants.json must define at least one variant");
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const variant of variants) {
  let html = sourceHtml;

  for (const item of variant.hiddenItems ?? []) {
    const escapedItem = escapeRegExp(item);
    const blockPattern = new RegExp(
      `\\s*<a(?=[^>]*\\bdata-portfolio-item=["']${escapedItem}["'])[^>]*>[\\s\\S]*?<\\/a>`,
      "g",
    );

    if (!blockPattern.test(html)) {
      throw new Error(`Variant ${variant.id} references missing item: ${item}`);
    }
    html = html.replace(blockPattern, "");
  }

  html = html
    .replace(/\sdata-portfolio-item=["'][^"']+["']/g, "")
    .replace("<!doctype html>", `<!doctype html>\n<!-- Generated variant: ${variant.id}. Edit public/index.html and config/portfolio-variants.json. -->`);

  const outputPath = path.resolve(projectRoot, variant.output);
  if (!outputPath.startsWith(`${path.join(projectRoot, "public")}${path.sep}`)) {
    throw new Error(`Variant output must stay inside public/: ${variant.output}`);
  }
  await writeFile(outputPath, html, "utf8");
}
