import type { ReactNode } from "react";
import { ReaderText } from "@/lib/reader-text-ui";
import {
 Callout,
 Grid,
 H2,
 Pill,
 Row,
 Stack,
 Stat,
 Text,
} from "@/components/ui";

type Tone = "primary" | "warning" | "info" | "success" | "danger" | "neutral";

/** Standard country-tab header — title, date pill, scope subtitle. */
export function TabPageHeader({
 title,
 date,
 subtitle,
 badge,
 actions,
}: {
 title: string;
 date?: string;
 subtitle?: string;
 badge?: string;
 actions?: ReactNode;
}) {
 return (
 <Stack gap={4}>
 <Row gap={8} align="center" wrap style={{ justifyContent: "space-between", width: "100%" }}>
 <Row gap={8} align="center" wrap>
 <H2 style={{ margin: 0 }}>{title}</H2>
 {date && (
 <Pill tone="primary" size="sm">
 {date}
 </Pill>
 )}
 {badge && (
 <Pill tone="neutral" size="sm">
 {badge}
 </Pill>
 )}
 </Row>
 {actions}
 </Row>
 {subtitle && (
 <Text size="small" tone="secondary">
 {subtitle}
 </Text>
 )}
 </Stack>
 );
}

/** Executive summary callout — always second block after header. */
export function TabExecutiveSummary({
 title = "Executive summary",
 headline,
 paragraphs,
 body,
}: {
 title?: string;
 headline?: string;
 paragraphs?: string[];
 body?: string;
}) {
 return (
 <Callout tone="info" title={title}>
 <Stack gap={8}>
 {headline && (
 <Text weight="semibold" size="small">
 {headline}
 </Text>
 )}
 {body && <ReaderText size="small">{body}</ReaderText>}
 {paragraphs?.map((p) => (
 <ReaderText key={p.slice(0, 48)} size="small">
 {p}
 </ReaderText>
 ))}
 </Stack>
 </Callout>
 );
}

export function TabStatGrid({
 stats,
 columns = 4,
}: {
 stats: { label: string; value: string; tone?: Tone }[];
 columns?: 2 | 3 | 4;
}) {
 return (
 <Grid columns={columns} gap={10}>
 {stats.map((s) => (
 <Stat key={s.label} label={s.label} value={s.value} tone={s.tone} />
 ))}
 </Grid>
 );
}

export function TabSource({ children }: { children: ReactNode }) {
 return (
 <Text size="small" tone="tertiary">
 {children}
 </Text>
 );
}

/** Context callout with optional navigation buttons below. */
export function TabContextCallout({
 title,
 children,
 actions,
}: {
 title: string;
 children: ReactNode;
 actions?: ReactNode;
}) {
 return (
 <Callout tone="info" title={title}>
 <Stack gap={8}>
 {children}
 {actions}
 </Stack>
 </Callout>
 );
}
