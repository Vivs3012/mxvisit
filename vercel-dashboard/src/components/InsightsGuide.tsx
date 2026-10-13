"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Stack, Text } from "@/components/ui";
import type { ChatPageContext } from "@/lib/chat-types";
import {
 INSIGHT_GUIDE_CATEGORIES,
 INSIGHT_GUIDE_QUESTIONS,
 getInsightGuideAnswer,
 getQuestionsForCategory,
 type InsightGuideCategoryId,
} from "@/lib/insight-guide";
import type { SearchLocation } from "@/lib/search";

type Lang = "pt" | "en";

type GuideMessage = {
 role: "user" | "assistant";
 questionId: string;
 labelPt: string;
 labelEn: string;
 bodyPt: string;
 bodyEn: string;
 links: { label: string; location: SearchLocation }[];
};

function detectLang(pageLabel: string): Lang {
 // The dashboard UI is English-first; keep the guide consistent regardless
 // of the browser locale or the current country page.
 return "en";
}

export function InsightsGuide({
 pageContext,
 onNavigate,
}: {
 pageContext: ChatPageContext;
 onNavigate: (location: SearchLocation) => void;
}) {
 const [open, setOpen] = useState(false);
 const [lang, setLang] = useState<Lang>(() => detectLang(pageContext.label));
 const [activeCategory, setActiveCategory] = useState<InsightGuideCategoryId>("overview");
 const [messages, setMessages] = useState<GuideMessage[]>([]);

 const listRef = useRef<HTMLDivElement>(null);
 const questions = useMemo(() => getQuestionsForCategory(activeCategory), [activeCategory]);

 useEffect(() => {
 if (!open) return;
 listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
 }, [messages, open]);

 function askQuestion(questionId: string) {
 const answer = getInsightGuideAnswer(questionId);
 if (!answer) return;

 const q = INSIGHT_GUIDE_QUESTIONS.find((item) => item.id === questionId);
 if (!q) return;

 setMessages((prev) => [
...prev,
 {
 role: "user",
 questionId,
 labelPt: q.labelPt,
 labelEn: q.labelEn,
 bodyPt: q.labelPt,
 bodyEn: q.labelEn,
 links: [],
 },
 {
 role: "assistant",
 questionId,
 labelPt: answer.titlePt,
 labelEn: answer.titleEn,
 bodyPt: answer.bodyPt,
 bodyEn: answer.bodyEn,
 links: answer.links,
 },
 ]);
 }

 const panel = (
 <aside
 style={{
 width: 400,
 flexShrink: 0,
 borderLeft: "1px solid var(--border)",
 background: "var(--bg-elevated)",
 display: "flex",
 flexDirection: "column",
 height: "100vh",
 position: "sticky",
 top: 0,
 }}
 >
 <Row
 align="center"
 style={{
 justifyContent: "space-between",
 padding: "14px 16px",
 borderBottom: "1px solid var(--border)",
 }}
 >
 <Stack gap={2}>
 <Text weight="semibold">Insights guide</Text>
 <Text size="small" tone="tertiary">
 {pageContext.label} · sem API
 </Text>
 </Stack>
 <Button variant="secondary" onClick={() => setOpen(false)} aria-label="Close guide">
 ✕
 </Button>
 </Row>

 <Row gap={6} style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
 <Button
 variant={lang === "pt" ? "primary" : "secondary"}
 onClick={() => setLang("pt")}
 >
 PT
 </Button>
 <Button
 variant={lang === "en" ? "primary" : "secondary"}
 onClick={() => setLang("en")}
 >
 EN
 </Button>
 </Row>

 <div
 style={{
 padding: "10px 16px",
 borderBottom: "1px solid var(--border)",
 overflowX: "auto",
 }}
 >
 <Row gap={6} wrap>
 {INSIGHT_GUIDE_CATEGORIES.map((cat) => (
 <button
 key={cat.id}
 type="button"
 onClick={() => setActiveCategory(cat.id)}
 style={{
 border: "1px solid var(--border)",
 borderRadius: 999,
 padding: "5px 10px",
 fontSize: 12,
 cursor: "pointer",
 background: activeCategory === cat.id ? "#dbeafe" : "#fff",
 fontWeight: activeCategory === cat.id ? 600 : 400,
 whiteSpace: "nowrap",
 }}
 >
 {lang === "pt" ? cat.labelPt : cat.labelEn}
 </button>
 ))}
 </Row>
 </div>

 <div
 ref={listRef}
 style={{
 flex: 1,
 overflowY: "auto",
 padding: 16,
 display: "flex",
 flexDirection: "column",
 gap: 12,
 }}
 >
 {messages.length === 0 && (
 <Stack gap={8}>
 <Text size="small" tone="secondary">
 {lang === "pt"
 ? "Escolha uma pergunta abaixo. As respostas vêm só do conteúdo do dashboard."
 : "Pick a question below. Answers come only from dashboard content."}
 </Text>
 </Stack>
 )}

 {messages.map((msg, index) => (
 <div
 key={`${msg.questionId}-${index}`}
 style={{
 alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
 maxWidth: "95%",
 padding: "10px 12px",
 borderRadius: 12,
 background: msg.role === "user" ? "#dbeafe" : "#f1f5f9",
 border: "1px solid var(--border)",
 whiteSpace: "pre-wrap",
 }}
 >
 <Text size="small" weight={msg.role === "user" ? "semibold" : "normal"}>
 {lang === "pt"
 ? msg.role === "user"
 ? msg.labelPt
 : msg.bodyPt
 : msg.role === "user"
 ? msg.labelEn
 : msg.bodyEn}
 </Text>
 {msg.role === "assistant" && msg.links.length > 0 && (
 <Stack gap={6} style={{ marginTop: 10 }}>
 <Text size="small" tone="tertiary" weight="semibold">
 {lang === "pt" ? "Abrir no dashboard" : "Open in dashboard"}
 </Text>
 {msg.links.map((link) => (
 <button
 key={link.label}
 type="button"
 onClick={() => {
 onNavigate(link.location);
 setOpen(false);
 }}
 style={{
 textAlign: "left",
 border: "1px solid var(--border)",
 background: "#fff",
 borderRadius: 8,
 padding: "6px 8px",
 cursor: "pointer",
 width: "100%",
 }}
 >
 <Text size="small">{link.label} →</Text>
 </button>
 ))}
 </Stack>
 )}
 </div>
 ))}
 </div>

 <Stack gap={8} style={{ padding: 16, borderTop: "1px solid var(--border)", maxHeight: 220, overflowY: "auto" }}>
 <Text size="small" tone="tertiary" weight="semibold">
 {lang === "pt" ? "Perguntas prontas" : "Ready-made questions"}
 </Text>
 <Stack gap={6}>
 {questions.map((q) => (
 <button
 key={q.id}
 type="button"
 onClick={() => askQuestion(q.id)}
 style={{
 textAlign: "left",
 border: "1px solid var(--border)",
 background: "#fff",
 borderRadius: 10,
 padding: "8px 10px",
 cursor: "pointer",
 fontSize: 13,
 }}
 >
 {lang === "pt" ? q.labelPt : q.labelEn}
 </button>
 ))}
 </Stack>
 </Stack>
 </aside>
 );

 if (!open) {
 return (
 <button
 type="button"
 onClick={() => setOpen(true)}
 aria-label="Open insights guide"
 style={{
 position: "fixed",
 right: 20,
 bottom: 20,
 zIndex: 50,
 border: "none",
 borderRadius: 999,
 padding: "12px 16px",
 background: "var(--accent)",
 color: "#fff",
 fontWeight: 600,
 cursor: "pointer",
 boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
 }}
 >
 Insights
 </button>
 );
 }

 return panel;
}
