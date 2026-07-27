#!/usr/bin/env python3
"""Second pass: finish English translation for remaining PT/ES strings."""
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

CANVAS = Path(
    "/Users/zeuser/.cursor/projects/Users-zeuser-Documents-Cursor-Visita-MX-2026-Lojas/canvases/visita-mexico-cdmx.canvas.tsx"
)
translator = GoogleTranslator(source="auto", target="en")
cache: dict[str, str] = {}


def tr(text: str) -> str:
    text = text.strip()
    if not text or len(text) < 4:
        return text
    if text in cache:
        return cache[text]
    try:
        out = translator.translate(text[:4500])
        cache[text] = out
        time.sleep(0.1)
        return out
    except Exception:
        return text


def has_pt_es(s: str) -> bool:
    if re.search(r"[ãõáéíóúâêôçñ¿¡]", s, re.I):
        return True
    markers = (
        " nao ", " não ", " em ", " por ", " para ", " com ", " das ", " dos ",
        " uma ", " são ", " sao ", " loja", " pedido", " tienda", " gestao",
        " gestão", " comunicação", " entrevista", " mensal", " categoria",
        " despencou", " abaixo", " citacoes", " Sintese", " Clique",
        " Padroes", " isolados", " distribuicao", " inventario", " capacitacion",
        " desactualizados", " colapso", " quincena", " carrito", " manuales",
        " configuracao", " poligono", " retencao", " usuarios", " notificacoes",
    )
    low = f" {s.lower()} "
    return any(m in low for m in markers)


def translate_literals(content: str) -> str:
    reps = []
    for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', content):
        s = m.group(1)
        raw = s.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
        if len(raw) > 8000 or "base64," in raw:
            continue
        if has_pt_es(raw):
            t = tr(raw)
            esc = t.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
            reps.append((m.start(), m.end(), f'"{esc}"'))
    for a, b, r in reversed(reps):
        content = content[:a] + r + content[b:]
    return content


