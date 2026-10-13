import { MEXICO_VISIT_DATES } from "../../visit-date-nav";
import { PERU_VISIT_DATES } from "../../visit-date-nav";
import { getColombiaVisitDates } from "./colombia-nav-locale";
import { getEcuadorVisitDates } from "./ecuador-nav-locale";
import type { Locale } from "../locale";
import type { StakeholderFocus } from "../../stakeholder-focus";

export type CountryHubId = "mexico" | "peru" | "colombia" | "ecuador";

export type CountryHubActivity = {
  dateLabel: string;
  label: string;
  kind: "store" | "workshop" | "meeting" | "synthesis" | "other";
};

export type CountryHubContent = {
  summaryHeadline: string;
  summaryBody: string;
  themes: {
    serviceLevel: string;
    consumer: string;
    rewards: string;
  };
  activities: CountryHubActivity[];
  learnings: string[];
  localVsGlobal: string;
};

const KIND_LABEL: Record<CountryHubActivity["kind"], { en: string; pt: string }> = {
  store: { en: "Store visit", pt: "Visita à loja" },
  workshop: { en: "Workshop", pt: "Workshop" },
  meeting: { en: "Meeting", pt: "Reunião" },
  synthesis: { en: "Synthesis", pt: "Síntese" },
  other: { en: "Activity", pt: "Atividade" },
};

function activitiesFromMexico(): CountryHubActivity[] {
  return MEXICO_VISIT_DATES.flatMap((day) =>
    day.sessions.map((s) => ({
      dateLabel: day.dateLabel,
      label: s.label,
      kind:
        s.id === "visitas-lojas" || s.id === "puebla-visit"
          ? "store"
          : s.id.includes("workshop")
            ? "workshop"
            : s.id === "resultado-geral"
              ? "synthesis"
              : s.id === "ux-roadmap"
                ? "other"
                : "meeting",
    })),
  );
}

function activitiesFromPeru(locale: Locale): CountryHubActivity[] {
  return PERU_VISIT_DATES.flatMap((day) =>
    day.sessions.map((s) => ({
      dateLabel: day.dateLabel,
      label: s.label,
      kind:
        s.id === "store-visits"
          ? "store"
          : s.id.includes("workshop")
            ? "workshop"
            : s.id === "overall-result"
              ? "synthesis"
              : "meeting",
    })),
  );
}

function activitiesFromColombia(locale: Locale): CountryHubActivity[] {
  const dates = getColombiaVisitDates(locale);
  return dates.flatMap((day) =>
    day.sessions.map((s) => ({
      dateLabel: day.dateLabel,
      label: s.label,
      kind: s.id === "colombia-all" ? "synthesis" : "meeting",
    })),
  );
}

function activitiesFromEcuador(locale: Locale): CountryHubActivity[] {
  const dates = getEcuadorVisitDates(locale);
  return dates.flatMap((day) =>
    day.sessions.map((s) => ({
      dateLabel: day.dateLabel,
      label: s.label,
      kind: s.id === "oyp-workshop" ? "workshop" : "meeting",
    })),
  );
}

