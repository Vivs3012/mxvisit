export type WorkshopPriority = 1 | 2 | 3 | 4;

export type WorkshopItem = {
 id: string;
 title: string;
 detail: string;
 priority?: WorkshopPriority;
 tags?: string[];
};

export type WorkshopGroup = {
 id: "operations" | "consumer" | "rewards";
 label: string;
 workshopTeamNote?: string;
 challenges: WorkshopItem[];
 challengesPrioritized: WorkshopItem[];
 futureVision: WorkshopItem[];
 futurePrioritized: WorkshopItem[];
};

export const PE_WORKSHOP_0209 = {
 date: "02/09/2026",
 title: "One Year Plan 2027 — cross-functional workshop",
 location: "BeerHub + Calle Augusto Tamayo — Lima",
 duration: "3h00",
 facilitator: "Vivian (design lead, operations) · Javi (Rewards) · Tiago (product)",
 participants:
 "Peru OPS (stores, couriers, CX, admin), Consumer/Growth, Rewards/Club TaDa — visiting product team (Brazil/Mexico).",

 objective:
 "Open exchange between Operations, Consumer and Rewards to identify challenges, share perceptions and co-create 2027 opportunities — connecting ops needs with consumer expectations and loyalty levers.",

 agenda: [
 { time: "10 min", activity: "Kick-off — objective, rules, team split (OPS vs Consumer+Rewards)" },
 { time: "60 min", activity: "Challenge board — 20 min team work + 18 min presentations each" },
 { time: "10 min", activity: "Challenge prioritization vote (all together)" },
 { time: "10 min", activity: "Break" },
 { time: "55 min", activity: "Future product vision — 15 min team work + 15 min presentations" },
 { time: "10 min", activity: "Future vision prioritization vote" },
 { time: "10 min", activity: "El Momento Inesperado — 5 min ideation + 5 min reflection" },
 ],

 rules: [
 "Everyone can participate",
 "Listen without interrupting",
 "No right or wrong answers",
 "Bring real examples from operations or consumer experience",
 "Speak with sincerity and respect",
 "Focus on building together, not blaming",
 ],

 executiveSummary: {
 headline:
 "Sep 2 workshop aligned Peru OPS, Consumer and Rewards on 2027 — from reactive fixes to predictive ops, data traceability, and omnichannel loyalty.",
 paragraphs: [
 "Three hours at BeerHub split Operations (own board) from Consumer + Rewards (shared board, then split in presentations). Part 1 mapped 30+ operational pains and 20+ consumer/rewards frictions on sticky notes. Part 2 dreamed beyond today's backlog — vending machines, football occasion, omnichannel redemption, AI copilots.",
 "Operations voted predictability: real-time KPI visibility (stock, SLA, availability), polygon automation, claims resolution speed, SKU restrictions on coupons. Consumer prioritized live courier map, AppsFlyer/Segment data consistent rollout, payment gateways (BIN/bank promos), coupon wallet UX. Rewards prioritized Braze enrichment, flash coupons in wallet, BEES-integrated admin, anti-fraud automation.",
 "Future vision: OPS wants scheduled orders, vending pickup, BEES→TADA small orders, OXXO/Tambo scale. Consumer wants Netflix personalization, virtual returnables, TikTok/Meta shops, party packs. Rewards wants football earn/burn, omnichannel redemption, tiers (3–4 year horizon), brand-occasion point correlation. Closing exercise: hospitalidad — surprise kits at football pitches, birthday DJ packages, Club first-order beer, stadium experiences for super-fans.",
 ],
 },

 groups: [
 {
 id: "operations",
 label: "Operations",
 workshopTeamNote: "Dedicated board — stores, couriers, CX, admin (27.CX.ADMI).",
 challenges: [
 { id: "ops-stock", title: "Stock completeness & hot-product visibility", detail: "Stores don't maintain full portfolio; hot SKUs lack live visibility. Supervisors can't see which stores activated new CRM products." },
 { id: "ops-rider-dot", title: "Courier dotation — real-time & consolidated", detail: "No live view of how many couriers are active per store; weekend vs weekday demand mismatch (Mon 1 moto, weekend overload)." },
 { id: "ops-claims", title: "Slow claims resolution & parallel email comms", detail: "Zendesk → store email chain takes days; CX, store and consumer not triangulated. Compensation coupons only if customer contacts support." },
 { id: "ops-supply", title: "Supply truck prioritization", detail: "When truck doesn't arrive, store has no stock — no sales. Needs seller-connected prioritization." },
 { id: "ops-rating", title: "Unfair order rating for sellers", detail: "Customers rate down for high prices or wrong address — penalty stays on seller KPIs." },
 { id: "ops-invoice", title: "Real-time invoicing (boleta/factura)", detail: "Stores slow to issue tax documents; CX tickets days later for RUC/factura requests." },
 { id: "ops-poc-capture", title: "New POC acquisition", detail: "Manual expansion; Envía Más integration pending." },
 { id: "ops-rider-capture", title: "Courier acquisition & rotation", detail: "Hard to recruit and retain motorizados; high churn." },
 { id: "ops-onboarding", title: "Multimedia onboarding for stores", detail: "Training doesn't stick — next shift forgets. No durable ABC for accepting orders." },
 { id: "ops-tracking", title: "Order tracking for stores", detail: "Store doesn't know if courier is arriving; customer tracking stuck on map." },
 { id: "ops-polygon", title: "Dynamic polygons & dangerous zones", detail: "Manual polygon changes; can't exclude red zones (BEES has exclusion polygons — TADA doesn't). No order transfer when store cancels." },
 { id: "ops-poc-name", title: "POC name visible to consumers", detail: "Fraud/cancel gaming between competitors; discussed globally." },
 { id: "ops-sound", title: "Order sound / multi-login", detail: "Same account on office PC + store — sound plays on wrong device; orders expire." },
 { id: "ops-availability", title: "Store open/closed notifications", detail: "Manual checks if store forgot to go offline; expired orders at midnight." },
 { id: "ops-weekend", title: "Weekend & midnight monitoring", detail: "Supervisors answering WhatsApp Sunday 4pm; need copilot/automation." },
 { id: "ops-manual-pricing", title: "Manual price/discount load", detail: "High manual work for DDC, Diageo, PDV, NPP price and discount changes." },
 { id: "ops-wrong-address", title: "Cancellations — wrong address & no answer", detail: "High cancel rate when user doesn't respond or address is wrong." },
 { id: "ops-sku-priority", title: "Manual SKU categorization & prioritization", detail: "Sellers lack matrix for which SKUs are priority." },
 { id: "ops-compensation", title: "Compensation execution delays", detail: "Cupons and refunds slow to execute." },
 { id: "ops-support", title: "First-line seller support", detail: "Isolated cases need immediate support — today fragmented." },
 { id: "ops-expired", title: "Stores stay open with expired orders", detail: "Proposal: auto-off after N expired orders (debated)." },
 { id: "ops-reniec", title: "RENIEC integration for accounts", detail: "Identity verification for account creation." },
 { id: "ops-tickets", title: "High support ticket volume", detail: "CX ticket demand growing." },
 { id: "ops-tools", title: "Multiple tools for management", detail: "Fragmented toolchain for daily ops." },
 { id: "ops-customer-requests", title: "Additional customer requests", detail: "Edge cases not handled in platform." },
 ],
 challengesPrioritized: [
 { id: "ops-p1-visibility", title: "Real-time KPI visibility (stock, SLA, availability, hot products)", detail: "Live dashboard for supervisors and sellers — alerts before SLA breaks, stockout risk, stores on/off. Move from corrective to predictive ops.", priority: 1 },
 { id: "ops-p2-automation", title: "Automation + AI copilot for POC admin", detail: "Auto-adjust coverage when courier dotation low; polygon changes by KPI; grouping recommendations with SLA guardrails.", priority: 2 },
 { id: "ops-p3-claims", title: "Claims resolution & stakeholder communication", detail: "Faster triangle between CX, store and consumer — credits/refunds like market best practice, not parallel email.", priority: 3 },
 { id: "ops-p4-coupon-sku", title: "SKU restrictions on coupon creation", detail: "Restrict non-ABI products in coupons — reduces errors, cancellations, unfair seller impact and payment issues.", priority: 4 },
 ],
 futureVision: [
 { id: "ops-f-drone", title: "Drone & robot deliveries", detail: "Marketing/experimental near stadiums." },
 { id: "ops-f-prime", title: "TADA Prime subscription", detail: "Subscription tier for consumers." },
 { id: "ops-f-turbo", title: "TADA Turbo — premium faster delivery", detail: "Higher fee for speed tier (6 votes on board)." },
 { id: "ops-f-riders-od", title: "On-demand riders (other companies)", detail: "Rappi/PedidosYa as overflow couriers." },
 { id: "ops-f-bees", title: "Automatic replenishment (BEES/TADA)", detail: "Supply triggered by sales data." },
 { id: "ops-f-rider-project", title: "Proyecto Rider", detail: "Courier payment/QR system in courier app." },
 { id: "ops-f-repedido", title: "Re-order from consumer tool + POC web", detail: "Pedidos Wow — single tool for support and re-order." },
 { id: "ops-f-tracking", title: "Real-time courier tracking in order history", detail: "Full traceability logged per order." },
 { id: "ops-f-vending", title: "Vending machines for pickup", detail: "QR pickup at machines — skip last mile." },
 { id: "ops-f-scheduled", title: "Scheduled orders by time window", detail: "Order at 3am for 9am delivery or pickup." },
 { id: "ops-f-copilot", title: "Copilot in Seller + bot self-service", detail: "AI guides store through operations." },
 { id: "ops-f-scan-stock", title: "Stock activation via receipt scan", detail: "Scan supplier invoice → SKUs turn on (incl. cold chain constraints)." },
 { id: "ops-f-bis-small", title: "BEES small orders → TADA sellers", detail: "Orders below BEES minimum (~S/1000) flow to POC network." },
 { id: "ops-f-oxxo", title: "OXXO / Tambo / dark stores as pickup points", detail: "Scale from 89 to 400+ points via partnerships." },
 { id: "ops-f-rappi-poc", title: "Rappi / PedidosYa as convenience POCs", detail: "Controversial — two couriers on same order debated." },
 ],
 futurePrioritized: [
 { id: "ops-fp1-scheduled", title: "Scheduled orders + vending machine pickup", detail: "Programmed windows and QR vending pickup — more orders without courier complexity.", priority: 1 },
 { id: "ops-fp2-copilot", title: "Bot/APP self-service + Seller copilot + stock from receipts", detail: "Reduce manual ops; scan invoice to activate inventory; combo SKU individual toggles.", priority: 2 },
 { id: "ops-fp3-bis", title: "BEES small orders delivered by TADA", detail: "Capture B2B-adjacent volume BEES won't serve.", priority: 3 },
 { id: "ops-fp4-partners", title: "Dark stores & convenience chains (OXXO, Tambo)", detail: "Explosive POC scale via partnerships.", priority: 4 },
 ],
 },
 {
 id: "consumer",
 label: "Consumer",
 workshopTeamNote: "Shared board with Rewards for ideation; Consumer priorities presented separately.",
 challenges: [
 { id: "con-load", title: "App load time — among slowest", detail: "Intro screen, content cards, videos, checkout form — 3–7s per section. Top-10 slowest apps cited." },
 { id: "con-mmp", title: "AppsFlyer vs Segment — no data consistent rollout", detail: "Transactional data incomplete in MMP; blocks attribution, incrementality, marketing mix models." },
 { id: "con-sdk", title: "SDK ↔ MMP integration missing", detail: "App transactional events don't fully reach AppsFlyer." },
 { id: "con-anonymous", title: "Anonymous user tracking", detail: "Can't optimize media when users opt out of identification." },
 { id: "con-installs", title: "Install/uninstall events", detail: "Not customized — can't measure churn." },
 { id: "con-governance", title: "Event governance (App → Braze)", detail: "Native vs custom events misaligned; no alerts on app updates." },
 { id: "con-deeplink", title: "Deep links / OneLinks", detail: "Coupon redemption traceability gaps; post-purchase banner doesn't measure usage." },
 { id: "con-keywords", title: "Keyword monetization", detail: "Search ads / sponsored placement in catalog." },
 { id: "con-payment", title: "Payment gateway limitations (Niubiz)", detail: "Can't do BIN/bank promos like Mercado Pago." },
 { id: "con-courier-map", title: "Courier map tracking stuck", detail: "#1 consumer ask: 'where is my order?' — map rarely moves in real time." },
 { id: "con-promos", title: "Promotions & mass price/coupon creation", detail: "Manual SKU-level coupon builds; progressive discount with flavor variety blocked." },
 { id: "con-crosssell", title: "Static cross-sell / upsell", detail: "Same carousel for everyone on PDP; can't customize by category or user history." },
 { id: "con-sampling", title: "Regalo para ti / sampling", detail: "Only 30% use rate; Peruvians don't understand flow; inventory chaos at sellers." },
 { id: "con-wallet", title: "Coupon wallet UX", detail: "Doesn't match competitor mental model; T&C hidden; manual sort order." },
 { id: "con-fomo", title: "Social proof / FOMO indicators", detail: "'3000 people ordered this' — generic, not customizable." },
 { id: "con-conversion", title: "Banner conversion by SKU group", detail: "Can't measure if Ron X banner drove Ron X purchase." },
 { id: "con-stock-push", title: "Out-of-stock notification", detail: "Suggest alternate product; notify when back in stock." },
 { id: "con-ads-segment", title: "Automated ad segmentation", detail: "Caps on banner views/clicks; in-app monetization." },
 { id: "con-cart-ads", title: "Post-cart / post-order ad space", detail: "Monetize while customer waits." },
 { id: "con-returnable", title: "Returnable products — confusing UX", detail: "Hard for new users to understand visually." },
 { id: "con-seller-matrix", title: "Sellers lack SKU priority matrix", detail: "Don't know which SKUs matter for ops." },
 { id: "con-courier-count", title: "Sellers don't know ideal courier count", detail: "No guidance for good service history." },
 ],
 challengesPrioritized: [
 { id: "con-p1-map", title: "Real-time courier tracking on map", detail: "Consumer doesn't distinguish new vs retained — everyone expects live moto on map from pickup to delivery.", priority: 1 },
 { id: "con-p2-mmp", title: "SDK + MMP integration & data consistent rollout", detail: "Close AppsFlyer gap (70–80% of orders seen); enable attribution and paid media optimization.", priority: 2 },
 { id: "con-p3-payment", title: "Payment gateways (BIN / bank campaigns)", detail: "Mercado Pago-style partnerships — BBVA, BCP promos; unlock acquisition via card partnerships.", priority: 3 },
 { id: "con-p4-wallet", title: "Coupon wallet UX & ordering", detail: "Visual redesign; monetary + non-monetary; Club TaDa integration without burying other coupons; manual sort today.", priority: 4 },
 ],
 futureVision: [
 { id: "con-f-personalize", title: "Netflix-style app personalization", detail: "Each user sees tailored brands, coupons, collections." },
 { id: "con-f-genz", title: "Gen Z readiness — TikTok Shop, social integrations", detail: "Sell through TikTok/Meta; AI assistants (ChatGPT, Gemini) as discovery." },
 { id: "con-f-scheduled", title: "Schedule order & pay less (or wait longer = cheaper)", detail: "Rappi-style deferred delivery discount." },
 { id: "con-f-returnable", title: "Virtual returnable containers", detail: "Return at bodega/locker; balance in app — no hoarding at home." },
 { id: "con-f-pickup", title: "In-store pickup — save delivery fee", detail: "Removes weight limits; 5% in Brazil." },
 { id: "con-f-events", title: "TADA eventos + shop in app", detail: "Buy concert tickets, chopp, combos in venue." },
 { id: "con-f-meta", title: "Meta & TikTok Shop integration", detail: "Ads with live prices; social commerce." },
 { id: "con-f-party", title: "Party packs / sell everything Oxxo-Tambo sells", detail: "Snacks, ice, mixers — native combos with discount." },
 { id: "con-f-group", title: "Group order — mini carts, split pay", detail: "Rappi Turbo style link for meetings." },
 { id: "con-f-gift", title: "Gift shipping — prepaid, no receipt", detail: "Send beer as gift anonymously." },
 { id: "con-f-ai-sales", title: "AI-assisted sales in app", detail: "Chatbot ordering; conversational commerce." },
 { id: "con-f-local-tada", title: "Integration with other TaDas — local top products", detail: "Cross-country specialty SKUs (7 votes — highest on board)." },
 { id: "con-f-concert", title: "Concert tickets + beer combos", detail: "Pre-buy chelas for venue; no internet at stadium." },
 { id: "con-f-omni-physical", title: "Physical → digital loyalty", detail: "Bodega purchases earn points; redeem at corner store." },
 { id: "con-f-security", title: "Security & payment methods future", detail: "Passwordless, safer checkout." },
 ],
 futurePrioritized: [
 { id: "con-fp1-returnable", title: "Virtual returnables + in-store pickup", detail: "Tied #1 in team vote — retornables without home storage; pickup saves delivery.", priority: 1 },
 { id: "con-fp2-personalize", title: "App personalization (Netflix model)", detail: "Algorithms show right products, coupons, collections per user.", priority: 2 },
 { id: "con-fp3-events", title: "TADA eventos integrated in app", detail: "Tickets, venue shop, chopp — incremental 24h sales.", priority: 3 },
 { id: "con-fp4-meta", title: "Meta + TikTok Shop integration", detail: "Social commerce and AI discovery positioning.", priority: 4 },
 ],
 },
 {
 id: "rewards",
 label: "Rewards",
 workshopTeamNote: "Shared ideation board with Consumer; own green stickies for Rewards 2027.",
 challenges: [
 { id: "rew-braze", title: "Club TaDa × Braze — limited interaction", detail: "Want points for surveys, channel opt-in, data enrichment — not only monetary coupons." },
 { id: "rew-flash", title: "Flash coupons in wallet", detail: "Countdown hour/day coupons like flash promos — not built." },
 { id: "rew-admin", title: "Rewards admin separate from BEES", detail: "Download CAO lists; manual anti-fraud for bodegueros; should live in BEES admin." },
 { id: "rew-automation", title: "Raffle/mission winner automation", detail: "Manual quantity of chances; winner selection." },
 { id: "rew-optout", title: "Opt-out self-service", detail: "Users can't easily manage comms preferences." },
 { id: "rew-merch", title: "Instant merch redemption", detail: "Can't burn points for physical merch in real time." },
 { id: "rew-burn-brand", title: "Brand-specific burn coupons", detail: "Cupones for X brand only." },
 { id: "rew-braze-banners", title: "CT banners from Braze", detail: "Campaign tooling gaps." },
 { id: "rew-coupon-images", title: "Coupon images in wallet", detail: "Visualización de cupones en cuponera." },
 { id: "rew-tiers", title: "User levels / tiers", detail: "Not implemented — 85% active users enrolled but only B tier; tier progression discussed." },
 { id: "rew-session", title: "SessionM custom events", detail: "Enrollment and burn events — integration with Bees One." },
 { id: "rew-catalog", title: "Catalog update Bees One ↔ SessionM", detail: "Sync friction." },
 { id: "rew-points-batch", title: "Batch points summation", detail: "Improve batch point crediting; order_bk in points history." },
 { id: "rew-brand-logistics", title: "Brand merch to POCs (e.g. Pilsen Callao glass)", detail: "POC model makes national sampling logistics hard." },
 ],
 challengesPrioritized: [
 { id: "rew-p1-braze", title: "Club TaDa × Braze — points for enrichment & channels", detail: "Sum points for surveys, data enrichment, channel opt-in — reduce monetary coupon dependency.", priority: 1 },
 { id: "rew-p2-flash", title: "Flash coupon (burn) like flash promos", detail: "Time-boxed wallet coupons with countdown.", priority: 2 },
 { id: "rew-p3-admin", title: "Rewards admin inside BEES admin", detail: "Unified platform for coupons, missions, rules — not separate download workflow.", priority: 3 },
 { id: "rew-p4-fraud", title: "Automated anti-fraud rules", detail: "Block bodegueros and abnormal point patterns via SessionM interface.", priority: 4 },
 ],
 futureVision: [
 { id: "rew-f-football", title: "Develop — football occasion earn/burn", detail: "API football scores; predict winner; points during matches; flash coupons at halftime." },
 { id: "rew-f-omni", title: "Omnicanality — redeem at POC, Tambo, supermarket", detail: "50 points = beer at store, OXXO, or super — not app-only." },
 { id: "rew-f-tiers", title: "Tiers (bronze/silver/gold)", detail: "Order priority, differentiated monetary/non-monetary coupons, gifts, reserved experiences, exclusive benefits — 3–4 year horizon." },
 { id: "rew-f-occasion", title: "Brand–occasion point correlation", detail: "Cristal 2× for football experiences; Cusqueña 2× for gastronomy; Corona for relax — educate via points." },
 { id: "rew-f-exchange", title: "Point exchange between users", detail: "With limits — debated; fraud concern (Yape tapas lesson)." },
 { id: "rew-f-loyalty-partners", title: "Club TaDa ↔ other loyalty programs", detail: "Uber, Starbucks coupons — alliance model." },
 { id: "rew-f-socio", title: "Socio torcedor / team partnerships", detail: "Flamengo model; Cristal + football teams; jersey + entry bundles." },
 { id: "rew-f-premium", title: "Premium hospitality", detail: "Reserved table at Maido/Vista Corona; first round free; concert VIP; skip club line." },
 { id: "rew-f-bembos", title: "Tier decay / relationship stages", detail: "Bembos-style progression — lose tier if inactive; emotional lock-in." },
 { id: "rew-f-tambo", title: "Tambo redemption pilot", detail: "Like OXXO in Mexico — controlled test before full omnichannel." },
 ],
 futurePrioritized: [
 { id: "rew-fp1-football", title: "Develop football occasion (earn/burn + API)", detail: "Live match integration, predictions, in-match purchases — MVP via Braze, ideal SessionM engine.", priority: 1 },
 { id: "rew-fp2-omni", title: "Omnicanality", detail: "Redeem at POC, tienda de conveniencia, supermarket — test with Tambo.", priority: 2 },
 { id: "rew-fp3-tiers", title: "Tiers with exclusive benefits", detail: "Order priority, differentiated coupons, gifts, reserved experiences — not for next 6 months, 3–4 years.", priority: 3 },
 { id: "rew-fp4-occasion", title: "Occasion correlation (brand → experience)", detail: "Cristal→football, Pilsen→music, Corona→sunset — educate consumer via point multipliers.", priority: 4 },
 ],
 },
 ] satisfies WorkshopGroup[],

 momentoInesperado: {
 title: "El Momento Inesperado — Hospitalidad",
 prompt:
 "5% of 'Cusco' budget for unexpected hospitality. If the system could surprise consumers, sellers or couriers — what would make them feel truly seen?",
 pdfStarters: [
 "System detects a store having order problems and recommends actions before impact",
 "Product remembers consumer preferences and anticipates needs",
 "Rewards surprises based on behavior — not just promotions",
 ],
 ideas: [
 { id: "mi-football-kit", group: "all", title: "Football pitch proximity kit", detail: "Order near a canchita → send special kit (vasos, pelota, camisetas, chalecos)." },
 { id: "mi-birthday-big", group: "all", title: "Birthday mega-order", detail: "Larger birthday order with complementary DJ, snacks, chairs — CRM detects cumpleaños." },
 { id: "mi-birthday-free", group: "all", title: "Free delivery on birthday", detail: "Día cumpleaños — delivery free (not B2B)." },
 { id: "mi-team-assets", group: "all", title: "Favorite team assets", detail: "Destapadores and merch from user's team (U, Alianza, Arsenal…)." },
 { id: "mi-wow-dates", group: "all", title: "Pedidos WOW on special dates", detail: "Double football ticket + card + monthly order discount." },
 { id: "mi-hincha", group: "rewards", title: "Super-fan stadium experience", detail: "Identify hincha zavalo — pickup from home, backstage, full hospitality at stadium." },
 { id: "mi-inactive", group: "consumer", title: "Comeback surprise", detail: "If you don't order for a while → free delivery of your most-ordered products." },
 { id: "mi-lovers-refund", group: "rewards", title: "Year-end lovers refund", detail: "Devolución de compras del año to top users." },
 { id: "mi-kol", group: "rewards", title: "KOL access for Lovers", detail: "Influencer experiences for top tier." },
 { id: "mi-oos-free", group: "consumer", title: "Missing product → free next time", detail: "If product unavailable, arrives free on following order." },
 { id: "mi-first-club", group: "rewards", title: "First Club order gift", detail: "Free beer + special message on first Club TaDa order." },
 { id: "mi-priority-pass", group: "rewards", title: "Priority pass / premium club", detail: "Reserved experiences for being part of the club." },
 ],
 highlightedRead: "Football kit near canchita + birthday experiences + first Club order beer with personal message.",
 },

 photos: [
 { id: "IMG_7052", label: "OPS — Challenges board", src: "/peru/workshop-0209/IMG_7052.jpg" },
 { id: "IMG_7057", label: "OPS — Challenge prioritization", src: "/peru/workshop-0209/IMG_7057.jpg" },
 { id: "IMG_7058", label: "OPS — Future prioritization", src: "/peru/workshop-0209/IMG_7058.jpg" },
 { id: "IMG_7039", label: "Consumer — Challenges board", src: "/peru/workshop-0209/IMG_7039.jpg" },
 { id: "IMG_7042", label: "Consumer — Challenge prioritization", src: "/peru/workshop-0209/IMG_7042.jpg" },
 { id: "IMG_7041", label: "Consumer — Futuro (votes)", src: "/peru/workshop-0209/IMG_7041.jpg" },
 { id: "IMG_7043", label: "Consumer — Futuro prioritized", src: "/peru/workshop-0209/IMG_7043.jpg" },
 { id: "IMG_7045", label: "Rewards — Challenges board", src: "/peru/workshop-0209/IMG_7045.jpg" },
 { id: "IMG_7049", label: "Rewards — Challenge prioritization", src: "/peru/workshop-0209/IMG_7049.jpg" },
 { id: "IMG_7050", label: "Rewards — Future prioritization", src: "/peru/workshop-0209/IMG_7050.jpg" },
 { id: "IMG_7059", label: "Momento Inesperado", src: "/peru/workshop-0209/IMG_7059.jpg" },
 ],

 source:
 "Peru/02:09/Workshop/ — PDF agenda, 5 transcripts, 25 board photos (Sep 2, 2026)",
};
