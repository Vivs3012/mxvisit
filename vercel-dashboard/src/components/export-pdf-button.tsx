"use client";

const FULL_PDF_HREF = "/exports/OneYP-Dashboard-Completo.pdf";

export default function ExportPdfButton() {
 function exportPdf() {
 window.print();
 }

 return (
 <div
 className="print-hide"
 style={{
 position: "fixed",
 right: 24,
 bottom: 24,
 zIndex: 40,
 display: "flex",
 flexDirection: "column",
 gap: 8,
 alignItems: "flex-end",
 }}
 >
 <a
 href={FULL_PDF_HREF}
 download
 aria-label="Baixar PDF completo do dashboard"
 style={{
 border: "1px solid #0f766e",
 borderRadius: 999,
 padding: "12px 18px",
 background: "#0d9488",
 color: "#fff",
 boxShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
 fontSize: 14,
 fontWeight: 700,
 textDecoration: "none",
 }}
 >
 PDF completo (dashboard)
 </a>
 <button
 type="button"
 onClick={exportPdf}
 aria-label="Exportar aba atual para PDF"
 style={{
 border: "1px solid #1d4ed8",
 borderRadius: 999,
 padding: "10px 16px",
 background: "#2563eb",
 color: "#fff",
 boxShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
 fontSize: 13,
 fontWeight: 700,
 cursor: "pointer",
 }}
 >
 PDF desta aba (imprimir)
 </button>
 </div>
 );
}
