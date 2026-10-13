/**
 * Cross-country synthesis layer.
 *
 * This file keeps research and competitive evidence separate from the field
 * insight ranking. The cards below are cross-checked interpretations, not
 * additional survey samples.
 */

export type GlobalEvidenceLens = "Research" | "Competition" | "Synthesis";

export const GLOBAL_RESEARCH_SUMMARY = {
 sources: "Pesquisas + competidores",
 scope:
 "Reviews, churn, Lovers Plus, operations, sellers/couriers, visits, meetings, workshops and LATAM benchmark.",
 thesis:
 "TaDa wins habit when consumer promise, rewards frequency and service reliability move together — not when one pillar races ahead of the others.",
 limitation:
 "Research evidence is deeper in Mexico; in Peru and Colombia, research and benchmark findings should guide hypotheses until locally validated.",
 stats: [
 { label: "Fontes integradas", value: "10+", tone: "primary" as const },
 { label: "Reviews Appbot", value: "1.630", tone: "info" as const },
 { label: "Churn survey", value: "379", tone: "warning" as const },
 { label: "Sellers / couriers", value: "333 / 794", tone: "success" as const },
 { label: "Competitors", value: "3 × 3 países", tone: "neutral" as const },
 ],
};

export const GLOBAL_RESEARCH_LENSES: {
 lens: GlobalEvidenceLens;
 owner: "consumer" | "rewards" | "service-level";
 title: string;
 evidence: string;
 countries: string;
 implication: string;
 action: string;
}[] = [
 {
 lens: "Research",
 owner: "consumer",
 title: "Intent exists; inconsistency destroys habit",
 evidence:
 "76% of churn survey respondents still saw TaDa as their first option; 76.6% of Lovers Plus would buy more if stock, hours and trust improved; 92% Perfect Orders in Lovers Plus.",
 countries: "MX; cross-country principle",
 implication:
 "Promotion can open the door, but predictability and recovery determine the second order.",
 action:
 "Make the second order and post-failure recovery the central outcomes by country, city and cluster.",
 },
 {
 lens: "Competition",
 owner: "consumer",
 title: "Competition is about missions and trust, not copying a superapp",
 evidence:
 "Rappi is the benchmark in all three countries; Uber adds mobility/retail in Mexico; PedidosYa competes on density, partners and fintech in Peru; Colombia is primarily an external benchmark.",
 countries: "MX · PE · CO",
 implication:
 "The threat changes by country: breadth/ecosystem, speed, density, pickup, subscription and last mile.",
 action:
 "Compare the same mission (urgent, planned, group, pickup) by total price, ETA P50/P90, failure, recovery and frequency.",
 },
 {
 lens: "Competition",
 owner: "rewards",
 title: "TaDa's advantage is focus; the risk is inconsistency",
 evidence:
 "Competitors invest in Turbo, tracking, AI catalog, ads, loyalty, credit and integrations; TaDa has strong signals in beverages, Lovers Plus, WebPO and local solutions.",
 countries: "MX · PE · CO",
 implication:
 "Breadth without reliability increases complexity; focus on occasion and service can differentiate if execution is measurable.",
 action:
 "Standardize what works (WebPO/KPIs, first-order badge, delivery proof, live map) instead of copying breadth without unit economics.",
 },
 {
 lens: "Research",
 owner: "rewards",
 title: "Frequency economics need clean events and cohort truth",
 evidence:
 "Churn and Lovers Plus link repeat to stock, hours and trust; bank promos and marketplace baskets change who enters and how often they return — Colombia and Mexico both show cohort-specific retention gaps.",
 countries: "MX · CO; principle for PE",
 implication:
 "Club, Braze, wallet and For You amplify value only when CRM knows beer vs marketplace vs promo cohorts.",
 action:
 "Measure realized value, 7/30-day repeat and mission completion by cohort — not coupon issuance alone.",
 },
 {
 lens: "Synthesis",
 owner: "consumer",
 title: "Coordination failures look like consumer churn",
 evidence:
 "Reviews cite delivery and support; field visits cite wrong address and waiting; Colombia service level cited large cancellation shares from customer–store–courier misalignment.",
 countries: "MX · PE · CO",
 implication:
 "Post-purchase options, store-first resolution and visible ETA belong in the consumer roadmap as much as dispatch algorithms.",
 action:
 "Ship predefined post-purchase paths and measure coordination-led cancel rate alongside ETA and Perfect Service.",
 },
 {
 lens: "Synthesis",
 owner: "service-level",
 title: "The bottleneck is often the delivery chain, not persuasion",
 evidence:
 "Reviews point to delivery, accounts, payments and support; churn rises from 62% to 74% with 3+ frictions; sellers and couriers describe incomplete data, address problems, waiting and lack of support.",
 countries: "MX · PE; hypothesis for CO",
 implication:
 "The same failure changes name by actor: stockout for the seller, route for the courier, delay for the consumer and ticket for CX.",
 action:
 "Measure one chain per order: availability → delivery chain → pickup → ETA → cancellation/refund → reorder.",
 },
 {
 lens: "Research",
 owner: "service-level",
 title: "Seller maturity needs its own play",
 evidence:
 "Small in discovery: 85 sellers, 3.86/5 satisfaction and 2.9/8 metrics; Large anchor: 49 sellers and ~35% of estimated weekly sample value.",
 countries: "MX; framework replicable in PE/CO",
 implication:
 "Volume is not maturity. The same dashboard and incentive do not serve small-seller activation and anchor-seller protection.",
 action:
 "Route by cluster: minimum operating routine for Small discovery; early warning, capacity and structured feedback for Large anchor.",
 },
 {
 lens: "Research",
 owner: "service-level",
 title: "Courier satisfaction does not eliminate friction",
 evidence:
 "72% of couriers rate satisfaction 4–5, but 46.9% cite customer communication, 36.5% routes/address and 32.5% waiting.",
 countries: "MX; validation needed in PE/CO",
 implication:
 "A positive average can hide lost time and earnings during exceptions.",
 action:
 "Prioritize correct contact, realistic routes, time remaining, clear payment and in-flow support.",
 },
];

