"use client";

import { useState } from "react";
import {
 downloadTripSynthesisPptx,
 mexicoTripSynthesisPptxInput,
 peruTripSynthesisPptxInput,
} from "@/lib/trip-synthesis-pptx";
import type { PeruAgendaTab } from "@/lib/peru-view";
import type { MexicoSessionId } from "@/lib/visit-date-nav";
import type { DashboardCountry } from "@/lib/dashboard-url";
import { Row, Stack, Text } from "@/components/ui";

export function TripSynthesisExportFab({
 country,
 mexicoSession,
 peruAgenda,
 onGoToPeruSynthesis,
 onGoToMexicoSynthesis,
}: {
 country: DashboardCountry;
 mexicoSession: MexicoSessionId;
 peruAgenda: PeruAgendaTab;
 onGoToPeruSynthesis: () => void;
 onGoToMexicoSynthesis: () => void;
}) {
 const [busy, setBusy] = useState(false);
 const [open, setOpen] = useState(false);

 const onPeruSynthesis = country === "peru" && peruAgenda === "overall-result";
 const onMexicoSynthesis = country === "mexico" && mexicoSession === "resultado-geral";
 const canExportDirect = onPeruSynthesis || onMexicoSynthesis;

 async function exportPeru() {
 setBusy(true);
 try {
 await downloadTripSynthesisPptx(peruTripSynthesisPptxInput());
 } catch (e) {
 console.error(e);
 window.alert("Could not generate PowerPoint. Try again in a desktop browser.");
 } finally {
 setBusy(false);
 setOpen(false);
 }
 }

 async function exportMexico() {
 setBusy(true);
 try {
 const { TRIP_SYNTHESIS } = await import("@/lib/mexico-view");
 await downloadTripSynthesisPptx(mexicoTripSynthesisPptxInput(TRIP_SYNTHESIS));
 } catch (e) {
 console.error(e);
 window.alert("Could not generate PowerPoint. Try again in a desktop browser.");
 } finally {
 setBusy(false);
 setOpen(false);
 }
 }

 async function handleMainClick() {
 if (busy) return;
 if (onPeruSynthesis) {
 await exportPeru();
 return;
 }
 if (onMexicoSynthesis) {
 await exportMexico();
 return;
 }
 setOpen((v) => !v);
 }

 const fabStyle: React.CSSProperties = {
 position: "fixed",
 right: 20,
 bottom: 20,
 zIndex: 9999,
 border: "none",
 borderRadius: 999,
 padding: "12px 16px",
 background: "#2563eb",
 color: "#fff",
 fontWeight: 600,
 cursor: busy ? "wait" : "pointer",
 boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
 fontSize: 14,
 };

 return (
 <>
 {open && !canExportDirect && (
 <div
 role="dialog"
 aria-label="Export trip synthesis"
 style={{
 position: "fixed",
 right: 20,
 bottom: 72,
 zIndex: 9999,
 background: "var(--bg-elevated, #fff)",
 border: "1px solid var(--border, #e2e8f0)",
 borderRadius: 12,
 padding: 12,
 minWidth: 220,
 boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
 }}
 >
 <Stack gap={8}>
 <Text size="small" weight="semibold">Trip synthesis PPT</Text>
 <button
 type="button"
 disabled={busy}
 onClick={() => void exportPeru()}
 style={{
 textAlign: "left",
 padding: "8px 10px",
 borderRadius: 8,
 border: "1px solid var(--border, #e2e8f0)",
 background: "#fff",
 cursor: "pointer",
 width: "100%",
 }}
 >
 Peru · Overall result
 </button>
 <button
 type="button"
 disabled={busy}
 onClick={() => void exportMexico()}
 style={{
 textAlign: "left",
 padding: "8px 10px",
 borderRadius: 8,
 border: "1px solid var(--border, #e2e8f0)",
 background: "#fff",
 cursor: "pointer",
 width: "100%",
 }}
 >
 Mexico · Overall result
 </button>
 <Row gap={8} wrap>
 <button
 type="button"
 onClick={() => {
 onGoToPeruSynthesis();
 setOpen(false);
 }}
 style={{ fontSize: 12, background: "none", border: "none", cursor: "pointer", color: "#2563eb" }}
 >
 Open Peru synthesis →
 </button>
 <button
 type="button"
 onClick={() => {
 onGoToMexicoSynthesis();
 setOpen(false);
 }}
 style={{ fontSize: 12, background: "none", border: "none", cursor: "pointer", color: "#2563eb" }}
 >
 Open Mexico synthesis →
 </button>
 </Row>
 </Stack>
 </div>
 )}
 <button
 type="button"
 onClick={() => void handleMainClick()}
 aria-label="Export trip synthesis PowerPoint"
 style={fabStyle}
 >
 {busy ? "Generating…" : "Export PPT"}
 </button>
 </>
 );
}
