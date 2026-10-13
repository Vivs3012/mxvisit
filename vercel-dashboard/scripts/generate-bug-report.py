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

OUT = Path("/Users/zeuser/Downloads/oneyp-bugs-evidence-report.pdf")

# One record per catalogued bug (seller-courier-bugs-evidence-2027.html).
# Tuple: section, priority, audience, title, stores, detail, impact, quotes
SELLER_COURIER_BUGS = [
    (
        "1 · Map / GPS / operations screen",
        "Critical",
        "Seller + Courier",
        "Courier GPS / pin does not update in real time",
        "MX CDMX: Bahia, Mixcoac, Los Alpes, Churubusco · PE: La Marina, Merino, San Pedro",
        "Pin frozen at the store after departure; tracking disappears when returning to the screen. Sellers lose visibility; consumers complain about delay (~80% display issue, not actual delivery).",
        "Blocks dispatch, creates false late-order perception and drives off-app status checks.",
        [
            "“Almost 80 of the clients tell us.” — Bahia",
            "“You can't see when it's going, you have to pull it back.” — Mixcoac",
            "“Of 15 couriers I can only see two — the rest I track by WhatsApp.” — La Marina",
            "“I filter en ruta and it still shows the courier at the store — it never updates.” — San Pedro",
        ],
    ),
    (
        "1 · Map / GPS / operations screen",
        "High",
        "Seller",
        "GPS updates with delay (variant)",
        "MX Los Alpes",
        "Tracking sometimes works but lags; experienced teams stop opening the map.",
        "Dispatch stops trusting the map during peak.",
        ['“Then if it takes a while to update… they no longer open the map as such.” — Los Alpes'],
    ),
    (
        "1 · Map / GPS / operations screen",
        "Medium",
        "Seller",
        "Store pin disappeared from the map",
        "MX Churubusco",
        "The store location marker no longer appears on the operations map.",
        "Removes a basic spatial reference for routing and overlap diagnosis.",
        [
            "“The location of the store no longer appears… Yesterday I took them out because the store pin is not showing up.” — Churubusco",
        ],
    ),
    (
        "1 · Map / GPS / operations screen",
        "Medium",
        "Seller",
        "Assign action kicks the seller off the map screen",
        "MX Los Alpes, Churubusco",
        "After assigning a courier, the app leaves the map view instead of staying on the dispatch screen.",
        "Slows peak dispatch on the primary operational surface.",
        ["“The ideal is that it doesn't take us out, that it stays here on this screen.” — Los Alpes"],
    ),
    (
        "1 · Map / GPS / operations screen",
        "Critical",
        "Seller",
        "Map and order table freeze at peak",
        "MX Puebla: Forjadores · cross-theme 3/5 (Forjadores, Zavaleta, San Jerónimo)",
        "Map blank ~1 minute with 20+ orders; assign flow kicks off the screen.",
        "Orders stack unseen; dispatch SLA and revenue at risk.",
        [
            "“When there are many orders the table freezes… the map takes a minute to load and stays blank.” — Forjadores",
            "“If I open the map it takes time to load and stays blank — with 20 orders they don't show up for a while.” — Forjadores · Oscar",
        ],
    ),
    (
        "1 · Map / GPS / operations screen",
        "Medium",
        "Seller",
        "Map visibility ~5–10% at peak",
        "PE La Marina",
        "Only a fraction of active couriers appear on the map during saturation.",
        "Forces WhatsApp live-location tracking for most of the fleet.",
        [
            "“I'd say until it's 100% visible it's 5%, 10% — of 15 couriers I only see two.” — La Marina",
        ],
    ),
    (
        "1 · Map / GPS / operations screen",
        "Medium",
        "Seller",
        "“En ruta” filter does not reflect reality",
        "PE San Pedro",
        "Filtering couriers en route still shows them at the store; positions never update.",
        "Filter is unusable for dispatch decisions.",
        [
            "“I put the filter en ruta and it still shows the courier at the store — it never updates.” — San Pedro",
        ],
    ),
    (
        "2 · Sound / session / seller app at peak",
        "Critical",
        "Seller",
        "Order alert sound does not play or is intermittent",
        "MX Puebla: San Jerónimo, Zavaleta · PE: Merino, San Pedro",
        "Sound stops; sellers discover orders already expired after refresh.",
        "Missed and expired orders; direct revenue loss.",
        [
            "“It doesn't sound — I have to refresh every two or three minutes or orders show up already expired.” — San Jerónimo",
            "“Sometimes it sounds, sometimes it stops — you turn around and an order was already there a minute ago.” — Merino",
            "“Two orders came in while I was picking and it didn't sound — I lost an order.” — San Pedro",
        ],
    ),
    (
        "2 · Sound / session / seller app at peak",
        "High",
        "Seller",
        "Seller session closes silently (4–5×/day)",
        "MX Puebla Zavaleta",
        "App closes without alert while stocking; multiple orders queue unnoticed.",
        "Silent loss of order intake until manual refresh.",
        [
            "“It closes on me at least four or five times a day — no sound, I'm stocking and suddenly three orders are waiting.” — Zavaleta",
        ],
    ),
    (
        "2 · Sound / session / seller app at peak",
        "High",
        "Seller",
        "Sound + multi-login (office PC + store)",
        "PE Service Level Sep 1 · Workshop OPS Sep 2",
        "Same account on multiple devices; alert plays on the wrong machine; orders expire in the store.",
        "Breaks reliable in-store notification when ops uses multi-screen setups.",
        [
            "“Yesterday the store had three stores on the same screen — sound may stay on the computer, not in the store.” — BeerHub · Service Level vision",
        ],
    ),
    (
        "2 · Sound / session / seller app at peak",
        "High",
        "Seller",
        "Seller app freezes or closes at peak",
        "MX Puebla cross-theme 3/5",
        "App closes several times per day; minutes pass before staff notice and orders pile up.",
        "Same reliability chain as sound/session failures at peak.",
        [
            "“It closes on me four or five times a day — three or four minutes without noticing and orders pile up.” — Zavaleta · cross-theme",
        ],
    ),
    (
        "3 · Seller → courier distribution",
        "Critical",
        "Seller + Courier",
        "Order does not reach the courier at peak (refresh / manual code)",
        "MX Bahia, Mixcoac, Churubusco",
        "Under saturation, orders stay pending or require manual entry; Telegram still used for routes at Churubusco.",
        "TML 10, SLA 35, expired orders and weekend revenue.",
        [
            "“On Saturdays with high demand… the order doesn't arrive and they have to enter it manually.” — Mixcoac",
            "“At first when I changed this application a lot, they didn't reach you.” — Bahia",
            "“Telegram still used to distribute orders and routes.” — Churubusco",
        ],
    ),
    (
        "3 · Seller → courier distribution",
        "High",
        "Courier",
        "Courier app needs constant refresh — stuck on “pending”",
        "MX Mixcoac",
        "Courier must refresh repeatedly; order stays pending in the app.",
        "Delays acceptance and handoff at peak.",
        ['“It has to give refresh… because it just says pending, pending.” — Mixcoac'],
    ),
    (
        "3 · Seller → courier distribution",
        "High",
        "Courier",
        "Courier app freezes — requires uninstall/reinstall",
        "MX Churubusco",
        "App locks up during saturation; courier loses orders until reinstall.",
        "Burned orders and manual recovery during peak.",
        [
            "“They have to uninstall and reinstall… that order was already burned.” — Churubusco",
        ],
    ),
    (
        "3 · Seller → courier distribution",
        "High",
        "Seller + Courier",
        "Assign-to-courier stuck in “waiting” — courier never receives",
        "PE La Marina",
        "Seller sends assignment; status stays waiting and order never appears on courier phone.",
        "Blocks assignment; manual intervention at peak.",
        [
            "“I send it to Juan and it doesn't arrive — it stays waiting, on his app it doesn't show.” — La Marina",
        ],
    ),
    (
        "3 · Seller → courier distribution",
        "High",
        "Seller",
        "“Accepted” status does not update after courier accepts",
        "MX Bahia",
        "Some accepted orders do not change status in the seller view while delivery continues.",
        "Platform state diverges from operations.",
        [
            "“Those who do not change their status are few… but from here to here the splitter proceeds.” — Bahia",
        ],
    ),
    (
        "3 · Seller → courier distribution",
        "Medium",
        "Courier",
        "Courier name slow to appear on assign list",
        "PE San Pedro",
        "Assign list delays showing courier names by several seconds every time.",
        "Slows dispatch during active assignment.",
        [
            "“I wanted to assign and the name didn't appear — it takes a few seconds every time.” — San Pedro",
        ],
    ),
    (
        "4 · Inventory / sync / financial",
        "Medium",
        "Seller",
        "Inventory pagination repeats SKUs",
        "MX Los Alpes (183+ SKUs)",
        "Paging forward does not advance 10 items at a time; same SKUs repeat.",
        "Stock checks at scale become unreliable and slow.",
        [
            "“When we advance the page it does not advance us 10 at a time… it keeps repeating itself.” — Los Alpes",
        ],
    ),
    (
        "4 · Inventory / sync / financial",
        "Medium",
        "Seller",
        "Financial report date filter broken",
        "MX Mixcoac (also reported Churubusco)",
        "Single-day filter for the 18th returns nothing; seller must use an 18–19 range.",
        "Breaks courier reconciliation and daily audit.",
        [
            "“If you look for it, the mere 18 does not appear — only if you filter 18-19.” — Mixcoac",
            "“The mere 18 does not appear.” — Churubusco",
        ],
    ),
    (
        "4 · Inventory / sync / financial",
        "High",
        "Seller",
        "SKU turned off but orders still arrive",
        "PE La Marina, Merino, San Pedro (3/3)",
        "After disabling a SKU, the same product order can arrive within ~30 minutes.",
        "False availability, cancellations and seller distrust.",
        [
            "“I turned it off and half an hour later that same product order fell again.” — La Marina",
            "“I turn off the SKU and within half an hour the same product order came again.” — San Pedro",
        ],
    ),
    (
        "4 · Inventory / sync / financial",
        "High",
        "Seller",
        "Consumer cannot see products (overlap / stock sync)",
        "MX Churubusco",
        "Products in stock at the store are not visible to consumers; orders cannot arrive if catalog is wrong.",
        "Lost orders and overlap/routing confusion.",
        [
            "“How are orders going to arrive… if my clients don't see the products?” — Churubusco",
        ],
    ),
]


