import {
 EC_WORKSHOP_OCT08_CROSS_THEMES,
 EC_WORKSHOP_OCT08_DREAMS,
 EC_WORKSHOP_OCT08_EXECUTIVE,
 EC_WORKSHOP_OCT08_HOSPITALITY,
 EC_WORKSHOP_OCT08_INSIGHTS,
 EC_WORKSHOP_OCT08_META,
 EC_WORKSHOP_OCT08_VOTE_WINNERS,
 type EcWorkshopInsight,
} from "../../ecuador-workshop-oct08";
import type { Locale } from "../locale";

export type EcWorkshopUi = {
 workshopFormat: string;
 insightsTitle: string;
 insightsLead: string;
 voteChallenges: string;
 voteDreams: string;
 dreamBacklog: string;
 hospitality: string;
 crossThemes: string;
 sourceLine: string;
 productPrefix: string;
 votesLabel: (n: number) => string;
};

const UI_PT: EcWorkshopUi = {
 workshopFormat: "Formato do workshop",
 insightsTitle: "Insights do quadro",
 insightsLead:
 "Extraídos de post-its, microfone aberto e síntese das facilitadoras — ordenados por prioridade.",
 voteChallenges: "Votação — desafios de curto prazo",
 voteDreams: "Votação sonhos — horizonte longo",
 dreamBacklog: "Backlog de sonhos (por pilar)",
 hospitality: "Hospitalidade — ideias “telão de cinema”",
 crossThemes: "Temas transversais",
 sourceLine: "Fonte: Equador/08:10 - Workshop · transcrição Lucid ({date})",
 productPrefix: "Produto:",
 votesLabel: (n) => `${n} votos`,
};

const UI_EN: EcWorkshopUi = {
 workshopFormat: "Workshop format",
 insightsTitle: "Insights from the board",
 insightsLead:
 "Extracted from post-its, open mic, and facilitator synthesis — ordered by priority.",
 voteChallenges: "Dot voting — near-term challenges",
 voteDreams: "Dreams vote — longer horizon",
 dreamBacklog: "Dream backlog (by pillar)",
 hospitality: "Hospitality — “telão de cinema” ideas",
 crossThemes: "Cross-themes",
 sourceLine: "Source: Equador/08:10 - Workshop · Lucid transcript ({date})",
 productPrefix: "Product:",
 votesLabel: (n) => `${n} votes`,
};

export function getEcuadorWorkshopUi(locale: Locale): EcWorkshopUi {
 return locale === "pt" ? UI_PT : UI_EN;
}

export function formatEcWorkshopPriority(
 locale: Locale,
 p: EcWorkshopInsight["priority"],
): string {
 if (locale === "en") return p;
 const map: Record<EcWorkshopInsight["priority"], string> = {
 Critical: "Crítico",
 High: "Alto",
 Medium: "Médio",
 };
 return map[p];
}

const META_PT = {
 title: "Workshop OYP — Equador",
 location: "Remoto · Lucid",
 facilitators: "Vivian (design), Tiago (produto), Karen/Marjo (liderança Equador)",
 participants:
 "Equador: Marjo, Karencita, Christian, Lili, Cindy (CRM), Luis (Admin), supervisores, ops. Brasil: produto e design.",
 format:
 "Quadro único (Consumidor + Nível de serviço + Rewards). Post-its → microfone aberto → votação (3 votos/pilar) → sonhos → segunda votação → ideação hospitalidade “telão”.",
};

export function getEcuadorWorkshopMeta(locale: Locale) {
 const base = EC_WORKSHOP_OCT08_META;
 if (locale === "en") return base;
 return {...base,...META_PT };
}

