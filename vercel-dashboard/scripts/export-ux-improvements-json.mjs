import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { UX_ROADMAP_ITEMS } from "../src/lib/ux-roadmap.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, ".ux-improvements-export.json");

/** In seller/courier bug evidence report. */
const BUG_ROADMAP_IDS = new Set([
  "order-alert-session",
  "map-assign-stay",
  "courier-order-push",
  "financial-report-date-filter",
]);

/** Removed from UX improvements PDF per stakeholder edit. */
const EXCLUDED_ROADMAP_IDS = new Set([
  "portfolio-quantity",
  "portfolio-filters",
  "dispatch-sla-split",
  "courier-jumbo-seller-view",
  "metrics-ai-advanced",
  "in-app-chat-seller",
  "notification-center",
  "metrics-ai-conversational",
  "ya-llegue-fix",
  "courier-route-map",
  "courier-earnings-daily",
]);

const ALLOWED_ACTORS = new Set(["Seller", "Courier"]);

const roadmap = UX_ROADMAP_ITEMS.filter(
  (i) =>
    ALLOWED_ACTORS.has(i.actor) &&
    !BUG_ROADMAP_IDS.has(i.id) &&
    !EXCLUDED_ROADMAP_IDS.has(i.id),
).map((i) => ({
  section: `${i.actor} · Roadmap · ${i.phase}`,
  priority: i.priority,
  type: "UX / Product backlog",
  title: i.title,
  stores: i.fieldValidated ? "Field-validated" : "Backlog",
  detail: i.description,
  impact: i.successCriteria?.length
    ? i.successCriteria.join(" · ")
    : `Horizon: ${i.phase}`,
  quotes: i.evidence,
  id: i.id,
}));

writeFileSync(out, JSON.stringify({ roadmap, cross: [] }, null, 2));
console.log(out);
console.log(`roadmap=${roadmap.length} cross=0`);
