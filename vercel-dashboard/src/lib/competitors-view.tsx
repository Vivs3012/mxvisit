"use client";

import {
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
 COMPETITORS_SOURCES,
 CONSUMER_BENCHMARK,
 KPI_MATRIX,
 OPS_BENCHMARK,
 PRODUCT_ARCHITECTURE,
 REGULATION,
 type CompetitorPlatform,
 type PlanConfidence,
} from "./competitors-data";
import { useLocale } from "./i18n/locale-context";
import { UI } from "./i18n/ui";
import {
 getBenchmarkFooter,
 getCompetitiveMapRows,
 getCompetitorsExecutive,
 getCompetitorsLabels,
 getCompetitorsMeta,
 getCompetitorsSectionLabels,
 getCountryAnalysis,
 getDecisionInsights,
 getInnovations2026,
 getInnovationsReading,
 getPlan2027,
 getSourcesFooter,
 getTadaRecommendations,
 getWatchlist2027,
 localizeConfidence,
} from "./i18n/content/competitors-locale";

function platformTone(p: CompetitorPlatform): "warning" | "info" | "success" {
 if (p === "Rappi") return "warning";
 if (p === "PedidosYa") return "info";
 return "success";
}

function confidenceTone(c: PlanConfidence): "warning" | "info" | "neutral" {
 if (c === "Confirmed") return "warning";
 if (c === "Announced direction") return "info";
 return "neutral";
}

function statusTone(status: string): "success" | "info" | "neutral" {
 if (status.includes("2026") || status.includes("Active") || status.includes("Available")) return "success";
 if (status.includes("Announced") || status.includes("targets")) return "info";
 return "neutral";
}

