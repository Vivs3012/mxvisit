import {
 COLOMBIA_CROSS_THEMES,
 COLOMBIA_MEETING_INSIGHTS,
 type ColombiaInsight,
 type ColombiaInsightPriority,
} from "../../colombia-insights";
import { CO_PRODUCT_MEETING_META } from "../../colombia-product-meeting-sep13";
import { CO_SL_MEETING_META } from "../../colombia-service-level-meeting-sep13";
import { COLOMBIA_SL_INSIGHTS } from "../../colombia-service-level-insights";
import {
 COLOMBIA_ALL_CONVERGENCES,
 COLOMBIA_ALL_INSIGHTS,
 type ColombiaAllConvergence,
 type ColombiaAllInsight,
} from "../../colombia-synthesis-all";
import type { Locale } from "../locale";

const UI_PT = {
 pageTitle: "Colômbia · 1YP TaDa",
 insightsTitle: "Insights da reunião",
 crossThemes: "Temas transversais",
 sectionsTitle: "Tópicos por pilar",
 globalLink: "Ver na aba All",
 source: "Fonte: transcrições Bavaria 13/09/2026 · pasta Colombia/13:09",
 allTitle: "Colômbia · All (13 set)",
 allConvergences: "Convergências AM + PM",
 allInsights: "Insights integrados",
 sessionTags: { am: "AM produto", pm: "PM Service Level" },
 globalRanks: "Temas globais",
};

const PRIORITY_PT: Record<ColombiaInsightPriority, string> = {
 Critical: "Crítico",
 High: "Alto",
 Medium: "Médio",
};

const PILLAR_PT: Record<ColombiaInsight["pillar"], string> = {
 Growth: "Growth",
 Commercial: "Comercial",
 Operations: "Operações",
 Rewards: "Rewards",
 Product: "Produto",
 Expansion: "Expansão",
};

const INSIGHT_PT: Record<string, { title: string; detail: string; productHook?: string }> = {
 "bis-siesa-availability": {
 title: "BEES off com estoque na loja — SIESA sem integração",
 detail:
 "Disponibilidade falsa (líquido vs garrafa, SKU off no BEES) prejudicou primeiros pedidos e retenção inicial. Colômbia criou score + ranking + incentivo localmente — mesma classe de dor do MVP de quantidade Mexico, Peru and Ecuador, com gap ERP (SIESA) vs verdade no BEES.",
 productHook: "Verdade por SKU + feed ERP opcional para aliados.",
 },
 "marketplace-retention-mix": {
 title: "Aquisição marketplace dilui retenção — clusters e compra noturna",
 detail:
 "~30% das campanhas de cerveja viram carrinho só marketplace. Compra a cada 22–30 dias vs 12–14 no núcleo cerveja; retenção fraca com AOV <50k ou >120k COP. Comportamento noturno exige janelas CRM diferentes — não usar o playbook das 16h do cervejeiro.",
 productHook: "Segmentação e janelas de CRM — não tratar marketplace como cohort cerveja.",
 },
 "partnership-cac-retention": {
 title: "Parcerias bancárias — CAC eficiente, retenção pós-promo fraca",
 detail:
 "10–15% dos usuários com CAC US$2–3; reporting BIN/datáfono prova valor ao banco. Promo grande (50%) gerou pico e churn ao desligar. Foco 2026: parcerias para retenção (pontos, narrativa banco in-app), não só picos de aquisição barata.",
 },
 "own-vs-aliado": {
 title: "Lojas próprias vs Community POC — 80/20 pedidos, paypoints e dados",
 detail:
 "Maioria dos pedidos em lojas próprias com controle SIESA; aliados sem Power BI/cluster — hoje Top Tiendas + ponte Luana. Paypoints, troca de dono e incentivos diferem de Community POC no Equador e terceiros no Peru — um playbook não serve aos dois.",
 productHook: "Dashboards homologados por modelo.",
 },
 "store-off-overlap": {
 title: "Loja off, overlap e Torre de Control",
 detail:
 "Quando aliado apaga, o polígono não cobre sozinho — overlap planejado (3–4 lojas/zona). Torre de Controle no fim de semana e alertas WhatsApp compensam zona única — mesma dor estrutural do spillover México (All #4), com pedido de alarme proativo em vez de mapa manual.",
 productHook: "Alertas proativos ops quando loja apaga.",
 },
 "stockout-sku-platform": {
 title: "Stockout na plataforma — linha por SKU 90%, não só categoria",
 detail:
 "Stockout por categoria no Power BI ajuda aliados a rampar; analytics por SKU ficam fora. Pedido: barra de stockout por SKU no BEES/seller, alinhada ao mínimo comercial — não só rollup de categoria.",
 },
 "club-for-you": {
 title: "Gap capacidade Club TaDa + prateleiras For You algorítmicas",
 detail:
 "Equipe Club enxuta — Lovers em queda e missões atrasadas. Visão de For You totalmente algorítmico bloqueada pelo layout SEM de SKU único vs flexibilidade de sampling que o mercado já mostra.",
 },
 "billing-api": {
 title: "Faturação eletrônica — export/API pedidos (lição Zé)",
 detail:
 "Após aceitar, dados somem para faturar; descontos manuais sob pressão de auditoria. API documentada e adotada pelo seller vale mais que dezenas de ERPs — lição Zé: integração sem uso diário não chega ao aliado.",
 },
 "flash-occasions": {
 title: "Slots flash promo e ocasiões marketplace",
 detail:
 "Flash em dayparts rígidos (cerveja meio-dia, marketplace à noite) com troca manual de ops. Próximo ano: cross-sell por dia/hora quando disponibilidade e ferramenta seller acompanharem.",
 },
 "ciesa-ally-erp": {
 title: "CIESA / ERP para aliados de alto volume",
 detail:
 "Community POC ~2k pedidos/mês integraria com caminho ERP credível. Faturação eletrônica obrigatória — pass-through de disponibilidade do BEES já ajuda a faturar antes de CIESA completo.",
 },
};

