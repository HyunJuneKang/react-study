import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectDir, "dist");
const sourceHtmlPath = path.join(distDir, "index.html");
const outputHtmlPath = path.join(distDir, "sql-study.html");

const sourceHtml = await readFile(sourceHtmlPath, "utf8");
const scriptTag = sourceHtml.match(
  /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*><\/script>/i,
);
const styleTag = sourceHtml.match(
  /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i,
);

if (!scriptTag || !styleTag) {
  throw new Error("dist/index.html에서 JavaScript 또는 CSS 파일을 찾지 못했습니다.");
}

const assetPath = (url) => path.join(distDir, url.replace(/^\/+/, ""));
const [javascript, css, favicon] = await Promise.all([
  readFile(assetPath(scriptTag[1]), "utf8"),
  readFile(assetPath(styleTag[1]), "utf8"),
  readFile(path.join(distDir, "favicon.svg"), "utf8"),
]);

const safeJavaScript = javascript.replace(/<\/script/gi, "<\\/script");
const safeCss = css.replace(/<\/style/gi, "<\\/style");
const faviconDataUrl = `data:image/svg+xml;base64,${Buffer.from(favicon).toString("base64")}`;

const standaloneHtml = sourceHtml
  .replace('<html lang="en">', '<html lang="ko">')
  .replace("<title>react-study</title>", "<title>SQL Study</title>")
  .replace(
    /<link\b[^>]*\brel=["']icon["'][^>]*>/i,
    () => `<link rel="icon" href="${faviconDataUrl}" />`,
  )
  // 함수형 replacement를 사용해야 번들 안의 $&, $', $`가 치환 문법으로 해석되지 않습니다.
  .replace(
    scriptTag[0],
    () => `<script type="module">\n${safeJavaScript}\n</script>`,
  )
  .replace(styleTag[0], () => `<style>\n${safeCss}\n</style>`);

await writeFile(outputHtmlPath, standaloneHtml, "utf8");

const size = Buffer.byteLength(standaloneHtml);
console.log(`단일 HTML 생성 완료: ${outputHtmlPath}`);
console.log(`파일 크기: ${(size / 1024).toFixed(1)} KB`);
