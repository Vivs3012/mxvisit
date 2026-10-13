"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Callout, Card, CardBody, H1, H2, Row, Stack, Text } from "@/components/ui";
import { ActiveFiltersBar } from "@/components/active-filters-bar";
import { DashboardNav } from "@/components/dashboard-nav";
import { GlobalSearch } from "@/components/GlobalSearch";
import StakeholderPicker from "@/components/stakeholder-picker";
import ExportPdfButton from "@/components/export-pdf-button";
import { AdminLoginPanel } from "@/components/AdminLoginPanel";
import { SignOutButton } from "@/components/SignOutButton";
import PeruView, { type PeruAgendaTab, type PeruDateId } from "./peru-view";
import ExecutiveView from "./executive-view";
import GlobalView from "./global-view";
import SourcesMethodView from "./sources-method-view";
import EcuadorView from "./ecuador-view";
import ColombiaView from "./colombia-view";
import PesquisasView, { type PesquisaSectionId } from "./pesquisas-view";
import PueblaProjectView, { type PueblaProjectSectionId } from "./puebla-project-view";
import MexicoView, {
 CROSS_STORE_THEMES,
 CX_MEETING,
 DINAMICA_OPS,
 INTERVIEW_INSIGHTS,
 PRODUTO_MEETING,
 STORES,
 TRIP_SYNTHESIS,
} from "./mexico-view";
import {
 getDefaultMexicoSessionForDate,
 getMexicoDateForSession,
 getPeruDateForSession,
 type MexicoDateId,
 type MexicoSessionId,
} from "./visit-date-nav";
import { buildMexicoSearchDocs, buildStandaloneSearchDocs } from "./search-docs";
import type { SearchLocation } from "./search";
import {
 buildDashboardUrl,
 parseDashboardUrl,
 searchLocationToUrlState,
 type DashboardCountry,
 type DashboardUrlState,
} from "./dashboard-url";
import {
 getDefaultSessionForContext,
 type PeruContextId,
} from "./peru-context-nav";
import type { VisitInsightsTab } from "./visit-insights";
import type { StakeholderFocus } from "./stakeholder-focus";
import { LocaleBar } from "@/components/locale-bar";
import { FieldContentNotice } from "@/components/field-content-notice";
import { LocaleProvider, useLocale } from "./i18n/locale-context";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "./i18n/locale";
import { getDashboardNavGroups } from "./i18n/navigation";
import { getStakeholderOption } from "./i18n/stakeholder";
import { UI, uiTemplate } from "./i18n/ui";

type CountryTab = DashboardCountry;

type MainTab = MexicoSessionId;

const SEARCH_DOCS = [
...buildStandaloneSearchDocs(),
...buildMexicoSearchDocs({
 stores: STORES,
 interviews: INTERVIEW_INSIGHTS,
 crossThemes: CROSS_STORE_THEMES,
 cx: CX_MEETING,
 product: {
 topics: PRODUTO_MEETING.topics,
 nextSteps: PRODUTO_MEETING.nextSteps,
 context: PRODUTO_MEETING.context,
 connectsToStores: PRODUTO_MEETING.connectsToStores,
 teste: PRODUTO_MEETING.testeCancelamento,
 },
 ops: DINAMICA_OPS,
 synthesis: TRIP_SYNTHESIS,
 }),
];

function UnderConstruction({ country }: { country: string }) {
 const { t } = useLocale();
 const body = t(uiTemplate(UI.underConstructionBody, { country }));
 return (
 <Card>
 <CardBody>
 <Stack gap={8} style={{ padding: "32px 8px", textAlign: "center" }}>
 <H2>{t(UI.underConstruction)}</H2>
 <Text tone="secondary">{body}</Text>
 </Stack>
 </CardBody>
 </Card>
 );
}

