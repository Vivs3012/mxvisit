import {
 GLOBAL_CONVERGENCES,
 GLOBAL_CROSS_BY_AREA,
 GLOBAL_INSIGHTS,
 GLOBAL_POSITIVE_SIGNALS,
 GLOBAL_SESSIONS,
 GLOBAL_TOPIC_SNAPSHOTS,
 type GlobalInsight,
 type GlobalPriority,
 type GlobalTopicSnapshot,
} from "../../global-insights";
import type { Locale } from "../locale";

type InsightPtFields = {
 title: string;
 summary: string;
 suggestion: string;
 coverage?: string;
 owners?: string;
};

export const INSIGHT_PT_BY_RANK: Record<number, InsightPtFields> = {
 1: {
 title: "Confiabilidade do seller no pico — som, sessão, mapa, pedidos expirados",
 summary:
 "Pedidos expiram ou não chegam ao courier com app em segundo plano, sem som ou travado. Mesmo desfecho em sábados na CDMX, picos de Copa no Puebla e turnos quietos no Peru.",
 coverage: "MX 6/9 POCs · PE 2/3",
 suggestion:
 "Push e som confiáveis no seller e no courier. Persistência de sessão durante o pico inteiro. Mapa carrega 50+ pedidos simultâneos sem tela em branco.",
 owners: "Eng. Seller/Courier · PM Seller · OPS",
 },
 2: {
 title: "GPS/mapa não atualiza em tempo real",
 summary:
 "Pin do courier preso na loja após saída; só 1–2 motos visíveis no pico. Consumidor e seller veem posição defasada — ~80% das reclamações de “atraso” são de exibição, não de tempo de entrega.",
 coverage: "MX 4/4 CDMX · PE 3/3 Lima",
 suggestion:
 "Atualização do pin em foreground/background. Mapa ao vivo read-only para CX. Push de “Ya llegué” que o consumidor de fato vê.",
 owners: "Eng. Seller/Courier · CX (Diego)",
 },
 3: {
 title: "Inventário sem quantidade real — busca e combos quebrados",
 summary:
 "Toggle ligado/desligado não reflete estoque. Sem campo de quantidade; combos não desativam juntos; busca não encontra marca/formato. Pedidos chegam em SKUs desligados.",
 coverage: "MX 4/4 CDMX · PE 3/3 · EC 8 out qty POC (2 votos) · Puebla busca",
 suggestion:
 "MVP de quantidade com auto-decremento opcional. SKU pai desativa variantes. Busca por marca/formato. Compor combos a partir de dois SKUs ativos (pedido Victor Ágora nos dois países).",
 owners: "PM Seller · Design · CX",
 },
 4: {
 title: "Roteamento errado de POC — sobreposição, spillover, cancelar para rotear",
 summary:
 "Cliente recebe loja distante; vizinho desliga SKU e volume invade uma POC; consumidor cancela 10–12× para forçar loja preferida quando o nome aparece no app.",
 coverage: "MX 6/9 · PE 2/3 · teste de sobreposição Produto",
 suggestion:
 "Rodar testes de sobreposição/cancelamento. Limitar spillover quando vizinho desliga SKU. Revisar polígonos em horário tardio. Ocultar ou suavizar nome da loja no roteamento ao consumidor.",
 owners: "PM Produto · OPS · Dados",
 },
 5: {
 title: "SLA de dispatch injusto — pedido pronto, sem courier por 10–15 min",
 summary:
 "Métrica fica vermelha com seller preparando em 2–3 min e moto chegando em 15 min. Copa: 40–50 pedidos / 8 couriers em 5 minutos.",
 coverage: "MX Puebla 3/5 · padrão de pico PE",
 suggestion:
 "Separar timestamps de “preparado” vs “coletado”. Metas ajustadas ao pico. Multi-assign para courier já em rota.",
 owners: "PM Seller · Dados · OPS",
 },
 6: {
 title: "Sem comunicação in-app seller ↔ cliente / courier",
 summary:
 "100% WhatsApp e telefone. Sem trilha de auditoria. Disputas de vasilhame, espera na porta, SKU errado — sellers lembram de chat em ferramenta anterior.",
 coverage: "MX 4/4 CDMX · PE 3/3 · voto EC 8 out",
 suggestion:
 "Piloto de mensagens pré-definidas seller→cliente (MX + PE). Canal rápido seller↔CX no pico — não só e-mail.",
 owners: "PM CX · PM Seller",
 },
 7: {
 title: "KPIs presos em 7 dias — sem dia/hora/semana calendário",
 summary:
 "Sellers não veem ontem nem semana seg–dom. Ranking com peer set opaco. SLA 35 oculto na UI do seller. Forecast mostra 30 pedidos, chegam 7.",
 coverage: "MX 4/4 CDMX + 2/5 Puebla · PE 3/3 · EC 7–8 out",
 suggestion:
 "Filtro de data (dia/semana/mês). Heatmap horário (pedidos + couriers). IA explica métricas opacas. Retomar cockpit Power BI OPS por POC.",
 owners: "PM Seller · OPS · Dados",
 },
 8: {
 title: "Calendário promocional desalinhado com supply e visibilidade do seller",
 summary:
 "Consumidor vê promo antes do seller conseguir estoque. Supply entrega 1×/semana; escada promocional com 1–2 dias de aviso. BEES/WebPO não alerta promos do consumidor.",
 coverage: "MX Puebla 3/5 · contexto PE + gap WebPO",
 suggestion:
 "Aviso de promo 7+ dias aos sellers. 2–3 janelas de entrega/semana. Alerta de promo na plataforma seller + supply (não só app consumidor). Centralizar calendário promocional.",
 owners: "Comercial · OPS · PM Seller",
 },
 9: {
 title: "Transparência de reembolso e pagamento",
 summary:
 "Sellers conciliam em Excel/caderno porque números da plataforma são opacos. Breakdown semanal VLC e notas de crédito funcionam no WebPO Peru — mesmo pedido nas reuniões no México.",
 coverage: "Padrão MX 4/4 · WebPO PE validado",
 suggestion:
 "Reembolso semanal linha a linha com drill-down por pedido. Trazer UX de pagamento WebPO para a plataforma oficial do seller.",
 owners: "PM Seller · Finanças · OPS",
 },
 10: {
 title: "UX do mapa operacional — assign sai da tela, branco sob carga",
 summary:
 "Atribuir courier navega para fora do mapa ou trava a tabela. Pin da loja some. Sellers querem mapa + kanban na mesma tela.",
 coverage: "MX 4/4 CDMX · dor de mapa PE compõe",
 suggestion:
 "Assign sem sair do mapa. Prioridade visual (não tudo vermelho). Piloto unificado mapa + kanban em uma POC.",
 owners: "PM Seller · Design",
 },
 11: {
 title: "Cadeia fria e promos de volume — geladeira, gelo, retornáveis, cartons",
 summary:
 "Promo em carton excede capacidade da geladeira. Gelo à custa do seller. Retornáveis empilham 2–4 cartons na moto. Peru ~60% retornável; Puebla 4/5 relatam produto quente.",
 coverage: "MX Puebla 4/5 · PE 2/3",
 suggestion:
 "Programa de máquina de gelo para POCs de alto volume. Playbook de geladeira para promo em carton. Redesign de sacola retornável para multi-carton.",
 owners: "OPS · Comercial",
 },
 12: {
 title: "Canal CX/suporte lento para coordenação no pico",
 summary:
 "Tickets por e-mail respondidos no dia seguinte. Sellers resolvem mais rápido por telefone que pela plataforma. Motivos obrigatórios de cancelamento perdidos em texto livre.",
 coverage: "MX Puebla 2/5 + CX · disputas de vasilhame PE",
 suggestion:
 "Canal de suporte seller na velocidade do WhatsApp. Motivos estruturados de cancelamento visíveis para CX.",
 owners: "PM CX · OPS",
 },
 13: {
 title: "Estabilidade do app courier e economia no pico",
 summary:
 "App trava exigindo reinstalar. Problemas de sync offline. Couriers comparam economia Uber; bônus de pico funcionaram na Copa mas não são sistemáticos.",
 coverage: "MX 3/4 CDMX · bugs de assign PE",
 suggestion:
 "Correção de crash Android. Incentivos estruturados de pico. Visibilidade de ganhos do courier (relatório Jumbo).",
 owners: "PM Courier · Eng. · OPS",
 },
 14: {
 title: "Fill Rate e qualidade de endereço — alavanca produto + ops",
 summary:
 "Fill Rate ~92% estável no Peru (meta 93%). Endereço errado e sem resposta geram cancelamentos. UX de localização Brasil candidata (−1 pp cancelamentos por localização).",
 coverage: "KPI nacional PE · pressão Fill Rate MX",
 suggestion:
 "Rollout UX localização Brasil no Peru (config). Cortar Fill Rate por usuário novo vs recorrente. Combinar pressão ops com fix de endereço em produto.",
 owners: "PM Consumidor · OPS · Dados (Bruno Masayoli)",
 },
 15: {
 title: "Inventário em tempo real é o unlock estratégico — não outro widget",
 summary:
 "Sem verdade de quantidade, recuperação parcial, prevenção de ruptura pelo supervisor e ops preditiva ficam reativas. Unânime em visitas; aposta futura #1 OPS workshop combina com scan-to-activate e copilot.",
 coverage: "MX 4/4 CDMX · PE 3/3 · visão SL · workshop PE",
 suggestion:
 "MVP quantidade com auto-decremento opcional. Alertas ao supervisor antes da ruptura. Scan NF fornecedor → ativar SKUs. Habilita pedidos parciais e dispatch justo.",
 owners: "PM Seller · OPS · Dados",
 },
 16: {
 title: "Cockpit preditivo — do WhatsApp corretivo a KPIs em tempo real",
 summary:
 "Supervisores respondem WhatsApp domingo 16h; sellers esperam até 21h pelo dashboard ops. Voto #1 workshop OPS: estoque ao vivo, SLA, disponibilidade, dotação de couriers.",
 coverage: "Workshop OPS MX · PE 3/3 · workshop PE OPS #1",
 suggestion:
 "Retomar cockpit Power BI por POC na plataforma seller. Heatmap horário pedidos + couriers. IA explica ranking opaco. Alerta antes de quebrar SLA.",
 owners: "PM Seller · OPS · Dados",
 },
 17: {
 title: "Triângulo claims e compensação — CX, loja e consumidor desconectados",
 summary:
 "Zendesk → e-mail da loja leva dias. Compensação só se cliente aciona suporte. Prioridade #3 workshop OPS. Disputas de vasilhame geram 1 estrela sem canal seller.",
 coverage: "Workshop PE OPS #3 · PE 3/3 · CX MX",
 suggestion:
 "Créditos/estornos mais rápidos como melhor prática de mercado. Visão unificada do seller para CX. Cancelamento estruturado + motivos de disputa visíveis a todos.",
 owners: "PM CX · OPS · PM Seller",
 },
 18: {
 title: "Fragmentação da stack de dados — AppsFlyer, MMP, Segment não homologados",
 summary:
 "Workshop Consumidor #2: atribuição e funil inconsistentes entre ferramentas. Bloqueia personalização, gatilhos CRM e ROI de growth.",
 coverage: "Workshop PE Consumidor #2",
 suggestion:
 "Homologar taxonomia de eventos em AppsFlyer, Segment e Braze. Merchandising por categoria/usuário. Base para personalização e APIs de ocasião futebol.",
 owners: "Growth · Dados · PM Consumidor",
 },
 19: {
 title: "Lacunas na stack de loyalty — Braze, cupons flash, admin BEES, antifraude",
 summary:
 "Top 4 workshop Rewards: enriquecimento Club TaDa × Braze, cupons flash na wallet, admin rewards no BEES, automação antifraude. Tiers e omnichannel são horizonte 3–4 anos.",
 coverage: "Workshop PE Rewards · voto EC 8 out #1 (4)",
 suggestion:
 "Entregar mecânica de cupom flash + UX wallet juntos. Centralizar config rewards no BEES. Gatilhos Braze por ocasião (futebol, aniversário). Regras de fraude antes de escalar earn/burn.",
 owners: "Rewards · PM Consumidor · Comercial",
 },
 20: {
 title: "Comunicação do ecossistema — seller, courier, consumidor, CX ainda em silos",
 summary:
 "Visão Service Level: Braze para OPS→loja, código de prova de entrega, picker quantitativo. Mesma raiz do workaround WhatsApp em todo lugar.",
 coverage: "Visão PE SL · CX MX · ambos países 3/3+",
 suggestion:
 "Piloto mensagens pré-definidas. Braze para campanhas ops. Homologação notification center. Chat in-app como fase 2 após confiabilidade.",
 owners: "PM CX · PM Seller · PM Courier",
 },
 21: {
 title: "Ops de promo fragmentada — Excel, Trello, VTEX, app consumidor dessincronizados",
 summary:
 "Comercial roda promos em ferramentas desconectadas. Campo mostra consumidor vendo promo antes do seller estocar. Stella no app Peru mas não no BEES.",
 coverage: "Workshop Promo MX · PE 2/3 · Puebla 3/5",
 suggestion:
 "Calendário promocional centralizado com aviso 7 dias ao seller. Módulo promo flash. Ligar calendário → notificação seller → slots supply. Config por categoria/marca.",
 owners: "Comercial · PM Seller · OPS",
 },
 22: {
 title: "Apostas 2028 convergindo — vending, futebol, omnichannel, parcerias",
 summary:
 "Visão futura workshop: OPS quer pedidos agendados + vending + OXXO/Tambo; Consumidor quer retornáveis virtuais + personalização; Rewards quer earn/burn futebol + resgate omnichannel.",
 coverage: "Workshop PE todos grupos · sonhos EC 8 out · Momento Inesperado",
 suggestion:
 "Sequenciar após fundações Q1–Q2: MVP futebol via Braze, piloto omnichannel Tambo, discovery vending/parcerias. Tiers horizonte 3–4 anos.",
 owners: "Produto · Rewards · OPS · Parcerias",
 },
 23: {
 title: "Retornáveis / RGB — consumidor não entende regras de troca",
 summary:
 "44% dos pedidos no Peru incluem RGB mas awareness é por preço, não educação. Troca entre marcas confusa; janela Retornafest perdida. Caminho brand page acordado para landing educativa.",
 coverage: "PE 3 set P1 · workshop Consumidor retornáveis",
 suggestion:
 "Educar retornáveis na brand page + header de categoria. Coordenar próxima janela de campanha com Growth.",
 owners: "PM Consumidor · Growth Peru · Comercial",
 },
 24: {
 title: "Chatbot CX — não tropicalizado para o Peru",
 summary:
 "~45% deflexão mas IA defasada ~2 anos; sem cadeia de entrega humano. Bot pergunta país/telefone já conhecidos. Escopo service design pedido além de só bot.",
 coverage: "PE 3 set P1",
 suggestion:
 "Tropicalizar fluxos + escalonamento humano. Combinar com comunicação do ecossistema para tickets de coordenação.",
 owners: "PM CX · Growth Peru",
 },
 25: {
 title: "UX wallet de cupons + lifecycle — clusters manuais, flash burn ausente",
 summary:
 "Cupons lifecycle manuais mensais; wallet mostra último criado primeiro. Rewards quer cupons flash com countdown; migração Club TaDa para create/order/segment.",
 coverage: "Workshop PE Consumidor #4 · Rewards #2 · 3 set P2",
 suggestion:
 "Redesenhar UX wallet. Entregar mecânica flash burn com admin Club TaDa — migração validade 30 dias.",
 owners: "Rewards · PM Consumidor · Growth",
 },
 26: {
 title: "Pagamentos online bloqueados — Peru 3% share, Equador gateway off após fraude",
 summary:
 "Peru com só 3% online em gateway único; Equador desligou pagamentos após clonagem de cartão sem OTP/3DS — COD domina, taxas de cancel e sonhos split pay falham. Campanhas BIN e orquestrador travam nos dois mercados.",
 coverage: "Workshop PE Consumidor #3 · 3 set P3 · EC 7–8 out (Crítico no quadro workshop)",
 suggestion:
 "Expandir orquestrador país a país com 3DS/OTP. Habilitar BIN para aquisição só com monitoramento antifraude.",
 owners: "Fintech · PM Consumidor · Growth",
 },
 27: {
 title: "Multishowcases + Comprar de novo — trilha de ship vs gaps de campo",
 summary:
 "3 set: multishowcases meta 15 set, Comprar de novo 98% ATC / 61% conversão. Gaps permanecem: mapa, retornáveis, pedido parcial, stack de dados — trilha de ship ≠ prontidão de campo.",
 coverage: "Visão Consumidor PE 3 set",
 suggestion:
 "Priorizar sequência rollout Peru com Growth. Não lançar todas features de uma vez — mapa + endereço primeiro.",
 owners: "PM Consumidor · Victoria/Fernando · Growth Peru",
 },
 28: {
 title: "POC Community híbrida — piloto legal antes do salto territorial",
 summary:
 "Equador planeja 112 POCs Community junto a 28 dark stores (6→41 cidades, cobertura 42%→67%) mas não roda pricing POP in-app hoje — piloto + regulação primeiro.",
 coverage: "Prep EC 7 out · alinha com landing seller CO/MX",
 suggestion:
 "Entregar landing aquisição seller no GO. Fluxo app para preços referência POP. Manter dark stores para controle de serviço em cidades core.",
 owners: "Expansão Equador · PM Seller · Jurídico",
 },
 29: {
 title: "Motorizado preso à primeira POC — reassignment lento",
 summary:
 "Após migração Vitex, conta courier vincula a uma loja. Fechamento ou mudança de cidade exige ticket + delete — dor ops em escala.",
 coverage: "EC 7 out · regra legal/terceiro",
 suggestion:
 "Revisão jurídica de regras de terceiros; transferência self-serve de POC sem multi-homing.",
 owners: "Produto Courier · Jurídico · OPS",
 },
 30: {
 title: "Disciplina de holdout CRM — slots prime geram incrementalidade",
 summary:
 "Equador roda holdout em pushes: sex 18h +50%, dom 12h +40%; manhãs ~+5%. Incoerência checkout (promessa de taxa) mata lift.",
 coverage: "Deck CRM EC S40 · 7 out",
 suggestion:
 "Homologar playbook de holdout para Mexico and Peru. Corrigir coerência promo/checkout antes de escalar pushes.",
 owners: "CRM · PM Consumidor · Growth",
 },
 31: {
 title: "Um DDC por POC — ganho de granularidade em escala pequena",
 summary:
 "Equador saiu de DDC compartilhado (5–6 POCs) para um por loja — ruptura 0,8% com supply centralizado. Excel promo por 23 POCs; reagrupar quando densidade subir.",
 coverage: "EC 7 out · mesma jogada granularidade portfólio PE",
 suggestion:
 "Produtizar templates promo por POC (não só Excel). Planejar regras de reagrupamento DDC antes da escala Community POC.",
 owners: "OPS · PM Seller · Comercial",
 },
 32: {
 title: "Integração Club TaDa — voto #1 workshop Equador",
 summary:
 "Gerir loyalty em plataforma externa é a aposta near-term top (4 votos). Sampling, visibilidade de estornos e gatilhos CRM travam até Club nativo no app.",
 coverage: "Workshop EC 8 out · stack Rewards PE",
 suggestion:
 "Colocar migração Club EC no caminho crítico. Combinar UX wallet e regras catálogo sampling antes de escalar gamificação (Braze Tadi, contadores promo).",
 owners: "Rewards · CRM · PM Consumidor",
 },
 33: {
 title: "Edição de perfil + geo no mapa — confiança no primeiro pedido (Equador)",
 summary:
 "Usuários não corrigem telefone, endereço ou e-mail sem ticket ou exclusão de conta — pico de cancel no primeiro pedido. Busca shopping/landmark resolve cidades erradas; confirm rápido em alerta de distância fixa pin ruim.",
 coverage: "Workshop EC 8 out · padrão ~18% endereço errado PE",
 suggestion:
 "Edição self-serve de perfil + fluxo confirmação de endereço. Ajustar camadas do mapa e forçar pin antes de travar. Candidato rollout UX localização Brasil.",
 owners: "PM Consumidor · Growth · Design",
 },
 34: {
 title: "Cancelar após dispatch — courier pago só por entrega (Equador)",
 summary:
 "Quando consumidor cancela após POC atribuir rider, NPS courier cai — EC paga por entrega concluída, não por tentativa. Penalidades precisam pagamento online; cash na porta falha.",
 coverage: "Workshop EC 8 out · dor cancel Mexico and Peru",
 suggestion:
 "Política de cancel por status com penalidade em cartão salvo. Mensagem in-app com rider a caminho. Alinhar com reativação do orquestrador de pagamento.",
 owners: "PM Consumidor · Courier · OPS",
 },
 35: {
 title: "Regras admin in-app — faixas entrega, chuva, gorjetas, taxa serviço (Equador)",
 summary:
 "Entrega flat ~$1.500 seja 5 ou 30 minutos; sem taxa de serviço; surge chuva manual. Luis quer grades de taxa POC a POC sem typos em CSV.",
 coverage: "EC 8 out · dor admin EC 7 out",
 suggestion:
 "Substituir CSV frágil por UI admin validada para taxas por POC e distância. Ligar surcharges chuva/evento a playbook de pico estilo MotoGP.",
 owners: "Produto Admin · OPS · Comercial Equador",
 },
 36: {
 title: "Cockpit supervisor POC — visibilidade BizWam + assist assign",
 summary:
 "Supervisores sem board ao vivo de atrasados/cancelados; POCs copiam códigos de pedido para Excel no fechamento cash. Workshop votou recomendações de assign e sonha saúde completa do seller no BizWam.",
 coverage: "Votos EC 8 out · Power BI FOR EC 7 out",
 suggestion:
 "Board de alerta supervisor (atrasado, cancel, cidade/dia de jogo). Assist dispatch POC por cluster de pedidos. Export fechamento do dia para download.",
 owners: "PM Seller · OPS · Dados",
 },
 37: {
 title: "Peso do catálogo promocional — SKUs variante + sonhos ERP inventário",
 summary:
 "Bundles escolha de cor precisam 7–8 SKUs sem seletor de variante; app pesado. Voto sonhos SAP/Dynamics para MB confiável e reconciliação automatizada.",
 coverage: "EC 8 out Consumidor + voto sonhos",
 suggestion:
 "Seletor de variante sob SKU pai. Longo prazo feed ERP para estoque teórico — alinhar com MVP quantidade e escala Community POC.",
 owners: "PM Consumidor · Comercial · OPS",
 },
 38: {
 title: "Forecast motorizado em Excel — export BEES fora da plataforma (Equador)",
 summary:
 "Supervisores montam couriers/hora a partir do BEES e compartilham no WhatsApp; MotoGP reage manualmente. Mesma classe de dor dos KPIs 7 dias e workaround WebPO Peru.",
 coverage: "Prep EC 7 out · alinha rank #7",
 suggestion:
 "Forecast confiável + visão staffing por POC no seller/admin; homologar padrões heatmap WebPO.",
 owners: "PM Seller · OPS · Dados",
 },
 39: {
 title: "Puebla Project — loop parallel-email e loja sem resposta",
 summary:
 "CX espera dias quando POCs ignoram threads paralelas; supervisores nem sempre em CC; casos financeiros e short-ship travam — churn e percepção de ‘estafa’.",
 coverage: "Puebla Project · 10 transcrições · Rota CX",
 suggestion:
 "Canal seller↔CX com SLA e visibilidade supervisor; prova de entrega + motivos obrigatórios de cancelamento.",
 owners: "PM CX · OPS",
 },
 40: {
 title: "Confiabilidade Turbo/BEES — alertas, refresh, desync on/off",
 summary:
 "Alarmes tablet perdidos com som de piso; notificações silenciosas; refresh multi-aba → pedidos expirados; bugs geofence turbo e UI no rollout.",
 coverage: "Puebla Project · Cholula · Buenavista · Periférico",
 suggestion:
 "Camada 1 confiabilidade antes de escalar turbo: som, sessão, superfície única de pico, sync de status.",
 owners: "PM Seller · OPS",
 },
 41: {
 title: "Visibilidade incentivo e reembolso POC (Equador)",
 summary:
 "Modelo variável no Equador; resumo semanal insuficiente — POCs querem visão diária de incentivos ligados a ruptura e KPIs dispatch.",
 coverage: "Prep EC 7 out",
 suggestion:
 "Reembolso linha a linha semanal + drill-down diário de incentivos — espelhar WebPO/Jumbo.",
 owners: "PM Seller · Finance · OPS",
 },
 42: {
 title: "Contadores promo ao vivo + free-gift automático (workshop Equador)",
 summary:
 "Equador roda campanhas split sem progresso in-app; SKUs de brinde ligados a sampling — ambos com 2 votos no quadro Rewards 8 out.",
 coverage: "Workshop OYP EC 8 out · liga rank #32 sampling",
 suggestion:
 "UI de progresso promo (prazo + unidades restantes) com migração Club. Corrigir regras catálogo sampling/brinde antes de escalar gamificação Braze.",
 owners: "Rewards · PM Consumidor · Comercial",
 },
 44: {
 title: "BEES off com estoque na loja — ERP sem integração (Colômbia)",
 summary:
 "Desconexão SIESA/BEES gerou rupturas falsas (garrafa vs líquido, SKU off no BEES). Comercial criou score + ranking + pagamento — mesma classe de verdade inventário Mexico, Peru and Ecuador.",
 coverage: "CO 13 set intro · aliados + próprias",
 suggestion: "Verdade por SKU no seller/BEES; feed ERP opcional para aliados volume alto.",
 owners: "PM Seller · OPS · Comercial CO",
 },
 45: {
 title: "Aquisição marketplace muda retenção — compra noturna e faixas AOV (Colômbia)",
 summary:
 "~30% mídia cerveja vira carrinho só marketplace. Recompra 22–30 dias vs 12–14 cerveja; churn em AOV <50k ou >120k COP — CRM e tiers devem separar jornadas.",
 coverage: "CO 13 set growth",
 suggestion: "Lifecycle marketplace vs cerveja; janelas noturnas; CAC blended vs M1/M3 por promo entrada.",
 owners: "Growth CO · CRM · PM Consumidor",
 },
 46: {
 title: "Parcerias bancárias — CAC barato, retenção frágil (Colômbia)",
 summary:
 "10–15% usuários CAC ~US$2–3 (blended US$5–6). Reporting BIN/datáfono; promo 50% banco depois churn. Falta história banco in-app; 2026 foco retenção.",
 coverage: "CO 13 set · PE BIN / EC pagamentos",
 suggestion: "UX wallet + parceria no app; KPIs retenção cohort banco.",
 owners: "Growth CO · Fintech · CRM",
 },
 47: {
 title: "Lojas próprias vs Community POC — paypoints e dados (Colômbia)",
 summary:
 "~80% pedidos em ~69 próprias vs ~120 aliados; aliados sem Power BI — Top Tiendas + ponte ops. Paypoints diferem de EC Community POC / PE terceiros.",
 coverage: "CO 13 set expansão",
 suggestion: "Dois personas seller — dashboards stockout/KPI por modelo.",
 owners: "OPS CO · PM Seller · Expansão",
 },
 48: {
 title: "Alertas loja off, overlap e Torre de Controle (Colômbia)",
 summary:
 "Community POP off não cobre zona inteira — overlap planejado. Torre de Controle fim de semana + WhatsApp zona única — mesma dor spillover MX #4.",
 coverage: "CO 13 set · MX overlap",
 suggestion: "Alertas proativos ops; regras overlap no admin.",
 owners: "OPS CO · PM Seller · Dados",
 },
 49: {
 title: "Métrica stockout — linha por SKU 90%, não só categoria (Colômbia)",
 summary:
 "Power BI por categoria + gate 90% aliados funciona; pedido produto: barra stockout por SKU no BEES/seller.",
 coverage: "CO 13 set · fio rank #3",
 suggestion: "Visibilidade SKU antes de dobrar Community POC.",
 owners: "PM Seller · Comercial CO · Dados",
 },
 50: {
 title: "Gap Club TaDa + prateleiras For You algorítmicas (Colômbia)",
 summary:
 "Club sem dono; Lovers em queda; missões adiadas. For You algorítmico bloqueado por SEM vs sampling.",
 coverage: "CO 13 set · EC Club #32",
 suggestion: "Estabilizar Club; rotacionar vitrine; missões Braze quando staffed.",
 owners: "Rewards · PM Consumidor · Growth CO",
 },
 51: {
 title: "API faturação e export pedidos — compliance (Colômbia)",
 summary:
 "Faturação eletrônica obrigatória; dados somem após aceite; descontos manuais. API documentada > 40 ERPs se seller adotar — lição Zé.",
 coverage: "CO 13 set · transparência reembolso PE",
 suggestion: "Export linha a linha + API billing; métricas adoção aliados.",
 owners: "PM Seller · Finanças · Jurídico CO",
 },
 43: {
 title: "Telão hospitalidade — aniversário, futebol, reconhecimento (Equador)",
 summary:
 "Ideação hospitalidade 8 out: brinde surpresa aniversário, encontro com jogador via patrocínio, reconhecimento top loja/courier cross-country, mundialito dark store.",
 coverage: "Telão workshop EC 8 out · fio Momento Inesperado",
 suggestion:
 "Sequenciar em identidade CRM + verdade inventário. Piloto uma jogada hospitalidade por trimestre com repetição mensurável — não antes Camada 1.",
 owners: "CRM · Growth · OPS",
 },
};

