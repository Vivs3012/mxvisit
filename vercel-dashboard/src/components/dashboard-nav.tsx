"use client";

import { Button, Row, Stack, Text } from "@/components/ui";
import type { DashboardCountry } from "@/lib/dashboard-url";
import { getDashboardNavGroups } from "@/lib/i18n/navigation";
import { useLocale } from "@/lib/i18n/locale-context";
import type { StakeholderFocus } from "@/lib/stakeholder-focus";

type DashboardNavProps = {
  active: DashboardCountry;
  themeFocus: StakeholderFocus;
  onNavigate: (country: DashboardCountry) => void;
  onThemeFocus: (focus: StakeholderFocus) => void;
};

export function DashboardNav({ active, themeFocus, onNavigate, onThemeFocus }: DashboardNavProps) {
  const { locale } = useLocale();
  const groups = getDashboardNavGroups(locale);

  return (
    <nav aria-label={locale === "pt" ? "Navegação principal" : "Main navigation"}>
    <Stack gap={14}>
      {groups.map((group) => (
        <Stack key={group.id} gap={6}>
          <Text size="small" weight="semibold" tone="secondary">{group.label}</Text>
          <Row gap={8} wrap>
            {group.items.map((item) => {
              if (item.kind === "theme") {
                const focus = item.themeFocus!;
                const isActive = active === "themes" && themeFocus === focus;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "primary" : "secondary"}
                    onClick={() => {
                      onThemeFocus(focus);
                      onNavigate("themes");
                    }}
                  >
                    {item.label}
                  </Button>
                );
              }
              return (
                <Button
                  key={item.id}
                  variant={active === item.country ? "primary" : "secondary"}
                  onClick={() => onNavigate(item.country!)}
                >
                  {item.label}
                </Button>
              );
            })}
          </Row>
        </Stack>
      ))}
    </Stack>
    </nav>
  );
}
