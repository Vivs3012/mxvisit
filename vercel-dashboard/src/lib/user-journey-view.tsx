"use client";

import { Button, Card, CardBody, Row, Stack, Text } from "@/components/ui";
import { ReaderText } from "./reader-text-ui";
import { TabPageHeader } from "@/components/view-shell";

export const USER_JOURNEY_MIRO_URL =
 "https://miro.com/app/board/uXjVHpbhkMc=/?moveToWidget=3458764683304014289";

const USER_JOURNEY_EMBED_URL =
 "https://miro.com/app/live-embed/uXjVHpbhkMc=/?moveToWidget=3458764683304014289";

export default function UserJourneyView() {
 return (
 <Stack gap={24}>
 <TabPageHeader
 title="User journey"
 badge="Miro"
 subtitle="Service blueprint v2 on Miro — aligned swimlanes (Consumer · Seller · Admin · Courier). MX & PE field insights. Scroll down on board if embed shows legacy v1."
 />

 <Card>
 <CardBody>
 <Stack gap={16}>
 <Text size="small" tone="secondary">
 Interactive journey map with swimlanes, pain points, opportunities, emotional curve,
 and service blueprint. Best viewed fullscreen in Miro.
 </Text>
 <Row gap={12} wrap>
 <Button
 variant="primary"
 onClick={() => window.open(USER_JOURNEY_MIRO_URL, "_blank", "noopener,noreferrer")}
 >
 Open in Miro ↗
 </Button>
 </Row>
 </Stack>
 </CardBody>
 </Card>

 <div
 style={{
 border: "1px solid var(--border, #e5e7eb)",
 borderRadius: 8,
 overflow: "hidden",
 background: "#f9fafb",
 }}
 >
 <iframe
 title="TaDa User Journey — Miro"
 src={USER_JOURNEY_EMBED_URL}
 style={{ width: "100%", height: "min(85vh, 900px)", border: 0, display: "block" }}
 allow="fullscreen; clipboard-read; clipboard-write"
 />
 </div>

 <Text size="small" tone="tertiary">
 If the preview does not load, use &quot;Open in Miro&quot; above — some browsers block embedded boards.
 </Text>
 </Stack>
 );
}
