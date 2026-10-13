"use client";

import { Pill, Row, Text } from "@/components/ui";

export function VisitLocationBar({
 segments,
}: {
 segments: string[];
}) {
 if (segments.length === 0) return null;

 return (
 <Row gap={8} align="center" wrap>
 <Text size="small" tone="tertiary" weight="semibold">
 You are here
 </Text>
 {segments.map((segment, index) => (
 <Row key={`${segment}-${index}`} gap={8} align="center">
 {index > 0 && (
 <Text size="small" tone="tertiary" aria-hidden>
 /
 </Text>
 )}
 <Pill size="sm" tone={index === segments.length - 1 ? "primary" : "neutral"}>
 {segment}
 </Pill>
 </Row>
 ))}
 </Row>
 );
}
