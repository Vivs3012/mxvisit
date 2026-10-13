"use client";

import { Button, Card, CardBody, Row, Stack, Text, Pill } from "@/components/ui";
import { MEXICO_CONTEXTS, type MexicoContextId } from "@/lib/mexico-context-nav";

function phaseTone(phase: "now" | "next" | "later"): "warning" | "info" | "neutral" {
 if (phase === "now") return "warning";
 if (phase === "next") return "info";
 return "neutral";
}

function phaseLabel(phase: "now" | "next" | "later"): string {
 if (phase === "now") return "Now";
 if (phase === "next") return "Next";
 return "Later";
}

export function MexicoContextNav({
 activeContext,
 onContextChange,
}: {
 activeContext: MexicoContextId;
 onContextChange: (context: MexicoContextId) => void;
}) {
 const contextMeta = MEXICO_CONTEXTS.find((c) => c.id === activeContext);

 return (
 <Card>
 <CardBody>
 <Stack gap={12}>
 <Stack gap={4}>
 <Text size="small" tone="secondary" weight="semibold">
 Trip topic
 </Text>
 <Row gap={8} wrap>
 {MEXICO_CONTEXTS.map((ctx) => (
 <Button
 key={ctx.id}
 variant={activeContext === ctx.id ? "primary" : "secondary"}
 onClick={() => onContextChange(ctx.id)}
 >
 <Row gap={6} align="center">
 <span>{ctx.label}</span>
 <Pill size="sm" tone={phaseTone(ctx.primaryPhase)}>
 {phaseLabel(ctx.primaryPhase)}
 </Pill>
 </Row>
 </Button>
 ))}
 </Row>
 {contextMeta && (
 <Stack gap={4}>
 <Text size="small" tone="tertiary">
 {contextMeta.subtitle}
 </Text>
 <Text size="small" tone="tertiary">
 <strong>Also known as:</strong> {contextMeta.aliases}
 </Text>
 </Stack>
 )}
 </Stack>
 </Stack>
 </CardBody>
 </Card>
 );
}
