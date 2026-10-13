export type PueblaInsightCategory = "Bug" | "UX" | "Product" | "Operation" | "Infra";

export type PueblaInterviewInsight = {
 category: PueblaInsightCategory;
 title: string;
 detail: string;
 source: string;
 quotes: string[];
};

export type PueblaStoreInterview = {
 id: string;
 name: string;
 poc: string;
 files: string;
 summary: string;
 highlights: string[];
 insights: PueblaInterviewInsight[];
};

export type PueblaCrossTheme = {
 priority: "Critical" | "High" | "Medium";
 title: string;
 summary: string;
 stores: string[];
 category: PueblaInsightCategory;
 attention: string;
 quotes: string[];
};

export const PUEBLA_CROSS_STORE_THEMES: PueblaCrossTheme[] = [
 {
 priority: "Critical",
 title: "Seller app freezes / no order sound — missed and expired orders",
 summary:
 "App kicks out of seller during peak, map goes blank, or orders arrive without sound. Sellers refresh every 2–3 minutes; some orders expire before they notice.",
 stores: ["Forjadores", "Zavaleta", "San Jerónimo"],
 category: "Bug",
 attention:
 "3/5 stores. Direct impact on expired orders, dispatch SLA and revenue — especially when seller is on the floor or restocking.",
 quotes: [
 "When there are many orders the table freezes... the map takes a minute to load and stays blank. (Forjadores)",
 "It closes on me four or five times a day — three or four minutes without noticing and orders pile up. (Zavaleta)",
 "It doesn't sound — I have to refresh every two or three minutes or orders show up already expired. (San Jerónimo)",
 ],
 },
 {
 priority: "Critical",
 title: "10-minute dispatch SLA vs courier availability",
 summary:
 "Order may be ready in 2–3 minutes but sits waiting for a courier 10–15 minutes. Dispatch metric penalizes the store even when delivery SLA is met.",
 stores: ["Forjadores", "Zavaleta", "Talabera"],
 category: "Operation",
 attention:
 "Structural mismatch between prep time and staffing. Sellers want SLA to reflect 'ready to go' vs 'courier picked up'.",
 quotes: [
 "I already have the order prepared in three minutes but no courier — my dispatch SLA gets hit. (Zavaleta)",
 "40 orders for 8 couriers in five minutes — impossible to have 15–20 riders. (Forjadores)",
 "Two couriers, two orders each — we still hit 35 min delivery but dispatch suffers. (Talabera)",
 ],
 },
 {
 priority: "High",
 title: "Overlapping / routing — orders go to wrong POC or flood one store",
 summary:
 "Nearby customers routed to distant stores; when neighbors turn off SKUs, volume collapses onto one POC. New stores lose orders to older ones in the same zone.",
 stores: ["Forjadores", "Jalpan", "San Jerónimo"],
 category: "Product",
 attention:
 "Puebla-specific: inter-POC spillover when SKUs are off, plus polygon too large on late hours (40–50 min rides).",
 quotes: [
 "When Zavaleta or San Jerónimo turn off Victoria Mega, everything lands on me. (Forjadores)",
 "Clients 5 blocks away get routed to other POCs and complain about 30–40 min waits. (Jalpan)",
 "Late-hours polygon sends riders to La Paz del Sur — I lose a courier for two hours. (San Jerónimo)",
 ],
 },
 {
 priority: "High",
 title: "Promo lead time vs supply delivery (1 day notice, 4-day stock arrival)",
 summary:
 "World Cup promos escalated 30→50% Corona with little notice. Supply arrives once a week (often Tuesday only) — sellers can't stock up before weekend promos.",
 stores: ["Forjadores", "San Jerónimo", "Jalpan"],
 category: "Operation",
 attention:
 "Recurring desabasto on Corona Mediana. Sellers over-order when warned; miss volume when promo drops same-day.",
 quotes: [
 "They told us Friday about 50% Corona — I ordered 250 cartons but still ran out on Mexico match day. (Forjadores)",
 "I order Friday, delivery comes Tuesday — promo runs Saturday and I'm empty. (San Jerónimo)",
 "If they released promos 11pm–12am we'd do 25–30 orders instead of 10. (Forjadores)",
 ],
 },
 {
 priority: "High",
 title: "7-day KPIs only — no daily or hourly operational view",
 summary:
 "Top Stores locked to last 7 days. Sellers want yesterday's numbers and orders-per-hour / couriers-per-hour to staff peaks.",
 stores: ["Zavaleta", "Talabera"],
 category: "UX",
 attention:
 "Strong performers still can't drill into a single day. Ale shares Excel snapshots ad hoc — not scalable.",
 quotes: [
 "Last seven days only — I can't see yesterday or the monthly total. (Zavaleta)",
 "Ale shared orders-by-hour in a spreadsheet — I'd love that inside the platform. (Zavaleta)",
 ],
 },
 {
 priority: "Medium",
 title: "Inventory search and portfolio navigation",
 summary:
 "General inventory search misses SKUs (e.g. 'modelo'). Minimum portfolio groups incomplete; sellers want brand/category tabs and bulk on/off.",
 stores: ["San Jerónimo", "Forjadores"],
 category: "UX",
 attention:
 "High SKU count POCs struggle at peak when toggling promos. Combos found only by typing '+'.",
 quotes: [
 "I type Corona and not everything shows — we work by SKU number. (San Jerónimo)",
 "Snack group shows 5 items when category has 20 — I flip page by page. (San Jerónimo)",
 ],
 },
 {
 priority: "Medium",
 title: "CX / ticket response too slow — want faster channel",
 summary:
 "Email tickets to CX take until next day. Sellers prefer WhatsApp or direct line for time-sensitive issues (wrong address, no code, cancel).",
 stores: ["Forjadores", "Talabera"],
 category: "Operation",
 attention:
 "Seller resolves most disputes by calling the customer; formal ticket flow doesn't match peak pace.",
 quotes: [
 "I get the email, call the client — most reports are the customer ordering the wrong SKU drunk. (Forjadores)",
 "WhatsApp was faster before — now email tickets answer next day. (Talabera)",
 ],
 },
 {
 priority: "Medium",
 title: "Cold chain — ice, fridge space, warm beer on volume orders",
 summary:
 "Ice machines missing or broken; fridges fit max 5 cartons. Sellers mark 'warm' or add ice bags at own cost; backpacks don't work for 4–6 medians on one moto.",
 stores: ["Forjadores", "Zavaleta", "San Jerónimo", "Talabera"],
 category: "Infra",
 attention:
 "Weekend promo volume exceeds refrigeration. Couriers stack multiple cases on moto without backpacks.",
 quotes: [
 "Backpacks don't work — we stack up to four medians with rope on the moto. (Forjadores)",
 "Ice machine broken; cold room covers us but on cartons we call the client. (Zavaleta)",
 "Five charolas max in the fridge — 10-carton orders go warm unless we buy ice. (San Jerónimo)",
 ],
 },
];

