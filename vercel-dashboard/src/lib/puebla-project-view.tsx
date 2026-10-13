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
 Text,
} from "@/components/ui";
import { EvidenceScopeCallout } from "@/components/evidence-scope-callout";
import { FieldInsightCard } from "@/components/field-insight-card";
import { ReaderText } from "./reader-text-ui";
import {
 TabContextCallout,
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import { interviewForSection, PUEBLA_PROJECT_INTERVIEWS } from "./puebla-project-interviews";
import {
 PUEBLA_PROJECT_CROSS_THEMES,
 PUEBLA_PROJECT_META,
 type PueblaProjectInsight,
 type PueblaProjectInsightCategory,
 type PueblaProjectSectionId,
} from "./puebla-project-shared";
import { useLocale } from "./i18n/locale-context";
import {
 getPueblaOverviewUi,
 getPueblaProjectExecutive,
 getPueblaProjectMeta,
} from "./i18n/content/puebla-executive";
import { getPueblaProjectSections } from "./i18n/navigation";
import { UI, uiTemplate } from "./i18n/ui";

function categoryTone(c: PueblaProjectInsightCategory): "warning" | "info" | "success" | "neutral" | "primary" {
 if (c === "Bug") return "warning";
 if (c === "UX") return "info";
 if (c === "Product") return "primary";
 if (c === "Operation") return "neutral";
 if (c === "CX") return "success";
 return "neutral";
}

function priorityTone(p: "Critical" | "High" | "Medium"): "warning" | "info" | "neutral" {
 if (p === "Critical") return "warning";
 if (p === "High") return "info";
 return "neutral";
}

function PueblaInsightCard({ insight }: { insight: PueblaProjectInsight }) {
 return (
 <FieldInsightCard
 title={insight.title}
 observation={insight.detail}
 headerPills={[{ label: insight.category, tone: categoryTone(insight.category) }]}
 quotes={insight.quotes}
 />
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
.then((t) => {
 if (!cancelled) setText(t);
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
 background: "#f9fafb",
 borderRadius: 8,
 border: "1px solid #e5e7eb",
 }}
 >
 {text}
 </pre>
 )}
 </Stack>
 </CollapsibleSection>
 );
}

