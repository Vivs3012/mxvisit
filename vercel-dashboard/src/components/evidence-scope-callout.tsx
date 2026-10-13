"use client";

import { Callout, Text } from "@/components/ui";
import { EVIDENCE_SCOPE_NOTE } from "@/lib/dashboard-evidence-scope";
import { lc } from "@/lib/i18n/lc";
import { useLocale } from "@/lib/i18n/locale-context";

type EvidenceScopeCalloutProps = {
  showLegacyNote?: boolean;
};

export function EvidenceScopeCallout({ showLegacyNote = true }: EvidenceScopeCalloutProps) {
  const { locale } = useLocale();
  return (
    <Callout tone="info" title={locale === "pt" ? "Contagens e método" : "Counts and method"}>
      <Text size="small">{lc(locale, EVIDENCE_SCOPE_NOTE)}</Text>
      {showLegacyNote && (
        <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
          {locale === "pt"
            ? "PDFs antigos podem mostrar «12 + 10» — use os números da tela ou a aba Fontes e método."
            : "Older PDFs may show «12 + 10» — use on-screen numbers or Sources & method."}
        </Text>
      )}
    </Callout>
  );
}