const PRIORITY_PT: Record<GlobalPriority, string> = {
 Critical: "Crítico",
 High: "Alto",
 Medium: "Médio",
};

const LAYER_PT: Record<GlobalInsight["layer"], string> = {
 Reliability: "Confiabilidade",
 "Peak ops": "Pico operacional",
 Portfolio: "Portfólio",
 Communication: "Comunicação",
 Metrics: "Métricas",
 Commercial: "Comercial",
 Infra: "Infraestrutura",
 Loyalty: "Fidelidade",
 Growth: "Crescimento",
};

type GlobalCountry = GlobalInsight["countries"][number];

const COUNTRY_PT: Record<GlobalCountry, string> = {
 Mexico: "México",
 Peru: "Peru",
 Ecuador: "Equador",
 Colombia: "Colômbia",
};

const AREA_PT: Record<(typeof GLOBAL_CROSS_BY_AREA)[number]["area"], string> = {
 Operations: "Operações",
 Consumer: "Consumidor",
 Rewards: "Recompensas",
 "Commercial & promos": "Comercial e promos",
 "CX & communication": "CX e comunicação",
 Expansion: "Expansão",
};

export function formatGlobalPriority(locale: Locale, p: GlobalPriority): string {
 if (locale === "en") return p;
 return PRIORITY_PT[p];
}

