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
 PERU_CROSS_STORE_THEMES,
 PERU_INTERVIEW_INSIGHTS,
 PERU_VISIT_EXECUTIVE_SUMMARY,
 type PeruCrossTheme,
} from "./peru-insights";
import { PERU_ROADMAP_LINKS } from "./peru-roadmap-links";
import {
 PERU_TRIP_SYNTHESIS,
 type PeruCriticalPriority,
 type PeruSynthesisTheme,
 type PeruTrackId,
 type PeruTrackSnapshot,
 type PeruTripSource,
} from "./peru-trip-synthesis";
import {
 sortByInsightCategory,
 sortPeruSessionHighlights,
 sortPeruTracks,
} from "./dashboard-display-balance";
import type { PeruAgendaTab } from "./peru-view";

type NavigateToRoadmap = (roadmapId: string) => void;

function sourceTone(
 s: PeruTripSource,
): "primary" | "warning" | "info" | "success" | "neutral" {
 if (s === "Stores") return "primary";
 if (s === "Workshop") return "warning";
 if (s === "Service level") return "info";
 if (s === "B2B") return "success";
 if (s === "Consumer") return "warning";
 if (s === "Rewards") return "success";
 return "neutral";
}

function SourcePills({ sources }: { sources: PeruTripSource[] }) {
 return (
 <Row gap={6} wrap>
 {sources.map((s) => (
 <Pill key={s} size="sm" tone={sourceTone(s)}>
 {s}
 </Pill>
 ))}
 </Row>
 );
}

function priorityTone(p: PeruCrossTheme["priority"]): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function CrossThemeCard({ theme }: { theme: PeruCrossTheme }) {
 return (
 <Card>
 <CardHeader trailing={<Pill tone={priorityTone(theme.priority)} size="sm">{theme.priority}</Pill>}>
 {theme.title}
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <Row gap={6} wrap>
 {theme.stores.map((s) => (
 <Pill key={s} tone="neutral" size="sm">{s}</Pill>
 ))}
 </Row>
 <ReaderText size="small">{theme.summary}</ReaderText>
 <Callout tone="neutral" title="Why it deserves attention">
 <Text size="small">{theme.attention}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 );
}

function PriorityCard({ p }: { p: PeruCriticalPriority }) {
 return (
 <Card>
 <CardHeader trailing={<Pill tone="warning" size="sm">P{p.rank}</Pill>}>
 {p.title}
 </CardHeader>
 <CardBody>
 <Stack gap={10}>
 <Callout tone="warning" title="Why it is critical">
 <Text size="small">{p.why}</Text>
 </Callout>
 <Stack gap={6}>
 <Text weight="semibold" size="small">Evidence by source</Text>
 {p.evidence.map((e) => (
 <Row key={e.detail.slice(0, 40)} gap={8} align="start">
 <Pill tone={sourceTone(e.source)} size="sm">{e.source}</Pill>
 <ReaderText size="small" style={{ flex: 1 }}>{e.detail}</ReaderText>
 </Row>
 ))}
 </Stack>
 <Callout tone="success" title="Suggested action">
 <Text size="small">{p.suggestion}</Text>
 </Callout>
 <Text size="small" tone="tertiary">Suggested owners: {p.owners}</Text>
 </Stack>
 </CardBody>
 </Card>
 );
}

function trackTone(id: PeruTrackId): "primary" | "warning" | "info" | "success" | "neutral" {
 if (id === "seller") return "primary";
 if (id === "courier") return "info";
 if (id === "admin") return "neutral";
 if (id === "consumer") return "warning";
 return "success";
}

