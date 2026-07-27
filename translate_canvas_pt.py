#!/usr/bin/env python3
"""Translate canvas content to Brazilian Portuguese."""
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

CANVAS = Path(
    "/Users/zeuser/.cursor/projects/Users-zeuser-Documents-Cursor-Visita-MX-2026-Lojas/canvases/visita-mexico-cdmx.canvas.tsx"
)
BACKUP = CANVAS.with_suffix(".canvas.tsx.bak")

translator = GoogleTranslator(source="es", target="pt")
cache: dict[str, str] = {}


def translate_es(text: str) -> str:
    text = text.strip()
    if not text or len(text) < 4:
        return text
    if text in cache:
        return cache[text]
    try:
        # chunk long texts
        if len(text) <= 4500:
            out = translator.translate(text)
        else:
            parts = []
            chunk = ""
            for sentence in re.split(r"(?<=[.!?])\s+", text):
                if len(chunk) + len(sentence) < 4000:
                    chunk += (" " if chunk else "") + sentence
                else:
                    if chunk:
                        parts.append(translator.translate(chunk))
                    chunk = sentence
            if chunk:
                parts.append(translator.translate(chunk))
            out = " ".join(parts)
        cache[text] = out
        time.sleep(0.15)
        return out
    except Exception as e:
        print(f"  WARN translate fail: {e!s:.60}")
        return text


def looks_spanish(s: str) -> bool:
    if len(s) < 8:
        return False
    if "base64," in s or s.startswith("data:"):
        return False
    if re.search(r"[¿¡ñáéíóúü]", s, re.I):
        return True
    markers = (
        " que ", " los ", " las ", " del ", " está", " estan", " cómo", " como ",
        " pedido", " tienda", " repartidor", " consumidor", " aplicación",
        " no ", " sí ", " también", " porque", " cuando", " tenemos", " pueden",
    )
    low = f" {s.lower()} "
    return sum(1 for m in markers if m in low) >= 2


def roteiro_body_to_pt(body: str) -> str:
    out_lines = []
    for line in body.split("\n"):
        stripped = line.strip()
        if stripped.startswith("ES:"):
            continue
        if "ES:" in line and "PT:" in line:
            m = re.search(r"PT:\s*(.+)$", line)
            if m:
                prefix = line[: line.index("PT:")]
                out_lines.append(prefix + m.group(1).rstrip())
            continue
        if stripped.startswith("PT:"):
            indent = line[: len(line) - len(line.lstrip())]
            out_lines.append(indent + stripped[3:].lstrip())
            continue
        if stripped.startswith("→ ES:"):
            m = re.search(r"PT:\s*(.+)$", line)
            if m:
                out_lines.append("   → " + m.group(1).rstrip())
            continue
        if stripped.startswith("→") and "ES:" in stripped and "PT:" not in stripped:
            continue
        out_lines.append(line)
    return "\n".join(out_lines)


def translate_roteiro_blocks(content: str) -> str:
    def repl(m):
        title = m.group(1)
        body = m.group(2)
        # translate title if Spanish
        if looks_spanish(title):
            title = translate_es(title)
        body = roteiro_body_to_pt(body)
        body = body.replace("\\n", "\n")
        body_escaped = body.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'{{ title: "{title}", body: "{body_escaped}" }}'

    pattern = r'\{ title: "([^"]+)", body: "((?:[^"\\]|\\.)*)"\s*\}'
    return re.sub(pattern, repl, content, flags=re.DOTALL)


def translate_string_literals(content: str) -> str:
    """Translate Spanish-looking quoted strings (skip huge base64)."""
    result = []
    last = 0
    for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', content):
        s = m.group(1)
        # unescape for detection
        raw = s.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
        if len(raw) > 50000 or "base64," in raw:
            continue
        if looks_spanish(raw):
            translated = translate_es(raw)
            translated = (
                translated.replace("\\", "\\\\")
                .replace('"', '\\"')
                .replace("\n", "\\n")
            )
            result.append((m.start(), m.end(), f'"{translated}"'))
        last = m.end()
    # apply replacements from end to start
    for start, end, repl in reversed(result):
        content = content[:start] + repl + content[end:]
    return content


