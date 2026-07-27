#!/usr/bin/env python3
"""Pass 3: manual fixes, roteiro dedup, final EN sweep."""
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

CANVAS = Path(
    "/Users/zeuser/.cursor/projects/Users-zeuser-Documents-Cursor-Visita-MX-2026-Lojas/canvases/visita-mexico-cdmx.canvas.tsx"
)
translator = GoogleTranslator(source="auto", target="en")
cache: dict[str, str] = {}

DIRECT: dict[str, str] = {
    'const MONTHS = ["Mar", "Abr", "Mai", "Jun", "Jul"];': 'const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul"];',
    'Bug: "Bugs / problemas tecnicos"': 'Bug: "Bugs / technical issues"',
    'UX: "Melhoria de UX"': 'UX: "UX improvements"',
    'Product: "Melhoria de produto"': 'Product: "Product improvements"',
    '"Maior crescimento de volume Mar–Mai (+20%)"': '"Highest volume growth Mar–May (+20%)"',
    '"Perfect Orders 91,4% — melhor do grupo"': '"Perfect Orders 91.4% — best in the group"',
    '"Delivery man nao lembra; wrong square."': '"Courier does not remember; wrong terminal."',
    "Delivery man nao lembra; wrong square.": "Courier does not remember; wrong terminal.",
    '"Signal that the platform nao date or operational cycle. Los Alpes uses notebook + daily Excel."':
    '"Signal that the platform does not match the operational cycle. Los Alpes uses notebook + daily Excel."',
    '"Operacao manual forte (Excel de pagamentos, WhatsApp). (Bahia)"':
    '"Strong manual operations (payment Excel, WhatsApp). (Bahia)"',
    'title: "Cerveja al tiempo e produto quente — perda de venda e rating"':
    'title: "Beer at room temperature and warm product — lost sales and rating"',
    'title: "Relatorios e conciliacao ainda manuais (Excel, libreta)"':
    'title: "Reports and reconciliation still manual (Excel, notebook)"',
    'title: "Mapa operacional: UX fraca e bugs no fluxo de atribuicao"':
    'title: "Operations map: weak UX and assignment flow bugs"',
    'title: "Chat na app — hoje 100% WhatsApp e ligacao pessoal"':
    'title: "In-app chat — today 100% WhatsApp and personal calls"',
    'title: "Chat na app"': 'title: "In-app chat"',
    'title: "Chat na app (seller + courier)"': 'title: "In-app chat (seller + courier)"',
    'title: "Controle manual de pagamentos (libreta)"':
    'title: "Manual payment tracking (notebook)"',
    'title: "Conciliacao financeira manual (30 min/semana)"':
    'title: "Manual financial reconciliation (30 min/week)"',
    'title: "KPIs: entender metricas e agir"': 'title: "KPIs: understand metrics and act"',
    'title: "Overlapping usa janela de 3 horas"': 'title: "Overlapping uses a 3-hour window"',
    'Critical: "Criticall attention — all or almost all stores"':
    'Critical: "Critical attention — all or almost all stores"',
    '"Chat na app reduziria contactacao — hoje 100% WhatsApp/ligacao"':
    '"In-app chat would reduce outreach — today 100% WhatsApp/calls"',
    '"Chat na app reduziria contactacao — hoje 100% WhatsApp/ligacao. (Mixcoac)"':
    '"In-app chat would reduce outreach — today 100% WhatsApp/calls. (Mixcoac)"',
    '"Time de produto (Vivian, Canelas) + lideranca CX + Diego (novo PM exclusivo de CX)"':
    '"Product team (Vivian, Canelas) + CX leadership + Diego (new CX-only PM)"',
    '"Felipe Canelas (PM Seller/Courier/Admin), Vivian (designer), lideranca OPS (Luis, Andre, Javi, Nadia, Alex) e CX"':
    '"Felipe Canelas (PM Seller/Courier/Admin), Vivian (designer), OPS leadership (Luis, Andre, Javi, Nadia, Alex) and CX"',
    'title: "Resolucao rapida vs investigacao (referencia iFood/Didi)"':
    'title: "Fast resolution vs investigation (iFood/Didi reference)"',
    '"Chat na app — sellers ja pedem; CX valida modelo de mensagens pre-definidas no MX"':
    '"In-app chat — sellers already ask for it; CX validates pre-defined message model in MX"',
    '"Investigar fluxo de resolucao rapida (cupom parcial) e selecao de item faltante"':
    '"Explore fast-resolution flow (partial coupon) and missing-item selection"',
    '"Dinamica OPS (07/23) to prioritize real platform problems in 2027"':
    '"OPS workshop (Jul 23) to prioritize real platform problems in 2027"',
    '"Transferencia atual adiciona +2 min no SLA medio"':
    '"Current transfer adds +2 min to average SLA"',
    '"Maximo 2 POCs na cadeia (sem 3a transferencia)"':
    '"Max 2 POCs in the chain (no 3rd transfer)"',
    '"1a POC continua sendo escolhida pelo algoritmo atual (melhor KPI/proximidade)"':
    '"1st POC still chosen by current algorithm (best KPI/proximity)"',
    '"First-order retention vs rating (usuarios novos adquiridos no fim de semana do teste)"':
    '"First-order retention vs rating (new users acquired on test weekend)"',
    '"Retention frequency e tickets de CX"': '"Retention frequency and CX tickets"',
    '"Impacto em free rate, SLA, stock out, fulfillment"':
    '"Impact on free rate, SLA, stockout, fulfillment"',
    '"2 fins de semana, 1 cidade — definir qual (debate Puebla vs Tijuana vs Merida)"':
    '"2 weekends, 1 city — decide which (debate Puebla vs Tijuana vs Merida)"',
    'title: "Mapa — 2a tela mais acessada"': 'title: "Map — 2nd most accessed screen"',
    '"Criticall screen to decide who delivers each order.':
    '"Critical screen to decide who delivers each order.',
    'title: "Order Distribution e algoritmo de overlap"':
    'title: "Order distribution and overlap algorithm"',
    'title: "TESTE — Como funciona a transferencia de cancelamento hoje"':
    'title: "TEST — How cancellation transfer works today"',
    'title: "TESTE — Riscos e debates OPS (stock, SLA, geografia)"':
    'title: "TEST — OPS risks and debates (stock, SLA, geography)"',
    'title: "TESTE — Non-consumer impact, CX and experience"':
    'title: "TEST — Non-consumer impact, CX and experience"',
    'title: "TESTE — Tarifas, cidades e proposta de Andre"':
    'title: "TEST — Fares, cities and Andre\'s proposal"',
    'title: "TESTE — Design do experimento e metricas"':
    'title: "TEST — Experiment design and metrics"',
    'title: "Courier Financial Report (Jumbo) — extrato na plataforma"':
    'title: "Courier Financial Report (Jumbo) — statement on platform"',
    '"Iniciar Courier Financial Report (Jumbo) esta semana — resumo semanal na plataforma"':
    '"Launch Courier Financial Report (Jumbo) this week — weekly summary on platform"',
    'title="Teste — cidades, riscos, metricas e decisoes"':
    'title="Test — cities, risks, metrics and decisions"',
    'label: "Processo interno / Supervisao / OPS"':
    'label: "Internal process / Supervision / OPS"',
    'title: "Futuro: inbox, notificaciones y voice of consumer"':
    'title: "Future: inbox, notifications and voice of consumer"',
    'title: "Mapa de calor y concentracion de ordenes (Nadia)"':
    'title: "Heat map and order concentration (Nadia)"',
    'title: "Arbol de decision y vista unificada (estilo Uber/iFood)"':
    'title: "Decision tree and unified view (Uber/iFood style)"',
    'title: "Futuro: bots IA, SLA como apoyo y integraciones"':
    'title: "Future: AI bots, SLA as support and integrations"',
    'title: "Futuro: mapa vivo, update bloqueante y pago"':
    'title: "Future: live map, blocking update and payment"',
    'title: "Pasillos y rampages sin prioridad editable"':
    'title: "Aisles and rampages without editable priority"',
    'title: "Comunicacion comercial via WhatsApp insostenible"':
    'title: "Commercial communication via WhatsApp unsustainable"',
    '"Cada producto nuevo requiere arte + mensaje a grupos. Muchisimos grupos (nacional, ciudad, operativo, fallas, comercial). Empresarios saturados de mensajes. Inbox central resolveria."':
    '"Each new product requires art + message to groups. Many groups (national, city, ops, failures, commercial). Entrepreneurs saturated with messages. Central inbox would solve it."',
    'title: "Retencion y adquisicion (Carol / Itamar)"':
    'title: "Retention and acquisition (Carol / Itamar)"',
    'title: "Cockpit KPIs en tiempo real (Daniela / John)"':
    'title: "Real-time KPI cockpit (Daniela / John)"',
    '"Nos encantaria tener un resumen donde podamos ver el tiempo real... SLA, free rate."':
    '"We would love a summary where we can see real time... SLA, free rate."',
    'title: "Auditoria de stock y reaccion comercial lenta"':
    'title: "Stock audit and slow commercial reaction"',
    '"Comercialmente se crea una idea nueva... la reaccion operativamente es muy complicado."':
    '"Commercial creates a new idea... operational reaction is very complicated."',
    'title: "Mapa de fricciones: retrabajo entre areas"':
    'title: "Friction map: rework between areas"',
    '"Sesion incluyo mapa de fricciones: dolores recurrentes, cuellos de botella, retrabajo, puntos de ruido entre areas, momentos donde operacion se rompe."':
    '"Session included friction map: recurring pains, bottlenecks, rework, noise points between areas, moments when operations break."',
    '"Mapa de fricciones... dolores recurrentes, puntos de ruido entre areas."':
    '"Friction map... recurring pains, noise points between areas."',
    '"Se equivoca mucho... una cadena de malas experiencias."':
    '"It is often wrong... a chain of bad experiences."',
    'title: "App colapsa en dias pico y promos masivas"':
    'title: "App crashes on peak days and massive promos"',
    '"Modulo combos — prioridade comercial (Armando, 3+ anos)"':
    '"Combos module — commercial priority (Armando, 3+ years)"',
    '"Consola admin / cockpit KPIs tempo real — retomar Power BI John"':
    '"Admin console / real-time KPI cockpit — resume John Power BI"',
    '"Arbol de decision CX — benchmark Uber/iFood"':
    '"CX decision tree — Uber/iFood benchmark"',
    'label: "Meta 93%"': 'label: "Target 93%"',
    'label: "Meta 60%"': 'label: "Target 60%"',
    'label: "Meta 95%"': 'label: "Target 95%"',
    'label: "Meta 2%"': 'label: "Target 2%"',
    "Los Alpes lidera TML 10 (~68%). Churubusco mais baixo (~38%). Maior % = melhor.":
    "Los Alpes leads TML 10 (~68%). Churubusco lowest (~38%). Higher % = better.",
    "SLA 35 e TML 10: maior % = melhor. Mixcoac melhorou Fill Rate, SLA 35 e TML 10 em Jul;":
    "SLA 35 and TML 10: higher % = better. Mixcoac improved Fill Rate, SLA 35 and TML 10 in Jul;",
    "(~12 dias).": "(~12 days).",
    'trailing={`${store.orders.toLocaleString("pt-BR")} pedidos`}':
    'trailing={`${store.orders.toLocaleString("en-US")} orders`}',
    "<H3>Alertas</H3>": "<H3>Alerts</H3>",
    "<H3>Pontos positivos</H3>": "<H3>Positives</H3>",
    "<Text weight=\"semibold\">Melhor desempenho</Text>":
    "<Text weight=\"semibold\">Best performance</Text>",
    "<Text size=\"small\">Menor stockout: Los Alpes (1,3%)</Text>":
    "<Text size=\"small\">Lowest stockout: Los Alpes (1.3%)</Text>",
    "Fill Rate: Bahia (90,9%) — queda acentuada":
    "Fill Rate: Bahia (90.9%) — sharp drop",
    'trailing="Transversal"': 'trailing="Cross-store"',
    'title="ROTEIRO"': 'title="INTERVIEW SCRIPT"',
    "Jul parcial (~13 dias)": "Jul partial (~13 days)",
    'PART 1 — SELLER · Apresentation (0:05)': 'PART 1 — SELLER · Presentation (0:05)',
    "PARTE 1 — SELLER · Order distribution (0:06)": "PART 1 — SELLER · Order distribution (0:06)",
    "PARTE 1 — SELLER · Order map (0:06)": "PART 1 — SELLER · Order map (0:06)",
    "PARTE 1 — SELLER · Reporte financiero (0:08)": "PART 1 — SELLER · Financial report (0:08)",
    "PARTE 2 — COURIER · Order distribution (0:06)": "PART 2 — COURIER · Order distribution (0:06)",
    "PARTE 2 — COURIER · Historial y mejorar (0:08)": "PART 2 — COURIER · History and improvements (0:08)",
    'detail: "50% venda piso + TADA. Usam fridges extras no fim de semana. Sem gelo armazenado."':
    'detail: "50% floor sales + TADA. They use extra fridges on weekends. No stored ice."',
    "PART 1 — SELLER · Inventory + Quantity (0:08)": "PART 1 — SELLER · Inventory + Quantity (0:08)",
}