function stateToUrl(state: {
 activeCountry: CountryTab;
 activeMainTab: MainTab;
 mexicoDate: MexicoDateId;
 peruDate: PeruDateId;
 peruAgenda: PeruAgendaTab;
 mexicoVisitTab: VisitInsightsTab;
 peruVisitTab: VisitInsightsTab;
 selectedStore: string;
 pesquisaSection: PesquisaSectionId;
 pueblaProjectSection: PueblaProjectSectionId;
 locale: Locale;
}): string {
 const urlState: DashboardUrlState = { country: state.activeCountry, lang: state.locale };
 if (state.activeCountry === "pesquisas" || state.activeCountry === "sources") {
 urlState.pesquisaSection = state.pesquisaSection;
 }
 if (state.activeCountry === "roadmap") {
 urlState.mexicoSession = "ux-roadmap";
 urlState.mexicoDate = getMexicoDateForSession("ux-roadmap");
 }
 if (state.activeCountry === "puebla-project") {
 urlState.pueblaProjectSection = state.pueblaProjectSection;
 }
 if (state.activeCountry === "mexico") {
 urlState.mexicoSession = state.activeMainTab;
 urlState.mexicoDate = state.mexicoDate;
 urlState.mexicoVisitTab = state.mexicoVisitTab;
 urlState.store = state.selectedStore;
 }
 if (state.activeCountry === "peru") {
 urlState.peruSession = state.peruAgenda;
 urlState.peruDate = state.peruDate;
 urlState.peruVisitTab = state.peruVisitTab;
 }
 return buildDashboardUrl(urlState);
}

