"use client";

import {
 Button,
 Callout,
 Card,
 CardBody,
 CardHeader,
 CollapsibleSection,
 Grid,
 H3,
 Pill,
 Row,
 Stack,
 Table,
 Text,
} from "@/components/ui";
import { ReaderText } from "./reader-text-ui";
import {
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import {
 PE_CONSUMER_VISION,
 type ConsumerPain,
 type ConsumerProductFeature,
} from "./peru-consumer-vision";
import type { PeruAgendaTab } from "./peru-view";
import { ThemeHorizonBanner } from "@/components/theme-horizon-banner";
import { PERU_CONTEXTS } from "./peru-context-nav";

function featureStatusTone(
 s: ConsumerProductFeature["status"],
): "success" | "info" | "warning" | "neutral" {
 if (s === "live") return "success";
 if (s === "testing") return "info";
 if (s === "planned") return "warning";
 return "neutral";
}

function painStatusTone(
 s: ConsumerPain["status"],
): "success" | "warning" | "info" | "neutral" {
 if (s === "covered") return "success";
 if (s === "partial") return "info";
 if (s === "planned") return "info";
 if (s === "discovery") return "neutral";
 return "warning";
}

function priorityTone(p: ConsumerPain["priority"]): "warning" | "info" | "neutral" {
 if (p === "P1") return "warning";
 if (p === "P2") return "info";
 return "neutral";
}

function ProductFeatureCard({ f }: { f: ConsumerProductFeature }) {
 return (
 <Card>
 <CardHeader trailing={<Pill size="sm" tone={featureStatusTone(f.status)}>{f.status}</Pill>}>
 {f.title}
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <ReaderText size="small">{f.summary}</ReaderText>
 {f.metrics && (
 <Row gap={6} wrap>
 {f.metrics.map((m) => (
 <Pill key={m} size="sm" tone="info">{m}</Pill>
 ))}
 </Row>
 )}
 {f.peruTiming && (
 <Callout tone="neutral" title="Peru timing">
 <Text size="small">{f.peruTiming}</Text>
 </Callout>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function PainCard({ pain }: { pain: ConsumerPain }) {
 return (
 <CollapsibleSection
 title={pain.title}
 trailing={pain.priority}
 count={pain.linksToProduct?.length ?? 0}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Row gap={8} wrap>
 <Pill size="sm" tone={priorityTone(pain.priority)}>{pain.priority}</Pill>
 {pain.status && (
 <Pill size="sm" tone={painStatusTone(pain.status)}>{pain.status}</Pill>
 )}
 </Row>
 <ReaderText size="small">{pain.summary}</ReaderText>
 {pain.productResponse && (
 <Callout tone="info" title="Product response">
 <Text size="small">{pain.productResponse}</Text>
 </Callout>
 )}
 {pain.linksToProduct && pain.linksToProduct.length > 0 && (
 <Text size="small" tone="tertiary">
 Links to product features: {pain.linksToProduct.join(", ")}
 </Text>
 )}
 </Stack>
 </CollapsibleSection>
 );
}

export default function PeruConsumerVisionView({
 onAgendaChange,
}: {
 onAgendaChange?: (tab: PeruAgendaTab) => void;
}) {
 const c = PE_CONSUMER_VISION;
 const horizonMeta = PERU_CONTEXTS.find((ctx) => ctx.id === "consumer");
 const p1 = c.growthPains.filter((p) => p.priority === "P1");
 const p2 = c.growthPains.filter((p) => p.priority === "P2");
 const p3 = c.growthPains.filter((p) => p.priority === "P3");

 return (
 <Stack gap={20}>
 <TabPageHeader
 title="Consumer vision"
 date={c.date}
 subtitle={`${c.location} · ${c.participants}`}
 />

 {horizonMeta && (
 <ThemeHorizonBanner
 plan={{
 primaryPhase: horizonMeta.primaryPhase,
 now: horizonMeta.horizonPlan.now,
 next: horizonMeta.horizonPlan.next,
 later: horizonMeta.horizonPlan.later,
 }}
 />
 )}

 <TabExecutiveSummary
 headline={c.executiveSummary.headline}
 paragraphs={c.executiveSummary.paragraphs}
 />

 <TabStatGrid
 stats={c.executiveSummary.stats.map((s) => ({
 label: s.label,
 value: s.value,
 tone: "tone" in s ? s.tone : undefined,
 }))}
 columns={3}
 />

 {onAgendaChange && (
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-consumer")}>
 ← Workshop · Consumer (Sep 2)
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("overall-result")}>
 Overall result →
 </Button>
 </Row>
 )}

 <CollapsibleSection title="Consumer product squad" defaultOpen>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Callout tone="info" title="North star">
 <Text size="small">{c.productTeam.northStar}</Text>
 </Callout>
 <Grid columns={2} gap={10}>
 {c.productTeam.squad.map((member) => (
 <Text key={member} size="small">• {member}</Text>
 ))}
 </Grid>
 <Row gap={6} wrap>
 {c.productTeam.principles.map((p) => (
 <Pill key={p} size="sm" tone="neutral">{p}</Pill>
 ))}
 </Row>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection
 title="Product roadmap — what ships next"
 count={c.productFeatures.length}
 defaultOpen
 >
 <Grid columns={2} gap={12} style={{ paddingTop: 12 }}>
 {c.productFeatures.map((f) => (
 <ProductFeatureCard key={f.id} f={f} />
 ))}
 </Grid>
 </CollapsibleSection>

 <Stack gap={12}>
 <H3 style={{ margin: 0 }}>Growth & commercial pains — by priority</H3>
 <Text size="small" tone="secondary">
 Peru commercial team consolidated 18 pains and mapped each to product features shown above.
 </Text>
 <Table
 headers={["P", "Pain", "Status", "Product link"]}
 rows={c.growthPains.map((p) => [
 <Pill key={p.id} size="sm" tone={priorityTone(p.priority)}>{p.priority}</Pill>,
 p.title,
 p.status ? (
 <Pill size="sm" tone={painStatusTone(p.status)}>{p.status}</Pill>
 ) : "—",
 p.linksToProduct?.join(", ") ?? "—",
 ])}
 columnAlign={["center", "left", "center", "left"]}
 striped
 />
 </Stack>

 <CollapsibleSection title="P1 — consumer-centric" count={p1.length} defaultOpen>
 <Stack gap={8} style={{ paddingTop: 10 }}>
 {p1.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="P2 — business & data" count={p2.length}>
 <Stack gap={8} style={{ paddingTop: 10 }}>
 {p2.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="P3 — nice to have" count={p3.length}>
 <Stack gap={8} style={{ paddingTop: 10 }}>
 {p3.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Convergences with Sep 2 workshop & store visits" count={c.convergences.length}>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {c.convergences.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Next steps agreed" count={c.nextSteps.length} defaultOpen>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {c.nextSteps.map((step) => (
 <Text key={step} size="small">• {step}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <TabSource>Source: {c.source}</TabSource>
 </Stack>
 );
}