function SectionNav({
 active,
 onChange,
 sections,
}: {
 active: PueblaProjectSectionId;
 onChange: (id: PueblaProjectSectionId) => void;
 sections: { id: PueblaProjectSectionId; label: string; subtitle: string }[];
}) {
 const { t } = useLocale();
 const meta = sections.find((s) => s.id === active);
 return (
 <Card>
 <CardBody>
 <Stack gap={12}>
 <Text size="small" tone="secondary" weight="semibold">{t(UI.sessionNav)}</Text>
 <Row gap={8} wrap>
 {sections.map((section) => (
 <Button
 key={section.id}
 variant={active === section.id ? "primary" : "secondary"}
 onClick={() => onChange(section.id)}
 >
 {section.label}
 </Button>
 ))}
 </Row>
 {meta && (
 <Text size="small" tone="tertiary">{meta.subtitle}</Text>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

function OverviewSection() {
 const { locale, t } = useLocale();
 const exec = getPueblaProjectExecutive(locale);
 const overviewUi = getPueblaOverviewUi(locale);
 return (
 <Stack gap={20}>
 <TabExecutiveSummary
 title={t(UI.executiveSummary)}
 headline={exec.headline}
 paragraphs={exec.paragraphs}
 />

 <Grid columns={4} gap={10}>
 {exec.takeaways.map((t) => (
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

 <TabStatGrid stats={exec.stats} />

 <TabContextCallout title={overviewUi.whatWeSaw}>
 <Stack gap={10}>
 {exec.visitMap.map((v) => (
 <Stack key={v.zone} gap={2}>
 <Text weight="semibold" size="small">{v.zone}</Text>
 <Text size="small" tone="secondary">{v.seen}</Text>
 </Stack>
 ))}
 </Stack>
 </TabContextCallout>

 <CollapsibleSection
 title="Critical priorities (summary of 8 cross-themes)"
 count={PUEBLA_PROJECT_CROSS_THEMES.filter((t) => t.priority === "Critical").length}
 defaultOpen
 >
 <Stack gap={8} style={{ paddingTop: 8 }}>
 {PUEBLA_PROJECT_CROSS_THEMES.filter((t) => t.priority === "Critical").map((t) => (
 <Stack key={t.theme} gap={2}>
 <Text size="small" weight="semibold">{t.theme}</Text>
 <ReaderText size="small" tone="secondary">{t.detail}</ReaderText>
 </Stack>
 ))}
 <Text size="small" tone="tertiary">
 Full High/Medium themes on the Cross-themes tab.
 </Text>
 </Stack>
 </CollapsibleSection>

 <Card>
 <CardHeader>Transcripts in this project</CardHeader>
 <CardBody>
 <Stack gap={8}>
 {PUEBLA_PROJECT_INTERVIEWS.map((i) => (
 <Row key={i.id} gap={8} align="center" wrap>
 <Pill size="sm" tone="neutral">{i.interviewType}</Pill>
 <Text size="small" weight="semibold">{i.label}</Text>
 <Text size="small" tone="tertiary">— {i.fileName}</Text>
 </Row>
 ))}
 <Text size="small" tone="tertiary">
 Note: source folder also contains duplicate{" "}
 <code>Rota_CX_Proactive (1).txt</code> (same as Proactive).
 </Text>
 </Stack>
 </CardBody>
 </Card>
 </Stack>
 );
}

function CrossThemesSection() {
 return (
 <Stack gap={12}>
 <H3 style={{ margin: 0 }}>Cross-cutting themes</H3>
 <Grid columns={1} gap={10}>
 {PUEBLA_PROJECT_CROSS_THEMES.map((t) => (
 <Card key={t.theme}>
 <CardBody>
 <Stack gap={8}>
 <Row gap={8} align="center" wrap>
 <Pill size="sm" tone={priorityTone(t.priority)}>{t.priority}</Pill>
 <Text weight="semibold">{t.theme}</Text>
 </Row>
 <ReaderText size="small">{t.detail}</ReaderText>
 <Text size="small" tone="tertiary">
 Evidence: {t.evidenceFiles.join(" · ")}
 </Text>
 {t.quotes.map((q) => (
 <Text key={q} size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </Stack>
 );
}

function InterviewSection({ sectionId }: { sectionId: PueblaProjectSectionId }) {
 const interview = interviewForSection(sectionId);
 if (!interview) return null;

 return (
 <Stack gap={16}>
 <TabExecutiveSummary headline={interview.label} paragraphs={[interview.executiveSummary]} />
 <Row gap={8} wrap>
 <Pill tone="neutral">{interview.interviewType}</Pill>
 <Pill tone="neutral">{interview.location}</Pill>
 </Row>
 <CollapsibleSection title="Highlights" defaultOpen>
 <Stack gap={4} style={{ paddingTop: 8 }}>
 {interview.highlights.map((h) => (
 <Text key={h} size="small">• {h}</Text>
 ))}
 </Stack>
 </CollapsibleSection>
 <Stack gap={10}>
 <H3 style={{ margin: 0 }}>Insights ({interview.insights.length})</H3>
 <Grid columns={1} gap={10}>
 {interview.insights.map((insight) => (
 <PueblaInsightCard key={insight.title} insight={insight} />
 ))}
 </Grid>
 </Stack>
 <TranscriptBlock path={interview.transcriptPath} fileName={interview.fileName} />
 <TabSource>Source: {PUEBLA_PROJECT_META.sourceFolder}{interview.fileName}</TabSource>
 </Stack>
 );
}

export default function PueblaProjectView({
 section,
 onSectionChange,
}: {
 section: PueblaProjectSectionId;
 onSectionChange: (section: PueblaProjectSectionId) => void;
}) {
 const { locale } = useLocale();
 const meta = getPueblaProjectMeta(locale);
 const sections = getPueblaProjectSections(locale);
 const sectionMeta = sections.find((s) => s.id === section);

 return (
 <Stack gap={24}>
 <TabPageHeader
 title={meta.title}
 date={meta.period}
 badge={meta.scope}
 subtitle={meta.subtitle}
 />

 <EvidenceScopeCallout showLegacyNote={false} />

 <SectionNav active={section} onChange={onSectionChange} sections={sections} />

 {sectionMeta && section !== "overview" && (
 <Text size="small" tone="secondary" weight="semibold">{sectionMeta.label}</Text>
 )}

 {section === "overview" && <OverviewSection />}
 {section === "cross-themes" && <CrossThemesSection />}
 {section !== "overview" && section !== "cross-themes" && (
 <InterviewSection sectionId={section} />
 )}
 </Stack>
 );
}

export type { PueblaProjectSectionId };