export function formatGlobalLayer(locale: Locale, layer: GlobalInsight["layer"]): string {
 if (locale === "en") return layer;
 return LAYER_PT[layer];
}

export function formatGlobalCountry(locale: Locale, c: GlobalCountry): string {
 if (locale === "en") return c;
 return COUNTRY_PT[c];
}

function localizeOwners(locale: Locale, owners: string | undefined): string | undefined {
 if (!owners || locale === "en") return owners;
 return owners
.replace(/\bFinance\b/g, "Finanças")
.replace(/\bCommercial\b/g, "Comercial")
.replace(/\bPartnerships\b/g, "Parcerias")
.replace(/\bLegal\b/g, "Jurídico")
.replace(/\bGrowth\b/g, "Growth")
.replace(/\bRewards\b/g, "Rewards")
.replace(/\bDesign\b/g, "Design")
.replace(/\bData\b/g, "Dados")
.replace(/PM Product/g, "PM Produto")
.replace(/PM Consumer/g, "PM Consumidor")
.replace(/Admin product/g, "Produto Admin")
.replace(/Courier product/g, "Produto Courier")
.replace(/Ecuador expansion/g, "Expansão Equador")
.replace(/Ecuador commercial/g, "Comercial Equador");
}

export function localizeGlobalInsight(insight: GlobalInsight, locale: Locale): GlobalInsight {
 if (locale === "en") return insight;
 const pt = INSIGHT_PT_BY_RANK[insight.rank];
 if (!pt) return insight;
 return {
...insight,
 title: pt.title,
 summary: pt.summary,
 suggestion: pt.suggestion,
 coverage: pt.coverage ?? insight.coverage,
 countries: insight.countries.map((c) => formatGlobalCountry(locale, c) as GlobalCountry),
 owners: localizeOwners(locale, pt.owners ?? insight.owners),
 };
}

