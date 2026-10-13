"use client";

import { Button, Card, CardBody, Row, Stack, Text } from "@/components/ui";
import { EvidenceScopeCallout } from "@/components/evidence-scope-callout";
import { TabPageHeader } from "@/components/view-shell";
import type { PesquisaSectionId } from "./pesquisas-data";
import { PesquisasSectionBody } from "./pesquisas-sections";
import { useLocale } from "./i18n/locale-context";
import { getPesquisasMeta } from "./i18n/content/pesquisas";
import { getPesquisasSections } from "./i18n/navigation";
import { UI } from "./i18n/ui";

function SectionNav({
 active,
 onChange,
 sections,
}: {
 active: PesquisaSectionId;
 onChange: (id: PesquisaSectionId) => void;
 sections: { id: PesquisaSectionId; label: string; subtitle: string }[];
}) {
 const { t } = useLocale();
 const meta = sections.find((s) => s.id === active);
 return (
 <Card>
 <CardBody>
 <Stack gap={12}>
 <Text size="small" tone="secondary" weight="semibold">
 {t(UI.subjectNav)}
 </Text>
 <Row gap={8} wrap>
 {sections.map((section) => (
 <Button
 key={section.id}
 variant={active === section.id ? "primary" : "secondary"}
 onClick={() => onChange(section.id)}
 >
 {section.label}
 </Button>
 ))}
 </Row>
 {meta && (
 <Text size="small" tone="tertiary">
 {meta.subtitle}
 </Text>
 )}
 </Stack>
 </CardBody>
 </Card>
 );
}

export default function PesquisasView({
 section,
 onSectionChange,
}: {
 section: PesquisaSectionId;
 onSectionChange: (section: PesquisaSectionId) => void;
}) {
 const { locale, t } = useLocale();
 const sections = getPesquisasSections(locale);
 const meta = getPesquisasMeta(locale);
 const sectionMeta = sections.find((s) => s.id === section);
 const isCompetitors = section === "competitors";

 return (
 <Stack gap={24}>
 <EvidenceScopeCallout />
 {!isCompetitors && (
 <TabPageHeader
 title={meta.title}
 date={meta.period}
 badge={meta.scope}
 subtitle={meta.subtitle}
 actions={
 <Button
 variant="secondary"
 onClick={() => window.open(meta.reportPdf, "_blank", "noopener,noreferrer")}
 >
 {t(UI.consolidatedPdf)}
 </Button>
 }
 />
 )}

 <SectionNav active={section} onChange={onSectionChange} sections={sections} />

 {sectionMeta && !isCompetitors && (
 <Text size="small" tone="secondary" weight="semibold">
 {sectionMeta.label}
 </Text>
 )}

 <PesquisasSectionBody section={section} locale={locale} />
 </Stack>
 );
}

export type { PesquisaSectionId };
