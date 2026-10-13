"use client";

import { useState } from "react";
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
 LineChart,
 Pill,
 Row,
 Select,
 Stack,
 Stat,
 Table,
 Text,
} from "@/components/ui";
import { ReaderText } from "./reader-text-ui";
import { LIMA, LIMA_MONTHS, LIMA_PERIOD } from "./lima-metrics";
import {
 PERU_CROSS_STORE_THEMES,
 PERU_INTERVIEW_INSIGHTS,
 PERU_VISIT_EXECUTIVE_SUMMARY,
 type PeruCrossTheme,
 type PeruInsightCategory,
 type PeruInterviewInsight,
 type PeruStoreInterview,
} from "./peru-insights";
import { PE_CONTEXT_MEETING, type MeetingTopic } from "./peru-context-meeting";
import {
 PE_CONTEXT_PDF,
 PE_CONTEXT_PDF_INSIGHTS,
 PE_CONTEXT_PRESENTERS,
 PE_CONTEXT_TEAM,
 type PeruTeamMember,
} from "./peru-context-presentation";
import {
 PERU_CONTEXT_VALIDATIONS,
 PERU_ROADMAP_LINKS,
 type PeruRoadmapLink,
} from "./peru-roadmap-links";
import { PERU_VISIT_MONTHS, PERU_VISIT_STORES, type PeruVisitStore } from "./peru-visit-stores";
import {
 TabContextCallout,
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import { DateTimelineNav, SessionSubNav } from "@/components/date-visit-nav";
import {
 PERU_TRIP_PERIOD,
 PERU_VISIT_DATES,
 getPeruDateForSession,
 getPeruDateGroup,
 type PeruAgendaTab,
 type PeruDateId,
} from "./visit-date-nav";
import PeruB2bPlatformView from "./peru-b2b-view";
import PeruConsumerVisionView from "./peru-consumer-vision-view";
import PeruOverallView from "./peru-overall-view";
import { sortByInsightCategory } from "./dashboard-display-balance";
import PeruServiceLevelView from "./peru-service-level-view";
import PeruWorkshopView from "./peru-workshop-view";
import {
 getDatesForContext,
 getDefaultSessionForContext,
 getContextLabel,
 getSessionContext,
 getSessionLabel,
 getSessionsForContext,
 getWorkshopGroupForSession,
 type PeruContextId,
 type ServiceLevelActor,
} from "./peru-context-nav";
import { CountryHubOverview } from "@/components/country-hub-overview";
import { FieldInsightCard } from "@/components/field-insight-card";
import { PeruContextNav } from "@/components/peru-context-nav";
import type { StakeholderFocus } from "./stakeholder-focus";
import { VisitLocationBar } from "@/components/visit-location-bar";
import {
 CompactVisitPicker,
 type CompactVisitOption,
} from "@/components/compact-visit-picker";
import { VisitInsightsTabBar } from "@/components/visit-insights-tab-bar";
import {
 VISIT_CATEGORY_LABELS,
 VISIT_CATEGORY_ORDER,
 type VisitInsightCategory,
 type VisitInsightsTab,
} from "./visit-insights";

export type { PeruAgendaTab, PeruDateId, PeruSessionId } from "./visit-date-nav";
export type { PeruContextId, ServiceLevelActor } from "./peru-context-nav";

export type PeruVisitTab = VisitInsightsTab;

type PeruNavigateToRoadmap = (roadmapId: string) => void;

function fmtPct(v: number, decimals = 1): string {
 return `${v.toFixed(decimals)}%`;
}

function fillTone(v: number): "success" | "warning" | "danger" {
 if (v >= 93) return "success";
 if (v >= 90) return "warning";
 return "danger";
}

function slaTone(v: number): "success" | "warning" | "danger" {
 if (v >= 95) return "success";
 if (v >= 90) return "warning";
 return "danger";
}

function tmlTone(v: number): "success" | "warning" | "danger" {
 if (v >= 60) return "success";
 if (v >= 45) return "warning";
 return "danger";
}

function availTone(v: number): "success" | "warning" | "danger" {
 if (v >= 97) return "success";
 if (v >= 93) return "warning";
 return "danger";
}

function PeruPriorityTone(p: PeruCrossTheme["priority"]): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function PeruRoadmapLinkCard({
 link,
 onNavigate,
}: {
 link: PeruRoadmapLink;
 onNavigate?: PeruNavigateToRoadmap;
}) {
 return (
 <Card>
 <CardBody>
 <Stack gap={6}>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold" size="small">{link.title}</Text>
 <Pill tone={link.priority === "Critical" ? "warning" : "info"} size="sm">
 {link.priority}
 </Pill>
 </Row>
 <Text size="small">{link.validation}</Text>
 <Text size="small" tone="secondary">
 {link.stores.join(" · ")}
 </Text>
 {onNavigate && (
 <Button variant="secondary" onClick={() => onNavigate(link.roadmapId)}>
 Open in UX roadmap →
 </Button>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function PeruRoadmapLinksBlock({ onNavigate }: { onNavigate?: PeruNavigateToRoadmap }) {
 return (
 <Stack gap={10}>
 <H2>Validated against UX roadmap</H2>
 <Text size="small" tone="secondary">
 Lima store visits confirm Mexico roadmap priorities — same structural gaps (map, inventory,
 communication) now validated in a second country.
 </Text>
 <Grid columns={2} gap={10}>
 {PERU_ROADMAP_LINKS.map((link) => (
 <PeruRoadmapLinkCard key={link.roadmapId} link={link} onNavigate={onNavigate} />
 ))}
 </Grid>
 </Stack>
 );
}

function PeruContextValidationBlock({ onNavigate }: { onNavigate?: PeruNavigateToRoadmap }) {
 return (
 <CollapsibleSection
 title="Morning context → afternoon visit validation"
 count={PERU_CONTEXT_VALIDATIONS.length}
 defaultOpen
 >
 <Stack gap={10} style={{ paddingTop: 8 }}>
 <Text size="small" tone="secondary">
 Items from the Aug 31 morning briefing, checked against La Marina, Merino and San Pedro
 interviews the same day.
 </Text>
 {PERU_CONTEXT_VALIDATIONS.map((item) => (
 <Card key={item.morningItem}>
 <CardBody>
 <Stack gap={6}>
 <Text weight="semibold" size="small">{item.morningItem}</Text>
 <Text size="small">{item.afternoonFinding}</Text>
 {item.roadmapIds.length > 0 && onNavigate && (
 <Row gap={8} wrap>
 {item.roadmapIds.map((id) => (
 <Button
 key={id}
 variant="secondary"
 onClick={() => onNavigate(id)}
 >
 UX: {id} →
 </Button>
 ))}
 </Row>
 )}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Stack>
 </CollapsibleSection>
 );
}

function PeruCategoryTone(cat: PeruInsightCategory): "warning" | "info" | "success" | "neutral" {
 if (cat === "Bug") return "warning";
 if (cat === "UX") return "info";
 if (cat === "Product") return "success";
 if (cat === "Infra") return "warning";
 return "neutral";
}

function countPeruInsights(category: PeruInsightCategory): number {
 return PERU_INTERVIEW_INSIGHTS.reduce(
 (n, store) => n + store.insights.filter((i) => i.category === category).length,
 0,
 );
}

function PeruInsightCard({ item }: { item: PeruInterviewInsight }) {
 return (
 <FieldInsightCard
 title={item.title}
 observation={item.detail}
 coveragePills={[{ label: item.source, tone: "neutral" }]}
 quotes={item.quotes}
 />
 );
}

function PeruCrossThemeCard({ theme }: { theme: PeruCrossTheme }) {
 return (
 <FieldInsightCard
 title={theme.title}
 observation={theme.summary}
 whyItMatters={theme.attention}
 headerPills={[{ label: theme.priority, tone: PeruPriorityTone(theme.priority) }]}
 coveragePills={theme.stores.map((s) => ({ label: s, tone: "neutral" as const }))}
 quotes={theme.quotes}
 />
 );
}

function PeruCrossStoreBlock() {
 const s = PERU_VISIT_EXECUTIVE_SUMMARY.stats;
 const priorities: PeruCrossTheme["priority"][] = ["Critical", "High", "Medium"];
 const priorityLabels: Record<PeruCrossTheme["priority"], string> = {
 Critical: "Critical — all or almost all stores",
 High: "High priority — strong pattern",
 Medium: "Medium — recurring with local impact",
 };

 return (
 <Stack gap={16}>
 <Table
 headers={["Priority", "Theme", "Stores", "Category"]}
 rows={PERU_CROSS_STORE_THEMES.map((t) => [
 <Pill tone={PeruPriorityTone(t.priority)} size="sm">{t.priority}</Pill>,
 t.title,
 t.stores.join(", "),
 t.category,
 ])}
 columnAlign={["center", "left", "left", "center"]}
 striped
 />
 {priorities.map((prio) => {
 const grouped = sortByInsightCategory(
 PERU_CROSS_STORE_THEMES.filter((t) => t.priority === prio),
 );
 if (grouped.length === 0) return null;
 return (
 <Stack key={prio} gap={10}>
 <Row gap={8} align="center">
 <H3 style={{ margin: 0 }}>{priorityLabels[prio]}</H3>
 <Pill tone={PeruPriorityTone(prio)} size="sm">{grouped.length}</Pill>
 </Row>
 {grouped.map((theme) => (
 <PeruCrossThemeCard key={theme.title} theme={theme} />
 ))}
 </Stack>
 );
 })}
 <Text size="small" tone="tertiary">
 Cross-reading — {s.stores} stores, {s.totalInsights} insights from Aug 31 interviews.
 </Text>
 </Stack>
 );
}

function PeruInterviewBlock({ store }: { store: PeruStoreInterview }) {
 const grouped = VISIT_CATEGORY_ORDER.map((cat) => ({
 category: cat,
 items: store.insights.filter((i) => i.category === cat),
 })).filter((g) => g.items.length > 0);

 return (
 <Stack gap={12} style={{ paddingTop: 8 }}>
 <Text size="small" tone="secondary">Source: {store.files}</Text>
 <Callout tone="neutral" title="Summary">{store.summary}</Callout>
 <Stack gap={6}>
 <Text weight="semibold" size="small">Main comments</Text>
 {store.highlights.map((h) => (
 <Text key={h} size="small">• {h}</Text>
 ))}
 </Stack>
 {grouped.map((group) => (
 <Stack key={group.category} gap={8}>
 <Row gap={8} align="center">
 <H3 style={{ margin: 0 }}>{VISIT_CATEGORY_LABELS[group.category]}</H3>
 <Pill tone={PeruCategoryTone(group.category)} size="sm">{group.items.length}</Pill>
 </Row>
 {group.items.map((item) => (
 <PeruInsightCard key={item.title} item={item} />
 ))}
 </Stack>
 ))}
 </Stack>
 );
}

function PeruCategoryView({
 category,
 selectedStore,
}: {
 category: PeruInsightCategory;
 selectedStore: string;
}) {
 const stores =
 selectedStore === "all"
 ? PERU_INTERVIEW_INSIGHTS
 : PERU_INTERVIEW_INSIGHTS.filter((s) => s.id === selectedStore);

 const visible = stores
.map((store) => ({
 store,
 items: store.insights.filter((i) => i.category === category),
 }))
.filter((entry) => entry.items.length > 0);

 const total = visible.reduce((n, e) => n + e.items.length, 0);

 return (
 <Stack gap={16}>
 <Stack gap={4}>
 <H2>{VISIT_CATEGORY_LABELS[category]}</H2>
 <Text size="small" tone="secondary">
 {total} items from {visible.length} store(s) · verbatim interview quotes
 </Text>
 </Stack>
 {visible.length === 0 && (
 <Callout tone="neutral">No items in this category for the selected filter.</Callout>
 )}
 {visible.map(({ store, items }) => (
 <CollapsibleSection
 key={store.id}
 title={store.name}
 count={items.length}
 trailing={store.district}
 defaultOpen
 >
 <Stack gap={10} style={{ paddingTop: 8 }}>
 {items.map((item) => (
 <PeruInsightCard key={item.title} item={item} />
 ))}
 </Stack>
 </CollapsibleSection>
 ))}
 </Stack>
 );
}

function VisitStoreCard({ store }: { store: PeruVisitStore }) {
 const hasMonthly = store.monthly.fillRate != null;
 return (
 <CollapsibleSection
 title={store.name}
 trailing={`${store.district} · ${store.orders.toLocaleString("en-US")} orders · ${store.couriersRegular} regular couriers`}
 defaultOpen
 >
 <Stack gap={12} style={{ paddingTop: 12 }}>
 <Grid columns={5} gap={10}>
 <Stat label="Fill Rate" value={fmtPct(store.fillRate)} tone={fillTone(store.fillRate)} />
 <Stat label="SLA 35" value={fmtPct(store.sla35)} tone={slaTone(store.sla35)} />
 <Stat label="TML 10" value={fmtPct(store.tml10)} tone={tmlTone(store.tml10)} />
 <Stat label="Rating" value={store.rating.toFixed(2).replace(".", ",")} />
 <Stat label="Stockout" value={fmtPct(store.stockout)} />
 </Grid>

 <Grid columns={4} gap={10}>
 <Stat label="Couriers (regular)" value={String(store.couriersRegular)} />
 <Stat label="Couriers in period" value={String(store.couriers)} />
 <Stat label="Availability" value={fmtPct(store.availability)} tone={availTone(store.availability)} />
 <Stat
 label="Cancel. courier / seller"
 value={`${fmtPct(store.cancelledBy.courier, 0)} / ${fmtPct(store.cancelledBy.seller, 0)}`}
 />
 </Grid>

 {hasMonthly && (
 <Table
 headers={["",...PERU_VISIT_MONTHS]}
 rows={[
 ["Fill Rate",...store.monthly.fillRate!.map((v) => fmtPct(v))],
 ["SLA 35",...store.monthly.sla35!.map((v) => fmtPct(v))],
 ["TML 10",...store.monthly.tml10!.map((v) => fmtPct(v))],
 ]}
 columnAlign={["left", "right", "right", "right"]}
 striped
 />
 )}

 <Grid columns={2} gap={12}>
 <Callout tone="danger" title="Watch">
 <Stack gap={4}>
 {store.alerts.map((a) => (
 <Text key={a} size="small">• {a}</Text>
 ))}
 </Stack>
 </Callout>
 <Callout tone="success" title="Going well">
 <Stack gap={4}>
 {store.positives.map((p) => (
 <Text key={p} size="small">• {p}</Text>
 ))}
 </Stack>
 </Callout>
 </Grid>

 <Text size="small" tone="tertiary">
 {store.poc} · Top couriers:{" "}
 {store.topCouriers.map((c) => `${c.name} (${c.orders.toLocaleString("en-US")})`).join(" · ")}
 </Text>
 </Stack>
 </CollapsibleSection>
 );
}


function PeruTeamAvatar({ member }: { member: PeruTeamMember }) {
 const initials = member.name
.split(" ")
.map((p) => p[0])
.join("")
.slice(0, 2)
.toUpperCase();
 if (member.photo) {
 return (
 <img
 src={member.photo}
 alt={member.name}
 style={{
 width: 72,
 height: 72,
 borderRadius: "50%",
 objectFit: "cover",
 border: "2px solid var(--border, #e5e7eb)",
 flexShrink: 0,
 }}
 />
 );
 }
 return (
 <div
 style={{
 width: 72,
 height: 72,
 borderRadius: "50%",
 background: "#e5e7eb",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 fontWeight: 600,
 fontSize: 20,
 color: "#6b7280",
 flexShrink: 0,
 }}
 >
 {initials}
 </div>
 );
}

function PeruTeamMemberCard({ member, large }: { member: PeruTeamMember; large?: boolean }) {
 return (
 <Card>
 <CardBody>
 <Stack gap={8}>
 <Row gap={12} align="start">
 <PeruTeamAvatar member={member} />
 <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold" size={large ? "medium" : "small"}>
 {member.name}
 </Text>
 {member.external && <Pill size="sm" tone="neutral">External</Pill>}
 </Row>
 <Text size="small" tone="secondary">{member.role}</Text>
 </Stack>
 </Row>
 {member.presentationNote && (
 <Text size="small" tone="tertiary">{member.presentationNote}</Text>
 )}
 {member.presentedSections && member.presentedSections.length > 0 && (
 <Stack gap={4}>
 <Text weight="semibold" size="small">Presented</Text>
 {member.presentedSections.map((s) => (
 <Text key={s} size="small" tone="secondary">• {s}</Text>
 ))}
 </Stack>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function PeruPdfInsightsBlock() {
 const pdf = PE_CONTEXT_PDF_INSIGHTS;
 return (
 <CollapsibleSection title="Deck metrics (PDF)" count={pdf.marketplaceResults2026.length + 4} defaultOpen>
 <Stack gap={16} style={{ paddingTop: 10 }}>
 <Text size="small" tone="secondary">
 Numbers from <em>TaDa PE Context Global</em> — complements the live transcript with charts
 and exact KPIs shown in the room.
 </Text>

 <Grid columns={3} gap={10}>
 {pdf.strategicPillars.map((p) => (
 <Card key={p}>
 <CardBody>
 <Text size="small">{p}</Text>
 </CardBody>
 </Card>
 ))}
 </Grid>

 <H3 style={{ margin: 0 }}>POC expansion journey</H3>
 <Table
 headers={["Year", "Active POCs", "% orders via POCs"]}
 rows={pdf.pocJourney.map((r) => [r.year, String(r.pocs), `${r.orderSharePct}%`])}
 columnAlign={["left", "right", "right"]}
 striped
 />

 <Grid columns={2} gap={16}>
 <Card>
 <CardHeader trailing="%">Midnight share evolution</CardHeader>
 <CardBody>
 <LineChart
 categories={pdf.midnightShareEvolution.map((r) => r.period)}
 series={[{ name: "Midnight", data: pdf.midnightShareEvolution.map((r) => r.pct) }]}
 height={200}
 valueSuffix="%"
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader>Consumer shopping mix</CardHeader>
 <CardBody>
 <Stack gap={8}>
 {pdf.consumerShopping.map((s) => (
 <Row key={s.segment} gap={8} align="center" wrap>
 <Pill tone="info" size="sm">{s.share}%</Pill>
 <Text size="small" weight="semibold">{s.segment}</Text>
 <Text size="small" tone="secondary">— {s.note}</Text>
 </Row>
 ))}
 </Stack>
 </CardBody>
 </Card>
 </Grid>

 <H3 style={{ margin: 0 }}>Marketplace 2026 results (deck)</H3>
 <Grid columns={4} gap={10}>
 {pdf.marketplaceResults2026.map((r) => (
 <Stat key={r.label} label={r.label} value={r.value} tone="info" />
 ))}
 </Grid>

 <Grid columns={2} gap={16}>
 <Card>
 <CardHeader>Acquisition mix (102k NC)</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {pdf.acquisitionMix.map((a) => (
 <Row key={a.label} gap={8} align="center">
 <Text size="small" weight="semibold" style={{ minWidth: 140 }}>{a.label}</Text>
 <Text size="small">{a.value}</Text>
 </Row>
 ))}
 </Stack>
 </CardBody>
 </Card>
 <Card>
 <CardHeader trailing="M1→M2">Retention by segment</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {pdf.retentionM1M2.map((r) => (
 <Row key={r.segment} gap={8} align="center">
 <Text size="small" style={{ flex: 1 }}>{r.segment}</Text>
 <Pill tone={r.rate >= 30 ? "success" : "warning"} size="sm">
 {r.rate}%
 </Pill>
 </Row>
 ))}
 </Stack>
 </CardBody>
 </Card>
 </Grid>

 <Callout tone="warning" title="RGB challenge (deck)">
 <Text size="small">
 Only {pdf.rgbChallenge.newUserRgbShare} of every 100 new users are RGB. Midnight RGB
 retains at {pdf.rgbChallenge.midnightRgbRetention}% vs{" "}
 {pdf.rgbChallenge.regularRgbRetention}% in regular hours (−
 {pdf.rgbChallenge.midnightGapPp} pp). Closing that gap would lift overall retention by ~
 {pdf.rgbChallenge.upliftIfMidnightMatched} pp.
 </Text>
 </Callout>

 <H3 style={{ margin: 0 }}>Regional launches & milestones</H3>
 <Stack gap={4}>
 {pdf.highlights.map((h) => (
 <Text key={h} size="small">• {h}</Text>
 ))}
 </Stack>
 </Stack>
 </CollapsibleSection>
 );
}

function PeruPdfViewer() {
 return (
 <CollapsibleSection title={`Full presentation — ${PE_CONTEXT_PDF.title}`} trailing="33 pages">
 <Stack gap={12} style={{ paddingTop: 10 }}>
 <Text size="small" tone="secondary">
 Original deck shown in the Aug 31 morning briefing. Use the viewer below or open in a new
 tab.
 </Text>
 <Row gap={8} wrap>
 <Button
 variant="secondary"
 onClick={() => window.open(PE_CONTEXT_PDF.path, "_blank", "noopener,noreferrer")}
 >
 Open PDF in new tab ↗
 </Button>
 </Row>
 <div
 style={{
 border: "1px solid var(--border, #e5e7eb)",
 borderRadius: 8,
 overflow: "hidden",
 background: "#f9fafb",
 }}
 >
 <iframe
 title={PE_CONTEXT_PDF.title}
 src={PE_CONTEXT_PDF.path}
 style={{ width: "100%", height: "min(80vh, 720px)", border: 0, display: "block" }}
 />
 </div>
 <Text size="small" tone="tertiary">Source: {PE_CONTEXT_PDF.source}</Text>
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

function PeruContextMeetingView({ onNavigateToRoadmap }: { onNavigateToRoadmap?: PeruNavigateToRoadmap }) {
 const m = PE_CONTEXT_MEETING;
 return (
 <Stack gap={20}>
 <TabPageHeader
 title="Context meeting"
 date={m.date}
 subtitle={`${m.location} · ${m.participants}`}
 />

 <TabExecutiveSummary
 headline={m.executiveSummary.headline}
 paragraphs={m.executiveSummary.paragraphs}
 />

 <Grid columns={4} gap={10}>
 {m.executiveSummary.takeaways.map((t) => (
 <Card key={t.label}>
 <CardBody>
 <Stack gap={6}>
 <Pill tone="primary" size="sm">{t.label}</Pill>
 <Text size="small">{t.text}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>

 <TabStatGrid
 stats={m.snapshot.map((s) => ({
 label: s.label,
 value: s.value,
 }))}
 />

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

 <TabContextCallout title="Connection with this afternoon’s store visits">
 <Stack gap={4}>
 {m.connectsToStores.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </TabContextCallout>

 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>Topics, by pillar</H3>
 <Text size="small" tone="secondary">
 Open one pillar at a time. Operation and Service start expanded — they feed this
 afternoon’s visits.
 </Text>
 {m.sections.map((section) => (
 <CollapsibleSection
 key={section.id}
 title={section.label}
 trailing={`${section.topics.length} topics`}
 count={section.topics.length}
 defaultOpen={section.id === "operation" || section.id === "service"}
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

 <CollapsibleSection title={m.consumerResearch.title}>
 <Stack gap={8} style={{ paddingTop: 8 }}>
 <MeetingTopicCard
 topic={{
 title: m.consumerResearch.title,
 detail: m.consumerResearch.detail,
 quotes: m.consumerResearch.quotes,
 }}
 />
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Next steps and alignments" defaultOpen>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {m.nextSteps.map((step) => (
 <Text key={step} size="small">• {step}</Text>
 ))}
 </Stack>
 </CollapsibleSection>

 <PeruContextValidationBlock onNavigate={onNavigateToRoadmap} />

 <CollapsibleSection title="Who presented" count={PE_CONTEXT_PRESENTERS.length}>
 <Grid columns={3} gap={12} style={{ paddingTop: 10 }}>
 {PE_CONTEXT_PRESENTERS.map((p) => (
 <PeruTeamMemberCard key={p.id} member={p} large />
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title="TaDa Peru team" count={PE_CONTEXT_TEAM.length}>
 <Stack gap={12} style={{ paddingTop: 10 }}>
 <Text size="small" tone="secondary">
 Full cross-functional headcount from the presentation (page 2). *External = Manpower.
 </Text>
 <Grid columns={3} gap={10}>
 {PE_CONTEXT_TEAM.map((member) => (
 <PeruTeamMemberCard key={`${member.id}-${member.role}`} member={member} />
 ))}
 </Grid>
 </Stack>
 </CollapsibleSection>

 <PeruPdfInsightsBlock />

 <CollapsibleSection title="Cities" count={m.cities.length}>
 <Grid columns={2} gap={10} style={{ paddingTop: 10 }}>
 {m.cities.map((c) => (
 <Card key={c.name}>
 <CardBody>
 <Stack gap={4}>
 <Row gap={8} align="center">
 <Text weight="semibold">{c.name}</Text>
 <Pill size="sm" tone={c.name === "Lima" ? "primary" : "neutral"}>{c.share}</Pill>
 </Row>
 <Text size="small" tone="secondary">{c.note}</Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <PeruPdfViewer />

 <TabSource>Source: {m.source}</TabSource>
 </Stack>
 );
}

export default function PeruView({
 date,
 onDateChange,
 agenda,
 onAgendaChange,
 visitTab,
 onVisitTabChange,
 onNavigateToRoadmap,
 onThemeFocus,
 onOpenSources,
}: {
 date?: PeruDateId;
 onDateChange?: (date: PeruDateId) => void;
 agenda?: PeruAgendaTab;
 onAgendaChange?: (tab: PeruAgendaTab) => void;
 visitTab?: PeruVisitTab;
 onVisitTabChange?: (tab: PeruVisitTab) => void;
 onNavigateToRoadmap?: PeruNavigateToRoadmap;
 onThemeFocus?: (focus: StakeholderFocus) => void;
 onOpenSources?: () => void;
}) {
 const [internalDate, setInternalDate] = useState<PeruDateId>("aug-31");
 const [internalAgenda, setInternalAgenda] = useState<PeruAgendaTab>("context-meeting");
 const [internalActor, setInternalActor] = useState<ServiceLevelActor | "all">("all");
 const activeDate = date ?? internalDate;
 const setActiveDate = onDateChange ?? setInternalDate;
 const activeAgenda = agenda ?? internalAgenda;
 const setActiveAgenda = onAgendaChange ?? setInternalAgenda;
 const activeContext = getSessionContext(activeAgenda);
 const activeActor = internalActor;

 const contextDates = getDatesForContext(activeContext);
 const dayGroup = getPeruDateGroup(activeDate);
 const contextSessions = getSessionsForContext(activeContext, activeDate);
 const activeSessionLabel =
 contextSessions.find((s) => s.id === activeAgenda)?.label ?? getSessionLabel(activeAgenda);

 function handleContextChange(nextContext: PeruContextId) {
 setInternalActor("all");
 const nextSession = getDefaultSessionForContext(nextContext);
 handleSessionChange(nextSession);
 }

 function handleDateChange(nextDate: PeruDateId) {
 const sessions = getSessionsForContext(activeContext, nextDate);
 const nextSession = sessions[0]?.id ?? getDefaultSessionForContext(activeContext);
 handleSessionChange(nextSession, nextDate);
 }

 function handleSessionChange(nextSession: PeruAgendaTab, nextDate?: PeruDateId) {
 if (nextSession !== "store-visits" && onVisitTabChange) {
 onVisitTabChange("home");
 }
 setActiveAgenda(nextSession);
 setActiveDate(nextDate ?? getPeruDateForSession(nextSession));
 }

 const compactOptions: CompactVisitOption<PeruAgendaTab>[] = contextDates.flatMap((day) =>
 getSessionsForContext(activeContext, day.id).map((session) => ({
 dateId: day.id,
 dateLabel: day.dateLabel,
 shortLabel: day.shortLabel,
 sessionId: session.id,
 sessionLabel: session.label,
 time: session.time,
 })),
 );
 const useCompactPicker = compactOptions.length <= 4;

 return (
 <Stack gap={16}>
 <CountryHubOverview
 country="peru"
 onPeruContext={handleContextChange}
 onThemeFocus={onThemeFocus}
 onOpenSources={onOpenSources}
 />
 <PeruContextNav
 activeContext={activeContext}
 onContextChange={handleContextChange}
 activeActor={activeActor}
 onActorChange={setInternalActor}
 showActorFilter={activeAgenda === "service-level"}
 />

 <VisitLocationBar
 segments={[
 "Peru",
 getContextLabel(activeContext),
 dayGroup.dateLabel,
 activeSessionLabel,
 ]}
 />

 {useCompactPicker ? (
 <CompactVisitPicker
 options={compactOptions}
 activeSessionId={activeAgenda}
 onSelect={(sessionId, dateId) =>
 handleSessionChange(sessionId, dateId as PeruDateId)
 }
 tripPeriod={PERU_TRIP_PERIOD}
 />
 ) : (
 <>
 <DateTimelineNav
 tripPeriod={PERU_TRIP_PERIOD}
 dates={contextDates}
 activeDateId={activeDate}
 onDateChange={handleDateChange}
 />
 <SessionSubNav
 sessions={contextSessions}
 activeSessionId={activeAgenda}
 onSessionChange={handleSessionChange}
 dateLabel={dayGroup.dateLabel}
 />
 </>
 )}

 {activeAgenda === "context-meeting" && (
 <PeruContextMeetingView onNavigateToRoadmap={onNavigateToRoadmap} />
 )}
 {activeAgenda === "b2b-platform" && (
 <PeruB2bPlatformView
 onNavigateToRoadmap={onNavigateToRoadmap}
 onAgendaChange={handleSessionChange}
 />
 )}
 {activeAgenda === "store-visits" && (
 <PeruStoreVisitsView
 visitTab={visitTab}
 onVisitTabChange={onVisitTabChange}
 onNavigateToRoadmap={onNavigateToRoadmap}
 onAgendaChange={handleSessionChange}
 />
 )}
 {activeAgenda === "service-level" && (
 <PeruServiceLevelView
 onAgendaChange={handleSessionChange}
 actor={activeActor}
 />
 )}
 {(activeAgenda === "workshop-0209" ||
 activeAgenda === "workshop-ops" ||
 activeAgenda === "workshop-consumer" ||
 activeAgenda === "workshop-rewards") && (
 <PeruWorkshopView
 onAgendaChange={handleSessionChange}
 groupFilter={getWorkshopGroupForSession(activeAgenda)}
 />
 )}
 {activeAgenda === "consumer-vision" && (
 <PeruConsumerVisionView onAgendaChange={handleSessionChange} />
 )}
 {activeAgenda === "overall-result" && (
 <PeruOverallView
 onAgendaChange={handleSessionChange}
 onNavigateToRoadmap={onNavigateToRoadmap}
 />
 )}
 </Stack>
 );
}

function PeruStoreVisitsView({
 visitTab,
 onVisitTabChange,
 onNavigateToRoadmap,
 onAgendaChange,
}: {
 visitTab?: PeruVisitTab;
 onVisitTabChange?: (tab: PeruVisitTab) => void;
 onNavigateToRoadmap?: PeruNavigateToRoadmap;
 onAgendaChange?: (tab: PeruAgendaTab) => void;
}) {
 const [internalTab, setInternalTab] = useState<PeruVisitTab>("home");
 const activeTab = visitTab ?? internalTab;
 const setActiveTab = onVisitTabChange ?? setInternalTab;
 const [selectedStore, setSelectedStore] = useState("all");
 const s = PERU_VISIT_EXECUTIVE_SUMMARY.stats;

 const storeOptions = [
 { value: "all", label: "All stores" },
...PERU_INTERVIEW_INSIGHTS.map((st) => ({ value: st.id, label: st.name })),
 ];

 const filteredInterviews =
 selectedStore === "all"
 ? PERU_INTERVIEW_INSIGHTS
 : PERU_INTERVIEW_INSIGHTS.filter((st) => st.id === selectedStore);

 return (
 <Stack gap={16}>
 <VisitInsightsTabBar
 active={activeTab}
 onChange={setActiveTab}
 insights={PERU_INTERVIEW_INSIGHTS}
 />

 {activeTab !== "home" && (
 <Row gap={12} align="center">
 <Text size="small" tone="secondary">Filter store:</Text>
 <Select value={selectedStore} onChange={setSelectedStore} options={storeOptions} />
 </Row>
 )}

 {activeTab === "bugs" && <PeruCategoryView category="Bug" selectedStore={selectedStore} />}
 {activeTab === "product" && <PeruCategoryView category="Product" selectedStore={selectedStore} />}
 {activeTab === "ux" && <PeruCategoryView category="UX" selectedStore={selectedStore} />}
 {activeTab === "operation" && (
 <PeruCategoryView category="Operation" selectedStore={selectedStore} />
 )}
 {activeTab === "infra" && <PeruCategoryView category="Infra" selectedStore={selectedStore} />}

 {activeTab === "home" && (
 <>
 <TabPageHeader
 title="Lima store visits"
 date="Aug 31"
 subtitle="3 POCs — La Marina, Merino, San Pedro. KPI-backed insights plus in-store interviews."
 />

 <TabExecutiveSummary
 headline={PERU_VISIT_EXECUTIVE_SUMMARY.headline}
 paragraphs={PERU_VISIT_EXECUTIVE_SUMMARY.paragraphs}
 />

 {onAgendaChange && (
 <TabContextCallout title="Web Tiendas (B2B platform) — praised at La Marina & Merino">
 <Text size="small">
 Peru OPS built an external B2B portal for weekly KPIs, demand heatmaps, courier
 staffing, promo stock lists, and VLC payments — the gaps the official seller app
 still doesn't cover. La Marina and Merino both use it daily.
 </Text>
 <Button variant="secondary" onClick={() => onAgendaChange("b2b-platform")}>
 See platform walkthrough →
 </Button>
 </TabContextCallout>
 )}

 <Callout tone="warning" title="KPI alerts from Power BI">
 San Pedro TML 10 at 36.8% vs 87–93% in the other two. Merino stockout 4.4% with SKU
 availability at 68.4%. San Pedro seller cancellations at 12.2%.
 </Callout>

 <TabStatGrid
 columns={3}
 stats={[
 { label: "POCs visited", value: String(s.stores) },
 { label: "Total insights", value: String(s.totalInsights) },
 { label: "Critical themes", value: String(s.criticalThemes), tone: "warning" },
 { label: "Bugs", value: String(s.bugCount), tone: "warning" },
 { label: "UX + Product", value: String(s.uxCount + s.productCount), tone: "info" },
 { label: "Infra", value: String(s.infraCount), tone: "warning" },
 ]}
 />

 <TabStatGrid
 stats={[
 { label: "Total orders (Lima)", value: LIMA.orders.toLocaleString("en-US") },
 { label: "Average Fill Rate", value: fmtPct(LIMA.fillRate), tone: fillTone(LIMA.fillRate) },
 { label: "Average SLA 35", value: fmtPct(LIMA.sla35), tone: slaTone(LIMA.sla35) },
 { label: "TML 10 medium", value: fmtPct(LIMA.tml10), tone: tmlTone(LIMA.tml10) },
 ]}
 />

 <CollapsibleSection title="Cross-store patterns" count={PERU_CROSS_STORE_THEMES.length} defaultOpen>
 <Stack gap={8} style={{ paddingTop: 8 }}>
 <Text size="small" tone="secondary">
 Recurring themes from La Marina, Merino and San Pedro — same structural gaps as Mexico
 CDMX/Puebla visits (map, inventory, communication).
 </Text>
 <PeruCrossStoreBlock />
 </Stack>
 </CollapsibleSection>

 <PeruRoadmapLinksBlock onNavigate={onNavigateToRoadmap} />

 <H2>Store comparison (KPIs)</H2>
 <Table
 headers={[
 "Store",
 "District",
 "Orders",
 "Fill Rate",
 "SLA 35",
 "TML 10",
 "Rating",
 "Couriers",
 ]}
 rows={PERU_VISIT_STORES.map((st) => [
 st.name,
 st.district,
 st.orders.toLocaleString("en-US"),
 fmtPct(st.fillRate),
 fmtPct(st.sla35),
 fmtPct(st.tml10),
 st.rating.toFixed(2).replace(".", ","),
 `${st.couriersRegular} regular · ${st.couriers} in period`,
 ])}
 columnAlign={["left", "left", "right", "right", "right", "right", "right", "right"]}
 rowTone={PERU_VISIT_STORES.map((st) => {
 if (st.tml10 < 45 || st.fillRate < 91) return "danger";
 if (st.sla35 >= 95 && st.fillRate >= 94 && st.tml10 >= 60) return "success";
 return undefined;
 })}
 striped
 />

 <H2>Interview insights by store</H2>
 <Grid columns={3} gap={12}>
 {PERU_INTERVIEW_INSIGHTS.map((st) => (
 <Card key={st.id}>
 <CardHeader trailing={`${st.insights.length} insights`}>{st.name}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 <Text size="small" tone="secondary">{st.district} · {st.poc}</Text>
 <ReaderText size="small">{st.summary}</ReaderText>
 {st.highlights.slice(0, 3).map((h) => (
 <Text key={h} size="small" tone="secondary">• {h}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>

 {filteredInterviews.map((store) => (
 <CollapsibleSection
 key={store.id}
 title={store.name}
 count={store.insights.length}
 trailing={`${store.district} · ${store.poc}`}
 >
 <PeruInterviewBlock store={store} />
 </CollapsibleSection>
 ))}

 {PERU_VISIT_STORES.map((store) => (
 <VisitStoreCard key={store.id} store={store} />
 ))}

 <CollapsibleSection title="Monthly trends — Lima (May–Aug 2026)" trailing="4 graphs" count={4}>
 <Stack gap={16} style={{ paddingTop: 12 }}>
 <Grid columns={2} gap={16}>
 <Card>
 <CardHeader trailing="%">Monthly fill rate — Lima</CardHeader>
 <CardBody>
 <LineChart
 categories={LIMA_MONTHS}
 series={[{ name: LIMA.name, data: LIMA.monthly.fillRate }]}
 height={220}
 valueSuffix="%"
 beginAtZero={false}
 yMin={88}
 yMax={100}
 referenceLines={[{ value: 93, label: "Target 93%", tone: "warning" }]}
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader trailing="%">Monthly TML 10 — Lima</CardHeader>
 <CardBody>
 <LineChart
 categories={LIMA_MONTHS}
 series={[{ name: LIMA.name, data: LIMA.monthly.tml10 }]}
 height={220}
 valueSuffix="%"
 referenceLines={[{ value: 60, label: "Target 60%", tone: "success" }]}
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader trailing="%">Monthly SLA 35 — Lima</CardHeader>
 <CardBody>
 <LineChart
 categories={LIMA_MONTHS}
 series={[{ name: LIMA.name, data: LIMA.monthly.sla35 }]}
 height={220}
 valueSuffix="%"
 beginAtZero={false}
 yMin={90}
 yMax={100}
 referenceLines={[{ value: 95, label: "Target 95%", tone: "success" }]}
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader>Monthly order rating — Lima</CardHeader>
 <CardBody>
 <LineChart
 categories={LIMA_MONTHS}
 series={[{ name: LIMA.name, data: LIMA.monthly.rating }]}
 height={220}
 beginAtZero={false}
 yMin={4.8}
 yMax={5}
 />
 </CardBody>
 </Card>
 </Grid>
 </Stack>
 </CollapsibleSection>

 <Text size="small" tone="tertiary">
 Interviews: Peru/31:08/ (La Marina, Merino, San Pedro) · KPIs: Power BI · Period{" "}
 {LIMA_PERIOD} · {PERU_VISIT_STORES.length} stores visited Aug 31
 </Text>
 </>
 )}
 </Stack>
 );
}
