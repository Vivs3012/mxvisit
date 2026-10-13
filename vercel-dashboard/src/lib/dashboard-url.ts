import { DEFAULT_LOCALE, parseLocale, type Locale } from "./i18n/locale";
import type { SearchLocation } from "./search";
import type { PesquisaSectionId } from "./pesquisas-data";
import { PESQUISAS_SECTIONS } from "./pesquisas-data";
import type { PueblaProjectSectionId } from "./puebla-project-shared";
import { PUEBLA_PROJECT_SECTIONS } from "./puebla-project-shared";
import type { VisitInsightsTab } from "./visit-insights";
import {
 getMexicoDateForSession,
 getPeruDateForSession,
 type MexicoDateId,
 type MexicoSessionId,
 type PeruDateId,
 type PeruSessionId,
} from "./visit-date-nav";

export type DashboardCountry =
 | "executive"
 | "themes"
 | "mexico"
 | "peru"
 | "colombia"
 | "ecuador"
 | "pesquisas"
 | "roadmap"
 | "sources"
 | "all"
 | "puebla-project";

export type DashboardUrlState = {
 lang?: Locale;
 country: DashboardCountry;
 pesquisaSection?: PesquisaSectionId;
 pueblaProjectSection?: PueblaProjectSectionId;
 mexicoSession?: MexicoSessionId;
 mexicoDate?: MexicoDateId;
 mexicoVisitTab?: VisitInsightsTab;
 peruSession?: PeruSessionId;
 peruDate?: PeruDateId;
 peruVisitTab?: VisitInsightsTab;
 visitTab?: VisitInsightsTab;
 store?: string;
};

const COUNTRIES = new Set<DashboardCountry>([
 "executive",
 "themes",
 "all",
 "mexico",
 "peru",
 "colombia",
 "ecuador",
 "pesquisas",
 "roadmap",
 "sources",
 "puebla-project",
]);

const PUEBLA_PROJECT_SESSIONS = new Set<PueblaProjectSectionId>(
 PUEBLA_PROJECT_SECTIONS.map((s) => s.id),
);

const PESQUISAS_SESSIONS = new Set<PesquisaSectionId>(
 PESQUISAS_SECTIONS.map((s) => s.id),
);

const MEXICO_SESSIONS = new Set<MexicoSessionId>([
 "visitas-lojas",
 "puebla-visit",
 "promo-workshop",
 "reuniao-cx",
 "reuniao-produto",
 "dinamica-ops",
 "resultado-geral",
 "ux-roadmap",
]);

const PERU_SESSIONS = new Set<PeruSessionId>([
 "context-meeting",
 "b2b-platform",
 "store-visits",
 "service-level",
 "workshop-0209",
 "workshop-ops",
 "workshop-consumer",
 "workshop-rewards",
 "consumer-vision",
 "overall-result",
]);

const VISIT_TABS = new Set<VisitInsightsTab>([
 "home",
 "bugs",
 "product",
 "ux",
 "operation",
 "infra",
]);

function pick<T extends string>(value: string | null, allowed: Set<T>): T | undefined {
 if (!value || !allowed.has(value as T)) return undefined;
 return value as T;
}

export function parseDashboardUrl(search: string): DashboardUrlState {
 const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
 const rawCountry = params.get("country");
 let country: DashboardCountry =
 rawCountry === "outros" || rawCountry === "competitors"
 ? "pesquisas"
 : pick(rawCountry, COUNTRIES) ?? "executive";
 if (country === "all") country = "themes";
 const mexicoSession = pick(params.get("session"), MEXICO_SESSIONS);
 const peruSession = pick(params.get("session"), PERU_SESSIONS);
 const visitTab = pick(params.get("visitTab"), VISIT_TABS);

 const rawLang = params.get("lang");
 const state: DashboardUrlState = {
 country,
...(rawLang ? { lang: parseLocale(rawLang) } : {}),
 };

 if (country === "mexico") {
 if (mexicoSession) {
 state.mexicoSession = mexicoSession;
 state.mexicoDate = getMexicoDateForSession(mexicoSession);
 }
 if (visitTab) state.mexicoVisitTab = visitTab;
 }

 if (country === "peru") {
 if (peruSession) {
 state.peruSession = peruSession;
 state.peruDate = getPeruDateForSession(peruSession);
 }
 if (visitTab) state.peruVisitTab = visitTab;
 }

 const store = params.get("store");
 if (store) state.store = store;

 if (country === "pesquisas") {
 const rawSession = params.get("session");
 const pesquisaSection =
 rawCountry === "competitors"
 ? "competitors"
 : rawSession === "learning-agenda"
 ? "churn"
 : pick(rawSession, PESQUISAS_SESSIONS);
 if (pesquisaSection) state.pesquisaSection = pesquisaSection;
 }

 if (country === "puebla-project") {
 const pueblaSection = pick(params.get("session"), PUEBLA_PROJECT_SESSIONS);
 if (pueblaSection) state.pueblaProjectSection = pueblaSection;
 }

 if (country === "sources") {
 const section = pick(params.get("session"), PESQUISAS_SESSIONS);
 if (section) state.pesquisaSection = section;
 }

 if (country === "roadmap") {
 state.mexicoSession = "ux-roadmap";
 state.mexicoDate = getMexicoDateForSession("ux-roadmap");
 }

 return state;
}

export function buildDashboardUrl(state: DashboardUrlState): string {
 const params = new URLSearchParams();
 const lang = state.lang ?? DEFAULT_LOCALE;
 if (lang !== DEFAULT_LOCALE) {
 params.set("lang", lang);
 }
 params.set("country", state.country);

 if (state.country === "mexico" && state.mexicoSession) {
 params.set("session", state.mexicoSession);
 }
 if (state.country === "peru" && state.peruSession) {
 params.set("session", state.peruSession);
 }
 if (state.country === "pesquisas" && state.pesquisaSection) {
 params.set("session", state.pesquisaSection);
 }
 if (state.country === "puebla-project" && state.pueblaProjectSection) {
 params.set("session", state.pueblaProjectSection);
 }
 if (state.country === "sources" && state.pesquisaSection) {
 params.set("session", state.pesquisaSection);
 }
 if (state.country === "roadmap") {
 params.set("session", "ux-roadmap");
 }

 const visitTab =
 state.country === "peru"
 ? state.peruVisitTab
 : state.country === "mexico"
 ? state.mexicoVisitTab
 : undefined;

 if (visitTab && visitTab !== "home") {
 params.set("visitTab", visitTab);
 }
 if (state.store && state.store !== "all") {
 params.set("store", state.store);
 }

 const qs = params.toString();
 return qs ? `?${qs}` : "";
}

export function searchLocationToUrlState(location: SearchLocation): Partial<DashboardUrlState> {
 let country = location.country as DashboardCountry;
 if (country === "all") country = "themes";
 const state: Partial<DashboardUrlState> = { country };
 if (location.mexicoTab) {
 state.mexicoSession = location.mexicoTab;
 state.mexicoDate = getMexicoDateForSession(location.mexicoTab);
 }
 if (location.peruTab) {
 state.peruSession = location.peruTab;
 state.peruDate = getPeruDateForSession(location.peruTab);
 }
 const visitTab = location.peruVisitTab ?? location.appTab;
 if (visitTab) {
 if (location.country === "peru") state.peruVisitTab = visitTab;
 if (location.country === "mexico") state.mexicoVisitTab = visitTab;
 }
 if (location.pesquisaSection) state.pesquisaSection = location.pesquisaSection;
 if (location.pueblaProjectSection) state.pueblaProjectSection = location.pueblaProjectSection;
 return state;
}
