"use client";

import { Button, Card, CardBody, Pill, Row, Stack, Text } from "@/components/ui";
import type { VisitDateGroup } from "@/lib/visit-date-nav";

type DateTimelineNavProps<TDate extends string, TSession extends string> = {
 tripPeriod: string;
 dates: VisitDateGroup<TDate, TSession>[];
 activeDateId: TDate;
 onDateChange: (id: TDate) => void;
};

export function DateTimelineNav<TDate extends string, TSession extends string>({
 tripPeriod,
 dates,
 activeDateId,
 onDateChange,
}: DateTimelineNavProps<TDate, TSession>) {
 const fieldDays = dates.filter((d) => !d.isMeta);
 const metaDays = dates.filter((d) => d.isMeta);

 return (
 <Stack gap={12}>
 <Text size="small" tone="secondary">
 {tripPeriod}
 </Text>
 <Row gap={8} wrap align="stretch">
 {fieldDays.map((day) => (
 <DateCard
 key={day.id}
 day={day}
 selected={activeDateId === day.id}
 onClick={() => onDateChange(day.id)}
 />
 ))}
 </Row>
 {metaDays.length > 0 && (
 <Stack gap={8}>
 <Text size="small" tone="tertiary" weight="semibold">
 Synthesis
 </Text>
 <Row gap={8} wrap>
 {metaDays.map((day) => (
 <DateCard
 key={day.id}
 day={day}
 selected={activeDateId === day.id}
 onClick={() => onDateChange(day.id)}
 compact
 />
 ))}
 </Row>
 </Stack>
 )}
 </Stack>
 );
}

function DateCard<TDate extends string, TSession extends string>({
 day,
 selected,
 onClick,
 compact,
}: {
 day: VisitDateGroup<TDate, TSession>;
 selected: boolean;
 onClick: () => void;
 compact?: boolean;
}) {
 return (
 <button
 type="button"
 onClick={onClick}
 style={{
 flex: compact ? "0 1 auto" : "1 1 160px",
 minWidth: compact ? 140 : 160,
 maxWidth: compact ? 220 : 280,
 padding: compact ? "10px 14px" : "14px 16px",
 borderRadius: 10,
 border: selected
 ? "2px solid var(--primary, #2563eb)"
 : "1px solid var(--border, #e5e7eb)",
 background: selected ? "var(--bg-elevated, #f8fafc)" : "var(--bg, #fff)",
 cursor: "pointer",
 textAlign: "left",
 }}
 >
 <Stack gap={4}>
 <Row gap={6} align="center" wrap>
 <Text
 weight="semibold"
 size={compact ? "small" : "medium"}
 style={{ color: selected ? "var(--primary)" : undefined }}
 >
 {day.dateLabel}
 </Text>
 {!day.isMeta && (
 <Pill tone={selected ? "primary" : "neutral"} size="sm">
 {day.shortLabel}
 </Pill>
 )}
 </Row>
 {!compact && day.weekday && (
 <Text size="small" tone="tertiary">
 {day.year} · {day.weekday}
 </Text>
 )}
 <Text size="small" tone="secondary" style={{ lineHeight: 1.35 }}>
 {day.summary}
 </Text>
 <Text size="small" tone="tertiary">
 {day.sessions.length} session{day.sessions.length !== 1 ? "s" : ""}
 </Text>
 </Stack>
 </button>
 );
}

type SessionSubNavProps<TSession extends string> = {
 sessions: { id: TSession; label: string; time?: string }[];
 activeSessionId: TSession;
 onSessionChange: (id: TSession) => void;
 dateLabel: string;
};

export function SessionSubNav<TSession extends string>({
 sessions,
 activeSessionId,
 onSessionChange,
 dateLabel,
}: SessionSubNavProps<TSession>) {
 if (sessions.length <= 1) return null;

 return (
 <Card>
 <CardBody>
 <Stack gap={10}>
 <Text size="small" tone="secondary" weight="semibold">
 {dateLabel} — choose session
 </Text>
 <Row gap={8} wrap>
 {sessions.map((s) => (
 <Button
 key={s.id}
 variant={activeSessionId === s.id ? "primary" : "secondary"}
 onClick={() => onSessionChange(s.id)}
 >
 {s.label}
 {s.time ? ` · ${s.time}` : ""}
 </Button>
 ))}
 </Row>
 </Stack>
 </CardBody>
 </Card>
 );
}
