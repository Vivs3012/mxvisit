"use client";

import { Button, Row } from "@/components/ui";
import {
 VISIT_INSIGHTS_TABS,
 countVisitInsightsFor,
 type VisitInsightCategory,
 type VisitInsightsTab,
} from "@/lib/visit-insights";

export function VisitInsightsTabBar<T extends { insights: { category: VisitInsightCategory }[] }>({
 active,
 onChange,
 insights,
 hiddenTabs = [],
}: {
 active: VisitInsightsTab;
 onChange: (tab: VisitInsightsTab) => void;
 insights?: T[];
 /** Hide tabs with zero insights (e.g. Operation/Infra on Mexico CDMX). */
 hiddenTabs?: VisitInsightsTab[];
}) {
 return (
 <Row gap={8} wrap>
 {VISIT_INSIGHTS_TABS.map((tab) => {
 if (hiddenTabs.includes(tab.id)) return null;
 const count =
 tab.category && insights
 ? countVisitInsightsFor(insights, tab.category)
 : undefined;
 const label = count !== undefined ? `${tab.label} (${count})` : tab.label;
 return (
 <Button
 key={tab.id}
 variant={active === tab.id ? "primary" : "secondary"}
 onClick={() => onChange(tab.id)}
 >
 {label}
 </Button>
 );
 })}
 </Row>
 );
}
