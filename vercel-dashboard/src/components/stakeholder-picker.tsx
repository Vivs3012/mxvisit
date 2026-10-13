"use client";

import { Button, Card, CardBody, CardHeader, Grid, Pill, Stack, Text } from "@/components/ui";
import type { StakeholderFocus } from "@/lib/stakeholder-focus";
import { useLocale } from "@/lib/i18n/locale-context";
import { getStakeholderOptions, STAKEHOLDER_PICKER_UI } from "@/lib/i18n/stakeholder";
import { UI } from "@/lib/i18n/ui";

export default function StakeholderPicker({
 onSelect,
 canDismiss = false,
 onDismiss,
}: {
 onSelect: (focus: StakeholderFocus) => void;
 canDismiss?: boolean;
 onDismiss?: () => void;
}) {
 const { locale, t } = useLocale();
 const options = getStakeholderOptions(locale);

 return (
 <div
 role="dialog"
 aria-modal="true"
 aria-labelledby="stakeholder-picker-title"
 style={{
 position: "fixed",
 inset: 0,
 zIndex: 50,
 display: "grid",
 placeItems: "center",
 padding: 24,
 background: "rgba(15, 23, 42, 0.48)",
 }}
 >
 <Card style={{ width: "min(880px, 100%)", maxHeight: "90vh", overflowY: "auto" }}>
 <CardHeader trailing={<Pill size="sm" tone="primary">OneYP 2027</Pill>}>
 <span id="stakeholder-picker-title">{t(UI.stakeholderTitle)}</span>
 </CardHeader>
 <CardBody>
 <Stack gap={16}>
 <Text tone="secondary">{t(UI.stakeholderIntro)}</Text>
 <Grid columns={2} gap={12}>
 {options.map((option) => (
 <button
 key={option.id}
 type="button"
 onClick={() => onSelect(option.id)}
 style={{
 textAlign: "left",
 cursor: "pointer",
 padding: 16,
 borderRadius: 12,
 border: "1px solid var(--border)",
 background: "var(--bg-elevated)",
 }}
 >
 <Stack gap={8}>
 <Stack gap={4}>
 <Text weight="bold" size="large">{option.label}</Text>
 <Text size="small" tone="secondary">{option.description}</Text>
 </Stack>
 <Text size="small">
 <strong>{t(STAKEHOLDER_PICKER_UI.decisionLens)}</strong> {option.decision}
 </Text>
 <Text size="small" tone="secondary">
 {t(STAKEHOLDER_PICKER_UI.openPrefix)} {option.label} {t(STAKEHOLDER_PICKER_UI.openSuffix)}
 </Text>
 </Stack>
 </button>
 ))}
 </Grid>
 {canDismiss && onDismiss && (
 <Button variant="secondary" onClick={onDismiss}>
 {t(STAKEHOLDER_PICKER_UI.keepCurrent)}
 </Button>
 )}
 </Stack>
 </CardBody>
 </Card>
 </div>
 );
}