export const CONVERGENCES_PT: string[] = [
 "Falha de ferramentas no pico é hemisférica: refresh/GPS/logout silencioso/sem som → mesmo desfecho — pedidos expirados e dano ao SLA de dispatch",
 "Quantidade de inventário é unânime onde perguntado; dor de combo/busca é universal — Peru e México querem compor a partir de dois SKUs",
 "Inventário em tempo real é o unlock estratégico (visão SL 1 set) — pedidos parciais, visão supervisor, prevenção de ruptura, scan-to-activate",
 "WhatsApp é a camada ops real em todo país visitado — produto deve substituir com trilha de auditoria, não competir só em velocidade",
 "SLA dispatch (10 min) conflita com realidade de dotação de couriers — seller pronto cedo, moto tarde; métrica pune a parte errada",
 "Janela KPI de 7 dias insuficiente em todo lugar — Peru construiu visão semanal WebPO como workaround; sellers México usam Excel; workshop OPS #1 quer cockpit preditivo",
 "Spillover entre POCs quando vizinhos desligam SKUs — Merino (+70 pedidos) espelha Forjadores absorvendo vizinhos Puebla",
 "Visibilidade promo consumidor ≠ prontidão seller/supply — Stella S/23 no app mas não no BEES é versão Peru do desabasto Corona Copa",
 "Planejamento promo fragmentado (Excel/Trello/VTEX) — workshop comercial + visitas pedem calendário único → notificação seller → supply",
 "Retornáveis e cadeia fria são estratégicos (Peru vs Rappi) mas infra atrasa volume promo (cartons, packs 28, gelo)",
 "Inovação OPS local (WebPO Peru) mostra a barra de confiança seller — breakdown reembolso, demanda horária, KPIs semanais",
 "Comunicação do ecossistema é o guarda-chuva (1 set): Braze + prova de entrega + mensagens pré-definidas — mesma dor que ~40% tickets coordenação CX MX",
 "Triângulo de claims quebrado (2 set OPS): Zendesk → e-mail → dias; compensação só se cliente escala — mercado espera créditos instantâneos",
 "Stack de dados consumidor não homologada (2 set): AppsFlyer/MMP/Segment bloqueia personalização e APIs ocasião futebol",
 "Stack Rewards precisa Braze + wallet + admin BEES + antifraude antes de escalar tiers/omnichannel (workshop Rewards 2 set)",
 "Apostas futuras alinham entre grupos: pedidos agendados + vending (OPS), retornáveis virtuais (Consumidor), earn/burn futebol (Rewards)",
 "Hospitalidade Momento Inesperado — kit futebol, experiências aniversário, primeiro pedido Club — precisa gatilhos CRM + inventário + logística primeiro",
 "Workshop OPS MX (23 jul) + PE (2 set) votam mesmos temas top: visibilidade tempo real, console admin, polígono/cobertura, regras SKU cupom",
 "Painel supervisão courier (MX Andre) = mapa ao vivo (PE Consumidor #1) = ponto cego CX — uma camada de mapa serve todos os atores",
 "Visão Consumidor 3 set: multishowcases + Comprar de novo (61% conversão) na trilha de ship; educação retornáveis, bugs mapa courier e ~18% cancel endereço errado seguem gaps comerciais top",
 "Prateleira Comprar de novo supera categorias em conversão (98% ATC, 61% pedido) — sinal Peru/México para prioridade personalização",
 "Simplificação admin (descontos, prateleiras, pricing manual) alta carga OPS mas despriorizada vs consumidor — automatizar via copilot 2027 H2",
 "Pesquisa confirma ator faltante: cadeia de entrega seller e courier transforma uma falha em ruptura, espera, ETA atrasado, cancelamento e custo suporte",
 "Small em discovery precisa ativação; Large anchor precisa proteção — volume seller não é score de maturidade",
 "Satisfação courier pode ficar alta enquanto comunicação, rota e espera corroem tempo e ganhos",
 "Lovers Plus é benchmark operacional: 92% Perfect Orders e 48% SLA15 vs 35% Core",
 "Benchmark competitivo expande mapa: Rappi é regional; Uber é ameaça ecossistema México; PedidosYa é ameaça densidade/fintech Peru",
 "Equador 7 out: híbrido Community POC + dark store é aposta growth — produto deve liberar pricing POP, landing seller e reposição sugerida antes da escala",
 "Trauma gateway pagamento Equador espelha baixo share online Peru — controles antifraude devem preceder promessas marketing em taxas e campanhas BIN",
 "Holdout CRM + calendário ocasião (Chelizza, BEERFEST, Clásico) mostra Equador pronto para workshop Rewards — Club TaDa já no planejamento semanal",
 "MotoGP + Power BI FOR = inovação OPS local quando métricas home seller não usadas — mesma barra WebPO Peru",
 "Workshop Equador 8 out: um quadro provou dores Consumidor/SL/Rewards são um cadeia de entrega — Club (4), qty POC (2), editar perfil (2), mensagens (2)",
 "Excel/CSV é SO oculto do Equador — Pareto estoque, taxas admin, fechamento cash, cargas sampling, forecast courier",
 "Cancel-after-dispatch Equador expõe economia pay-per-delivery — penalidades exigem pagamento online, não cash na porta",
 "Telão hospitalidade Equador (aniversário, futebol, reconhecimento) alinha com Momento Inesperado — precisa base CRM + inventário",
 "Voto sonhos ERP/SAP Equador + cockpit BizWam — mesmo arco longo da visão inventário tempo real Peru e pedido console admin MX",
 "Puebla Project confirma dor coordenação MX em escala: parallel-email, desync BEES e rollout turbo precisam da mesma Camada 1 que picos CDMX/PE",
 "Forecast motorizado Excel (EC) + heatmap WebPO (PE) + planilha horária Zavaleta (MX) — um UX staffing/forecast deve homologar entre mercados",
 "Integridade fulfillment (short ship, entregue falso, códigos estáticos) em Puebla liga a prova de entrega e visibilidade CX no roadmap UX",
 "Colômbia 13 set: score disponibilidade BEES↔ERP prova que verdade inventário move conversão — mesma aposta quantidade Mexico, Peru and Ecuador",
 "Colômbia marketplace + promos banco mudaram quem entra — retenção e timing CRM devem separar cerveja vs marketplace",
 "Modelo dual lojas próprias vs Community POC — Top Tiendas + API faturação são adoção aliado, não só integração",
 "Torre de Controle CO + alertas WhatsApp loja off — camada ops manual como spillover MX até alertas produto",
];