const CROSS_PT = COLOMBIA_CROSS_THEMES.map((t, i) => {
 const titles = [
 "Modelo varejo em duas velocidades",
 "Composição de aquisição vs retenção",
 "Disponibilidade antes de personalização",
 "Integrações precisam de adoção",
 ];
 const details = [
 "Lojas próprias (80% pedidos) vs Community POC (capilaridade, poucos dados) — um playbook seller não serve.",
 "Parcerias + marketplace + promos futebol mudam quem entra — tiers e CRM devem seguir.",
 "Gap BEES/ERP e stockout SKU precedem For You e cross-sell por ocasião.",
 "API de faturação só ganha se a loja continuar no seller — aviso Zé Delivery.",
 ];
 return { theme: titles[i] ?? t.theme, detail: details[i] ?? t.detail };
});

const UI_EN = {
 pageTitle: "Colombia · 1YP TaDa",
 insightsTitle: "Meeting insights",
 crossThemes: "Cross-themes",
 sectionsTitle: "Topics by pillar",
 globalLink: "See on global All tab",
 source: "Source: Bavaria transcripts Sep 13, 2026 · Colombia/13:09 folder",
 allTitle: "Colombia · All (Sep 13)",
 allConvergences: "AM + PM convergences",
 allInsights: "Integrated insights",
 sessionTags: { am: "AM product", pm: "PM Service Level" },
 globalRanks: "Global themes",
};

export function getColombiaUi(locale: Locale) {
 return locale === "pt" ? UI_PT : UI_EN;
}

export function formatColombiaPriority(locale: Locale, p: ColombiaInsightPriority) {
 return locale === "pt" ? PRIORITY_PT[p] : p;
}

export function formatColombiaPillar(locale: Locale, pillar: ColombiaInsight["pillar"]) {
 return locale === "pt" ? PILLAR_PT[pillar] : pillar;
}