export const GLOBAL_RESEARCH_DECISIONS = [
 {
 horizon: "Now",
 owner: "consumer" as const,
 decision: "Habit and recovery",
 measure: "Second order, 7/30d repeat, post-failure recovery, coordination-led cancel rate",
 evidence: "Churn, Appbot, Lovers Plus, Colombia post-purchase",
 },
 {
 horizon: "Now",
 owner: "rewards" as const,
 decision: "Cohort-ready CRM and Club",
 measure: "Realized value, mission completion, beer vs marketplace tiers, For You readiness",
 evidence: "Lovers Plus, Colombia AM rewards, Braze pilots",
 },
 {
 horizon: "Next",
 owner: "service-level" as const,
 decision: "Order reliability",
 measure: "Perfect Service, fill rate, stockout, ETA P50/P90, delivery chain and cancellation",
 evidence: "Churn, sellers/couriers, field visits",
 },
 {
 horizon: "Next",
 owner: "service-level" as const,
 decision: "Seller and courier tooling",
 measure: "Seller activation, courier retention, earnings/hour, KPI visibility, capacity alerts",
 evidence: "Clusters sellers/couriers + competitor benchmark",
 },
 {
 horizon: "Later",
 owner: "rewards" as const,
 decision: "Breadth with control",
 measure: "Cross-use, frequency, omnichannel, fraud, homologated data and unit economics",
 evidence: "Competitors + Rewards/Consumer workshops",
 },
];

export const GLOBAL_RESEARCH_SOURCE_GROUPS = [
 {
 group: "Consumer research",
 sources: "Appbot · churn survey · Lovers Plus",
 reading: "Polarization, friction, retained intent, service threshold and off-app behavior.",
 },
 {
 group: "Execution research",
 sources: "Seller/Courier clustering · Annual Review",
 reading: "Maturity, delivery chain, capacity, markets and metrics operators can use.",
 },
 {
 group: "Field and organization",
 sources: "Visits · meetings · workshops",
 reading: "Failures situated in city, peak, process, system and ownership.",
 },
 {
 group: "Market",
 sources: "Competitors · LATAM benchmark",
 reading: "Mission-based comparison, loyalty economics and ecosystem plays by country.",
 },
];
