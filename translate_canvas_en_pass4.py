#!/usr/bin/env python3
"""Pass 4: translate remaining PT/ES titles, quotes, and clean roteiro."""
import re
import time
from pathlib import Path
from typing import Optional

from deep_translator import GoogleTranslator

CANVAS = Path(
    "/Users/zeuser/.cursor/projects/Users-zeuser-Documents-Cursor-Visita-MX-2026-Lojas/canvases/visita-mexico-cdmx.canvas.tsx"
)
translator = GoogleTranslator(source="auto", target="en")
cache: dict[str, str] = {}

DIRECT = {
    'title: "Chat seller-courier e seller-cliente na app"':
    'title: "In-app chat seller-courier and seller-client"',
    'title: "Chat seller-cliente e courier-cliente"':
    'title: "Seller-client and courier-client chat"',
    'title: "Exhibicao pequena, bodega separada"':
    'title: "Small display, separate warehouse"',
    'title: "Reembolso sem telefone do cliente no e-mail"':
    'title: "Refund without customer phone in email"',
    'title: "Diferenca de preco promocional Modelorama"':
    'title: "Modelorama promotional price difference"',
    "Rating: Bahia e Los Alpes (4,91)": "Rating: Bahia and Los Alpes (4.91)",
    "(teste Bolivia, Braze)": "(Bolivia test, Braze)",
    '"Luego si tarda en actualizarse... ya no abren el mapa como tal. (Los Alpes)"':
    '"Then if it takes time to update... they no longer open the map as such. (Los Alpes)"',
    '"Ya no aparece la ubicacion de la tiendita. (Churubusco)"':
    '"The little store location no longer appears. (Churubusco)"',
    '"Nunca vamos a hacer un cambio de mas de 50% de nivel de operacion."':
    '"We will never make a change of more than 50% of the operation level."',
    '"Zonas de calor intenso, llegar tarde es igual a Michel esta caliente."':
    '"Intense heat zones, arriving late means the product is warm."',
    '"Zendesk no retiene estos campos. Entonces ahorita todo es manual. El agente llena todo manual."':
    '"Zendesk does not retain these fields. Right now everything is manual. The agent fills everything manually."',
}


def tr(text: str) -> str:
    if not text or len(text.strip()) < 4:
        return text
    if text in cache:
        return cache[text]
    try:
        out = translator.translate(text[:4500])
        cache[text] = out
        time.sleep(0.07)
        return out
    except Exception:
        return text


def clean_roteiro_line(line: str) -> Optional[str]:
    line = line.strip()
    if not line:
        return None
    # Drop ES:/EN: prefixed lines when they're interview script markers
    if re.match(r"^\d+\.\s*(ES|EN):\s", line):
        return None
    if re.match(r"^(ES|EN):\s", line):
        return None
    return line


def clean_roteiro_body(body: str) -> str:
    lines = body.replace("\\n", "\n").split("\n")
    cleaned: list[str] = []
    prev = None
    for raw in lines:
        line = clean_roteiro_line(raw)
        if line is None:
            continue
        if line == prev:
            continue
        cleaned.append(line)
        prev = line
    # dedup paragraphs
    text = "\n".join(cleaned)
    paras = text.split("\n\n")
    out: list[str] = []
    prev_p = None
    for p in paras:
        p = p.strip()
        if not p or p == prev_p:
            continue
        out.append(p)
        prev_p = p
    return "\n\n".join(out)


def dedup_roteiro(content: str) -> str:
    def repl(m: re.Match) -> str:
        body = m.group(1)
        body = body.replace("\\n", "\n")
        body = clean_roteiro_body(body)
        esc = body.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'body: "{esc}"'

    return re.sub(r'body: "((?:[^"\\]|\\.)*)"', repl, content)


def looks_non_english(s: str) -> bool:
    if re.search(r"[ãõáéíóúâêôçñ¿¡]", s, re.I):
        return True
    markers = (
        " si ", " te ", " el ", " la ", " los ", " las ", " cuando ", " estamos ",
        " nunca ", " durante ", " hemos ", " zendesk no", " yo soy", " cupon ",
        " complicado", " ayudaria", " muchisimo", " cobertura", " escriben ",
        " aparece", " visibilidad", " vibra", " circulito", " escondidos ",
        " buscas ", " bodega ", " promocion", " marcaba ", " llegaban ",
        " retiene ", " campos", " ahorita ", " agente ", " llena ", " vamos a",
        " nivel de", " calor ", " llegar ", " tarde ", " igual ", " caliente",
        " transferencia", " crecimiento", " estatus", " cancelamiento",
        " anotamos ", " envases", " reembolso ", " telefone", " diferenca ",
        " preco ", " exhibicao ", " pequena", " na app", " e seller",
        " cuanto ", " vendi ", " serviria", " producto de", " mes pasado",
        " agarre ", " atasque", " lanzaron", " ubicacion", " tiendita",
        " luego si", " actualizarse", " abren el", " mapa como", " algunos ",
        " ponen ", " diente ", " telefono", " perdio", " contactarlos",
        " aplicacion ", " gigas", " podemos ver", " pop de", " al lado",
        " a mi no", " top ten", " numero de",
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
        if looks_non_english(raw):
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
    print("Cleaning roteiro (remove ES/EN markers + dupes)...")
    content = dedup_roteiro(content)
    print("Translating remaining non-English literals...")
    content = translate_literals(content)
    CANVAS.write_text(content, encoding="utf-8")
    print(f"Pass 4 done. {len(cache)} auto-translations.")


if __name__ == "__main__":
    main()
