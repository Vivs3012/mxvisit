"use client";

import { Button, Callout, Card, CardBody, H2, Pill, Row, Stack, Text } from "@/components/ui";
import { EvidenceScopeCallout } from "@/components/evidence-scope-callout";
import { TabPageHeader, TabStatGrid } from "@/components/view-shell";
import { useLocale } from "./i18n/locale-context";
import { getExecutiveHub } from "./executive-hub";
type ExecutiveViewProps = {
  onExploreThemes: () => void;
  onOpenResearch: () => void;
  onOpenSources: () => void;
};

export default function ExecutiveView({
  onExploreThemes,
  onOpenResearch,
  onOpenSources,
}: ExecutiveViewProps) {
  const { locale } = useLocale();
  const hub = getExecutiveHub(locale);

  return (
    <Stack gap={24}>
      <TabPageHeader
        title={locale === "pt" ? "Visão executiva" : "Executive view"}
        subtitle={
          locale === "pt"
            ? "Tese, aprendizados transversais e decisões — sem percorrer todo o dashboard."
            : "Thesis, cross learnings and decisions — without reading the full dashboard."
        }
      />

      <Callout tone="info" title={locale === "pt" ? "Tese do projeto" : "Project thesis"}>
        <Text size="small" weight="semibold">{hub.thesis}</Text>
      </Callout>

      <TabStatGrid stats={hub.stats} />

      <EvidenceScopeCallout />

      <Stack gap={12}>
        <H2 style={{ margin: 0, fontSize: 18 }}>
          {locale === "pt" ? "Três aprendizados transversais" : "Three cross-cutting learnings"}
        </H2>
        {hub.crossLearnings.map((item) => (
          <Card key={item.rank}>
            <CardBody>
              <Stack gap={8}>
                <Row gap={8} wrap align="center">
                  <Pill size="sm" tone="primary">#{item.rank}</Pill>
                  <Text weight="semibold" size="small">{item.title}</Text>
                </Row>
                <Text size="small" tone="secondary">{item.observation}</Text>
                <Text size="small">
                  <strong>{locale === "pt" ? "Implicação:" : "Implication:"}</strong> {item.whyItMatters}
                </Text>
                <Text size="small" tone="tertiary">
                  {item.coverage} · {item.countries.join(", ")}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>

      <Stack gap={8}>
        <H2 style={{ margin: 0, fontSize: 18 }}>
          {locale === "pt" ? "Impacto" : "Impact"}
        </H2>
        <Callout tone="neutral" title={locale === "pt" ? "Produto" : "Product"}>
          <Text size="small">{hub.impactProduct}</Text>
        </Callout>
        <Callout tone="neutral" title={locale === "pt" ? "Operação" : "Operations"}>
          <Text size="small">{hub.impactOperations}</Text>
        </Callout>
      </Stack>

      <Stack gap={8}>
        <H2 style={{ margin: 0, fontSize: 18 }}>
          {locale === "pt" ? "Decisões recomendadas (horizonte)" : "Recommended decisions (horizon)"}
        </H2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {hub.decisions.map((d) => (
            <li key={d.decision} style={{ marginBottom: 8 }}>
              <Text size="small">
                <strong>{d.horizon}</strong> — {d.decision}: {d.measure}
              </Text>
            </li>
          ))}
        </ul>
      </Stack>

      <Stack gap={8}>
        <H2 style={{ margin: 0, fontSize: 18 }}>
          {locale === "pt" ? "Perguntas em aberto" : "Open questions"}
        </H2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {hub.openQuestions.map((q) => (
            <li key={q.slice(0, 40)} style={{ marginBottom: 6 }}>
              <Text size="small">{q}</Text>
            </li>
          ))}
        </ul>
      </Stack>

      <Callout tone="warning" title={locale === "pt" ? "Escopo e limitações" : "Scope and limitations"}>
        <Text size="small">{hub.scopeLimitation}</Text>
      </Callout>

      <Row gap={8} wrap>
        <Button variant="primary" onClick={onExploreThemes}>
          {locale === "pt" ? "Explorar por tema e país" : "Explore by theme and country"}
        </Button>
        <Button variant="secondary" onClick={onOpenResearch}>
          {locale === "pt" ? "Pesquisa integrada" : "Integrated research"}
        </Button>
        <Button variant="secondary" onClick={onOpenSources}>
          {locale === "pt" ? "Fontes e método" : "Sources and method"}
        </Button>
      </Row>
    </Stack>
  );
}
