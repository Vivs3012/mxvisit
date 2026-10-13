/**
 * Single source for field-evidence counts shown in UI and exports.
 * PDF/markdown totals may include workshops and meetings not listed here — see note.
 */

export const FIELD_EVIDENCE_SCOPE = {
  countriesWithFieldVisits: 4,
  pocStoresVisited: {
    mexico: 9,
    peru: 3,
    ecuador: 0,
    colombia: 0,
  },
  /** Indexed dashboard sessions (meetings, workshops, B2B, SL vision, etc.) */
  documentedSessions: {
    mexico: 7,
    peru: 8,
    ecuador: 2,
    colombia: 2,
  },
  globalInsightRanks: 51,
  researchReviewsAppbot: 1630,
  researchSurveyRespondents: 1506,
} as const;

export const EVIDENCE_SCOPE_NOTE = {
  en:
    "POC counts are stores visited in the field. Session counts are activities indexed in this dashboard (not every slide or side meeting). If another export shows different totals, it may include research tabs or appendix sessions — use the labels on each screen.",
  pt:
    "Contagens de POC são lojas visitadas em campo. Sessões são atividades indexadas neste dashboard (não cada slide ou reunião lateral). Se outro export mostrar totais diferentes, pode incluir abas de pesquisa ou sessões do apêndice — use os rótulos de cada tela.",
};

export function formatPocTotal(): string {
  const { mexico, peru } = FIELD_EVIDENCE_SCOPE.pocStoresVisited;
  return String(mexico + peru);
}

export function formatSessionTotal(): string {
  const s = FIELD_EVIDENCE_SCOPE.documentedSessions;
  return String(s.mexico + s.peru + s.ecuador + s.colombia);
}