const EXEC_PT = {
 headline:
 "O workshop de 8 out no Equador converge em verdade de estoque, confiança em pagamentos e economia do motorizado — com integração Club TaDa e ferramentas de POC como apostas votadas de curto prazo.",
 paragraphs: [
 "Operações dominou o quadro de dores: estoque aparece como zero ou infinito, POCs não têm quantidade ao vivo e a migração pós-BEES eliminou o fluxo diário do Vitex. Supervisores querem estoque teórico de abertura alimentado por vendas, export Excel para fechamento de caixa e menos cópia manual de códigos de pedido. Admin (Luis) pediu taxas de entrega dinâmicas por faixa de distância, sobretaxa de chuva, gorjetas e taxa de serviço — o Equador cobra ~US$ 1.500 fixos seja 5 ou 30 minutos de corrida.",
 "Dores de consumidor reforçam por que o gateway segue desligado: cartões reutilizados sem OTP/Face ID, fraude disparou e bancos forçaram estornos. Sem pagamento online com controle de risco, multas por cancelamento após despacho não funcionam. NPS do primeiro pedido sofre porque o usuário não edita telefone, endereço ou e-mail sem ticket ou exclusão de conta; camadas de mapa não resolvem pontos de referência (ex. shoppings), gerando pin errado e cancelamentos.",
 "Rewards/CRM: Club TaDa em plataforma externa é doloroso — integração até fim do ano é o voto #1 (4). Cargas CSV de sampling falham no Equador apesar de funcionar em outros países. Mecânicas promocionais duplicam SKUs por variante de cor e incham o app. Sonhos apontam inventário nível ERP/SAP, dashboards de supervisor no BizWam, split pay (“Círculos”), assinaturas e competições cross-country entre dark stores.",
 ],
 stats: [
 { label: "Rodadas de voto", value: "2" },
 { label: "Mais votos (desafio)", value: "Club TaDa (4)" },
 { label: "Pilares no quadro único", value: "3" },
 { label: "Ideias de hospitalidade", value: "10+" },
 ],
};

export function getEcuadorWorkshopExecutive(locale: Locale) {
 if (locale === "en") return EC_WORKSHOP_OCT08_EXECUTIVE;
 return EXEC_PT;
}

const PILLAR_PT: Record<string, string> = {
 Operations: "Operações",
 Consumer: "Consumidor",
 Rewards: "Rewards",
 Admin: "Admin",
 Cross: "Transversal",
};

function localizePillar(locale: Locale, pillar: string): string {
 if (locale === "en") return pillar;
 return PILLAR_PT[pillar] ?? pillar;
}

const INSIGHT_PT: Record<
 string,
 Pick<EcWorkshopInsight, "title" | "detail" | "productHook" | "quotes">
