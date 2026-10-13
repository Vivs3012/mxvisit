"use client";

import { useEffect, useState } from "react";
import {
 Button,
 Callout,
 Card,
 CardBody,
 CardHeader,
 CollapsibleSection,
 Grid,
 H3,
 Pill,
 Row,
 Stack,
 Text,
} from "@/components/ui";
import { ReaderText } from "./reader-text-ui";
import {
 TabExecutiveSummary,
 TabPageHeader,
 TabSource,
} from "@/components/view-shell";
import {
 PE_WORKSHOP_0209,
 type WorkshopGroup,
 type WorkshopItem,
} from "./peru-workshop-0209";
import type { PeruAgendaTab } from "./peru-view";
import { ThemeHorizonBanner } from "@/components/theme-horizon-banner";
import { PERU_CONTEXTS } from "./peru-context-nav";

type GroupId = WorkshopGroup["id"];

function PriorityBadge({ p }: { p?: number }) {
 if (!p) return null;
 return (
 <Pill size="sm" tone={p === 1 ? "warning" : p === 2 ? "info" : "neutral"}>
 #{p}
 </Pill>
 );
}

function ItemList({ items, showPriority }: { items: WorkshopItem[]; showPriority?: boolean }) {
 return (
 <Stack gap={8}>
 {items.map((item) => (
 <CollapsibleSection key={item.id} title={item.title} trailing={showPriority ? `#${item.priority}` : undefined}>
 <Stack gap={6} style={{ paddingTop: 8 }}>
 {showPriority && item.priority && <PriorityBadge p={item.priority} />}
 <ReaderText size="small">{item.detail}</ReaderText>
 {item.tags && item.tags.length > 0 && (
 <Row gap={6} wrap>
 {item.tags.map((t) => (
 <Pill key={t} size="sm" tone="neutral">
 {t}
 </Pill>
 ))}
 </Row>
 )}
 </Stack>
 </CollapsibleSection>
 ))}
 </Stack>
 );
}

function GroupPanel({ group }: { group: WorkshopGroup }) {
 return (
 <Stack gap={16}>
 {group.workshopTeamNote && (
 <Text size="small" tone="secondary">
 {group.workshopTeamNote}
 </Text>
 )}

 <CollapsibleSection title="Challenge prioritization — top 4" count={group.challengesPrioritized.length} defaultOpen>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Callout tone="warning" title="Group vote">
 <Text size="small">
 Order presented in plenary after collective voting.
 </Text>
 </Callout>
 <ItemList items={group.challengesPrioritized} showPriority />
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Future vision prioritization" count={group.futurePrioritized.length} defaultOpen>
 <ItemList items={group.futurePrioritized} showPriority />
 </CollapsibleSection>

 <CollapsibleSection title="Challenges (full board)" count={group.challenges.length}>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Text size="small" tone="tertiary">
 {group.challenges.length} topics from the post-it wall
 </Text>
 <ItemList items={group.challenges} />
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Future vision (2027–2028)" count={group.futureVision.length}>
 <Stack gap={10} style={{ paddingTop: 10 }}>
 <Text size="small" tone="tertiary">
 {group.futureVision.length} ideas — pain relief plus innovation
 </Text>
 <ItemList items={group.futureVision} />
 </Stack>
 </CollapsibleSection>
 </Stack>
 );
}