const CROSS_THEMES_PT: string[][] = [
 [
 "Visibilidade KPI tempo real — estoque, SLA, disponibilidade, dotação courier (workshop PE #1)",
 "Confiabilidade no pico — som, sessão, mapa travado, pedidos expirados",
 "Triângulo claims lento — Zendesk → e-mail → dias (workshop PE #3)",
 "Console admin estilo Armis/Vitex — entrar por código loja, inventário ao vivo (MX Luis)",
 "Polígono/cobertura manual — zonas perigosas, spillover quando vizinho desliga SKU",
 "Carga pricing/desconto manual — DDC, Diageo, PDV (workshop PE)",
 "Monitoramento fim de semana via WhatsApp — querem copilot/automação",
 "EC 8 out: qty estoque POC ao vivo (zero/infinito); recomendações assign POC; export Excel fechamento cash",
 "EC 8 out: board supervisor BizWam + alertas staffing geofence IA — voto sonhos",
 "EC 8 out: cancel após dispatch vs modelo courier pay-per-delivery",
 "Puebla Project: alertas BEES, geofence turbo, refresh tablet → expirados",
 "EC 7 out: forecast motorizado Excel + WhatsApp",
 "CO 13 set: overlap loja off + Torre de Controle fim de semana",
 "CO 13 set: próprias vs Community POC — 80/20 pedidos, ponte Top Tiendas",
 ],
 [
 "Mapa courier ao vivo — workshop Consumidor #1 + Growth P1 3 set (pin travado) — igual painel supervisão MX Andre",
 "Educação retornáveis/RGB — 44% share pedidos PE; brand page + janela Retornafest perdida (3 set)",
 "Multishowcases + Comprar de novo — roadmap produto meta 15 set; 61% conversão supera categorias",
 "Homologação AppsFlyer/MMP/Segment — bloqueia personalização (workshop #2)",
 "Gateways pagamento + promos BIN banco (workshop #3)",
 "UX wallet cupons + cupons flash (workshop #4, converge com Rewards)",
 "Cancelamentos endereço errado + sem resposta (~18% PE)",
 "Cross-sell estático — não customiza por categoria ou histórico",
 "Retornáveis virtuais + pickup — visão futura",
 "EC 8 out: editar perfil + landmarks mapa; mensagens consumidor ↔ courier (votado)",
 "EC 8 out: gateway pagamento off — fraude bloqueia taxas cancel e sonhos split pay",
 "Telão EC 8 out: aniversário, futebol, reconhecimento — rank #43",
 "CO 13 set: compradores marketplace noturnos + faixas AOV — rank #45",
 "CO 13 set: parcerias banco CAC vs retenção — rank #46",
 "CO 13 set: For You algorítmico vs SEM/sampling — rank #50",
 ],
 [
 "Enriquecimento Club TaDa × Braze (workshop #1)",
 "Cupons flash na wallet (workshop #2)",
 "Admin rewards integrado no BEES (workshop #3)",
 "Automação antifraude — risco SED Turbo (workshop #4)",
 "Earn/burn ocasião futebol — futuro #1",
 "Resgate omnichannel em Tambo/conveniência — futuro #2",
 "Tiers + correlação marca-ocasião — horizonte 3–4 anos",
 "EC 8 out: integração nativa Club TaDa — voto #1 (4); sampling quebrado; contadores promo ao vivo",
 "EC 8 out: free-gift automático + contadores promo — rank #42",
 "EC 8 out: gamificação Braze + assinatura premium — voto sonhos",
 "CO 13 set: Club TaDa sem capacidade — rank #50",
 ],
 [
 "Fragmentação Excel + Trello + VTEX — sem fonte única de verdade",
 "Promo consumidor antes do seller estocar — Corona Copa, gap Stella/BEES",
 "Mecânicas promo flash — quantidade vs tipos desconto",
 "Erros bulk upload e cálculos margem manual",
 "Sem dashboard ROI promo tempo real",
 "Aviso 7 dias seller + alinhamento slot supply ausente",
 "EC: janelas hard on/off promo flash (3x2 até 12:00) — agendamento crítico ops",
 "EC: migração parcial desconto escalonado + sampling quebrado em prod",
 "EC 8 out: promos variante → 7–8 SKUs por bundle; faixas entrega/chuva/gorjetas admin in-app",
 "CO 13 set: slots flash cerveja meio-dia / marketplace noite",
 "CO 13 set: stockout por SKU na plataforma — rank #49",
 ],
 [
 "~40% tickets são coordenação — agentes cegos ao mapa courier",
 "WhatsApp 100% padrão — sem trilha auditoria",
 "Guarda-chuva Comunicação Ecossistema — Braze + código prova + mensagens pré-definidas",
 "Motivos cancelamento obrigatórios perdidos em texto livre",
 "Disputas vasilhame → 1 estrela sem canal seller",
 "Suporte e-mail dia seguinte — lento para pico",
 "EC: WhatsApp direto seller→consumidor vs proteção dados — fluxo mediado CX preferido",
 "Puebla Project: parallel-email sem resposta, limites WhatsApp proativo",
 ],
 [
 "Híbrido dark store + Community POC — 112 POPs / 41 cidades",
 "Piloto legal antes de pricing POP in-app",
 "Landing aquisição seller (CO/MX) no GO Community POC",
 "Zonas costa/insegurança onde dark store não abre",
 "EC 8 out sonhos: listing app internacional para expats; basket festival multi-vertical",
 "CO 13 set: ~dobrar Community POC no próximo ano; próprias podem encolher estrategicamente",
 ],
];

