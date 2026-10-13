/**
 * Generates a detailed PDF of the full dashboard (readable markdown → HTML → Chrome print).
 */
import { execFileSync, execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DASHBOARD_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(DASHBOARD_ROOT, "../../..");
const MD_PATH = path.join(REPO_ROOT, "export", "OneYP-Dashboard-Completo-PT.md");
const HTML_PATH = path.join(REPO_ROOT, "export", "OneYP-Dashboard-Completo-PT.html");
const PDF_PATH = path.join(REPO_ROOT, "export", "OneYP-Dashboard-Completo-PT.pdf");
const PUBLIC_PDF = path.join(DASHBOARD_ROOT, "public", "exports", "OneYP-Dashboard-Completo-PT.pdf");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(s: string): string {
  let t = escapeHtml(s);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return t;
}

function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inUl = false;
  let inBlockquote = false;

  const closeUl = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
  };
  const closeBlockquote = () => {
    if (inBlockquote) {
      out.push("</blockquote>");
      inBlockquote = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (trimmed === "---") {
      closeUl();
      closeBlockquote();
      out.push('<hr class="rule" />');
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeUl();
      closeBlockquote();
      out.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      closeUl();
      closeBlockquote();
      out.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      closeUl();
      closeBlockquote();
      out.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("> ")) {
      closeUl();
      if (!inBlockquote) {
        out.push("<blockquote>");
        inBlockquote = true;
      }
      out.push(`<p>${inlineMarkdown(trimmed.slice(2))}</p>`);
      continue;
    }
    if (trimmed.startsWith("- ")) {
      closeBlockquote();
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    closeUl();
    closeBlockquote();

    if (!trimmed) {
      continue;
    }
    out.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }

  closeUl();
  closeBlockquote();
  return out.join("\n");
}

function wrapHtml(body: string): string {
  const generated = new Date().toISOString().slice(0, 10);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>OneYP Dashboard — Export completo</title>
  <style>
    @page { size: A4; margin: 18mm 16mm 20mm 16mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
      max-width: 100%;
    }
    .cover {
      page-break-after: always;
      padding: 24mm 8mm 12mm;
      min-height: 240mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cover h1 { font-size: 26pt; margin: 0 0 12px; border: none; }
    .cover .sub { font-size: 13pt; color: #444; margin-bottom: 24px; }
    .cover .meta { font-size: 10pt; color: #666; }
    h1 {
      font-size: 18pt;
      margin: 28px 0 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #c9a227;
      page-break-after: avoid;
    }
    h2 {
      font-size: 13pt;
      margin: 22px 0 8px;
      color: #0d3d56;
      page-break-after: avoid;
    }
    h3 {
      font-size: 11pt;
      margin: 14px 0 6px;
      page-break-after: avoid;
    }
    p { margin: 0 0 8px; orphans: 3; widows: 3; }
    ul { margin: 4px 0 12px 18px; padding: 0; }
    li { margin-bottom: 4px; }
    blockquote {
      margin: 8px 0 12px;
      padding: 8px 12px;
      border-left: 3px solid #c9a227;
      background: #f8f6f0;
      font-size: 9.5pt;
    }
    hr.rule { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
    strong { font-weight: 600; }
    @media print {
      h1, h2, h3 { break-after: avoid; }
      blockquote, ul { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <section class="cover">
    <h1>OneYP — Dashboard completo (PT)</h1>
    <p class="sub">Exportação detalhada em português: visão global, México, Peru, Equador, Colômbia, Puebla Project, pesquisas, roadmap UX e benchmark.</p>
    <p class="meta">Gerado em ${generated} · Fonte: oneyp.vercel.app · Formato: relatório estruturado (não é captura de tela por aba).</p>
  </section>
  <main>${body}</main>
</body>
</html>`;
}

function findChrome(): string | null {
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome",
    "chromium",
  ];
  for (const c of candidates) {
    if (c.includes("/")) {
      if (fs.existsSync(c)) return c;
    } else {
      const r = spawnSync("which", [c], { encoding: "utf8" });
      if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
    }
  }
  return null;
}

function main() {
  console.log("Building readable markdown…");
  execSync("npx tsx scripts/export-dashboard-readable.ts", {
    cwd: DASHBOARD_ROOT,
    stdio: "inherit",
    env: { ...process.env, EXPORT_LOCALE: "pt" },
  });

  if (!fs.existsSync(MD_PATH)) {
    throw new Error(`Markdown not found: ${MD_PATH}`);
  }

  const md = fs.readFileSync(MD_PATH, "utf8");
  const html = wrapHtml(markdownToHtml(md));
  fs.mkdirSync(path.dirname(HTML_PATH), { recursive: true });
  fs.writeFileSync(HTML_PATH, html, "utf8");
  console.log(`Wrote ${HTML_PATH}`);

  const chrome = findChrome();
  if (!chrome) {
    console.warn("Chrome/Chromium not found — open the HTML file and use Print → Save as PDF.");
    return;
  }

  if (fs.existsSync(PDF_PATH)) fs.unlinkSync(PDF_PATH);

  const fileUrl = `file://${HTML_PATH}`;
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${PDF_PATH}`,
    fileUrl,
  ];
  console.log("Rendering PDF…");
  execFileSync(chrome, args, { stdio: "inherit" });

  if (!fs.existsSync(PDF_PATH)) {
    throw new Error("PDF generation failed");
  }

  fs.mkdirSync(path.dirname(PUBLIC_PDF), { recursive: true });
  fs.copyFileSync(PDF_PATH, PUBLIC_PDF);

  const sizeMb = (fs.statSync(PDF_PATH).size / (1024 * 1024)).toFixed(2);
  console.log(`\nDone: ${PDF_PATH} (${sizeMb} MB)`);
  console.log(`Also copied to: ${PUBLIC_PDF}`);
}

main();
