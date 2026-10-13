export type MeetingTopic = {
 title: string;
 detail: string;
 quotes: string[];
};

export type MeetingSection = {
 id: string;
 label: string;
 summary: string;
 topics: MeetingTopic[];
};

export const PE_CONTEXT_MEETING = {
 date: "31/08/2026",
 location: "Lima office — Peru",
 participants:
 "Peru commercial / growth / ops (Ulises, Eloy, Alex) + visiting product team (Brazil). Afternoon: Eduardo + Ginger, Diego and Manuel visit 3 POCs.",
 context:
 "Morning briefing on how Peru is built: POC expansion, service KPIs, portfolio (ABI + Marketplace), growth (acquisition, retention, Club TaDa, awareness). Same day as the Lima store visits (La Marina, Merino, San Pedro).",

 executiveSummary: {
 headline:
 "Peru is a third-party POC operation, ABI-led, growing ~25% in orders — with Fill Rate, RGB mix and awareness as the three structural gaps.",
 paragraphs: [
 "The country runs almost entirely through third parties: 89 POCs (from 48 in 2024, targeting 90+ this year) already deliver ~89% of volume. Own retail stores closed last year; remaining owned sites are Dark Stores only. Acquisition of new POCs is still manual — Backus/BEES client base + WhatsApp — with no landing page (Mexico and Colombia already have one). Multi-POC owners are an expansion shortcut, similar to Brazil’s Breja Boy.",
 "Four cities are live. Lima is ~88% of orders and more than 80% of customers. Arequipa (~5% of orders) has the most remaining geographic potential, but sierra topography keeps expansion in the city center. Piura (~4%) is coastal, concentrated on a few local beer brands. Trujillo is also coastal, with unsafe peripheries blocking further coverage. No new city is planned for this year.",
 "Service is close to target on SLA 35 (~94%) and order rating (~4.9). Fill Rate has been flat near 92% since 2024 (target 93%). The main cancellation drivers are wrong address, customers who do not answer, and unmotivated consumer cancellations. A checkout address-review modal launched last weekend; Brazil’s location UX (50% faster input, −1 pp location cancellations) is a candidate to copy as a simple config.",
 "The commercial engine is ABI-first, with Marketplace as a profitability lever (take rate + in-app media). Orders are on track for 1.1M+ in 2026 (+25% YoY), RGB ratio 64%, midnight 27%. Club TaDa launches this week. The growth gaps: only 27 of 100 new users buy RGB; Marketplace-only retention is 20.7%; national beverage-app awareness is 9% vs Rappi 41% and PedidosYa 37%.",
 ],
 takeaways: [
 { label: "Operation", text: "89 POCs, 4 cities, Lima = 88% of orders. Expansion is still WhatsApp + Backus, not a platform." },
 { label: "Service", text: "SLA and rating are healthy. Fill Rate at 92% is the only KPI that has not moved since 2024." },
 { label: "Portfolio", text: "ABI holds retention. Marketplace is growing GMV and EBITDA via take rate, but store economics and coupon design fight availability." },
 { label: "Growth", text: "Healthy acquisition (no new-user coupon), +25% orders. Club TaDa this week. Awareness 9% is the long-term ceiling." },
 ],
 },

 snapshot: [
 { label: "POCs", value: "89", detail: "~89% of volume · target 90+ · 7→89 since 2022 (deck)" },
 { label: "Cities", value: "4", detail: "Lima 88% · Arequipa · Piura · Trujillo" },
 { label: "SLA 35", value: "93.7%", detail: "2026 YTD · stable 91.5–94.1% since 2023 (deck)" },
 { label: "Order rating", value: "4.89", detail: "Up from 4.73 in 2023 (deck)" },
 { label: "Fill Rate", value: "92.3%", detail: "Flat since 2024 · target 93% · was 87.9% in 2023" },
 { label: "Late hours share", value: "26.9%", detail: "2026 H1 · from 12.3% in 2024 H1 (deck)" },
 { label: "Orders 2026", value: "1.14M", detail: "+25% vs 2025 · 327k in 2023 (deck)" },
 { label: "Awareness", value: "9%", detail: "Rappi 41% · PedidosYa 37% · Kantar (deck)" },
 ],

 cities: [
 {
 name: "Lima",
 share: "~88% of orders · >80% of customers",
 note: "Core of the country (~1/3 of Peru’s population). Operation, late hours and most POCs live here.",
 },
 {
 name: "Arequipa",
 share: "~5% of orders · highest remaining potential",
 note: "South, sierra geography. Expansion to the periphery is hard; coverage stays in the city center. Strong regional beer (Arequipeña).",
 },
 {
 name: "Piura",
 share: "~4% of orders",
 note: "North coast. Opened around October last year. Consumption concentrated on a few local beer brands (Cristal focus).",
 },
 {
 name: "Trujillo",
 share: "Smallest of the four",
 note: "Opened early last year. Coastal, but unsafe peripheries block expansion. Next northern cities (between Piura and Trujillo) are not for this year.",
 },
 ],

 sections: [
 {
 id: "operation",
 label: "1. Operation and expansion",
 summary:
 "POC-first strategy. 48 POCs in 2024 → 70+ last year → 89 now, closing above 90. Own retail gone. Acquisition still analog.",
 topics: [
 {
 title: "POC is the expansion vehicle",
 detail:
 "More than 80 POCs in operation; 89 specifically, representing ~89% of orders. Remaining owned sites are Dark Stores only — retail stores closed in December 2025 (deck confirms final closure), so TaDa no longer has a physical brand presence. Expansion is through third parties: bodegas, liquor stores, etc. POC count grew 7 → 16 → 48 → 78 → 89 from 2022 to Aug 2026 while order share via POCs rose from 26% to 89%. One owner often runs 3–4 POCs; this afternoon’s visits include operators with multiple stores (Brazil analogue: Breja Boy / Chela Boy, 20–30 stores).",
 quotes: [
 "Currently we have 89 specifically and they represent almost 89% of the volume of orders we serve in TaDa.",
 "We closed the last of the stores we had as retail. We no longer have a physical presence as a brand.",
 "There are owners of three, four POCs, and through them we also look for ways to expand.",
 ],
 },
 {
 title: "POC acquisition is still WhatsApp + Backus — no landing",
 detail:
 "Primary source is Backus’s client base. Ulises works with the BEES team to contact Lima customers, pitch TaDa benefits, and continue on WhatsApp. Secondary: social search for liquor stores that want to partner. There is no landing or platform yet — Mexico and Colombia already have one. The team agrees it will need automation as volume grows; the territory is still small enough to run analog.",
 quotes: [
 "The main way to contact POCs is through the client base that Backus has.",
 "We don’t have a landing yet. What we have is phone contact via WhatsApp or through BEES.",
 "I know they did something for Mexico, Colombia too. We don’t have a landing yet.",
 ],
 },
 {
 title: "Four cities — Arequipa is the remaining bet",
 detail:
 "Map: Lima (main), then Arequipa by orders, then Piura, then Trujillo. Arequipa still has headroom in orders per inhabitant, but geography (sierra) makes periphery expansion hard. Piura is coast, brand-concentrated. Trujillo is coast with dangerous zones. No city outside these four this year. Lima is roughly a third of the country; share of mind, not only territory, is still open in the regions.",
 quotes: [
 "Lima is the main one with more than 88% of orders, more than 80% of the customers.",
 "I would say the main opportunity in the regions is still Arequipa as potential.",
 "In size none of them surpasses Lima. Lima is like a third of the country.",
 ],
 },
 ],
 },
 {
 id: "service",
 label: "2. Service KPIs and address UX",
 summary:
 "SLA ~94% and rating ~4.9 are healthy. Fill Rate stuck at ~92% (target 93%) is the only flat KPI. Address is the product lever.",
 topics: [
 {
 title: "Fill Rate is the open wound — 92% since 2024",
 detail:
 "Three headline indicators from the deck: SLA 35 at 93.7% in 2026 (stable 91.5–94.1% since 2023); order rating growing to 4.89 (from 4.73 in 2023); Fill Rate flat near 92% since 2024 — 92.3% in 2026, up from 87.9% in 2023 but still below the 93% target. Team diagnosis of the gap: wrong address, customers who do not respond, and consumer cancellations without a stated reason. Ops is being more incisive with stores. Last weekend they launched a small in-app checkout prompt so the user reviews the address again — it does not show for everyone; they believe it depends on location permission.",
 quotes: [
 "The biggest opportunity we have today is Fill Rate. It has been quite flat since 2024, close to 92%.",
 "Our goal is to reach 93%, and all the team’s efforts have been focused on that.",
 "The main opportunity was wrong address, customers who don’t respond, and many cancellations without a reason from the consumer themselves.",
 ],
 },
 {
 title: "Brazil location UX — candidate to copy in Peru",
 detail:
 "Brazil benchmark (Benito Día): animations on the location/edit screen. Results: 50% less time to set a location, 20% more errors when the user enters incorrect information (desired — the screen should fail closed), and −1 pp cancellations motivated by location. The old flow centered on current GPS; without permission the user had extra steps. Victor: rollout in Peru is a configuration, with a % split of the base — not segmentable by new vs current users. Open question: how many users have granted location permission? Data with Bruno Masayoli. Also pending: Fill Rate cut for new users vs current users (new drinkers get a premium-bad first experience).",
 quotes: [
 "We had a 50% reduction in the time to put a location. We had 20% more errors when a person puts incorrect information — that is good.",
 "We had a one percentage point reduction in cancellations motivated by location.",
 "I already talked to Victor. If you want to start here it is very easy. It is only a configuration.",
 ],
 },
 {
 title: "Perfect service, cost efficiency, third-party POCs",
 detail:
 "Operating strategy sits on three legs: perfect service, expansion through third-party POCs, and cost efficiencies. Fill Rate work is the current perfect-service lever; the address modal and the Brazil location experiment are the product contributions on the table this week.",
 quotes: [
 "The operating strategy is very focused on perfect service, expansion through third-party POCs, and the search for efficiencies on cost.",
 ],
 },
 ],
 },
 {
 id: "late-hours",
 label: "3. Late hours / midnight",
 summary:
 "From 14% to 36%+ of 2026 H orders. Only 5–10% of POCs close after 11pm. Coverage is kept; unsafe holes are cut from the map.",
 topics: [
 {
 title: "Late hours is now more than a third of orders",
 detail:
 "Deck shows midnight share rising from 12.3% (2024 H1) to 26.9% (2026 H1). Transcript cites 36%+ in 2026 H vs 14% starting point — both confirm strong late-hours growth. Only ~5–10% of POCs close from 11pm; the rest stay open, which gives night capillarity. Midnight new users skew Marketplace (23% of NC) vs RGB (6%); midnight RGB retains ~8 pp less than regular-hour RGB — if midnight matched regular, overall retention could rise ~2 pp. Unsafe zones are punched out of the map; they try not to shrink the regular footprint.",
 quotes: [
 "If we add it up it is more than 36% in all of 2026 H in order share. It started at 14%.",
 "Only between 5 and 10% of our POCs close from 11 at night. The rest still keep operations at that time.",
 "We remove some holes for security, dangerous zones, but we try to keep the same coverage we have in regular hours.",
 ],
 },
 {
 title: "Alcohol after 11pm is POC-licensed, not TaDa-licensed",
 detail:
 "By law they cannot sell alcohol after 11pm as a company. They do it through third-party POCs that hold liquor licenses. There was talk of a government change that might relax hours; nothing confirmed. Product implication: midnight demand exists, but the legal wrapper sits on the store, not on TaDa.",
 quotes: [
 "By law we cannot sell alcohol after 11. We do it through the POCs. We as a company don’t have the license, but they do.",
 ],
 },
 ],
 },
 {
 id: "portfolio",
 label: "4. Portfolio, combos and Marketplace",
 summary:
 "ABI is the retention engine. Marketplace is the yield engine. Mix both; never push Marketplace-only. Combos today are a third SKU.",
 topics: [
 {
 title: "ABI core + Marketplace attach",
 detail:
 "ABI brands: Pilsen Callao, Cusqueña, Corona, Cristal (Stella and others much smaller). Marketplace: other liquors, snacks, NABs, etc. Deck consumer-shopping split: 53% ABI-only, 24% ABI+Marketplace, 23% Marketplace-only — strategic rule is to grow the middle bucket, not maximize Marketplace-only. Order mix evolution (deck): Marketplace reached 24.2% of orders in 2026 (+5 pp penetration vs LY). More than 50% of users buy ABI-only. ABI+Marketplace together drives highest basket value; Marketplace-only retains at 20.7% M1→M2 vs 31.3% returnables.",
 quotes: [
 "Our main brands are Pilsen Callao, Cusqueña, Corona and Cristal.",
 "Currently more than 50% of users buy only ABI products.",
 "When the user buys only Marketplace, they don’t necessarily come back in the same proportion as a user who buys ABI.",
 ],
 },
 {
 title: "Combos are one SKU — stores and users would rather compose two",
 detail:
 "Combos are created after commercial identifies a natural cart pair (e.g. rum + beer) and asks for a single SKU at a better price. Many sellers do not turn on all three products separately (A, B, and the combo C). Product is talking to Victor Ágora about a combo solution that composes two active SKUs instead of creating a third. Same request exists in Mexico. Engineering preference: generate one SKU is less manual; user/store preference: don’t force a third product in inventory.",
 quotes: [
 "A single SKU is created. It would be wonderful if we could create them separately and then compose them.",
 "Many sellers don’t turn on all the products separately. If it is only one product it is simpler.",
 "It would also help the stores — you no longer have to learn a third product if you have both active in inventory.",
 ],
 },
 {
 title: "Marketplace journey: from complement to take-rate P&L",
 detail:
 "2022: few products, mostly own stores. 2023: expand portfolio and new suppliers, start monetizing ads. 2024: scale penetration + BEES partnerships (Backus already has marketplace contracts). 2025: profitability — Take Rate (fee to POCs for selling marketplace SKUs), plus monetized app surfaces (content cards, brand shelves, post-purchase). 2026 deck results: GMV share +2 pp vs LY; order penetration ~30% (+5 pp); Pareto SKU availability +4 pp; Marketplace EBITDA +480% vs LY. Brazil analogue: Club double points on Marketplace funded in part by take rate, split with the brand.",
 quotes: [
 "The main growth is Marketplace EBITDA, leveraged on implementing Take Rate — charging stores a commission for selling their products.",
 "Order penetration very close to 30%, which is a growth of 5 percentage points vs last year.",
 ],
 },
 {
 title: "Take Rate vs coupons: stores turn Marketplace off",
 detail:
 "Once stores pay a fee to sell Marketplace, a consumer coupon on a Marketplace item can make the order negative for the POC (fee + discount, no offset). Mitigation: monetary coupons now aim 100% at beer. Admin cannot easily restrict a coupon — it is product-by-product include/exclude. They accept the ops cost to protect Marketplace availability. BEES replenishment of Marketplace is <30% vs a 60% ambition; stores buy wherever the price is better. Growing Marketplace GMV is the leverage to negotiate better BEES prices for POCs.",
 quotes: [
 "When we generate discount coupons and a consumer orders a Marketplace product, for the store it is no longer profitable — it goes negative.",
 "Everything that is a monetary coupon now tries to go 100% to beer.",
 "From admin it is not that simple to generate those restrictions, because you have to do it product by product.",
 "BEES replenishment of Marketplace is under 30%. We would like 60%.",
 ],
 },
 {
 title: "Brand page: Peru is ready, create-in-admin is blocked",
 detail:
 "New brand-page experience: edit is possible in admin, create is not — engineering creates, then local teams edit (images, GIFs, friendlier layout). Peru already socialized it internally and wanted to go live with the four brands on screen. Victor Medeiros paused it: not simple technically, parked for other countries, a more customized version planned for Q. Open question: can a brand page group a cluster (e.g. premium beer) rather than a single brand? Not 100% confirmed.",
 quotes: [
 "It is not possible to create it in admin, but it is possible to edit. We create it with engineering, and then you can edit.",
 "Victor Medeiros told us it was going to be a bit complicated… they had put it on pause for other countries.",
 "On our side we already had almost everything ready. It seemed super interesting to publish.",
 ],
 },
 ],
 },
 {
 id: "growth",
 label: "5. Growth — acquisition, retention, Club, awareness",
 summary:
 "102k new customers this year. TikTok ~40% of paid. RGB retains; Marketplace-only does not. Club TaDa launches this week. Awareness is 9%.",
 topics: [
 {
 title: "Acquisition: TikTok first, homemade creative, no new-user coupon",
 detail:
 "Pillars: healthy acquisition → healthy retention → loyalty (new: Club TaDa Rewards) → awareness (transversal). Paid media is the main acquisition channel. TikTok ~40% of new paid users; Meta a bit over 30%; rest RTV / house / programmatic. All creative is homemade in the Lima office. Own media via Braze: WhatsApp, push (unlocked only last year), email, SMS, in-app. 2026 target: 102k new customers. Acquisition is considered healthy: there is no coupon for new users — they come for a monetary coupon on a product or because they want a specific SKU.",
 quotes: [
 "TikTok has become the main acquisition channel. About 40% of new paid-media users come from TikTok. Meta is a bit over 30%.",
 "The content is all homemade. We do it here in these offices.",
 "We currently don’t have any coupon for new users.",
 ],
 },
 {
 title: "What new users buy — Pilsen dominates, RGB is only 27/100",
 detail:
 "Deck acquisition mix 2026: 102k new customers — 27% returnables, 49% non-returnables, 24% Marketplace. Non-RGB (cans): Pilsen Callao is the flagship (comparable to ~80% of beer in TaDa/ABI). Cusqueña 25% (national premium). RTDs (Mike’s) have grown a lot. Cans: 52% in 355 ml, 22% in 473 ml. Returnables: Pilsen 72% vs Cusqueña 14%; Cristal focused in cities like Piura; Arequipeña 5% (regional). Multi-serve is 85% of returnable volume vs 14% single-serve. Marketplace mix: liquors 25%, complements (ice, charcoal) 22%, NABs 19%, snacks (Inca Chips), wines only 8%. The strategic gap: of every 100 new users, only 27 are RGB.",
 quotes: [
 "Pilsen is a much bigger brand, the biggest beer brand, not only of ABI.",
 "Of every 100 new users, only 27 users are RGB. We still have a long way to go.",
 "The largest quantity in RGB is these three brands, mainly Pilsen, in the multi-serve format.",
 ],
 },
 {
 title: "Retention: returnables win, Marketplace-only loses, midnight is +2 pp",
 detail:
 "Deck M1→M2 retention: non-RGB 26.2%, returnables 31.3%, Marketplace 20.7%. Cusqueña returnable leads at 44.8%; Arequipeña 35.7%; Pilsen 30.3%; Cristal 28.7%. RGB new users: 77% regular hours, 23% midnight — but midnight RGB retains 26% vs 34% in regular (+8 pp gap). If midnight matched regular, overall retention could rise ~2 pp. Returnable users also show higher MACO (~USD 99 per deck). CRM clusters: first order RGB → later contacts stay RGB; first order Marketplace-only → later contacts push liquor + beer.",
 quotes: [
 "Returnable 100% has better retention, 31.3% versus 26.2% non-returnable. Marketplace 20.7% — that is the biggest opportunity.",
 "Cusqueña has 44.8% retention on a premium returnable beer. That is quite interesting.",
 "If midnight retained customers the same way as regular, retention could improve by two percentage points.",
 ],
 },
 {
 title: "Club TaDa — launch this week, 10% loyalty-rate target",
 detail:
 "Points ladder (purchase → points → coupon): 250 soles → 50 pts / 5 soles; 500 → 100 pts / 10 soles; 750 → 150 pts / 17 soles (step changes); 1,250 → 250 pts / 29 soles; 1,750 → 350 pts / 40 soles (max). Effective rate ~2–2.2%. 2026 target: 10% Loyalty Rate for Peru — they call it unreachable on paper given other countries’ experience, and still believe they can hit it. Short/mid-term the ladder is cash coupons; the real play is experiences (football tickets, concerts) via Backus events (Masterlife and others next year). Alex’s team already works with the Backus events team.",
 quotes: [
 "Club TaDa, this week is the launch. Everybody is working very concentrated so that it comes out well.",
 "10 of target for Peru in Loyalty Rate. We think it is unreachable given other countries, and we have a lot of faith we can achieve it.",
 "The short-to-medium-term strategy is not only discounts, but experiences — football tickets, concert raffles.",
 ],
 },
 {
 title: "Awareness 9% — Rappi and PedidosYa own the category question",
 detail:
 "Open question to 400 consumers (Kantar-like): which online platforms do you use to buy drinks and food? Rappi 41%, PedidosYa 37%, Plaza Vea (local supermarket app), Tottus (Falabella, Chilean group), TaDa 9%. They are not #1 and not even top 5 in that frame. Differentiators they still own: returnables (Rappi is not structured for them) and cold drinks. Recall is slightly more female (52% vs 49% men); men 25–34 drive recall; mid/high SES recall more. Opportunity to broaden down-funnel. Strategic focus to close: keep pushing returnability (more profitable) and brand identity so users remember TaDa over time.",
 quotes: [
 "Rappi has 41%, PedidosYa 37%… and finally we appear with 9%. It is still little.",
 "I don’t think they deliver returnables. We do — that is our differential. Cold drinks are still in our favor.",
 "Awareness is super important and I think it is a very big opportunity we still have to explore.",
 ],
 },
 ],
 },
 {
 id: "outlook",
 label: "6. 2026 outlook and why orders are up 25%",
 summary:
 "1.1M+ orders (+25%), RGB 64%, midnight 27%. World Cup +14% incremental. Competitive pricing is watched by hand. August still strong in a warm winter.",
 topics: [
 {
 title: "Tracking the year: orders, RGB, midnight",
 detail:
 "Deck order evolution: 327k (2023) → 577k (2024) → 910k (2025) → 1.14M projected (2026), +25% YoY. Returnable ratio targeting 64%; midnight 27%. Base today ~800k Peruvians, heading toward 1.1M. A 30% growth rate for a large country is described as not normal — and they think 30% is still achievable. August has been strong even after the World Cup, helped by atypical Lima winter (4–5°C warmer than it should be, Niño-related).",
 quotes: [
 "This year we expect to close more than 1.1 million orders. That is 25% growth versus last year.",
 "At returnables, reach a ratio of 64%. In midnight, ideally 27%.",
 "30% for a large country is not normal. It is very good. I think 30% could still be achieved.",
 ],
 },
 {
 title: "What drove the growth",
 detail:
 "Communication strategy focused on the products that retain and make money (returnables). World Cup in June–July: Peru did not play, but behavior still helped — +14% incremental orders in the period, and +6% in match-time hours. Healthy acquisition without a new-user coupon. Commercial team monitors competitor prices constantly (one person, Patrick, checks supermarket and app prices in a slice of his time) so TaDa does not get undercut, without going irresponsibly low. Club TaDa is the next frequency lever.",
 quotes: [
 "There is 14% incremental orders in that period that we got thanks to the World Cup. In match hours it is more than 6%.",
 "We don’t allow other players to have a better price than us. There is a person who is constantly reviewing competitor prices.",
 "With Club TaDa, fostering higher frequency is what will let us keep pushing that growth in orders.",
 ],
 },
 ],
 },
 ] as MeetingSection[],

 consumerResearch: {
 title: "Consumer research — ZD Libri and Consumer Room",
 detail:
 "ZD Libri (SEAL / Saril) is now the company’s main data tool for direct-to-consumer, replacing expensive brand-director surveys. Experiments typically run 2–3 months, plus ~1 month to review and validate with brand directors. They do not currently quantify the money saved. Consumer Room is the qualitative counterpart: live interviews with specific questions. Last one was for Microf, a brand being brought back; cheaper and faster than agencies, so they can run more of them.",
 quotes: [
 "ZD Libri is now the company’s main data tool, the way you are doing it with the direct consumer.",
 "We don’t make the account of how much money we save. That is an important account we should do.",
 "We also did something like the Consumer Room — more qualitative, direct contact. The last one was Microf. It is faster and cheaper.",
 ],
 },

 productOpportunities: [
 {
 title: "Copy Brazil location UX",
 owner: "Victor · config flag",
 tone: "success" as const,
 detail:
 "50% faster location input, −1 pp location cancellations. Peru rollout is a % split, not new-vs-current segmentation. Team wants it.",
 },
 {
 title: "Measure location permission + Fill Rate by new vs current users",
 owner: "Bruno Masayoli · dashboard",
 tone: "warning" as const,
 detail:
 "Address modal may not show without GPS permission. New drinkers get a premium-bad first experience if address fails. Cuts do not exist yet.",
 },
 {
 title: "Compose combos from two SKUs",
 owner: "Victor Ágora",
 tone: "info" as const,
 detail:
 "Today a combo is a third SKU. Stores don’t turn all three on. Same pain as Mexico. Better for inventory if A + B compose C.",
 },
 {
 title: "Brand page create-in-admin",
 owner: "Victor Medeiros · Q",
 tone: "warning" as const,
 detail:
 "Peru is ready to publish (four brands). Create is still engineering-only. Paused for a more customized multi-country version.",
 },
 {
 title: "Coupon restrictions in admin",
 owner: "Admin / promotions",
 tone: "danger" as const,
 detail:
 "Take Rate + Marketplace coupon = negative for the POC. Work-around is beer-only coupons, set product by product. Needs a real restriction model.",
 },
 {
 title: "POC acquisition landing",
 owner: "Local + product",
 tone: "info" as const,
 detail:
 "Mexico and Colombia already have a landing. Peru still runs WhatsApp + Backus. Fine at current scale; will need automation as POC count grows.",
 },
 ],

 connectsToStores: [
 "Fill Rate 92% nationally — check how La Marina, Merino and San Pedro talk about cancellations and wrong addresses",
 "Address review modal launched last weekend — ask if sellers still get ‘wrong address’ tickets and whether customers confirm the pin",
 "Multi-POC owners this afternoon — expansion pattern (one owner, several stores) similar to Brazil’s Breja Boy",
 "Marketplace take rate vs availability — do stores turn Marketplace SKUs off when a coupon hits? Merino already has 4.4% stockout and 68.4% SKU availability",
 "Late hours: only 5–10% of POCs close after 11pm — confirm opening hours and night courier coverage in the three visits",
 "San Pedro TML 10 at 36.8% and 12.2% seller cancellations — contrast with the ‘incisive with stores’ Fill Rate push",
 "Returnables and cold chain are the stated differentiators vs Rappi/PedidosYa — validate in the fridge and in RGB handling",
 ],

 nextSteps: [
 "Store visits this afternoon (Eduardo + Ginger, Diego, Manuel) — La Marina, Merino, San Pedro; leave around 14:00–14:30",
 "Align with Victor on turning on the Brazil location-UX experiment in Peru (config, % split)",
 "Ask Bruno Masayoli for location-permission coverage and Fill Rate by new vs current users",
 "Follow up with Victor Ágora on combo-as-composition (same request as Mexico)",
 "Confirm with Victor Medeiros the Q window for brand-page create-in-admin; Peru already has four brands ready",
 "Club TaDa launch this week — watch Loyalty Rate vs the 10% year target",
 "If Fill Rate work continues via store pressure, pair it with the address product so the 93% target is not only an ops lever",
 ],

 source: "Peru/31:08/PE context/Republica_de_Colombia_1788195170654.txt + TaDa PE Context Global.pdf",
};