> = {
 "inventory-live": {
 title: "Quantidade de estoque ao vivo — zero/infinito e pico de venda",
 detail:
 "POCs querem lançar unidades por SKU (estilo Vitex) com decremento automático e desligar em zero. Hoje regras de Pareto (ex. off com 4 unidades) são manuais; no pico o SKU pode ficar “on” e gerar cancelamentos.",
 productHook: "Arquivo de estoque de abertura + dedução de vendas — alinhar com MVP de quantidade Peru/MX.",
 quotes: [
 "Estoque zero ou infinito — precisamos ver inventário ao vivo na POC.",
 "Quando despacham tudo no pico, o produto continua on e vêm cancelamentos.",
 ],
 },
 "club-tada": {
 title: "Integração nativa Club TaDa",
 detail:
 "Stack de fidelidade externa dificulta CX; time migrando integração — item #1 votado no workshop.",
 productHook: "Rollout EC fim do ano; unificar pontos/estornos no app.",
 quotes: ["Gerir o Club em plataforma externa foi um desafio enorme."],
 },
 "payments-fraud": {
 title: "Pagamento online off — trauma de fraude bloqueia multas e personalização",
 detail:
 "COD domina; cartão só na porta. Cartões salvos sem step-up auth geraram clonagem e chargebacks. Multas de cancelamento e taxas dinâmicas exigem cartão no arquivo.",
 productHook: "3DS / OTP / tokenização de wallet antes de reativar gateway.",
 quotes: [
 "Podemos ligar pagamento online, mas tivemos muita fraude — cartão usado sem código no celular.",
 "Se o motorizado cobra a multa em dinheiro, ninguém paga.",
 ],
 },
 "cancel-courier-pay": {
 title: "Cancelamento do consumidor após despacho — motorizado só pago por entrega",
 detail:
 "EC paga motorizado por pedido entregue, não por tentativa. Cancelamento do usuário com rider a caminho derruba NPS; time quer taxa + mensagem quando a POC designa o motorizado.",
 productHook: "Política de cancelamento por status + trilho de pagamento.",
 quotes: [
 "Pagamos 100% por pedido entregue — NPS do motorizado cai quando o cliente cancela no meio da rota.",
 ],
 },
 "profile-edit": {
 title: "Não editar dados da conta — pico de cancelamento no 1º pedido",
 detail:
 "Telefone/endereço/e-mail errados no primeiro pedido; correção via ticket ou excluir conta. Crítico antes do pico de dezembro quando limpam bases manualmente.",
 productHook: "Edição de perfil self-service + UX de confirmação de endereço.",
 quotes: ["Entro na minha conta TaDa e não consigo editar minhas informações."],
 },
 "address-map": {
 title: "Camadas de mapa e sugestão geo fraca",
 detail:
 "Camada de ruas secundárias pode ser grossa; nomes de shopping resolvem para cidades erradas. “Sim” rápido no alerta de localização distante fixa pin ruim.",
 productHook: "Ajuste de camadas do mapa + forçar reposicionamento do pin.",
 quotes: [
 "Você escolhe um shopping em Guayaquil e aparece San Marino Quito, México…",
 ],
 },
 "sampling-ec": {
 title: "Sampling não funciona no Equador",
 detail:
 "Feature ativa em outros países; tentativas CSV (10k linhas, variantes de preço) nunca exibiram SKUs de brinde — tickets com Luis em aberto.",
 productHook: "Debug de config por país / regras de catálogo.",
 quotes: ["Carreguei sampling de todo jeito e não aparece no Equador."],
 },
 "admin-dynamic-fees": {
 title: "Admin CSV → regras no app (faixas de entrega, chuva, gorjeta, taxa de serviço)",
 detail:
 "Taxa de entrega fixa independente da distância; sem taxa de serviço; sobretaxa de chuva manual. Luis quer grades POC a POC sem erro de CSV.",
 quotes: [
 "Cobramos $1.500 seja 5 minutos ou meia hora de distância.",
 "CSV no Excel é propenso a erro humano — já coloquei preço errado na célula.",
 ],
 },
 "poc-excel-orders": {
 title: "Export da lista de pedidos da POC para fechamento de caixa",
 detail:
 "POCs copiam código de pedido um a um no Excel para SKU, motorizado, forma de pagamento — querem relatório baixável.",
 quotes: ["Abrem a lista de pedidos e copiam código por código — muito manual."],
 },
 "promo-sku-bloat": {
 title: "Promos com variantes — 7–8 SKUs para um combo (cor do termo)",
 detail:
 "Sem seletor de variante sob um SKU; peso do app prejudica descoberta. Step discount ajudou mas catálogo segue pesado.",
 quotes: [
 "Criamos sete ou oito SKUs porque o usuário precisa escolher a cor do termo — o app fica pesado.",
 ],
 },
 "poc-assign-rec": {
 title: "Ferramentas POC — atribuir pedidos e roteirização por setor",
 detail:
 "Desejo de atribuição inteligente por geografia dos pedidos; ligado ao dashboard ao vivo do supervisor no BizWam.",
 productHook: "Assistente de despacho + painel de alertas do supervisor.",
 quotes: ["Ajudar POCs a designar motorizados conforme onde os pedidos se concentran."],
 },
 "messaging-courier": {
 title: "Mensagem consumidor ↔ motorizado",
 detail: "Desafio votado; ligado a endereço/contato errado e redução de cancelamentos.",
 quotes: [],
 },
 "promo-live-counter": {
 title: "Contadores de promo ao vivo (ex. primeiros 100 pedidos)",
 detail:
 "EC roda campanhas split (pedido #100, #1000); precisa de progresso in-app como UI de prazo promocional.",
 quotes: [
 "Mandamos um split dizendo quantas unidades por faixa — um visual ao vivo ajudaria.",
 ],
 },
};

export function getEcuadorWorkshopInsights(locale: Locale): EcWorkshopInsight[] {
 return EC_WORKSHOP_OCT08_INSIGHTS.map((row) => {
 if (locale === "en") return row;
 const pt = INSIGHT_PT[row.id];
 const pillar = localizePillar(locale, row.pillar) as EcWorkshopInsight["pillar"];
 if (!pt) return {...row, pillar };
 return {
...row,
...pt,
 pillar,
 };
 });
}

const CHALLENGES_PT = [
 "Club TaDa integrado",
 "Recomendações de atribuição de pedidos na POC",
 "Quantidade de estoque por SKU na POC",
 "Lembrar usuário: não está no endereço de entrega",
 "Mensagem consumidor ↔ motorizado",
 "Usuário pode atualizar perfil a qualquer momento",
 "Visual ao vivo para contadores de promo",
 "Produtos grátis configurados automaticamente",
];

const DREAMS_VOTE_PT = [
 "Assinatura mensal / TaDa premium",
 "ERP (SAP) + MB de inventário confiável",
 "Geofences dinâmicas com IA (km + demanda)",
 "Conciliação automatizada de inventário",
 "Split / pagamento em grupo no app (Círculos)",
 "Saúde completa do seller no BizWam",
 "Repetir último pedido",
 "Entrega agendada e bundles de eventos",
];