export const PUEBLA_INTERVIEW_INSIGHTS: PueblaStoreInterview[] = [
 {
 id: "forjadores",
 name: "Forjadores",
 poc: "Antigua Taquería La Oriental · Cobulancingo",
 files: "TaDa 1 Antigua Taquería La Oriental POC Forjadores.m4a.txt",
 summary:
 "High-volume mature POC (~100+ orders on peak Saturdays, 7–9 couriers). Oscar runs tight manual ops: route planning on map, cold priority, custom SOPs. World Cup promos saturated ops (50 orders / 8 riders). Strong satisfaction with platform overall; pain is peak tooling, overlap spillover, and user-blocking false positives.",
 highlights: [
 "Map/table freezes at peak — blank screen, kicks back when assigning couriers",
 "Neighbor POCs turn off SKUs → orders flood Forjadores",
 "Corona promo ladder 30→50% with 250-carton buy still not enough on Mexico match",
 "User fraud blocks hurt legitimate B2B clients (mayordomos, barberías, colombianos)",
 "Peak courier incentives would unlock extra riders",
 "Wants promo visibility + late-night (11pm–12am) push",
 ],
 insights: [
 {
 category: "Bug",
 title: "Map and order table freeze under high demand",
 detail:
 "During peaks the seller map takes ~1 min to load, stays blank, and navigating to assign a courier kicks the user out of the screen. With 20 pending orders, assignments are delayed.",
 source: "Seller (Oscar)",
 quotes: [
 "If I open the map it takes time to load and stays blank — with 20 orders they don't show up for a while.",
 "I zoom in to assign and it sends me back and forth and won't let me assign riders.",
 ],
 },
 {
 category: "Product",
 title: "Overlapping — neighbor stores offload volume when SKUs are off",
 detail:
 "When Zavaleta or San Jerónimo disable Victoria Mega or Corona Mediana, those orders route to Forjadores. Oscar absorbs multiple zones and saturates.",
 source: "Seller",
 quotes: [
 "If they turn off Victoria Mega I start getting their zone — I absorb Zavaleta and San Jerónimo.",
 "I only ask that colleagues keep enough stock so when they turn off SKUs it doesn't all fall on me.",
 ],
 },
 {
 category: "Operation",
 title: "World Cup promo ramp — 40 orders / 8 couriers",
 detail:
 "Escalating Corona discounts (30→40→50%) on 24-pack drove 50+ pending orders with 8 riders. Delivered with 40–60 min calls to customers; dispatch KPIs missed.",
 source: "Seller",
 quotes: [
 "On the fifth match 50% on Corona from 24 pieces — 50 orders for 8 couriers, we called customers we'd take 40–60 min.",
 "Thank God Mexico didn't advance — it would have been brutal.",
 ],
 },
 {
 category: "Product",
 title: "User blocking flags legitimate high-volume clients",
 detail:
 "Mayordomos, barberías with cantina, and colombianos placing multiple nearby orders get blocked as fraud. ~20% of volume is Modelo-channel resellers when truck doesn't come.",
 source: "Seller",
 quotes: [
 "They blocked the mayordomo — he does 8 orders/day for church events. I asked Jorge to unblock with a field visit.",
 "When the Corona truck doesn't pass, 20% of my clients are other stores buying cold beer from us.",
 ],
 },
 {
 category: "UX",
 title: "First-order badge — actively prioritized",
 detail:
 "Team ships first-time customers first to protect experience; repeat customers understand 35-min window.",
 source: "Seller",
 quotes: [
 "If I have three orders and one is first order — send that one first for the best experience.",
 ],
 },
 {
 category: "Product",
 title: "Late-night promos (11pm–12am) — untapped volume",
 detail:
 "Store open until midnight; customers rush last orders. Promo push before close could 3× orders (10 → 25–30).",
 source: "Seller",
 quotes: [
 "If you dropped a Victoria Mega promo 11–12 before we close we'd go from 10 to 25–30 orders.",
 ],
 },
 {
 category: "Operation",
 title: "Peak courier incentives",
 detail:
 "Extra pay during World Cup brought riders who wanted to watch the match. Would hire 1–2 more peak riders with structured bonus.",
 source: "Seller",
 quotes: [
 "If you paid an extra incentive I could hire one or two more riders for peak — but my full-timers don't want to share trips.",
 ],
 },
 {
 category: "Infra",
 title: "No backpacks — stack up to 4 medians on moto",
 detail:
 "Delivery bags useless for beer volume. Riders rope 4–6 medians per trip; routes planned manually on map.",
 source: "Seller",
 quotes: [
 "With backpacks we're just playing — we throw up to four medians with rope on the moto.",
 ],
 },
 {
 category: "Operation",
 title: "CX disputes resolved by phone, not ticket",
 detail:
 "Email reports mostly drunk customers confusing Victoria Familiar vs Mega. Oscar calls client directly faster than CI loop.",
 source: "Seller",
 quotes: [
 "They ordered Familiar thinking it was Mega — I call and they say sorry, can I change the report?",
 ],
 },
 {
 category: "Product",
 title: "Channel to propose regional SKUs (e.g. Cholula snacks)",
 detail:
 "Wants a direct line to upload local products (e.g. 'chidas' chips) without depending only on Ale.",
 source: "Seller",
 quotes: [
 "I'd like a group where we upload 'I have this product' and someone puts it on the platform.",
 ],
 },
 ],
 },
 {
 id: "zavaleta",
 name: "Zavaleta",
 poc: "Calzada la Concepción POC",
 files: "TaDa 2, Calzada la Concepción POC Zavaleta.m4a.txt",
 summary:
 "Strong KPIs (~12 min delivery). Three trusted couriers + owner on car when needed. Seller app closes 4–5×/day without sound — main operational risk. 10-min dispatch SLA hurts when order is ready but no rider. Wants hourly orders/reps chart inside platform.",
 highlights: [
 "Seller app kicks out 4–5× daily — no notification sound",
 "10-min dispatch SLA vs 15-min wait for courier with order ready",
 "7-day KPIs only — wants daily filter",
 "Can't add order to courier already en route",
 "Ice machine broken; cold room OK for now",
 "Uber pays more — hard to compete for couriers",
 ],
 insights: [
 {
 category: "Bug",
 title: "Seller session closes silently — 4–5 times per day",
 detail:
 "App exits to background without alert; 3–4 minutes pass before seller notices and new orders stack up.",
 source: "Seller",
 quotes: [
 "It closes on me at least four or five times a day — no sound, I'm stocking and suddenly three orders are waiting.",
 ],
 },
 {
 category: "Operation",
 title: "Dispatch SLA penalizes ready orders without courier",
 detail:
 "Order prepared in 2–3 min but all riders on route; waits 15 min for return. Dispatch metric red, delivery still under 35 min.",
 source: "Seller",
 quotes: [
 "I had it ready at 3 minutes but no courier — at 15 minutes the rider arrives and dispatch already looks bad.",
 ],
 },
 {
 category: "UX",
 title: "7-day KPI window — no daily or monthly view",
 detail:
 "Cannot see yesterday alone or month-to-date in Top Stores. Relies on Ale for hourly Excel exports.",
 source: "Seller",
 quotes: [
 "Last seven days only — if I want yesterday or the month I can't.",
 ],
 },
 {
 category: "UX",
 title: "Wants orders-per-hour and couriers-per-hour in app",
 detail:
 "Ale shares heatmap-style spreadsheet; seller wants it native to plan staffing and explain pressure to riders without friction.",
 source: "Seller",
 quotes: [
 "Orders per hour and couriers per hour — that data helps me staff and show the team why we're pushing.",
 ],
 },
 {
 category: "UX",
 title: "Cannot assign second order to courier on route",
 detail:
 "When rider leaves with one order and another drops nearby, no way to attach it — hurts dispatch unless rider manually takes it (stats issue).",
 source: "Seller",
 quotes: [
 "He's leaving with one and another falls next door — I'd love to send it with him but the app won't let me.",
 ],
 },
 {
 category: "UX",
 title: "First-order flag visible — prioritized",
 detail:
 "Free shipping / first order badge shown; team gives priority same as other Puebla POCs.",
 source: "Seller",
 quotes: [
 "First user order shows on screen — we prioritize it.",
 ],
 },
 {
 category: "Operation",
 title: "Uber vs TaDa courier economics",
 detail:
 "Peak helper works Uber — bonuses, rain surge, gold/silver tiers. TaDa single-category but lower peak earnings.",
 source: "Seller",
 quotes: [
 "On Uber he gets 50 orders and chooses — rain bonuses, tier commissions. Here it's beer only.",
 ],
 },
 {
 category: "Infra",
 title: "Ice machine down — cold room backup",
 detail:
 "Ice maker not working; 100-carton cold room covers daily ops. Never ran out cold yet.",
 source: "Seller",
 quotes: [
 "Ice machine doesn't work but the cold room has ~100 cartons — we haven't failed on cold.",
 ],
 },
 {
 category: "Operation",
 title: "Barcel / Sabritas supply route unreliable",
 detail:
 "Route rep changed or on vacation — 2–3 weeks without snack refill. Returns 45 pieces when forced full load.",
 source: "Seller",
 quotes: [
 "Barcel hasn't come in two weeks — I returned half the stand. They arrive 5–7pm when I need volume.",
 ],
 },
 ],
 },
 {
 id: "jalpan",
 name: "Jalpan",
 poc: "Calle Jalpan · Gasolinera La Paz",
 files: "TaDa 3, Calle Jalpan POC Gasolinera La Paz.m4a.txt",
 summary:
 "POC since Nov 2024 (~450–600 orders/month). Owner was Lima rep before investing. Strong stock discipline. Main pain: algorithm sends nearby clients to other POCs (late delivery); believes newer store gets less priority than veterans.",
 highlights: [
 "Customers within 5 blocks routed to other POCs — loses sales",
 "Can't batch 2–3 orders per courier — not enough time",
 "Saturday peak: 5 couriers, one trip with 2 orders max",
 "Corona Mediana desabasto (shared nationally)",
 "Cold: only 5 cartons in fridge — explains warm on carton orders",
 "Redemption promo + first-order flow worked well",
 ],
 insights: [
 {
 category: "Product",
 title: "Routing — nearby orders go to other POCs",
 detail:
 "Clients Oscar recommended install app but orders route elsewhere; 30–40 min waits while Jalpan could serve in minutes.",
 source: "Seller",
 quotes: [
 "They live five blocks away, order, and it doesn't show my store — they get 30–40 minutes from another POC.",
 ],
 },
 {
 category: "Product",
 title: "Algorithm may deprioritize newer POC",
 detail:
 "Neighboring stores with longer tenure get more orders despite Jalpan having stock and proximity.",
 source: "Seller",
 quotes: [
 "I don't know if it's because I'm newer — others nearby have more orders than me with the same stock.",
 ],
 },
 {
 category: "Operation",
 title: "No multi-order trips — time doesn't allow",
 detail:
 "Tried 2–3 orders per rider early on; abandoned. Peak Saturday uses 5 riders, one order each.",
 source: "Seller",
 quotes: [
 "We used to group two or three but we don't have time anymore — Saturday everyone takes one.",
 ],
 },
 {
 category: "UX",
 title: "First-order label — same priority as others",
 detail:
 "Sees 'first order' badge; team treats all orders equally (doesn't skip queue for new users).",
 source: "Seller",
 quotes: [
 "First order shows — we give all orders the same importance.",
 ],
 },
 {
 category: "Infra",
 title: "Fridge fits 5 cartons — warm delivery on volume",
 detail:
 "10-carton requests exceed fridge; courier explains on arrival. Promo carton orders common.",
 source: "Seller",
 quotes: [
 "Max five cartons in the fridge — when they order ten we send and the rider explains.",
 ],
 },
 {
 category: "Operation",
 title: "Rain — boots, no platform incentive",
 detail:
 "Unlike some POCs, pays personal bonuses in rain; never closes for weather.",
 source: "Seller",
 quotes: [
 "We go out in rain with boots — I give bonuses, we don't stop.",
 ],
 },
 {
 category: "Product",
 title: "World Cup redemption drove new users",
 detail:
 "Canje promo brought first-time customers scanning for free six-pack; tapered after first scan.",
 source: "Seller",
 quotes: [
 "At first many came for the free six-pack scan — later it was mostly six-packs not singles.",
 ],
 },
 ],
 },
 {
 id: "talabera",
 name: "Talabera",
 poc: "Boulevard San Felipe · Sol Talabera / Calle Jalpan",
 files: "TaDa 4, Boulevard San Felipe POC Sol Talabera Calle Jalpan.m4a.txt",
 summary:
 "Small team (2 couriers weekends). CX ticket response via email too slow — wants WhatsApp-style channel. Promo comms OK via groups + Ale DMs. Prints flyers for customers unfamiliar with app.",
 highlights: [
 "CX tickets answered next day — too slow for peak",
 "Prefers direct WhatsApp from Ale for promos",
 "2 couriers, max 2 orders each — hits 35 min delivery",
 "First orders prioritized when possible",
 "Late hours Wed — opportunity for promos",
 "Barcel Fridays reliable",
 ],
 insights: [
 {
 category: "Operation",
 title: "CX ticket response slow — email next day",
 detail:
 "When customer won't answer or code fails, email ticket doesn't resolve in time. Previously WhatsApp group was faster.",
 source: "Seller",
 quotes: [
 "I report no code / no answer — response comes next day. WhatsApp used to be faster.",
 ],
 },
 {
 category: "UX",
 title: "Promo comms — groups OK but prefers Ale DM",
 detail:
 "National + local WhatsApp groups work; personal message from Ale ensures visibility when busy.",
 source: "Seller",
 quotes: [
 "Ale forwards to me personally — easier than reading every group message.",
 ],
 },
 {
 category: "Operation",
 title: "Printed flyers for non-digital customers",
 detail:
 "Customers walk in not knowing app — team prints pollotitos with instructions.",
 source: "Seller",
 quotes: [
 "We print little flyers so customers know how to order.",
 ],
 },
 {
 category: "UX",
 title: "Limited KPI use — checks delivery time visually",
 detail:
 "Doesn't deep-dive Top Stores daily; would like dispatch/delivery times more visible in platform.",
 source: "Seller",
 quotes: [
 "I look at delivery time roughly — having times in the platform would be more comfortable.",
 ],
 },
 {
 category: "Infra",
 title: "Ice via bags — no machine",
 detail:
 "Uses cooler + ice bag per order when needed.",
 source: "Seller",
 quotes: [
 "We have the cooler and put an ice bag so it arrives cold.",
 ],
 },
 {
 category: "UX",
 title: "First-order prioritization",
 detail:
 "When swamped, first-time users go first; two orders per rider max.",
 source: "Seller",
 quotes: [
 "If we have something to give we prioritize first order — two orders per courier max.",
 ],
 },
 ],
 },
 {
 id: "san-jeronimo",
 name: "San Jerónimo",
 poc: "Camino Real a San Jerónimo",
 files: "TaDa 5, Camino Real a San Jerónimo.m4a.txt",
 summary:
 "Early TaDa adopter (ex-Modelorama Now), two POCs, 10–12 staff. Loyal couriers on weekly base pay. Critical pains: no order sound (expired orders), supply only Tuesdays (4-day gap), info overload in WhatsApp groups, broken inventory search, oversized late-hours polygon.",
 highlights: [
 "No notification sound — orders expire; refresh every 2–3 min",
 "Supply delivery Tuesdays only — misses weekend promos",
 "Too many WhatsApp groups — promo info gets lost",
 "Late-hours polygon too large — 40–50 min rides",
 "Inventory search broken (modelo, combos with +)",
 "Wants brand/category tab in portfolio",
 ],
 insights: [
 {
 category: "Bug",
 title: "No order alert sound — expired orders",
 detail:
 "Seller must manually refresh every 2–3 min while restocking or on floor. Internet drops also cause missed/expired orders.",
 source: "Seller (Luis)",
 quotes: [
 "It doesn't sound — I'm restocking 10 minutes and orders show up expired.",
 "When internet fails we don't know until an order is already expired.",
 ],
 },
 {
 category: "Operation",
 title: "Supply once a week (Tuesday) — promo mismatch",
 detail:
 "Orders Friday, arrives Tuesday; weekend promos announced Thursday/Friday with no stock pipeline.",
 source: "Seller",
 quotes: [
 "I order Friday, they deliver Tuesday — promo runs Saturday and I'm empty.",
 "I'd need Monday + Friday deliveries — never only Tuesday.",
 ],
 },
 {
 category: "UX",
 title: "Information overload — dozens of WhatsApp groups",
 detail:
 "Modelorama + TaDa + regional groups; promo calendar lost in noise. Wants Ale as single filter.",
 source: "Seller",
 quotes: [
 "So many groups I honestly can't read everything — I miss promos.",
 ],
 },
 {
 category: "Product",
 title: "Late-hours polygon — distant zones",
 detail:
 "Orders to La Paz del Sur tie up rider 40–50 min; second order same zone loses another rider for 2 hours.",
 source: "Seller",
 quotes: [
 "Late hours they send me very far — one rider gone two hours, then another order same zone.",
 ],
 },
 {
 category: "UX",
 title: "Inventory search unreliable",
 detail:
 "Typing 'modelo' or 'corona' doesn't return expected SKUs. Combos found only with '+' search. Minimum portfolio groups incomplete.",
 source: "Seller",
 quotes: [
 "I type modelo and it never appears — we search by SKU number.",
 "Snack group shows 5 of 20 — I page one by one.",
 ],
 },
 {
 category: "UX",
 title: "Wants alphabetical / brand portfolio tab",
 detail:
 "General inventory is chaos; minimum portfolio groups help but need ordered brand view or replace with measured SKU list.",
 source: "Seller",
 quotes: [
 "Ideal: brand tab, alphabetical — or replace this tab with the SKUs you actually measure.",
 ],
 },
 {
 category: "Operation",
 title: "Manual add-on delivery skews SLA stats",
 detail:
 "When rider passes gas station next door, seller sends order manually — platform thinks slow dispatch though client is happy.",
 source: "Seller",
 quotes: [
 "Order next to the gas station — we send it but stats think we're doing something wrong.",
 ],
 },
 {
 category: "Infra",
 title: "No marketplace cooler — warm when charolas sell out",
 detail:
 "Bought own fridge; no space for Pepsi/marketplace mix. Buys ice bags ~8×/month for warm beer cases.",
 source: "Seller",
 quotes: [
 "No marketplace fridge — when charolas run out we send warm and buy ice, costs me money.",
 ],
 },
 {
 category: "Product",
 title: "World Cup promo — sold 40 + 20 cartons if warned earlier",
 detail:
 "50% Corona sold out instantly; would have doubled order with one week notice.",
 source: "Seller",
 quotes: [
 "One day notice — I sold 40 cartons here and 20 there. With a week I'd have ordered double.",
 ],
 },
 {
 category: "Operation",
 title: "First-order prioritization when address is new",
 detail:
 "Known addresses trusted; brand-new pins get extra care for coupon/first-user promos.",
 source: "Seller",
 quotes: [
 "When the address is new we prioritize — regulars we already know.",
 ],
 },
 ],
 },
];
