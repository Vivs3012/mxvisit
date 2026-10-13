import { PUEBLA_PROJECT_EXECUTIVE, PUEBLA_PROJECT_META } from "../../puebla-project-shared";
import type { Locale } from "../locale";

const PUEBLA_META_PT = {
 title: "Projeto Puebla",
 period: "Campo + rota CX · 2026",
 scope: "Puebla / Aguascalientes",
 subtitle:
 "CX retenção e WhatsApp proativo, visitas a lojas (Cholula, Buenavista, Radial, Periférico), rollout Turbo e enablement de e-mail paralelo / Contáctanos — transcrições da pasta Puebla project.",
 sourceFolder: "Puebla project/",
};

const PUEBLA_EXECUTIVE_PT = {
 headline:
 "Puebla em uma linha: a promessa quebra no cadeia de entrega — entre CX, loja, courier e consumidor — e produto ainda não fecha o loop em resposta, estoque, entrega e confiança.",
 paragraphs: [
 "O Projeto Puebla reúne nove conversas de campo (mais um arquivo duplicado de CX proativo na pasta-fonte): três rodadas com o time de CX de Puebla e seis sessões em loja ou mistas na região (Cholula, Buenavista/Buena Vista, Radial, Periférico), além de revisão de tickets em visita a Aguascalientes. O fio condutor não é “falta de esforço local” — é fricção sistêmica entre o que o consumidor vê no app, o que a loja consegue operar e o que o CX resolve a tempo.",
 "No CX (Retenção), o trabalho é ticket a ticket: estorno de pontos Club TaDa após pedido expirado (~24h de escalonamento para Briseida/Club enquanto o consumidor espera até ~2 dias), cupons que parecem cerveja grátis (Club Corona), modeloramas que recusam resgate, códigos de entrega estáticos que permitem “entregue” sem cadeia de entrega, pin de courier desatualizado no mapa e casos financeiros (cobrança dupla) parados por semanas porque o POC não responde o e-mail paralelo. Pedido explícito: devolver pontos automaticamente quando o pedido expira.",
 "CX proativo (WhatsApp) mostra o upside de recuperação: após atraso, cancelamento sem explicação, cerveja quente ou troca silenciosa de marca (Corona por Victoria), agentes reconquistam usuários quando 250 pontos caem em 10–15 minutos — mas batem em limite de spam do WhatsApp (~50 mensagens/dia), macros genéricas que parecem acusatórias (“sua situação”) e dashboard que mostra zero pontos TaDa após concessão. Personalização e reporting fixo são pré-requisitos para escalar o canal.",
 "Nas lojas, Cholula confirma melhora de ops com mais couriers e ajuda de fim de semana no salão, mas fragilidade de plataforma permanece: alarmes do tablet falham (pedidos expiram), laptop funciona melhor; BEES mostra loja “off” para supervisores com POC aberto até refresh; turbo local ~6–11 min mas métrica de 35 min deve parar em “llegué”; pedidos agrupados esticam SLA do segundo. A segunda visita em Cholula treina Contáctanos (ticket live #84), mas a descrição não aparece na visão do agente CX — e e-mail paralelo ainda esconde casos do chão de loja.",
 "Buenavista/Buena Vista e Radial/Periférico expõem last mile e rollout Turbo: geofence 1 km, polígono fantasma de turbo no SM, badge de novo usuário sumindo em pedido turbo, export de cobertura quebrado, sequência turbo vs normal ignorada no app do courier, mapa mostrando rider ainda na loja no meio da rota. Buena Vista adiciona geografia — até 6–7 clusters fechados por viagem, 25+ min de trânsito — tornando SLA de 35 min irrealista. Periférico cruza teto de 30 kg com bags de 25 kg, SKUs promocionais mal configurados (24 kg), megas que não cabem e necessidade clara de mensagem rider–consumidor.",
 "Radial reforça o gargalo de comunicação: CX manda pedidos por e-mail paralelo e precisa de resposta em ~30 min com consumidor na linha; inbox dividida entre OSI e empreendedor com três POCs; lojas preferem resolver no balcão. Nos oito eixos, temas transversais: POC sem resposta, integridade do pedido (falta, troca, entregue falso), pagamentos/troco, confiabilidade BEES, capacidade bag/peso, clareza promo/Club, design de WhatsApp proativo e alinhamento Turbo + tracking.",
 ],
 takeaways: [
 {
 label: "CX",
 text: "Menos escalonamento manual Club TaDa; estorno automático na expiração; e-mail paralelo com CC supervisor e SLA de loja; WhatsApp proativo com personalização e métricas corretas.",
 },
 {
 label: "Lojas",
 text: "Som de alerta e refresh confiáveis em qualquer device; status on/off sincronizado; Contáctanos como canal oficial (corrigir visão CX); menos WhatsApp ad hoc.",
 },
 {
 label: "Entrega",
 text: "Alinhar regras bag/peso/promo; mapa ao vivo; chat ou mensagem; métrica em ‘llegué’; UI turbo clara para loja e courier.",
 },
 {
 label: "Confiança",
 text: "Comunicar trocas e cancelamentos; códigos dinâmicos; temperatura e completude do pedido — onde o NPS cai mesmo com atraso “aceitável”.",
 },
 ],
 visitMap: [
 {
 zone: "CX · Retenção (Rota CX)",
 seen: "Backlog Club TaDa, cupons, códigos estáticos, tickets 6–60 dias sem resposta do POC.",
 },
 {
 zone: "CX · Proativo",
 seen: "WhatsApp pós-fricção, pontos rápidos, limites de spam, trocas silenciosas e cerveja quente.",
 },
 {
 zone: "CX · Campo (Rota CX 2)",
 seen: "Cobrança dupla, faltas grandes, silêncio Abasto Pasa, caminho de escalonamento Alejandra.",
 },
 {
 zone: "Cholula",
 seen: "Tablet vs laptop, desync BEES, turbo, ruptura Victoria, treino Contáctanos.",
 },
 {
 zone: "Buenavista / Buena Vista",
 seen: "Turbo 1 km, UI novo usuário, clusters privados, alertas e pedidos multi-aba.",
 },
 {
 zone: "Radial / Periférico",
 seen: "E-mail paralelo, equipamento chuva, bags 30 kg, mapa e regras de ordem turbo.",
 },
 ],
 stats: [
 { label: "Transcrições", value: "9" },
 { label: "Sessões CX", value: "3" },
 { label: "Loja / mistas", value: "6" },
 { label: "Temas transversais", value: "8" },
 ],
};

const PUEBLA_UI_PT = {
 whatWeSaw: "O que vimos por frente de trabalho",
 criticalThemes: "Temas críticos transversais",
 seen: "Visto",
};

export function getPueblaProjectMeta(locale: Locale) {
 if (locale === "en") return PUEBLA_PROJECT_META;
 return PUEBLA_META_PT;
}

export function getPueblaProjectExecutive(locale: Locale) {
 if (locale === "en") return PUEBLA_PROJECT_EXECUTIVE;
 return PUEBLA_EXECUTIVE_PT;
}

export function getPueblaOverviewUi(locale: Locale) {
 if (locale === "en") {
 return {
 whatWeSaw: "What we saw by workstream",
 criticalThemes: "Critical cross-themes",
 seen: "Seen",
 };
 }
 return PUEBLA_UI_PT;
}
