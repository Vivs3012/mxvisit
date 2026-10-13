"use client";

import {
 Button,
 Callout,
 Card,
 CardBody,
 CardHeader,
 CollapsibleSection,
 Grid,
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
 SERVICE_LEVEL_ACTORS,
 getPainActors,
 painMatchesActor,
 PERU_CONTEXTS,
 type ServiceLevelActor,
} from "./peru-context-nav";
import {
 PE_SERVICE_LEVEL,
 type ServiceLevelFeature,
 type ServiceLevelPain,
 type ServiceLevelPriority,
} from "./peru-service-level";
import type { PeruAgendaTab } from "./peru-view";
import { ThemeHorizonBanner } from "@/components/theme-horizon-banner";

const PRIORITY_ORDER: Record<ServiceLevelPriority, number> = {
 Critical: 0,
 High: 1,
 Medium: 2,
 Low: 3,
};

function dedupePains(pains: ServiceLevelPain[]): ServiceLevelPain[] {
 const byId = new Map<string, ServiceLevelPain>();
 for (const pain of pains) {
 if (!byId.has(pain.id)) byId.set(pain.id, pain);
 }
 return Array.from(byId.values()).sort(
 (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
 );
}

function quoteCountLabel(count: number): string {
 return count === 1 ? "1 field quote" : `${count} field quotes`;
}

function priorityTone(p: ServiceLevelPriority): "warning" | "info" | "neutral" | "success" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 if (p === "Medium") return "neutral";
 return "success";
}

function statusTone(s: ServiceLevelFeature["status"]): "success" | "info" | "warning" | "neutral" {
 if (s === "live") return "success";
 if (s === "beta") return "info";
 if (s === "planned") return "warning";
 return "neutral";
}

function PainCard({ pain }: { pain: ServiceLevelPain }) {
 const quoteCount = pain.quotes?.length ?? 0;
 return (
 <CollapsibleSection
 title={pain.title}
 trailing={`${pain.priority}${quoteCount > 0 ? ` · ${quoteCountLabel(quoteCount)}` : ""}`}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Row gap={8} wrap>
 <Pill size="sm" tone={priorityTone(pain.priority)}>
 {pain.priority}
 </Pill>
 <Pill size="sm" tone="neutral">
 {pain.category}
 </Pill>
 {getPainActors(pain.category).map((actor) => (
 <Pill key={actor} size="sm" tone="info">
 {actor}
 </Pill>
 ))}
 </Row>
 <ReaderText size="small">{pain.summary}</ReaderText>
 {pain.workaround && (
 <Callout tone="neutral" title="Current workaround">
 <Text size="small">{pain.workaround}</Text>
 </Callout>
 )}
 {pain.productResponse && (
 <Callout tone="info" title="2027 direction">
 <Text size="small">{pain.productResponse}</Text>
 </Callout>
 )}
 {pain.metrics && pain.metrics.length > 0 && (
 <Row gap={8} wrap>
 {pain.metrics.map((m) => (
 <Pill key={m} size="sm" tone="info">
 {m}
 </Pill>
 ))}
 </Row>
 )}
 {pain.quotes?.map((q) => (
 <Text key={q} size="small" tone="secondary" style={{ fontStyle: "italic" }}>
 &ldquo;{q}&rdquo;
 </Text>
 ))}
 </Stack>
 </CollapsibleSection>
 );
}

function filterPains(
 pains: ServiceLevelPain[],
 actor: ServiceLevelActor | "all",
): ServiceLevelPain[] {
 if (actor === "all") return pains;
 return pains.filter((p) => painMatchesActor(p.category, actor));
}

