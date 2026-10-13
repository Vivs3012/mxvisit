import { EC_CONTEXT_MEETING } from "../../ecuador-context-meeting";
import type { Locale } from "../locale";

const EC_EXEC_PT = {
 headline:
 "Equador opera 26 dark stores (28 no plano de expansão) com forte controle de ruptura (0,8%), mas aposta no modelo híbrido Community POC para chegar a 41 cidades — enquanto gaps de produto (pagamentos, sampling, troca de POC pelo courier, reposição sugerida) bloqueiam os temas do workshop de amanhã.",
 paragraphs: [
 "Operação é 100% dark-store hoje — nenhum Community POC live. Filtro nacional de densidade + digitalização gera 41 cidades-alvo (de 6 hoje) e plano de 4 anos para 112 Community POCs junto às 28 dark stores existentes (não migração total). Cenário híbrido projeta ~1,14M pedidos (+87% vs LE610k), receita líquida ~16M (+50%), EBITDA ~5,3M — principalmente para atacar costa/zonas de concorrência (ex. insegurança em Guayaquil) onde dark store não abre. Restrições legais exigem piloto antes de precificação de referência no app para donos de Community POP.",
 "Portfólio centralizado: ~95% supply ABI + 5% terceiros; templates duas vezes por semana via BEES/key-account. KPI ruptura ~0,8% (faixa-alvo <2%) via supply (Cris), auditoria diária SKU-on e incentivo variável (~15¢/pedido se ruptura <2%). Um DDC por POC (23 POCs no Excel promocional) — mesmo play de granularidade do Peru; risco ao escalar para centenas de POCs. Sem quantidade interna de inventário no seller → cancelamentos subiram após cancelamento iniciado pelo consumidor; time quer reposição sugerida como outros apps de delivery.",
 "Staffing de courier usa simulador semanal: pedidos projetados por hora × taxa efetiva por motorizado por POC (garitas, distância). Compartilhado seg/ter no WhatsApp; gaps fechados via gamificação MotoGP (sobretaxa chuva, perks troca de óleo). Equador quer essa lógica automatizada no BEES. Supervisores rodam Power BI FOR com calculadoras de projeção — página home de KPI do seller existe mas POCs não usam.",
 "Consumidor: gateway de pagamento bloqueado por trauma de fraude passada (clonagem de cartão, colapso CX) — cash-on-delivery ainda domina. Motor promocional usa migração step discount (portfólio parcial), Promo Flash para destilados, promos regulares seg–qui vs noite sex/sáb mais cara. Aquisição majoritariamente mídia paga EPA; CRM lifecycle com testes holdout (+50% lift sex/dom), hiperpersonalização no Braze, gamificação mascote “T”. NPS set 82,21 (promotores 2668 / detratores 173); temas detratores: tempos, estoque, preço/promos. Dores para produto: sampling quebrado, motorizado não troca POC sem ticket, WhatsApp seller→consumidor vs norma de proteção de dados no Equador (fluxo mediado por CX preferido).",
 ],
 takeaways: [
 { label: "Expansão", text: "Híbrido 28 DS + 112 Community POCs → 67% cobertura pop; piloto + legal antes de escalar." },
 { label: "Serviço", text: "Ruptura 0,8% + DDC/POC; couriers previstos manualmente — automatizar no BEES." },
 { label: "Produto", text: "Pagamentos, estoque sugerido, sampling, troca de POC, visibilidade de reembolso no roadmap." },
 { label: "Crescimento", text: "Aquisição EPA + disciplina holdout CRM; gateway e UX promocional = dores top do consumidor." },
 ],
};

export function getEcuadorExecutiveSummary(locale: Locale) {
 if (locale === "en") return EC_CONTEXT_MEETING.executiveSummary;
 return EC_EXEC_PT;
}
