# Visita México CDMX — Dashboard Export

Mexico City store visit dashboard (Jul 20–23, 2026).

## Files

| File | Size | Use case |
|------|------|----------|
| `visita-mexico-cdmx.canvas.tsx` | ~1 MB | Full version with embedded interview photos (base64) |
| `visita-mexico-cdmx-slim.canvas.tsx` | ~189 KB | **Recommended for Codex** — same content, images stripped |

## Dashboard structure

**5 main tabs (Agenda):**

1. **Store visits (Jul 20–21)** — Home KPIs, Bugs, Product, UX (nested tabs)
2. **CX meeting (Jul 22)**
3. **Product meeting (Jul 22)**
4. **OPS workshop (Jul 23)**
5. **Overall result** — Cross-trip synthesis, theme ranking, critical priorities, roadmap

## How to use in Cursor

1. Copy `visita-mexico-cdmx.canvas.tsx` to:
   ```
   ~/.cursor/projects/<your-workspace>/canvases/visita-mexico-cdmx.canvas.tsx
   ```
2. Open the canvas from the Cursor chat panel (Canvas tab).

## How to use in Codex

Upload **`visita-mexico-cdmx-slim.canvas.tsx`** — it contains all data, components, and text without the heavy base64 images.

### Stack

- Single React component file
- Imports only from `cursor/canvas` (Cursor-specific SDK)
- All data inline (stores, interviews, meetings, synthesis)
- No external API calls

### Key data structures

- `STORES` — KPI data (Bahia, Mixcoac, Los Alpes, Churubusco)
- `INTERVIEW_INSIGHTS` — per-store interview findings
- `CROSS_STORE_THEMES` — universal patterns
- `CX_MEETING`, `PRODUTO_MEETING`, `DINAMICA_OPS` — meeting notes
- `TRIP_SYNTHESIS` — overall result tab

## Source data

- Store interviews: `Bahia/`, `Mixcoac/`, `Los Alpes/`, `Churubusco/` TXT files
- KPIs: Power BI exports (data-206/207/208)
- Meetings: CX, Product, OPS transcripts (Jul 22–23)