export default function PeruServiceLevelView({
 onAgendaChange,
 actor = "all",
}: {
 onAgendaChange?: (tab: PeruAgendaTab) => void;
 actor?: ServiceLevelActor | "all";
}) {
 const sl = PE_SERVICE_LEVEL;
 const filteredPains = filterPains(sl.pains, actor);
 const dedupedPains = dedupePains(filteredPains);
 const criticalPains = dedupedPains.filter((p) => p.priority === "Critical");
 const highPains = dedupedPains.filter((p) => p.priority === "High");
 const otherPains = dedupedPains.filter(
 (p) => p.priority !== "Critical" && p.priority !== "High",
 );
 const horizonMeta = PERU_CONTEXTS.find((c) => c.id === "service-level");

 const actorLabel =
 actor === "all"
 ? "All actors"
 : SERVICE_LEVEL_ACTORS.find((a) => a.id === actor)?.label ?? actor;

 return (
 <Stack gap={20}>
 <TabPageHeader
 title="Service level vision"
 date={sl.date}
 subtitle={`${sl.locations.join(" · ")} · ${sl.participants} · ${actorLabel}`}
 />

 <TabExecutiveSummary
 headline={sl.executiveSummary.headline}
 paragraphs={sl.executiveSummary.paragraphs}
 />

 <TabStatGrid
 stats={sl.executiveSummary.stats.map((s) => ({
 label: s.label,
 value: s.value,
 }))}
 />

 {horizonMeta && (
 <ThemeHorizonBanner
 plan={{
 primaryPhase: horizonMeta.primaryPhase,
 now: horizonMeta.horizonPlan.now,
 next: horizonMeta.horizonPlan.next,
 later: horizonMeta.horizonPlan.later,
 gateNote: horizonMeta.horizonPlan.gateNote,
 }}
 />
 )}

 {onAgendaChange && (
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => onAgendaChange("store-visits")}>
 ← Store visits (Aug 31)
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-ops")}>
 Workshop · Operations (Sep 2) →
 </Button>
 </Row>
 )}

 {actor === "all" && (
 <Stack gap={16}>
 <Callout tone="neutral" title="How to read this list">
 <Text size="small">
 Each pain appears once, sorted by priority. The number after the title is{" "}
 <strong>field quotes</strong> captured in the Sep 1 sessions — not a severity score.
 Use actor filters above to narrow by Courier, Seller, CX or Admin.
 </Text>
 </Callout>

 <CollapsibleSection
 title="Critical priorities"
 count={criticalPains.length}
 defaultOpen
 >
 <Stack gap={8} style={{ paddingTop: 12 }}>
 {criticalPains.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>

 {highPains.length > 0 && (
 <CollapsibleSection title="High priority" count={highPains.length} defaultOpen>
 <Stack gap={8} style={{ paddingTop: 12 }}>
 {highPains.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>
 )}

 <CollapsibleSection title="Medium & other topics" count={otherPains.length}>
 <Stack gap={8} style={{ paddingTop: 12 }}>
 {otherPains.map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>
 </Stack>
 )}

 {actor !== "all" && (
 <>
 <CollapsibleSection
 title={`Critical · ${actorLabel}`}
 count={criticalPains.length}
 defaultOpen
 >
 <Stack gap={8} style={{ paddingTop: 12 }}>
 {criticalPains.length === 0 ? (
 <Text size="small" tone="secondary">
 No critical pains tagged for this actor.
 </Text>
 ) : (
 criticalPains.map((pain) => <PainCard key={pain.id} pain={pain} />)
 )}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title={`Other topics · ${actorLabel}`} count={otherPains.length + highPains.length}>
 <Stack gap={8} style={{ paddingTop: 12 }}>
 {[...highPains,...otherPains].map((pain) => (
 <PainCard key={pain.id} pain={pain} />
 ))}
 </Stack>
 </CollapsibleSection>
 </>
 )}

 {/* pains shown above */}

 <CollapsibleSection title="Service level pillars" count={sl.pillars.length} defaultOpen={actor === "all"}>
 <Grid columns={2} gap={12} style={{ paddingTop: 12 }}>
 {sl.pillars.map((pillar) => (
 <Card key={pillar.id}>
 <CardHeader trailing={pillar.kpis.join(" · ")}>{pillar.label}</CardHeader>
 <CardBody>
 <ReaderText size="small">{pillar.summary}</ReaderText>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Product roadmap" count={sl.upcomingFeatures.length} defaultOpen={actor === "all"}>
 <div style={{ paddingTop: 12 }}>
 <Table
 headers={["Feature", "Pillar", "Status", "Summary"]}
 rows={sl.upcomingFeatures.map((f) => [
 f.name,
 f.pillar,
 <Pill key={f.name} size="sm" tone={statusTone(f.status)}>
 {f.status}
 </Pill>,
 f.summary,
 ])}
 striped
 />
 </div>
 </CollapsibleSection>

 <CollapsibleSection title="Product highlights & competitive context" count={sl.productHighlights.length}>
 <Grid columns={3} gap={12} style={{ paddingTop: 12 }}>
 {sl.productHighlights.map((block) => (
 <Card key={block.title}>
 <CardHeader>{block.title}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {block.items.map((item) => (
 <Text key={item} size="small" tone="secondary">
 • {item}
 </Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <TabSource>Source: {sl.source}</TabSource>
 </Stack>
 );
}