const SESSIONS_PT: { label: string; detail: string }[] = [
 { label: "Visitas lojas CDMX", detail: "4 POCs — mapa, inventário, KPIs, WhatsApp" },
 { label: "Workshop promo", detail: "Comercial — ideação, planejamento, upload/medição" },
 { label: "Reuniões CX + Produto", detail: "Tickets coordenação, quantidade inventário, relatório Jumbo" },
 { label: "Dinâmicas OPS", detail: "Courier, Seller, Admin, CX, Consumidor — visão 2027" },
 { label: "Visitas lojas Puebla", detail: "5 POCs — promo/supply, cadeia fria, spillover" },
 { label: "Contexto + visitas lojas", detail: "Briefing país + La Marina, Merino, San Pedro" },
 { label: "Web Tiendas (WebPO)", detail: "B2B local — KPIs semanais, heatmap, pagamentos VLC" },
 { label: "Visão Service Level", detail: "OPS + Produto — comms ecossistema, inventário, Top Tiendas" },
 { label: "Workshop · Operações", detail: "Quadro OPS — desafios, futuro, visibilidade KPI" },
 { label: "Workshop · Consumidor", detail: "Quadro Consumidor — mapa ao vivo, stack dados, pagamentos" },
 { label: "Workshop · Recompensas", detail: "Quadro Rewards — Braze, wallet, antifraude" },
 { label: "Visão Consumidor", detail: "Roadmap produto (multishowcases, Comprar de novo) + 18 dores Growth priorizadas" },
 {
 label: "Prep visão produto",
 detail: "Híbrido Community POC, portfólio/ruptura, couriers MotoGP, CRM/NPS — prep workshop OYP 8 out",
 },
 {
 label: "Workshop OYP (Lucid)",
 detail: "Quadro único Consumidor + SL + Rewards — votação, sonhos, hospitalidade; Club TaDa #1, estoque POC, perfil, cockpit BizWam",
 },
 {
 label: "Intro produto 1YP",
 detail: "Growth/marketplace, disponibilidade BEES↔SIESA, próprias vs Community POC, stockout SKU, Club/For You, API faturação — mesmos temas da aba Global All.",
 },
 {
 label: "Puebla Project",
 detail: "Rotação CX + lojas Puebla/AGS — e-mail paralelo, Turbo/BEES, WhatsApp proativo; alinhado a temas da aba Global All.",
 },
];