export default function PeruWorkshopView({
 onAgendaChange,
 groupFilter,
}: {
 onAgendaChange?: (tab: PeruAgendaTab) => void;
 groupFilter?: GroupId;
}) {
 const w = PE_WORKSHOP_0209;
 const [activeGroup, setActiveGroup] = useState<GroupId>(groupFilter ?? "operations");

 useEffect(() => {
 if (groupFilter) setActiveGroup(groupFilter);
 }, [groupFilter]);

 const currentGroup = groupFilter ?? activeGroup;
 const group = w.groups.find((g) => g.id === currentGroup)!;
 const groupPhotos = w.photos.filter((p) => {
 if (!groupFilter) return true;
 if (groupFilter === "operations") return p.label.startsWith("OPS");
 if (groupFilter === "consumer") return p.label.startsWith("Consumer");
 if (groupFilter === "rewards") return p.label.startsWith("Rewards");
 return true;
 });

 const momentoIdeas = w.momentoInesperado.ideas.filter((idea) => {
 if (!groupFilter) return true;
 if (idea.group === "all") return true;
 return idea.group === groupFilter;
 });

 const titleSuffix = groupFilter ? ` · ${group.label}` : "";
 const contextId =
 groupFilter === "consumer"
 ? "consumer"
 : groupFilter === "rewards"
 ? "rewards"
 : "service-level";
 const horizonMeta = PERU_CONTEXTS.find((c) => c.id === contextId);

 return (
 <Stack gap={20}>
 <TabPageHeader
 title={`${w.title}${titleSuffix}`}
 date={w.date}
 subtitle={`${w.location} · ${w.duration} · ${w.participants}`}
 />

 {horizonMeta && (
 <ThemeHorizonBanner
 plan={{
 primaryPhase: horizonMeta.primaryPhase,
 now: horizonMeta.horizonPlan.now,
 next: horizonMeta.horizonPlan.next,
 later: horizonMeta.horizonPlan.later,
 gateNote: horizonMeta.horizonPlan.gateNote,
 }}
 />
 )}

 <TabExecutiveSummary
 headline={w.executiveSummary.headline}
 paragraphs={w.executiveSummary.paragraphs}
 />

 <CollapsibleSection title="Agenda (PDF)" count={w.agenda.length}>
 <Stack gap={6} style={{ paddingTop: 10 }}>
 {w.agenda.map((a) => (
 <Row key={a.activity} gap={8} align="start">
 <Pill size="sm" tone="info">
 {a.time}
 </Pill>
 <Text size="small">{a.activity}</Text>
 </Row>
 ))}
 </Stack>
 </CollapsibleSection>

 {!groupFilter && (
 <Row gap={8} wrap>
 {w.groups.map((g) => (
 <Button
 key={g.id}
 variant={currentGroup === g.id ? "primary" : "secondary"}
 onClick={() => setActiveGroup(g.id)}
 >
 {g.label}
 </Button>
 ))}
 </Row>
 )}

 <GroupPanel group={group} />

 <CollapsibleSection
 title={w.momentoInesperado.title}
 count={momentoIdeas.length}
 defaultOpen
 >
 <Stack gap={12} style={{ paddingTop: 10 }}>
 <Text size="small">{w.momentoInesperado.prompt}</Text>
 <Stack gap={4}>
 <Text size="small" weight="bold">
 PDF starters
 </Text>
 {w.momentoInesperado.pdfStarters.map((s) => (
 <Text key={s} size="small" tone="secondary">
 • {s}
 </Text>
 ))}
 </Stack>
 <Grid columns={2} gap={10}>
 {momentoIdeas.map((idea) => (
 <Card key={idea.id}>
 <CardBody>
 <Stack gap={4}>
 <Row gap={6} wrap>
 <Pill size="sm" tone="neutral">
 {idea.group}
 </Pill>
 </Row>
 <Text weight="bold" size="small">
 {idea.title}
 </Text>
 <ReaderText size="small" tone="secondary">
 {idea.detail}
 </ReaderText>
 </Stack>
 </CardBody>
 </Card>
 ))}
 </Grid>
 <Callout tone="neutral" title="Highlighted in closing read">
 <Text size="small">{w.momentoInesperado.highlightedRead}</Text>
 </Callout>
 </Stack>
 </CollapsibleSection>

 <CollapsibleSection title="Board photos" count={groupPhotos.length}>
 <Grid columns={2} gap={12} style={{ paddingTop: 12 }}>
 {groupPhotos.map((photo) => (
 <Card key={photo.id}>
 <CardHeader trailing={photo.id}>{photo.label}</CardHeader>
 <CardBody>
 <img
 src={photo.src}
 alt={photo.label}
 style={{
 width: "100%",
 borderRadius: 8,
 border: "1px solid var(--border)",
 }}
 />
 </CardBody>
 </Card>
 ))}
 </Grid>
 </CollapsibleSection>

 {onAgendaChange && (
 <Row gap={8} wrap>
 {groupFilter === "operations" && (
 <>
 <Button variant="secondary" onClick={() => onAgendaChange("service-level")}>
 ← Service level (Sep 1)
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-consumer")}>
 Workshop · Consumer →
 </Button>
 </>
 )}
 {groupFilter === "consumer" && (
 <>
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-ops")}>
 ← Workshop · Operations
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("consumer-vision")}>
 Consumer vision (Sep 3) →
 </Button>
 </>
 )}
 {groupFilter === "rewards" && (
 <Button variant="secondary" onClick={() => onAgendaChange("workshop-consumer")}>
 ← Workshop · Consumer
 </Button>
 )}
 {!groupFilter && (
 <>
 <Button variant="secondary" onClick={() => onAgendaChange("service-level")}>
 ← Service level (Sep 1)
 </Button>
 <Button variant="secondary" onClick={() => onAgendaChange("consumer-vision")}>
 Consumer vision (Sep 3) →
 </Button>
 </>
 )}
 </Row>
 )}

 <TabSource>Source: {w.source}</TabSource>
 </Stack>
 );
}