function DashboardShell() {
 const { locale, setLocale, t } = useLocale();
 const navGroups = useMemo(() => getDashboardNavGroups(locale), [locale]);
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const hydrated = useRef(false);

 const [activeCountry, setActiveCountry] = useState<CountryTab>("executive");
 const [activeMainTab, setActiveMainTab] = useState<MainTab>("visitas-lojas");
 const [mexicoDate, setMexicoDate] = useState<MexicoDateId>("jul-20-21");
 const [mexicoVisitTab, setMexicoVisitTab] = useState<VisitInsightsTab>("home");
 const [selectedStore, setSelectedStore] = useState<string>("all");
 const [peruDate, setPeruDate] = useState<PeruDateId>("aug-31");
 const [peruAgenda, setPeruAgenda] = useState<PeruAgendaTab>("context-meeting");
 const [peruVisitTab, setPeruVisitTab] = useState<VisitInsightsTab>("home");
 const [highlightRoadmapId, setHighlightRoadmapId] = useState<string | null>(null);
 const [pesquisaSection, setPesquisaSection] = useState<PesquisaSectionId>("sumario");
 const [pueblaProjectSection, setPueblaProjectSection] =
 useState<PueblaProjectSectionId>("overview");
 const [stakeholderFocus, setStakeholderFocus] = useState<StakeholderFocus>("all");
 const [showStakeholderPicker, setShowStakeholderPicker] = useState(false);
 const [hasSelectedFocus, setHasSelectedFocus] = useState(false);

 const activeCountryLabel =
 navGroups
 .flatMap((g) => g.items)
 .find(
 (item): item is Extract<(typeof navGroups)[number]["items"][number], { kind: "route" }> =>
 item.kind === "route" && item.country === activeCountry,
 )?.label ?? activeCountry;

 const showFieldNotice =
 locale === "pt" &&
 (activeCountry === "mexico" ||
 activeCountry === "peru" ||
 activeCountry === "ecuador" ||
 activeCountry === "colombia" ||
 activeCountry === "puebla-project");

 useEffect(() => {
 const parsed = parseDashboardUrl(searchParams.toString());
 setActiveCountry(parsed.country);
 if (parsed.lang) setLocale(parsed.lang);
 if (parsed.mexicoSession) setActiveMainTab(parsed.mexicoSession);
 if (parsed.mexicoDate) setMexicoDate(parsed.mexicoDate);
 if (parsed.mexicoVisitTab) setMexicoVisitTab(parsed.mexicoVisitTab);
 if (parsed.peruSession) setPeruAgenda(parsed.peruSession);
 if (parsed.peruDate) setPeruDate(parsed.peruDate);
 if (parsed.peruVisitTab) setPeruVisitTab(parsed.peruVisitTab);
 if (parsed.store) setSelectedStore(parsed.store);
 if (parsed.pesquisaSection) setPesquisaSection(parsed.pesquisaSection);
 if (parsed.pueblaProjectSection) setPueblaProjectSection(parsed.pueblaProjectSection);
 if (parsed.country === "roadmap" && parsed.mexicoSession) {
 setActiveMainTab(parsed.mexicoSession);
 setMexicoDate(parsed.mexicoDate ?? getMexicoDateForSession(parsed.mexicoSession));
 }
 hydrated.current = true;
 }, [searchParams, setLocale]);

 useEffect(() => {
 const selected = sessionStorage.getItem("oneyp-stakeholder-selected") === "true";
 const savedFocus = sessionStorage.getItem("oneyp-stakeholder-focus") as StakeholderFocus | null;
 if (savedFocus === "consumer" || savedFocus === "rewards" || savedFocus === "service-level" || savedFocus === "all") {
 setStakeholderFocus(savedFocus);
 }
 setHasSelectedFocus(selected);
 if (!selected) {
 setShowStakeholderPicker(true);
 }
 }, []);

 const syncUrl = useCallback(() => {
 if (!hydrated.current) return;
 const next = stateToUrl({
 activeCountry,
 activeMainTab,
 mexicoDate,
 peruDate,
 peruAgenda,
 mexicoVisitTab,
 peruVisitTab,
 selectedStore,
 pesquisaSection,
 pueblaProjectSection,
 locale,
 });
 const current = searchParams.toString() ? `?${searchParams.toString()}` : "";
 if (next !== current) {
 router.replace(`${pathname}${next}`, { scroll: false });
 }
 }, [
 activeCountry,
 activeMainTab,
 mexicoDate,
 peruDate,
 peruAgenda,
 mexicoVisitTab,
 peruVisitTab,
 selectedStore,
 pesquisaSection,
 pueblaProjectSection,
 locale,
 pathname,
 router,
 searchParams,
 ]);

 useEffect(() => {
 try {
 localStorage.setItem(LOCALE_STORAGE_KEY, locale);
 } catch {
 /* ignore */
 }
 }, [locale]);

 useEffect(() => {
 syncUrl();
 }, [syncUrl]);

 function handleNavigateToRoadmapFromGlobal(roadmapId: string) {
 setActiveCountry("roadmap");
 setActiveMainTab("ux-roadmap");
 setMexicoDate(getMexicoDateForSession("ux-roadmap"));
 setHighlightRoadmapId(roadmapId);
 }

 function handleCountryJump(country: "mexico" | "peru") {
 setActiveCountry(country);
 }

 function handlePeruThemeNavigate(context: PeruContextId) {
 setActiveCountry("peru");
 const session = getDefaultSessionForContext(context);
 setPeruAgenda(session);
 setPeruDate(getPeruDateForSession(session));
 if (session !== "store-visits") {
 setPeruVisitTab("home");
 }
 }

 function handleMexicoDateChange(date: MexicoDateId) {
 setMexicoDate(date);
 const nextSession = getDefaultMexicoSessionForDate(date);
 if (nextSession !== "visitas-lojas" && nextSession !== "puebla-visit") {
 setMexicoVisitTab("home");
 }
 setActiveMainTab(nextSession);
 }

 function handleMexicoSessionChange(session: MainTab) {
 if (session !== "visitas-lojas" && session !== "puebla-visit") {
 setMexicoVisitTab("home");
 }
 setActiveMainTab(session);
 setMexicoDate(getMexicoDateForSession(session));
 }

 function handlePeruDateChange(date: PeruDateId) {
 setPeruDate(date);
 }

 function handlePeruSessionChange(session: PeruAgendaTab) {
 setPeruAgenda(session);
 setPeruDate(getPeruDateForSession(session));
 }

 function applySearchLocation(location: SearchLocation) {
 const partial = searchLocationToUrlState(location);
 setActiveCountry(partial.country ?? "themes");
 if (partial.mexicoSession) {
 setActiveMainTab(partial.mexicoSession);
 setMexicoDate(partial.mexicoDate ?? getMexicoDateForSession(partial.mexicoSession));
 }
 if (partial.peruSession) {
 setPeruAgenda(partial.peruSession);
 setPeruDate(partial.peruDate ?? getPeruDateForSession(partial.peruSession));
 }
 if (partial.mexicoVisitTab) setMexicoVisitTab(partial.mexicoVisitTab);
 if (partial.peruVisitTab) setPeruVisitTab(partial.peruVisitTab);
 if (partial.pesquisaSection) setPesquisaSection(partial.pesquisaSection);
 if (partial.pueblaProjectSection) setPueblaProjectSection(partial.pueblaProjectSection);
 }

 function handleSearchNavigate(location: SearchLocation) {
 applySearchLocation(location);
 if (location.appTab) setMexicoVisitTab(location.appTab);
 }

 function handleStakeholderSelect(focus: StakeholderFocus) {
 setStakeholderFocus(focus);
 setShowStakeholderPicker(false);
 setActiveCountry("themes");
 setHasSelectedFocus(true);
 sessionStorage.setItem("oneyp-stakeholder-selected", "true");
 sessionStorage.setItem("oneyp-stakeholder-focus", focus);
 }

 function handleNavigateToRoadmap(roadmapId: string) {
 setActiveCountry("roadmap");
 setActiveMainTab("ux-roadmap");
 setMexicoDate(getMexicoDateForSession("ux-roadmap"));
 setHighlightRoadmapId(roadmapId);
 }

 function handleDashboardNavigate(country: CountryTab) {
 if (country === "roadmap") {
 setActiveMainTab("ux-roadmap");
 setMexicoDate(getMexicoDateForSession("ux-roadmap"));
 }
 if (country === "sources" && pesquisaSection === "sumario") {
 setPesquisaSection("metodo");
 }
 setActiveCountry(country);
 }

 function handleThemeNavigate(focus: StakeholderFocus) {
 setStakeholderFocus(focus);
 setActiveCountry("themes");
 }

 function handleClearThemeFilter() {
 setStakeholderFocus("all");
 }

 function handleOpenSources() {
 setPesquisaSection("metodo");
 setActiveCountry("sources");
 }

 return (
 <div style={{ minHeight: "100vh" }}>
 <ExportPdfButton />
 <Stack gap={24} style={{ flex: 1, minWidth: 0, padding: 24, maxWidth: 1100 }}>
 <AdminLoginPanel />

 <Row align="center" gap={16} style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
 <H1>{t(UI.siteTitle)}</H1>
 <Row align="center" gap={12}>
 <GlobalSearch docs={SEARCH_DOCS} onNavigate={handleSearchNavigate} />
 <Button
 variant="secondary"
 onClick={() => setShowStakeholderPicker(true)}
 aria-label={t(UI.changeFocusAria)}
 >
 {t(UI.focusLabel)} {getStakeholderOption(locale, stakeholderFocus).shortLabel}
 </Button>
 <SignOutButton />
 </Row>
 </Row>

 <LocaleBar />
 <DashboardNav
 active={activeCountry}
 themeFocus={stakeholderFocus}
 onNavigate={handleDashboardNavigate}
 onThemeFocus={handleThemeNavigate}
 />

 <ActiveFiltersBar
 themeFocus={stakeholderFocus}
 showThemeFilter={activeCountry === "themes"}
 onClearTheme={handleClearThemeFilter}
 />

 {showFieldNotice && <FieldContentNotice />}

 {activeCountry === "executive" && (
 <ExecutiveView
 onExploreThemes={() => {
 setStakeholderFocus("all");
 setActiveCountry("themes");
 }}
 onOpenResearch={() => setActiveCountry("pesquisas")}
 onOpenSources={() => {
 setPesquisaSection("metodo");
 setActiveCountry("sources");
 }}
 />
 )}

 {(activeCountry === "themes" || activeCountry === "all") && (
 <GlobalView
 focus={stakeholderFocus}
 onNavigateToRoadmap={handleNavigateToRoadmapFromGlobal}
 onCountryChange={handleCountryJump}
 onPeruThemeNavigate={handlePeruThemeNavigate}
 />
 )}

 {activeCountry === "pesquisas" && (
 <PesquisasView section={pesquisaSection} onSectionChange={setPesquisaSection} />
 )}

 {activeCountry === "sources" && (
 <SourcesMethodView
 section={pesquisaSection}
 onSectionChange={setPesquisaSection}
 onOpenResearch={() => setActiveCountry("pesquisas")}
 />
 )}

 {activeCountry === "roadmap" && (
 <MexicoView
 date={mexicoDate}
 onDateChange={handleMexicoDateChange}
 activeSession="ux-roadmap"
 onSessionChange={handleMexicoSessionChange}
 visitTab={mexicoVisitTab}
 onVisitTabChange={setMexicoVisitTab}
 selectedStore={selectedStore}
 onSelectedStoreChange={setSelectedStore}
 highlightRoadmapId={highlightRoadmapId}
 onThemeFocus={handleThemeNavigate}
 onOpenSources={handleOpenSources}
 />
 )}

 {activeCountry === "puebla-project" && (
 <Stack gap={12}>
 <Callout tone="info" title={locale === "pt" ? "Projeto ligado ao México" : "Mexico-related project"}>
 <Stack gap={8}>
 <Text size="small">
 {locale === "pt"
 ? "O Projeto Puebla complementa as visitas CDMX/Puebla. Use o hub México para o restante da viagem."
 : "Puebla Project complements CDMX/Puebla visits. Use the Mexico hub for the rest of the trip."}
 </Text>
 <Button variant="secondary" onClick={() => setActiveCountry("mexico")}>
 {locale === "pt" ? "Ir para México" : "Go to Mexico"}
 </Button>
 </Stack>
 </Callout>
 <PueblaProjectView
 section={pueblaProjectSection}
 onSectionChange={setPueblaProjectSection}
 />
 </Stack>
 )}

 {activeCountry === "peru" && (
 <PeruView
 date={peruDate}
 onDateChange={handlePeruDateChange}
 agenda={peruAgenda}
 onAgendaChange={handlePeruSessionChange}
 visitTab={peruVisitTab}
 onVisitTabChange={setPeruVisitTab}
 onNavigateToRoadmap={handleNavigateToRoadmap}
 onThemeFocus={handleThemeNavigate}
 onOpenSources={handleOpenSources}
 />
 )}

 {activeCountry === "ecuador" && (
 <EcuadorView onThemeFocus={handleThemeNavigate} onOpenSources={handleOpenSources} />
 )}

 {activeCountry === "colombia" && (
 <ColombiaView onThemeFocus={handleThemeNavigate} onOpenSources={handleOpenSources} />
 )}

 {activeCountry !== "mexico" &&
 activeCountry !== "peru" &&
 activeCountry !== "ecuador" &&
 activeCountry !== "colombia" &&
 activeCountry !== "themes" &&
 activeCountry !== "all" &&
 activeCountry !== "executive" &&
 activeCountry !== "pesquisas" &&
 activeCountry !== "sources" &&
 activeCountry !== "roadmap" &&
 activeCountry !== "puebla-project" && (
 <UnderConstruction country={activeCountryLabel} />
 )}

 {activeCountry === "mexico" && (
 <Stack gap={12}>
 <Callout tone="neutral" title={locale === "pt" ? "Projeto Puebla" : "Puebla project"}>
 <Row gap={8} wrap align="center" style={{ justifyContent: "space-between" }}>
 <Text size="small">
 {locale === "pt"
 ? "Sessões dedicadas (CX, Cholula, Buenavista…) fora da linha do tempo principal."
 : "Dedicated sessions (CX, Cholula, Buenavista…) outside the main trip timeline."}
 </Text>
 <Button variant="secondary" onClick={() => setActiveCountry("puebla-project")}>
 {locale === "pt" ? "Abrir Projeto Puebla" : "Open Puebla project"}
 </Button>
 </Row>
 </Callout>
 <MexicoView
 date={mexicoDate}
 onDateChange={handleMexicoDateChange}
 activeSession={activeMainTab}
 onSessionChange={handleMexicoSessionChange}
 visitTab={mexicoVisitTab}
 onVisitTabChange={setMexicoVisitTab}
 selectedStore={selectedStore}
 onSelectedStoreChange={setSelectedStore}
 highlightRoadmapId={highlightRoadmapId}
 onThemeFocus={handleThemeNavigate}
 onOpenSources={handleOpenSources}
 />
 </Stack>
 )}
 </Stack>
 {showStakeholderPicker && (
 <StakeholderPicker
 onSelect={handleStakeholderSelect}
 canDismiss={hasSelectedFocus}
 onDismiss={() => setShowStakeholderPicker(false)}
 />
 )}
 </div>
 );
}

export default function Dashboard() {
 const searchParams = useSearchParams();
 const [locale, setLocale] = useState<Locale>(() => {
 const parsed = parseDashboardUrl(
 typeof window !== "undefined" ? window.location.search : searchParams.toString(),
 );
 if (parsed.lang) return parsed.lang;
 try {
 const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
 if (saved === "pt" || saved === "en") return saved;
 } catch {
 /* ignore */
 }
 return DEFAULT_LOCALE;
 });

 return (
 <LocaleProvider locale={locale} setLocale={setLocale}>
 <DashboardShell />
 </LocaleProvider>
 );
}