def p(text, style):
    return Paragraph(escape(text).replace("\n", "<br/>"), style)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(15 * mm, 9 * mm, "OneYP · Seller & courier bug evidence · September 2026")
    canvas.drawRightString(195 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleCenter", parent=styles["Title"], alignment=TA_CENTER, fontSize=22, leading=27, textColor=colors.HexColor("#0f172a")))
styles.add(ParagraphStyle(name="Subtitle", parent=styles["Normal"], alignment=TA_CENTER, fontSize=11, leading=15, textColor=colors.HexColor("#475569")))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading1"], fontSize=14, leading=18, spaceBefore=14, spaceAfter=8, textColor=colors.HexColor("#b45309")))
styles.add(ParagraphStyle(name="BugTitle", parent=styles["Heading2"], fontSize=11.5, leading=14, spaceBefore=10, spaceAfter=4, textColor=colors.HexColor("#0f172a")))
styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontSize=9.3, leading=13, spaceAfter=4))
styles.add(ParagraphStyle(name="Quote", parent=styles["BodyText"], fontSize=8.8, leading=12, leftIndent=10, textColor=colors.HexColor("#334155"), spaceAfter=3))
styles.add(ParagraphStyle(name="Meta", parent=styles["BodyText"], fontSize=8.5, leading=11, textColor=colors.HexColor("#475569")))

