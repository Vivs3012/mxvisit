"use client";

import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Pill,
  Row,
  Stack,
  Text,
} from "@/components/ui";
import { ReaderText } from "@/lib/reader-text-ui";
import type { GlobalInsight } from "@/lib/global-insights";
import type { Locale } from "@/lib/i18n/locale";
import {
  formatGlobalCountry,
  formatGlobalLayer,
  formatGlobalPriority,
} from "@/lib/i18n/content/global-insights-locale";
import { globalTabUi } from "@/lib/i18n/content/global-tab-ui";
import { insightExtension } from "@/lib/global-insight-context";

type InsightCardProps = {
  insight: GlobalInsight;
  locale: Locale;
  onNavigateToRoadmap?: (roadmapId: string) => void;
  defaultEvidenceOpen?: boolean;
};

function priorityTone(p: GlobalInsight["priority"]): "warning" | "info" | "neutral" {
  if (p === "Critical") return "warning";
  if (p === "High") return "info";
  return "neutral";
}

function layerTone(layer: GlobalInsight["layer"]): "warning" | "info" | "success" | "neutral" | "primary" {
  if (layer === "Reliability" || layer === "Loyalty") return "warning";
  if (layer === "Portfolio" || layer === "Growth") return "success";
  if (layer === "Peak ops" || layer === "Metrics") return "info";
  return "neutral";
}

export function InsightCard({
  insight,
  locale,
  onNavigateToRoadmap,
  defaultEvidenceOpen = false,
}: InsightCardProps) {
  const extension = insightExtension(insight.rank, locale);
  const whyLabel = locale === "pt" ? "Por que importa" : "Why it matters";
  const obsLabel = locale === "pt" ? "O que vimos" : "What we observed";
  const recLabel = globalTabUi(locale, "direction2027");

  return (
    <Card>
      <CardHeader
        trailing={
          <Row gap={4} wrap>
            <Pill size="sm" tone={priorityTone(insight.priority)}>
              {formatGlobalPriority(locale, insight.priority)}
            </Pill>
            <Pill size="sm" tone={layerTone(insight.layer)}>
              {formatGlobalLayer(locale, insight.layer)}
            </Pill>
          </Row>
        }
      >
        #{insight.rank} — {insight.title}
      </CardHeader>
      <CardBody>
        <Stack gap={10}>
          <Row gap={8} wrap align="center" aria-label={locale === "pt" ? "Cobertura" : "Coverage"}>
            <Pill size="sm" tone="primary">{insight.coverage}</Pill>
            {insight.countries.map((c) => (
              <Pill key={c} size="sm" tone="neutral">
                {formatGlobalCountry(locale, c)}
              </Pill>
            ))}
          </Row>

          <Stack gap={4}>
            <Text size="small" weight="semibold">{obsLabel}</Text>
            <ReaderText size="small">{insight.summary}</ReaderText>
          </Stack>

          {extension && (
            <Stack gap={4}>
              <Text size="small" weight="semibold">{whyLabel}</Text>
              <ReaderText size="small" tone="secondary">{extension}</ReaderText>
            </Stack>
          )}

          {insight.evidence.length > 0 && (
            <CollapsibleSection
              title={globalTabUi(locale, "insightFieldEvidence")}
              count={insight.evidence.length}
              defaultOpen={defaultEvidenceOpen}
            >
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {insight.evidence.map((line) => (
                  <li key={line} style={{ marginBottom: 6 }}>
                    <ReaderText size="small" tone="secondary">{line}</ReaderText>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          <Callout tone="info" title={recLabel}>
            <ReaderText size="small">{insight.suggestion}</ReaderText>
            {insight.owners && (
              <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
                {globalTabUi(locale, "owners")} {insight.owners}
              </Text>
            )}
            {insight.roadmapIds.length > 0 && (
              <Text size="small" tone="tertiary" style={{ marginTop: 4 }}>
                {locale === "pt" ? "Roadmap:" : "Roadmap:"} {insight.roadmapIds.join(", ")}
              </Text>
            )}
          </Callout>

          {insight.roadmapIds.length > 0 && onNavigateToRoadmap && (
            <Button variant="secondary" onClick={() => onNavigateToRoadmap(insight.roadmapIds[0])}>
              {globalTabUi(locale, "openRoadmap")}
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
