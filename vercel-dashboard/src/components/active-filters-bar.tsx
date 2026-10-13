"use client";

import { Button, Pill, Row, Text } from "@/components/ui";
import type { StakeholderFocus } from "@/lib/stakeholder-focus";
import { getStakeholderOption } from "@/lib/i18n/stakeholder";
import { useLocale } from "@/lib/i18n/locale-context";

type ActiveFiltersBarProps = {
  themeFocus: StakeholderFocus;
  onClearTheme: () => void;
  showThemeFilter: boolean;
};

export function ActiveFiltersBar({
  themeFocus,
  onClearTheme,
  showThemeFilter,
}: ActiveFiltersBarProps) {
  const { locale } = useLocale();
  if (!showThemeFilter || themeFocus === "all") return null;

  const meta = getStakeholderOption(locale, themeFocus);
  return (
    <div role="status" aria-live="polite">
    <Row gap={8} wrap align="center">
      <Text size="small" tone="secondary">
        {locale === "pt" ? "Filtro ativo:" : "Active filter:"}
      </Text>
      <Pill size="sm" tone="primary">{meta.label}</Pill>
      <Button variant="secondary" onClick={onClearTheme}>
        {locale === "pt" ? "Limpar filtro de tema" : "Clear theme filter"}
      </Button>
    </Row>
    </div>
  );
}
