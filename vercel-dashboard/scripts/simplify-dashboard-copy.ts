/**
 * Editorial pass: remove insider shorthand from user-facing strings in src/.
 * Run: npx tsx scripts/simplify-dashboard-copy.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..", "src");

const SKIP_DIR = new Set(["node_modules", "app", "components/ui"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".ts") || name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** Apply to string literals in file content (whole-file regex — careful with code). */
function simplifyContent(text: string, isPtHeavy: boolean): string {
  let s = text;

  // Remove rank callouts inside quoted copy
  s = s.replace(/ \(global #\d+[^)"']*\)/g, "");
  s = s.replace(/ \(rank #\d+[^)"']*\)/g, "");
  s = s.replace(/ \(#[0-9]+[^)"']*\)/g, "");
  s = s.replace(/ — ties global[^"']+\)/g, ")");
  s = s.replace(/ — aligns with global[^"']+\)/g, ")");
  s = s.replace(/ — deepens AM[^"']+\)/g, ")");
  s = s.replace(/ — extends AM[^"']+\)/g, ")");
  s = s.replace(/ — parallels[^"']+\)/g, ")");
  s = s.replace(/ — complements global[^"']+\)/g, ")");
  s = s.replace(/ — same class as MX\/PE[^"']+\./g, ".");
  s = s.replace(/ \(MX\+PE[^)]*\)/g, "");

  // Country shorthand in prose
  s = s.replace(/\bMX\/PE\/EC\b/g, "Mexico, Peru and Ecuador");
  s = s.replace(/\bMX\/PE\b/g, "Mexico and Peru");
  s = s.replace(/\bPE\/MX\b/g, "Peru and Mexico");
  s = s.replace(/\bMX · PE · EC\b/g, "Mexico, Peru, Ecuador");
  s = s.replace(/\bMX·PE·EC\b/g, "Mexico, Peru, Ecuador");

  // Jargon → plain (EN-oriented; PT files get separate where needed)
  // Do NOT replace homologate/Layer 1 in code keys — only in string values; skip identifier-like contexts
  if (!isPtHeavy) {
    s = s.replace(/\bmarcheo\b/gi, "manual in-store sale registration");
    s = s.replace(/\bhandoff\b/gi, "delivery chain");
  } else {
    s = s.replace(/\bmarcheo\b/gi, "registro manual de venda na loja");
    s = s.replace(/\bhandoff\b/gi, "cadeia de entrega");
  }

  // Double spaces after edits
  s = s.replace(/  +/g, " ");
  s = s.replace(/ \./g, ".");

  return s;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  const isPtHeavy = file.includes("i18n/content") && !file.includes("global-insights-locale");
  const isLocale = file.includes("global-insights-locale") || file.includes("-locale.ts");
  const before = readFileSync(file, "utf8");
  const after = simplifyContent(before, isPtHeavy || isLocale);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
  }
}

console.log(`Simplify copy: updated ${changed} files under src/`);