const POSITIVE_SIGNALS_PT: { title: string; detail: string }[] = [
 {
 title: "Web Tiendas Peru (WebPO)",
 detail:
 "Portal B2B local: KPIs semanais, heatmap demanda, pagamentos VLC, produtos da semana. La Marina + Merino usuários diários. Template do que a plataforma seller deve virar.",
 },
 {
 title: "Badge primeiro pedido",
 detail: "Uso ativo e valorizado nas POCs Puebla — reduz erros de coordenação em clientes novos.",
 },
 {
 title: "UX localização Brasil",
 detail: "50% mais rápido input endereço, −1 pp cancelamentos localização — candidato rollout config Peru.",
 },
 {
 title: "Club TaDa + foco retornável",
 detail: "Estratégia growth Peru alinha portfólio com retenção — retornáveis retêm 31,3% vs 20,7% só Marketplace.",
 },
 {
 title: "Relatório Financeiro Courier (Jumbo)",
 detail: "Reunião produto: resumo semanal pagamento courier lançando na plataforma seller.",
 },
 {
 title: "Código confirmação entrega",
 detail: "Pronto globalmente — piloto por loja no Peru. Reduz disputas de entrega.",
 },
 {
 title: "Notification center (piloto Bolívia)",
 detail: "Inbox seller para campanhas e comms ops — homologar para LATAM.",
 },
 {
 title: "Controle ruptura Equador (0,8%)",
 detail:
 "Supply centralizado + DDC por POC + incentivo POC <2% ruptura — playbook ops benchmark enquanto UX quantidade evolui.",
 },
 {
 title: "Gamificação courier MotoGP",
 detail:
 "Pontos treinamento, gates SLA/rating, gift cards, bônus chuva/evento — canal reativação quando gaps forecast aparecem.",
 },
 {
 title: "Incrementalidade holdout CRM",
 detail: "S40: +50% sex / +40% dom vs controle; documenta quando pushes funcionam vs quando checkout quebra a promessa.",
 },
 {
 title: "Alinhamento workshop OYP Equador",
 detail:
 "Sessão Lucid 8 out validou apostas near-term com votos — integração Club, tooling POC, perfil/geo — e sonhos (ERP, assinatura, split pay) em um quadro cross-pilar.",
 },
 {
 title: "Score disponibilidade Colômbia (BEES vs ERP)",
 detail:
 "Ranking comercial + pagamento variável quando loja tem estoque mas SKU off no BEES — subiu onboarding/conversão.",
 },
 {
 title: "Escala aquisição parcerias Colômbia",
 detail: "10–15% usuários CAC ~US$2–3 — prova canal banco; falta desenho retenção.",
 },
];

