import type { Locale } from "./i18n/locale";

/** Extra narrative shown under the summary on All-tab insight cards. */
export const INSIGHT_EXTENSION: Record<number, { en: string; pt: string }> = {
 1: {
 en: "Sellers compensate with manual refresh, phone calls and WhatsApp; dispatch SLA turns red even when the order was prepared on time.",
 pt: "Sellers compensam com refresh manual, telefone e WhatsApp; o SLA de dispatch fica vermelho mesmo quando o pedido foi preparado no prazo.",
 },
 2: {
 en: "CX and consumers interpret stale maps as late delivery, driving unnecessary tickets and eroding trust in tracking.",
 pt: "CX e consumidor interpretam mapa defasado como atraso real, gerando tickets desnecessários e perda de confiança no rastreio.",
 },
 3: {
 en: "Stockouts, seller cancellations and wrong picks rise because the catalog lies; partial orders and supervisor prevention stay blocked without quantity truth.",
 pt: "Rupturas, cancelamentos do seller e separação errada sobem porque o catálogo mente; pedidos parciais e prevenção pelo supervisor ficam bloqueados sem quantidade real.",
 },
 4: {
 en: "One POC absorbs neighbor volume, consumers game routing with repeat cancels, and ops cannot explain why a nearby client was sent elsewhere.",
 pt: "Uma POC absorve volume do vizinho, consumidores forçam roteamento com cancelamentos em série e ops não explica por que mandaram o cliente longe.",
 },
 5: {
 en: "The metric punishes the seller for courier scarcity; during events the gap between “ready” and “picked up” is structural, not operational negligence.",
 pt: "A métrica pune o seller pela escassez de courier; em eventos o gap entre “pronto” e “coletado” é estrutural, não negligência operacional.",
 },
 6: {
 en: "Disputes over bottles, door waits and wrong SKUs have no audit trail; every country visited routes coordination outside the product.",
 pt: "Disputas de vasilhame, espera na porta e SKU errado não têm trilha; todo país visitado coordena fora do produto.",
 },
 7: {
 en: "Sellers manage the business in Excel and WhatsApp because they cannot answer “how was yesterday?” or “which hour broke?” from the app.",
 pt: "Sellers gerem o negócio em Excel e WhatsApp porque não respondem “como foi ontem?” ou “qual hora quebrou?” pelo app.",
 },
 8: {
 en: "Consumer demand spikes before supply and seller tooling catch up — promos become stockouts and complaints instead of incremental orders.",
 pt: "Demanda no consumidor dispara antes de supply e ferramenta seller acompanharem — promo vira ruptura e reclamação em vez de pedido incremental.",
 },
 9: {
 en: "Opaque payouts force notebook reconciliation and slow dispute resolution; Peru WebPO proves sellers adopt when numbers are legible week by week.",
 pt: "Repasse opaco força conciliação em caderno e disputa lenta; WebPO no Peru prova adoção quando os números são legíveis semana a semana.",
 },
 10: {
 en: "Dispatchers lose the map at the exact moment they need it; assigning one order should not hide the other nineteen waiting.",
 pt: "Quem despacha perde o mapa no momento crítico; atribuir um pedido não pode esconder os outros dezenove na fila.",
 },
 11: {
 en: "Volume promos collide with physical limits — warm beer, stacked returnables and no ice erode the differentiation vs marketplaces.",
 pt: "Promo de volume bate no limite físico — cerveja quente, retornáveis empilhados e sem gelo corroem o diferencial vs marketplaces.",
 },
 12: {
 en: "Peak coordination needs minutes, not next-day email; unstructured cancellation reasons hide patterns CX could automate.",
 pt: "Coordenação no pico precisa de minutos, não e-mail no dia seguinte; motivo de cancelamento solto esconde padrão que CX poderia automatizar.",
 },
 13: {
 en: "Courier churn rises when the app is unstable and earnings opaque; peak bonuses work episodically but do not replace daily trust in the tool.",
 pt: "Churn de courier sobe com app instável e ganho opaco; bônus de pico funciona pontualmente mas não substitui confiança diária na ferramenta.",
 },
 14: {
 en: "Fill Rate and address quality are joint levers — product UX and ops pressure must move together or cancellations stay flat.",
 pt: "Fill Rate e qualidade de endereço são alavancas conjuntas — UX de produto e pressão ops precisam andar juntas ou cancelamento não move.",
 },
 15: {
 en: "Workshops and Service Level vision agree: dashboards without stock truth stay reactive; quantity unlocks partial recovery and fair dispatch.",
 pt: "Workshops e visão de Service Level concordam: dashboard sem estoque real fica reativo; quantidade destrava recuperação parcial e dispatch justo.",
 },
 16: {
 en: "Supervisors run Sunday war rooms on WhatsApp because the platform does not show live SLA, stock risk and courier dotation in one place.",
 pt: "Supervisores rodam sala de guerra no domingo no WhatsApp porque a plataforma não mostra SLA vivo, risco de ruptura e dotação de courier num lugar.",
 },
 17: {
 en: "Compensation arrives only if the consumer escalates; stores and CX work parallel threads instead of one timed, traceable case.",
 pt: "Compensação só vem se o consumidor escala; loja e CX trabalham fios paralelos em vez de um caso único, rastreável e no tempo certo.",
 },
 18: {
 en: "Growth cannot personalize or measure ROI while events disagree across MMP, Segment and Braze — football and CRM triggers wait on taxonomy.",
 pt: "Growth não personaliza nem mede ROI com eventos divergentes entre MMP, Segment e Braze — gatilhos de futebol e CRM esperam taxonomia.",
 },
 19: {
 en: "Rewards scale is gated on admin in BEES, wallet UX and fraud rules before tiers or omnichannel stories are credible in market.",
 pt: "Escala de Rewards depende de admin no BEES, UX de wallet e antifraude antes de tiers ou omnichannel serem críveis no mercado.",
 },
 20: {
 en: "Braze, notification center and in-app chat are one ecosystem bet — the same root cause as 100% WhatsApp in every visit.",
 pt: "Braze, central de notificações e chat in-app são uma aposta de ecossistema — mesma raiz do 100% WhatsApp em toda visita.",
 },
 21: {
 en: "Commercial teams run promos in parallel systems; the consumer sees the offer hours or days before the seller can fulfill it.",
 pt: "Comercial roda promo em sistemas paralelos; consumidor vê oferta horas ou dias antes do seller conseguir atender.",
 },
 22: {
 en: "Future bets (vending, football, partnerships) align across workshops but all assume core platform reliability and inventory truth first.",
 pt: "Apostas futuras (vending, futebol, parcerias) alinham entre workshops mas assumam confiabilidade básica e confiabilidade e estoque real antes.",
 },
 23: {
 en: "Returnable rules are a strategic advantage in Peru but generate 1-star reviews when the app does not explain exchange and deposit clearly.",
 pt: "Regras de retornável são vantagem estratégica no Peru mas geram 1 estrela quando o app não explica troca e depósito com clareza.",
 },
 24: {
 en: "Bots tuned for other markets fail on local payment, address and tone — CX volume stays high on coordination tickets.",
 pt: "Bots calibrados para outros mercados falham em pagamento, endereço e tom locais — volume de CX segue alto em coordenação.",
 },
 25: {
 en: "Manual coupon clusters and missing flash burn block the wallet experience consumers expect from modern loyalty programs.",
 pt: "Clusters manuais de cupom e falta de burn flash bloqueiam a experiência de wallet que o consumidor espera de loyalty moderno.",
 },
 26: {
 en: "Low online share and Ecuador’s fraud trauma show that risk controls and messaging must ship before marketing promises digital-first checkout.",
 pt: "Baixo share online e trauma de fraude no Equador mostram que controle de risco e mensagem devem vir antes de prometer checkout digital-first.",
 },
 27: {
 en: "Buy Again and multishowcases are ready to ship while map, promo visibility and address bugs still cap conversion in the field.",
 pt: "Comprar de novo e multishowcases prontos para ship enquanto mapa, visibilidade de promo e bugs de endereço ainda limitam conversão em campo.",
 },
 28: {
 en: "Community POC density is strategic for coast and insecurity, but legal pricing workflow and replenishment must exist before territorial leap.",
 pt: "Densidade Community POC é estratégica para costa e insegurança, mas fluxo legal de preço e reposição precisam existir antes do salto territorial.",
 },
 29: {
 en: "Ops tickets and user deletes to move a courier between POCs do not scale when stores close or cities shift — reassignment must be minutes.",
 pt: "Tickets e delete de usuário para mover courier entre POCs não escalam com fechamento de loja ou mudança de cidade — reassignment precisa ser minutos.",
 },
 30: {
 en: "Holdout discipline proves incrementality for prime CRM slots — a model other markets can copy once data and inventory are stable.",
 pt: "Disciplina de holdout prova incrementalidade em slots CRM premium — modelo copiável quando dados e inventário estabilizam.",
 },
 31: {
 en: "Granular DDC per POC wins at small scale but becomes Excel weight at 23+ stores — same pain Mexico and Peru feel as they grow.",
 pt: "DDC granular por POC ganha em escala pequena mas vira peso de Excel com 23+ lojas — mesma dor México e Peru ao crescer.",
 },
 32: {
 en: "External loyalty platform blocks native Club experiences; Ecuador’s top workshop vote ties to year-end migration and sampling reliability.",
 pt: "Plataforma externa de loyalty bloqueia Club nativo; top voto do workshop Equador liga à migração fim de ano e confiabilidade de sampling.",
 },
 33: {
 en: "Wrong profile and geo on first order destroy trust before the second purchase — especially where cash and new users dominate.",
 pt: "Perfil e geo errados no primeiro pedido destroem confiança antes da segunda compra — especialmente com cash e usuários novos.",
 },
 34: {
 en: "Pay-per-delivery economics make cancel-after-dispatch painful; penalties need online payment rails, not cash at the door only.",
 pt: "Economia pay-per-delivery torna cancel-after-dispatch doloroso; penalidade precisa de pagamento online, não só cash na porta.",
 },
 35: {
 en: "Rain, tips and service-fee rules still live in spreadsheets — sellers need in-app admin that matches how Ecuador actually operates.",
 pt: "Chuva, gorjeta e taxa de serviço ainda vivem em planilha — seller precisa de admin in-app alinhado à operação real do Equador.",
 },
 36: {
 en: "Supervisor cockpit and assign assist close the gap between Power BI FOR and the unused seller home — one screen for stock, SLA and riders.",
 pt: "Cockpit de supervisor e assign assist fecham o gap entre Power BI FOR e home seller não usada — uma tela para estoque, SLA e motos.",
 },
 37: {
 en: "Variant SKUs and ERP dreams are long horizon; near term is stopping promo catalog weight from breaking activation at each POC.",
 pt: "SKUs variantes e sonho ERP são horizonte longo; perto é impedir peso de catálogo promocional de quebrar ativação em cada POC.",
 },
 38: {
 en: "Weekly Excel from BEES exports is deterministic — platform should expose the same forecast couriers and supervisors already trust in chat.",
 pt: "Excel semanal de export BEES é determinístico — plataforma deve expor o mesmo forecast que couriers e supervisores já confiam no chat.",
 },
 39: {
 en: "Puebla Project shows coordination debt at scale: parallel email, BEES desync and turbo rollout need the same core reliability fixes as CDMX peaks.",
 pt: "Puebla Project mostra dívida de coordenação em escala: e-mail paralelo, desync BEES e rollout turbo precisam dos mesmos fixes de confiabilidade básica da CDMX.",
 },
 40: {
 en: "Refresh loops and store on/off desync make sellers doubt whether the platform reflects reality — especially during turbo migrations.",
 pt: "Loops de refresh e desync de loja on/off fazem seller duvidar se a plataforma reflete a realidade — especialmente em migração turbo.",
 },
 41: {
 en: "Variable-heavy POC economics need daily incentive visibility, not only a weekly summary sellers cannot reconcile to behavior.",
 pt: "Economia variável por POC precisa de visibilidade diária de incentivo, não só resumo semanal que o seller não concilia ao comportamento.",
 },
 42: {
 en: "Live counters and auto free-gift config reduce ops manual switches during strict promo windows (e.g. flash until noon).",
 pt: "Contadores ao vivo e config automática de brinde reduzem troca manual de ops em janelas promo rígidas (ex.: flash até meio-dia).",
 },
 43: {
 en: "Telão hospitality (birthday, football) aligns with Momento Inesperado — needs CRM triggers, inventory and logistics before spectacle.",
 pt: "Hospitalidade telão (aniversário, futebol) alinha com Momento Inesperado — precisa gatilhos CRM, inventário e logística antes do espetáculo.",
 },
 44: {
 en: "First orders fail when BEES says off but the back room has stock — Colombia built local scoring; product should fix SKU truth at source.",
 pt: "Primeiros pedidos falham com BEES off e estoque na loja — Colômbia criou score local; produto deve corrigir verdade de SKU na origem.",
 },
 45: {
 en: "Marketplace and night buyers need different CRM windows and retention plays than core beer cohorts — same cart ≠ same journey.",
 pt: "Marketplace e comprador noturno precisam de janelas CRM e retenção diferentes do núcleo cerveja — mesmo carrinho ≠ mesma jornada.",
 },
 46: {
 en: "Bank promos buy cheap users then churn when turned off — 2026 shift is partnerships for retention, not only acquisition spikes.",
 pt: "Promo de banco compra usuário barato e perde quando desliga — virada 2026 é parceria para retenção, não só pico de aquisição.",
 },
 47: {
 en: "Own stores hold most orders and data; allies need Top Tiendas and paypoint parity without pretending they are the same persona.",
 pt: "Lojas próprias concentram pedidos e dados; aliados precisam de Top Tiendas e paridade de paypoint sem fingir o mesmo persona.",
 },
 48: {
 en: "Weekend Torre de Control cannot scale on humans watching the map — proactive off-store alerts are the product ask.",
 pt: "Torre de Controle no fim de semana não escala com humano no mapa — alerta proativo de loja off é o pedido de produto.",
 },
 49: {
 en: "Category stockout hides SKU-level gaps allies feel daily — commercial minimum should be visible in BEES/seller, not only Power BI.",
 pt: "Ruptura por categoria esconde gap por SKU que o aliado sente todo dia — mínimo comercial deve aparecer no BEES/seller, não só Power BI.",
 },
 50: {
 en: "Understaffed Club delays missions while For You stays manual — algorithmic shelves wait on layout and sampling flexibility.",
 pt: "Club com time enxuto atrasa missões enquanto For You segue manual — prateleiras algorítmicas esperam layout e flexibilidade de sampling.",
 },
 51: {
 en: "E-invoicing pressure means order export must be adopted, not only integrated — Zé’s lesson is ERP without daily seller use fails.",
 pt: "Pressão de faturação eletrônica exige export de pedido adotado, não só integrado — lição do Zé: ERP sem uso diário do seller falha.",
 },
};

export function insightExtension(rank: number, locale: Locale): string | undefined {
 const row = INSIGHT_EXTENSION[rank];
 if (!row) return undefined;
 return locale === "pt" ? row.pt : row.en;
}
