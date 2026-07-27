#!/usr/bin/env python3
"""Translate all canvas user-facing text to English."""
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

CANVAS = Path(
    "/Users/zeuser/.cursor/projects/Users-zeuser-Documents-Cursor-Visita-MX-2026-Lojas/canvases/visita-mexico-cdmx.canvas.tsx"
)
BACKUP = CANVAS.with_suffix(".canvas.tsx.bak-en")

translator = GoogleTranslator(source="auto", target="en")
cache: dict[str, str] = {}


def translate_to_en(text: str) -> str:
    text = text.strip()
    if not text or len(text) < 3:
        return text
    if text in cache:
        return cache[text]
    try:
        if len(text) <= 4500:
            out = translator.translate(text)
        else:
            parts = []
            chunk = ""
            for part in re.split(r"(?<=[.!?])\s+", text):
                if len(chunk) + len(part) < 4000:
                    chunk += (" " if chunk else "") + part
                else:
                    if chunk:
                        parts.append(translator.translate(chunk))
                    chunk = part
            if chunk:
                parts.append(translator.translate(chunk))
            out = " ".join(parts)
        cache[text] = out
        time.sleep(0.12)
        return out
    except Exception as e:
        print(f"  WARN: {str(e)[:80]}")
        return text


def should_skip_string(raw: str) -> bool:
    if len(raw) < 6:
        return True
    if "base64," in raw or raw.startswith("data:"):
        return True
    if len(raw) > 8000:
        return True
    if re.match(r"^[a-z0-9_./:-]+$", raw, re.I) and ("/" in raw or raw.endswith((".tsx", ".txt", ".pdf", ".jpeg", ".png", ".heic", ".JPG"))):
        return True
    if raw in ("Bug", "UX", "Produto", "home", "bugs", "produto", "ux", "all", "bahia", "mixcoac", "los-alpes", "churubusco"):
        return True
    if re.match(r"^(visitas-lojas|reuniao-cx|reuniao-produto|dinamica-ops)$", raw):
        return True
    return False


def needs_translation(raw: str) -> bool:
    if should_skip_string(raw):
        return False
    # Spanish/Portuguese markers
    if re.search(r"[¿¡ãõáéíóúâêôçñü]", raw, re.I):
        return True
    markers = (
        " que ", " los ", " las ", " não ", " nao ", " são ", " sao ",
        " está", " estão", " tienda", " pedido", " repartidor", " loja",
        " entreg", " consumidor", " também", " tambem", " porque",
        " quando", " gestão", " gestao", " comunicação", " reuniao",
        " dinâmica", " dinamica", " próximo", " proximo", " citações",
        " todas as ", " para ", " com ", " uma ", " dos ", " das ",
        "Visita ", "Reunião", "Reuniao", "Dinâmica", "Dinamica",
        "entrevista", "transcrição", "transcricao", "Fonte:",
        "Contexto", "Próximos", "Proximos", "Temas ", "Por que",
        "Leitura", "Filtrar", "Comparativo", "Principais",
    )
    low = f" {raw.lower()} "
    return any(m.lower() in low for m in markers)


def roteiro_body_to_en(body: str) -> str:
    out_lines = []
    for line in body.split("\n"):
        stripped = line.strip()
        if stripped.startswith("ES:"):
            val = stripped[3:].strip()
            if val:
                out_lines.append(val)
            continue
        if stripped.startswith("PT:"):
            val = stripped[3:].strip()
            if val:
                out_lines.append(translate_to_en(val))
            continue
        if "ES:" in line and "PT:" in line:
            m = re.search(r"ES:\s*(.+?)(?:\s+PT:|$)", line)
            if m:
                prefix = line[: line.index("ES:")]
                out_lines.append(prefix + m.group(1).strip())
            continue
        if stripped.startswith("→ ES:"):
            m = re.search(r"ES:\s*(.+)$", line)
            if m:
                out_lines.append("   → " + m.group(1).strip())
            continue
        if stripped.startswith("→") and "PT:" in stripped:
            m = re.search(r"PT:\s*(.+)$", line)
            if m:
                out_lines.append("   → " + translate_to_en(m.group(1).strip()))
            continue
        out_lines.append(line)
    return "\n".join(out_lines)


def translate_roteiro_blocks(content: str) -> str:
    pattern = r'\{ title: "([^"]+)", body: "((?:[^"\\]|\\.)*)"\s*\}'

    def repl(m):
        title = m.group(1)
        body = m.group(2).replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
        new_title = translate_to_en(title) if needs_translation(title) else title
        new_body = roteiro_body_to_en(body)
        escaped = new_body.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'{{ title: "{new_title}", body: "{escaped}" }}'

    return re.sub(pattern, repl, content, flags=re.DOTALL)