export function getColombiaMeetingInsights(locale: Locale): ColombiaInsight[] {
 if (locale === "en") return COLOMBIA_MEETING_INSIGHTS;
 return COLOMBIA_MEETING_INSIGHTS.map((ins) => {
 const pt = INSIGHT_PT[ins.id];
 if (!pt) return ins;
 return {...ins, title: pt.title, detail: pt.detail, productHook: pt.productHook ?? ins.productHook };
 });
}

export function getColombiaCrossThemes(locale: Locale) {
 return locale === "pt" ? CROSS_PT : COLOMBIA_CROSS_THEMES;
}

export function getColombiaMeta(locale: Locale) {
 if (locale === "en") return CO_PRODUCT_MEETING_META;
 return {
...CO_PRODUCT_MEETING_META,
 title: "1YP TaDa — Introdução produto",
 format:
 "Dia 1 da semana OYP Colômbia — performance 2026, planos growth/comercial/ops; Brasil antecipa sessões ops/consumidor/rewards (13 set PM + 14 set AM).",
 };
}

const SL_INSIGHT_PT: Record<string, { title: string; detail: string; productHook?: string }> = {
 "co-sl-routing-multi-assign": {
 title: "No pico o roteamento ainda é manual — um pedido por moto",
 detail:
 "Na loja mais cheia, alguém na porta escolhe moto a moto qual pedido cada entregador leva. No sábado uma dark store pode ter cerca de 80 motos ativas, enquanto concorrentes colocam vários pedidos na mesma rota automática. Motos que aparecem no app mas não trabalham, ou app que trava no celular barato, geram o mesmo tipo de problema já visto em visitas no México e no Peru.",
 productHook: "Piloto: 2–3 pedidos por moto e rota automática na loja própria de maior volume.",
 },
 "co-sl-kpi-window": {
 title: "Tela de KPI do seller só mostra os últimos 7 dias",
 detail:
 "O gestor não vê só o dia de ontem nem compara este sábado com o anterior — só uma janela móvel de 7 dias, lenta para corrigir o dia a dia. Falam de Perfect Order o tempo todo, mas essa métrica não aparece com a mesma clareza dos outros números na home.",
 productHook: "Filtros de dia e semana na home; Perfect Order visível junto dos outros KPIs.",
 },
 "co-sl-braze-ab": {
 title: "Teste Braze — mensagem semanal por loja (Bogotá 38+38)",
 detail:
 "Metade de 76 lojas em Bogotá recebe, cada semana, mensagem no app com produtos mais vendidos, jogo de futebol da semana, quantas motos serão necessárias e resumo de comentários de clientes. A outra metade não recebe. Depois de quatro semanas comparam se isso funciona melhor do que avisar só pelo WhatsApp.",
 productHook: "Se o teste ganhar, levar o formato para a central de notificações do seller.",
 },
 "co-sl-ally-comms": {
 title: "Aliados Community POC precisam de avisos comerciais no app",
 detail:
 "Quando mudam promo ou plano comercial, hoje usam grupos de WhatsApp. O aliado não reabre mensagem antiga com facilidade. Querem o mesmo no app seller — horário de funcionamento, promo e reconhecimento positivo — com histórico.",
 productHook: "Braze (ou central de notificações) com conteúdo diferente para aliado vs loja própria.",
 },
 "co-sl-ai-coach": {
 title: "Feedback de SLA deve explicar incentivo, não só nota ruim",
 detail:
 "Problemas de SLA muitas vezes vão por e-mail ao Community POC. O pedido é um coach no app que diga o que falhou e o que fazer — por exemplo, que subir dois pontos no SLA pode significar mais pedidos e mais bônus. Isso é mais acionável que só um indicador vermelho.",
 productHook: "Começar com um KPI por dia na home: explicação simples + uma ação sugerida.",
 },
 "co-sl-consumer-bot": {
 title: "Depois da compra, o cliente precisa de opções simples",
 detail:
 "Fluxo de ajuda pós-compra (estilo Amira) com opções fixas: quanto falta para chegar, como passar instruções, etc. A mensagem vai para moto ou loja conforme o caso. Referência Zé Delivery: grande parte dos pedidos perdidos veio de desencontro entre cliente, loja e entregador — não de qualidade do produto.",
 productHook: "Primeiro um conjunto pequeno de motivos pré-definidos; editar pedido no mapa depois.",
 },
 "co-sl-bees-cieza": {
 title: "BEES e CIEZA (ERP da loja) não batem — faturação e controles quebram",
 detail:
 "CIEZA é o ERP das lojas próprias para faturar. O que vende no BEES muitas vezes não coincide com o que entra no CIEZA: lançamento manual, vários tipos de desconto e listas de preço por zona. Finanças falou em cerca de 46% de erros na acumulação de vendas e ~US$326k em risco; seis de sete controles internos críticos falham até integrar os sistemas.",
 productHook: "Exportar linhas do pedido no aceite; API para descontos no BEES refletirem na fatura.",
 },
 "co-sl-revenue-rec": {
 title: "O produto sai da loja dias antes de ser faturado",
 detail:
 "A moto entrega na sexta e a loja só registra a venda no CIEZA na segunda. Na prática o produto já saiu, mas o financeiro ainda mostra estoque. Auditoria externa (SOX) achou diferença em todos os SKUs que mediram em uma loja (Carrera 91). É o lado financeiro do mesmo problema da manhã: BEES diz indisponível com produto na prateleira — ops e finanças precisam de uma linha do tempo por SKU.",
 productHook: "Enviar eventos de entrega do BEES para finanças em tempo quase real, não conciliar na mão semanalmente.",
 },
 "co-sl-stock-cart": {
 title: "Cumprimento de estoque é o KPI principal — forecast ainda fraco",
 detail:
 "A home do seller destaca se a loja cumple a lista de produtos acordada. A previsão de demanda da primeira versão não gera confiança. Ainda falta indicador de ruptura por SKU no BEES (não só categoria no Power BI), principalmente antes de dobrar aliados.",
 productHook: "Corrigir forecast e ruptura por SKU na home antes de expandir Community POC.",
 },
 "co-sl-capacity-sla": {
 title: "Aviso antecipado quando faltam motos",
 detail:
 "Ops calcula motos necessárias dividindo pedidos por 1,8–2 (zonas grandes) ou por 3 (zonas pequenas) — hoje em planilha. Se faltam motos antes do pico, o SLA vai falhar mesmo com preparação rápida. A plataforma deveria avisar antes do rush, não só mostrar SLA vermelho depois.",
 productHook: "Alerta de capacidade na home do seller antes da janela de pico.",
 },
};

