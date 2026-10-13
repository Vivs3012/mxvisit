import type { PesquisaSectionId } from "./pesquisas-data";
import type { PueblaProjectSectionId } from "./puebla-project-shared";
import type { VisitInsightsTab } from "./visit-insights";

export type SearchCountry =
 | "all"
 | "mexico"
 | "peru"
 | "colombia"
 | "ecuador"
 | "pesquisas"
 | "puebla-project";

export type SearchMexicoTab =
 | "visitas-lojas"
 | "puebla-visit"
 | "promo-workshop"
 | "reuniao-cx"
 | "reuniao-produto"
 | "dinamica-ops"
 | "resultado-geral"
 | "ux-roadmap";

export type SearchPeruTab =
 | "context-meeting"
 | "b2b-platform"
 | "store-visits"
 | "service-level"
 | "workshop-0209"
 | "workshop-ops"
 | "workshop-consumer"
 | "workshop-rewards"
 | "consumer-vision"
 | "overall-result";

export type SearchPeruVisitTab = VisitInsightsTab;

export type SearchAppTab = VisitInsightsTab;

export type SearchLocation = {
 country: SearchCountry;
 pesquisaSection?: PesquisaSectionId;
 pueblaProjectSection?: PueblaProjectSectionId;
 mexicoTab?: SearchMexicoTab;
 peruTab?: SearchPeruTab;
 peruVisitTab?: SearchPeruVisitTab;
 appTab?: SearchAppTab;
};

export type SearchDoc = {
 id: string;
 title: string;
 breadcrumb: string;
 text: string;
 haystack: string;
 location: SearchLocation;
};

export type SearchHit = {
 doc: SearchDoc;
 score: number;
 snippet: string;
};

const SYNONYM_GROUPS: string[][] = [
 ["coupon", "coupons", "cupon", "cupones", "cupom", "cupons"],
 ["promo", "promos", "promotion", "promotions", "promocion", "promociones", "promocao", "promocoes"],
 ["fillrate", "filrate", "fill rate"],
 ["marketplace", "market place"],
 ["courier", "couriers", "repartidor", "repartidores", "motoboy"],
 ["seller", "sellers", "vendedor", "vendedores"],
 ["poc", "pocs", "store", "stores", "loja", "lojas", "tienda", "tiendas"],
 ["sla", "sla35"],
 ["rgb", "retornable", "retornables", "returnable", "returnables"],
 ["webpo", "web tiendas", "b2b", "plataforma"],
 ["service level", "ecosystem", "top tiendas", "braze", "whatsapp"],
];

const SYNONYMS: Record<string, string[]> = {};
for (const group of SYNONYM_GROUPS) {
 for (const word of group) {
 SYNONYMS[word] = group.filter((w) => w !== word);
 }
}

export function normalize(value: string): string {
 return value
.normalize("NFD")
.replace(/\p{M}/gu, "")
.toLowerCase()
.replace(/[^a-z0-9\s]/g, " ")
.replace(/\s+/g, " ")
.trim();
}

export function joinText(...parts: unknown[]): string {
 const out: string[] = [];
 const walk = (value: unknown) => {
 if (value == null || typeof value === "boolean") return;
 if (typeof value === "number") {
 out.push(String(value));
 return;
 }
 if (typeof value === "string") {
 if (value) out.push(value);
 return;
 }
 if (Array.isArray(value)) {
 value.forEach(walk);
 return;
 }
 if (typeof value === "object") {
 Object.values(value).forEach(walk);
 }
 };
 parts.forEach(walk);
 return out.join(" \n ");
}

export function createDoc(input: {
 id: string;
 title: string;
 breadcrumb: string;
 location: SearchLocation;
 body?: unknown;
}): SearchDoc {
 const text = joinText(input.title, input.breadcrumb, input.body);
 return {
 id: input.id,
 title: input.title,
 breadcrumb: input.breadcrumb,
 text,
 haystack: normalize(text),
 location: input.location,
 };
}

function expandToken(token: string): string[] {
 const extra = SYNONYMS[token] ?? [];
 return [token,...extra];
}

function queryTokens(query: string): string[] {
 return normalize(query)
.split(" ")
.filter((t) => t.length >= 2);
}

function escapeRegex(value: string): string {
 return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makeSnippet(text: string, tokens: string[]): string {
 const compact = text.replace(/\s+/g, " ").trim();
 const variants = [...new Set(tokens.flatMap(expandToken))].sort((a, b) => b.length - a.length);
 const re = new RegExp(variants.map(escapeRegex).join("|"), "i");
 const match = compact.match(re);
 if (!match || match.index == null) {
 return compact.slice(0, 180).trim();
 }
 const idx = match.index;
 const start = Math.max(0, idx - 55);
 const end = Math.min(compact.length, idx + match[0].length + 110);
 const slice = compact.slice(start, end).trim();
 return `${start > 0 ? "…" : ""}${slice}${end < compact.length ? "…" : ""}`;
}

export function searchDocs(query: string, docs: SearchDoc[], limit = 40): SearchHit[] {
 const tokens = queryTokens(query);
 if (tokens.length === 0) return [];

 const expanded = tokens.map(expandToken);
 const hits: SearchHit[] = [];

 for (const doc of docs) {
 let score = 0;
 let matched = true;
 for (const variants of expanded) {
 const found = variants.some((v) => doc.haystack.includes(v));
 if (!found) {
 matched = false;
 break;
 }
 const titleHay = normalize(doc.title);
 const crumbHay = normalize(doc.breadcrumb);
 if (variants.some((v) => titleHay.includes(v))) score += 8;
 else if (variants.some((v) => crumbHay.includes(v))) score += 3;
 else score += 1;
 }
 if (!matched) continue;
 hits.push({
 doc,
 score,
 snippet: makeSnippet(doc.text, tokens),
 });
 }

 hits.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));
 return hits.slice(0, limit);
}

export function highlightTokens(query: string): string[] {
 const tokens = queryTokens(query);
 return [...new Set(tokens.flatMap(expandToken))].filter((t) => t.length >= 3);
}