const TOPIC_HEADLINE_PT: Record<GlobalTopicSnapshot["id"], string> = {
 consumer:
 "Peru 2–3 set votou mapa ao vivo #1; Equador 8 out votou perfil/geo + mensagens e restrições pagamento off — mesmo cadeia de entrega de confiança das visitas Mexico and Peru.",
 rewards:
 "Club TaDa é o fio hemisférico: stack workshop Peru + voto #1 Equador 8 out (4) por integração nativa. Segurar tiers/omnichannel até Camada 1 confiabilidade + verdade sampling/catálogo.",
};

export function getGlobalConvergences(locale: Locale): string[] {
 if (locale === "en") return GLOBAL_CONVERGENCES;
 return CONVERGENCES_PT;
}

export function getGlobalCrossByArea(locale: Locale) {
 if (locale === "en") return GLOBAL_CROSS_BY_AREA;
 return GLOBAL_CROSS_BY_AREA.map((row, i) => ({
...row,
 area: AREA_PT[row.area],
 themes: CROSS_THEMES_PT[i] ?? row.themes,
 }));
}

export function getGlobalSessions(locale: Locale) {
 if (locale === "en") return GLOBAL_SESSIONS;
 return GLOBAL_SESSIONS.map((s, i) => ({
...s,
 country: formatGlobalCountry(locale, s.country as GlobalCountry),
 label: SESSIONS_PT[i]?.label ?? s.label,
 detail: SESSIONS_PT[i]?.detail ?? s.detail,
 }));
}

export function getGlobalPositiveSignals(locale: Locale) {
 if (locale === "en") return GLOBAL_POSITIVE_SIGNALS;
 return GLOBAL_POSITIVE_SIGNALS.map((row, i) => ({
...row,
 title: POSITIVE_SIGNALS_PT[i]?.title ?? row.title,
 detail: POSITIVE_SIGNALS_PT[i]?.detail ?? row.detail,
 countries: row.countries.map((c) => formatGlobalCountry(locale, c as GlobalCountry)),
 }));
}

const WORKSHOP_BLOCK_LABEL_PT: Record<string, string> = {
 "pe-sep2-consumer": "Workshop Peru · 2 set",
 "pe-sep2-rewards": "Workshop Peru · 2 set",
 "ec-oct8-consumer": "Workshop OYP Equador · 8 out — votos Consumidor",
 "ec-oct8-sl": "Workshop OYP Equador · 8 out — votos Nível de serviço",
 "ec-oct8-rewards": "Workshop OYP Equador · 8 out — votos Rewards",
};

export function getGlobalTopicSnapshots(locale: Locale): GlobalTopicSnapshot[] {
 if (locale === "en") return GLOBAL_TOPIC_SNAPSHOTS;
 const cross = getGlobalCrossByArea(locale);
 const themesByAreaEn = GLOBAL_CROSS_BY_AREA.map((r) => r.area);
 return GLOBAL_TOPIC_SNAPSHOTS.map((snap) => {
 const areaKey = snap.id === "consumer" ? "Consumer" : "Rewards";
 const areaIdx = themesByAreaEn.indexOf(areaKey);
 const localizedThemes = areaIdx >= 0 ? cross[areaIdx].themes : snap.themes;
 return {
...snap,
 label: snap.id === "consumer" ? "Consumidor" : "Rewards",
 headline: TOPIC_HEADLINE_PT[snap.id] ?? snap.headline,
 themes: localizedThemes,
 workshopVoteBlocks: snap.workshopVoteBlocks.map((block) => ({
...block,
 label: WORKSHOP_BLOCK_LABEL_PT[block.id] ?? block.label,
 })),
 };
 });
}