export function getColombiaSlMeetingInsights(locale: Locale): ColombiaInsight[] {
 if (locale === "en") return COLOMBIA_SL_INSIGHTS;
 return COLOMBIA_SL_INSIGHTS.map((ins) => {
 const pt = SL_INSIGHT_PT[ins.id];
 if (!pt) return ins;
 return {...ins, title: pt.title, detail: pt.detail, productHook: pt.productHook ?? ins.productHook };
 });
}

export function getColombiaSlMeta(locale: Locale) {
 if (locale === "en") return CO_SL_MEETING_META;
 return {
...CO_SL_MEETING_META,
 title: "1YP TaDa — Service Level",
 format:
 "Tarde de 13 set — seller/courier, home de KPI, roteamento, piloto Braze, bot pós-compra e riscos financeiros BEES/CIEZA.",
 };
}

const ALL_CONV_PT: { theme: string; detail: string }[] = [
 {
 theme: "Quem você adquire muda como deve falar com ele",
 detail:
 "Comprador noturno de marketplace e usuário de promo bancária não são o comprador de cerveja das 16h. Comunicação da tarde deve respeitar os segmentos da manhã.",
 },
 {
 theme: "Rewards e personalização precisam de dados de ops — não só o contrário",
 detail:
 "Missões Club e prateleiras algorítmicas avançam com KPIs e forecast confiáveis — mas rewards e CRM não devem esperar roteamento perfeito. Trilhas paralelas: CRM por coorte + roadmap For You enquanto a home seller melhora.",
 },
 {
 theme: "Estoque certo importa para venda e para finanças",
 detail:
 "Manhã: BEES mostra indisponível com produto na loja. Tarde: produto sai com a moto e só é faturado dias depois no CIEZA, e a contagem de auditoria não fecha. Caminho: eventos confiáveis por SKU para operação e finanças.",
 },
 {
 theme: "WhatsApp ainda carrega avisos de operação e comercial",
 detail:
 "Manhã: alertas quando a loja desliga no fim de semana. Tarde: promo para aliados e SLA por e-mail. Meta: Braze e calendário no app, com histórico e rastreio.",
 },
 {
 theme: "Dois tipos de loja no mesmo país",
 detail:
 "Lojas próprias no SIESA/CIEZA com controle rígido; aliados Community POC em grupos de WhatsApp. Home de KPI, comunicação e faturação não podem ser iguais.",
 },
 {
 theme: "No pico o problema é gente e rota, não só métrica",
 detail:
 "Distribuir motos na mão em volume altíssimo repete o SLA injusto do México e Peru: a loja prepara rápido e espera entregador. Capacidade ainda está na planilha.",
 },
];

