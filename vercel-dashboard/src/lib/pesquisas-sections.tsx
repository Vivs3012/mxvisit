"use client";

import {
 BarChart,
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
 TabSource,
 TabStatGrid,
} from "@/components/view-shell";
import CompetitorsView from "./competitors-view";
import {
 COURIER_FRICTIONS,
 COURIER_PROFILES,
 COURIER_SURVEY_DIST,
 PLAN_90_DAYS,
 SELLER_CLUSTER_MATRIX,
 SELLER_CLUSTER_TABLE,
 SELLER_DECISION_PLAYS,
 SELLER_KPI_RECOGNITION,
 SELLER_SURVEY_DIST,
 SELLERS_COURIERS_EXECUTIVE,
 SELLERS_COURIERS_METHOD,
 SELLERS_COURIERS_META,
 SELLERS_COURIERS_NOTES,
 SELLER_CLUSTER_RULES,
 SERVICE_CHAIN_MOMENTS,
} from "./sellers-couriers-research";
import {
 LOVERS_BEER_FREQUENCY,
 LOVERS_BLOCK01_HYPOTHESES,
 LOVERS_BLOCK01_OPPORTUNITIES,
 LOVERS_BLOCK04_HYPOTHESES,
 LOVERS_BLOCK04_OPPORTUNITIES,
 LOVERS_BUY_OUTSIDE_REASONS,
 LOVERS_CHOICE_REASONS,
 LOVERS_CLOSING,
 LOVERS_COMBOS,
 LOVERS_CONSUMPTION,
 LOVERS_DISCOVERY_CHANNELS,
 LOVERS_IF_DISAPPEARED_QUOTES,
 LOVERS_MIGRATE_SOLUTIONS,
 LOVERS_MIX,
 LOVERS_OCCASIONS_FULL,
 LOVERS_OFF_APP_CHANNELS,
 LOVERS_OFF_APP_FREQUENCY,
 LOVERS_ORDER_MORE,
 LOVERS_PLUS_EXEC_NARRATIVE,
 LOVERS_PLUS_METHODOLOGY,
 LOVERS_PLUS_REGIONS,
 LOVERS_PLUS_SOURCE,
 LOVERS_RECOMMEND_MENTION,
 LOVERS_SUBSCRIPTION_INTEREST,
 LOVERS_TAKEAWAYS_PRODUCT,
 LOVERS_TAKEAWAYS_SERVICE,
 LOVERS_TRANSACTIONAL,
 LOVERS_WOULD_BUY_MORE_IF_SOLVED,
 LOVERS_CATEGORIES_MISSING,
} from "./lovers-plus-research";
import {
 APPBOT_TOPICS_FULL,
 CHURN_FRAMEWORK_NOTES,
 CHURN_LA_SOURCE,
 CHURN_OPPORTUNITIES_BY_PATTERN,
 CHURN_PATTERNS,
 CHURN_RETURN_INSIGHT,
 CHURN_SURVEY_SIGNALS,
 EVENT_DRIVEN_HEADLINE,
 EVENT_DRIVEN_HYPOTHESES,
 EVENT_DRIVEN_INDICATORS,
 EVENT_DRIVEN_NOTE,
 FRICTION_CHURN_BY_COUNT,
 FRICTION_CHURN_LIFT,
 FRICTION_DEFINITION,
 FRICTION_TOP_COMBINATIONS,
 ONBOARDING_FAILURE_DETAIL,
 PROACTIVE_RECOVERY_DETAIL,
 VALUE_EXIT_CHURN_REASONS,
 VALUE_EXIT_LA_NOTES,
 VALUE_EXIT_WHERE_BUY,
 CUSTOM_TOPIC_MARKS,
 DATA_QUALITY_NOTES,
 EVENT_INTERVENTIONS,
 EXEC_DECISION_SIGNALS,
 FRICTION_CHURN,
 INTEGRATED_PRINCIPLES,
 INTERPRET_EVIDENCE_BULLETS,
 KPI_PANEL,
 MARKET_DETAIL,
 PESQUISAS_META,
 PESQUISAS_SOURCES,
 PRIORITIZATION_PRINCIPLE,
 SUMARIO_SECTION_GUIDE,
 PRIORITY_ROADMAP_FULL,
 REPORT_MAP,
 REVIEW_ACTIONABLE,
 REVIEW_BY_MONTH,
 REVIEW_BY_STORE,
 REVIEW_DECISION_QUESTION,
 REVIEW_RATING_DIST,
 REWARDS_DETAIL,
 SINTESE_BRIDGE,
 STORES_NOTE,
 THEME_DEEP_DIVES,
 THESIS_LAYERS,
 VALUE_EXIT_STATS,
 VOZ_DISTRIBUTION_NARRATIVE,
 type PesquisaSectionId,
} from "./pesquisas-data";
import type { Locale } from "./i18n/locale";
import { getPesquisasExecutive } from "./i18n/content/pesquisas";
import {
 getChurnInterviewQuotes,
 getChurnSurveyOpenThemes,
 getCourierOpenQuotes,
 getLoversPlusExecNarrative,
 getReportMap,
 getReviewVoiceQuotes,
 getSellerOpenQuotes,
 getSellersCouriersExecutive,
 getSellersCouriersMethod,
 getLoversPlusSource,
 getSumarioSectionGuide,
 translateAppbotTheme,
 translateCustomTopic,
} from "./i18n/content/pesquisas-content-locale";
import { getPesquisasLabels } from "./i18n/content/pesquisas-labels";
import { useLocale } from "./i18n/locale-context";
import { UI } from "./i18n/ui";

function usePesquisasL10n() {
 const { locale, t } = useLocale();
 return {
 locale,
 t,
 L: getPesquisasLabels(locale),
 execTitle: t(UI.executiveSummary),
 };
}

function Bullets({ items }: { items: string[] }) {
 return (
 <Stack gap={6}>
 {items.map((item) => (
 <Text key={item} size="small" tone="secondary">· {item}</Text>
 ))}
 </Stack>
 );
}

