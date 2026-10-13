import { CO_PRODUCT_MEETING } from "../../colombia-product-meeting-sep13";
import { CO_SL_MEETING } from "../../colombia-service-level-meeting-sep13";
import { COLOMBIA_ALL_EXECUTIVE } from "../../colombia-synthesis-all";
import type { Locale } from "../locale";

const PT = {
 headline:
 "Colômbia cresce 50–60% a/a com aquisição às vezes acima do México — mas marketplace e parcerias bancárias mudaram o mix, a retenção pressiona e lojas próprias vs Community POC exigem produtos diferentes.",
 paragraphs: [
 "Growth antecipou investimento e diversificou além de mídia paga para parcerias bancárias (10–15% dos usuários com CAC ~US$2–3; blended ~US$5–6). Copa e futebol puxaram aquisição (~22–24k) mas retiveram mal quando a promo acabou. ~30% da mídia paga em cerveja ainda compra só marketplace — usuários compram a cada 22–30 dias vs 12–14 só cerveja, compram mais à noite e retêm mal em faixas de AOV baixa (<50k COP) ou alta (>120k).",
 "Comercial + ops criaram score de disponibilidade quando BEES e ERP (SIESA) não integram — penaliza loja com estoque mas SKU off no BEES. Subiu onboarding/conversão. Stockout hoje em Power BI por categoria; aliados com regra 90%+. Pedido produto: stockout por SKU na plataforma.",
 "Colômbia é o mercado com mais lojas próprias (~69 vs ~120 Community POC; ~80% pedidos próprias). Paypoints, dados (Power BI) e troca de dono diferem dos aliados — Top Tiendas faz ponte. Expansão: mais overlap quando loja apaga; Torre de Controle (2 pessoas fim de semana) + WhatsApp para zona única. Plano ~dobrar Community POC no próximo ano.",
 "Rewards: Club TaDa sem dono (saídas/afastamento); Lovers em queda; missões adiadas. Tiers separam jornada cerveja vs marketplace. Produto quer For You algorítmico; SEM vs sampling para vitrine rotativa. Compliance faturação eletrônica prioriza API/export de pedidos — lição Zé: integração sem adoção do seller falha.",
 ],
 takeaways: [
 { label: "Growth", text: "Manter ≥20k novos usuários/mês; parcerias para retenção (BIN/datáfono, pontos duplos)." },
 { label: "Marketplace", text: "Portfólio regional + cross-sell por ocasião; clusters CRM distintos." },
 { label: "Disponibilidade", text: "Métrica BEES↔ERP funciona; verdade por SKU no seller/BEES." },
 { label: "Expansão", text: "Community POC + overlap; lojas próprias para controle — dois modelos de paypoint." },
 ],
};

export function getColombiaExecutiveSummary(locale: Locale) {
 if (locale === "en") return CO_PRODUCT_MEETING.executiveSummary;
 return PT;
}

const SL_PT = {
 headline:
 "Na tarde, consumidor pós-compra e operação de pico apareceram juntos: cancelamentos por coordenação; KPI diário e comms no app; motos ainda na mão — e BEES precisa bater com CIEZA na faturação.",
 paragraphs: [
 "Consumidor: fluxo de ajuda pós-compra com opções fixas (quanto falta, instruções de entrega), roteando para moto ou loja. Referência Zé: muitos pedidos se perdem por falta de alinhamento entre cliente, loja e entregador.",
 "Home de KPI e coaching: lojas querem ver ontem e comparar sábado com sábado anterior, não só os últimos 7 dias corridos. O card principal é cumprimento de estoque, mas o forecast ainda não confia. O time quer um ‘coach’ no app que explique o SLA em linguagem de incentivo (mais pedidos, mais bônus), não só e-mail com número vermelho.",
 "Braze e aliados: teste em Bogotá — metade das lojas recebe todo semana um resumo personalizado (produtos que mais vendem, jogo de futebol, quantas motos precisam, comentários de clientes); a outra metade não. Objetivo: substituir grupos de WhatsApp para aliados e lembrar promoções com calendário visível na loja.",
 "Seller e courier no pico: aceitar pedidos automaticamente melhorou métricas, mas no pico ainda se escolhe moto a moto na porta da loja; uma dark store chega a ~80 entregadores no sábado. Concorrentes usam rota automática com vários pedidos por moto. App com motos ‘fantasma’ ou travando no celular barato repete o que México e Peru já relataram.",
 "Finanças: faturação eletrônica obrigatória e ~80% do volume em lojas próprias. Sem integração BEES–CIEZA, a loja fatura manualmente com atraso, descontos não batem e auditoria encontrou diferença em todos os SKUs amostrados em uma visita. Finanças citou ~46% de erros de acumulação e ~US$326k em risco; seis de sete controles internos críticos falham até integrar.",
 ],
 takeaways: [
 { label: "Roteamento", text: "Sair do dispatcher humano para multi-assign + algoritmo — dark store ~80 motos." },
 { label: "KPIs", text: "Diário + comparáveis; Perfect Order visível; SLA explicado por capacidade." },
 { label: "Braze", text: "Provar comms personalizadas vs controle; plano comercial Community POC no app." },
 { label: "Finanças", text: "Export/API faturação + descontos alinhados — controles bloqueiam escala." },
 ],
};

export function getColombiaSlExecutiveSummary(locale: Locale) {
 if (locale === "en") return CO_SL_MEETING.executiveSummary;
 return SL_PT;
}

export function getColombiaAllExecutiveSummary(locale: Locale) {
 return locale === "pt" ? COLOMBIA_ALL_EXECUTIVE.pt : COLOMBIA_ALL_EXECUTIVE.en;
}
