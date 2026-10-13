import type { Locale } from "./i18n/locale";
import { getGlobalExecutiveSummary } from "./i18n/content/global-executive";
import { getGlobalConvergences, localizeGlobalInsight } from "./i18n/content/global-insights-locale";
import { getGlobalOpenQuestions } from "./i18n/content/global-roadmap-locale";
import { getGlobalResearchDecisions, getGlobalResearchSummary } from "./i18n/content/global-research-locale";
import { GLOBAL_INSIGHTS } from "./global-insights";
import { FIELD_EVIDENCE_SCOPE, EVIDENCE_SCOPE_NOTE } from "./dashboard-evidence-scope";
import { lc } from "./i18n/lc";

const CROSS_LEARNING_RANKS = [1, 2, 3] as const;

const IMPACT = {
  product: {
    en:
      "Prioritize reliability that consumers see (map, stock truth, post-purchase recovery) in parallel with Club, CRM cohorts and seller tooling — sequence squads, do not freeze rewards until ops is perfect.",
    pt:
      "Priorizar confiabilidade visível ao consumidor (mapa, estoque, recuperação pós-falha) em paralelo com Club, CRM por coorte e ferramentas seller — sequenciar squads, não congelar rewards até ops perfeita.",
  },
  operations: {
    en:
      "Measure one chain per order (availability → handoff → ETA → cancellation/recovery) and give stores daily KPIs and in-app comms instead of WhatsApp-only peaks.",
    pt:
      "Medir uma cadeia por pedido (disponibilidade → handoff → ETA → cancelamento/recuperação) e dar às lojas KPIs diários e comms no app em vez de só WhatsApp no pico.",
  },
};

export function getExecutiveHub(locale: Locale) {
  const exec = getGlobalExecutiveSummary(locale);
  const convergences = getGlobalConvergences(locale);
  const crossLearnings = CROSS_LEARNING_RANKS.map((rank) => {
    const ins = localizeGlobalInsight(
      GLOBAL_INSIGHTS.find((i) => i.rank === rank)!,
      locale,
    );
    return {
      rank,
      title: ins.title,
      observation: ins.summary,
      whyItMatters: ins.suggestion,
      coverage: ins.coverage,
      countries: ins.countries,
    };
  });

  const decisions = getGlobalResearchDecisions(locale).slice(0, 4);
  const openQuestions = getGlobalOpenQuestions(locale).slice(0, 5);
  const research = getGlobalResearchSummary(locale);

  return {
    thesis: exec.headline,
    crossLearnings,
    convergenceHighlights: convergences.slice(0, 4),
    impactProduct: lc(locale, IMPACT.product),
    impactOperations: lc(locale, IMPACT.operations),
    decisions,
    openQuestions,
    scopeLimitation: research.limitation,
    evidenceNote: lc(locale, EVIDENCE_SCOPE_NOTE),
    stats: [
      {
        label: locale === "pt" ? "Países com campo" : "Countries with field",
        value: String(FIELD_EVIDENCE_SCOPE.countriesWithFieldVisits),
      },
      {
        label: locale === "pt" ? "POCs visitadas (MX+PE)" : "POCs visited (MX+PE)",
        value: `${FIELD_EVIDENCE_SCOPE.pocStoresVisited.mexico}+${FIELD_EVIDENCE_SCOPE.pocStoresVisited.peru}`,
      },
      {
        label: locale === "pt" ? "Sessões indexadas" : "Indexed sessions",
        value: formatSessionBreakdown(locale),
      },
      {
        label: locale === "pt" ? "Insights globais (All)" : "Global insights (All)",
        value: String(FIELD_EVIDENCE_SCOPE.globalInsightRanks),
      },
    ],
  };
}

function formatSessionBreakdown(locale: Locale): string {
  const s = FIELD_EVIDENCE_SCOPE.documentedSessions;
  if (locale === "pt") {
    return `MX ${s.mexico} · PE ${s.peru} · EC ${s.ecuador} · CO ${s.colombia}`;
  }
  return `MX ${s.mexico} · PE ${s.peru} · EC ${s.ecuador} · CO ${s.colombia}`;
}