export function getEcuadorWorkshopVoteWinners(locale: Locale) {
 const base = EC_WORKSHOP_OCT08_VOTE_WINNERS;
 if (locale === "en") return base;
 return {
 challenges: base.challenges.map((c, i) => ({
...c,
 label: CHALLENGES_PT[i] ?? c.label,
 })),
 dreams: base.dreams.map((d, i) => ({
...d,
 label: DREAMS_VOTE_PT[i] ?? d.label,
 })),
 };
}

const DREAMS_PT = [
 {
 pillar: "Operações",
 title: "Integração ERP SAP / Dynamics",
 detail: "MB confiável, conciliação automatizada, estoque teórico ao vivo por dark store.",
 },
 {
 pillar: "Operações",
 title: "Centro de comando do supervisor no BizWam",
 detail: "Pedidos atrasados, cancelamentos, alertas por cidade — especialmente jogos e picos.",
 },
 {
 pillar: "Operações",
 title: "Alertas de geofence com IA + staffing de motorizados",
 detail: "Sinalizar geofences acima do raio em km; prever demanda 18h–20h vs motorizados disponíveis.",
 },
 {
 pillar: "Consumidor",
 title: "Split pay e cashback na wallet",
 detail: "Estilo Banco Guayaquil “Círculos”; pontos viram dólares na wallet.",
 },
 {
 pillar: "Consumidor",
 title: "Eventos e carrinho multi-vertical",
 detail: "Vender cerveja para festivais no app; McDonald’s + cerveja um motorizado sem quebrar SLA.",
 },
 {
 pillar: "Consumidor",
 title: "Listagem internacional na loja de apps",
 detail: "Expatriados (ex. liderança na App Store BR) instalam TaDa EC viajando.",
 },
 {
 pillar: "Rewards",
 title: "Tiers de assinatura + entrega agendada",
 detail: "Planos estilo cinema; programar entrega para horário do jogo sem prejudicar SLA da POC.",
 },
 {
 pillar: "Rewards",
 title: "Gamificação Braze — sustentabilidade e Tadi",
 detail: "Desafios mensais, ranking por zona, garrafas retornáveis / metas low-alcohol.",
 },
];

export function getEcuadorWorkshopDreams(locale: Locale) {
 if (locale === "en") return EC_WORKSHOP_OCT08_DREAMS;
 return DREAMS_PT;
}

const HOSPITALITY_PT = [
 {
 audience: "Consumidor",
 idea: "Pedido de aniversário grátis ou surpresa sem precisar pedir",
 note: "Aniversários são ocasiões sociais de vários dias no Equador.",
 },
 {
 audience: "Consumidor",
 idea: "Conhecer jogador favorito via parcerias de patrocínio",
 note: "CN tem fortes acordos com clubes — espelhar experiências de estádio do Zé Delivery.",
 },
 {
 audience: "POC / Motorizado",
 idea: "Kit de boas-vindas para lojas novas; reconhecimento top motorizado / top loja cross-country",
 note: "Cupom dos “top 200 motorizados” no Brasil virou momento de orgulho na cidade.",
 },
 {
 audience: "POC",
 idea: "Copa do Mundo entre dark stores cross-country",
 note: "Mundialito interno no EC empoderou lojas; escalar para LATAM.",
 },
];

export function getEcuadorWorkshopHospitality(locale: Locale) {
 if (locale === "en") return EC_WORKSHOP_OCT08_HOSPITALITY;
 return HOSPITALITY_PT;
}

const CROSS_PT = [
 {
 theme: "Excel manual é o SO oculto",
 detail:
 "Regras de estoque, forecast de motorizados, taxas admin, fechamento de caixa e splits promocionais ainda vivem em planilhas e CSV.",
 },
 {
 theme: "Pagamentos destravam correções em cascata",
 detail: "Multas de cancelamento, penalidades, wallet e split pay dependem de trilhos online confiáveis.",
 },
 {
 theme: "Primeiro pedido = momento de confiança",
 detail: "Edição de perfil, confirmação de endereço e sampling/Club aparecem juntos nas histórias de NPS.",
 },
 {
 theme: "Hospitalidade como diferencial",
 detail:
 "Time quer picos emocionais (aniversário, futebol, reconhecimento) além de eficiência transacional.",
 },
];

export function getEcuadorWorkshopCrossThemes(locale: Locale) {
 if (locale === "en") return EC_WORKSHOP_OCT08_CROSS_THEMES;
 return CROSS_PT;
}
