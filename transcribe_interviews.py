#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Transcribe store interview audios and export a complete PDF."""

import json
from datetime import datetime
from pathlib import Path

from faster_whisper import WhisperModel
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer

BASE = Path("/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas")
OUTPUT_JSON = BASE / "transcricoes_entrevistas.json"
OUTPUT_PDF = BASE / "Transcricoes_Entrevistas_Bahia_Mixcoac.pdf"

FILES = [
    ("Bahia", BASE / "Bahia" / "Bahia 1.m4a"),
    ("Bahia", BASE / "Bahia" / "Bahia 2.m4a"),
    ("Mixcoac", BASE / "Mixcoac" / "Mixcoac 1.m4a"),
    ("Mixcoac", BASE / "Mixcoac" / "Mixcoac 2.m4a"),
    ("Mixcoac", BASE / "Mixcoac" / "Mixcoac 3.m4a"),
]


def format_timestamp(seconds: float) -> str:
    total = int(seconds)
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def transcribe_file(model: WhisperModel, store: str, path: Path) -> dict:
    print(f"Transcrevendo: {path.name} ...", flush=True)
    segments_iter, info = model.transcribe(
        str(path),
        language="es",
        beam_size=5,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 500},
    )

    segments = []
    full_text_parts = []
    for seg in segments_iter:
        text = seg.text.strip()
        if not text:
            continue
        entry = {
            "start": round(seg.start, 2),
            "end": round(seg.end, 2),
            "timestamp": format_timestamp(seg.start),
            "text": text,
        }
        segments.append(entry)
        full_text_parts.append(text)

    result = {
        "store": store,
        "file": path.name,
        "language": info.language,
        "duration_seconds": round(info.duration, 2),
        "duration_label": format_timestamp(info.duration),
        "segments": segments,
        "full_text": " ".join(full_text_parts),
    }
    print(
        f"  -> {len(segments)} segmentos | {result['duration_label']} | idioma: {info.language}",
        flush=True,
    )
    return result


def load_or_transcribe() -> list:
    if OUTPUT_JSON.exists():
        with open(OUTPUT_JSON, encoding="utf-8") as f:
            data = json.load(f)
        if len(data) == len(FILES):
            print("Usando transcricoes existentes em JSON.", flush=True)
            return data

    model = WhisperModel("small", device="cpu", compute_type="int8")
    results = []
    for store, path in FILES:
        if not path.exists():
            raise FileNotFoundError(path)
        results.append(transcribe_file(model, store, path))
        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(results, f, ensure_ascii=False, indent=2)

    return results


def escape_xml(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_pdf(transcripts: list) -> None:
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="Transcricoes - Entrevistas Bahia e Mixcoac",
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Title"],
        fontSize=18,
        spaceAfter=12,
        textColor=colors.HexColor("#1a365d"),
    )
    subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=styles["Normal"],
        fontSize=10,
        textColor=colors.HexColor("#4a5568"),
        spaceAfter=20,
    )
    store_style = ParagraphStyle(
        "StoreTitle",
        parent=styles["Heading1"],
        fontSize=14,
        spaceBefore=10,
        spaceAfter=8,
        textColor=colors.HexColor("#2c5282"),
    )
    file_style = ParagraphStyle(
        "FileTitle",
        parent=styles["Heading2"],
        fontSize=12,
        spaceBefore=8,
        spaceAfter=6,
        textColor=colors.HexColor("#2d3748"),
    )
    meta_style = ParagraphStyle(
        "Meta",
        parent=styles["Normal"],
        fontSize=9,
        textColor=colors.HexColor("#718096"),
        spaceAfter=10,
    )
    segment_style = ParagraphStyle(
        "Segment",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
    )
    full_style = ParagraphStyle(
        "FullText",
        parent=styles["Normal"],
        fontSize=10,
        leading=15,
        alignment=TA_JUSTIFY,
        spaceAfter=12,
    )

    story = []
    story.append(Paragraph("Transcricoes das Entrevistas em Loja", title_style))
    story.append(
        Paragraph(
            f"Bahia e Mixcoac - CDMX | Gerado em {datetime.now().strftime('%d/%m/%Y %H:%M')}",
            subtitle_style,
        )
    )
    story.append(
        Paragraph(
            "Transcricao automatica (Whisper) dos audios gravados em ordem. "
            "Revisar termos tecnicos, nomes proprios e trechos com ruido de ambiente.",
            meta_style,
        )
    )
    story.append(Spacer(1, 0.3 * cm))

    current_store = None
    for idx, item in enumerate(transcripts):
        if item["store"] != current_store:
            if current_store is not None:
                story.append(PageBreak())
            current_store = item["store"]
            story.append(Paragraph(f"Loja: {current_store}", store_style))

        story.append(Paragraph(escape_xml(item["file"]), file_style))
        story.append(
            Paragraph(
                f"Duracao: {item['duration_label']} | Segmentos: {len(item['segments'])} | Idioma: {item['language']}",
                meta_style,
            )
        )

        story.append(Paragraph("<b>Transcricao com timestamps</b>", meta_style))
        for seg in item["segments"]:
            line = f"<b>[{seg['timestamp']}]</b> {escape_xml(seg['text'])}"
            story.append(Paragraph(line, segment_style))

        story.append(Spacer(1, 0.2 * cm))
        story.append(Paragraph("<b>Texto continuo</b>", meta_style))
        story.append(Paragraph(escape_xml(item["full_text"]), full_style))

        if idx < len(transcripts) - 1:
            story.append(PageBreak())

    doc.build(story)
    print(f"PDF gerado: {OUTPUT_PDF}", flush=True)


def main():
    transcripts = load_or_transcribe()
    build_pdf(transcripts)
    total_min = sum(t["duration_seconds"] for t in transcripts) / 60
    print(f"Concluido. {len(transcripts)} arquivos | ~{total_min:.1f} min de audio.", flush=True)


if __name__ == "__main__":
    main()
