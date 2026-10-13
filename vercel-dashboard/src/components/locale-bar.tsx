"use client";

import { Button, Row, Text } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";
import { UI } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/locale";

export function LocaleBar() {
 const { locale, setLocale, t } = useLocale();

 function pick(next: Locale) {
 if (next !== locale) setLocale(next);
 }

 return (
 <Row gap={8} align="center" wrap aria-label={t(UI.language)}>
 <Text size="small" tone="secondary" weight="semibold">
 {t(UI.language)}:
 </Text>
 <Button
 variant={locale === "pt" ? "primary" : "secondary"}
 onClick={() => pick("pt")}
 >
 {t(UI.langPt)}
 </Button>
 <Button
 variant={locale === "en" ? "primary" : "secondary"}
 onClick={() => pick("en")}
 >
 {t(UI.langEn)}
 </Button>
 </Row>
 );
}
