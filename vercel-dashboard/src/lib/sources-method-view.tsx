"use client";

import { Button, Callout, Stack, Text } from "@/components/ui";
import { TabPageHeader } from "@/components/view-shell";
import PesquisasView, { type PesquisaSectionId } from "./pesquisas-view";
import { useLocale } from "./i18n/locale-context";
import { EVIDENCE_SCOPE_NOTE, FIELD_EVIDENCE_SCOPE } from "./dashboard-evidence-scope";
import { lc } from "./i18n/lc";

type SourcesMethodViewProps = {
 section: PesquisaSectionId;
 onSectionChange: (id: PesquisaSectionId) => void;
 onOpenResearch: () => void;
};

export default function SourcesMethodView({
  section,
  onSectionChange,
  onOpenResearch,
}: SourcesMethodViewProps) {
  const { locale } = useLocale();
  const effectiveSection =
    section === "sumario" || section === "competitors" ? "metodo" : section;

  return (
    <Stack gap={20}>
      <TabPageHeader
        title={locale === "pt" ? "Fontes e método" : "Sources and method"}
        subtitle={
          locale === "pt"
            ? "Escopo das evidências, limitações e arquivos de pesquisa."
            : "Evidence scope, limitations and research source files."
        }
      />
      <Callout tone="info" title={locale === "pt" ? "Contagens no dashboard" : "Dashboard counts"}>
        <Text size="small">{lc(locale, EVIDENCE_SCOPE_NOTE)}</Text>
        <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
          {locale === "pt" ? "POCs visitadas (MX+PE):" : "POCs visited (MX+PE):"}{" "}
          {FIELD_EVIDENCE_SCOPE.pocStoresVisited.mexico}+{FIELD_EVIDENCE_SCOPE.pocStoresVisited.peru} ·{" "}
          {locale === "pt" ? "Reviews Appbot:" : "Appbot reviews:"}{" "}
          {FIELD_EVIDENCE_SCOPE.researchReviewsAppbot}
        </Text>
      </Callout>
      <Button variant="secondary" onClick={onOpenResearch}>
        {locale === "pt" ? "Abrir hub de pesquisa completo" : "Open full research hub"}
      </Button>
      <PesquisasView section={effectiveSection} onSectionChange={onSectionChange} />
    </Stack>
  );
}