export default function CompetitorsView() {
 const { locale, t } = useLocale();
 const meta = getCompetitorsMeta(locale);
 const exec = getCompetitorsExecutive(locale);
 const mapLabels = getCompetitorsLabels(locale);
 const S = getCompetitorsSectionLabels(locale);
 const mapRows = getCompetitiveMapRows(locale);
 const decisionInsights = getDecisionInsights(locale);
 const countryAnalysis = getCountryAnalysis(locale);
 const innovations = getInnovations2026(locale);
 const plan2027 = getPlan2027(locale);
 const tadaRecs = getTadaRecommendations(locale);
 const watchlist = getWatchlist2027(locale);

 return (
 <Stack gap={24}>
 <TabPageHeader
 title={meta.title}
 date={meta.cutDate}
 badge={meta.scope}
 subtitle={meta.subtitle}
 />

 <TabExecutiveSummary
 title={t(UI.executiveSummary)}
 headline={exec.headline}
 paragraphs={exec.paragraphs}
 />

 <TabStatGrid stats={exec.stats} />

 <CollapsibleSection title={mapLabels.competitiveMap} defaultOpen>
 <Table
 headers={[mapLabels.platform, mapLabels.mexico, mapLabels.peru, mapLabels.colombia, mapLabels.reading]}
 rows={mapRows.map((row) => [
 <Pill key={row.platform} tone={platformTone(row.platform)} size="sm">
 {row.platform}
 </Pill>,
 row.mexico,
 row.peru,
 row.colombia,
 row.reading,
 ])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={S.decisionInsights} defaultOpen>
 <Grid columns={2} gap={12}>
 {decisionInsights.map((item) => (
 <Card key={item.title}>
 <CardHeader>
 <Row gap={8} align="center" wrap>
 <Text weight="semibold">{item.title}</Text>
 <Pill tone="neutral" size="sm">
 {item.platform}
 </Pill>
 </Row>
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <Text size="small">{item.insight}</Text>
 <Callout tone="info" title={S.tadaImplication}>
 <Text size="small">{item.implication}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={S.productArchitecture}>
 <Stack gap={12}>
 {PRODUCT_ARCHITECTURE.map((arch) => (
 <Card key={arch.platform}>
 <CardHeader>
 <Pill tone={platformTone(arch.platform)} size="sm">{arch.platform}</Pill>
 </CardHeader>
 <CardBody>
 <Table
 headers={[S.audienceCol, S.productsCol]}
 rows={[
 [S.consumerRow, arch.consumer],
 [S.courierRow, arch.courier],
 [S.merchantRow, arch.merchant],
 [S.logisticsRow, arch.logistics],
 ]}
 />
 <Text size="small" tone="secondary" style={{ marginTop: 12 }}>
 {arch.optimizes}
 </Text>
 </CardBody>
 </Card>
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title={S.consumerBenchmark}>
 <Table
 headers={[S.capabilityCol, "Rappi", "PedidosYa (PE)", "Uber Eats (MX)"]}
 rows={CONSUMER_BENCHMARK.map((row) => [
 row.capability,
 row.rappi,
 row.pedidosya,
 row.uber,
 ])}
 />
 </CollapsibleSection>

 <CollapsibleSection title={S.opsBenchmark}>
 <Table
 headers={[S.blockCol, "Rappi", "PedidosYa", "Uber Eats"]}
 rows={OPS_BENCHMARK.map((row) => [row.block, row.rappi, row.pedidosya, row.uber])}
 />
 <Callout tone="info" title={S.opsHighlights}>
 <Stack gap={6}>
 <Text size="small">
 Rappi: AI merchant catalog (image/PDF in ~3 min); ~95% operations on AWS; AI contact center.
 </Text>
 <Text size="small">
 PedidosYa: Envíos with scheduling up to 5 days; merchant credit and courier vehicle financing (announced).
 </Text>
 <Text size="small">
 Uber: Cart Assistant on MX portal; Uber Direct + EnviaTodo; R2 credit active in MX, CO and PE (66k+ credits, US$ 10.9M).
 </Text>
 </Stack>
 </Callout>
 </CollapsibleSection>

 <CollapsibleSection title={S.countryAnalysis} defaultOpen>
 <Stack gap={12}>
 {countryAnalysis.map((country) => (
 <Card key={country.country}>
 <CardHeader>
 <Row gap={8} align="center" wrap>
 <H3 style={{ margin: 0 }}>{country.country}</H3>
 <Pill tone="neutral" size="sm">{country.matchup}</Pill>
 </Row>
 </CardHeader>
 <CardBody>
 <Stack gap={8}>
 <Text size="small"><strong>{S.rappiLabel}</strong> {country.rappi}</Text>
 <Text size="small"><strong>{S.competitorLabel}</strong> {country.competitor}</Text>
 <Callout tone="warning" title={S.tadaImplication}>
 <Text size="small">{country.tadaImplication}</Text>
 </Callout>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title={S.innovations}>
 <Table
 headers={[S.companyCol, S.scopeCol, S.innovationCol, S.impactCol, S.statusCol]}
 rows={innovations.map((row) => [
 row.company,
 row.scope,
 row.innovation,
 row.impact,
 <Pill key={`${row.company}-${row.innovation}`} tone={statusTone(row.status)} size="sm">
 {row.status}
 </Pill>,
 ])}
 />
 <Text size="small" tone="tertiary" style={{ marginTop: 8 }}>
 {getInnovationsReading(locale)}
 </Text>
 </CollapsibleSection>

 <CollapsibleSection title={S.plan2027Title} defaultOpen>
 <Stack gap={16}>
 <Table
 headers={[S.themeCol, S.entityCol, S.evidenceCol, S.confidenceCol, S.implicationCol]}
 rows={plan2027.map((row) => [
 row.theme,
 row.entity,
 row.evidence,
 <Pill key={row.theme} tone={confidenceTone(row.confidence)} size="sm">
 {localizeConfidence(row.confidence, locale)}
 </Pill>,
 row.implication,
 ])}
 />
 <Callout tone="warning" title={S.watchlist}>
 <Stack gap={4}>
 {watchlist.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </Callout>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title={S.regulation}>
 <Grid columns={1} gap={12}>
 {REGULATION.map((reg) => (
 <Card key={reg.country}>
 <CardHeader>{reg.country} — {reg.rule}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 <ReaderText size="small">{reg.detail}</ReaderText>
 <Text size="small" tone="secondary">
 <strong>{S.productLabel}</strong> {reg.productImpact}
 </Text>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 <CollapsibleSection title={S.recommendationsTitle} defaultOpen>
 <Grid columns={2} gap={12}>
 <Card>
 <CardHeader>{S.consumerExp}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {tadaRecs.consumer.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 <Card>
 <CardHeader>{S.operations}</CardHeader>
 <CardBody>
 <Stack gap={6}>
 {tadaRecs.operations.map((item) => (
 <Text key={item} size="small">• {item}</Text>
 ))}
 </Stack>
 </CardBody>
 </Card>
 </Grid>
 <Text size="small" tone="secondary" style={{ marginTop: 12 }}>
 {getBenchmarkFooter(locale)}
 </Text>
 </CollapsibleSection>

 <CollapsibleSection title={S.recommendedKpis}>
 <Table
 headers={[S.stakeholderCol, S.acquisitionCol, S.engagementCol, S.reliabilityCol]}
 rows={KPI_MATRIX.map((row) => [
 row.stakeholder,
 row.acquisition,
 row.engagement,
 row.reliability,
 ])}
 />
 </CollapsibleSection>

 <TabSource>
 {getSourcesFooter(locale, meta.cutDate)}{" "}
 {COMPETITORS_SOURCES.map((s) =>
 s.note ? `[${s.id}] ${s.label} — ${s.note}` : `[${s.id}] ${s.label}`,
 ).join(" · ")}
 </TabSource>
 </Stack>
 );
}
