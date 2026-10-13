"use client";

import { Callout, Text } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";
import { UI } from "@/lib/i18n/ui";

export function FieldContentNotice() {
 const { t } = useLocale();
 return (
 <Callout tone="neutral">
 <Text size="small">{t(UI.fieldContentNotice)}</Text>
 </Callout>
 );
}
