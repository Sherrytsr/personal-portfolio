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
const publicRoot = path.join(projectRoot, "public");

function resolvePublicPath(relativePath) {
  const resolvedPath = path.resolve(projectRoot, relativePath);
  if (!resolvedPath.startsWith(`${publicRoot}${path.sep}`)) {
    throw new Error(`Variant path must stay inside public/: ${relativePath}`);
  }
  return resolvedPath;
}

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

  const variantHomeFile = path.basename(variant.output);
  for (const detailPage of variant.detailPages ?? []) {
    const sourceFile = path.basename(detailPage.source);
    const outputFile = path.basename(detailPage.output);
    html = html.replace(
      new RegExp(`href=(["'])${escapeRegExp(sourceFile)}\\1`, "g"),
      `href="${outputFile}"`,
    );

    const detailSource = await readFile(resolvePublicPath(detailPage.source), "utf8");
    const detailHtml = detailSource
      .replace(/href=(["'])index\.html#/g, `href=$1${variantHomeFile}#`)
      .replace(/[ \t]+$/gm, "")
      .replace("<!doctype html>", `<!doctype html>\n<!-- Generated variant detail: ${variant.id}. -->`);
    await writeFile(resolvePublicPath(detailPage.output), detailHtml, "utf8");
  }

  html = html
    .replace(/\sdata-portfolio-item=["'][^"']+["']/g, "")
    .replace("<!doctype html>", `<!doctype html>\n<!-- Generated variant: ${variant.id}. Edit public/index.html and config/portfolio-variants.json. -->`);

  await writeFile(resolvePublicPath(variant.output), html, "utf8");
}