function TrackCard({
 track,
 onAgendaChange,
}: {
 track: PeruTrackSnapshot;
 onAgendaChange?: (tab: PeruAgendaTab) => void;
}) {
 return (
 <Card key={track.id}>
 <CardHeader trailing={<Pill size="sm" tone={trackTone(track.id)}>{track.label}</Pill>}>
 {track.sessions}
 </CardHeader>
 <CardBody>
 <Stack gap={12}>
 <Text size="small">{track.headline}</Text>
 <TabStatGrid stats={track.stats.map((st) => ({ label: st.label, value: st.value }))} />
 <Stack gap={8}>
 <Text weight="semibold" size="small">{track.priorityLabel}</Text>
 {track.priorities.map((v) => (
 <Row key={v.title} gap={8} align="start">
 <Pill size="sm" tone="warning">#{v.rank}</Pill>
 <Stack gap={2} style={{ flex: 1 }}>
 <Text size="small" weight="semibold">{v.title}</Text>
 <ReaderText size="small" tone="secondary">{v.detail}</ReaderText>
 </Stack>
 </Row>
 ))}
 </Stack>
 <CollapsibleSection title="All pains captured" count={track.pains.length}>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {track.pains.map((p) => (
 <Stack key={p.title} gap={2}>
 <Text size="small" weight="semibold">{p.title}</Text>
 <ReaderText size="small" tone="secondary">{p.detail}</ReaderText>
 </Stack>
 ))}
 </Stack>
 </CollapsibleSection>
 <Grid columns={2} gap={12}>
 <Stack gap={6}>
 <Text weight="semibold" size="small">Shipping / positive</Text>
 {track.shipping.map((item) => (
 <Text key={item} size="small">✓ {item}</Text>
 ))}
 </Stack>
 <Stack gap={6}>
 <Text weight="semibold" size="small">Gaps still open</Text>
 {track.gaps.map((item) => (
 <Text key={item} size="small">○ {item}</Text>
 ))}
 </Stack>
 </Grid>
 {onAgendaChange && (
 <Row gap={8} wrap>
 {track.group === "service-level" && (
 <>
 <Button variant="secondary" onClick={() => onAgendaChange("service-level")}>
 Service level Sep 1 →
 </Button>
 {track.id === "seller" && (
 <Button variant="secondary" onClick={() => onAgendaChange("store-visits")}>
 Store visits →
 </Button>
 )}
 {track.id === "seller" && (
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-ops")}>
 OPS workshop →
 </Button>
 )}
 </>
 )}
 {track.id === "consumer" && (
 <>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-consumer")}>
 Workshop · Consumer →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("consumer-vision")}>
 Consumer vision Sep 3 →
 </Button>
 </>
 )}
 {track.id === "rewards" && (
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-rewards")}>
 Workshop · Rewards →
 </Button>
 )}
 </Row>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function ThemeDetailCard({ t }: { t: PeruSynthesisTheme }) {
 return (
 <Card>
 <CardHeader trailing={<Pill tone="warning" size="sm">#{t.rank}</Pill>}>
 {t.title}
 </CardHeader>
 <CardBody>
 <Stack gap={6}>
 <SourcePills sources={t.sources} />
 <ReaderText size="small">{t.summary}</ReaderText>
 <Callout tone="neutral" title="Impact">
 <Text size="small">{t.impact}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 );
}

export default function PeruOverallView({
 onAgendaChange,
 onNavigateToRoadmap,
}: {
 onAgendaChange?: (tab: PeruAgendaTab) => void;
 onNavigateToRoadmap?: NavigateToRoadmap;
}) {
 const s = PERU_TRIP_SYNTHESIS;
 const visitStats = PERU_VISIT_EXECUTIVE_SUMMARY.stats;
 const sessionHighlights = sortPeruSessionHighlights(s.sessionHighlights);
 const growthTracks = sortPeruTracks(s.growthTracks);
 const serviceLevelTracks = sortPeruTracks(s.serviceLevelTracks);

 return (
 <Stack gap={20}>
 <TabPageHeader
 title="Overall trip result"
 subtitle={`${s.period} · ${s.scope}`}
 />

 <TabExecutiveSummary body={s.executiveSummary} />

 <TabStatGrid
 stats={[
 { label: "Sessions covered", value: String(s.stats.sessions) },
 { label: "POCs visited", value: String(s.stats.storesVisited) },
 { label: "Total insights", value: String(s.stats.totalInsights) },
 { label: "Cross-store themes", value: String(s.stats.crossThemes) },
 ]}
 />

 <TabStatGrid
 stats={[
 { label: "Consumer pains (Sep 3)", value: String(s.stats.consumerPains), tone: "warning" },
 { label: "Consumer P1 pains", value: String(s.stats.consumerP1Pains), tone: "warning" },
 { label: "Rewards workshop pains", value: String(s.stats.rewardsWorkshopChallenges), tone: "info" },
 { label: "Workshop challenges", value: String(s.stats.workshopChallenges) },
 ]}
 />

 <TabStatGrid
 stats={[
 { label: "Critical themes", value: String(s.stats.criticalThemes), tone: "warning" },
 { label: "Context topics", value: String(s.stats.contextTopics) },
 { label: "Service level topics", value: String(s.stats.serviceLevelTopics), tone: "info" },
 { label: "Ranked themes", value: String(s.themes.length) },
 ]}
 />

 {onAgendaChange && (
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => onAgendaChange("context-meeting")}>
 Context meeting →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("store-visits")}>
 Store visits →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-consumer")}>
 Workshop · Consumer →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-rewards")}>
 Workshop · Rewards →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("b2b-platform")}>
 B2B platform →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-ops")}>
 OYP workshop · Operations →
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("service-level")}>
 Service level →
 </Button>
 </Row>
 )}

 <CollapsibleSection title="KPI alerts — Lima visits + national context" defaultOpen>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {s.kpiAlerts.map((a) => (
 <Text key={a} size="small">• {a}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Consumer & Rewards tracks" count={growthTracks.length} defaultOpen>
 <Grid columns={1} gap={16} style={{ paddingTop: 10 }}>
 {growthTracks.map((track) => (
 <TrackCard key={track.id} track={track} onAgendaChange={onAgendaChange} />
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Service level tracks — Seller · Courier · Admin" count={serviceLevelTracks.length}>
 <Grid columns={1} gap={16} style={{ paddingTop: 10 }}>
 {serviceLevelTracks.map((track) => (
 <TrackCard key={track.id} track={track} onAgendaChange={onAgendaChange} />
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Session highlights" count={sessionHighlights.length} defaultOpen>
 <Grid columns={1} gap={10} style={{ paddingTop: 10 }}>
 {sessionHighlights.map((h) => (
 <Card key={h.session}>
 <CardHeader trailing={<Pill size="sm" tone={sourceTone(h.source)}>{h.source}</Pill>}>
 {h.session}
 </CardHeader>
 <CardBody>
 <Text size="small">{h.highlight}</Text>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Cross-store patterns (Aug 31)" count={PERU_CROSS_STORE_THEMES.length}>
 <Stack gap={12} style={{ paddingTop: 10 }}>
 <Table
 headers={["Priority", "Theme", "Stores", "Category"]}
 rows={PERU_CROSS_STORE_THEMES.map((t) => [
 <Pill key={t.title} tone={priorityTone(t.priority)} size="sm">{t.priority}</Pill>,
 t.title,
 t.stores.join(", "),
 t.category,
 ])}
 columnAlign={["center", "left", "left", "center"]}
 striped
 />
 {(["Critical", "High", "Medium"] as const).map((prio) => {
 const grouped = sortByInsightCategory(
 PERU_CROSS_STORE_THEMES.filter((t) => t.priority === prio),
 );
 if (grouped.length === 0) return null;
 return (
 <Stack key={prio} gap={8}>
 <H3 style={{ margin: 0 }}>{prio}</H3>
 {grouped.map((theme) => (
 <CrossThemeCard key={theme.title} theme={theme} />
 ))}
 </Stack>
 );
 })}
 <Text size="small" tone="tertiary">
 {visitStats.stores} stores, {visitStats.totalInsights} insights from interviews.
 </Text>
 </Stack>
 </CollapsibleSection>

 <Stack gap={8}>
 <H3 style={{ margin: 0 }}>Most mentioned topics — all sessions</H3>
 <Text size="small" tone="secondary">
 Cross-reference of Consumer vision (Sep 3), OYP workshops (Consumer · Rewards · OPS), store visits, B2B, context meeting, and Service Level (Sep 1).
 </Text>
 <Table
 headers={["#", "Theme", "Sources", "Coverage", "Impact"]}
 rows={s.themes.map((t) => [
 String(t.rank),
 t.title,
 <SourcePills key={t.rank} sources={t.sources} />,
 t.coverage,
 <Text key={`impact-${t.rank}`} size="small" tone="secondary">{t.impact}</Text>,
 ])}
 columnAlign={["center", "left", "left", "left", "left"]}
 striped
 />
 </Stack>

 <CollapsibleSection title="Detail of ranked themes" count={s.themes.length}>
 <Stack gap={10} style={{ paddingTop: 8 }}>
 {s.themes.map((t) => (
 <ThemeDetailCard key={t.rank} t={t} />
 ))}
 </Stack>
 </CollapsibleSection>

 <Stack gap={8}>
 <H3 style={{ margin: 0 }}>Convergences — all Peru sessions</H3>
 <Text size="small" tone="secondary">
 Patterns that repeat across stores, workshops, and meetings — aligned with Mexico cross-country themes.
 </Text>
 {s.convergences.map((c) => (
 <Callout key={c.slice(0, 48)} tone="neutral">
 <Text size="small">{c}</Text>
 </Callout>
 ))}
 </Stack>

 <CollapsibleSection title="Positive signals" count={s.positiveSignals.length} defaultOpen>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {s.positiveSignals.map((p) => (
 <Callout key={p.slice(0, 48)} tone="success">
 <Text size="small">{p}</Text>
 </Callout>
 ))}
 </Stack>
 </CollapsibleSection>

 <Stack gap={12}>
 <H3 style={{ margin: 0 }}>Suggested critical priorities</H3>
 <Text size="small" tone="secondary">
 Ordered by cross-session evidence — field visits, workshops, and product sessions.
 </Text>
 {s.criticalPriorities.map((p) => (
 <PriorityCard key={p.rank} p={p} />
 ))}
 </Stack>

 <CollapsibleSection title="Suggested roadmap (Now / Next / Later)" defaultOpen>
 <Grid columns={3} gap={16} style={{ paddingTop: 12 }}>
 <Card>
 <CardHeader trailing="0–3 months">Now</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {s.roadmap.now.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 <Card>
 <CardHeader trailing="3–6 months">Next</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {s.roadmap.next.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 <Card>
 <CardHeader trailing="6+ months">Later</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {s.roadmap.later.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 </Grid>
 </CollapsibleSection>

 {onNavigateToRoadmap && (
 <CollapsibleSection title="Validated against UX roadmap" count={PERU_ROADMAP_LINKS.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {PERU_ROADMAP_LINKS.map((link) => (
 <Card key={link.roadmapId}>
 <CardBody>
 <Stack gap={6}>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold" size="small">{link.title}</Text>
 <Pill tone={link.priority === "Critical" ? "warning" : "info"} size="sm">
 {link.priority}
 </Pill>
 </Row>
 <Text size="small">{link.validation}</Text>
 <Button variant="secondary" onClick={() => onNavigateToRoadmap(link.roadmapId)}>
 Open in UX roadmap →
 </Button>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 )}

 <CollapsibleSection title="Stores interviewed" count={PERU_INTERVIEW_INSIGHTS.length}>
 <Row gap={8} wrap style={{ paddingTop: 8 }}>
 {PERU_INTERVIEW_INSIGHTS.map((st) => (
 <Pill key={st.id} tone="neutral" size="sm">
 {st.name}: {st.insights.length} insights
 </Pill>
 ))}
 </Row>
 </CollapsibleSection>

 <TabSource>Source: {s.source}</TabSource>
 </Stack>
 );
}
