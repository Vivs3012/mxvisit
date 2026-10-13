"use client";

import { useEffect, useState } from "react";
import {
 Button,
 Card,
 CardBody,
 CollapsibleSection,
 Grid,
 H3,
 Pill,
 Row,
 Stack,
 Text,
} from "@/components/ui";
import {
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
import { CO_PRODUCT_MEETING, CO_PRODUCT_MEETING_META } from "./colombia-product-meeting-sep13";
import { CO_SL_MEETING, CO_SL_MEETING_META } from "./colombia-service-level-meeting-sep13";
import {
 getColombiaDateGroup,
 type ColombiaDateId,
 type ColombiaSessionId,
} from "./colombia-date-nav";
import type { ColombiaInsight } from "./colombia-insights";
import { sortColombiaAllInsights, sortColombiaMeetingInsights } from "./colombia-insight-sort";
import { clarifyReaderText } from "./reader-text";
import { ReaderText } from "./reader-text-ui";
import { useLocale } from "./i18n/locale-context";
import {
 getColombiaAllExecutiveSummary,
 getColombiaExecutiveSummary,
 getColombiaSlExecutiveSummary,
} from "./i18n/content/colombia-executive";
import { getColombiaTripPeriod, getColombiaVisitDates } from "./i18n/content/colombia-nav-locale";
import {
 formatColombiaPillar,
 formatColombiaPriority,
 getColombiaAllConvergences,
 getColombiaAllInsights,
 getColombiaCrossThemes,
 getColombiaMeetingInsights,
 getColombiaMeta,
 getColombiaSlMeetingInsights,
 getColombiaSlMeta,
 getColombiaUi,
} from "./i18n/content/colombia-locale";
import type { ColombiaInsightPriority } from "./colombia-insights";
import type { ColombiaAllInsight } from "./colombia-synthesis-all";
import { UI, uiTemplate } from "./i18n/ui";

function priorityTone(p: ColombiaInsightPriority): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function MeetingTopicCard({ topic }: { topic: MeetingTopic }) {
 return (
 <Card>
 <CardBody>
 <Stack gap={6}>
 <Text weight="semibold" size="small">{topic.title}</Text>
 <ReaderText size="small">{topic.detail}</ReaderText>
 {topic.quotes?.length ? (
 <Stack gap={4}>
 {topic.quotes.map((q) => (
 <Text key={q} size="small" tone="secondary" style={{ fontStyle: "italic" }}>
 “{q}”
 </Text>
 ))}
 </Stack>
 ) : null}
 </Stack>
 </CardBody>
 </Card>
 );
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

function ColombiaInsightCards({
 insights,
 locale,
 ui,
 session,
}: {
 insights: ColombiaInsight[];
 locale: ReturnType<typeof useLocale>["locale"];
 ui: ReturnType<typeof getColombiaUi>;
 session?: "product-intro" | "service-level";
}) {
 const priorities: ColombiaInsightPriority[] = ["Critical", "High", "Medium"];
 return (
 <>
 {priorities.map((prio) => {
 const group = sortColombiaMeetingInsights(
 insights.filter((i) => i.priority === prio),
 session,
 );
 if (!group.length) return null;
 return (
 <CollapsibleSection
 key={prio}
 title={`${formatColombiaPriority(locale, prio)} · ${ui.insightsTitle}`}
 count={group.length}
 defaultOpen={prio === "Critical"}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 {group.map((ins) => (
 <FieldInsightCard
 key={ins.id}
 title={ins.title}
 observation={ins.detail}
 whyItMatters={ins.productHook ? clarifyReaderText(ins.productHook, locale) : undefined}
 headerPills={[
 { label: formatColombiaPriority(locale, ins.priority), tone: priorityTone(ins.priority) },
 { label: formatColombiaPillar(locale, ins.pillar), tone: "neutral" },
 ...(ins.globalRank != null
 ? [{ label: `Global All #${ins.globalRank}`, tone: "info" as const }]
 : []),
 ]}
 quotes={ins.quotes}
 />
 ))}
 </Stack>
 </CollapsibleSection>
 );
 })}
 </>
 );
}

function MeetingSectionsBlock({
 sections,
 sectionsTitle,
}: {
 sections: { id: string; label: string; summary: string; topics: MeetingTopic[] }[];
 sectionsTitle: string;
}) {
 return (
 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>{sectionsTitle}</H3>
 {sections.map((section) => (
 <CollapsibleSection
 key={section.id}
 title={section.label}
 trailing={`${section.topics.length}`}
 count={section.topics.length}
 defaultOpen={
 section.id === "growth" ||
 section.id === "rewards-product" ||
 section.id === "operations" ||
 section.id === "seller-courier" ||
 section.id === "consumer-cx" ||
 section.id === "finance"
 }
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
 );
}

function ColombiaProductIntroView() {
 const m = CO_PRODUCT_MEETING;
 const meta = CO_PRODUCT_MEETING_META;
 const { locale, t } = useLocale();
 const exec = getColombiaExecutiveSummary(locale);
 const ui = getColombiaUi(locale);
 const insights = getColombiaMeetingInsights(locale);
 const crossThemes = getColombiaCrossThemes(locale);

 return (
 <Stack gap={20}>
 <TabPageHeader
 title={getColombiaMeta(locale).title}
 date={meta.date}
 subtitle={`${meta.location} · ${meta.participants}`}
 />
 <TabExecutiveSummary title={t(UI.executiveSummary)} headline={exec.headline} paragraphs={exec.paragraphs} />
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
 <ColombiaInsightCards insights={insights} locale={locale} ui={ui} session="product-intro" />
 <MeetingSectionsBlock sections={m.sections} sectionsTitle={ui.sectionsTitle} />
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
 {meta.transcriptPaths.map((path, i) => (
 <TranscriptBlock key={path} path={path} fileName={`product-sep-13-bavaria-${i + 1}.txt`} />
 ))}
 <TabSource>{ui.source}</TabSource>
 </Stack>
 );
}

function ColombiaServiceLevelView() {
 const m = CO_SL_MEETING;
 const { locale, t } = useLocale();
 const meta = getColombiaSlMeta(locale);
 const exec = getColombiaSlExecutiveSummary(locale);
 const ui = getColombiaUi(locale);
 const insights = getColombiaSlMeetingInsights(locale);

 return (
 <Stack gap={20}>
 <TabPageHeader title={meta.title} date={meta.date} subtitle={`${meta.location} · ${meta.format}`} />
 <TabExecutiveSummary title={t(UI.executiveSummary)} headline={exec.headline} paragraphs={exec.paragraphs} />
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
 <ColombiaInsightCards insights={insights} locale={locale} ui={ui} session="service-level" />
 <MeetingSectionsBlock sections={m.sections} sectionsTitle={ui.sectionsTitle} />
 {CO_SL_MEETING_META.transcriptPaths.map((path) => (
 <TranscriptBlock key={path} path={path} fileName="service-level-sep-13-bavaria.txt" />
 ))}
 <TabSource>{ui.source}</TabSource>
 </Stack>
 );
}

function sessionPillLabel(
 session: ColombiaAllInsight["sessions"][number],
 ui: ReturnType<typeof getColombiaUi>,
): string {
 if (session === "product-intro") return ui.sessionTags.am;
 return ui.sessionTags.pm;
}

function ColombiaAllView() {
 const { locale, t } = useLocale();
 const exec = getColombiaAllExecutiveSummary(locale);
 const ui = getColombiaUi(locale);
 const convergences = getColombiaAllConvergences(locale);
 const insights = sortColombiaAllInsights(getColombiaAllInsights(locale));
 const priorities: ColombiaInsightPriority[] = ["Critical", "High", "Medium"];

 return (
 <Stack gap={20}>
 <TabPageHeader
 title={ui.allTitle}
 date="13/09/2026"
 subtitle={
 locale === "pt"
 ? "Resumo das duas reuniões de 13 set (manhã e tarde). Os números # nos cards apontam para temas na aba All global."
 : "Summary of both Sep 13 meetings (morning and afternoon). # pills on cards link to themes on the global All tab."
 }
 />
 <TabExecutiveSummary title={t(UI.executiveSummary)} headline={exec.headline} paragraphs={exec.paragraphs} />
 <TabStatGrid stats={exec.stats.map((s) => ({ label: s.label, value: s.value }))} />

 <CollapsibleSection title={ui.allConvergences} count={convergences.length} defaultOpen>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {convergences.map((c) => (
 <Card key={c.id}>
 <CardBody>
 <Stack gap={6}>
 <Row gap={6} wrap>
 {c.sessions.map((s) => (
 <Pill key={s} size="sm" tone="neutral">{sessionPillLabel(s, ui)}</Pill>
 ))}
 </Row>
 <Text weight="semibold" size="small">{c.theme}</Text>
 <ReaderText size="small" tone="secondary">{c.detail}</ReaderText>
 {c.globalRanks?.length ? (
 <Text size="small" tone="tertiary">
 {ui.globalRanks}: {c.globalRanks.map((r) => `#${r}`).join(", ")}
 </Text>
 ) : null}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 {priorities.map((prio) => {
 const group = insights.filter((i) => i.priority === prio);
 if (!group.length) return null;
 return (
 <CollapsibleSection
 key={prio}
 title={`${formatColombiaPriority(locale, prio)} · ${ui.allInsights}`}
 count={group.length}
 defaultOpen={prio === "Critical"}
 >
 <Stack gap={10} style={{ paddingTop: 10 }}>
 {group.map((ins) => (
 <FieldInsightCard
 key={ins.id}
 title={ins.title}
 observation={ins.detail}
 recommendation={
 ins.crossCountry
 ? `${locale === "pt" ? "Eco cross-country" : "Cross-country"}: ${ins.crossCountry}`
 : undefined
 }
 headerPills={[
 { label: formatColombiaPriority(locale, ins.priority), tone: priorityTone(ins.priority) },
 ...ins.sessions.map((s) => ({
 label: sessionPillLabel(s, ui),
 tone: "neutral" as const,
 })),
 ...(ins.globalRanks?.map((r) => ({
 label: `Global #${r}`,
 tone: "info" as const,
 })) ?? []),
 ]}
 />
 ))}
 </Stack>
 </CollapsibleSection>
 );
 })}

 <TabSource>{ui.source}</TabSource>
 </Stack>
 );
}

export default function ColombiaView({
 onThemeFocus,
 onOpenSources,
}: {
 onThemeFocus?: (focus: StakeholderFocus) => void;
 onOpenSources?: () => void;
} = {}) {
 const [activeDate, setActiveDate] = useState<ColombiaDateId>("sep-13");
 const [activeSession, setActiveSession] = useState<ColombiaSessionId>("colombia-all");
 const { locale, t } = useLocale();

 function handleHubTheme(focus: StakeholderFocus) {
 if (focus === "service-level") setActiveSession("service-level");
 else if (focus === "consumer" || focus === "rewards") setActiveSession("product-intro");
 else onThemeFocus?.(focus);
 }
 const visitDates = getColombiaVisitDates(locale);
 const dayGroup = visitDates.find((d) => d.id === activeDate) ?? getColombiaDateGroup(activeDate);
 const countryLabel = t({ en: "Colombia", pt: "Colômbia" });
 const activeSessionLabel =
 dayGroup.sessions.find((s) => s.id === activeSession)?.label ??
 (locale === "pt" ? "All" : "All");

 return (
 <Stack gap={16}>
 <CountryHubOverview
 country="colombia"
 onThemeFocus={handleHubTheme}
 onOpenSources={onOpenSources}
 />
 <VisitLocationBar segments={[countryLabel, dayGroup.dateLabel, activeSessionLabel]} />

 <DateTimelineNav
 tripPeriod={getColombiaTripPeriod(locale)}
 dates={visitDates}
 activeDateId={activeDate}
 onDateChange={(d) => setActiveDate(d as ColombiaDateId)}
 />

 <SessionSubNav
 sessions={dayGroup.sessions}
 activeSessionId={activeSession}
 onSessionChange={(id) => setActiveSession(id as ColombiaSessionId)}
 dateLabel={dayGroup.dateLabel}
 />

 {activeSession === "colombia-all" && <ColombiaAllView />}
 {activeSession === "product-intro" && <ColombiaProductIntroView />}
 {activeSession === "service-level" && <ColombiaServiceLevelView />}
 </Stack>
 );
}
