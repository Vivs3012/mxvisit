"use client";

import { Button, CollapsibleSection, Pill, Row, Stack, Text } from "@/components/ui";
import { EvidenceScopeCallout } from "@/components/evidence-scope-callout";
import {
  activityKindLabel,
  getCountryHubContent,
  type CountryHubId,
} from "@/lib/i18n/content/country-hub-content";
import { useLocale } from "@/lib/i18n/locale-context";
import type { StakeholderFocus } from "@/lib/stakeholder-focus";
import type { PeruContextId } from "@/lib/peru-context-nav";

type CountryHubOverviewProps = {
  country: CountryHubId;
  onThemeFocus?: (focus: StakeholderFocus) => void;
  onPeruContext?: (context: PeruContextId) => void;
  onOpenSources?: () => void;
};

export function CountryHubOverview({
  country,
  onThemeFocus,
  onPeruContext,
  onOpenSources,
}: CountryHubOverviewProps) {
  const { locale } = useLocale();
  const hub = getCountryHubContent(locale, country);

  function goTheme(focus: StakeholderFocus) {
    if (country === "peru" && onPeruContext) {
      const map: Record<StakeholderFocus, PeruContextId | null> = {
        "service-level": "service-level",
        consumer: "consumer",
        rewards: "rewards",
        all: "synthesis",
      };
      const ctx = map[focus];
      if (ctx) onPeruContext(ctx);
      return;
    }
    onThemeFocus?.(focus);
  }

  return (
    <Stack gap={12}>
      <CollapsibleSection
        title={locale === "pt" ? "1 · Resumo do país" : "1 · Country summary"}
        defaultOpen
      >
        <Stack gap={8} style={{ paddingTop: 8 }}>
          <Text size="small" weight="semibold">{hub.summaryHeadline}</Text>
          <Text size="small" tone="secondary">{hub.summaryBody}</Text>
          <Text size="small" tone="tertiary">{hub.localVsGlobal}</Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection
        title={locale === "pt" ? "2 · Temas (SL · Consumidor · Rewards)" : "2 · Themes (SL · Consumer · Rewards)"}
        defaultOpen
      >
        <Stack gap={10} style={{ paddingTop: 8 }}>
          <Row gap={8} wrap>
            <Button variant="secondary" onClick={() => goTheme("service-level")}>
              {locale === "pt" ? "Nível de serviço" : "Service level"}
            </Button>
            <Button variant="secondary" onClick={() => goTheme("consumer")}>
              {locale === "pt" ? "Consumidor" : "Consumer"}
            </Button>
            <Button variant="secondary" onClick={() => goTheme("rewards")}>
              Rewards
            </Button>
            {onThemeFocus && (
              <Button variant="secondary" onClick={() => onThemeFocus("all")}>
                {locale === "pt" ? "Ver cross-country" : "View cross-country"}
              </Button>
            )}
          </Row>
          <Stack gap={6}>
            <Text size="small"><strong>SL:</strong> {hub.themes.serviceLevel}</Text>
            <Text size="small"><strong>{locale === "pt" ? "Consumidor" : "Consumer"}:</strong> {hub.themes.consumer}</Text>
            <Text size="small"><strong>Rewards:</strong> {hub.themes.rewards}</Text>
          </Stack>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection
        title={locale === "pt" ? "3 · Atividades (cronológico)" : "3 · Activities (chronological)"}
        count={hub.activities.length}
      >
        <Stack gap={6} style={{ paddingTop: 8 }}>
          {hub.activities.map((a) => (
            <Row key={`${a.dateLabel}-${a.label}`} gap={8} wrap align="center">
              <Pill size="sm" tone="neutral">{a.dateLabel}</Pill>
              <Pill size="sm" tone="info">{activityKindLabel(locale, a.kind)}</Pill>
              <Text size="small">{a.label}</Text>
            </Row>
          ))}
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection
        title={locale === "pt" ? "4 · Aprendizados e convergências" : "4 · Learnings and convergences"}
        count={hub.learnings.length}
      >
        <ul style={{ margin: 0, paddingLeft: 18, paddingTop: 8 }}>
          {hub.learnings.map((item) => (
            <li key={item.slice(0, 40)} style={{ marginBottom: 6 }}>
              <Text size="small">{item}</Text>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        title={locale === "pt" ? "5 · Evidências e rastreio" : "5 · Evidence and traceability"}
        defaultOpen={false}
      >
        <Stack gap={10} style={{ paddingTop: 8 }}>
          <EvidenceScopeCallout />
          {onOpenSources && (
            <Button variant="secondary" onClick={onOpenSources}>
              {locale === "pt" ? "Abrir fontes e método" : "Open sources and method"}
            </Button>
          )}
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}
