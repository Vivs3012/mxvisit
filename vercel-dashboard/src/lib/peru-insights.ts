export type PeruInsightCategory = "Bug" | "UX" | "Product" | "Operation" | "Infra";

export type PeruInterviewInsight = {
 category: PeruInsightCategory;
 title: string;
 detail: string;
 source: string;
 quotes: string[];
};

export type PeruStoreInterview = {
 id: string;
 name: string;
 poc: string;
 district: string;
 files: string;
 summary: string;
 highlights: string[];
 insights: PeruInterviewInsight[];
};

export type PeruCrossTheme = {
 priority: "Critical" | "High" | "Medium";
 title: string;
 summary: string;
 stores: string[];
 category: PeruInsightCategory;
 attention: string;
 quotes: string[];
};

export const PERU_VISIT_EXECUTIVE_SUMMARY = {
 headline:
 "Across 3 Lima POCs, the same structural gaps repeat: map/GPS unreliable, inventory without quantity, broken search, and no seller–customer channel — with WhatsApp as the real ops layer.",
 paragraphs: [
 "La Marina (Pueblo Libre, ~400 orders/week) is the reference POC in the group: best SLA and TML in KPIs, multi-store supervisor with cameras + WhatsApp control room. Merino (Lince, smallest volume) absorbs neighbor spillover when other POCs turn off SKUs — +70 orders on a weekend when coverage moved. San Pedro (Surquillo, highest volume, ~150–200 orders on Saturday) runs 7 couriers 18h/day in a tight 3.5 km polygon with strong SLA but the lowest TML 10 in the visit set.",
 "All three stores report the map does not update in real time: courier pin stuck at the store after leaving, only 1 of 15 riders visible on a Saturday, filter “en ruta” useless. Workaround everywhere: WhatsApp groups asking couriers to share live location. La Marina quantifies visibility at 5–10%; Merino says it used to work and stopped; San Pedro calls real-time updates the #1 fix.",
 "Inventory is the second universal pain. On/off does not reflect real stock; there is no quantity field (VTEX/Tuca had it). Combos and linked SKUs do not turn off together — a turned-off Flor de Caña still accepts orders through another combo SKU. Search misses Pilsen, 473 ml, “cerveza” vs “Pilsen 630”. Turning off a SKU does not always block new orders (reported at La Marina and San Pedro). Sellers want a parent SKU that disables all variants and auto-decrements.",
 "Communication gaps drive cancellations and bad ratings. No in-app seller–customer chat (had it in a previous tool). Customers do not update phone/WhatsApp; couriers wait 10–15 min at the door. Deposit-bottle confusion (“tengo/no tengo botellas”) generates disputes and 1-star ratings — La Marina estimates 4–5 of 50 orders. Merino sees clients cancel 10–12 times in a row to route the order to a preferred POC (overlap + store name visible in app).",
 "Operational tooling that works: WebPO (demand by hour, couriers needed, weekly payments) is praised at La Marina and Merino — updated Mondays, helps staff peaks for football and holidays. Gaps: promo notice arrives in consumer app but not BEES/supply; KPI screen locked to rolling 7 days (not Mon–Sun); ranking peer set opaque; SLA 35 hidden in seller platform. La Marina’s top 3 asks: stock quantities, assign second order to courier already en route, seller activates couriers (not self-activate every 30 min).",
 ],
 stats: {
 stores: 3,
 totalInsights: 0, // filled below
 criticalThemes: 0,
 bugCount: 0,
 uxCount: 0,
 productCount: 0,
 operationCount: 0,
 infraCount: 0,
 },
};

