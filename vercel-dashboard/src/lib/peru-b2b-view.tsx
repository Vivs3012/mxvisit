"use client";

import {
 Button,
 Callout,
 Card,
 CardBody,
 CardHeader,
 CollapsibleSection,
 Grid,
 H2,
 H3,
 Pill,
 Row,
 Stack,
 Text,
} from "@/components/ui";
import { ReaderText } from "./reader-text-ui";
import {
 TabContextCallout,
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import { PE_B2B_PLATFORM, type B2bScreen } from "./peru-b2b-platform";
import type { PeruAgendaTab } from "./peru-view";

type NavigateToRoadmap = (roadmapId: string) => void;

function B2bScreenCard({ screen }: { screen: B2bScreen }) {
 return (
 <CollapsibleSection
 title={screen.title}
 trailing={screen.module}
 count={screen.highlights.length}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Pill size="sm" tone={screen.audience === "admin" ? "warning" : "info"}>
 {screen.audience === "admin" ? "Admin / OPS" : "Store view"}
 </Pill>
 <ReaderText size="small">{screen.summary}</ReaderText>
 <Stack gap={4}>
 {screen.highlights.map((h) => (
 <Text key={h} size="small" tone="secondary">• {h}</Text>
 ))}
 </Stack>
 <img
 src={screen.image}
 alt={screen.title}
 style={{
 width: "100%",
 borderRadius: 8,
 border: "1px solid var(--border, #e5e7eb)",
 }}
 />
 </Stack>
 </CollapsibleSection>
 );
}

export default function PeruB2bPlatformView({
 onNavigateToRoadmap,
 onAgendaChange,
}: {
 onNavigateToRoadmap?: NavigateToRoadmap;
 onAgendaChange?: (tab: PeruAgendaTab) => void;
}) {
 const p = PE_B2B_PLATFORM;
 const storeScreens = p.screens.filter((s) => s.audience === "store");
 const adminScreens = p.screens.filter((s) => s.audience === "admin");

 return (
 <Stack gap={20}>
 <TabPageHeader
 title={`${p.brand} — ${p.name}`}
 badge={p.alias}
 subtitle={`${p.owner} · Role: ${p.role}`}
 />

 {onAgendaChange && (
 <TabContextCallout title="Where this sits in the Peru visit">
 <Text size="small">{p.hierarchyNote}</Text>
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => onAgendaChange("context-meeting")}>
 ← Context meeting
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("store-visits")}>
 Store visits (WebPO validated) →
 </Button>
 </Row>
 </TabContextCallout>
 )}

 <TabExecutiveSummary
 headline={p.executiveSummary.headline}
 paragraphs={p.executiveSummary.paragraphs}
 />

 <TabStatGrid stats={p.executiveSummary.stats} />

 <CollapsibleSection title="Origin & pivot — why payments changed everything" defaultOpen>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Text size="small">{p.originStory.trigger} — {p.originStory.pain}</Text>
 <Text size="small">{p.originStory.mvp}</Text>
 <Callout tone="warning" title={p.originStory.pivot}>
 <Grid columns={2} gap={12}>
 <Stack gap={4}>
 <Text weight="semibold" size="small">Before Jul 20 ({p.adoptionMetrics.beforePivot.totalPocs} POCs)</Text>
 <Text size="small">Never: {p.adoptionMetrics.beforePivot.neverUsed}</Text>
 <Text size="small">Intermittent: {p.adoptionMetrics.beforePivot.intermittent}</Text>
 <Text size="small">Weekly: {p.adoptionMetrics.beforePivot.weekly}</Text>
 <Text size="small">Daily: {p.adoptionMetrics.beforePivot.daily}</Text>
 </Stack>
 <Stack gap={4}>
 <Text weight="semibold" size="small">After Jul 20</Text>
 <Text size="small">High usage: {p.adoptionMetrics.afterPivot.highUsage}</Text>
 <Text size="small">Payments module: {p.adoptionMetrics.afterPivot.pagosModule}</Text>
 <Text size="small">Operations module: {p.adoptionMetrics.afterPivot.operacionesModule}</Text>
 <Text size="small">Recommended products: {p.adoptionMetrics.afterPivot.productosRecomendados}</Text>
 </Stack>
 </Grid>
 </Callout>
 {p.originStory.quotes.map((q) => (
 <Text key={q} size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Payments — product gap (order-level detail)" defaultOpen>
 <Stack gap={8} style={{ paddingTop: 10 }}>
 <Text size="small">{p.paymentModuleGap.currentState}</Text>
 <Callout tone="warning" title="Risk">
 <Text size="small">{p.paymentModuleGap.risk}</Text>
 </Callout>
 <Text size="small" weight="semibold">Product ask</Text>
 <Text size="small">{p.paymentModuleGap.ask}</Text>
 <Stack gap={4}>
 {p.paymentModuleGap.dataInputs.map((i) => (
 <Text key={i} size="small" tone="secondary">• {i}</Text>
 ))}
 </Stack>
 <Text size="small" tone="tertiary">{p.paymentModuleGap.beesShare}</Text>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Operations module — KPI impact" count={p.operacionesImpact.deltas.length}>
 <Stack gap={8} style={{ paddingTop: 10 }}>
 <Text size="small">{p.operacionesImpact.methodology}</Text>
 <TabStatGrid
 columns={4}
 stats={p.operacionesImpact.deltas.map((d) => ({
 label: d.metric,
 value: d.delta,
 }))}
 />
 <Text size="small" tone="secondary">{p.operacionesImpact.note}</Text>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Notification center (Braze) — Peru live Sep 2">
 <Stack gap={6} style={{ paddingTop: 10 }}>
 <Text size="small">{p.notificationCenter.status}</Text>
 <Text size="small">{p.notificationCenter.capability}</Text>
 <Text size="small" tone="secondary">{p.notificationCenter.boliviaPilot}</Text>
 <Text size="small" style={{ fontStyle: "italic" }}>"{p.notificationCenter.quote}"</Text>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Navigation — what stores see" count={p.navigation.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {p.navigation.map((nav) => (
 <Card key={nav.id}>
 <CardBody>
 <Stack gap={4}>
 <Text weight="semibold" size="small">{nav.label}</Text>
 <Text size="small" tone="secondary">{nav.purpose}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Store-facing screens" count={storeScreens.length} defaultOpen>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Text size="small" tone="secondary">
 Walkthrough from screenshots — how a POC owner uses Web Tiendas week to week.
 </Text>
 {storeScreens.map((screen) => (
 <B2bScreenCard key={screen.id} screen={screen} />
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Validated in store visits (Aug 31)" count={p.storeValidation.length} defaultOpen>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {p.storeValidation.map((v) => (
 <Card key={v.store}>
 <CardHeader>{v.store}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 <Text size="small" style={{ fontStyle: "italic" }}>"{v.quote}"</Text>
 <Callout tone="warning" title="Gap">
 <Text size="small">{v.gap}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={p.adminWorkflow.title} defaultOpen>
 <Stack gap={12} style={{ paddingTop: 10 }}>
 <Text size="small" tone="secondary">{p.adminWorkflow.presenter}</Text>
 {p.adminWorkflow.steps.map((step) => (
 <Card key={step.title}>
 <CardBody>
 <Stack gap={4}>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold" size="small">{step.title}</Text>
 {step.frequency && <Pill size="sm" tone="neutral">{step.frequency}</Pill>}
 </Row>
 <ReaderText size="small">{step.detail}</ReaderText>
 </Stack>
 </CardBody>
 </Card>
 ))}
 <H3 style={{ margin: 0 }}>From the walkthrough (audio)</H3>
 {p.adminWorkflow.quotes.map((q) => (
 <Text key={q} size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
 ))}
 {adminScreens.map((screen) => (
 <B2bScreenCard key={screen.id} screen={screen} />
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Gaps vs official seller app" count={p.gapsVsOfficialApp.length}>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {p.gapsVsOfficialApp.map((g) => (
 <Text key={g} size="small">• {g}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 {onNavigateToRoadmap && (
 <CollapsibleSection title="Links to UX roadmap" count={p.roadmapLinks.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {p.roadmapLinks.map((link) => (
 <Card key={link.id}>
 <CardBody>
 <Stack gap={6}>
 <Text size="small">{link.reason}</Text>
 <Button variant="secondary" onClick={() => onNavigateToRoadmap(link.id)}>
 Open: {link.id} →
 </Button>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 )}

 <TabSource>Source: {p.source}</TabSource>
 </Stack>
 );
}