def translate_string_literals(content: str) -> str:
    replacements = []
    for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', content):
        s = m.group(1)
        raw = s.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
        if needs_translation(raw):
            translated = translate_to_en(raw)
            escaped = translated.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
            replacements.append((m.start(), m.end(), f'"{escaped}"'))
    for start, end, repl in reversed(replacements):
        content = content[:start] + repl + content[end:]
    return content


DIRECT = {
    "Visita México CDMX": "Mexico City Store Visit",
    "Visitas lojas (20 e 21/07)": "Store visits (Jul 20–21)",
    "Reunião com CX (22/07)": "CX meeting (Jul 22)",
    "Reunião de produto (22/07)": "Product meeting (Jul 22)",
    "Dinâmica de OPS (23/07)": "OPS workshop (Jul 23)",
    "Reuniao com CX": "CX meeting",
    "Reuniao de produto": "Product meeting",
    "Dinamica de OPS": "OPS workshop",
    "Todas as lojas": "All stores",
    "Filtrar loja:": "Filter store:",
    "Principais alertas para a visita": "Key alerts from the visit",
    "Comparativo entre lojas": "Store comparison",
    "Insights das entrevistas": "Interview insights",
    "Por loja": "By store",
    "Bugs em todas as lojas": "Bugs across all stores",
    "Citacoes representativas": "Representative quotes",
    "Citacoes da reuniao": "Meeting quotes",
    "Citacoes": "Quotes",
    "Por que merece atencao": "Why it matters",
    "Leitura transversal — 4 lojas, 88 insights": "Cross-store read — 4 stores, 88 insights",
    "Contexto": "Context",
    "Contexto da dinamica": "Workshop context",
    "Conexao com as visitas em loja": "Connection to store visits",
    "Conexao com visitas em loja e reunioes": "Connection to store visits and meetings",
    "Temas discutidos": "Topics discussed",
    "Temas apresentados e discutidos": "Topics presented and discussed",
    "Proximos passos e alinhamentos": "Next steps and alignment",
    "Proximos passos e decisoes": "Next steps and decisions",
    "Proximos passos e prioridades": "Next steps and priorities",
    "Resumo": "Summary",
    "Visita em loja": "Store visit",
    "Nenhum item nesta categoria para o filtro selecionado.": "No items in this category for the selected filter.",
    "Total pedidos (4 lojas)": "Total orders (4 stores)",
    "Fill Rate médio": "Avg. fill rate",
    "SLA 35 médio": "Avg. SLA 35",
    "TML 10 médio": "Avg. TML 10",
    "Como funciona hoje": "How it works today",
    "O que muda no teste": "What changes in the test",
    "Riscos levantados": "Risks raised",
    "Metricas do experimento": "Experiment metrics",
    "Decisoes": "Decisions",
    "Cidades": "Cities",
    "Candidatas:": "Candidates:",
    "Descartadas:": "Ruled out:",
    "Proposta Andre:": "Andre's proposal:",
    "Cidades pequenas:": "Small cities:",
    "Cidades complexas:": "Complex cities:",
    "Atencao critica — todas ou quase todas as lojas": "Critical — all or nearly all stores",
    "Alta prioridade — padrao forte": "High priority — strong pattern",
    "Media — recorrente com impacto local": "Medium — recurring with local impact",
    "Critica": "Critical",
    "Alta": "High",
    "Media": "Medium",
    "Produto": "Product",
    "Fonte:": "Source:",
    "transcricao": "transcript",
    "transcricoes": "transcripts",
    "Guion de entrevista": "Interview script",
}


def apply_direct(content: str) -> str:
    for old, new in sorted(DIRECT.items(), key=lambda x: -len(x[0])):
        content = content.replace(old, new)
    return content


def main():
    print("Reading canvas...")
    content = CANVAS.read_text(encoding="utf-8")
    BACKUP.write_text(content, encoding="utf-8")
    print(f"Backup: {BACKUP}")

    print("Step 1: Roteiro -> English...")
    content = translate_roteiro_blocks(content)

    print("Step 2: Translate string literals...")
    content = translate_string_literals(content)

    print("Step 3: Direct UI replacements...")
    content = apply_direct(content)

    CANVAS.write_text(content, encoding="utf-8")
    print(f"Done. {len(cache)} strings translated. Saved.")


if __name__ == "__main__":
    main()
