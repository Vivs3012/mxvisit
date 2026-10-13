export const PERU_VISIT_PERIOD = "01/05/2026–20/08/2026";
export const PERU_VISIT_MONTHS = ["Jun", "Jul", "Aug"];

export type PeruVisitStore = {
 id: string;
 name: string;
 poc: string;
 district: string;
 orders: number;
 fillRate: number;
 sla35: number;
 sla60: number;
 tml10: number;
 rating: number;
 availability: number;
 perfectOrders: number;
 stockout: number;
 skuAvailability: number | null;
 cancelledBy: { consumer: number; seller: number; courier: number };
 couriers: number;
 couriersRegular: number;
 topCouriers: { name: string; orders: number }[];
 monthly: {
 fillRate: number[] | null;
 sla35: number[] | null;
 tml10: number[] | null;
 rating: number[] | null;
 };
 alerts: string[];
 positives: string[];
};

export const PERU_VISIT_STORES: PeruVisitStore[] = [
 {
 id: "la-marina",
 name: "La Marina",
 poc: "PC La Marina - Pueblo Libre E0",
 district: "Pueblo Libre",
 orders: 4095,
 fillRate: 95.88,
 sla35: 99.65,
 sla60: 100,
 tml10: 92.58,
 rating: 4.93,
 availability: 98.02,
 perfectOrders: 97.17,
 stockout: 1.4,
 skuAvailability: null,
 cancelledBy: { consumer: 60.2, seller: 0.6, courier: 38.6 },
 couriers: 57,
 couriersRegular: 15,
 topCouriers: [
 { name: "Ricardo Cesar Suppo", orders: 557 },
 { name: "Janyerson Martinez", orders: 478 },
 { name: "Angel Daniel Rodríguez Francisco", orders: 464 },
 ],
 monthly: {
 fillRate: [95.46, 96.45, 95.55],
 sla35: [99.77, 99.94, 99.07],
 tml10: [90.94, 95.41, 90.31],
 rating: [4.96, 4.91, 4.9],
 },
 alerts: [
 "TML 10 dropped 5.1 pp from Jul to Aug (95.4% → 90.3%)",
 "38.6% of cancellations attributed to courier",
 ],
 positives: [
 "Best SLA 35 (99.7%) and TML 10 (92.6%) in the visit set",
 "Fill Rate stable ~95–96% across Jun–Aug",
 "Stockout ~1.4% — lowest of the three stores",
 ],
 },
 {
 id: "merino",
 name: "Merino",
 poc: "PC Merino - Lince E0",
 district: "Lince",
 orders: 763,
 fillRate: 95.38,
 sla35: 93.0,
 sla60: 99.34,
 tml10: 87.29,
 rating: 4.94,
 availability: 99.23,
 perfectOrders: 91.24,
 stockout: 4.4,
 skuAvailability: 68.4,
 cancelledBy: { consumer: 71.9, seller: 3.1, courier: 25.0 },
 couriers: 13,
 couriersRegular: 6,
 topCouriers: [
 { name: "Cesar Rodriguez", orders: 210 },
 { name: "Erickson Torres", orders: 124 },
 { name: "Jose Colmenares", orders: 122 },
 ],
 monthly: {
 fillRate: null,
 sla35: null,
 tml10: null,
 rating: null,
 },
 alerts: [
 "SLA 35 at 93.0% — below the 95% target",
 "Stockout 4.4% and SKU availability 68.4% — weakest assortment of the three",
 "Smallest fleet: 13 couriers (6 regular)",
 ],
 positives: [
 "Highest order rating (4.94) and availability (99.2%)",
 "Stockout fell in recent weeks (8.4% → 1.4% in weeks 32–34)",
 "Fill Rate 95.4% — on par with La Marina",
 ],
 },
 {
 id: "san-pedro",
 name: "San Pedro",
 poc: "PC San Pedro - Surquillo E0",
 district: "Surquillo",
 orders: 4210,
 fillRate: 94.16,
 sla35: 94.35,
 sla60: 99.59,
 tml10: 36.75,
 rating: 4.9,
 availability: 97.13,
 perfectOrders: 90.73,
 stockout: 1.9,
 skuAvailability: 76.3,
 cancelledBy: { consumer: 51.2, seller: 12.2, courier: 35.4 },
 couriers: 23,
 couriersRegular: 13,
 topCouriers: [
 { name: "Fernando Cuadros", orders: 721 },
 { name: "Marco Pumayauli Leyton", orders: 708 },
 { name: "Manuel Azañero", orders: 466 },
 ],
 monthly: {
 fillRate: [95.9, 93.72, 93.88],
 sla35: [96.43, 93.57, 94.4],
 tml10: [24.72, 36.67, 42.38],
 rating: [4.92, 4.91, 4.89],
 },
 alerts: [
 "TML 10 at 36.8% — by far the lowest in the visit set (La Marina 92.6%)",
 "Seller share of cancellations is 12.2% vs 0.6–3.1% in the other stores",
 "SLA 35 slipped from 96.4% in Jun to 94.4% in Aug",
 ],
 positives: [
 "Highest volume of the visit (4,210 orders)",
 "TML 10 is recovering: 24.7% → 36.7% → 42.4% (Jun–Aug)",
 "Stockout 1.9% after a 9.4% spike in early Jun",
 ],
 },
];
