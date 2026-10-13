"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
 downloadTripSynthesisPptx,
 type TripSynthesisPptxInput,
} from "@/lib/trip-synthesis-pptx";

export function TripSynthesisExportButton({
 getInput,
 label = "Export PPT",
}: {
 getInput: () => TripSynthesisPptxInput;
 label?: string;
}) {
 const [busy, setBusy] = useState(false);

 async function handleExport() {
 if (busy) return;
 setBusy(true);
 try {
 await downloadTripSynthesisPptx(getInput());
 } catch (e) {
 console.error(e);
 window.alert("Could not generate PowerPoint. Try again or use a desktop browser.");
 } finally {
 setBusy(false);
 }
 }

 return (
 <Button variant="primary" onClick={() => void handleExport()}>
 {busy ? "Generating…" : label}
 </Button>
 );
}
