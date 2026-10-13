/** Shared visit insight categories and sub-tabs — Peru store visits + Mexico CDMX/Puebla. */

export type VisitInsightCategory = "Bug" | "UX" | "Product" | "Operation" | "Infra";

export type VisitInsightsTab = "home" | "bugs" | "product" | "ux" | "operation" | "infra";

export const VISIT_INSIGHTS_TABS: {
 id: VisitInsightsTab;
 label: string;
 category?: VisitInsightCategory;
}[] = [
 { id: "home", label: "Home" },
 { id: "bugs", label: "Bugs", category: "Bug" },
 { id: "product", label: "Product", category: "Product" },
 { id: "ux", label: "UX", category: "UX" },
 { id: "operation", label: "Operation", category: "Operation" },
 { id: "infra", label: "Infra", category: "Infra" },
];

export const VISIT_CATEGORY_LABELS: Record<VisitInsightCategory, string> = {
 Bug: "Bugs / technical issues",
 UX: "UX improvements",
 Product: "Product improvements",
 Operation: "Operations & process",
 Infra: "Physical infra / hardware",
};

export const VISIT_CATEGORY_ORDER: VisitInsightCategory[] = [
 "Bug",
 "UX",
 "Product",
 "Operation",
 "Infra",
];

export function visitTabForCategory(category: VisitInsightCategory): VisitInsightsTab {
 const map: Record<VisitInsightCategory, VisitInsightsTab> = {
 Bug: "bugs",
 UX: "ux",
 Product: "product",
 Operation: "operation",
 Infra: "infra",
 };
 return map[category];
}

export function countVisitInsightsFor<T extends { insights: { category: VisitInsightCategory }[] }>(
 stores: T[],
 category: VisitInsightCategory,
): number {
 return stores.reduce(
 (n, store) => n + store.insights.filter((i) => i.category === category).length,
 0,
 );
}