export function SumarioSection() {
 const { locale, t, L, execTitle } = usePesquisasL10n();
 const exec = getPesquisasExecutive(locale);
 const guide = getSumarioSectionGuide(locale);
 return (
 <Stack gap={24}>
 <TabExecutiveSummary
 title={execTitle}
 headline={exec.headline}
 paragraphs={exec.paragraphs}
 />
 <TabStatGrid stats={exec.stats} />
 <TabStatGrid stats={exec.statsSecondary} />
 <CollapsibleSection title={L.sumario.deepDive} defaultOpen>
 <Table
 headers={[L.sumario.topicCol, L.sumario.quickReadCol]}
 rows={guide.map((r) => [r.section, r.insight])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.sumario.thesis} defaultOpen>
 <Grid columns={2} gap={12}>
 {THESIS_LAYERS.map((t) => (
 <Card key={t.layer}>
 <CardHeader><Text weight="semibold">{t.layer}</Text></CardHeader>
 <CardBody><ReaderText size="small" tone="secondary">{t.detail}</ReaderText></CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.sumario.signals} defaultOpen>
 <Table
 headers={[L.sumario.signalCol, L.sumario.evidenceCol, L.sumario.implicationCol]}
 rows={EXEC_DECISION_SIGNALS.map((r) => [r.signal, r.evidence, r.implication])}
 />
 </CollapsibleSection>
 <Callout tone="warning" title={L.sumario.suggestedDecision}>
 <Text size="small">{L.sumario.suggestedDecisionBody}</Text>
 </Callout>
 <TabSource>{L.sumario.sourceFooter}</TabSource>
 </Stack>
 );
}

export function MetodoSection() {
 const { locale, L } = usePesquisasL10n();
 const reportMap = getReportMap(locale);
 return (
 <Stack gap={24}>
 <CollapsibleSection title={L.metodo.reportMap} defaultOpen>
 <Table
 headers={[L.metodo.sectionCol, L.metodo.themeCol, L.metodo.contentCol]}
 rows={reportMap.map((r) => [r.num, r.theme, r.content])}
 />
 </CollapsibleSection>
 <Table
 headers={[L.metodo.fileCol, L.metodo.sampleCol, L.metodo.periodCol, L.metodo.useCol]}
 rows={PESQUISAS_SOURCES.filter((s) => !s.file.includes("PPTX")).map((s) => [
 s.file,
 s.sample,
 s.period,
 s.use,
 ])}
 />
 <CollapsibleSection title={L.metodo.interpret} defaultOpen>
 <Bullets items={INTERPRET_EVIDENCE_BULLETS} />
 </CollapsibleSection>
 <CollapsibleSection title={L.metodo.dataLimits}>
 <Bullets items={DATA_QUALITY_NOTES} />
 </CollapsibleSection>
 </Stack>
 );
}

export function VozConsumidorSection() {
 const { locale, L } = usePesquisasL10n();
 return (
 <Stack gap={24}>
 <TabStatGrid
 columns={3}
 stats={[
 { label: L.voz.reviews, value: "1.630" },
 { label: L.voz.avgRating, value: "3,44", tone: "warning" },
 { label: "1★ / 5★", value: "33% / 55%", tone: "info" },
 ]}
 />
 <Callout tone="info" title={L.voz.distributionCallout}>
 <Bullets items={VOZ_DISTRIBUTION_NARRATIVE} />
 </Callout>
 <CollapsibleSection title={L.voz.starDist} defaultOpen>
 <BarChart
 categories={REVIEW_RATING_DIST.map((r) => r.stars)}
 series={[
 { name: L.voz.reviewsPct, data: REVIEW_RATING_DIST.map((r) => r.pct), tone: "primary" },
 { name: L.voz.countSeries, data: REVIEW_RATING_DIST.map((r) => r.count), tone: "neutral" },
 ]}
 height={260}
 />
 <Table
 headers={["Estrelas", "Contagem", "%"]}
 rows={REVIEW_RATING_DIST.map((r) => [r.stars, String(r.count), `${r.pct}%`])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.monthlyTrend} defaultOpen>
 <BarChart
 categories={REVIEW_BY_MONTH.map((m) => m.month)}
 series={[
 { name: L.voz.avgRating, data: REVIEW_BY_MONTH.map((m) => m.avg), tone: "primary" },
 { name: "% 1★", data: REVIEW_BY_MONTH.map((m) => m.oneStar), tone: "danger" },
 { name: "% 5★", data: REVIEW_BY_MONTH.map((m) => m.fiveStar), tone: "success" },
 ]}
 height={300}
 />
 <Table
 headers={[L.voz.monthCol, L.voz.nCol, L.voz.averageCol, "% 1★", "% 5★"]}
 rows={REVIEW_BY_MONTH.map((m) => [
 m.month,
 String(m.n),
 String(m.avg),
 `${m.oneStar}%`,
 `${m.fiveStar}%`,
 ])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.playVsIos}>
 <Table
 headers={[L.voz.storeCol, L.voz.reviews, "Média", "% 1★", "% 5★", L.voz.negSentiment]}
 rows={REVIEW_BY_STORE.map((r) => [
 r.store,
 String(r.reviews),
 String(r.avg),
 `${r.oneStar}%`,
 `${r.fiveStar}%`,
 `${r.negSentiment}%`,
 ])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.appbotFullTable} defaultOpen>
 <Table
 headers={["Tema", "Menções", "% neg.", "Nota média"]}
 rows={APPBOT_TOPICS_FULL.map((t) => [
 translateAppbotTheme(t.theme, locale),
 String(t.mentions),
 `${t.negPct}%`,
 String(t.avg),
 ])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.themeReading}>
 <Grid columns={2} gap={12}>
 {THEME_DEEP_DIVES.map((d) => (
 <Card key={d.title}>
 <CardHeader><Text weight="semibold">{d.title}</Text></CardHeader>
 <CardBody><Text size="small" tone="secondary">{d.body}</Text></CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.customTopics}>
 <Table
 headers={[L.voz.customTopicCol, L.voz.reviews]}
 rows={CUSTOM_TOPIC_MARKS.map((c) => [translateCustomTopic(c.topic, locale), String(c.reviews)])}
 />
 <Text size="small" tone="tertiary">
 1.519 reviews sem marcação custom — sinais categorizados, não incidência na base.
 </Text>
 </CollapsibleSection>
 <CollapsibleSection title={L.voz.quotes} defaultOpen>
 <Grid columns={2} gap={12}>
 {getReviewVoiceQuotes(locale).map((q) => (
 <Card key={q.theme}>
 <CardHeader><Pill size="sm" tone="neutral">{q.theme}</Pill></CardHeader>
 <CardBody><Text size="small" tone="secondary">&ldquo;{q.quote}&rdquo;</Text></CardBody>
 </Card>
 ))}
 </Grid>
 <Bullets items={REVIEW_ACTIONABLE} />
 <Callout tone="warning" title={L.voz.decisionQ}>
 <Text size="small">{REVIEW_DECISION_QUESTION}</Text>
 </Callout>
 </CollapsibleSection>
 <TabSource>Appbot_review_tier1_6months.csv — recálculo local alinhado ao relatório.</TabSource>
 </Stack>
 );
}

export function ChurnSection() {
 const { locale, L } = usePesquisasL10n();
 const churnOpenThemes = getChurnSurveyOpenThemes(locale);
 const churnInterviews = getChurnInterviewQuotes(locale);
 return (
 <Stack gap={24}>
 <Callout tone="info" title={L.churn.source}>
 <Text size="small">{CHURN_LA_SOURCE}</Text>
 </Callout>
 <TabStatGrid
 stats={[
 { label: "GMV perdido (4 grupos)", value: "US$ 60M", tone: "danger" },
 { label: "Churn involuntário (fora)", value: "7%", tone: "warning" },
 { label: "One-time buyers (fora)", value: "35%", tone: "info" },
 { label: "Gradual + 3+ fricções", value: ">50%", tone: "danger" },
 ]}
 />
 <CollapsibleSection title={L.churn.framework} defaultOpen>
 <Bullets items={CHURN_FRAMEWORK_NOTES} />
 <Table
 headers={["Padrão", "Participação", "GMV anual", "Aprendizado"]}
 rows={CHURN_PATTERNS.map((p) => [p.pattern, p.share, p.gmv, p.learning])}
 />
 <BarChart
 categories={CHURN_PATTERNS.map((p) => p.pattern.replace("Perda gradual de ", "Gradual ").slice(0, 18))}
 series={[{ name: "Participação %", data: CHURN_PATTERNS.map((p) => parseInt(p.share, 10)), tone: "primary" }]}
 height={240}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.gradualLoss} defaultOpen>
 <Text size="small" tone="secondary">{FRICTION_DEFINITION}</Text>
 <BarChart
 categories={FRICTION_CHURN_BY_COUNT.map((f) => `${f.frictions} fric.`)}
 series={[{ name: L.churn.churnRateSeries, data: FRICTION_CHURN_BY_COUNT.map((f) => f.churnRate), tone: "danger" }]}
 height={260}
 />
 <Text size="small" tone="secondary">{FRICTION_CHURN_LIFT}</Text>
 <BarChart
 categories={FRICTION_TOP_COMBINATIONS.map((c) => c.combo.slice(0, 28) + (c.combo.length > 28 ? "…" : ""))}
 series={[{ name: "% combinações", data: FRICTION_TOP_COMBINATIONS.map((c) => c.share), tone: "warning" }]}
 height={300}
 />
 <Table
 headers={["Combinação top", "%"]}
 rows={FRICTION_TOP_COMBINATIONS.map((c) => [c.combo, `${c.share}%`])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.onboarding} defaultOpen>
 <TabStatGrid
 columns={2}
 stats={[
 { label: "Participação", value: ONBOARDING_FAILURE_DETAIL.share },
 { label: L.churn.lostGmv, value: ONBOARDING_FAILURE_DETAIL.gmv, tone: "danger" },
 ]}
 />
 <Text size="small" tone="secondary">{ONBOARDING_FAILURE_DETAIL.definition}</Text>
 <Card>
 <CardHeader><Text weight="semibold">Experimento ligado: {ONBOARDING_FAILURE_DETAIL.experiment.name}</Text></CardHeader>
 <CardBody>
 <Stack gap={6}>
 <Text size="small">{ONBOARDING_FAILURE_DETAIL.experiment.hypothesis}</Text>
 <Text size="small" tone="secondary">
 {ONBOARDING_FAILURE_DETAIL.experiment.market} · {ONBOARDING_FAILURE_DETAIL.experiment.investment}
 </Text>
 <Text size="small">KPI: {ONBOARDING_FAILURE_DETAIL.experiment.primaryKpi}</Text>
 <Text size="small">FMR: {ONBOARDING_FAILURE_DETAIL.experiment.secondaryKpi}</Text>
 </Stack>
 </CardBody>
 </Card>
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.valueExit} defaultOpen>
 <Bullets items={VALUE_EXIT_LA_NOTES} />
 <BarChart
 categories={VALUE_EXIT_WHERE_BUY.map((c) => c.channel.slice(0, 22))}
 series={[{ name: "%", data: VALUE_EXIT_WHERE_BUY.map((c) => c.pct), tone: "primary" }]}
 height={280}
 />
 <Table
 headers={["Canal atual", "%"]}
 rows={VALUE_EXIT_WHERE_BUY.map((c) => [c.channel, `${c.pct}%`])}
 />
 <BarChart
 categories={VALUE_EXIT_CHURN_REASONS.map((r) => r.reason)}
 series={[{ name: "% motivos (value exit)", data: VALUE_EXIT_CHURN_REASONS.map((r) => r.pct), tone: "info" }]}
 height={260}
 />
 <TabStatGrid columns={3} stats={VALUE_EXIT_STATS.map((s) => ({ label: s.label, value: s.value }))} />
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.openThemes}>
 <Grid columns={2} gap={10}>
 {churnOpenThemes.map((q) => (
 <Card key={q.theme}>
 <CardHeader><Pill size="sm">{q.theme}</Pill></CardHeader>
 <CardBody><Text size="small" tone="secondary">&ldquo;{q.quote}&rdquo;</Text></CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.eventDriven} defaultOpen>
 <Text size="small" weight="semibold">{EVENT_DRIVEN_HEADLINE}</Text>
 <Table
 headers={["Hipótese", "Causalidade", "Impacto", "Users", "GMV", "Status", "Domínio"]}
 rows={EVENT_DRIVEN_HYPOTHESES.map((h) => [
 h.signal,
 h.causality,
 h.impact,
 h.users,
 h.gmv,
 h.status,
 h.domain,
 ])}
 />
 <Text size="small" tone="secondary">Indicadores fortes (voz do consumidor):</Text>
 <Table
 headers={["Sinal", "Causalidade", "Users", "GMV anual"]}
 rows={EVENT_DRIVEN_INDICATORS.map((h) => [h.signal, h.causality, h.users, h.gmv])}
 />
 <Text size="small" tone="tertiary">{EVENT_DRIVEN_NOTE}</Text>
 <Bullets items={EVENT_INTERVENTIONS} />
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.interviews}>
 <Grid columns={2} gap={10}>
 {churnInterviews.map((q) => (
 <Card key={`${q.pattern}-${q.theme}`}>
 <CardHeader>
 <Row gap={6} wrap>
 <Pill size="sm" tone="neutral">{q.pattern}</Pill>
 <Pill size="sm">{q.theme}</Pill>
 </Row>
 </CardHeader>
 <CardBody><Text size="small" tone="secondary">&ldquo;{q.quote}&rdquo;</Text></CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.takeaways} defaultOpen>
 <Stack gap={12}>
 {CHURN_OPPORTUNITIES_BY_PATTERN.map((o) => (
 <Card key={o.pattern}>
 <CardHeader>
 <Row gap={8} wrap align="center">
 <Text weight="semibold">{o.pattern}</Text>
 <Pill size="sm">GMV lost {o.gmv}</Pill>
 {o.size !== "—" ? <Pill size="sm" tone="success">Opp. {o.size}</Pill> : null}
 </Row>
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <ReaderText size="small">{o.summary}</ReaderText>
 <Bullets items={o.actions} />
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Stack>
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.proactive}>
 <Bullets
 items={[
 PROACTIVE_RECOVERY_DETAIL.insight,
 `Mercado: ${PROACTIVE_RECOVERY_DETAIL.market} · ${PROACTIVE_RECOVERY_DETAIL.investment} · ${PROACTIVE_RECOVERY_DETAIL.duration}`,
 `KPI: ${PROACTIVE_RECOVERY_DETAIL.primaryKpi}`,
 `Secundário: ${PROACTIVE_RECOVERY_DETAIL.secondaryKpi}`,
 `Fluxo: ${PROACTIVE_RECOVERY_DETAIL.flow}`,
 ]}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.churn.loopSurvey}>
 <Table
 headers={["Pergunta", "Resultado", "Leitura"]}
 rows={CHURN_SURVEY_SIGNALS.map((r) => [r.question, r.result, r.reading])}
 />
 <Callout tone="info" title={L.churn.returnVsReorder}>
 <Text size="small">{CHURN_RETURN_INSIGHT}</Text>
 </Callout>
 </CollapsibleSection>
 <TabSource>{CHURN_LA_SOURCE} + Microsoft Loop23443.pdf (complemento qualitativo).</TabSource>
 </Stack>
 );
}

export function LoversPlusSection() {
 const { locale, L, execTitle } = usePesquisasL10n();
 const narrative = getLoversPlusExecNarrative(locale);
 const t = LOVERS_TRANSACTIONAL;
 return (
 <Stack gap={24}>
 <Callout tone="info" title={L.lovers.source}>
 <Text size="small">{getLoversPlusSource(locale)}</Text>
 </Callout>
 <TabExecutiveSummary
 title={execTitle}
 headline={narrative.headline}
 paragraphs={[
 narrative.invisible,
 narrative.slaInsight,
 L.lovers.frictionExit,
 ]}
 />
 <CollapsibleSection title={L.lovers.execHabit} defaultOpen>
 <Grid columns={2} gap={12}>
 <Card>
 <CardHeader><Text weight="semibold">{L.lovers.habitSustains}</Text></CardHeader>
 <CardBody><Bullets items={narrative.habitDrivers} /></CardBody>
 </Card>
 <Card>
 <CardHeader><Text weight="semibold">{L.lovers.habitBreaks}</Text></CardHeader>
 <CardBody><Bullets items={narrative.habitBreakers} /></CardBody>
 </Card>
 </Grid>
 <Bullets items={narrative.doubleDown} />
 <Text size="small" tone="secondary">{L.lovers.reviewPrefix}: {narrative.review.join("; ")}</Text>
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.methodology}>
 <TabStatGrid
 columns={4}
 stats={[
 { label: "Base MX", value: LOVERS_PLUS_METHODOLOGY.base },
 { label: "Respostas", value: String(LOVERS_PLUS_METHODOLOGY.responses) },
 { label: "Margem erro", value: LOVERS_PLUS_METHODOLOGY.margin },
 { label: "Incentivo", value: "$50 MXN Club" },
 ]}
 />
 <Bullets
 items={[
 `Envio: ${LOVERS_PLUS_METHODOLOGY.surveyDates} (${LOVERS_PLUS_METHODOLOGY.channels})`,
 LOVERS_PLUS_METHODOLOGY.transactional,
 LOVERS_PLUS_METHODOLOGY.profile,
 ]}
 />
 <Table
 headers={["Região", "Base", "Amostra", "Margem", "Leitura"]}
 rows={LOVERS_PLUS_REGIONS.map((r) => [r.region, String(r.base), String(r.sample), r.margin, r.reading])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block01} defaultOpen>
 <BarChart
 categories={LOVERS_DISCOVERY_CHANNELS.map((c) => c.channel.slice(0, 18))}
 series={[{ name: "%", data: LOVERS_DISCOVERY_CHANNELS.map((c) => c.pct), tone: "primary" }]}
 height={280}
 />
 <Table headers={["Como descobriu", "%"]} rows={LOVERS_DISCOVERY_CHANNELS.map((c) => [c.channel, `${c.pct}%`])} />
 <BarChart
 categories={LOVERS_CHOICE_REASONS.map((c) => c.reason.slice(0, 22))}
 series={[{ name: "%", data: LOVERS_CHOICE_REASONS.map((c) => c.pct), tone: "info" }]}
 height={300}
 />
 <Text size="small" tone="secondary">
 Preço abre a porta (34%); conveniência + velocidade mantêm (36% combinados). 42% descoberta via canais pagos vs
 51% recomendação.
 </Text>
 <Text size="small" tone="secondary">
 Acordo: maioria acha que conveniência e velocidade também explicam interesse em TaDa (além de preço).
 </Text>
 <Grid columns={2} gap={12}>
 <Card>
 <CardHeader><Text weight="semibold">Oportunidades</Text></CardHeader>
 <CardBody>
 <Bullets
 items={[
...LOVERS_BLOCK01_OPPORTUNITIES.benefits,
...LOVERS_BLOCK01_OPPORTUNITIES.ux,
...LOVERS_BLOCK01_OPPORTUNITIES.onboarding,
 ]}
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader><Text weight="semibold">Hipóteses</Text></CardHeader>
 <CardBody><Bullets items={LOVERS_BLOCK01_HYPOTHESES} /></CardBody>
 </Card>
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block02} defaultOpen>
 <BarChart
 categories={LOVERS_OCCASIONS_FULL.map((o) => o.occasion.slice(0, 20))}
 series={[{ name: "%", data: LOVERS_OCCASIONS_FULL.map((o) => o.pct), tone: "success" }]}
 height={300}
 />
 <Table headers={["Ocasião", "%"]} rows={LOVERS_OCCASIONS_FULL.map((o) => [o.occasion, `${o.pct}%`])} />
 <CollapsibleSection title={L.lovers.driveMoreOrders}>
 <Table headers={["Benefício", "%"]} rows={LOVERS_ORDER_MORE.map((o) => [o.lever, `${o.pct}%`])} />
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.beerFreq}>
 <Table headers={["Frequência", "%"]} rows={LOVERS_BEER_FREQUENCY.map((b) => [b.freq, `${b.pct}%`])} />
 </CollapsibleSection>
 <BarChart
 categories={LOVERS_CATEGORIES_MISSING.map((c) => c.category)}
 series={[{ name: "% quer categoria", data: LOVERS_CATEGORIES_MISSING.map((c) => c.pct), tone: "warning" }]}
 height={280}
 />
 <Table
 headers={["Mix transacional", "Lovers Plus", "Core"]}
 rows={[
 ["Cerveja", `${LOVERS_MIX.lovers.beers}%`, `${LOVERS_MIX.core.beers}%`],
 ["Food", `${LOVERS_MIX.lovers.food}%`, `${LOVERS_MIX.core.food}%`],
 ["Soft drinks", `${LOVERS_MIX.lovers.softDrinks}%`, `${LOVERS_MIX.core.softDrinks}%`],
 ]}
 />
 <Text size="small" tone="secondary">{LOVERS_COMBOS.note}</Text>
 <Table
 headers={["Para quem", "%"]}
 rows={LOVERS_CONSUMPTION.forWhom.map((x) => [x.item, `${x.pct}%`])}
 />
 <Table
 headers={["Tempo até consumir", "%"]}
 rows={LOVERS_CONSUMPTION.consumeWhen.map((x) => [x.item, `${x.pct}%`])}
 />
 <Table
 headers={["Lealdade marca/tamanho", "%"]}
 rows={LOVERS_CONSUMPTION.brandLoyalty.map((x) => [x.item, `${x.pct}%`])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block03} defaultOpen>
 <Text size="small" weight="semibold">74% bought outside the app in 30 days — TaDa loses moments, not preference.</Text>
 <BarChart
 categories={LOVERS_OFF_APP_CHANNELS.map((c) => c.channel.slice(0, 22))}
 series={[{ name: "%", data: LOVERS_OFF_APP_CHANNELS.map((c) => c.pct), tone: "primary" }]}
 height={300}
 />
 <Table headers={["Canal", "%"]} rows={LOVERS_OFF_APP_CHANNELS.map((c) => [c.channel, `${c.pct}%`])} />
 <Table
 headers={["Frequência compra fora", "%"]}
 rows={LOVERS_OFF_APP_FREQUENCY.map((f) => [f.freq, `${f.pct}%`])}
 />
 <Table
 headers={["Interesse assinatura paga", "%"]}
 rows={LOVERS_SUBSCRIPTION_INTEREST.map((s) => [s.benefit, `${s.pct}%`])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block04} defaultOpen>
 <Table
 headers={["Por que compra fora", "%"]}
 rows={LOVERS_BUY_OUTSIDE_REASONS.map((r) => [r.reason, `${r.pct}%`])}
 />
 <TabStatGrid
 stats={[
 {
 label: "Comprariam mais se razões resolvidas",
 value: `${LOVERS_WOULD_BUY_MORE_IF_SOLVED}%`,
 tone: "success",
 },
 { label: "Downgrade LP→Core/mês", value: "10%", tone: "warning" },
 { label: "Horário fora pesa vs problema pedido", value: "18% vs 5,4%", tone: "info" },
 ]}
 />
 <BarChart
 categories={LOVERS_MIGRATE_SOLUTIONS.map((s) => s.solution.slice(0, 24))}
 series={[{ name: "%", data: LOVERS_MIGRATE_SOLUTIONS.map((s) => s.pct), tone: "info" }]}
 height={320}
 />
 <Table
 headers={["Métrica transacional", "Lovers Plus", "Core"]}
 rows={[
 ["Perfect Orders", `${t.perfectOrders.lovers}%`, `${t.perfectOrders.core}%`],
 ["SLA 36 min", `${t.sla36.lovers}%`, `${t.sla36.core}%`],
 ["SLA 15 min", `${t.sla15.lovers}%`, `${t.sla15.core}%`],
 ["% pedidos com promo", `${t.promoOrderShare.lovers}%`, `${t.promoOrderShare.core}%`],
 ["Rating médio pedido", String(t.orderRating.lovers), String(t.orderRating.core)],
 ["Compras c/ desconto (média)", String(t.purchasesWithDiscount.lovers), String(t.purchasesWithDiscount.core)],
 ["Compras c/ cupom (média)", String(t.purchasesWithCoupon.lovers), String(t.purchasesWithCoupon.core)],
 ]}
 />
 <BarChart
 categories={["Perfect Orders", "SLA 36", "SLA 15"]}
 series={[
 { name: "Lovers Plus", data: [t.perfectOrders.lovers, t.sla36.lovers, t.sla15.lovers], tone: "success" },
 { name: "Core", data: [t.perfectOrders.core, t.sla36.core, t.sla15.core], tone: "neutral" },
 ]}
 height={280}
 />
 <Callout tone="warning" title={L.lovers.slaThreshold}>
 <Text size="small">
 Efeito limiar: abaixo de 15 min com consistência, usuário passa de “pedir quando precisa” a confiar por
 default (+13 p.p. vs Core no SLA15).
 </Text>
 </Callout>
 <Grid columns={2} gap={12}>
 <Card>
 <CardHeader><Text weight="semibold">Oportunidades</Text></CardHeader>
 <CardBody>
 <Bullets
 items={[
...LOVERS_BLOCK04_OPPORTUNITIES.benefits,
...LOVERS_BLOCK04_OPPORTUNITIES.seller,
...LOVERS_BLOCK04_OPPORTUNITIES.ux,
...LOVERS_BLOCK04_OPPORTUNITIES.service,
 ]}
 />
 </CardBody>
 </Card>
 <Card>
 <CardHeader><Text weight="semibold">Hipóteses</Text></CardHeader>
 <CardBody><Bullets items={LOVERS_BLOCK04_HYPOTHESES} /></CardBody>
 </Card>
 </Grid>
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block05}>
 <Table
 headers={["Ao recomendar, mencionam", "%"]}
 rows={LOVERS_RECOMMEND_MENTION.map((r) => [r.item, `${r.pct}%`])}
 />
 <CollapsibleSection title={L.lovers.ifDisappeared}>
 <Bullets items={LOVERS_IF_DISAPPEARED_QUOTES} />
 <Text size="small" tone="secondary">
 TaDa is not missed for what it is, but for what it removes: effort, time, carrying and planning.
 </Text>
 </CollapsibleSection>
 </CollapsibleSection>
 <CollapsibleSection title={L.lovers.block06} defaultOpen>
 <Grid columns={2} gap={12}>
 <Card>
 <CardHeader><Text weight="semibold">Produto</Text></CardHeader>
 <CardBody>
 <Text size="small" weight="semibold">Acquisition</Text>
 <Bullets items={LOVERS_TAKEAWAYS_PRODUCT.acquisition} />
 <Text size="small" weight="semibold">Retention</Text>
 <Bullets items={LOVERS_TAKEAWAYS_PRODUCT.retention} />
 <Text size="small" weight="semibold">Frequency</Text>
 <Bullets items={LOVERS_TAKEAWAYS_PRODUCT.frequency} />
 </CardBody>
 </Card>
 <Card>
 <CardHeader><Text weight="semibold">Service</Text></CardHeader>
 <CardBody>
 <Text size="small" weight="semibold">Aquisição</Text>
 <Bullets items={LOVERS_TAKEAWAYS_SERVICE.acquisition} />
 <Text size="small" weight="semibold">Retenção</Text>
 <Bullets items={LOVERS_TAKEAWAYS_SERVICE.retention} />
 <Text size="small" weight="semibold">Frequência</Text>
 <Bullets items={LOVERS_TAKEAWAYS_SERVICE.frequency} />
 </CardBody>
 </Card>
 </Grid>
 <Callout tone="success" title={L.lovers.closing}>
 <Text size="small">{LOVERS_CLOSING}</Text>
 </Callout>
 </CollapsibleSection>
 <TabSource>{LOVERS_PLUS_SOURCE}</TabSource>
 </Stack>
 );
}

export function OperacaoSection() {
 const { L } = usePesquisasL10n();
 return (
 <Stack gap={24}>
 <TabStatGrid
 stats={[
 { label: "Pedidos válidos YTD", value: "6,27M" },
 { label: "Clientes ativos", value: "960k" },
 { label: "Novos clientes", value: "464k" },
 { label: "Pico mensal (mai)", value: "782k", tone: "success" },
 ]}
 />
 <Text size="small" tone="tertiary">
 2026 anualizado = jan–set × 12/9; 2025 ano completo. Comparar ritmo, não YoY de período equivalente sem ajuste.
 </Text>
 <CollapsibleSection title={L.operacao.marketReading} defaultOpen>
 <Table
 headers={["Mercado", "Leitura", "Evidência", "Implicação"]}
 rows={MARKET_DETAIL.map((m) => [m.market, m.leitura, m.evidencia, m.implicacao])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.operacao.rewardsByMarket}>
 <Table headers={["Mercado", "Destaques"]} rows={REWARDS_DETAIL.map((r) => [r.market, r.detail])} />
 <Text size="small" tone="secondary">{STORES_NOTE}</Text>
 </CollapsibleSection>
 <TabSource>Review Anual 2026 — TaDa.</TabSource>
 </Stack>
 );
}

export function SinteseSection() {
 const { L } = usePesquisasL10n();
 return (
 <Stack gap={24}>
 <CollapsibleSection title={L.sintese.principles} defaultOpen>
 <Table
 headers={["Princípio", "Evidência cruzada", "Implicação"]}
 rows={INTEGRATED_PRINCIPLES.map((p) => [p.principle, p.evidence, p.implication])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.sintese.journey} defaultOpen>
 <Grid columns={2} gap={12}>
 {[
 { step: "1. Abrir a porta", detail: "Preço, awareness, recomendação, hook concreto." },
 { step: "2. Primeira confiança", detail: "SKU disponível, app simples, pagamento, promessa clara." },
 { step: "3. Virar hábito", detail: "Perfect Order, SLA previsível, reorder, benefício por frequência." },
 { step: "4. Recuperar falha", detail: "Alertar, compensar, facilitar próxima compra." },
 ].map((j) => (
 <Card key={j.step}>
 <CardHeader><Text weight="semibold">{j.step}</Text></CardHeader>
 <CardBody><ReaderText size="small" tone="secondary">{j.detail}</ReaderText></CardBody>
 </Card>
 ))}
 </Grid>
 <Callout tone="info">
 <Text size="small">{SINTESE_BRIDGE}</Text>
 </Callout>
 </CollapsibleSection>
 <Callout tone="warning" title={L.sintese.prioritization}>
 <Text size="small">{PRIORITIZATION_PRINCIPLE}</Text>
 </Callout>
 </Stack>
 );
}

export function PrioridadesSection() {
 const { L } = usePesquisasL10n();
 return (
 <Stack gap={24}>
 <CollapsibleSection title={L.sintese.roadmap} defaultOpen>
 <Table
 headers={["", "Ação", "Problema", "Métrica", "Horizonte"]}
 rows={PRIORITY_ROADMAP_FULL.map((p) => [
 <Pill key={p.action} tone={p.priority === "P0" ? "danger" : p.priority === "P1" ? "warning" : "neutral"} size="sm">
 {p.priority}
 </Pill>,
 p.action,
 p.problem,
 p.metric,
 p.horizon,
 ])}
 />
 </CollapsibleSection>
 <CollapsibleSection title={L.sintese.kpiPanel} defaultOpen>
 <Table
 headers={["Domínio", "KPI", "Corte", "Por que importa"]}
 rows={KPI_PANEL.map((k) => [k.domain, k.kpi, k.cut, k.why])}
 />
 </CollapsibleSection>
 <Callout tone="info" title={L.sintese.executionSeq}>
 <Bullets
 items={[
 "Remover falhas que geram 1★ ou churn imediato.",
 "Estabilizar jornada em mercados/janelas com concentração de problemas.",
 "Replicar comportamento Lovers Plus: reorder, disponibilidade, benefícios de recorrência.",
 "Ampliar sortimento, combos, Turbo, pickup com experimento e unidade econômica.",
 ]}
 />
 </Callout>
 </Stack>
 );
}

export function SellersCouriersSection() {
 const { locale, L, execTitle } = usePesquisasL10n();
 const sellersExec = getSellersCouriersExecutive(locale);
 return (
 <Stack gap={24}>
 <Row gap={8} wrap>
 <Button
 variant="primary"
 onClick={() => window.open(SELLERS_COURIERS_META.reportPdf, "_blank", "noopener,noreferrer")}
 >
 {L.sellers.clusteringPdf}
 </Button>
 <Button
 variant="secondary"
 onClick={() => window.open(SELLERS_COURIERS_META.sellerCsv, "_blank", "noopener,noreferrer")}
 >
 {L.sellers.sellersCsv}
 </Button>
 <Button
 variant="secondary"
 onClick={() => window.open(SELLERS_COURIERS_META.courierCsv, "_blank", "noopener,noreferrer")}
 >
 {L.sellers.couriersCsv}
 </Button>
 </Row>

 <TabExecutiveSummary
 title={execTitle}
 headline={sellersExec.headline}
 paragraphs={sellersExec.paragraphs}
 />
 <TabStatGrid stats={sellersExec.stats} />
 <TabStatGrid stats={sellersExec.statsSecondary} />

 <CollapsibleSection title={L.sellers.decisions} defaultOpen>
 <Table
 headers={[L.sellers.themeCol, L.sellers.evidenceCol, L.sellers.actionCol]}
 rows={SELLER_DECISION_PLAYS.map((r) => [r.theme, r.evidence, r.action])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.method} defaultOpen>
 <Table
 headers={[L.sellers.sourceCol, L.sellers.coverageCol, L.sellers.useCol]}
 rows={getSellersCouriersMethod(locale).map((r) => [r.source, r.coverage, r.use])}
 />
 <Bullets items={SELLER_CLUSTER_RULES} />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.sellerSurvey} defaultOpen>
 <TabStatGrid
 columns={3}
 stats={[
 { label: L.sellers.avgSat, value: SELLER_SURVEY_DIST.satisfactionMean, tone: "success" },
 { label: L.sellers.manualMgmt, value: "45%", tone: "warning" },
 { label: L.sellers.tadaShare, value: "45%", tone: "primary" },
 ]}
 />
 <BarChart
 categories={SELLER_SURVEY_DIST.orderManagement.map((r) => r.label)}
 series={[{ name: L.sellers.pctSellers, data: SELLER_SURVEY_DIST.orderManagement.map((r) => r.pct), tone: "primary" }]}
 height={240}
 />
 <BarChart
 categories={SELLER_SURVEY_DIST.tadaShare.map((r) => r.label)}
 series={[{ name: L.sellers.pctSellers, data: SELLER_SURVEY_DIST.tadaShare.map((r) => r.pct), tone: "info" }]}
 height={260}
 />
 <BarChart
 categories={SELLER_KPI_RECOGNITION.map((r) => r.metric)}
 series={[{ name: L.sellers.pctRecognizing, data: SELLER_KPI_RECOGNITION.map((r) => r.pct), tone: "neutral" }]}
 height={280}
 />
 <Callout tone="info" title={L.sellers.recognitionCallout}>
 <Text size="small">{L.sellers.recognitionBody}</Text>
 </Callout>
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.clustering} defaultOpen>
 <Table
 headers={[L.sellers.sizeCol, L.sellers.discoveryCol, L.sellers.structuringCol, L.sellers.matureCol]}
 rows={SELLER_CLUSTER_MATRIX.map((r) => [r.size, r.discovery, r.structuring, r.mature])}
 />
 <Table
 headers={["Cluster", "n", "%", "Orders/week", "Months", "Metrics", "Sat.", "Daily", "Delivery min"]}
 rows={SELLER_CLUSTER_TABLE.map((r) => [
 r.cluster,
 String(r.n),
 r.share,
 String(r.ordersWk),
 String(r.months),
 r.metrics,
 String(r.sat),
 r.daily,
 String(r.deliveryMin),
 ])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.courierSurvey} defaultOpen>
 <TabStatGrid
 columns={3}
 stats={[
 { label: L.sellers.avgSat, value: COURIER_SURVEY_DIST.satisfactionMean, tone: "success" },
 { label: L.sellers.fixedStore, value: "72%", tone: "primary" },
 { label: L.sellers.hours7, value: "85%", tone: "warning" },
 ]}
 />
 <BarChart
 categories={COURIER_FRICTIONS.map((f) => f.friction)}
 series={[
 { name: "% survey", data: COURIER_FRICTIONS.map((f) => f.pctSurvey), tone: "danger" },
 { name: L.sellers.pctReport, data: COURIER_FRICTIONS.map((f) => f.pctAtlas), tone: "neutral" },
 ]}
 height={320}
 />
 <Table
 headers={[L.sellers.frictionCol, L.sellers.pctExport, L.sellers.pctReport]}
 rows={COURIER_FRICTIONS.map((f) => [`${f.friction}`, `${f.pctSurvey}%`, `${f.pctAtlas}%`])}
 />
 <Callout tone="warning" title={L.sellers.satFriction}>
 <Text size="small">{L.sellers.satFrictionBody}</Text>
 </Callout>
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.profiles} defaultOpen>
 <Table
 headers={[L.sellers.profileCol, L.sellers.sizeCol, L.sellers.patternCol, L.sellers.mainFrictionCol, L.sellers.playCol]}
 rows={COURIER_PROFILES.map((p) => [p.profile, p.size, p.pattern, p.mainFriction, p.play])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.serviceChain}>
 <Table
 headers={[L.sellers.momentCol, L.sellers.signalCol, L.sellers.responseCol]}
 rows={SERVICE_CHAIN_MOMENTS.map((m) => [m.moment, m.signal, m.response])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.plan90}>
 <Table
 headers={[L.sellers.whenCol, L.sellers.actionCol, L.sellers.audienceCol, L.sellers.metricsCol]}
 rows={PLAN_90_DAYS.map((p) => [p.when, p.action, p.audience, p.kpis])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.voiceSellers}>
 <Table headers={[L.sellers.themeCol, L.sellers.quoteCol]} rows={getSellerOpenQuotes(locale).map((q) => [q.theme, q.quote])} />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.voiceCouriers}>
 <Table headers={[L.sellers.themeCol, L.sellers.quoteCol]} rows={getCourierOpenQuotes(locale).map((q) => [q.theme, q.quote])} />
 </CollapsibleSection>

 <CollapsibleSection title={L.sellers.notes}>
 <Bullets items={SELLERS_COURIERS_NOTES} />
 </CollapsibleSection>

 <TabSource>
 {L.sellers.sourcePrefix}{" "}
 {SELLERS_COURIERS_META.period}.
 </TabSource>
 </Stack>
 );
}

