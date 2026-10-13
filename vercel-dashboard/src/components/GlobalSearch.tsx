"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { highlightTokens, searchDocs, type SearchDoc, type SearchHit, type SearchLocation } from "@/lib/search";
import { useLocale } from "@/lib/i18n/locale-context";
import { UI, uiTemplate } from "@/lib/i18n/ui";

function escapeRegex(value: string): string {
 return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlighted({ text, query }: { text: string; query: string }) {
 const tokens = highlightTokens(query).sort((a, b) => b.length - a.length);
 if (tokens.length === 0) return <>{text}</>;
 const re = new RegExp(`(${tokens.map(escapeRegex).join("|")})`, "ig");
 const parts = text.split(re);
 return (
 <>
 {parts.map((part, i) =>
 i % 2 === 1 ? (
 <mark
 key={`${part}-${i}`}
 style={{
 background: "#fde68a",
 color: "inherit",
 padding: "0 1px",
 borderRadius: 2,
 }}
 >
 {part}
 </mark>
 ) : (
 <span key={`${part}-${i}`}>{part}</span>
 ),
 )}
 </>
 );
}

function groupHits(hits: SearchHit[]): { breadcrumb: string; hits: SearchHit[] }[] {
 const order: string[] = [];
 const map = new Map<string, SearchHit[]>();
 for (const hit of hits) {
 const key = hit.doc.breadcrumb;
 if (!map.has(key)) {
 map.set(key, []);
 order.push(key);
 }
 map.get(key)!.push(hit);
 }
 return order.map((breadcrumb) => ({ breadcrumb, hits: map.get(breadcrumb)! }));
}

export function GlobalSearch({
 docs,
 onNavigate,
}: {
 docs: SearchDoc[];
 onNavigate: (location: SearchLocation) => void;
}) {
 const { t } = useLocale();
 const [query, setQuery] = useState("");
 const [open, setOpen] = useState(false);
 const [activeIndex, setActiveIndex] = useState(0);
 const rootRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 const hits = useMemo(() => searchDocs(query, docs), [query, docs]);
 const groups = useMemo(() => groupHits(hits), [hits]);

 useEffect(() => {
 setActiveIndex(0);
 }, [query]);

 useEffect(() => {
 const onPointer = (event: MouseEvent) => {
 if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
 };
 const onKey = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
 const meta = event.metaKey || event.ctrlKey;
 if (meta && event.key.toLowerCase() === "k") {
 event.preventDefault();
 inputRef.current?.focus();
 setOpen(true);
 }
 if (event.key === "Escape") setOpen(false);
 };
 document.addEventListener("mousedown", onPointer);
 document.addEventListener("keydown", onKey);
 return () => {
 document.removeEventListener("mousedown", onPointer);
 document.removeEventListener("keydown", onKey);
 };
 }, []);

 function goTo(hit: SearchHit) {
 onNavigate(hit.doc.location);
 setOpen(false);
 }

 function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
 if (event.key === "ArrowDown") {
 event.preventDefault();
 setOpen(true);
 setActiveIndex((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
 } else if (event.key === "ArrowUp") {
 event.preventDefault();
 setActiveIndex((i) => Math.max(i - 1, 0));
 } else if (event.key === "Enter" && hits[activeIndex]) {
 event.preventDefault();
 goTo(hits[activeIndex]);
 }
 }

 const showPanel = open && query.trim().length >= 2;
 let flatIndex = -1;

 return (
 <div ref={rootRef} style={{ position: "relative", flex: "1 1 320px", maxWidth: 480 }}>
 <input
 ref={inputRef}
 type="search"
 value={query}
 placeholder={t(UI.searchPlaceholder)}
 aria-label={t(UI.searchPlaceholder)}
 onChange={(e) => {
 setQuery(e.target.value);
 setOpen(true);
 }}
 onFocus={() => setOpen(true)}
 onKeyDown={onInputKeyDown}
 style={{
 width: "100%",
 padding: "9px 12px 9px 36px",
 borderRadius: 10,
 border: "1px solid var(--border)",
 background: "var(--bg-elevated)",
 color: "var(--text)",
 fontSize: 14,
 outline: "none",
 boxShadow: open ? "0 0 0 3px rgba(37, 99, 235, 0.15)" : "none",
 }}
 />
 <span
 aria-hidden
 style={{
 position: "absolute",
 left: 12,
 top: "50%",
 transform: "translateY(-50%)",
 color: "var(--text-tertiary)",
 pointerEvents: "none",
 fontSize: 14,
 }}
 >
 ⌕
 </span>
 <kbd
 style={{
 position: "absolute",
 right: 10,
 top: "50%",
 transform: "translateY(-50%)",
 fontSize: 11,
 color: "var(--text-tertiary)",
 border: "1px solid var(--border)",
 borderRadius: 6,
 padding: "1px 6px",
 background: "var(--bg)",
 pointerEvents: "none",
 }}
 >
 ⌘K
 </kbd>

 {showPanel && (
 <div
 role="listbox"
 style={{
 position: "absolute",
 top: "calc(100% + 6px)",
 left: 0,
 right: 0,
 maxHeight: 440,
 overflowY: "auto",
 background: "var(--bg-elevated)",
 border: "1px solid var(--border)",
 borderRadius: 12,
 boxShadow: "0 12px 40px rgba(15, 23, 42, 0.12)",
 zIndex: 60,
 padding: "6px 0",
 }}
 >
 {hits.length === 0 ? (
 <div style={{ padding: "16px 14px", fontSize: 13, color: "var(--text-secondary)" }}>
 {t(uiTemplate(UI.searchNoResults, { query }))}
 </div>
 ) : (
 <>
 <div
 style={{
 padding: "6px 14px 8px",
 fontSize: 12,
 color: "var(--text-tertiary)",
 }}
 >
 {hits.length} result{hits.length === 1 ? "" : "s"} across all pages
 </div>
 {groups.map((group) => (
 <div key={group.breadcrumb}>
 <div
 style={{
 padding: "8px 14px 4px",
 fontSize: 11,
 fontWeight: 700,
 letterSpacing: 0.04,
 textTransform: "uppercase",
 color: "var(--text-tertiary)",
 }}
 >
 {group.breadcrumb}
 </div>
 {group.hits.map((hit) => {
 flatIndex += 1;
 const index = flatIndex;
 const active = index === activeIndex;
 return (
 <button
 key={hit.doc.id}
 type="button"
 role="option"
 aria-selected={active}
 onMouseEnter={() => setActiveIndex(index)}
 onClick={() => goTo(hit)}
 style={{
 display: "block",
 width: "100%",
 textAlign: "left",
 border: "none",
 background: active ? "#eff6ff" : "transparent",
 padding: "8px 14px",
 cursor: "pointer",
 }}
 >
 <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
 <Highlighted text={hit.doc.title} query={query} />
 </div>
 <div
 style={{
 fontSize: 12,
 color: "var(--text-secondary)",
 marginTop: 2,
 lineHeight: 1.45,
 }}
 >
 <Highlighted text={hit.snippet} query={query} />
 </div>
 </button>
 );
 })}
 </div>
 ))}
 </>
 )}
 </div>
 )}
 </div>
 );
}
