"use client";

import { Button, Card, CardBody, Row, Stack, Text } from "@/components/ui";

export type CompactVisitOption<TSession extends string> = {
 dateId: string;
 dateLabel: string;
 shortLabel: string;
 sessionId: TSession;
 sessionLabel: string;
 time?: string;
};

export function CompactVisitPicker<TSession extends string>({
 options,
 activeSessionId,
 onSelect,
 tripPeriod,
}: {
 options: CompactVisitOption<TSession>[];
 activeSessionId: TSession;
 onSelect: (sessionId: TSession, dateId: string) => void;
 tripPeriod: string;
}) {
 if (options.length === 0) return null;

 return (
 <Card>
 <CardBody>
 <Stack gap={10}>
 <Stack gap={4}>
 <Text size="small" tone="secondary" weight="semibold">
 Session
 </Text>
 <Text size="small" tone="tertiary">
 {tripPeriod}
 </Text>
 </Stack>
 <Row gap={8} wrap>
 {options.map((opt) => {
 const selected = activeSessionId === opt.sessionId;
 return (
 <Button
 key={opt.sessionId}
 variant={selected ? "primary" : "secondary"}
 onClick={() => onSelect(opt.sessionId, opt.dateId)}
 >
 {opt.dateLabel} · {opt.sessionLabel}
 {opt.time ? ` (${opt.time})` : ""}
 </Button>
 );
 })}
 </Row>
 </Stack>
 </CardBody>
 </Card>
 );
}