export const PERU_CROSS_STORE_THEMES: PeruCrossTheme[] = [
 {
 priority: "Critical",
 title: "Map / GPS does not update — courier pin stuck at store",
 summary:
 "Seller map does not show couriers moving in real time. After delivery the pin may still sit at the store; on peak only 1–2 of 15 riders are visible and filter “en ruta” does not help. All three stores route-track via WhatsApp, so dispatch decisions and CX explanations rely on workarounds instead of the product.",
 stores: ["La Marina", "Merino", "San Pedro"],
 category: "Bug",
 attention:
 "3/3 stores. Same pattern as CDMX/Puebla Mexico visits. Blocks dispatch decisions at peak and erodes trust in Top Stores / map screen.",
 quotes: [
 "Of 15 couriers I can only see two — the rest I track by WhatsApp. (La Marina)",
 "The courier already delivered but the map still showed him at the store. (Merino)",
 "I filter en ruta to see the route and it still shows the courier at the store — it never updates. (San Pedro)",
 ],
 },
 {
 priority: "Critical",
 title: "Inventory without quantity — search broken, combos don't turn off together",
 summary:
 "On/off does not reflect real stock. No quantity field; sellers count manually at night. Search misses formats and brand names. Turning off one SKU does not disable linked combos. Orders still arrive on turned-off SKUs.",
 stores: ["La Marina", "Merino", "San Pedro"],
 category: "Product",
 attention:
 "3/3 stores. Direct link to stockout, seller cancellations (San Pedro 12.2%), and peak slowdown. VTEX/Tuca had quantity + combo codes — explicit benchmark.",
 quotes: [
 "If I turn off Flor de Caña but a combo with another name stays on, the order still comes in. (La Marina)",
 "I write cerveza Pilsen and it doesn't detect it — there goes a combo I forgot to turn off. (Merino)",
 "I turn off the SKU and half an hour later the same product order arrives anyway. (San Pedro)",
 ],
 },
 {
 priority: "High",
 title: "No seller–customer communication — WhatsApp and cancellations",
 summary:
 "No in-app chat like Rappi/Uber. Sellers and couriers call/WhatsApp the customer; many don't answer or have outdated numbers. Deposit-bottle disputes hurt rating. Merino: clients cancel repeatedly to force routing to preferred POC.",
 stores: ["La Marina", "Merino", "San Pedro"],
 category: "Operation",
 attention:
 "Validates Mexico CX/product direction for pre-defined messages. Peru sellers remember having direct customer chat in a previous tool.",
 quotes: [
 "The customer doesn't come out, we have no way to communicate — we have to cancel. (La Marina)",
 "The client can see which store got the order and cancels until it lands at their friend's POC — 10, 12 cancellations in a row. (Merino)",
 "Like Uber — a direct message with the customer would be a good option. (San Pedro)",
 ],
 },
 {
 priority: "High",
 title: "Can't assign a second order to courier already en route",
 summary:
 "When the same customer places two orders or a nearby order appears, seller cannot add it to the courier who is already leaving. Must send a second rider. Tuca allowed re-assignment; current platform does not.",
 stores: ["La Marina", "Merino"],
 category: "Product",
 attention:
 "La Marina supervisor's #2 priority. Wastes couriers in dense zones (Pueblo Libre, Surquillo). Tied to map not showing overlapping pins.",
 quotes: [
 "The client orders again while the courier is leaving — I have to send another rider instead of adding the order. (La Marina)",
 "In Tuca if I gave an order and another came nearby I could add it — here I can't. (La Marina)",
 ],
 },
 {
 priority: "High",
 title: "Order sound unreliable — missed and expired orders",
 summary:
 "Notification sound works intermittently. Seller restocking or alone on shift misses orders. Merino and San Pedro both report the pattern; San Pedro on quiet Mondays with 4 staff and 6 orders.",
 stores: ["Merino", "San Pedro"],
 category: "Bug",
 attention:
 "2/3 stores explicitly. Same class of bug as Puebla/Zavaleta. Revenue loss when nobody notices for 1–2 minutes.",
 quotes: [
 "Sometimes it sounds, sometimes it stops — you turn around and an order was already there a minute ago. (Merino)",
 "Two orders came in while I was picking and it didn't sound — I lost an order. (San Pedro)",
 ],
 },
 {
 priority: "High",
 title: "KPI screen: rolling 7 days, opaque ranking, SLA 35 hidden",
 summary:
 "Top Stores shows last 7 days rolling — not Mon–Sun calendar week. Sellers can't filter by date or see yesterday only. Ranking compares to unknown peer set. SLA 35 % not shown in seller platform (hidden because low). Availability metric stopped loading.",
 stores: ["La Marina", "Merino", "San Pedro"],
 category: "UX",
 attention:
 "Same ask as CDMX/Puebla daily KPIs. Merino waits until 9pm for WhatsApp dashboard from ops. San Pedro stuck at rank 32 without knowing the algorithm.",
 quotes: [
 "It pulls the last 7 days no matter what — I want Monday to Sunday like before. (La Marina)",
 "SLA 35 doesn't appear here — we hid it because it was low, but that's what I need most. (Merino)",
 "We're always #32 — we don't know what we're missing to move up. (San Pedro)",
 ],
 },
 {
 priority: "High",
 title: "Overlapping / inter-POC spillover when neighbors turn off SKUs",
 summary:
 "When nearby POCs disable best-selling SKUs, volume floods the POC with inventory. Merino (+70 orders weekend). Clients also game routing by canceling until order hits preferred store (bar in front of POC).",
 stores: ["Merino", "La Marina"],
 category: "Operation",
 attention:
 "Connects to morning context meeting Fill Rate and Peru expansion (multi-POC owners). Not just algorithm — consumer sees store name in app.",
 quotes: [
 "The other POC runs out of product, turns it off, and all those orders land here. (Merino)",
 "The bar across the street orders until it hits our POC — otherwise they cancel. (Merino)",
 ],
 },
 {
 priority: "Medium",
 title: "Courier assignment bugs and seller-controlled activation",
 summary:
 "On peak, assign-to-courier freezes: key sent but order stuck in waiting, courier never receives. Couriers self-activate and auto-off every 30 min — seller wants to turn riders on and assign directly. Courier acquisition page exposes store phone (midnight calls).",
 stores: ["La Marina", "Merino"],
 category: "Product",
 attention:
 "La Marina #3 ask: seller activates couriers. Fleet Manager removal exists in MX — Peru wants the inverse (activation control).",
 quotes: [
 "I send the key to Juan and it stays waiting — on his phone it never appears. (La Marina)",
 "Every 30 minutes it turns off — I want to activate them and assign, not wait for them to come online. (La Marina)",
 "Couriers register and get a suggested store with the phone number — they call at 2am. (Merino)",
 ],
 },
 {
 priority: "Medium",
 title: "WebPO valued — demand forecast and payments; promo notice missing",
 summary:
 "Internal WebPO (demand by hour, couriers needed, weekly payment upload) praised. Helps football, holidays, staffing. Gap: consumer promo visible in app but not BEES — seller can't stock before demand spike. Notifications in WebPO still in pilot.",
 stores: ["La Marina", "Merino"],
 category: "Operation",
 attention:
 "Positive signal for seller notification center + commercial calendar integration. La Marina pilot since April, all Lima from July.",
 quotes: [
 "If there's a promo on Stella at 23 soles the app tells the customer but BEES doesn't alert me. (La Marina)",
 "Demand by hour and how many couriers we need — this helps a lot for match days. (La Marina)",
 "Payments used to go by WhatsApp — now they're here for everyone. (Merino)",
 ],
 },
 {
 priority: "Medium",
 title: "Returnable volume, weight limits, improvised cold chain",
 summary:
 "~60% returnable orders. Official bag fits 1 carton; couriers stack 2–4 with rubber bands. Promo 28-pack for Fiestas Patrias pushes weight. Ice/cooling for six-packs manual. Not blocking but drives courier complaints and risk.",
 stores: ["Merino", "La Marina"],
 category: "Infra",
 attention:
 "Peru differentiator vs Rappi (returnables). Product/ops constraint on promotions and backpack design.",
 quotes: [
 "They hate the 28-bottle promo — bottles explode, four go loose in the bag. (Merino)",
 "I've seen a courier carry four cartons — I didn't even ask how. (Merino)",
 ],
 },
];