def tr(text: str) -> str:
    text = text.strip()
    if not text or len(text) < 4:
        return text
    if text in cache:
        return cache[text]
    try:
        out = translator.translate(text[:4500])
        cache[text] = out
        time.sleep(0.08)
        return out
    except Exception:
        return text


def dedup_paragraphs(body: str) -> str:
    paras = body.split("\n\n")
    out: list[str] = []
    prev = None
    for p in paras:
        p = p.strip()
        if not p:
            continue
        if p == prev:
            continue
        out.append(p)
        prev = p
    return "\n\n".join(out)


def dedup_roteiro(content: str) -> str:
    def repl(m: re.Match) -> str:
        body = m.group(1)
        body = body.replace("\\n", "\n")
        body = dedup_paragraphs(body)
        esc = body.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'body: "{esc}"'

    return re.sub(r'body: "((?:[^"\\]|\\.)*)"', repl, content)


def has_pt_es(s: str) -> bool:
    if re.search(r"[ãõáéíóúâêôçñ¿¡]", s, re.I):
        return True
    markers = (
        " nao ", " não ", " melhor ", " maior ", " menor ", " lidera ",
        " pedidos", " dias ", " alertas", " pontos ", " queda ", " semana",
        " plataforma", " usuarios", " cidade", " algoritmo", " extrato",
        " conciliacao", " contactacao", " ligacao", " operacao", " produto ",
        " chat na ", " tienda", " cuando ", " tenemos ", " hemos ", " durante ",
        " overlap de ", " esta es ", " cada hora", " nos encantaria",
        " comercialmente", " sesion ", " dolores ", " puntos ", " retrabajo",
        " se equivoca", " muchisimos", " empresarios", " rampages",
        " notificaciones", " arbol ", " futuro:", " pasillos", " retencion",
        " auditoria", " cockpit", " comunicacion", " colapsa ", " metricas ",
        " fins de ", " definir ", " iniciar ", " resumo ", " teste ",
        " problemas tecnicos", " melhoria", " relatorios", " cerveja",
        " perda ", " resolucao", " investigacao", " transferencia",
        " proposta ", " riscos ", " tarifas ", " design do ", " extrato",
        " segunda ", " acessada", " actualizando", " version de",
        " parcial ", " transversal", " roteiro", " apresentation",
    )
    low = f" {s.lower()} "
    return any(m in low for m in markers)


def translate_literals(content: str) -> str:
    reps = []
    for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', content):
        s = m.group(1)
        raw = s.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
        if len(raw) > 8000 or "base64," in raw or raw.startswith("/Users/"):
            continue
        if has_pt_es(raw):
            t = tr(raw)
            esc = t.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
            reps.append((m.start(), m.end(), f'"{esc}"'))
    for a, b, r in reversed(reps):
        content = content[:a] + r + content[b:]
    return content


def main():
    content = CANVAS.read_text(encoding="utf-8")
    for old, new in DIRECT.items():
        content = content.replace(old, new)
    print("Deduplicating roteiro blocks...")
    content = dedup_roteiro(content)
    print("Translating remaining PT/ES literals...")
    content = translate_literals(content)
    CANVAS.write_text(content, encoding="utf-8")
    print(f"Pass 3 done. {len(cache)} additional auto-translations.")


if __name__ == "__main__":
    main()
