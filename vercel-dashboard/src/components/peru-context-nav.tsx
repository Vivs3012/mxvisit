"use client";

import { Button, Card, CardBody, Row, Stack, Text, Pill } from "@/components/ui";
import {
 PERU_CONTEXTS,
 SERVICE_LEVEL_ACTORS,
 type PeruContextId,
 type ServiceLevelActor,
} from "@/lib/peru-context-nav";

function phaseTone(phase: PeruContextId extends string ? "now" | "next" | "later" | "gate" : never): "warning" | "info" | "neutral" {
 if (phase === "now") return "warning";
 if (phase === "next") return "info";
 return "neutral";
}

function phaseLabel(phase: "now" | "next" | "later" | "gate"): string {
 if (phase === "gate") return "Now = gate";
 if (phase === "now") return "Now";
 if (phase === "next") return "Next";
 return "Later";
}

export function PeruContextNav({
 activeContext,
 onContextChange,
 activeActor,
 onActorChange,
 showActorFilter,
}: {
 activeContext: PeruContextId;
 onContextChange: (context: PeruContextId) => void;
 activeActor: ServiceLevelActor | "all";
 onActorChange: (actor: ServiceLevelActor | "all") => void;
 showActorFilter?: boolean;
}) {
 const contextMeta = PERU_CONTEXTS.find((c) => c.id === activeContext);

 return (
 <Card>
 <CardBody>
 <Stack gap={12}>
 <Stack gap={4}>
 <Text size="small" tone="secondary" weight="semibold">
 Trip topic
 </Text>
 <Row gap={8} wrap>
 {PERU_CONTEXTS.map((ctx) => (
 <Button
 key={ctx.id}
 variant={activeContext === ctx.id ? "primary" : "secondary"}
 onClick={() => onContextChange(ctx.id)}
 >
 <Row gap={6} align="center">
 <span>{ctx.label}</span>
 {ctx.id !== "synthesis" && (
 <Pill size="sm" tone={phaseTone(ctx.primaryPhase)}>
 {phaseLabel(ctx.primaryPhase)}
 </Pill>
 )}
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

 {showActorFilter && (
 <Stack gap={6}>
 <Text size="small" tone="secondary" weight="semibold">
 Filter pains by actor
 </Text>
 <Row gap={8} wrap>
 <Button
 variant={activeActor === "all" ? "primary" : "secondary"}
 onClick={() => onActorChange("all")}
 >
 All
 </Button>
 {SERVICE_LEVEL_ACTORS.map((actor) => (
 <Button
 key={actor.id}
 variant={activeActor === actor.id ? "primary" : "secondary"}
 onClick={() => onActorChange(actor.id)}
 >
 {actor.label}
 </Button>
 ))}
 </Row>
 </Stack>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}
