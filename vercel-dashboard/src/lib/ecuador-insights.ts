export type EcuadorPainPriority = "Critical" | "High" | "Medium";

export type EcuadorWorkshopPain = {
 id: string;
 priority: EcuadorPainPriority;
 pillar: "Service Level" | "Consumer" | "Rewards" | "Expansion";
 title: string;
 detail: string;
 productHook?: string;
 quotes: string[];
};

/** Oct 7 prep input list (shown on Product vision tab — not Oct 8 workshop outcomes). */
export const ECUADOR_WORKSHOP_PAINS: EcuadorWorkshopPain[] = [
 {
 id: "payment-gateway",
 priority: "Critical",
 pillar: "Consumer",
 title: "Payment gateway blocked after fraud history",
 detail:
 "Digital payments expected; activation stalled due to past card cloning, chargebacks and CX overload. Blocks parity with competitors and digital-first positioning.",
 productHook: "Risk-controlled rollout + monitoring — not permanent off switch.",
 quotes: ["Payment gateway is something super pending.", "Users ask why a digital app has no card payment."],
 },
 {
 id: "community-poc-legal",
 priority: "Critical",
 pillar: "Expansion",
 title: "Community POC pilot — legal + app pricing workflow",
 detail:
 "Cannot scale Community POP with current app; need reference-price flow and seller landing when GO. Hybrid model is strategic for coast/insecurity.",
 quotes: ["Legal complexity — we cannot implement with the tools the app gives us today."],
 },
 {
 id: "suggested-replenishment",
 priority: "High",
 pillar: "Service Level",
 title: "No suggested stock / quantity — cancellations up",
 detail:
 "Without seller inventory quantity, consumer cancel flow increased cancels. Community POC will worsen without replenishment suggestions.",
 productHook: "Same as Peru/MX inventory quantity MVP.",
 quotes: ["That suggested system does not exist — it impacts cancellations."],
 },
 {
 id: "sampling-broken",
 priority: "High",
 pillar: "Consumer",
 title: "Sampling mechanic not working",
 detail:
 "CRM loaded sampling campaigns but the mechanic failed in production — liquor and snack trials never reached consumers. Ops reverted to manual CSV loads while marketing waited on a fix.",
 quotes: ["I did all the sampling loads but it was not working for me."],
 },
 {
 id: "courier-poc-switch",
 priority: "High",
 pillar: "Service Level",
 title: "Motorizado locked to first POC",
 detail:
 "Store closure or city move requires ticket + user delete. Vitex-era legal rule; ops needs fast transfer (not multi-store).",
 quotes: ["Cannot work in another POC because user is tied to the first one."],
 },
 {
 id: "bis-courier-forecast",
 priority: "High",
 pillar: "Service Level",
 title: "Motorizado forecast manual — automate in BEES",
 detail: "Weekly Excel/simulator + WhatsApp; logic is deterministic from BEES raw data.",
 productHook: "Peru WebPO-style demand heatmap + EC hourly model.",
 quotes: ["If it could be automated on BEES we would gain a lot."],
 },
 {
 id: "step-discount-ux",
 priority: "Medium",
 pillar: "Consumer",
 title: "Step discount — partial portfolio + user confusion",
 detail:
 "Gradual migration by brand/format; CEPS feedback that mechanics confuse some users despite good price perception.",
 quotes: ["Not all users are familiar with how step discount works."],
 },
 {
 id: "seller-whatsapp-legal",
 priority: "Medium",
 pillar: "Service Level",
 title: "Direct seller→consumer WhatsApp vs Ecuador data law",
 detail:
 "New product sends from seller WhatsApp; Ecuador prefers seller→CX→consumer ticket flow that already performs well.",
 quotes: ["SL should not communicate directly with the client — data protection."],
 },
 {
 id: "incentive-visibility",
 priority: "Medium",
 pillar: "Service Level",
 title: "POC incentive / reimbursement daily visibility",
 detail:
 "POC economics mix fixed and variable incentives; a weekly summary cannot explain day-to-day behavior. Sellers asked for daily visibility of reimbursements and incentive lines to trust the model.",
 quotes: ["Daily visibility of all incentives would be super good."],
 },
 {
 id: "promo-ops-windows",
 priority: "Medium",
 pillar: "Consumer",
 title: "Flash promo strict on/off windows (e.g. 3x2 until 12:00)",
 detail:
 "W41 calendar requires ops to turn flash combos ON at opening and strictly OFF at noon (e.g. 3×2). Without reliable scheduling in offers tooling, mistakes become consumer complaints and margin leaks.",
 quotes: ["MUST be ON at opening and STRICTLY turned OFF at 12:00."],
 },
];

export const ECUADOR_CROSS_THEMES = [
 {
 theme: "Hybrid expansion",
 detail: "Dark store control + Community POC density for coast/competition — 6→41 cities.",
 },
 {
 theme: "Granular DDC per POC",
 detail: "Promo/portfolio Excel at 23 POCs — converges with Mexico and Peru DDC pain at scale.",
 },
 {
 theme: "CRM discipline",
 detail: "Holdout incrementality + hyper-personalization — model for other markets.",
 },
 {
 theme: "Ops-built dashboards",
 detail: "Power BI FOR when product seller home unused — same pattern as PE WebPO.",
 },
];