export function ArquivosSection() {
 const { L } = usePesquisasL10n();
 return (
 <Stack gap={24}>
 <Card>
 <CardBody>
 <Stack gap={12}>
 <Text weight="semibold">{L.arquivos.consolidatedTitle}</Text>
 <Text size="small" tone="secondary">{L.arquivos.consolidatedBody}</Text>
 <Button
 variant="primary"
 onClick={() => window.open(PESQUISAS_META.reportPdf, "_blank", "noopener,noreferrer")}
 >
 {L.arquivos.openReport}
 </Button>
 </Stack>
 </CardBody>
 </Card>
 <Table
 headers={[L.arquivos.fileCol, L.metodo.sampleCol, L.metodo.periodCol, L.arquivos.downloadCol]}
 rows={PESQUISAS_SOURCES.map((s) => [
 s.file,
 s.sample,
 s.period,
 <Button key={s.path} variant="secondary" onClick={() => window.open(s.path, "_blank", "noopener,noreferrer")}>
 {L.arquivos.openBtn}
 </Button>,
 ])}
 />
 </Stack>
 );
}

export function PesquisasSectionBody({
 section,
 locale: _locale,
}: {
 section: PesquisaSectionId;
 locale: Locale;
}) {
 switch (section) {
 case "sumario":
 return <SumarioSection />;
 case "metodo":
 return <MetodoSection />;
 case "voz-consumidor":
 return <VozConsumidorSection />;
 case "churn":
 return <ChurnSection />;
 case "lovers-plus":
 return <LoversPlusSection />;
 case "operacao":
 return <OperacaoSection />;
 case "sellers-couriers":
 return <SellersCouriersSection />;
 case "sintese":
 return <SinteseSection />;
 case "prioridades":
 return <PrioridadesSection />;
 case "arquivos":
 return <ArquivosSection />;
 case "competitors":
 return <CompetitorsView />;
 default:
 return null;
 }
}