UI_REPLACEMENTS = [
    ("Reuniao com CX", "Reunião com CX"),
    ("Reuniao de produto", "Reunião de produto"),
    ("Dinamica de OPS", "Dinâmica de OPS"),
    ("Citacoes da reuniao", "Citações da reunião"),
    ("Citacoes representativas", "Citações representativas"),
    ("Citacoes", "Citações"),
    ("Conexao com", "Conexão com"),
    ("Proximos passos", "Próximos passos"),
    ("Temas discutidos", "Temas discutidos"),
    ("Temas apresentados e discutidos", "Temas apresentados e discutidos"),
    ("Contexto da dinamica", "Contexto da dinâmica"),
    ("Fonte: transcricao", "Fonte: transcrição"),
    ("Fonte: Dinamica/", "Fonte: Dinâmica/"),
    ("Atencao critica", "Atenção crítica"),
    ("Por que merece atencao", "Por que merece atenção"),
    ("Leitura transversal", "Leitura transversal"),
    ("padrao repetido", "padrão repetido"),
    ("padrao forte", "padrão forte"),
    ("Nao sao", "Não são"),
    ("Nao ", "Não "),
    ("nao ", "não "),
    ("Gestao", "Gestão"),
    ("gestao", "gestão"),
    ("Distribuicao", "Distribuição"),
    ("distribuicao", "distribuição"),
    ("Prognostico", "Prognóstico"),
    ("prognostico", "prognóstico"),
    ("Comunicacao", "Comunicação"),
    ("comunicacao", "comunicação"),
    ("Visao", "Visão"),
    ("visao", "visão"),
    ("Operacao", "Operação"),
    ("operacao", "operação"),
    ("Informacao", "Informação"),
    ("informacao", "informação"),
    ("Integracao", "Integração"),
    ("integracao", "integração"),
    ("Metricas", "Métricas"),
    ("metricas", "métricas"),
    ("Decisoes", "Decisões"),
    ("decisoes", "decisões"),
    ("Cidades candidatas", "Cidades candidatas"),
    ("Como funciona hoje", "Como funciona hoje"),
    ("O que muda no teste", "O que muda no teste"),
    ("Riscos levantados", "Riscos levantados"),
    ("Metricas do experimento", "Métricas do experimento"),
    ("Processo interno / Supervisao / OPS", "Processo interno / Supervisão / OPS"),
    ("Comercial / Marketplace", "Comercial / Marketplace"),
    ("alinhamentos", "alinhamentos"),
    ("transcricoes", "transcrições"),
    ("Reuniao/", "Reunião/"),
    ("Reuniao ", "Reunião "),
    ("Dinamica ", "Dinâmica "),
    ("dinamica", "dinâmica"),
    ("reuniao", "reunião"),
    ("Conexao", "Conexão"),
    ("conexao", "conexão"),
    ("apresentacao", "apresentação"),
    ("Apresentacao", "Apresentação"),
    ("introducao", "introdução"),
    ("Introduccion", "Introdução"),
    ("Finalizacion", "Finalização"),
    ("Comunicación", "Comunicação"),
    ("Gestión", "Gestão"),
    ("PARTE 1 — SELLER · Apresentación", "PARTE 1 — SELLER · Apresentação"),
    ("PARTE 2 — COURIER · Apresentación", "PARTE 2 — COURIER · Apresentação"),
    ("PARTE 2 — COURIER · Comunicación", "PARTE 2 — COURIER · Comunicação"),
    ("Conexión", "Conexão"),
    ("PARTE 1 — SELLER · Conexión", "PARTE 1 — SELLER · Conexão"),
    ("PARTE 1 — SELLER · Comunicación", "PARTE 1 — SELLER · Comunicação"),
    ("PARTE 1 — SELLER · Finalización", "PARTE 1 — SELLER · Finalização"),
    ("PARTE 1 — SELLER · Gestión", "PARTE 1 — SELLER · Gestão"),
    ("Critico", "Crítico"),
    ("portifolio", "portfólio"),
    ("maxima", "máxima"),
    ("isolados", "isolados"),
    ("diaria", "diária"),
    ("Codigo", "Código"),
    ("codigo", "código"),
    ("Validacao", "Validação"),
    ("validacao", "validação"),
    ("Configuracao", "Configuração"),
    ("configuracao", "configuração"),
    ("Experiencia", "Experiência"),
    ("experiencia", "experiência"),
    ("Personalizacao", "Personalização"),
    ("personalizacao", "personalização"),
    ("Retencao", "Retenção"),
    ("retencao", "retenção"),
    ("Adquisicion", "Aquisição"),
    ("adquisicion", "aquisição"),
    ("Eficiencia", "Eficiência"),
    ("eficiencia", "eficiência"),
    ("Supervisao", "Supervisão"),
    ("supervisao", "supervisão"),
    ("Transcricao", "Transcrição"),
    ("transcricao", "transcrição"),
    ("Cancelacion", "Cancelamento"),
    ("cancelacion", "cancelamento"),
    ("Notificacion", "Notificação"),
    ("notificacion", "notificação"),
    ("Inventario", "Inventário"),
    ("inventario", "inventário"),
    ("Poligonos", "Polígonos"),
    ("poligonos", "polígonos"),
    ("Tarifas", "Tarifas"),
    ("Arbol", "Árvore"),
    ("arbol", "árvore"),
    ("Algoritmo", "Algoritmo"),
    ("Cockpit KPIs tempo real", "Cockpit de KPIs em tempo real"),
    ("teste cancelamento", "teste de cancelamento"),
    ("Visao futura", "Visão futura"),
    ("Visao futuro", "Visão de futuro"),
    ("Ja ", "Já "),
    (" ja ", " já "),
    ("Tambem ", "Também "),
    (" tambem ", " também "),
    ("Ate ", "Até "),
    (" ate ", " até "),
    ("Sera ", "Será "),
    (" sera ", " será "),
    ("E ", "É "),
    (" e necessario", " é necessário"),
    ("necessario", "necessário"),
    ("unico", "único"),
    ("Unico", "Único"),
    ("publico", "público"),
    ("Publico", "Público"),
    ("basico", "básico"),
    ("Basico", "Básico"),
    ("historico", "histórico"),
    ("Historico", "Histórico"),
    ("automatico", "automático"),
    ("Automatico", "Automático"),
    ("dinamico", "dinâmico"),
    ("Dinamico", "Dinâmico"),
    ("tecnico", "técnico"),
    ("Tecnico", "Técnico"),
    ("periodo", "período"),
    ("Periodo", "Período"),
    ("numero", "número"),
    ("Numero", "Número"),
    ("pagina", "página"),
    ("Pagina", "Página"),
    ("secao", "seção"),
    ("Secao", "Seção"),
    ("versao", "versão"),
    ("Versao", "Versão"),
    ("avaliacao", "avaliação"),
    ("Avaliacao", "Avaliação"),
    ("priorizacao", "priorização"),
    ("Priorizacao", "Priorização"),
    ("implementacao", "implementação"),
    ("Implementacao", "Implementação"),
    ("manutencao", "manutenção"),
    ("Manutencao", "Manutenção"),
    ("producao", "produção"),
    ("Producao", "Produção"),
    ("reducao", "redução"),
    ("Reducao", "Redução"),
    ("conversao", "conversão"),
    ("Conversao", "Conversão"),
    ("evolucao", "evolução"),
    ("Evolucao", "Evolução"),
    ("solucao", "solução"),
    ("Solucao", "Solução"),
    ("funcao", "função"),
    ("Funcao", "Função"),
    ("opcoes", "opções"),
    ("Opcoes", "Opções"),
    ("condicao", "condição"),
    ("Condicao", "Condição"),
    ("situacao", "situação"),
    ("Situacao", "Situação"),
    ("informacoes", "informações"),
    ("Informacoes", "Informações"),
    ("integracoes", "integrações"),
    ("Integracoes", "Integrações"),
    ("comunicacoes", "comunicações"),
    ("Comunicacoes", "Comunicações"),
    ("notificacoes", "notificações"),
    ("Notificacoes", "Notificações"),
    ("transcricoes completas", "transcrições completas"),
    ("proxima", "próxima"),
    ("Proxima", "Próxima"),
    ("proximo", "próximo"),
    ("Proximo", "Próximo"),
    ("ultima", "última"),
    ("Ultima", "Última"),
    ("ultimo", "último"),
    ("Ultimo", "Último"),
    ("media", "média"),
    ("Media", "Média"),
    ("critico", "crítico"),
    ("Critico", "Crítico"),
    ("analise", "análise"),
    ("Analise", "Análise"),
    ("indice", "índice"),
    ("Indice", "Índice"),
    ("indicadores", "indicadores"),
    ("facil", "fácil"),
    ("Facil", "Fácil"),
    ("dificil", "difícil"),
    ("Dificil", "Difícil"),
    ("rapido", "rápido"),
    ("Rapido", "Rápido"),
    ("especifico", "específico"),
    ("Especifico", "Específico"),
    ("especifica", "específica"),
    ("Especifica", "Específica"),
    ("automatica", "automática"),
    ("Automatica", "Automática"),
    ("obrigatorio", "obrigatório"),
    ("Obrigatorio", "Obrigatório"),
    ("obrigatoria", "obrigatória"),
    ("Obrigatoria", "Obrigatória"),
    ("visivel", "visível"),
    ("Visivel", "Visível"),
    ("possivel", "possível"),
    ("Possivel", "Possível"),
    ("impossivel", "impossível"),
    ("Impossivel", "Impossível"),
    ("disponivel", "disponível"),
    ("Disponivel", "Disponível"),
    ("confiavel", "confiável"),
    ("Confiavel", "Confiável"),
    ("variavel", "variável"),
    ("Variavel", "Variável"),
    ("minimo", "mínimo"),
    ("Minimo", "Mínimo"),
    ("maximo", "máximo"),
    ("Maximo", "Máximo"),
    ("unica", "única"),
    ("Unica", "Única"),
    ("unicos", "únicos"),
    ("Unicos", "Únicos"),
    ("seria", "seria"),
    ("Seria", "Seria"),
]


def apply_ui_replacements(content: str) -> str:
    # Sort by length desc to avoid partial replacements
    for old, new in sorted(UI_REPLACEMENTS, key=lambda x: -len(x[0])):
        content = content.replace(old, new)
    return content


def main():
    print("Reading canvas...")
    content = CANVAS.read_text(encoding="utf-8")
    BACKUP.write_text(content, encoding="utf-8")
    print(f"Backup: {BACKUP}")

    print("Step 1: Roteiro ES/PT -> PT only...")
    content = translate_roteiro_blocks(content)

    print("Step 2: Translate Spanish string literals...")
    content = translate_string_literals(content)

    print("Step 3: UI accent fixes...")
    content = apply_ui_replacements(content)

    CANVAS.write_text(content, encoding="utf-8")
    print(f"Done. Translated {len(cache)} strings. Saved to {CANVAS}")


if __name__ == "__main__":
    main()
