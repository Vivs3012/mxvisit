import json
import subprocess
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

SCRIPT_DIR = Path(__file__).resolve().parent
EXPORT_JSON = SCRIPT_DIR / ".ux-improvements-export.json"
EXPORT_MJS = SCRIPT_DIR / "export-ux-improvements-json.mjs"
OUT = Path("/Users/zeuser/Downloads/oneyp-ux-improvements-evidence-report.pdf")


def load_items():
    subprocess.run(
        ["npx", "--yes", "tsx", str(EXPORT_MJS)],
        cwd=SCRIPT_DIR.parent,
        check=True,
        capture_output=True,
        text=True,
    )
    data = json.loads(EXPORT_JSON.read_text(encoding="utf-8"))
    items = []
    for row in data["roadmap"]:
        row["part"] = "UX & product backlog (dashboard roadmap)"
        items.append(row)
    for row in data["cross"]:
        row["part"] = "Field cross-store themes (UX · Product · Operation · Infra)"
        items.append(row)
    return items


def p(text, style):
    return Paragraph(escape(text).replace("\n", "<br/>"), style)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(15 * mm, 9 * mm, "OneYP · UX & improvements evidence · September 2026")
    canvas.drawRightString(195 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def main():
    items = load_items()
    roadmap_n = sum(1 for i in items if i["part"].startswith("UX &"))
    cross_n = len(items) - roadmap_n

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleCenter",
            parent=styles["Title"],
            alignment=TA_CENTER,
            fontSize=22,
            leading=27,
            textColor=colors.HexColor("#0f172a"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtitle",
            parent=styles["Normal"],
            alignment=TA_CENTER,
            fontSize=11,
            leading=15,
            textColor=colors.HexColor("#475569"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Part",
            parent=styles["Heading1"],
            fontSize=15,
            leading=19,
            spaceBefore=16,
            spaceAfter=10,
            textColor=colors.HexColor("#1d4ed8"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading1"],
            fontSize=12,
            leading=16,
            spaceBefore=12,
            spaceAfter=6,
            textColor=colors.HexColor("#047857"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="BugTitle",
            parent=styles["Heading2"],
            fontSize=11,
            leading=14,
            spaceBefore=9,
            spaceAfter=4,
            textColor=colors.HexColor("#0f172a"),
        )
    )
    styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontSize=9.2, leading=13, spaceAfter=4))
    styles.add(
        ParagraphStyle(
            name="Quote",
            parent=styles["BodyText"],
            fontSize=8.6,
            leading=12,
            leftIndent=10,
            textColor=colors.HexColor("#334155"),
            spaceAfter=3,
        )
    )
    styles.add(ParagraphStyle(name="Meta", parent=styles["BodyText"], fontSize=8.5, leading=11, textColor=colors.HexColor("#475569")))

    story = [
        Spacer(1, 16 * mm),
        Paragraph("OneYP 2027", styles["TitleCenter"]),
        Paragraph("UX, product & operations improvements", styles["TitleCenter"]),
        Spacer(1, 4 * mm),
        Paragraph(
            "Mexico · Peru · OPS/CX workshops | One topic per item — excludes technical bugs (see bug evidence report)",
            styles["Subtitle"],
        ),
        Spacer(1, 10 * mm),
    ]

    summary_data = [
        ["Coverage", "CDMX + Puebla + Peru Lima · Seller & Courier UX roadmap only"],
        ["Records", f"{len(items)} separate items ({roadmap_n} roadmap)"],
        [
            "Excluded",
            "Technical bugs; Admin/CX roadmap; field cross-store themes; portfolio, dispatch SLA split, Jumbo, AI/chat/notification items per edit",
        ],
        ["Types", "UX · Product (Seller & Courier actors)"],
    ]
    t = Table(
        [[p(a, styles["BodySmall"]), p(b, styles["BodySmall"])] for a, b in summary_data],
        colWidths=[32 * mm, 148 * mm],
    )
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#ecfdf5")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 6 * mm))
    story.append(
        p(
            "Each entry is a distinct improvement, capability gap or operational/process theme from field visits and internal workshops — "
            "not merged into composite cards. Evidence lines are store quotes or structured visit notes.",
            styles["BodySmall"],
        )
    )
    story.append(PageBreak())

    current_part = None
    current_section = None
    for i, row in enumerate(items, start=1):
        part = row["part"]
        section = row["section"]
        if part != current_part:
            story.append(Paragraph(part, styles["Part"]))
            current_part = part
            current_section = None
        if section != current_section:
            story.append(Paragraph(section, styles["Section"]))
            current_section = section

        title = row["title"]
        story.append(
            Paragraph(f"{i}. {row['priority']} · {row['type']} · {title}", styles["BugTitle"])
        )
        story.append(p(f"Stores / coverage: {row['stores']}", styles["Meta"]))
        if row.get("id"):
            story.append(p(f"Roadmap id: {row['id']}", styles["Meta"]))
        story.append(p(f"Description: {row['detail']}", styles["BodySmall"]))
        story.append(p(f"Why it matters: {row['impact']}", styles["BodySmall"]))
        story.append(p("Evidence:", styles["BodySmall"]))
        for quote in row["quotes"][:5]:
            story.append(p(quote, styles["Quote"]))

    story.append(PageBreak())
    story.append(Paragraph("How this relates to the bug report", styles["Part"]))
    notes = [
        "Bug evidence PDF: defects (GPS stale, sound/session, push, assignment waiting, sync, etc.).",
        "This PDF: curated Seller & Courier UX/product backlog only (Admin, CX, and field cross-store themes omitted).",
        "Source: ux-roadmap.ts · Dashboard https://oneyp.vercel.app",
    ]
    for note in notes:
        story.append(p("• " + note, styles["BodySmall"]))

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        rightMargin=14 * mm,
        leftMargin=14 * mm,
        topMargin=14 * mm,
        bottomMargin=15 * mm,
        title="OneYP UX and Improvements Evidence",
        author="OneYP Dashboard",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)


if __name__ == "__main__":
    main()
