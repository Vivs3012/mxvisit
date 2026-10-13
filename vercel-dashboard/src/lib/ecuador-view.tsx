"use client";

import { useEffect, useState } from "react";
import {
 Button,
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
import { sortByPriorityThenGrowthPillar } from "./dashboard-display-balance";
import { ReaderText } from "./reader-text-ui";
import {
 TabContextCallout,
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import { CountryHubOverview } from "@/components/country-hub-overview";
import { FieldInsightCard } from "@/components/field-insight-card";
import { DateTimelineNav, SessionSubNav } from "@/components/date-visit-nav";
import type { StakeholderFocus } from "./stakeholder-focus";
import { VisitLocationBar } from "@/components/visit-location-bar";
import type { MeetingTopic } from "./peru-context-meeting";
import { EC_ASSETS, ECUADOR_MEETING_SLIDES } from "./ecuador-assets";
import { EC_CONTEXT_MEETING, EC_NPS_SNAPSHOT } from "./ecuador-context-meeting";
import {
 ECUADOR_CROSS_THEMES,
 ECUADOR_WORKSHOP_PAINS,
 type EcuadorPainPriority,
} from "./ecuador-insights";
import {
 getEcuadorDateForSession,
 getEcuadorDateGroup,
 type EcuadorDateId,
 type EcuadorSessionId,
} from "./ecuador-date-nav";
import { useLocale } from "./i18n/locale-context";
import { getEcuadorExecutiveSummary } from "./i18n/content/ecuador-executive";
import {
 getEcuadorTripPeriod,
 getEcuadorVisitDates,
} from "./i18n/content/ecuador-nav-locale";
import {
 formatEcWorkshopPriority,
 getEcuadorWorkshopCrossThemes,
 getEcuadorWorkshopDreams,
 getEcuadorWorkshopExecutive,
 getEcuadorWorkshopHospitality,
 getEcuadorWorkshopInsights,
 getEcuadorWorkshopMeta,
 getEcuadorWorkshopUi,
 getEcuadorWorkshopVoteWinners,
} from "./i18n/content/ecuador-workshop-locale";
import { UI, uiTemplate } from "./i18n/ui";
import type { EcWorkshopInsight } from "./ecuador-workshop-oct08";

function priorityTone(p: EcuadorPainPriority | EcWorkshopInsight["priority"]): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function TranscriptBlock({ path, fileName }: { path: string; fileName: string }) {
 const { t } = useLocale();
 const [text, setText] = useState<string | null>(null);
 const [error, setError] = useState(false);

 useEffect(() => {
 let cancelled = false;
 fetch(path)
.then((r) => (r.ok ? r.text() : Promise.reject()))
.then((body) => {
 if (!cancelled) setText(body);
 })
.catch(() => {
 if (!cancelled) setError(true);
 });
 return () => {
 cancelled = true;
 };
 }, [path]);

 return (
 <CollapsibleSection title={t(UI.fullTranscript)} trailing={fileName}>
 <Stack gap={8} style={{ paddingTop: 8 }}>
 <Row gap={8} wrap>
 <Button variant="secondary" onClick={() => window.open(path, "_blank", "noopener,noreferrer")}>
 {t(UI.openRawTxt)}
 </Button>
 </Row>
 {error && (
 <Text size="small" tone="secondary">
 {t(uiTemplate(UI.transcriptLoadError, { path }))}
 </Text>
 )}
 {text && (
 <pre
 style={{
 whiteSpace: "pre-wrap",
 fontSize: 12,
 lineHeight: 1.45,
 maxHeight: "min(70vh, 520px)",
 overflow: "auto",
 padding: 12,
 borderRadius: 8,
 border: "1px solid #e5e7eb",
 background: "#fafafa",
 }}
 >
 {text}
 </pre>
 )}
 </Stack>
 </CollapsibleSection>
 );
}

function MeetingTopicCard({ topic }: { topic: MeetingTopic }) {
 return (
 <Card>
 <CardBody>
 <Stack gap={8}>
 <Text weight="semibold" size="small">{topic.title}</Text>
 <ReaderText size="small" tone="secondary">{topic.detail}</ReaderText>
 {topic.quotes.length > 0 && (
 <Stack gap={4}>
 <Text weight="semibold" size="small">Meeting quotes</Text>
 {topic.quotes.map((q) => (
 <Text key={q} size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
 ))}
 </Stack>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function SlideGallery() {
 return (
 <CollapsibleSection title="Slides & screenshots from the meeting" count={ECUADOR_MEETING_SLIDES.length} defaultOpen>
 <Stack gap={16} style={{ paddingTop: 12 }}>
 <Grid columns={2} gap={12}>
 {ECUADOR_MEETING_SLIDES.map((slide) => (
 <Card key={slide.id}>
 <CardHeader trailing={<Pill size="sm" tone="neutral">{slide.tags[0]}</Pill>}>
 {slide.title}
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <a href={slide.src} target="_blank" rel="noopener noreferrer">
 <img
 src={slide.src}
 alt={slide.title}
 style={{ width: "100%", borderRadius: 8, border: "1px solid #e5e7eb" }}
 />
 </a>
 <Text size="small" tone="secondary">{slide.caption}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 <Row gap={8} wrap>
 <Button
 variant="secondary"
 onClick={() => window.open(EC_ASSETS.motoGpPdf.path, "_blank", "noopener,noreferrer")}
 >
 Open {EC_ASSETS.motoGpPdf.title} (PDF)
 </Button>
 <Button
 variant="secondary"
 onClick={() => window.open(EC_ASSETS.npsSepPdf.path, "_blank", "noopener,noreferrer")}
 >
 Open {EC_ASSETS.npsSepPdf.title} (PDF)
 </Button>
 </Row>
 </Stack>
 </CollapsibleSection>
 );
}

function NpsBlock() {
 const n = EC_NPS_SNAPSHOT;
 return (
 <CollapsibleSection title={`NPS snapshot — ${n.month}`} defaultOpen>
 <Stack gap={12} style={{ paddingTop: 8 }}>
 <TabStatGrid
 stats={[
 { label: "Consumer NPS", value: n.consumerNps.toFixed(2) },
 { label: "Promoters", value: String(n.promoters) },
 { label: "Detractors", value: String(n.detractors) },
 { label: "Seller NPS YTD", value: n.sellerNpsYtd.toFixed(2) },
 { label: "Courier NPS YTD", value: n.courierNpsYtd.toFixed(2) },
 ]}
 />
 <Table
 headers={["City", "NPS Sep"]}
 rows={n.cities.map((c) => [c.city, c.sep.toFixed(2)])}
 />
 <Table
 headers={["Detractor theme", "# responses"]}
 rows={n.detractorThemes.map((d) => [d.theme, String(d.count)])}
 />
 </Stack>
 </CollapsibleSection>
 );
}

function WorkshopPainsBlock() {
 const { locale } = useLocale();
 const title =
 locale === "pt" ? "Dores mapeadas para o workshop de 8 out" : "Pain points for Oct 8 workshop";
 const lead =
 locale === "pt"
 ? "Lista de entrada do prep de 7 out (veja a aba do workshop de 8 out para resultados e votação)."
 : "Input list from Oct 7 prep (see Oct 8 workshop tab for outcomes and voting).";
 return (
 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{title}</H3>
 <Text size="small" tone="secondary">
 {lead}
 </Text>
 <Grid columns={1} gap={10}>
 {sortByPriorityThenGrowthPillar(ECUADOR_WORKSHOP_PAINS).map((pain) => (
 <FieldInsightCard
 key={pain.id}
 title={pain.title}
 observation={pain.detail}
 whyItMatters={pain.productHook ? `Product: ${pain.productHook}` : undefined}
 headerPills={[
 { label: pain.priority, tone: priorityTone(pain.priority) },
 { label: pain.pillar, tone: "neutral" },
 ]}
 />
 ))}
 </Grid>
 </Stack>
 );
}

function WorkshopInsightCard({
 insight,
 priorityLabel,
 votesLabel,
 productPrefix,
}: {
 insight: EcWorkshopInsight;
 priorityLabel: string;
 votesLabel: (n: number) => string;
 productPrefix: string;
}) {
 return (
 <FieldInsightCard
 title={insight.title}
 observation={insight.detail}
 whyItMatters={
 insight.productHook ? `${productPrefix} ${insight.productHook}` : undefined
 }
 headerPills={[
 { label: priorityLabel, tone: priorityTone(insight.priority) },
 { label: insight.pillar, tone: "neutral" },
 ...(insight.votes != null && insight.votes > 0
 ? [{ label: votesLabel(insight.votes), tone: "primary" as const }]
 : []),
 ]}
 quotes={insight.quotes}
 />
 );
}

function EcuadorWorkshopView() {
 const { locale, t } = useLocale();
 const meta = getEcuadorWorkshopMeta(locale);
 const exec = getEcuadorWorkshopExecutive(locale);
 const ui = getEcuadorWorkshopUi(locale);
 const insights = getEcuadorWorkshopInsights(locale);
 const votes = getEcuadorWorkshopVoteWinners(locale);
 const dreams = getEcuadorWorkshopDreams(locale);
 const hospitality = getEcuadorWorkshopHospitality(locale);
 const crossThemes = getEcuadorWorkshopCrossThemes(locale);

 return (
 <Stack gap={20}>
 <TabPageHeader
 title={meta.title}
 date={meta.date}
 subtitle={`${meta.location} · ${meta.facilitators}`}
 />

 <TabExecutiveSummary
 title={t(UI.executiveSummary)}
 headline={exec.headline}
 paragraphs={exec.paragraphs}
 />

 <TabStatGrid stats={exec.stats.map((s) => ({ label: s.label, value: s.value }))} />

 <TabContextCallout title={ui.workshopFormat}>
 <Stack gap={6}>
 <Text size="small">{meta.format}</Text>
 <Text size="small" tone="secondary">{meta.participants}</Text>
 </Stack>
 </TabContextCallout>

 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{ui.insightsTitle}</H3>
 <Text size="small" tone="secondary">
 {ui.insightsLead}
 </Text>
 <Grid columns={1} gap={10}>
 {insights.map((insight) => (
 <WorkshopInsightCard
 key={insight.id}
 insight={insight}
 priorityLabel={formatEcWorkshopPriority(locale, insight.priority)}
 votesLabel={ui.votesLabel}
 productPrefix={ui.productPrefix}
 />
 ))}
 </Grid>
 </Stack>

 <CollapsibleSection title={ui.voteChallenges} defaultOpen>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {votes.challenges.map((item) => (
 <Card key={item.label}>
 <CardBody>
 <Row gap={8} align="center" style={{ justifyContent: "space-between" }}>
 <Text size="small">{item.label}</Text>
 <Pill size="sm" tone="primary">{item.votes}</Pill>
 </Row>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={ui.voteDreams} count={votes.dreams.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {votes.dreams.map((item) => (
 <Card key={item.label}>
 <CardBody>
 <Row gap={8} align="center" style={{ justifyContent: "space-between" }}>
 <Text size="small">{item.label}</Text>
 <Pill size="sm" tone="neutral">{item.votes}</Pill>
 </Row>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={ui.dreamBacklog} count={dreams.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {dreams.map((d) => (
 <Card key={d.title}>
 <CardBody>
 <Stack gap={4}>
 <Row gap={8} align="center" wrap>
 <Pill size="sm" tone="neutral">{d.pillar}</Pill>
 <Text weight="semibold" size="small">{d.title}</Text>
 </Row>
 <ReaderText size="small" tone="secondary">{d.detail}</ReaderText>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={ui.hospitality} count={hospitality.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {hospitality.map((h) => (
 <Card key={h.idea}>
 <CardBody>
 <Stack gap={4}>
 <Pill size="sm" tone="primary">{h.audience}</Pill>
 <Text weight="semibold" size="small">{h.idea}</Text>
 <Text size="small" tone="secondary">{h.note}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={ui.crossThemes} count={crossThemes.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {crossThemes.map((theme) => (
 <Card key={theme.theme}>
 <CardBody>
 <Stack gap={4}>
 <Text weight="semibold" size="small">{theme.theme}</Text>
 <ReaderText size="small" tone="secondary">{theme.detail}</ReaderText>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <TranscriptBlock
 path={meta.transcriptPath}
 fileName="workshop-oct-08-2026.txt"
 />

 <TabSource>
 {ui.sourceLine.replace("{date}", meta.date)}
 </TabSource>
 </Stack>
 );
}

function EcuadorProductVisionView() {
 const m = EC_CONTEXT_MEETING;
 const { locale, t } = useLocale();
 const exec = getEcuadorExecutiveSummary(locale);
 return (
 <Stack gap={20}>
 <TabPageHeader
 title="Product vision prep"
 date={m.date}
 subtitle={`${m.location} · ${m.participants}`}
 />

 <TabExecutiveSummary
 title={t(UI.executiveSummary)}
 headline={exec.headline}
 paragraphs={exec.paragraphs}
 />

 <Grid columns={4} gap={10}>
 {exec.takeaways.map((item) => (
 <Card key={item.label}>
 <CardBody>
 <Stack gap={6}>
 <Pill tone="primary" size="sm">{item.label}</Pill>
 <Text size="small">{item.text}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>

 <TabStatGrid stats={m.snapshot.map((s) => ({ label: s.label, value: s.value }))} />

 <TabContextCallout title="Product opportunities on the table">
 <Stack gap={10}>
 {m.productOpportunities.map((op) => (
 <Stack key={op.title} gap={2}>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold" size="small">{op.title}</Text>
 <Pill size="sm" tone={op.tone}>{op.owner}</Pill>
 </Row>
 <ReaderText size="small">{op.detail}</ReaderText>
 </Stack>
 ))}
 </Stack>
 </TabContextCallout>

 <TabContextCallout title="Connection with Oct 8 workshop">
 <Stack gap={4}>
 {m.connectsToWorkshop.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </TabContextCallout>

 <SlideGallery />
 <NpsBlock />

 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>Topics, by pillar</H3>
 {m.sections.map((section) => (
 <CollapsibleSection
 key={section.id}
 title={section.label}
 trailing={`${section.topics.length} topics`}
 count={section.topics.length}
 defaultOpen={section.id === "community-poc" || section.id === "consumer"}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <ReaderText size="small" tone="secondary">{section.summary}</ReaderText>
 {section.topics.map((topic) => (
 <MeetingTopicCard key={topic.title} topic={topic} />
 ))}
 </Stack>
 </CollapsibleSection>
 ))}
 </Stack>

 <WorkshopPainsBlock />

 <CollapsibleSection title="Cross-themes (Ecuador lens)" count={ECUADOR_CROSS_THEMES.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {ECUADOR_CROSS_THEMES.map((t) => (
 <Card key={t.theme}>
 <CardBody>
 <Stack gap={4}>
 <Text weight="semibold" size="small">{t.theme}</Text>
 <ReaderText size="small" tone="secondary">{t.detail}</ReaderText>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Cities & coverage" count={m.cities.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {m.cities.map((c) => (
 <Card key={c.name}>
 <CardBody>
 <Stack gap={4}>
 <Row gap={8} align="center">
 <Text weight="semibold">{c.name}</Text>
 <Pill size="sm" tone="neutral">{c.share}</Pill>
 </Row>
 <Text size="small" tone="secondary">{c.note}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="Next steps" defaultOpen>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {m.nextSteps.map((step) => (
 <Text key={step} size="small">• {step}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <TabSource>Source: {m.source}</TabSource>
 </Stack>
 );
}

export default function EcuadorView({
 date,
 onDateChange,
 session,
 onSessionChange,
 onThemeFocus,
 onOpenSources,
}: {
 date?: EcuadorDateId;
 onDateChange?: (date: EcuadorDateId) => void;
 session?: EcuadorSessionId;
 onSessionChange?: (session: EcuadorSessionId) => void;
 onThemeFocus?: (focus: StakeholderFocus) => void;
 onOpenSources?: () => void;
}) {
 const [internalDate, setInternalDate] = useState<EcuadorDateId>("oct-08");
 const [internalSession, setInternalSession] = useState<EcuadorSessionId>("oyp-workshop");
 const activeDate = date ?? internalDate;
 const activeSession = session ?? internalSession;
 const setActiveDate = onDateChange ?? setInternalDate;
 const setActiveSession = onSessionChange ?? setInternalSession;
 const { locale, t } = useLocale();
 const visitDates = getEcuadorVisitDates(locale);
 const dayGroup = visitDates.find((d) => d.id === activeDate) ?? getEcuadorDateGroup(activeDate);
 const sessions = dayGroup.sessions;
 const countryLabel = t({ en: "Ecuador", pt: "Equador" });
 const activeSessionLabel =
 sessions.find((s) => s.id === activeSession)?.label ??
 (locale === "pt" ? "Workshop OYP" : "OYP workshop");

 function handleSessionChange(next: EcuadorSessionId) {
 setActiveSession(next);
 setActiveDate(getEcuadorDateForSession(next));
 }

 function handleHubTheme(focus: StakeholderFocus) {
 if (focus === "consumer") setActiveSession("product-vision");
 else if (focus === "service-level" || focus === "rewards") setActiveSession("oyp-workshop");
 else onThemeFocus?.(focus);
 }

 return (
 <Stack gap={16}>
 <CountryHubOverview
 country="ecuador"
 onThemeFocus={handleHubTheme}
 onOpenSources={onOpenSources}
 />
 <VisitLocationBar segments={[countryLabel, dayGroup.dateLabel, activeSessionLabel]} />

 <DateTimelineNav
 tripPeriod={getEcuadorTripPeriod(locale)}
 dates={visitDates}
 activeDateId={activeDate}
 onDateChange={(d) => setActiveDate(d as EcuadorDateId)}
 />
 <SessionSubNav
 sessions={sessions}
 activeSessionId={activeSession}
 onSessionChange={(id) => handleSessionChange(id as EcuadorSessionId)}
 dateLabel={dayGroup.dateLabel}
 />

 {activeSession === "product-vision" && <EcuadorProductVisionView />}
 {activeSession === "oyp-workshop" && <EcuadorWorkshopView />}
 </Stack>
 );
}
