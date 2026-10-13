import type { Locale } from "./i18n/locale";

type Rule = { pattern: RegExp; en: string; pt: string };

const RULES: Rule[] = [
  {
    pattern: /\bWebPO\b(?! \()/,
    en: "WebPO (Peru seller weekly KPI tool)",
    pt: "WebPO (ferramenta semanal de KPI do seller no Peru)",
  },
  {
    pattern: /\bBEES off\b/i,
    en: "SKU marked unavailable in BEES",
    pt: "SKU marcado indisponível no BEES",
  },
  {
    pattern: /\bPOC\b(?! \()/,
    en: "store (POC)",
    pt: "loja (POC)",
  },
  {
    pattern: /\bSOX\b(?! \()/,
    en: "external financial audit (SOX)",
    pt: "auditoria financeira externa (SOX)",
  },
  {
    pattern: /\bCIEZA\b(?! \()/,
    en: "CIEZA (store billing system)",
    pt: "CIEZA (sistema de faturamento da loja)",
  },
  {
    pattern: /\bSIESA\b(?! \()/,
    en: "SIESA (ERP)",
    pt: "SIESA (ERP)",
  },
  {
    pattern: /\bLayer 1\b/,
    en: "Basic reliability",
    pt: "Confiabilidade básica",
  },
  {
    pattern: /\bmarcheo\b/gi,
    en: "manual in-store sale registration",
    pt: "registro manual de venda na loja",
  },
  {
    pattern: /\bhandoff\b/gi,
    en: "delivery chain",
    pt: "cadeia de entrega",
  },
  {
    pattern: /\bhomologation\b/gi,
    en: "consistent rollout",
    pt: "padronização",
  },
  {
    pattern: /\bhomologate\b/gi,
    en: "roll out consistently",
    pt: "padronizar",
  },
];

function applyReplacements(text: string, locale: Locale): string {
  let out = text;
  for (const rule of RULES) {
    const replacement = locale === "pt" ? rule.pt : rule.en;
    out = out.replace(rule.pattern, replacement);
  }
  return out;
}

function stripInsiderShorthand(text: string): string {
  let s = text;
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
  s = s.replace(/\bMX\/PE\/EC\b/g, "Mexico, Peru and Ecuador");
  s = s.replace(/\bMX\/PE\b/g, "Mexico and Peru");
  s = s.replace(/\bPE\/MX\b/g, "Peru and Mexico");
  s = s.replace(/\bMX · PE · EC\b/g, "Mexico, Peru, Ecuador");
  s = s.replace(/\bMX·PE·EC\b/g, "Mexico, Peru, Ecuador");
  s = s.replace(/ — ranks? #[\d–-]+/gi, "");
  s = s.replace(/ranks? #[\d–-]+/gi, "");
  s = s.replace(/Basic reliability reliability/gi, "Basic reliability");
  s = s.replace(/Confiabilidade básica básica/gi, "Confiabilidade básica");
  s = s.replace(/  +/g, " ");
  s = s.replace(/ \./g, ".");
  return s;
}

/**
 * Light pass on text shown in insight cards — plain language for outside readers.
 */
export function clarifyReaderText(text: string, locale: Locale): string {
  if (!text) return text;
  return applyReplacements(stripInsiderShorthand(text), locale);
}
