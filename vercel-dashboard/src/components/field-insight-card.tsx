"use client";

import type { ReactNode } from "react";
import {
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
import { useLocale } from "@/lib/i18n/locale-context";

type PillSpec = { label: string; tone?: "warning" | "info" | "success" | "neutral" | "primary" | "danger" };

export type FieldInsightCardProps = {
  title: string;
  observation: string;
  whyItMatters?: string;
  recommendation?: string;
  coveragePills?: PillSpec[];
  headerPills?: PillSpec[];
  quotes?: string[];
  extra?: ReactNode;
  defaultQuotesOpen?: boolean;
};

export function FieldInsightCard({
  title,
  observation,
  whyItMatters,
  recommendation,
  coveragePills,
  headerPills,
  quotes,
  extra,
  defaultQuotesOpen = false,
}: FieldInsightCardProps) {
  const { locale } = useLocale();
  const obsLabel = locale === "pt" ? "O que vimos" : "What we observed";
  const whyLabel = locale === "pt" ? "Por que importa" : "Why it matters";
  const recLabel = locale === "pt" ? "Recomendação / decisão" : "Recommendation / decision";
  const quotesLabel = locale === "pt" ? "Citações e notas de campo" : "Quotes and field notes";

  return (
    <Card>
      {(headerPills?.length || title) && (
        <CardHeader
          trailing={
            headerPills?.length ? (
              <Row gap={4} wrap>
                {headerPills.map((p) => (
                  <Pill key={p.label} size="sm" tone={p.tone ?? "neutral"}>{p.label}</Pill>
                ))}
              </Row>
            ) : undefined
          }
        >
          {title}
        </CardHeader>
      )}
      <CardBody>
        <Stack gap={10}>
          {coveragePills && coveragePills.length > 0 && (
            <Row gap={6} wrap aria-label={locale === "pt" ? "Cobertura" : "Coverage"}>
              {coveragePills.map((p) => (
                <Pill key={p.label} size="sm" tone={p.tone ?? "primary"}>{p.label}</Pill>
              ))}
            </Row>
          )}

          <Stack gap={4}>
            <Text size="small" weight="semibold">{obsLabel}</Text>
            <ReaderText size="small">{observation}</ReaderText>
          </Stack>

          {whyItMatters && (
            <Stack gap={4}>
              <Text size="small" weight="semibold">{whyLabel}</Text>
              <ReaderText size="small" tone="secondary">{whyItMatters}</ReaderText>
            </Stack>
          )}

          {quotes && quotes.length > 0 && (
            <CollapsibleSection
              title={quotesLabel}
              count={quotes.length}
              defaultOpen={defaultQuotesOpen}
            >
              <Stack gap={6} style={{ paddingTop: 6 }}>
                {quotes.map((q) => (
                  <Text key={q} size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
                ))}
              </Stack>
            </CollapsibleSection>
          )}

          {recommendation && (
            <Callout tone="info" title={recLabel}>
              <ReaderText size="small">{recommendation}</ReaderText>
            </Callout>
          )}

          {extra}
        </Stack>
      </CardBody>
    </Card>
  );
}
