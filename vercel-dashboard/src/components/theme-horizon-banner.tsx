"use client";

import { Callout, Pill, Row, Stack, Text } from "@/components/ui";
import type { UxRoadmapPhase } from "@/lib/ux-roadmap";

export type ThemeHorizonPlan = {
 primaryPhase: UxRoadmapPhase | "gate";
 now: string;
 next: string;
 later: string;
 gateNote?: string;
};

function phaseTone(phase: UxRoadmapPhase | "gate"): "warning" | "info" | "neutral" {
 if (phase === "now") return "warning";
 if (phase === "next") return "info";
 if (phase === "gate") return "neutral";
 return "neutral";
}

function phaseLabel(phase: UxRoadmapPhase | "gate"): string {
 if (phase === "gate") return "Now = gate";
 if (phase === "now") return "Now";
 if (phase === "next") return "Next";
 return "Later";
}

export function ThemeHorizonBanner({ plan }: { plan: ThemeHorizonPlan }) {
 return (
 <Callout tone="info" title="2027 priority horizon">
 <Stack gap={8}>
 <Row gap={8} wrap align="center">
 <Text size="small" weight="semibold">Primary focus:</Text>
 <Pill size="sm" tone={phaseTone(plan.primaryPhase)}>
 {phaseLabel(plan.primaryPhase)}
 </Pill>
 </Row>
 {plan.gateNote && (
 <Text size="small" tone="secondary">{plan.gateNote}</Text>
 )}
 <Stack gap={4}>
 <Text size="small">
 <strong>Now:</strong> {plan.now}
 </Text>
 <Text size="small">
 <strong>Next:</strong> {plan.next}
 </Text>
 <Text size="small">
 <strong>Later:</strong> {plan.later}
 </Text>
 </Stack>
 </Stack>
 </Callout>
 );
}