const HUB: Record<CountryHubId, { en: CountryHubContent; pt: CountryHubContent }> = {
  mexico: {
    en: {
      summaryHeadline: "Mexico — field anchors reliability, CX and product bets before peak",
      summaryBody:
        "CDMX store visits, Puebla peak patterns, promo workshop, CX/Product meetings and OPS dynamic. Use sessions below for chronology; Projeto Puebla holds parallel deep dives.",
      themes: {
        serviceLevel:
          "Dispatch, inventory truth, map load, expired orders — validated across CDMX and Puebla POCs.",
        consumer:
          "CX meeting, promo workshop votes, post-purchase friction and map/address UX.",
        rewards:
          "Promo workshop, Club/coupon dynamics and product meeting hooks tied to supply.",
      },
      activities: activitiesFromMexico(),
      learnings: [
        "Peak seller reliability is the consumer-visible bottleneck (map, sound, handoff).",
        "WhatsApp remains parallel ops — not a substitute for in-app comms.",
        "Roadmap items from Mexico are referenced again in Peru store visits.",
      ],
      localVsGlobal:
        "Many findings are global ranks #1–#15; Puebla adds local peak and CX depth.",
    },
    pt: {
      summaryHeadline: "México — campo ancora confiabilidade, CX e apostas de produto antes do pico",
      summaryBody:
        "Visitas CDMX, padrões de pico em Puebla, workshop de promo, reuniões CX/Produto e dinâmica OPS. Use as sessões abaixo na ordem; o Projeto Puebla traz aprofundamentos paralelos.",
      themes: {
        serviceLevel:
          "Dispatch, verdade de estoque, mapa, pedidos expirados — validado em POCs CDMX e Puebla.",
        consumer:
          "Reunião CX, votos do workshop promo, fricção pós-compra e UX de mapa/endereço.",
        rewards:
          "Workshop promo, dinâmica Club/cupom e ganchos de produto ligados ao supply.",
      },
      activities: activitiesFromMexico(),
      learnings: [
        "Confiabilidade do seller no pico é gargalo visível ao consumidor (mapa, som, handoff).",
        "WhatsApp segue como ops paralela — não substitui comms no app.",
        "Itens de roadmap do México são revalidados nas visitas do Peru.",
      ],
      localVsGlobal:
        "Vários achados têm ranks globais #1–#15; Puebla acrescenta pico local e profundidade CX.",
    },
  },
  peru: {
    en: {
      summaryHeadline: "Peru — same structural gaps, richer consumer & rewards workshops",
      summaryBody:
        "Lima context, B2B, store visits, service-level vision, Sep 2 workshops and Sep 3 consumer vision. Navigate by pillar (ops / consumer / rewards) then by date.",
      themes: {
        serviceLevel: "Store visits, B2B platform, OPS Sep 1 vision and Sep 2 ops workshop.",
        consumer: "Sep 2 consumer workshop and Sep 3 product vision — growth and UX pains.",
        rewards: "Sep 2 rewards workshop — Club, CRM cohorts, wallet and promo mechanics.",
      },
      activities: [],
      learnings: [
        "Map/GPS and quantity-less inventory repeat Mexico patterns in Lima POCs.",
        "Workshop votes prioritize live map, wallet/Club and cohort CRM.",
        "Marketplace/bank cohorts need different messaging than core beer.",
      ],
      localVsGlobal:
        "Store visit themes link to global insights; workshops add Peru-specific votes and NPS context.",
    },
    pt: {
      summaryHeadline: "Peru — mesmos gaps estruturais, workshops mais ricos em consumidor e rewards",
      summaryBody:
        "Contexto Lima, B2B, visitas, visão de nível de serviço, workshops 2 set e visão consumidor 3 set. Navegue por pilar (ops / consumidor / rewards) e depois por data.",
      themes: {
        serviceLevel: "Visitas, plataforma B2B, visão OPS 1 set e workshop ops 2 set.",
        consumer: "Workshop consumidor 2 set e visão produto 3 set — dores de growth e UX.",
        rewards: "Workshop rewards 2 set — Club, CRM por coorte, wallet e promo.",
      },
      activities: [],
      learnings: [
        "Mapa/GPS e inventário sem quantidade repetem padrões do México em POCs de Lima.",
        "Votos de workshop priorizam mapa ao vivo, wallet/Club e CRM por coorte.",
        "Coortes marketplace/banco pedem mensagens diferentes da cerveja core.",
      ],
      localVsGlobal:
        "Temas de visita ligam a insights globais; workshops trazem votos e contexto NPS do Peru.",
    },
  },
  colombia: {
    en: {
      summaryHeadline: "Colombia — one day, two lenses (growth product AM · service level PM)",
      summaryBody:
        "Sep 13 Bavaria sessions: morning product/growth/rewards intro and afternoon service-level deep dive. Start with All synthesis, then open each session for evidence.",
      themes: {
        serviceLevel: "Afternoon session — seller/courier chain, peaks and tooling.",
        consumer: "Morning — growth, CX and portfolio pains with marketplace cohorts.",
        rewards: "Morning — Club, CRM and promo mechanics with finance guardrails.",
      },
      activities: [],
      learnings: [
        "Coortes e marketplace exigem mensagens e métricas separadas da cerveja.",
        "SL afternoon converges with Mexico/Peru on dispatch and exception handling.",
        "Cards with Global # tie to cross-country ranks on the Themes tab.",
      ],
      localVsGlobal:
        "Most insights are Colombia-local with explicit Global # when homologated.",
    },
    pt: {
      summaryHeadline: "Colômbia — um dia, duas lentes (produto AM · nível de serviço PM)",
      summaryBody:
        "Sessões 13 set Bavaria: manhã produto/growth/rewards e tarde nível de serviço. Comece pela síntese All e abra cada sessão para evidências.",
      themes: {
        serviceLevel: "Tarde — cadeia seller/courier, picos e ferramentas.",
        consumer: "Manhã — growth, CX e dores de portfólio com coortes marketplace.",
        rewards: "Manhã — Club, CRM e promo com guardrails de finance.",
      },
      activities: [],
      learnings: [
        "Coortes e marketplace exigem mensagens e métricas separadas da cerveja.",
        "SL da tarde converge com México/Peru em dispatch e exceções.",
        "Cards com Global # apontam para ranks cross-country na aba Temas.",
      ],
      localVsGlobal:
        "Maioria dos achados é local à Colômbia, com Global # quando homologado.",
    },
  },
  ecuador: {
    en: {
      summaryHeadline: "Ecuador — vision prep and OYP workshop (Oct 2026)",
      summaryBody:
        "Product vision context and Oct 8 workshop pains/dreams. Smaller footprint than MX/PE but same portfolio story on community, peaks and loyalty.",
      themes: {
        serviceLevel: "Workshop pains on peaks, sellers and delivery reliability.",
        consumer: "Vision topics on community POC, NPS and occasion-based growth.",
        rewards: "Dream backlog and hospitality ideas tied to Club and frequency.",
      },
      activities: [],
      learnings: [
        "Workshop vote winners align with map, stock truth and recovery themes.",
        "NPS snapshot grounds emotional loyalty vs operational failures.",
        "City coverage notes where field depth is still thin.",
      ],
      localVsGlobal:
        "Several themes echo global ranks; treat thin field coverage as hypothesis until more POCs.",
    },
    pt: {
      summaryHeadline: "Equador — preparação de visão e workshop OYP (out 2026)",
      summaryBody:
        "Contexto de visão de produto e workshop 8 out (dores/sonhos). Menor pegada que MX/PE, mesma história de portfólio em comunidade, picos e loyalty.",
      themes: {
        serviceLevel: "Dores do workshop sobre picos, sellers e confiabilidade de entrega.",
        consumer: "Tópicos de visão em POC comunidade, NPS e growth por ocasião.",
        rewards: "Backlog de sonhos e hospitality ligados a Club e frequência.",
      },
      activities: [],
      learnings: [
        "Vencedores de voto no workshop alinham com mapa, estoque e recuperação.",
        "Snapshot NPS ancora loyalty emocional vs falhas operacionais.",
        "Cobertura por cidade mostra onde o campo ainda é fino.",
      ],
      localVsGlobal:
        "Vários temas ecoam ranks globais; trate cobertura fina como hipótese até mais POCs.",
    },
  },
};

export function getCountryHubContent(locale: Locale, country: CountryHubId): CountryHubContent {
  const base = HUB[country][locale];
  if (country === "peru" && base.activities.length === 0) {
    return { ...base, activities: activitiesFromPeru(locale) };
  }
  if (country === "colombia" && base.activities.length === 0) {
    return { ...base, activities: activitiesFromColombia(locale) };
  }
  if (country === "ecuador" && base.activities.length === 0) {
    return { ...base, activities: activitiesFromEcuador(locale) };
  }
  return base;
}

export function activityKindLabel(locale: Locale, kind: CountryHubActivity["kind"]): string {
  return KIND_LABEL[kind][locale];
}

export function themeFocusLabel(locale: Locale, focus: StakeholderFocus): string {
  if (focus === "service-level") return locale === "pt" ? "Nível de serviço" : "Service level";
  if (focus === "consumer") return locale === "pt" ? "Consumidor" : "Consumer";
  if (focus === "rewards") return locale === "pt" ? "Rewards" : "Rewards";
  return locale === "pt" ? "Todos os temas" : "All themes";
}