story = []
story += [
    Spacer(1, 18 * mm),
    Paragraph("OneYP 2027", styles["TitleCenter"]),
    Paragraph("Seller & courier bug evidence report", styles["TitleCenter"]),
    Spacer(1, 4 * mm),
    Paragraph(
        "Mexico (CDMX + Puebla) · Peru (Lima) · Service Level / OPS workshop | One topic per catalogued field bug",
        styles["Subtitle"],
    ),
    Spacer(1, 12 * mm),
]

summary_data = [
    ["Coverage", "Mexico CDMX + Puebla · Peru Lima · Service Level Sep 1"],
    ["Records included", f"{len(SELLER_COURIER_BUGS)} separate bug records (not merged)"],
    ["Store/POC names", "Bahia · Mixcoac · Los Alpes · Churubusco · Forjadores · Zavaleta · San Jerónimo · La Marina · Merino · San Pedro · BeerHub (OPS)"],
    ["Reading rule", "English quotes preserved from field; store/POC when available. Matches seller-courier-bugs-evidence-2027 catalog."],
]
t = Table([[p(a, styles["BodySmall"]), p(b, styles["BodySmall"])] for a, b in summary_data], colWidths=[35 * mm, 145 * mm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#eff6ff")),
    ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cbd5e1")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story.append(t)
story.append(Spacer(1, 8 * mm))
story.append(Paragraph("Executive reading", styles["Section"]))
story.append(p(
    "Each item below is a distinct defect from field visits and Service Level workshops — not rolled into composite cards. "
    "Themes: live map/GPS, seller session and sound, push to courier, assignment state, inventory and financial sync.",
    styles["BodySmall"],
))
story.append(PageBreak())

current_section = None
for i, (section, priority, audience, title, stores, detail, impact, quotes) in enumerate(SELLER_COURIER_BUGS, start=1):
    if section != current_section:
        if current_section is not None:
            story.append(Spacer(1, 6 * mm))
        story.append(Paragraph(section, styles["Section"]))
        current_section = section
    story.append(Paragraph(f"{i}. {priority} · {audience} · {title}", styles["BugTitle"]))
    story.append(p(f"Stores / POCs: {stores}", styles["Meta"]))
    story.append(p(f"Observed behavior: {detail}", styles["BodySmall"]))
    story.append(p(f"Impact: {impact}", styles["BodySmall"]))
    story.append(p("Evidence / quotes:", styles["BodySmall"]))
    for quote in quotes:
        story.append(p(quote, styles["Quote"]))

story.append(PageBreak())
story.append(Paragraph("Cross-country bug patterns", styles["Section"]))
cross = [
    ["Theme", "Mexico", "Peru"],
    ["GPS / frozen pin", "4/4 CDMX + Puebla map freeze", "3/3"],
    ["Push / order not reaching courier", "3/4 CDMX", "La Marina assign waiting"],
    ["Sound / seller session", "Puebla 3/5", "2/3 + Sep 1 multi-login"],
    ["SKU off still receives order", "Churubusco consumer catalog", "3/3"],
    ["Financial report (date)", "Mixcoac / Churubusco", "—"],
]
ct = Table([[p(cell, styles["BodySmall"]) for cell in row] for row in cross], colWidths=[48 * mm, 68 * mm, 64 * mm], repeatRows=1)
ct.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e3a8a")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#cbd5e1")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
    ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
]))
story.append(ct)
story.append(Spacer(1, 8 * mm))
story.append(Paragraph("Sources", styles["Section"]))
notes = [
    "Dashboard catalog: ALL/seller-courier-bugs-evidence-2027.html (field bugs only; UX/Infra excluded per methodology note).",
    "Source files: mexico-view.tsx · puebla-insights.ts · peru-insights.ts · peru-service-level.ts · ux-roadmap.ts",
    "Dashboard: https://oneyp.vercel.app",
]
for note in notes:
    story.append(p("• " + note, styles["BodySmall"]))

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=15 * mm,
    leftMargin=15 * mm,
    topMargin=15 * mm,
    bottomMargin=16 * mm,
    title="OneYP Seller and Courier Bug Evidence Report",
    author="OneYP Dashboard",
)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
