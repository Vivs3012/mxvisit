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
 Stat,
 Table,
 Text,
} from "@/components/ui";
import {
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import {
 MEXICO_VISIT_DATES,
 PERU_VISIT_DATES,
} from "./visit-date-nav";
import { InsightCard } from "@/components/insight-card";
import { EvidenceScopeCallout } from "@/components/evidence-scope-callout";
import { sortGlobalInsightsForDisplay } from "./dashboard-display-balance";
import { ReaderText } from "./reader-text-ui";
import {
 GLOBAL_INSIGHTS,
 globalInsightsForTopic,
 type GlobalInsight,
 type GlobalPriority,
 type GlobalTopicId,
 type GlobalTopicSnapshot,
} from "./global-insights";
import {
 GLOBAL_ROADMAP_STATS,
 countRoadmapItemsByArea,
 type GlobalRoadmapAreaId,
} from "./global-roadmap";
import {
 focusMatchesArea,
 focusMatchesDecision,
 focusMatchesInsight,
 focusMatchesResearch,
 focusMatchesSourceGroup,
 getFocusConvergences,
 type StakeholderFocus,
} from "./stakeholder-focus";
import { useLocale } from "./i18n/locale-context";
import type { Locale } from "./i18n/locale";
import { getGlobalExecutiveSummary } from "./i18n/content/global-executive";
import {
 formatGlobalCountry,
 formatGlobalLayer,
 formatGlobalPriority,
 getGlobalConvergences,
 getGlobalCrossByArea,
 getGlobalPositiveSignals,
 getGlobalSessions,
 getGlobalTopicSnapshots,
 localizeGlobalInsight,
} from "./i18n/content/global-insights-locale";
import {
 getGlobalExecutiveThemes,
 getGlobalHomologateItems,
 getGlobalOpenQuestions,
 getGlobalProductOutcome,
 getGlobalRoadmapByArea,
 getGlobalRoadmapLayers,
 getGlobalRoadmapNorthStar,
 getGlobalRoadmapPhaseMeta,
 localizeRoadmapItem,
} from "./i18n/content/global-roadmap-locale";
import {
 formatEvidenceLens,
 getGlobalResearchDecisions,
 getGlobalResearchLenses,
 getGlobalResearchSourceGroups,
 getGlobalResearchSummary,
} from "./i18n/content/global-research-locale";
import { globalTabUi } from "./i18n/content/global-tab-ui";
import { getEcuadorVisitDates } from "./i18n/content/ecuador-nav-locale";
import { getColombiaVisitDates } from "./i18n/content/colombia-nav-locale";
import { getFocusExecutiveSummaries, getStakeholderOption } from "./i18n/stakeholder";
import { UI } from "./i18n/ui";
import type { PeruContextId } from "./peru-context-nav";
import type { UxRoadmapPhase } from "./ux-roadmap";

type NavigateToRoadmap = (roadmapId: string) => void;

const PHASES: UxRoadmapPhase[] = ["now", "next", "later"];

function priorityTone(p: GlobalPriority): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function layerTone(
 layer: GlobalInsight["layer"],
): "warning" | "info" | "success" | "neutral" | "primary" {
 if (layer === "Reliability") return "warning";
 if (layer === "Portfolio") return "success";
 if (layer === "Peak ops") return "info";
 if (layer === "Metrics") return "primary";
 if (layer === "Loyalty") return "warning";
 if (layer === "Growth") return "info";
 return "neutral";
}

function areaTone(id: GlobalRoadmapAreaId): "warning" | "info" | "success" | "neutral" {
 if (id === "operations") return "warning";
 if (id === "consumer") return "info";
 if (id === "rewards") return "success";
 if (id === "commercial") return "neutral";
 return "info";
}

function RoadmapItemCard({
 item,
 locale,
 onNavigateToRoadmap,
}: {
 item: { theme: string; outcome: string; itemIds: string[]; evidence?: string };
 locale: Locale;
 onNavigateToRoadmap?: NavigateToRoadmap;
}) {
 return (
 <Card>
 <CardHeader>{item.theme}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 <Text size="small">{item.outcome}</Text>
 {item.evidence && (
 <Text size="small" tone="tertiary">{item.evidence}</Text>
 )}
 {item.itemIds.length > 0 && onNavigateToRoadmap && (
 <Button variant="secondary" onClick={() => onNavigateToRoadmap(item.itemIds[0])}>
 {globalTabUi(locale, "viewBacklog")}
 </Button>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function phaseTone(phase: UxRoadmapPhase): "warning" | "info" | "neutral" {
 if (phase === "now") return "warning";
 if (phase === "next") return "info";
 return "neutral";
}

function executivePhaseTone(phase: UxRoadmapPhase | "gate"): "warning" | "info" | "neutral" {
 if (phase === "now") return "warning";
 if (phase === "next") return "info";
 return "neutral";
}

function executivePhaseLabel(locale: Locale, phase: UxRoadmapPhase | "gate"): string {
 if (phase === "gate") return globalTabUi(locale, "phaseGate");
 return getGlobalRoadmapPhaseMeta(locale, phase).label;
}

function topicTone(id: GlobalTopicId): "info" | "success" {
 return id === "consumer" ? "info" : "success";
}

function GlobalTopicSection({
 snapshot,
 locale,
 onPeruThemeNavigate,
 onNavigateToRoadmap,
}: {
 snapshot: GlobalTopicSnapshot;
 locale: Locale;
 onPeruThemeNavigate?: (context: PeruContextId) => void;
 onNavigateToRoadmap?: NavigateToRoadmap;
}) {
 const insights = globalInsightsForTopic(snapshot.id).map((i) => localizeGlobalInsight(i, locale));
 const peruContext: PeruContextId = snapshot.id;
 return (
 <Card>
 <CardHeader trailing={<Pill size="sm" tone={topicTone(snapshot.id)}>{snapshot.label}</Pill>}>
 {globalTabUi(locale, "topicsHeader", { label: snapshot.label })}
 </CardHeader>
 <CardBody>
 <Stack gap={12}>
 <Text size="small">{snapshot.headline}</Text>
 <Row gap={6} wrap>
 {snapshot.sources.map((src) => (
 <Pill key={src} size="sm" tone="neutral">{src}</Pill>
 ))}
 </Row>
 {snapshot.workshopVoteBlocks.map((block) => (
 <Stack gap={8} key={block.id}>
 <Text weight="semibold" size="small">{block.label}</Text>
 {block.votes.map((v) => (
 <Row key={`${block.id}-${v.title}`} gap={8} align="start">
 {v.votes != null ? (
 <Pill size="sm" tone="warning">{v.votes}v</Pill>
 ) : v.rank != null && v.rank > 0 ? (
 <Pill size="sm" tone="warning">#{v.rank}</Pill>
 ) : (
 <Pill size="sm" tone="danger">!</Pill>
 )}
 <Stack gap={2} style={{ flex: 1 }}>
 <Text size="small" weight="semibold">{v.title}</Text>
 <ReaderText size="small" tone="secondary">{v.detail}</ReaderText>
 </Stack>
 </Row>
 ))}
 </Stack>
 ))}
 <CollapsibleSection title={globalTabUi(locale, "fieldThemesCaptured")} count={snapshot.themes.length}>
 <Stack gap={4} style={{ paddingTop: 8 }}>
 {snapshot.themes.map((t) => (
 <Text key={t} size="small">• {t}</Text>
 ))}
 </Stack>
 </CollapsibleSection>
 <Stack gap={8}>
 <Text weight="semibold" size="small">
 {globalTabUi(locale, "rankedInsights", { n: String(insights.length) })}
 </Text>
 {insights.map((insight) => (
 <InsightCard
 key={insight.rank}
 insight={insight}
 locale={locale}
 onNavigateToRoadmap={onNavigateToRoadmap}
 />
 ))}
 </Stack>
 {onPeruThemeNavigate && (
 <Button variant="secondary" onClick={() => onPeruThemeNavigate(peruContext)}>
 {globalTabUi(locale, "peruDetailBtn", { label: snapshot.label })}
 </Button>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function ExecutiveThemeCard({
 theme,
 locale,
 onPeruThemeNavigate,
}: {
 theme: ReturnType<typeof getGlobalExecutiveThemes>[number];
 locale: Locale;
 onPeruThemeNavigate?: (context: PeruContextId) => void;
}) {
 return (
 <Card>
 <CardHeader
 trailing={
 <Pill size="sm" tone={executivePhaseTone(theme.primaryPhase)}>
 {executivePhaseLabel(locale, theme.primaryPhase)}
 </Pill>
 }
 >
 {theme.label}
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <Text size="small" tone="tertiary">{theme.aliases}</Text>
 <Callout tone="warning" title={globalTabUi(locale, "q1Action")}>
 <Text size="small" weight="semibold">{theme.nowAction}</Text>
 </Callout>
 <Stack gap={4}>
 <Text size="small" weight="semibold">{globalTabUi(locale, "topProblems")}</Text>
 {theme.topProblems.map((problem) => (
 <Text key={problem} size="small">• {problem}</Text>
 ))}
 </Stack>
 {onPeruThemeNavigate && (
 <Button variant="secondary" onClick={() => onPeruThemeNavigate(theme.peruContext)}>
 {globalTabUi(locale, "peruDetailShort")}
 </Button>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

export default function GlobalView({
 focus = "all",
 onNavigateToRoadmap,
 onCountryChange,
 onPeruThemeNavigate,
}: {
 focus?: StakeholderFocus;
 onNavigateToRoadmap?: NavigateToRoadmap;
 onCountryChange?: (country: "mexico" | "peru") => void;
 onPeruThemeNavigate?: (context: PeruContextId) => void;
}) {
 const { locale, t } = useLocale();
 const priorities: GlobalPriority[] = ["Critical", "High", "Medium"];
 const focusMeta = getStakeholderOption(locale, focus);
 const globalExec = getGlobalExecutiveSummary(locale);
 const focusExec = getFocusExecutiveSummaries(locale);
 const researchSummary = getGlobalResearchSummary(locale);
 const fieldSessions = getGlobalSessions(locale);
 const positiveSignals = getGlobalPositiveSignals(locale);
 const allInsightsLocalized = GLOBAL_INSIGHTS.map((i) => localizeGlobalInsight(i, locale));
 const visibleInsights = allInsightsLocalized.filter((insight) => focusMatchesInsight(focus, insight));
 const OWNER_SORT: Record<"consumer" | "rewards" | "service-level", number> = {
 consumer: 0,
 rewards: 1,
 "service-level": 2,
 };
 const visibleResearchLenses = getGlobalResearchLenses(locale)
 .filter((lens) => focusMatchesResearch(focus, lens))
 .sort((a, b) => OWNER_SORT[a.owner] - OWNER_SORT[b.owner]);
 const crossByArea = getGlobalCrossByArea(locale);
 const visibleAreas = crossByArea.filter((area) => focusMatchesArea(focus, area.area));
 const roadmapByArea = getGlobalRoadmapByArea(locale);
 const visibleRoadmapAreas = roadmapByArea.filter((area) => focusMatchesArea(focus, area.label));
 const executiveThemes = getGlobalExecutiveThemes(locale);
 const visibleExecutiveThemes =
 focus === "all" ? executiveThemes : executiveThemes.filter((theme) => theme.id === focus);
 const visibleSourceGroups = getGlobalResearchSourceGroups(locale).filter((source) =>
 focusMatchesSourceGroup(focus, source.group),
 );
 const visibleResearchDecisions = getGlobalResearchDecisions(locale).filter((decision) =>
 focusMatchesDecision(focus, decision),
 );
 const topicSnapshots = getGlobalTopicSnapshots(locale);
 const visibleTopics =
 focus === "consumer"
 ? topicSnapshots.filter((snapshot) => snapshot.id === "consumer")
 : focus === "rewards"
 ? topicSnapshots.filter((snapshot) => snapshot.id === "rewards")
 : focus === "service-level"
 ? []
 : topicSnapshots;
 const productOutcome = getGlobalProductOutcome(locale);
 const convergencesAll = getGlobalConvergences(locale);
 const homologateItems = getGlobalHomologateItems(locale);
 const openQuestions = getGlobalOpenQuestions(locale);
 const ecuadorVisitDates = getEcuadorVisitDates(locale);
 const colombiaVisitDates = getColombiaVisitDates(locale);

 return (
 <Stack gap={24}>
 <TabPageHeader
 title={
 focus === "all"
 ? globalTabUi(locale, "pageTitleAll")
 : globalTabUi(locale, "pageTitleFocus", { label: focusMeta.label })
 }
 subtitle={
 focus === "all"
 ? globalTabUi(locale, "pageSubtitleAll", {
 sessions: String(fieldSessions.length),
 themes: String(GLOBAL_INSIGHTS.length),
 })
 : globalTabUi(locale, "pageSubtitleFocus", { description: focusMeta.description })
 }
 />

 <Callout tone="warning" title={globalTabUi(locale, "outcome2027")}>
 <Stack gap={6}>
 <Text weight="semibold" size="small">
 {productOutcome.statement}
 </Text>
 <Row gap={16} wrap>
 <Text size="small">
 {globalTabUi(locale, "primary")} {productOutcome.primaryMetric}
 </Text>
 <Text size="small" tone="secondary">
 {globalTabUi(locale, "persona")} {productOutcome.persona}
 </Text>
 </Row>
 </Stack>
 </Callout>

 {focus !== "all" && (
 <Callout tone={focusMeta.tone} title={globalTabUi(locale, "decisionLens", { label: focusMeta.label })}>
 <Text size="small">{focusMeta.decision}</Text>
 </Callout>
 )}

 <TabExecutiveSummary
 title={t(UI.executiveSummary)}
 headline={focus === "all" ? globalExec.headline : focusExec[focus].headline}
 paragraphs={focus === "all" ? globalExec.paragraphs : focusExec[focus].paragraphs}
 />

 <TabStatGrid stats={globalExec.stats} />

 <EvidenceScopeCallout />

 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{globalTabUi(locale, "researchSectionTitle")}</H3>
 <Text size="small" tone="secondary">
 {globalTabUi(locale, "researchSectionLead")}
 </Text>
 <TabStatGrid stats={researchSummary.stats} />
 <Callout tone="info" title={researchSummary.thesis}>
 <Text size="small">{researchSummary.scope}</Text>
 <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
 {globalTabUi(locale, "readingLimit")} {researchSummary.limitation}
 </Text>
 </Callout>
 <Grid columns={2} gap={12}>
 {visibleResearchLenses.map((lens) => (
 <Card key={lens.title}>
 <CardHeader
 trailing={
 <Row gap={4} wrap>
 <Pill
 size="sm"
 tone={
 lens.lens === "Competition" ? "warning" : lens.lens === "Research" ? "info" : "success"
 }
 >
 {formatEvidenceLens(locale, lens.lens)}
 </Pill>
 <Pill size="sm" tone="neutral">{lens.countries}</Pill>
 </Row>
 }
 >
 {lens.title}
 </CardHeader>
 <CardBody>
 <Stack gap={6}>
 <Text size="small">{lens.evidence}</Text>
 <Text size="small" tone="secondary">
 <strong>{globalTabUi(locale, "implication")}</strong> {lens.implication}
 </Text>
 <Callout tone="info" title={globalTabUi(locale, "decision")}>
 <Text size="small">{lens.action}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 <CollapsibleSection title={globalTabUi(locale, "integratedDecisions")} count={visibleResearchDecisions.length} defaultOpen>
 <Table
 headers={[
 globalTabUi(locale, "tableHorizon"),
 globalTabUi(locale, "tableDecision"),
 globalTabUi(locale, "tableMeasure"),
 globalTabUi(locale, "tableEvidence"),
 ]}
 rows={visibleResearchDecisions.map((d) => [d.horizon, d.decision, d.measure, d.evidence])}
 striped
 />
 </CollapsibleSection>
 <CollapsibleSection title={globalTabUi(locale, "crossSourceMap")} count={visibleSourceGroups.length}>
 <Table
 headers={[
 globalTabUi(locale, "tableLayer"),
 globalTabUi(locale, "tableSources"),
 globalTabUi(locale, "tableReading"),
 ]}
 rows={visibleSourceGroups.map((s) => [s.group, s.sources, s.reading])}
 striped
 />
 </CollapsibleSection>
 </Stack>

 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{globalTabUi(locale, "executiveSnapshot")}</H3>
 <Text size="small" tone="secondary">
 {globalTabUi(locale, "executiveSnapshotLead")}
 </Text>
 <Grid columns={3} gap={12}>
 {visibleExecutiveThemes.map((theme) => (
 <ExecutiveThemeCard
 key={theme.id}
 theme={theme}
 locale={locale}
 onPeruThemeNavigate={onPeruThemeNavigate}
 />
 ))}
 </Grid>
 </Stack>

 {visibleTopics.length > 0 && (
 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{globalTabUi(locale, "consumerRewardsTopics")}</H3>
 <Text size="small" tone="secondary">
 {globalTabUi(locale, "consumerRewardsLead")}
 </Text>
 <Grid columns={1} gap={16}>
 {visibleTopics.map((snapshot) => (
 <GlobalTopicSection
 key={snapshot.id}
 snapshot={snapshot}
 locale={locale}
 onPeruThemeNavigate={onPeruThemeNavigate}
 onNavigateToRoadmap={onNavigateToRoadmap}
 />
 ))}
 </Grid>
 </Stack>
 )}

 {/* Critical insights — before roadmap for executive scan */}
 {priorities.map((prio) => {
 const insights = sortGlobalInsightsForDisplay(
 visibleInsights.filter((insight) => insight.priority === prio),
 );
 if (insights.length === 0) return null;
 return (
 <CollapsibleSection
 key={prio}
 title={`${formatGlobalPriority(locale, prio)} ${globalTabUi(locale, "insightsSuffix")}`}
 count={insights.length}
 defaultOpen={prio === "Critical"}
 >
 <Stack gap={12} style={{ paddingTop: 12 }}>
 {insights.map((insight) => (
 <InsightCard
 key={insight.rank}
 insight={insight}
 locale={locale}
 onNavigateToRoadmap={onNavigateToRoadmap}
 />
 ))}
 </Stack>
 </CollapsibleSection>
 );
 })}

 {/* Country jump */}
 {onCountryChange && (
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => onCountryChange("mexico")}>
 {globalTabUi(locale, "mexicoDetail")}
 </Button>
 <Button variant="secondary" onClick={() => onCountryChange("peru")}>
 {globalTabUi(locale, "peruDetail")}
 </Button>
 {onNavigateToRoadmap && (
 <Button variant="secondary" onClick={() => onNavigateToRoadmap("order-alert-session")}>
 {globalTabUi(locale, "fullBacklog")}
 </Button>
 )}
 </Row>
 )}

 {/* 4. Strategic roadmap */}
 <Stack gap={12}>
 <H3 style={{ margin: 0 }}>{globalTabUi(locale, "strategicRoadmap")}</H3>
 <Callout tone="info" title={globalTabUi(locale, "northStar")}>
 <Text size="small">{getGlobalRoadmapNorthStar(locale)}</Text>
 </Callout>

 <Grid columns={3} gap={10}>
 {getGlobalRoadmapLayers(locale).map((l) => (
 <Card key={l.layer}>
 <CardHeader trailing={l.subtitle}>{l.layer}</CardHeader>
 <CardBody>
 <ReaderText size="small">{l.detail}</ReaderText>
 </CardBody>
 </Card>
 ))}
 </Grid>

 <Grid columns={3} gap={10}>
 {PHASES.map((phase) => {
 const meta = getGlobalRoadmapPhaseMeta(locale, phase);
 return (
 <Stat
 key={phase}
 label={`${meta.label} (${meta.horizon})`}
 value={String(GLOBAL_ROADMAP_STATS.phaseCounts[phase])}
 tone={phaseTone(phase)}
 />
 );
 })}
 </Grid>

 <Callout tone="neutral" title={globalTabUi(locale, "exitCriteria")}>
 <Stack gap={6}>
 {PHASES.map((phase) => {
 const meta = getGlobalRoadmapPhaseMeta(locale, phase);
 return (
 <Text key={phase} size="small">
 <strong>{meta.label}:</strong> {meta.exitCriteria}
 </Text>
 );
 })}
 </Stack>
 </Callout>

 <Grid columns={5} gap={10}>
 {visibleRoadmapAreas.map((area) => (
 <Stat
 key={area.id}
 label={area.label}
 value={String(countRoadmapItemsByArea(area.id))}
 tone={areaTone(area.id)}
 />
 ))}
 </Grid>

 {visibleRoadmapAreas.map((area) => (
 <CollapsibleSection
 key={area.id}
 title={area.label}
 trailing={area.subtitle}
 count={countRoadmapItemsByArea(area.id)}
 defaultOpen={
 area.id === "operations" || area.id === "consumer" || area.id === "rewards"
 }
 >
 <Stack gap={16} style={{ paddingTop: 12 }}>
 {area.id === "rewards" && (
 <Callout tone="warning" title={globalTabUi(locale, "rewardsGate")}>
 <Text size="small">{globalTabUi(locale, "rewardsGateBody")}</Text>
 </Callout>
 )}

 <Row gap={6} wrap>
 {area.sources.map((src) => (
 <Pill key={src} size="sm" tone={areaTone(area.id)}>
 {src}
 </Pill>
 ))}
 </Row>

 {PHASES.map((phase) => {
 const items = area.phases[phase];
 if (items.length === 0) return null;
 const meta = getGlobalRoadmapPhaseMeta(locale, phase);
 return (
 <Stack key={phase} gap={10}>
 <Row gap={10} align="center" wrap>
 <Pill size="sm" tone={phaseTone(phase)}>
 {meta.label}
 </Pill>
 <Text size="small" tone="secondary">
 {meta.horizon} — {meta.goal}
 </Text>
 </Row>
 <Grid columns={2} gap={10}>
 {items.map((item) => (
 <RoadmapItemCard
 key={`${area.id}-${phase}-${item.theme}`}
 item={localizeRoadmapItem(item, locale)}
 locale={locale}
 onNavigateToRoadmap={onNavigateToRoadmap}
 />
 ))}
 </Grid>
 </Stack>
 );
 })}
 </Stack>
 </CollapsibleSection>
 ))}

 <CollapsibleSection title={globalTabUi(locale, "homologate")} count={homologateItems.length}>
 <div style={{ paddingTop: 8 }}>
 <Table
 headers={[
 globalTabUi(locale, "tableSignal"),
 globalTabUi(locale, "tableCountry"),
 globalTabUi(locale, "tableAction"),
 ]}
 rows={homologateItems.map((h) => [h.signal, h.country, h.action])}
 striped
 />
 </div>
 </CollapsibleSection>

 <CollapsibleSection title={globalTabUi(locale, "openQuestions")} count={openQuestions.length}>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {openQuestions.map((q) => (
 <Text key={q} size="small">
 • {q}
 </Text>
 ))}
 </Stack>
 </CollapsibleSection>
 </Stack>

 {/* 5. Field themes (qualitative) — collapsed; phased roadmap is above by area */}
 <CollapsibleSection
 title={globalTabUi(locale, "fieldThemesQual")}
 count={crossByArea.reduce((n, a) => n + a.themes.length, 0)}
 defaultOpen
 >
 <Grid columns={2} gap={12} style={{ paddingTop: 12 }}>
 {visibleAreas.map((area) => (
 <Card key={area.area}>
 <CardHeader trailing={String(area.themes.length)}>{area.area}</CardHeader>
 <CardBody>
 <Row gap={4} wrap style={{ marginBottom: 8 }}>
 {area.sources.map((src) => (
 <Pill key={src} size="sm" tone="neutral">
 {src}
 </Pill>
 ))}
 </Row>
 <Stack gap={4}>
 {area.themes.map((t) => (
 <Text key={t} size="small">
 • {t}
 </Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 {/* Convergences — collapsed */}
 <CollapsibleSection
 title={globalTabUi(locale, "convergences")}
 count={focus === "all" ? convergencesAll.length : getFocusConvergences(locale, focus).length}
 >
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {(focus === "all" ? convergencesAll : getFocusConvergences(locale, focus)).map((c) => (
 <Text key={c} size="small">
 • {c}
 </Text>
 ))}
 </Stack>
 </CollapsibleSection>

 {/* 10. Field sessions — by date */}
 <CollapsibleSection title={globalTabUi(locale, "fieldSessions")} count={fieldSessions.length} defaultOpen>
 <Stack gap={16} style={{ paddingTop: 10 }}>
 <Stack gap={8}>
 <Text weight="semibold" size="small">{globalTabUi(locale, "mexicoJul")}</Text>
 <Grid columns={2} gap={10}>
 {MEXICO_VISIT_DATES.filter((d) => !d.isMeta).map((day) => (
 <Card key={day.id}>
 <CardHeader trailing={<Pill size="sm" tone="primary">{day.shortLabel}</Pill>}>
 {day.dateLabel}
 </CardHeader>
 <CardBody>
 <ReaderText size="small" tone="secondary">{day.summary}</ReaderText>
 <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
 {day.sessions.map((s) => s.label).join(" · ")}
 </Text>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </Stack>
 <Stack gap={8}>
 <Text weight="semibold" size="small">{globalTabUi(locale, "peruAug")}</Text>
 <Grid columns={2} gap={10}>
 {PERU_VISIT_DATES.filter((d) => !d.isMeta).map((day) => (
 <Card key={day.id}>
 <CardHeader trailing={<Pill size="sm" tone="primary">{day.shortLabel}</Pill>}>
 {day.dateLabel}
 </CardHeader>
 <CardBody>
 <ReaderText size="small" tone="secondary">{day.summary}</ReaderText>
 <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
 {day.sessions.map((s) => s.label).join(" · ")}
 </Text>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </Stack>
 <Stack gap={8}>
 <Text weight="semibold" size="small">{globalTabUi(locale, "ecuadorOct")}</Text>
 <Grid columns={2} gap={10}>
 {ecuadorVisitDates.map((day) => (
 <Card key={day.id}>
 <CardHeader trailing={<Pill size="sm" tone="primary">{day.shortLabel}</Pill>}>
 {day.dateLabel}
 </CardHeader>
 <CardBody>
 <ReaderText size="small" tone="secondary">{day.summary}</ReaderText>
 <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
 {day.sessions.map((s) => s.label).join(" · ")}
 </Text>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </Stack>
 <Stack gap={8}>
 <Text weight="semibold" size="small">{globalTabUi(locale, "colombiaSep")}</Text>
 <Grid columns={2} gap={10}>
 {colombiaVisitDates.map((day) => (
 <Card key={day.id}>
 <CardHeader trailing={<Pill size="sm" tone="primary">{day.shortLabel}</Pill>}>
 {day.dateLabel}
 </CardHeader>
 <CardBody>
 <ReaderText size="small" tone="secondary">{day.summary}</ReaderText>
 <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
 {day.sessions.map((s) => s.label).join(" · ")}
 </Text>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </Stack>
 </Stack>
 </CollapsibleSection>

 {/* 11. Positive signals */}
 <CollapsibleSection title={globalTabUi(locale, "positiveSignals")} count={positiveSignals.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {positiveSignals.map((s) => (
 <Card key={s.title}>
 <CardHeader trailing={s.countries.join(" · ")}>{s.title}</CardHeader>
 <CardBody>
 <ReaderText size="small">{s.detail}</ReaderText>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 {/* 12. Theme index */}
 <CollapsibleSection title={globalTabUi(locale, "themeIndex")} count={allInsightsLocalized.length}>
 <div style={{ paddingTop: 8 }}>
 <Table
 headers={[
 "#",
 globalTabUi(locale, "tablePriority"),
 globalTabUi(locale, "tableTheme"),
 globalTabUi(locale, "tableCoverage"),
 globalTabUi(locale, "tableLayerCol"),
 ]}
 rows={allInsightsLocalized.map((i) => [
 String(i.rank),
 formatGlobalPriority(locale, i.priority),
 i.title,
 i.coverage,
 formatGlobalLayer(locale, i.layer),
 ])}
 columnAlign={["right", "left", "left", "left", "left"]}
 striped
 />
 </div>
 </CollapsibleSection>

 <Text size="small" tone="tertiary">
 {globalTabUi(locale, "sourceFooter")}
 </Text>
 </Stack>
 );
}