export const PERU_INTERVIEW_INSIGHTS: PeruStoreInterview[] = [
 {
 id: "la-marina",
 name: "La Marina",
 poc: "PC La Marina - Pueblo Libre E0",
 district: "Pueblo Libre",
 files: "Peru/31:08/La Marina/De_La_Marina_Avenue_-_primeira_loja_1788273073451.txt",
 summary:
 "Reference POC (~400 orders/week). Store manager supervises three locations (La Marina, Democracia, La Perla) via WhatsApp + CCTV. Strong KPIs; heavy WebPO user since pilot. Operation is manual at edges (inventory count, courier WhatsApp tracking) but disciplined. Top pain: map visibility, no stock quantity, can't stack orders on courier en route.",
 highlights: [
 "Map shows ~5–10% of couriers — rest tracked on WhatsApp",
 "WebPO demand forecast used for football, promos, staffing",
 "VTEX/Tuca had stock quantities — wants parent SKU for combos",
 "Can't reassign second order to courier already leaving",
 "Deposit-bottle disputes → 1-star ratings (~4–5 per 50 orders)",
 "Top 3 asks: quantities, en-route reassignment, seller activates couriers",
 ],
 insights: [
 {
 category: "Bug",
 title: "Map: courier pin stuck, ~10% visibility on peak",
 detail:
 "On Saturdays with ~15 couriers, only 1–2 appear on the map. Pin stays at store after courier leaves. Seller uses WhatsApp groups for live location. Same two orders at same address can't be seen on map — uses receipt name instead.",
 source: "Store manager (multi-POC supervisor)",
 quotes: [
 "I'd say until it's 100% visible it's 5%, 10% — of 15 couriers I only see two.",
 "We have WhatsApp groups where we ask all couriers to send their location in real time.",
 ],
 },
 {
 category: "Bug",
 title: "Assign-to-courier fails on peak — order stuck waiting",
 detail:
 "When bill overflows or platform slows, seller sends order key to courier but it stays in waiting — courier never receives. More frequent on high-demand days.",
 source: "Store manager",
 quotes: [
 "I send it to Juan and it doesn't arrive — it stays waiting, on his app it doesn't show.",
 "This happens a lot, especially on high-demand days.",
 ],
 },
 {
 category: "Bug",
 title: "SKU turned off but order still arrives",
 detail:
 "Seller disables product for stockout; within ~30 minutes another order for same SKU can still come through.",
 source: "Store manager",
 quotes: [
 "I turned it off and half an hour later that same product order fell again.",
 ],
 },
 {
 category: "UX",
 title: "KPIs locked to rolling 7 days — want calendar week",
 detail:
 "Current screen shows last 7 days from today, not Mon–Sun. Can't pick date range or 'today only'. Old platform allowed weekly view. Quality seal / ranking unclear — don't know weight of metrics or full peer list.",
 source: "Store manager",
 quotes: [
 "Here it only gives the last seven days no matter what — I want Monday to Sunday like we used to.",
 "First in Callao of 5, second in La Perla of 4 — but we don't know which 50 stores are in the ranking.",
 ],
 },
 {
 category: "UX",
 title: "Inventory search misses formats and variants",
 detail:
 "Search by liter or brand doesn't return all variants. Turning off products is slow when combos share SKUs. Wants search that finds all products containing a parent code.",
 source: "Store manager",
 quotes: [
 "You type liter and want Cristal liter — you get bottles but not what you need.",
 "If it's the same product it should turn off all related SKUs with one parent code.",
 ],
 },
 {
 category: "Product",
 title: "No stock quantity — manual count, stockouts at peak",
 detail:
 "Portfolio on/off only. Seller counts physically at night; reports low stock to supply. Customer can order 17 wines when only 3 in store. Wants VTEX-style quantity with auto-decrement and combo limits.",
 source: "Store manager",
 quotes: [
 "In VTEX you put 100 on the code and the client knew they could buy up to 100.",
 "Here they can add 11 when I only have 10 packs — that generates stockouts every day.",
 ],
 },
 {
 category: "Product",
 title: "Can't add second order to courier en route",
 detail:
 "Same customer orders twice while courier is leaving — must dispatch second rider. Tuca allowed adding another order to same courier when nearby. Map doesn't show overlapping orders at same pin.",
 source: "Store manager",
 quotes: [
 "The client makes another order and I have to send another courier — they could modify it to add another order.",
 "In Tuca if he was leaving and another order was close I could add it again.",
 ],
 },
 {
 category: "Product",
 title: "Seller should activate couriers — not self-activate every 30 min",
 detail:
 "Couriers go offline automatically; seller wants to activate trusted riders and assign immediately. Risk: fired/rogue courier can still accept keys if in group.",
 source: "Store manager",
 quotes: [
 "Every 30 minutes it turns off — if I activate him I assign right away without waiting 1–2 minutes.",
 "A worker who stole could still take an order if I send the key — we'd rather control who's active.",
 ],
 },
 {
 category: "Product",
 title: "No seller–customer chat — deposit bottle disputes",
 detail:
 "Can't message customer in app (had it before). Courier waits at door; WhatsApp often dead. Deposit bottle confusion: customer says 'I didn't order bottles' but was charged — 1-star hits whole day.",
 source: "Store manager",
 quotes: [
 "Of 50 orders maybe 4–5 have the bottles problem — in peak that's 3–4 minutes lost per case.",
 "Yesterday one star because client said they ordered Cusqueña not Stella — hurts the whole good day.",
 ],
 },
 {
 category: "Operation",
 title: "WebPO: demand + payments work; promo alert to BEES missing",
 detail:
 "Uses WebPO for weekly demand, couriers/hour, credit notes, courier payment reports. Updated Mondays. Promo in consumer app (e.g. Stella S/23) doesn't alert BEES — can't pre-stock.",
 source: "Store manager",
 quotes: [
 "Promo notification reaches the customer but not BEES — if I don't have the app I don't know demand is coming.",
 "Demand section helps dimension motorcycles for Melgar vs Alianza matches.",
 ],
 },
 {
 category: "Operation",
 title: "Multi-store control: CCTV + WhatsApp, not platform",
 detail:
 "Supervisor monitors three stores on screens + group chat. Per-store managers handle ops. Platform doesn't aggregate cross-store realtime view.",
 source: "Store manager",
 quotes: [
 "I have three screens, three stores, WhatsApp with all managers — if something happens in chat I check cameras.",
 ],
 },
 ],
 },
 {
 id: "merino",
 name: "Merino",
 poc: "PC Merino - Lince E0",
 district: "Lince",
 files: "Peru/31:08/Merino/WhatsApp_Audio_2026-08-31_at_16.08.txt",
 summary:
 "Smallest volume of the three but strategic inventory node — neighbors route here when they turn off SKUs (+70 orders on a weekend). Katy supervises Merino + Breña POCs. OPS-heavy visit (Eduardo). 2 couriers typical, 7 on peak. 60% returnable. WebPO for demand; SLA 35 hidden in seller UI.",
 highlights: [
 "Inter-POC spillover when neighbors disable SKUs",
 "Clients cancel 10–12× to route order to preferred store",
 "Map tracking degraded — used to work",
 "Order sound inconsistent",
 "3 weeks without 305 Pilsen stock from BEES",
 "Pickup-in-store seen as opportunity (not after 11pm)",
 "Returnable weight: couriers improvise 2–4 cartons on moto",
 ],
 insights: [
 {
 category: "Bug",
 title: "Map tracking stopped working reliably",
 detail:
 "Courier shows at store after delivery completed. Seller could track before; now pin doesn't move. Same as other Lima POCs.",
 source: "Supervisor (Katy) + OPS",
 quotes: [
 "Sometimes the courier already delivered but it still showed him at the store.",
 "Before it worked well — now it stopped and you can't follow them.",
 ],
 },
 {
 category: "Bug",
 title: "Order notification sound intermittent",
 detail:
 "Sound works sometimes, not others. Seller busy with inventory misses orders for 1+ minutes.",
 source: "Store staff",
 quotes: [
 "Sometimes it sounds, sometimes it stops sounding — you turn around and there was an order a minute ago.",
 ],
 },
 {
 category: "UX",
 title: "SLA 35 hidden; daily KPIs via WhatsApp not in platform",
 detail:
 "SLA 35 % is main metric but removed from seller screen because it was low. Supervisor waits until 9pm for previous-day indicators via WhatsApp from ops (Mon–Thu daily, Fri–Sun on Monday).",
 source: "Supervisor",
 quotes: [
 "SLA doesn't appear here — we hid it because it was low, but that's what I use most.",
 "I wait until 9pm for José to send me yesterday's numbers.",
 ],
 },
 {
 category: "UX",
 title: "Inventory: combo search, character limits, portfolio gaps",
 detail:
 "Can't find combos by typing 'combos'. Product names truncated — 'cerveza Pilsen' vs 'Pilsen 630' don't match. Minimum portfolio shows combos; general inventory doesn't. ~10% of orders are combos.",
 source: "Store staff",
 quotes: [
 "If you type cerveza Pilsen it doesn't detect — there goes a combo you forgot to turn off.",
 "When I close six-pack, combo should disappear too — but it doesn't always.",
 ],
 },
 {
 category: "Product",
 title: "Overlapping — consumer cancels until order hits preferred POC",
 detail:
 "App shows store name. Client at bar in front of POC cancels if order routes elsewhere — may repeat 10–16 times. Hurts Perfect Service metrics. Also motorizado loyalty: client wants specific rider/store.",
 source: "Supervisor",
 quotes: [
 "The client sees which store got it and cancels until it lands at their friend's POC — 10, 12 cancellations in a row.",
 "They know the motorizado and the owner — if it goes to another POC they cancel.",
 ],
 },
 {
 category: "Product",
 title: "Pickup in store — positive, with time limits",
 detail:
 "Team open to pickup SKU (like former retail pilot). Would help capture walk-in traffic without floor sale conflict. Not after 11pm (Late Hours / municipal rules).",
 source: "Supervisor + OPS",
 quotes: [
 "I don't see pickup as dangerous — consumer chooses delivery or pickup.",
 "I wouldn't offer pickup after 11pm — only until 10–11.",
 ],
 },
 {
 category: "Product",
 title: "Courier acquisition exposes store phone",
 detail:
 "Courier registration suggests a store with visible phone — sellers get midnight calls. Team hid phones in BEES admin after extortion reports. Address still visible.",
 source: "Supervisor",
 quotes: [
 "They register and see the store number — the other day two called me at dawn.",
 "That should be removed — they call but never show up to work.",
 ],
 },
 {
 category: "Operation",
 title: "Neighbor POC stockout → volume spike here",
 detail:
 "When smaller POCs turn off best sellers, Merino (best inventory in zone) absorbs orders. Coverage extension to 5.7 km on weekend added ~70 orders vs prior week.",
 source: "OPS (Eduardo) + supervisor",
 quotes: [
 "If the other POC runs out they turn it off and all those orders come here.",
 "Almost 70 more orders than the previous week — concentrated on weekend.",
 ],
 },
 {
 category: "Operation",
 title: "WebPO demand + payments; notifications still pilot",
 detail:
 "Weekly demand by hour, couriers needed (1.7 orders/hour target), Liga 1 matches, holidays. Payment upload replaced WhatsApp. In-app notification center for sellers not live yet.",
 source: "Supervisor",
 quotes: [
 "This helps communicate promos, demand, and how many couriers we need.",
 "Notifications still don't work — managing them outside is complex.",
 ],
 },
 {
 category: "Infra",
 title: "Returnable weight — bags, 28-pack promo, stacked cartons",
 detail:
 "60% returnable. Official bag fits one carton; couriers use rubber bands for two. Fiestas Patrias 28-bottle promo hated. Seen up to 4 cartons on one moto.",
 source: "OPS + store",
 quotes: [
 "The 28 promo — bottles explode, four go loose, they have to come back.",
 "I've seen one courier with four cartons — I didn't ask how.",
 ],
 },
 ],
 },
 {
 id: "san-pedro",
 name: "San Pedro",
 poc: "PC San Pedro - Surquillo E0",
 district: "Surquillo",
 files: "Peru/31:08/San pedro/WhatsApp_Audio_2026-08-31_at_17.19.txt",
 summary:
 "Highest volume (~1,600 orders/month, 150–200 on Saturday). Dense 3.5 km zone, 7 couriers, 10am–3am. Strong SLA (95%+) but lowest TML 10 in visit. Owner in Surco shares courier pool across stores. Manual dispatch splits riders for distant simultaneous orders. Ranking stuck at #32 — algorithm opaque.",
 highlights: [
 "Real-time map + order sound = top fixes",
 "Search needs filters (lata/botella) and faster typeahead",
 "Wants stock quantity with auto-block",
 "In-app customer messaging like Uber",
 "BEES flex supply — ~2% stockout",
 "Courier name slow to load when assigning",
 "Shared fleet with Surco store for peak weekends",
 ],
 insights: [
 {
 category: "Bug",
 title: "Map not real-time — en ruta filter useless",
 detail:
 "When checking order progress, courier pin stays at store. Intermittent — sometimes works. Rankings also feel stale (stuck at #32 despite improving metrics).",
 source: "Store manager",
 quotes: [
 "I put the filter en ruta and it still shows the courier at the store — it never updates.",
 "We're always #32 — we don't know what we need to climb.",
 ],
 },
 {
 category: "Bug",
 title: "Order doesn't sound — missed orders on quiet shifts",
 detail:
 "On low-traffic days with few staff, multiple orders can arrive silently while seller is picking. Lost revenue.",
 source: "Store manager",
 quotes: [
 "I'm alone picking — two orders came in, it didn't sound, I lost an order.",
 ],
 },
 {
 category: "Bug",
 title: "Courier name delayed when assigning",
 detail:
 "After order arrives, rider list doesn't show names for several seconds — slows dispatch on peak.",
 source: "Store manager",
 quotes: [
 "I wanted to assign and the name didn't appear — it takes a few seconds every time.",
 ],
 },
 {
 category: "Bug",
 title: "Product off but order still received",
 detail:
 "Turned off SKU for stockout; same product ordered again within the hour. Happened multiple times recently.",
 source: "Store manager",
 quotes: [
 "I turned it off and within half an hour the same product order came again.",
 ],
 },
 {
 category: "UX",
 title: "Search slow — no filters by format",
 detail:
 "Typing 'Pilsen' or '473' doesn't autocomplete like other platforms. Must type full 'cerveza Pilsen Callao'. No filter for can vs bottle — scrolls through 6 pages of bottles.",
 source: "Store manager",
 quotes: [
 "On other platforms I type Pil and it moves — here I type Pilsen and it doesn't come out.",
 "We search for cans and get six pages of bottles only.",
 ],
 },
 {
 category: "UX",
 title: "Ranking algorithm opaque",
 detail:
 "Store consistently #32 in block; metrics improved but rank doesn't move. Wants to know formula and gap to next tier. Uses top-sellers list for replenishment, not ranking.",
 source: "Store manager",
 quotes: [
 "Maybe top 3 in our block but always #32 overall — how is that determined?",
 ],
 },
 {
 category: "Product",
 title: "Stock quantity with auto-decrement requested",
 detail:
 "If 5 cases left and 2 ordered, SKU should auto-block before third order. Prevents accepting orders while picking. Aligns with La Marina / Mexico #1 ask.",
 source: "Store manager",
 quotes: [
 "If I have five boxes and two orders fall, it should block automatically while we pick.",
 ],
 },
 {
 category: "Product",
 title: "In-app messaging with customer",
 detail:
 "Today: print ticket, call/WhatsApp customer from store phone. If no answer, courier tries at door. Uber-style in-app chat would save time on Saturdays.",
 source: "Store manager",
 quotes: [
 "Like Uber — direct messaging with the customer would be a good option.",
 "When they don't answer we call from the store phone — that also takes time.",
 ],
 },
 {
 category: "Operation",
 title: "Manual dispatch — split riders for distant simultaneous orders",
 detail:
 "Three orders in different corners → three couriers, not one. Keeps SLA in dense grid. Owner coordinates extra riders from Surco store on projected peak.",
 source: "Store manager + owner",
 quotes: [
 "One order here, one there — I send separate couriers so everything arrives on time.",
 "We review WebPO peak projection a week ahead and add 1–2 motos for Saturday promo.",
 ],
 },
 {
 category: "Operation",
 title: "BEES flex supply — 2% stockout",
 detail:
 "POCs on flex can order BEES more than once/week — critical for promos (e.g. Coronita bulk). Coordinated with RTM so orders aren't excluded. Still manual relationship.",
 source: "Store manager",
 quotes: [
 "Without flex the order arrives Saturday but we're already dead by then.",
 "We're at ~2% stockout overall — flex helps a lot.",
 ],
 },
 ],
 },
];

// Fill computed stats
const _allInsights = PERU_INTERVIEW_INSIGHTS.flatMap((s) => s.insights);
PERU_VISIT_EXECUTIVE_SUMMARY.stats = {
 stores: PERU_INTERVIEW_INSIGHTS.length,
 totalInsights: _allInsights.length,
 criticalThemes: PERU_CROSS_STORE_THEMES.filter((t) => t.priority === "Critical").length,
 bugCount: _allInsights.filter((i) => i.category === "Bug").length,
 uxCount: _allInsights.filter((i) => i.category === "UX").length,
 productCount: _allInsights.filter((i) => i.category === "Product").length,
 operationCount: _allInsights.filter((i) => i.category === "Operation").length,
 infraCount: _allInsights.filter((i) => i.category === "Infra").length,
};