DIRECT = {
    "Operacao: \"Operacao e processo\"": "Operacao: \"Operations & process\"",
    "Infra: \"Infra fisica / hardware\"": "Infra: \"Physical infra / hardware\"",
    "Operacao / equipe": "Operations / team",
    "Clique na foto para abrir em tamanho original.": "Click the photo to open full size.",
    "Padroes reportados nas 4 lojas visitadas — prioridade maxima do portifolio.": "Patterns reported across all 4 visited stores — highest portfolio priority.",
    "Os mesmos temas voltam em Bahia, Mixcoac, Los Alpes e Churubusco. Nao sao casos\n        isolados: GPS, inventario com quantidade e chat na app aparecem em todas. Overlapping e\n        distribuicao de pedidos concentram a dor operacional. KPIs em 7 dias impedem gestao\n        diaria em todas as entrevistas de seller.": "The same themes recur in Bahia, Mixcoac, Los Alpes and Churubusco. These are not isolated cases: GPS, inventory with quantity, and in-app chat appear everywhere. Overlapping and order distribution concentrate operational pain. 7-day KPIs prevent daily management in all seller interviews.",
    "{total} itens de {visible.length} loja(s) · citacoes literais das entrevistas": "{total} items from {visible.length} store(s) · verbatim interview quotes",
    "Bahia com Fill Rate em queda livre (−8 pp Jun→Jul). Mixcoac com stockout de 17% na\n        categoria Others. Churubusco com menor TML 10 do grupo (38%).\n        Bahia e Mixcoac com SLA 35 abaixo de 90%. Entrevistas confirmam bugs de GPS/mapa,\n        overlapping e necessidade de chat na app — padrao repetido em Churubusco e Los Alpes.": "Bahia with fill rate in free fall (−8 pp Jun→Jul). Mixcoac with 17% stockout in Others. Churubusco with lowest TML 10 in the group (38%). Bahia and Mixcoac with SLA 35 below 90%. Interviews confirm GPS/map bugs, overlapping, and need for in-app chat — pattern repeated in Churubusco and Los Alpes.",
    "Sintese das entrevistas em loja (TXT) — Bahia, Mixcoac, Los Alpes e Churubusco, Jul/2026.\n        Organizado por categoria, com citacoes literais.": "Summary of in-store interviews (TXT) — Bahia, Mixcoac, Los Alpes and Churubusco, Jul/2026. Organized by category with verbatim quotes.",
    "Fill Rate mensal por loja": "Monthly fill rate by store",
    "Bahia despencou em Jul. Mixcoac recuperou após vale em Mai (90,6%).": "Bahia dropped sharply in Jul. Mixcoac recovered after May trough (90.6%).",
    "TML 10 mensal por loja": "Monthly TML 10 by store",
    "SLA 35 mensal por loja": "Monthly SLA 35 by store",
    "Bahia e Mixcoac abaixo de 90% em vários meses. Los Alpes caiu de 97,7% (Mar).": "Bahia and Mixcoac below 90% in several months. Los Alpes fell from 97.7% (Mar).",
    "Stockout mensal por loja": "Monthly stockout by store",
    "Churubusco melhorou de 3,0% para 1,1%. Bahia e Mixcoac estáveis ~3%.": "Churubusco improved from 3.0% to 1.1%. Bahia and Mixcoac stable ~3%.",
    "Volume de pedidos mensal por loja": "Monthly order volume by store",
    "Mixcoac lidera volume. Los Alpes cresceu até Mai (2.133) e estabilizou. Jul parcial": "Mixcoac leads volume. Los Alpes grew through May (2,133) and stabilized. Jul partial",
    "Mudanças Jun → Jul 2026": "Changes Jun → Jul 2026",
    "todas as lojas ganharam TML 10 no período.": "all stores gained TML 10 in the period.",
    "Detalhe por loja": "Detail by store",
    "Stockout por categoria (%)": "Stockout by category (%)",
    "Entrevista em loja — destaques": "In-store interview — highlights",
    "Ranking rápido — quem lidera e quem precisa de atenção": "Quick ranking — leaders and stores needing attention",
    "Precisa de atenção na visita": "Needs attention on visit",
    "Stockout crítico: Mixcoac Others (17%)": "Critical stockout: Mixcoac Others (17%)",
    "Interview script México — Seller (60 min) + Courier (30 min). ES + PT em cada bloco.": "Mexico interview script — Seller (60 min) + Courier (30 min). English in each block.",
    "Source: exports Power BI (data-206 KPIs diários, data-207/208 stockout) · Período filtrado": "Source: Power BI exports (data-206 daily KPIs, data-207/208 stockout) · Filtered period",
    "PARTE 1 — SELLER · Aceitar todos (0:02)": "PART 1 — SELLER · Accept all (0:02)",
    "OPS Dynamics (07/23)": "OPS workshop (Jul 23)",
    "Meeting with CX (07/22)": "CX meeting (Jul 22)",
    "Product meeting (07/22)": "Product meeting (Jul 22)",
    "Store visits (20 and 21/07)": "Store visits (Jul 20–21)",
    "Source: Dinamica/St Isidro Suites 4.pdf + 4 (2).pdf + transcripts completas audios 4 e 5": "Source: Dinamica/St Isidro Suites 4.pdf + 4 (2).pdf + full transcripts audios 4 and 5",
    "Chat na app (seller-courier e seller-cliente) substituiria WhatsApp": "In-app chat (seller-courier and seller-client) would replace WhatsApp",
    "Distribuicao lenta em alta demanda": "Slow distribution under high demand",
    "KPIs em 7 dias — sem visao diaria": "7-day KPIs — no daily view",
    "Inventario sem filtros por categoria/marca": "Inventory without category/brand filters",
    "Computadora nova por audio ruim na anterior": "New computer due to poor audio on previous one",
    "Cerveja al tiempo (nao so fria)": "Beer at room temperature (not just cold)",
    "Relatorio de vendas por produto (nao Top 10)": "Sales report by product (not Top 10)",
    "Conciliacao financeira por confianca": "Financial reconciliation by trust",
    "Cancelamentos por telefone desatualizado": "Cancellations due to outdated phone",
    "Subir escadas vs experiencia do cliente": "Climbing stairs vs customer experience",
    "Pagamento de canceladas (Monterrey)": "Payment for cancelled orders (Monterrey)",
    "Notificacao 'it has arrived' nao consumer alert": "Arrival notification does not alert consumer",
}


def main():
    content = CANVAS.read_text(encoding="utf-8")
    for old, new in DIRECT.items():
        content = content.replace(old, new)
    print("Translating remaining PT/ES literals...")
    content = translate_literals(content)
    CANVAS.write_text(content, encoding="utf-8")
    print(f"Pass 2 done. {len(cache)} additional strings.")


if __name__ == "__main__":
    main()
