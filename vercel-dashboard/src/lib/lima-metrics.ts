export const LIMA_PERIOD = "01/05/2026–20/08/2026";
export const LIMA_MONTHS = ["May", "Jun", "Jul", "Aug"];

export const LIMA = {
 id: "lima",
 name: "Lima",
 pocs: 80,
 orders: 336789,
 ordersPerPoc: 4209.86,
 fillRate: 92.5959,
 fillRateWoCanc: 96.3915,
 sla35: 95.0414,
 sla60: 99.6607,
 tml10: 66.6818,
 rating: 4.887161,
 availability: 95.4542,
 stockout: 1.3295,
 perfectOrders: 90.1734,
 perfectService: 87.7062,
 accuracy: 80.1463,
 demandCoverage: 96.3193,
 ordersRated: 31.0818,
 monthly: {
 rating: [4.894669, 4.874249, 4.8903, 4.898657],
 fillRate: [91.9717, 92.5479, 93.2878, 93.3295],
 sla35: [94.511, 94.1804, 95.7613, 96.8652],
 tml10: [65.7559, 65.4991, 69.3318, 70.4467],
 },
 junJul: {
 fillRate: 0.7399,
 sla35: 1.5809,
 tml10: 3.8327,
 rating: 0.016051,
 },
 alerts: [
 "Fill Rate at 92.6% — just below the 93% target",
 "Consolidated accuracy at 80.1%",
 "Perfect Service (87.7%) trails Perfect Orders (90.2%)",
 ],
 positives: [
 "80 stores and 336,789 orders in the period",
 "SLA 35 at 95.0% — on the 95% target",
 "TML 10 at 66.7% — above the 60% target",
 "SLA 60 at 99.7%",
 "Stockout at 1.3% — below the 2% target",
 "Availability at 95.5%",
 "Order rating 4.89",
 ],
};