const ALL_INS_PT: { title: string; detail: string }[] = [
 {
 title: "Um playbook de CRM não serve para todo mundo",
 detail:
 "Comprador noturno de marketplace e usuário de promo bancária não são o de cerveja às 16h. Segmentar antes de coaching de Perfect Order ou missões Club.",
 },
 {
 title: "Capacitar Club, tiers e For You — em paralelo às correções de ops",
 detail:
 "Club TaDa sem capacidade; Lovers e missões atrasam. Tiers cerveja vs marketplace e For You algorítmico travados pelo layout de SKU hero — investir produto e CRM enquanto a home seller melhora.",
 },
 {
 title: "Muitos pedidos morrem na coordenação",
 detail:
 "Bot pós-compra e mensagens pré-definidas atacam cancelamentos por desencontro entre cliente, loja e entregador — a loja deve resolver primeiro.",
 },
 {
 title: "Integrar BEES e CIEZA antes de escalar aliados",
 detail:
 "A manhã descreveu disponibilidade BEES vs SIESA e export para faturar. A tarde quantificou controles e faturação atrasada. Dobrar Community POC sem alinhar SKU e nota multiplica trabalho manual e risco de auditoria.",
 },
 {
 title: "Confiabilidade no pico e ferramentas seller — em paralelo ao growth",
 detail:
 "Rota, KPIs com data, app courier e estoque honesto na home devem melhorar junto com marketplace e Club — sequenciar squads, não congelar rewards até o pico estar perfeito.",
 },
 {
 title: "Provar comunicação no app, depois escalar",
 detail:
 "Rodar o teste Braze em Bogotá; se funcionar, usar o mesmo canal para calendário comercial do aliado, horário de abertura e lembretes de promo com plano mensal visível.",
 },
 {
 title: "Expandir cobertura com overlap planejado",
 detail:
 "Plano da manhã: quando aliado desliga, overlap e alarme para ops. Tarde: avisar quando faltam motos antes do SLA ficar vermelho.",
 },
];

export function getColombiaAllConvergences(locale: Locale): ColombiaAllConvergence[] {
 if (locale === "en") return COLOMBIA_ALL_CONVERGENCES;
 return COLOMBIA_ALL_CONVERGENCES.map((c, i) => ({
...c,
 theme: ALL_CONV_PT[i]?.theme ?? c.theme,
 detail: ALL_CONV_PT[i]?.detail ?? c.detail,
 }));
}

export function getColombiaAllInsights(locale: Locale): ColombiaAllInsight[] {
 if (locale === "en") return COLOMBIA_ALL_INSIGHTS;
 return COLOMBIA_ALL_INSIGHTS.map((ins, i) => ({
...ins,
 title: ALL_INS_PT[i]?.title ?? ins.title,
 detail: ALL_INS_PT[i]?.detail ?? ins.detail,
 }));
}
