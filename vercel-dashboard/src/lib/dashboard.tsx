"use client";

import { useState } from "react";
import {
  BarChart,
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  Pill,
  Row,
  Select,
  Stack,
  Stat,
  Table,
  Text,
} from "@/components/ui";

type StoreData = {
  id: string;
  name: string;
  orders: number;
  tml10: number;
  fillRate: number;
  sla35: number;
  sla60: number;
  rating: number;
  availability: number;
  perfectOrders: number;
  stockoutAvg: number;
  monthly: {
    orders: number[];
    fillRate: number[];
    sla35: number[];
    tml10: number[];
    stockout: number[];
  };
  junJul: {
    fillRate: number;
    sla35: number;
    tml10: number;
    availability: number;
  };
  stockoutCats: Record<string, number> | null;
  alerts: string[];
  positives: string[];
};

const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul"];

type StoreData = {
  id: string;
  name: string;
  orders: number;
  tml10: number;
  fillRate: number;
  sla35: number;
  sla60: number;
  rating: number;
  availability: number;
  perfectOrders: number;
  stockoutAvg: number;
  monthly: {
    orders: number[];
    fillRate: number[];
    sla35: number[];
    tml10: number[];
    stockout: number[];
  };
  junJul: {
    fillRate: number;
    sla35: number;
    tml10: number;
    availability: number;
  };
  stockoutCats: Record<string, number> | null;
  alerts: string[];
  positives: string[];
};

const STORES: StoreData[] = [
  {
    id: "bahia",
    name: "Bahia",
    orders: 5112,
    tml10: 51.78,
    fillRate: 90.85,
    sla35: 85.81,
    sla60: 97.13,
    rating: 4.91,
    availability: 91.5,
    perfectOrders: 78.23,
    stockoutAvg: 3.18,
    monthly: {
      orders: [1156, 1225, 1277, 1089, 365],
      fillRate: [91.68, 90.91, 90.83, 88.82, 80.79],
      sla35: [86.72, 87.97, 84.27, 84.55, 88.33],
      tml10: [53.03, 51.51, 50.31, 51.65, 65.52],
      stockout: [3.02, 3.3, 3.3, 3.1, 3.06],
    },
    junJul: { fillRate: -8.03, sla35: 3.78, tml10: 13.87, availability: -0.83 },
    stockoutCats: null,
    alerts: [
      "Fill Rate fell 8 pp from Jun to Jul (88.8% → 80.8%) — biggest drop in the group",
      "SLA 35 at 85.8% — below target, despite slight recovery in Jul",
      "Lowest volume in the group (5,112 orders) and lowest Perfect Orders (78.2%)",
      "Availability Rate below 92% — worst in the portfolio",
    ],
    positives: [
      "Order Rating 4.91 — better customer satisfaction",
      "SLA 60 at 97.1%",
      "TML 10 rose 13.9 pp in Jul (51.7% → 65.5%) — speed improvement",
    ],
  },
  {
    id: "churubusco",
    name: "Churubusco",
    orders: 5645,
    tml10: 37.98,
    fillRate: 94.04,
    sla35: 92.44,
    sla60: 99.71,
    rating: 4.88,
    availability: 94.49,
    perfectOrders: 86.95,
    stockoutAvg: 2.37,
    monthly: {
      orders: [1302, 1247, 1272, 1288, 536],
      fillRate: [94.75, 93.97, 92.22, 94.45, 93.76],
      sla35: [95.41, 94.78, 94.34, 94.89, 91.42],
      tml10: [44.48, 42.01, 41.18, 37.9, 42.91],
      stockout: [3.0, 3.24, 2.64, 1.29, 1.08],
    },
    junJul: { fillRate: -0.69, sla35: -3.47, tml10: 5.01, availability: -1.71 },
    stockoutCats: { Others: 9.99, "Hard Liquors": 1.62, Beer: 1.3, NABs: 0.74, RTD: 0.29 },
    alerts: [
      "SLA 35 fell 3.5 pp in Jul (94.9% → 91.4%)",
      "TML 10 at 38% — lowest in the group, below target",
      "Others category with 10% stockout — higher risk of stockout",
    ],
    positives: [
      "Stockout fell from 3.0% to 1.1% (Mar → Jul)",
      "SLA 60 at 99.7% — reference in the group",
      "TML 10 rose 5 pp in Jul (37.9% → 42.9%)",
    ],
  },
  {
    id: "los-alpes",
    name: "The Alps",
    orders: 8526,
    tml10: 67.79,
    fillRate: 94.69,
    sla35: 95.24,
    sla60: 99.04,
    rating: 4.91,
    availability: 98.61,
    perfectOrders: 91.35,
    stockoutAvg: 1.26,
    monthly: {
      orders: [1780, 1921, 2133, 1931, 761],
      fillRate: [94.24, 94.96, 95.23, 93.53, 94.06],
      sla35: [97.74, 95.78, 95.8, 92.96, 92.55],
      tml10: [72.91, 68.95, 62.87, 65.96, 71.72],
      stockout: [1.18, 1.48, 1.28, 1.16, 1.05],
    },
    junJul: { fillRate: 0.53, sla35: -0.41, tml10: 5.76, availability: -0.16 },
    stockoutCats: { Beer: 1.64, "Hard Liquors": 1.48, Others: 0.66, RTD: 0.35, NABs: 0.26 },
    alerts: [
      "SLA 35 fell from 97.7% (Mar) to 92.6% (Jul) — downward trend",
    ],
    positives: [
      "Best TML 10 in the group (67.8%) and rose 5.8 pp in Jul",
      "Better Availability (98.6%) and lower average stockout (1.3%)",
      "Highest volume growth Mar–May (+20%)",
      "Perfect Orders 91.4% — best in the group",
    ],
  },
  {
    id: "mixcoac",
    name: "Mixcoac",
    orders: 9153,
    tml10: 46.95,
    fillRate: 92.26,
    sla35: 88.71,
    sla60: 98.62,
    rating: 4.83,
    availability: 89.13,
    perfectOrders: 81.76,
    stockoutAvg: 2.93,
    monthly: {
      orders: [2212, 2157, 1950, 2027, 807],
      fillRate: [94.76, 92.07, 90.58, 91.64, 94.36],
      sla35: [96.72, 91.81, 85.53, 90.09, 92.63],
      tml10: [61.24, 51.19, 39.07, 52.99, 67.24],
      stockout: [2.84, 3.05, 2.96, 2.85, 2.96],
    },
    junJul: { fillRate: 2.72, sla35: 2.54, tml10: 14.25, availability: 1.27 },
    stockoutCats: { Others: 16.97, Beer: 1.29, "Hard Liquors": 0.88, NABs: 0.17, RTD: 0.11 },
    alerts: [
      "Stockout Others at 17% — critical risk of stockout in this category",
      "Availability 89.1% — below 90%, worse together with Bahia",
      "TML 10 at 47% — second lowest in the group",
      "Mai had the worst SLA 35 in the period (85.5%)",
    ],
    positives: [
      "Highest volume in the group (9,153 orders)",
      "Improvement in Fill Rate (+2.7 pp) and SLA 35 (+2.5 pp) in Jul",
      "TML 10 rose 14 pp in Jul (53% → 67%) — biggest gain in the group",
      "Fill Rate recovered from 90.6% (May) to 94.4% (Jul)",
    ],
  },
];

type RoteiroBlock = { title: string; body: string };

const ROTEIRO_BLOCKS: RoteiroBlock[] = [
  { title: "Introduction", body: "Jul/2026 | Visit MX – Interview script\nInterview script Mexico\n(Upload refund sheet, refund note, Figma make of map + kanban and Figma make of portfolio)\nThe objective of this visit is to understand the real operation of the stores and delivery people: how they work day to day, what difficulties they have with the product and how they use what already exists. We will also show some new ideas to hear your opinion. There are no right or wrong answers.\nThe objective of this visit is to understand the real operation of the stores and delivery people: how they work on a daily basis, what difficulties they have with the product and how they use what already exists. We'll also show you some new ideas to hear your feedback. There are no right or wrong answers.\nNote for the interviewer: if time is tight, prioritize Profile, Top Stores, Inventory and Order distribution. Let the rich answers flow — cut out optional questions marked with →." },
  { title: "PART 1 — SELLER · Presentation (0:05)", body: "Nice to meet you. My name is Vivian, I'm a product designer on the operations team at TaDa. I work on the functionalities for sellers and couriers.\nI really like it. My name is Vivian, I'm a product designer in the operations squad at TaDa. I work on features for sellers and couriers.\nJust so you know: we are Brazilian, that's why I'm going to ask you to speak slowly in all your answers, so that we can understand well.\nJust so you know: we are Brazilians, so I will ask you to speak slowly in all answers, so that we can understand you clearly.\nIf at any time you don't understand a question, you can feel free to ask us.\nIf at any point you don't understand a question, you can ask us without any problem.\nToday we are going to chat for about 60 minutes about your operation at TaDa. We want to know how you work and hear your opinion on what you use today and some new ideas.\nToday we will talk for about 60 minutes about your operation at TaDa. We want to know how you work and hear your opinion on what you use today and some new ideas.\nThe interview will be recorded only for the project team. Is it okay for you?\nThe interview will be recorded for the project team only. Is that ok with you?" },
  { title: "PART 1 — SELLER · Connection — Profile and operation (0:07)", body: "I would like to know a little more about you and your work at TaDa. Can we start?\nWhat do you prefer to be called?\nWhat is your role in the store?\n→ If you don't answer alone: ​​are you the owner, manager or operator?\nHow long have you been working with TaDa?\nHow many people on your team use the seller platform?\nHow many orders do you handle per week at TaDa?\nTell me what a typical day is like with TaDa, from opening to closing.\n→ Ask for a specific example from yesterday or today." },
  { title: "PART 1 — SELLER · Top Stores — Performance (0:12)", body: "This is the performance screen of your store. I want to understand how you use it today.\nThis is your store's performance screen. I want to understand how you use it today.\nThis screen, how do you use it? How often does it open?\nWhat information from here is most useful for your operation?\nDo you understand the store's overall score? What does it mean to you?\nDo you understand the ranking? Who do you think they compare to?\nLooking at the metrics on the screen, can you explain in your own words what they mean?\n→ If it gets stuck: order one by one.\nWhich of these metrics is most important for your store?\n[Show ideas top stores]\nLooking at these screens, what do you immediately understand?\nWhat would you change or take away from this version?\nWhat other information would you like to see here?" },
  { title: "PART 1 — SELLER · Order distribution (0:06)", body: "Here the seller chooses the delivery person and sends the order directly to their app.\nDoes the flow of choosing a delivery person and sending the order work well?\n→ If not: where is it stuck?\nWhat information does the delivery person need to choose who to send the order to?\nWhat frustrates you or what would change about this feature?" },
  { title: "PART 1 — SELLER · Accept all (0:02)", body: "How do you use \\\"Accept all\\\" today? What would you like to do differently?" },
  { title: "PART 1 — SELLER · Order map (0:06)", body: "This page shows orders and delivery people in real time.\nThis screen, how do you use it?\nWhich information on the map is the most useful? What's missing?\nAre filters and delivery management via the map useful?\n→ If not: why?\nWhat frustrates you or what would change about the map?\n[Show idea: map + kanban together]\nLooking at this proposal with the map and kanban together, what do you immediately understand?\nWould it help to have the map and stage orders on the same screen in your daily life?\nWhat would change or what is missing for this screen to serve you in the operation?" },
  { title: "PART 1 — SELLER · Inventory + Quantity (0:08)", body: "Who updates inventory and how often?\nDoes turning on/off products work well on a daily basis?\n→ If not: why?\nWhen a product runs out of stock, what do you do?\nWhat would help on this page to better manage your inventory?\n[Show layout: Minimal Portfolio with Quantity column]\nLooking at this proposal, would it be useful to put the quantity directly in the list?\n→ If not: why?\nDo you prefer exact quantity, only available/unavailable, or both?\n→ Tracking: who would update it?" },
  { title: "PART 1 — SELLER · Financial report (0:08)", body: "This financial reporting screen, how do you use it?\nAbout exporting courier delivery notes (PDF): how do they use it and what for?\nHow often do you download reports? Who uses it?\nWhat financial information is missing today?\n[Show story concept]\nWe are exploring one weekly reimbursement report with PDF per week. Would it be useful? For what?\n[Show concept note]\nLooking at this document, do you understand each line? What's left to trust in the final number?" },
  { title: "PART 1 — SELLER · Delivery driver management (0:05)", body: "You can now add, search and delete delivery people from this page.\nNow you can add, search and delete couriers on this page.\nThis screen, how do you use it?\nWhat changed for you when you were able to exclude delivery drivers?\nDo the search and filters work well?\nWhat would you like to see from each delivery person on this page?\n→ Ex.: deliveries, performance, availability." },
  { title: "PART 1 — SELLER · Seller × customer communication (0:05)", body: "[Show: Chat-seller-x-consumer]\nWe are exploring allowing the seller to chat with the customer through the platform, in the context of the order.\nLooking at this flow, tell me step by step what you understand you can do and when you would use it.\nIn a real order, in what situations would you need to write to the customer? How do you solve this today?\nIs there anything in the flow that is not clear, that is missing or that would change?" },
  { title: "PART 1 — SELLER · Completion (0:03)", body: "We are reaching the end, but first I would like to know...\nWe're coming to the end, but first I'd like to know...\nWhich seller functionality makes your daily life easier?\nIf you could change one thing about TaDa for your store, what would it be?\n→ If they don't say why: ask.\nIs there anything we didn't cover that you want to tell us about?\nThank you very much for your time and for sharing your experience with us." },
  { title: "PART 2 — COURIER · Presentation (0:03)", body: "Nice to meet you. My name is Vivian, I'm a product designer at TaDa. I want to know your experience as a delivery person.\nI really like it. My name is Vivian, I'm a product designer at TaDa. I want to know your experience as a delivery person.\nWe are Brazilian, so please speak slowly. If something is not clear, ask us.\nWe are Brazilians, so please speak slowly. If something is not clear, you can ask.\nThe talk lasts about 30 minutes and will be recorded for the team only. Alright?\nThe conversation lasts around 30 minutes and will be recorded for the team only. All good?" },
  { title: "PART 2 — COURIER · Day to day and operation (0:10)", body: "Tell me what it's like to work as a delivery driver at TaDa.\nTell me what it's like to work as a delivery man at TaDa.\nWhat do you prefer to be called?\nHow long have you been delivering with TaDa?\nDo you work just for this store or for several?\n→ Follow up: how is your relationship with the owner?\nHow did you start working with this store?\n→ Ex.: they looked for you, you met the owner, you applied...\nTell me what a normal day is like: time, how many deliveries you make, when you finish.\nOn a typical day, how many deliveries do you usually make?\nWhat is the easiest part of your job? And the most difficult?" },
  { title: "PART 2 — COURIER · Order distribution (0:06)", body: "Now the seller can send the order directly to your app, without you having to type it.\nNow the seller can send the order directly to your app, without you having to type.\nWhen an order arrives, what is the process like? Tell me step by step.\nDoes your cell phone ring or does a notification arrive? Do you always notice in time?\nWhat happens if I don't see the order in time?\nWhat would change about how orders arrive and you accept?" },
  { title: "PART 2 — COURIER · Communication and problems (0:07)", body: "How do you communicate with the customer during delivery?\n→ If it doesn't say: app, WhatsApp or call?\nWhen do you need to talk to the customer?\n→ Does the app help you with that?\nHas the app ever complicated a delivery? What happened?\nHow do you communicate with the store when there is a problem?\nIn what situations do you cancel a delivery?\n→ Dig deeper: what makes you cancel?" },
  { title: "PART 2 — COURIER · History and improvements (0:08)", body: "Do you use the delivery history in the app? Does it serve any purpose?\n→ If you don't use: where do you check your deliveries?\nWhat part of your daily routine did you wish was easier?\nWhat information do you need on your cell phone while delivering that you don't have today?\nHow do you know how much you won? Does the app help with this?\nWhat would make your relationship with the store work better?\nWhat would you like the app to do better to support you on the street?" },
  { title: "PART 2 — COURIER · Completion (0:03)", body: "What do you enjoy most about working with TaDa?\nIf you could change one thing about TaDa, what would it be?\n→ If they don't say why: ask.\nIs there anything else you want to tell us?\nThank you very much for your time." },
];

function RoteiroBody({ body }: { body: string }) {
  return (
    <Text size="small" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
      {body}
    </Text>
  );
}

type InsightCategory = "Bug" | "UX" | "Product" | "Operation" | "Infra";

type InterviewInsight = {
  category: InsightCategory;
  title: string;
  detail: string;
  source: string;
  quotes: string[];
};

type StorePhoto = {
  caption: string;
  src: string;
  full: string;
};

const STORE_PHOTOS: Record<string, StorePhoto[]> = {
  "bahia": [
    {
      caption: "Store visit",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Bahia/WhatsApp Image 2026-07-22 at 10.02.11.jpeg",
    },
    {
      caption: "Operations / team",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Bahia/5614df59-d943-429d-91f3-f3222f802d5a.JPG",
    },
    {
      caption: "Operations / team",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Bahia/15a22b19-d189-4611-9214-7488b50815ac.JPG",
    },
    {
      caption: "Store visit",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Bahia/IMG_5708.heic",
    },
  ],
  "mixcoac": [
    {
      caption: "Store visit",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Mixcoac/WhatsApp Image 2026-07-22 at 10.02.18.jpeg",
    },
    {
      caption: "Store visit",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Mixcoac/WhatsApp Image 2026-07-22 at 10.03.09.jpeg",
    },
    {
      caption: "Store KPIs",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Stores/Mixcoac/Captura de Tela 2026-07-15 \\u00e0s 14.00.36.png",
    },
  ],
  "los-alpes": [
    {
      caption: "Store KPIs",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Los Alpes/Captura de Tela 2026-07-15 \\u00e0s 13.56.54.png",
    },
  ],
  "churubusco": [
    {
      caption: "Store visit",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visit MX 2026/Lojas/Churubusco/IMG_5785.heic",
    },
    {
      caption: "Store KPIs",
      src: "[IMAGE_REMOVED_FOR_EXPORT]",
      full: "/Users/zeuser/Documents/Cursor/Visita MX 2026/Lojas/Churubusco/Screenshot 2026-07-15 \\u00e0s 13.58.28.png",
    },
  ],
};

type StoreInterview = {
  id: string;
  name: string;
  files: string;
  summary: string;
  highlights: string[];
  insights: InterviewInsight[];
};

const CATEGORY_LABELS: Record<InsightCategory, string> = {
  Bug: "Bugs / technical issues",
  UX: "UX improvements",
  Product: "Product improvements",
  Operation: "Operations & process",
  Infra: "Physical infra / hardware",
};

const CATEGORY_ORDER: InsightCategory[] = [
  "Bug",
  "UX",
  "Product",
  "Operation",
  "Infra",
];

const INTERVIEW_INSIGHTS: StoreInterview[] = [
  {
    id: "bahia",
    name: "Bahia",
    files: "Bahia 1.txt (seller) + Bahia 2.txt (courier)",
    summary:
      "Small store (~300 orders/week, peak Fri-Sat), 8 trusted distributors. Strong manual operation (Excel payments, WhatsApp). Confusing KPIs; real focus on stock and preparation time.",
    highlights: [
      "Map/GPS does not update in real time — you need to leave and return to the screen (seller and consumer app)",
      "Overlapping sends order to distant store when there is a nearby store with stock",
      "KPIs in a 7-day window prevent daily team management",
      "Inflated order forecast for the day — marked 30, 7 arrived",
      "In-app chat (seller-courier and seller-client) would replace WhatsApp",
      "Inventory without categories; want quantity field with auto-decrement",
    ],
    insights: [
      {
        category: "Bug",
        title: "Distributor GPS does not update in real time",
        detail:
          "Both on the seller's map and on the consumer's app, the distributor's pin only moves if the user leaves the screen and returns. It stays in the store even after leaving. When the distributor returns, the tracking disappears.",
        source: "Seller + Courier",
        quotes: [
          "That doesn't happen here, the dealer is still there, that is, if you don't step back, come back, you won't see the dealer's beeper moving.",
          "The game leaves and if it leaves and you can see how it moves, but when you return you can't see it anymore. On our way back we never noticed it.",
          "Almost 80 of the clients tell us.",
        ],
      },
      {
        category: "Bug",
        title: "Request accepted does not change status",
        detail:
          "Some orders accepted by the distributor do not update their status on the platform. Cases are counted, but recurring since changing apps.",
        source: "Seller",
        quotes: [
          "Those who do not change their status are few. They do not change status, but from here to here the splitter proceeds.",
        ],
      },
      {
        category: "Bug",
        title: "Slow distribution under high demand",
        detail:
          "In case of saturation, the order does not arrive on the courier app without a manual refresh or ticket code. The process becomes a bottleneck on weekends.",
        source: "Seller",
        quotes: [
          "At the beginning when this application changed a lot, if they didn't arrive or then sometimes when they closed the order they didn't take some.",
        ],
      },
      {
        category: "UX",
        title: "7-day KPIs — no daily view",
        detail:
          "Seller is unable to see the previous day's performance to manage the team in the afternoon/evening. Before, I cut daily; today it depends on a supervisor or external Excel.",
        source: "Seller",
        quotes: [
          "I just don't understand, but this information is for 7 days, that is, those who already understand it know that it is for 7 days.",
          "They can't see how day to day, how they watered it today, especially when they also have a person, they don't have a person here, they can come in in the afternoon and they can say oh tomorrow they delivered so many late, they canceled so many.",
        ],
      },
      {
        category: "UX",
        title: "Performance dashboard not very intuitive",
        detail:
          "Ranking, fulfillment and metrics are not clear. Team focuses on stock, preparation time and delivery time — does not understand what impacts the score.",
        source: "Seller",
        quotes: [
          "Sometimes it has been difficult for us to understand that. In fact, one day with the girl I have here, in a way we were deciphering it as knowing what it could be.",
          "It's the owner's doubt. It also happens to us with other stores.",
        ],
      },
      {
        category: "UX",
        title: "Daily order forecast is not reliable",
        detail:
          "Preparation time screen promises volume for the day (e.g. 41 orders), but rarely matches. Seller took captures for 1.5 weeks: system scored 30 and 7 arrived. Weekend comes closer; weak days make a lot of mistakes.",
        source: "Seller",
        quotes: [
          "Today I expect that there will be 41 orders to prepare, I have a thousand screenshots every day since this new one, this new program started, I took about a week and a half captures of every day, I marked 30 and 7 arrived, I mean it has never been as exact, there are times when it has happened, the truth is I don't lie, but rarely does it get it right.",
          "Yes, it is closer to the number it says than today, Monday or Tuesday or Wednesday. For us, Thursdays, Fridays and Saturdays are the busiest.",
        ],
      },
      {
        category: "UX",
        title: "Map: distinguish en route vs pending orders",
        detail:
          "With 5+ requests in the same zone, they all turn red. Before, there was a little house icon for en route. They ask for different colors by status and by distributor.",
        source: "Seller",
        quotes: [
          "Maybe paint a different color to know why sometimes it happens to us that in that area we have five orders and it's already going there but two fall again.",
          "Then since everyone is red, I tell you that it is like a little helmet or a house, some differentiation to know which ones are left.",
        ],
      },
      {
        category: "UX",
        title: "In-app chat seller-courier and seller-client",
        detail:
          "Today everything via personal WhatsApp. They want Rappi/Uber type communication within the platform, including after completing the order to resolve pending issues.",
        source: "Seller + Courier",
        quotes: [
          "It would be great if an indication could be sent to you through the application.",
          "Since when I had already thought about it, that we could write to the customer through the application and we could have a chat with the delivery person.",
          "I like them like Rapi's, literally.",
        ],
      },
      {
        category: "UX",
        title: "Customer information disappears after order completion",
        detail:
          "If the distributor finishes early and forgets the gift or needs to contact the customer, he no longer sees the phone number/address. You have to reopen the order manually.",
        source: "Seller",
        quotes: [
          "Once the order is finalized, you can no longer see the customer's information.",
          "They can't see the phone anymore. It wouldn't end.",
        ],
      },
      {
        category: "UX",
        title: "Arrival notification does not reach the consumer",
        detail:
          "The 'ya llegue' button is an illusion — the consumer does not receive an alert. 80-90% of couriers need to call; customers do not answer unknown numbers.",
        source: "Courier",
        quotes: [
          "The user notification is very subtle.",
          "90% I have to call them on the phone to let them know that I have already arrived at their home.",
          "Today, 80% of users have their call forwarding or caller ID activated.",
        ],
      },
      {
        category: "UX",
        title: "Inventory without category/brand filters",
        detail:
          "Huge list in alphabetical order. Seller goes item by item. Do you want to segment: beer, soft drinks, wine, snacks. Search only works with exact name.",
        source: "Seller",
        quotes: [
          "Separating them by segment would help us a lot to perhaps do the inventory faster because then check them one by one, well as I told you, very long.",
          "There are times when what I do do is even one by one I see, one by one I see.",
        ],
      },
      {
        category: "UX",
        title: "Assign multiple orders at once",
        detail:
          "Today it accepts one, assigns it, accepts another. You want to select 2-3 nearby orders and send them to the same distributor at once.",
        source: "Seller",
        quotes: [
          "I would like this. Two orders for mine, three orders like this, accept all, but to prepare I'm going to select two.",
        ],
      },
      {
        category: "UX",
        title: "Reorder delivery sequence (courier)",
        detail:
          "Previously, the distributor sorted the orders before processing and the order was maintained. Today the system reorders by time and shifts the planned route.",
        source: "Courier",
        quotes: [
          "Previously the delivery man could order his orders and today you can't do that anymore, you can't do that.",
          "First, second, third procedural and do not put them out of phase, the third comes first.",
        ],
      },
      {
        category: "Product",
        title: "Overlapping prioritizes product, not distance",
        detail:
          "Main complaint: order goes to a distant store when there is a store next door with stock. Customers cancel and reorder until they find the right store. Affects SLA and satisfaction.",
        source: "Courier",
        quotes: [
          "Why are they sending me a faraway store? I'm walking and I see that they have it and I know that it is such a store and they are sending me.",
          "Many people complain about that, they come to the stores because they obviously already know that this is a point where they tell us, hey, how is it possible that you have a product and you can't send me here to the paintings.",
          "Prioritize delivery, time, distance, then the product.",
        ],
      },
      {
        category: "Product",
        title: "Unstable polygon (large/small)",
        detail:
          "Frequent changes in the polygon take or give orders without warning. Zones they had before have been removed; sellers lose volume and distributors are idle.",
        source: "Seller",
        quotes: [
          "It changes a lot, It changes a lot. Today we're not going there and tomorrow we are, but it's not good.",
          "Then we get used to the orders that may come out there and they take orders away from us, they have taken them away from us and it will be very clear.",
        ],
      },
      {
        category: "Product",
        title: "Quantity field in inventory",
        detail:
          "You want to mark real items (e.g. 40 Corona) and the system will automatically discount it. Avoid ordering when there are 2 units left. Prefer manual control to auto-delete SKU.",
        source: "Seller",
        quotes: [
          "By having that, when placing the order it is discounted and that would help us so that they do not send us extra orders.",
          "I would prefer to delete, right? Yes, because then there are times when they don't pay attention, we get products that we don't have.",
        ],
      },
      {
        category: "Product",
        title: "Weather button for dynamic shipping rate",
        detail:
          "In rain/hail shipping costs don't go up (Uber/Didi double). Couriers lose revenue. They suggest a button with evidence to activate regional surcharge.",
        source: "Courier",
        quotes: [
          "It would be good if they implemented a button on the base application platform where they could activate that button as a way to report that an explosion occurred in their area and send evidence.",
          "Uber and Didi are doubling their shipping costs. I feel like a lot of input is being lost there.",
        ],
      },
      {
        category: "Product",
        title: "Minimum penalty for consumer (does not decrease)",
        detail:
          "Customer may take 10+ minutes without getting off; courier wastes time and does not receive cancelled. They suggest a symbolic fine (~10 MXN) like Uber.",
        source: "Courier",
        quotes: [
          "A minimum penalty of at least 10 pesos would be good.",
          "It's been 10 minutes and the client still hasn't come down. And that affects us.",
        ],
      },
      {
        category: "Product",
        title: "Tenant flag (events) vs residents",
        detail:
          "Renters ask for high volumes (12 megs cold), complain and report badly. App and focused on residents; sellers want to signal their profile to support.",
        source: "Courier",
        quotes: [
          "The tenants are taking advantage, why? For the same cost of the product it is much lower.",
          "Those places are usually the ones that criticize the delivery people badly and are complaining.",
        ],
      },
      {
        category: "Operation",
        title: "Manual financial reconciliation (30 min/week)",
        detail:
          "Seller trusts Ricardo's Excel, does not use the app's financial report. Compare coupons, commercial difference and last mile manually every Monday.",
        source: "Seller",
        quotes: [
          "How much time do you spend? Half an hour. It's just that I already do it very quickly.",
          "He always guides me through their archive. But look what it was before payment for Ricardo.",
        ],
      },
      {
        category: "Operation",
        title: "Secondary warehouse 3 blocks away",
        detail:
          "Small space in the store; replenishment via WhatsApp with a neighboring bodega. Avoids canceling orders but generates two stocks and inventory confusion.",
        source: "Seller",
        quotes: [
          "It's literally six, five blocks away. You take the product.",
          "I use it there as a warehouse. Then you know that because of space I no longer have a regular tin. Oh, send him here and I'll take you.",
        ],
      },
      {
        category: "Operation",
        title: "Rain protocol",
        detail:
          "With hail they close; in heavy rain they pause the store when they accumulate 5-6 late orders. Local decision, without tools on the platform.",
        source: "Seller",
        quotes: [
          "When you already have a saturation of a quantity of orders of five or six orders that you already see that they can no longer be delivered and that they are delayed, that is when you do the most important thing.",
          "There is hail, that is, if there is hail, then it cannot rain, they do not escape strongly if it comes out.",
        ],
      },
      {
        category: "Operation",
        title: "Suporte via e-mail lento",
        detail:
          "For complaints, they prefer to call the customer directly instead of opening a CI ticket. Email chain is slower than direct resolution.",
        source: "Seller",
        quotes: [
          "I better call him, I look for the data and I call him faster, because I miss that communication in what the IC says.",
          "There he sends me the email, I reply to the email, he does the rest for me and it takes longer, I think.",
        ],
      },
      {
        category: "Infra",
        title: "Limited physical space restricts stock and ice",
        detail:
          "Very small store; There is nowhere to store ice. Impacts quality (hot product) and available mix.",
        source: "Seller",
        quotes: [
          "Here our space is very small.",
          "We arrive and open, then we start giving, and since the delivery person lives very close, when the order arrives we notify him of the order and it arrives soon afterwards.",
        ],
      },
      {
        category: "Infra",
        title: "Poor quality delivery bags",
        detail:
          "Plastic brooches break in 3-4 months; fabric wears out with rain and weight (10+ kg). Previous versions were better. Metallic brooches are suggested.",
        source: "Courier",
        quotes: [
          "The clasps must be metal and must not be plastic because compared to other applications it is not the same.",
          "This, this breaks. We've been here for a month, two months.",
          "When they are agglomerated we easily carry more than 5 kilos.",
        ],
      },
      {
        category: "Infra",
        title: "New computer due to poor audio on previous one",
        detail:
          "They changed PC because order alerts didn't sound. Operation depends on listening to notification in tight space.",
        source: "Seller",
        quotes: [
          "We just bought this computer because the other one we had could hardly be heard, I don't know why it always sounds here.",
        ],
      },
    ],
  },
  {
    id: "mixcoac",
    name: "Mixcoac",
    files: "Mixcoac 1.txt (seller+courier) + Mixcoac 2.txt + Mixcoac 3.txt (KPIs)",
    summary:
      "Largest volume of the group. Newest team on the platform. Code on delivery helped fulfillment. Same GPS/map bugs. Inventory and Saturday saturation are main pains.",
    highlights: [
      "In-app chat would reduce outreach — today 100% WhatsApp/calls",
      "GPS/map does not update distributor position in real time",
      "Saturdays: order does not arrive on the courier app without refresh or manual code",
      "Inventory without categories; search requires perfect name",
      "Complaints: late delivery and hot product (no space for ice)",
    ],
    insights: [
      {
        category: "Bug",
        title: "GPS does not show distributor moving",
        detail:
          "On the map, the distributor appears standing in the store even after leaving. You need to go back to the previous screen and re-enter. Same bug in the consumer app.",
        source: "Seller",
        quotes: [
          "You can't see when it's going, you have to pull it back.",
          "They don't visualize that, you don't see how it's going, you don't see it.",
          "The same thing happens with the consumer app. If you cannot, the consumer has to leave and return so you can see that it is updated.",
        ],
      },
      {
        category: "Bug",
        title: "Saturday saturation: order does not reach the courier",
        detail:
          "In high demand, the order remains pending on the distributor's app. Current solution: repeated refresh or manual ticket code. Sometimes the code also fails.",
        source: "Seller",
        quotes: [
          "On Saturdays with high demand that they can't get, the order doesn't arrive and they have to enter it manually, they have to give it the manual code so it can.",
          "The communication between SEL and the courier does not reach communication.",
        ],
      },
      {
        category: "Bug",
        title: "Courier app needs constant refresh",
        detail:
          "Distributor needs to update app to receive orders. It remains 'pending' even after assignment by the seller.",
        source: "Seller",
        quotes: [
          "It has to give refresh, refresh or in this one it has to give us like to give between fresh so that it can receive because it just says pending, pending.",
          "They want to assign the delivery girl just like they did, it doesn't arrive, it doesn't arrive.",
        ],
      },
      {
        category: "UX",
        title: "Seller-client and courier-client chat",
        detail:
          "Main request of the visit. It would reduce contact and speed up delivery. Today, personal WhatsApp or phone calls — customers do not answer unknown numbers.",
        source: "Seller + Courier",
        quotes: [
          "The chat is going to help us a lot.",
          "When we have the chat it will help us a lot to reduce contact, to have a more effective delivery.",
          "I think that both things would be good, WhatsApp is the personal one, the chat if we take it here from the application.",
        ],
      },
      {
        category: "UX",
        title: "Arrival notification does not alert consumer",
        detail:
          "Courier presses 'llegue' but consumer sees 'aun va a salir'. You need to call or go to WhatsApp. Push exists but it is too subtle.",
        source: "Courier",
        quotes: [
          "It's an illusion for him, he doesn't know. Yes, because many times when you are already there it says well the application appears to me.",
          "When I say I've arrived, it only shows I've arrived. I don't know if he gets an alert when I've arrived. I don't think it appears.",
        ],
      },
      {
        category: "UX",
        title: "Connection without app identification",
        detail:
          "Generic or personal number of the courier. Customer does not respond. Uber shows that and from the platform — they ask for the same.",
        source: "Courier",
        quotes: [
          "Many times it is because I do not answer unknown numbers.",
          "At Uber they know the number because it is already registered, that would help a lot.",
        ],
      },
      {
        category: "UX",
        title: "Select multiple orders for a distributor",
        detail:
          "Today: accept, attribute, accept again. They want to book 2 orders together and send them together. Peak time savings.",
        source: "Seller",
        quotes: [
          "Instead of entering one by one, you could select as many as two and send those two to them.",
          "I have to accept it again and send it again and he has to accept it again. It would be faster, above all.",
        ],
      },
      {
        category: "UX",
        title: "Inventory without categorization",
        detail:
          "List mixes beer, ice, snacks in no order. To find a product you need to know the exact name. They ask for filter by category or brand.",
        source: "Seller",
        quotes: [
          "When they want or we want to show them, especially when we are training, this is a list of as many pops as possible.",
          "If they write something wrong, it doesn't matter, it doesn't appear.",
          "We put soft drinks or chetos or everything else to see as above.",
        ],
      },
      {
        category: "UX",
        title: "Portfolio minimo vs catalogo completo",
        detail:
          "Two confusing screens: 'minimum portfolio inventory' shows few items; full catalog has 50+ pages. Makes training and search difficult.",
        source: "Seller",
        quotes: [
          "Here in minimum portfolio inventory, only certain products appear. And in another catalog there is already the entire list where everything is complete.",
          "They have to put in about 50 pages so they can manually view and move the rest and then they have to go back.",
        ],
      },
      {
        category: "UX",
        title: "KPIs: understand metrics and act",
        detail:
          "In the KPIs session (Mixcoac 3): they understood preparation time (target 5-6 min) and cancellation due to delay. Hot product and main rating complaint.",
        source: "Seller",
        quotes: [
          "This ultimately has to be about five, six minutes maximum.",
          "Most complaints are because we are delivering late, because the product is hot, so we always refill very quickly.",
        ],
      },
      {
        category: "Product",
        title: "Code on delivery worked",
        detail:
          "Since May, it has reduced 'never delivered to me' complaints by 0.5pp in fulfillment. Eliminates the practice of closing an order without delivering it.",
        source: "Seller",
        quotes: [
          "We implemented the cash on delivery code, it helped us a lot starting in May because we had complaints from consumers who said they never delivered to me, today we dropped 0.5% in fulfillment.",
        ],
      },
      {
        category: "Product",
        title: "Push 'estate atento' ajudou",
        detail:
          "Notification to the consumer when the distributor arrives has improved deliveries. But without penalty, the customer still takes a while to get off.",
        source: "Seller",
        quotes: [
          "The push to the consumer to pay attention, your delivery person has arrived, that has helped to make a more scientific delivery.",
          "It gives you visibility, you have a good track and it also vibrates you.",
        ],
      },
      {
        category: "Product",
        title: "Payment for cancelled orders (Monterrey)",
        detail:
          "In some cities they already pay the courier for cancellations. Not yet here — courier wastes time/gasoline when customer doesn't show up.",
        source: "Seller",
        quotes: [
          "Starting in the city of Monterrey itself, we are already paying for the canceled ones, but before we didn't pay for the canceled ones.",
          "Finally you already went, you return and you had no benefit.",
        ],
      },
      {
        category: "Product",
        title: "Cleanup of inactive SKUs",
        detail:
          "Many SKUs that do not sell remain in the catalog. It makes it difficult to turn products on/off and generates orders for unavailable items.",
        source: "Seller",
        quotes: [
          "You have many SKUs, they don't even sell. You have to do a cleaning.",
          "Tombs come out that only leave for two weeks and stay there forever.",
        ],
      },
      {
        category: "Operation",
        title: "Cancellations: customer does not answer or card fails",
        detail:
          "Main reasons on Saturday: customer doesn't come down, doesn't answer, or doesn't pass their card through the clip. Customer demands to close order only after payment.",
        source: "Seller",
        quotes: [
          "Well, because there are clients who do not answer or who do not pass the card.",
          "You don't want to give them the code until it closes, so you have to cancel.",
        ],
      },
      {
        category: "Operation",
        title: "Distributors do not always carry a terminal",
        detail:
          "Order says cash but customer wants card. Courier without clip generates waiting and delays. Saturday peak amplifies the problem.",
        source: "Seller",
        quotes: [
          "Even though it says cash, they don't always take it and then they have problems and that's when it's the most obvious, it's not that they don't give me the card.",
          "First, until they pass the card, they don't read it, I clip it, they don't want to close it.",
        ],
      },
      {
        category: "Operation",
        title: "Seller calls customer on behalf of courier",
        detail:
          "When the courier cannot contact you, the seller intervenes. Increases operational load during peak hours.",
        source: "Seller",
        quotes: [
          "They tell me or then they send me a message, they don't answer me and I already dial them, I'll do them the favor of dialing them.",
          "When no one answers either by WhatsApp or by call, then it's time to cancel.",
        ],
      },
      {
        category: "Infra",
        title: "No space for ice",
        detail:
          "They don't buy ice because there's nowhere to store it. Hot product complaints impact rating. Goal: refill water quickly.",
        source: "Seller",
        quotes: [
          "Right now we don't have it because we don't have anywhere to put them, we don't have a way.",
          "Most complaints are because we are delivering late, because the product is hot.",
        ],
      },
      {
        category: "Infra",
        title: "Small display, separate warehouse",
        detail:
          "TaDa CDMX store standard: small storefront + auxiliary bodega. Makes unified inventory control difficult.",
        source: "Seller",
        quotes: [
          "What he says is that this is like the ones on display and there is his warehouse.",
          "I use it there as a warehouse. What I'm getting at is that I can't keep much beer here.",
        ],
      },
    ],
  },
  {
    id: "los-alpes",
    name: "The Alps",
    files: "Los alpes.txt + Los alpes 2.txt (seller)",
    summary:
      "Mature store (~380 orders/week, 50% TADA + 50% floor). Operates with strong manual control (libreta, Excel, WhatsApp). Best KPIs of the group, but outdated inventory and limited reports.",
    highlights: [
      "Inventory with quantity and auto-decrement is priority #1",
      "Beer al tiempo option — lose sales and rating when it’s only cold",
      "KPIs in 7 days; Do you want a daily filter like the previous app?",
      "Order forecast in the app does not reflect parties, quincena and local demand",
      "Map: need time in orders and not expel from the screen when assigning",
      "Promotion push hours before parties to distribute demand",
    ],
    insights: [
      {
        category: "Bug",
        title: "Inventory pagination repeats products",
        detail: "When advancing pages, do not advance every 10; repeat items. Team reviews 183+ SKUs page by page manually.",
        source: "Seller",
        quotes: [
          "When we advance the page it does not advance us 10 at a time, so that is why it is 180, because we are really moving forward. I think it's like 6 in 6 more or less and even if I put it 50, even if I put it 50, it keeps repeating itself.",
        ],
      },
      {
        category: "Bug",
        title: "Assign order kicks out of map screen",
        detail: "When assigning a distributor, the system redirects to current orders. Seller wants to stay on the map to assign several and check products.",
        source: "Seller",
        quotes: [
          "When I assign an order from here it also takes me out and takes me to this one, to current orders, if I here before printing it appears that I choose to deliver, the delivery son and takes me out.",
          "The ideal is that it doesn't take us out, that it stays here on this screen.",
        ],
      },
      {
        category: "Bug",
        title: "Distributor's GPS takes time to update",
        detail: "Tracking works sometimes, but it takes time. Experienced staff do not monitor as much as they know the area.",
        source: "Seller",
        quotes: [
          "Then if it takes a while to update or I think it affects them then they already know what the location is, there are already a lot of customers who are already frequent, so what they do is they no longer open the map as such.",
        ],
      },
      {
        category: "UX",
        title: "KPIs in 7 days — want daily filter",
        detail: "Before, you could see performance from previous days to manage the team. Today you lose last week's history if you didn't write it down.",
        source: "Seller",
        quotes: [
          "I miss that part because this is the last 7 days and that's it, so for example, I already changed Tuesday, Wednesday and I no longer know what my average was for the previous week. If I didn't check it, I didn't even know where I was.",
          "To show the kids no, no, no, again you affected me because you didn't come and look that week look how we went out.",
        ],
      },
      {
        category: "UX",
        title: "Order forecasting is not real – team scale in the eye",
        detail:
          "Seller ignores the platform number and creates his own forecast (parties, quincena, local teams). App does not help you decide how many distributors to place on shift.",
        source: "Seller",
        quotes: [
          "We already have a forecast that I calculate is more realistic, that is, I know when there is a game, I know when there is a fortnight and I know that it doesn't give me a real number here, it doesn't work for me.",
          "Depending on your position, you have the possibility of receiving more orders, so it also helps me to know how many delivery people work or how to improve that number.",
        ],
      },
      {
        category: "UX",
        title: "Inventory: available filter + popularity",
        detail: "You first want to see products turned on/off and those that sell the most, like in the Modelo app. Current list mixes everything up.",
        source: "Seller",
        quotes: [
          "In this case it is convenient for us that it be like this, that is, that those that are available to order appear first, so that those that are not available are of no use to us.",
          "A double filter that shows us products that are not on because this way we can review them faster.",
        ],
      },
      {
        category: "UX",
        title: "Map with time visible in orders",
        detail: "Color bar does not distinguish priority (42 min vs 35 min both red). Want to see minutes or map+orders together.",
        source: "Seller",
        quotes: [
          "I have one of 42 minutes, for example, I have one of 42 minutes and a 35 minute one appears in red, so I no longer know which one really has priority.",
          "If I had a little circle here and said 15 minutes like that, it would help us a lot.",
        ],
      },
      {
        category: "UX",
        title: "WhatsApp to save order data",
        detail: "Instructions disappear after completing the order. Copy request to WhatsApp to maintain contact and conference with floor.",
        source: "Seller",
        quotes: [
          "When you have already closed the order, the instructions do not appear in the order list, so that is why we have it or we can no longer have contact. This way we keep the contact, if there is any problem with the order, we already have it more at hand.",
        ],
      },
      {
        category: "UX",
        title: "In-app chat",
        detail: "Same need as other stores — replacing personal WhatsApp for customers and distributors.",
        source: "Seller",
        quotes: [
          "Since when I had already thought about it, that we could write to the customer through the application and we could have a chat with the delivery person.",
        ],
      },
      {
        category: "Product",
        title: "Quantity field in inventory",
        detail: "Inventory shows 4M fake parts. Sells TADA + flooring but does not discount. Need for taxes and royal control.",
        source: "Seller",
        quotes: [
          "Very, very much, it would be unified with the stores in the store.",
          "He's going to tell me that I have like three thousand or so pieces, when really it's not more.",
          "The correct thing for me would be a link, if that is not possible, at least have a report, that is, a daily sales report appears.",
        ],
      },
      {
        category: "Product",
        title: "Beer at room temperature (not just cold)",
        detail: "They lose sales and rating when they end up cold but at room temperature. I criticize on party days.",
        source: "Seller",
        quotes: [
          "It seems stupid to me, I'm even going to say it as it is, the rudeness, stupid. It seems stupid to me not to have it because if you lose a lot.",
          "We only have the time you would have had it on, we don't have it because we have it, because most people complain that I didn't send it cold.",
        ],
      },
      {
        category: "Product",
        title: "Promotion push before matches",
        detail: "Saturation in games (orders of 5 in 5). Want to notify the consumer to order 2-4 hours in advance and distribute demand.",
        source: "Seller",
        quotes: [
          "The game starts at 7. Take advantage of your promotions... you have up to two hours before to order and have the promotion.",
          "Then it is impossible, that is, really before the game, not during it, it would even be better, that is, even for profits, because at game time everyone will ask you.",
        ],
      },
      {
        category: "Product",
        title: "Sales report by product (not Top 10)",
        detail: "You need to know how many pieces of each SKU you sold to invoice taxes (VAT vs IEPS). Top 10 won't do.",
        source: "Seller",
        quotes: [
          "A top ten doesn't help me, it would help me how much of each product was sold, how much I sold yesterday.",
          "In order to invoice, I need to know how much product was produced, because for example, beer has VAT, but snacks have IEPS, which are two different taxes.",
        ],
      },
      {
        category: "Product",
        title: "Products sold in other stores in the area",
        detail: "Want to benchmark disconnected SKUs that sell in neighbors — mix opportunity (e.g. Topo Chico, New Mix).",
        source: "Seller",
        quotes: [
          "What products are other branches selling that I don't have on as an opportunity.",
          "We just added the Topo Chico pigeon that we didn't have because clients started asking me.",
        ],
      },
      {
        category: "Operation",
        title: "Manual payment tracking (notebook)",
        detail: "Weekends with 6-7 people on the floor. They charge order by order in a notebook, they do not use the app's financial report.",
        source: "Seller",
        quotes: [
          "We carry out a manual control, let's say, instead of keeping the control that you charge at the end, we charge them every time you return.",
          "We write down the quantity 284. And the number of containers.",
        ],
      },
      {
        category: "Operation",
        title: "Financial reconciliation by trust",
        detail: "Trust payment without auditing order by order. Want to degloss in financial for random spot-check.",
        source: "Seller",
        quotes: [
          "I trust them. It's not that it's true, I told Luis since I came in, I told him I don't see, that is, how am I going to check.",
          "Order by order, Yes, because for example, there I can check if the order number appears.",
        ],
      },
      {
        category: "Operation",
        title: "Refund without customer phone in email",
        detail: "When CI sends a refund without a number, it searches WhatsApp for codes. Fragile manual process.",
        source: "Seller",
        quotes: [
          "The client's telephone number does not appear here, it is not the first time that it has happened to me that the client's telephone number does not appear.",
          "I looked for it on WhatsApp where we keep the codes like this.",
        ],
      },
      {
        category: "Infra",
        title: "Hidden store / poor visibility",
        detail: "New customers don't find the store. Trees block facade.",
        source: "Seller",
        quotes: [
          "We are half hidden. Yes, I didn't see it here. He followed me, I turned him around, I never saw him.",
          "Clients came and told us they are new. Not us, we already have a year. I just hadn't seen them.",
        ],
      },
      {
        category: "Infra",
        title: "Physical space and refrigeration",
        detail: "50% floor sales + TADA. They use extra fridges on weekends. No stored ice.",
        source: "Seller",
        quotes: [
          "Andamos como 50 y 50. 50% tada, 50% venta, entonces llega a ser muy fuerte.",
          "We have coca in the refrigerators in Penafiel, we have beer there because there is a lot of demand, we even have that other refrigerator that we use on weekends.",
        ],
      },
    ],
  },
  {
    id: "churubusco",
    name: "Churubusco",
    files: "Churubusco.txt (seller Marco) + Churubusco 2.txt (courier Lenin)",
    summary:
      "Seller manages 2 stores (Churubusco + Caporal). ~250-300 orders/week. Overlapping is the biggest pain. Still uses Telegram to route orders. Courier Lenin and reference (110 orders/day).",
    highlights: [
      "Overlapping sends order to wrong store — seller compares 2 stores side by side",
      "KPIs in 7 days; Want to filter by day like in the previous app",
      "Prognosis promises 15 orders; yesterday they did 6 — does not coincide with overlap",
      "Telegram still used to distribute orders and routes",
      "Store pin disappeared from the map",
      "Courier app freezes and needs reinstall",
    ],
    insights: [
      {
        category: "Bug",
        title: "Consumer does not see products (overlap/stock)",
        detail: "Customer reported that he did not see Victoria despite the store having stock on. Affects requests and rejections.",
        source: "Seller",
        quotes: [
          "A client reported to me that no products appeared. I told him, hey, how come he doesn't show up? You have no victory. Tell me, of course, if I have it.",
          "How are orders going to arrive on overlapiz and are rejections canceled if my clients don't see the products?",
        ],
      },
      {
        category: "Bug",
        title: "Store pin disappeared from the map",
        detail: "Before, the store's little house appeared on the map; not now. It makes routing and understanding overlapping difficult.",
        source: "Seller",
        quotes: [
          "The location of the store no longer appears. Be careful there. It doesn't seem like it. It doesn't seem like it. That's from my observations of no store.",
          "Yesterday I took them out because the store pin is not showing up.",
        ],
      },
      {
        category: "Bug",
        title: "Courier app freezes — needs reinstall",
        detail: "Some distributors lose orders when the app freezes. It happens more in saturation.",
        source: "Seller",
        quotes: [
          "She is shocked and they have to uninstall and reinstall and then she grabs your orders with a good one and has to uninstall.",
          "That order was already burned and I had already had two and both orders were already burned.",
        ],
      },
      {
        category: "Bug",
        title: "Date filter in financial report",
        detail: "Request for the 18th only appears if you filter 18-19, not on the 18th alone. Breaks conference with distributor.",
        source: "Seller",
        quotes: [
          "It should be that it appears here on the 18th, It should be that it appear here, do you agree? In the last order and it does not appear.",
          "If you look for it, the mere 18 does not appear, that is, if you look for it, the mere 18 does not appear.",
        ],
      },
      {
        category: "UX",
        title: "KPIs with filter by day (not just 7 days)",
        detail: "Want to see how it turned out yesterday to give feedback to the team. Same pain as Bahia/Los Alpes.",
        source: "Seller",
        quotes: [
          "It would be great if you could filter for a day, two days to check that.",
          "Oh look guys, yesterday Lenin you burned three orders or we'll go out to 90.",
        ],
      },
      {
        category: "UX",
        title: "Order forecast does not match the operation",
        detail:
          "Seller with 2 stores compares forecast with real volume. I expected 15 orders on the day; the day before they did 6. I suspect the number because of overlapping — orders go to the other store.",
        source: "Seller",
        quotes: [
          "This forecast for today works as it is today, orders expected for today the 15th is the same, so it coincides. For example, yesterday we placed six orders.",
          "What I told you at the beginning, that the information is true, because then it doesn't match what they send me.",
          "It depends a lot what I want to have is the overlap, because I give myself a lot, I am very emphatic with that because I realize it, because I have the other store.",
        ],
      },
      {
        category: "UX",
        title: "Map + orders on the same screen",
        detail: "Seller routes via the map but needs to copy orders to Telegram. You want to assign without leaving the map.",
        source: "Seller",
        quotes: [
          "Bring everyone closer, how do you do it? When several arrive, I accept all and I see the map to see where they are going and how to route.",
          "It would be good. And where is it? That's just another observation I had.",
        ],
      },
      {
        category: "UX",
        title: "Telegram still used for orders",
        detail: "Distributors used to Telegram for codes and routes. App does not completely replace it.",
        source: "Seller",
        quotes: [
          "I copy what I do and send it to you via Telegram, because that's how we get used to it, before we didn't have that option to send it there.",
          "I know how I send them to them and I continue to send them to them by telegram, the order.",
        ],
      },
      {
        category: "UX",
        title: "Multi-select orders with route order",
        detail: "You want to send 2-3 orders at once, but the seller still needs to advise which one goes first.",
        source: "Seller",
        quotes: [
          "Select the orders, be able to directly send two, three, but with a single movement.",
          "Then you have to tell him which one goes first or how the route looks.",
        ],
      },
      {
        category: "UX",
        title: "Export financial report to Excel",
        detail: "Today you copy and paste manually. Want to download to control payments to distributors.",
        source: "Seller",
        quotes: [
          "What would also be cool would be if we could download it in some format in Excel.",
          "What I have to do right now is that I go, I check it and I copy and paste it.",
        ],
      },
      {
        category: "UX",
        title: "In-app chat (seller + courier)",
        detail: "Lenin confirms that chat would help, especially with outdated numbers.",
        source: "Courier",
        quotes: [
          "Yes, it would help us, but there are also times when, for example, the client has the application but their number is no longer the same.",
        ],
      },
      {
        category: "Product",
        title: "Overlapping uses a 3-hour window",
        detail: "Seller thought it was 1am. Algorithm penalizes stores that delivered 3 hours late, even with stock and distributors.",
        source: "Seller",
        quotes: [
          "I knew it was an hour, so well, it's three hours, so what we've got back is from three hours ago.",
          "Leveling those three hours is a lot of time to play with.",
        ],
      },
      {
        category: "Product",
        title: "Reassign order after courier starts",
        detail: "When the order arrives, send the courier to load it and insert it. Prefer to reassign as in Tucan.",
        source: "Seller",
        quotes: [
          "I send the order and say enter it there. Because that's what I told Javi that they were going to see that option that we could reassign the order after they left.",
          "I'd rather be hit on this, in Akurashi than hit on this, on delivery time.",
        ],
      },
      {
        category: "Product",
        title: "Quantity field in inventory",
        detail: "Before they had piezas; today they delete the entire SKU. Want fine control for low rotation products.",
        source: "Seller",
        quotes: [
          "Before we could put the pieces in, now that it's happening, maybe I'll have a brass ultra tray left, I won't pay for it. But do you think it turns out that the customer asked you for 25 cans.",
          "It would be good to put exactly the amount as we used to before.",
        ],
      },
      {
        category: "Product",
        title: "Consumer blocked while gaming",
        detail: "Customers were unable to order in the World Cup semi-final. Some created a new account and lost points.",
        source: "Seller",
        quotes: [
          "He didn't let them be requested during World Cup matches, telling them that he had no data, that they had no signal.",
          "What others did was cancel, they registered another account because they couldn't.",
        ],
      },
      {
        category: "Product",
        title: "Confirm payment method after delivery",
        detail: "Customer changes card for non-local cash. Courier does not remember; wrong terminal.",
        source: "Seller",
        quotes: [
          "The customer put a card, he gets there and it appears past me because I went to deliver, they put a card and you don't have change because it's a card.",
          "Al final del dia del cuadraje, oye, me falta efectivo, me sobra efectivo ese cambio.",
        ],
      },
      {
        category: "Operation",
        title: "Manage 2 stores manually",
        detail: "Redirects orders and distributors between Churubusco and Caporal to avoid SLA failure.",
        source: "Seller",
        quotes: [
          "I from Churubusco to here make the orders that they receive here, because they receive orders here, here, here, Caporales here.",
          "If I am saturated in a store, I send a delivery person there. Here you have the other store.",
        ],
      },
      {
        category: "Operation",
        title: "Modelorama promotional price difference",
        detail: "Buy high, promotion pays low. Hard to audit if margin is recovered.",
        source: "Seller",
        quotes: [
          "Last month I grabbed and jammed the warehouse with an expensive price and in the middle of the month they launched the lowest promotion.",
          "I buy expensive. They tell me, hey, we are paying with the new price. Then he tells me, no, yes, but in the end you stay.",
        ],
      },
      {
        category: "Operation",
        title: "Cancellations due to outdated phone",
        detail: "6-7 cancellations/week due to not being able to contact. Wrong numbers in the base.",
        source: "Seller + Courier",
        quotes: [
          "If we get to have an easy one, about six, seven a week that I can't communicate with.",
          "The client has the application but his number is no longer the same, the number already changes but not only by updating the application.",
        ],
      },
      {
        category: "Infra",
        title: "Consumer GPS does not update (courier)",
        detail: "Customers see a distributor standing in the store. They need to exit and return to the app.",
        source: "Courier",
        quotes: [
          "Many times our tracking does not appear, that is, the customer also sees that a little map appears where he sees that if we leave the store, he says that many times it does not appear to him.",
          "I get back in and he appears in the store again and suddenly I'm there.",
        ],
      },
      {
        category: "Infra",
        title: "Backpacks and heavy load",
        detail: "Heavy orders (16 caguamas + 8 cans). Backpacks break; box project in progress.",
        source: "Courier",
        quotes: [
          "The backpacks don't hold much weight, we have to have them reinforced and everything.",
          "In two orders you are already full to the tank and maybe you still have one closer.",
        ],
      },
      {
        category: "Infra",
        title: "Climbing stairs vs customer experience",
        detail: "Debate: commercial wants them to go up; courier says that with heavy load it is impossible. Push to notify resident.",
        source: "Courier",
        quotes: [
          "There are times when we bring a carton in the tank and the same client asked for 16 loggerheads and 8 cans, because there is no way for one to go up.",
          "A notification would be good, a push to say hey, if you're in a low department or something subtle.",
        ],
      },
    ],
  },

];

type CrossStorePriority = "Critical" | "High" | "Medium";

type CrossStoreTheme = {
  priority: CrossStorePriority;
  title: string;
  summary: string;
  stores: string[];
  category: InsightCategory;
  attention: string;
  quotes: string[];
};

const CROSS_STORE_THEMES: CrossStoreTheme[] = [
  {
    priority: "Critical",
    title: "GPS and distributor tracking do not update in real time",
    summary:
      "The distributor's pin remains stationary in the store until the user leaves and returns to the screen. Consumer complains; seller loses visibility. When the delivery returns, the tracking disappears.",
    stores: ["Bahia", "Mixcoac", "The Alps", "Churubusco"],
    category: "Bug",
    attention:
      "Appears in 4 stores (seller + courier). Impacts SLA 35, rating and complaints of 'I don't know where the order is'.",
    quotes: [
      "Almost 80 of the clients tell us. (Bay)",
      "Many times our tracking does not appear... the customer sees that a little map appears where they see that we do leave the store. (Churubusco)",
      "Then if it takes time to update... they no longer open the map as such. (Los Alpes)",
    ],
  },
  {
    priority: "Critical",
    title: "Inventory without actual quantity — group priority #1",
    summary:
      "SKU on/off does not reflect actual stock. Inflated numbers (thousands of fake pieces). No auto-decrement on TADA + floor sale. Manual review page by page.",
    stores: ["Bahia", "Mixcoac", "The Alps", "Churubusco"],
    category: "Product",
    attention:
      "Unanimous in all 4 stores. Los Alpes calls it 'top priority'. It affects fill rate, stockout and seller confidence in the system.",
    quotes: [
      "Very, very much, it would be unified with the stores in the store. (The Alps)",
      "He's going to tell me that I have like three thousand or so pieces, when really it's not more. (The Alps)",
      "Inventory without categories; want quantity field with auto-decrement. (Bahia)",
    ],
  },
  {
    priority: "Critical",
    title: "In-app chat — today 100% WhatsApp and personal calls",
    summary:
      "Seller, courier and customer talk to each other outside the platform. No history, no tracking, operational risk. They ask for chat in the context of the order (Rappi/Uber style).",
    stores: ["Bahia", "Mixcoac", "The Alps", "Churubusco"],
    category: "UX",
    attention:
      "4/4 stores. Universal workaround. Resolves post-delivery contact, ordering instructions and coordination at peak.",
    quotes: [
      "Since when I had already thought about it, that I could write to the client through the application. (Bay)",
      "In-app chat would reduce outreach — today 100% WhatsApp/calls. (Mixcoac)",
      "90% I have to call them on the phone to let them know that I have arrived. (Bahia — courier)",
    ],
  },
  {
    priority: "High",
    title: "Overlapping sends orders to the wrong store or hides products",
    summary:
      "Nearby customer receives order from distant store. Products in stock do not appear in the app. Seller with 2 stores compares side by side to understand the routing.",
    stores: ["Bahia", "Churubusco", "Mixcoac"],
    category: "Product",
    attention:
      "Explicit pain in Bahia and Churubusco; Mixcoac cites unstable polygon. Generates cancellations, bad SLA and direct customer complaints.",
    quotes: [
      "Hey, if you're here around the corner, why don't you bring me? They have to wait for me 35 minutes. (Churubusco)",
      "Overlapping sends the order to a distant store when there is a nearby store with stock. (Bahia)",
      "How are orders going to arrive on overlapiz and are rejections canceled if my clients don't see the products? (Churubusco)",
    ],
  },
  {
    priority: "High",
    title: "KPIs in a 7-day window — without daily team management",
    summary:
      "Seller doesn't look at yesterday's performance to charge the team today. You lose history if you didn't write it down. Previous app allowed filter by day.",
    stores: ["Bahia", "Mixcoac", "The Alps", "Churubusco"],
    category: "UX",
    attention:
      "4/4 stores ask for a daily filter. Performance dashboard is also not very intuitive (ranking, metrics).",
    quotes: [
      "They can't see how day by day, how today they watered it. (Bay)",
      "I miss that part because this one goes away for the last 7 days and that's it. (The Alps)",
      "KPIs in 7 days; You want to filter by day like in the previous app. (Churubusco)",
    ],
  },
  {
    priority: "High",
    title: "Forecast of orders for the day does not match reality",
    summary:
      "Tela promises volume for the day (preparation time / expected orders), but sellers say it inflates or misses. Bahia documented it with captures: it scored 30, 7 arrived. Los Alpes ignores the number and chooses a team by eye (parties, quincena). Churubusco saw 15 expected vs 6 real — overlapping distorts even more.",
    stores: ["Bahia", "The Alps", "Churubusco"],
    category: "UX",
    attention:
      "3/4 stores with explicit pain. Prevents staffing, preparation and trust in the dashboard. Mixcoac did not mention the prognosis directly.",
    quotes: [
      "It marked 30 and 7 arrived, so it has never been exact. (Bay)",
      "I know that it doesn't give me a real number here, it doesn't work for me. (The Alps)",
      "Orders expected for today the 15th... yesterday we placed six orders. (Churubusco)",
    ],
  },
  {
    priority: "High",
    title: "Operations map: weak UX and assignment flow bugs",
    summary:
      "Orders with no visible time (42 min = 35 min, both red). Assign distributor expelled from the map screen. Store pin disappeared. They request map + kanban on the same screen.",
    stores: ["Bahia", "The Alps", "Churubusco", "Mixcoac"],
    category: "UX",
    attention:
      "Map and the most used screen on the peak. Navigation bugs and lack of visual priority delay distribution.",
    quotes: [
      "The ideal is that it doesn't take us out, that it stays here on this screen. (The Alps)",
      "The little store location no longer appears. (Churubusco)",
      "Then since everyone is red... some differentiation to know which ones are left. (Bay)",
    ],
  },
  {
    priority: "High",
    title: "Distribution of orders to the courier fails at peak",
    summary:
      "Order does not arrive in the app without manual refresh or ticket code. App crashes and needs to be reinstalled. Saturdays are critical.",
    stores: ["Bahia", "Mixcoac", "Churubusco"],
    category: "Bug",
    attention:
      "Direct bottleneck at TML 10 and SLA 35 on weekends. Churubusco still uses Telegram for routing.",
    quotes: [
      "At first when I changed this application a lot, they didn't reach you. (Bay)",
      "Saturdays: order does not arrive on the courier app without refresh or manual code. (Mixcoac)",
      "Telegram still used to distribute orders and routes. (Churubusco)",
    ],
  },
  {
    priority: "Medium",
    title: "Inventory without filters, categories or useful search",
    summary:
      "Huge list in no logical order. Search requires exact name. They want to filter by availability, brand and best-selling products.",
    stores: ["Bahia", "Mixcoac", "The Alps", "Churubusco"],
    category: "UX",
    attention:
      "It complements the quantity problem. Los Alpes manually reviews 183+ SKUs; pagination repeats items.",
    quotes: [
      "When we advance the page it does not advance us 10 at a time... they keep repeating themselves. (The Alps)",
      "Inventory without categories; search requires perfect name. (Mixcoac)",
    ],
  },
  {
    priority: "Medium",
    title: "Reports and reconciliation still manual (Excel, notebook)",
    summary:
      "Payments to couriers, sales by product for taxes and refunds are output in parallel spreadsheets. Date filter in the financial report with a bug.",
    stores: ["Bahia", "The Alps", "Churubusco"],
    category: "Operation",
    attention:
      "Signal that the platform does not match the operational cycle. Los Alpes uses notebook + daily Excel.",
    quotes: [
      "Strong manual operations (payment Excel, WhatsApp). (Bahia)",
      "Operates with strong manual control (libreta, Excel, WhatsApp). (Los Alpes)",
    ],
  },
  {
    priority: "Medium",
    title: "Beer at room temperature and warm product — lost sales and rating",
    summary:
      "Only cold beer on the app when they also sell it at room temperature. Without ice/space, product arrives hot and generates complaints.",
    stores: ["The Alps", "Mixcoac", "Bahia"],
    category: "Product",
    attention:
      "Local mix/catalog theme. Los Alpes loses sales on party days; Mixcoac and Bahia cite temperature complaints.",
    quotes: [
      "It seems silly to me not to have it because you lose a lot. (The Alps)",
      "Complaints: late delivery and hot product (no space for ice). (Mixcoac)",
    ],
  },
];

const PRIORITY_ORDER: CrossStorePriority[] = ["Critical", "High", "Medium"];

const PRIORITY_LABELS: Record<CrossStorePriority, string> = {
  Critical: "Critical attention — all or almost all stores",
  High: "High priority — strong pattern",
  Medium: "Medium — recurring with local impact",
};

function priorityTone(p: CrossStorePriority): "warning" | "info" | "neutral" {
  if (p === "Critical") return "warning";
  if (p === "High") return "info";
  return "neutral";
}

function CrossStoreThemeCard({ theme }: { theme: CrossStoreTheme }) {
  return (
    <Card>
      <CardHeader
        trailing={
          <Pill tone={priorityTone(theme.priority)} size="sm">
            {theme.priority}
          </Pill>
        }
      >
        {theme.title}
      </CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Row gap={6} wrap>
            {theme.stores.map((s) => (
              <Pill tone="neutral" size="sm">{s}</Pill>
            ))}
          </Row>
          <Text size="small">{theme.summary}</Text>
          <Callout tone="neutral" title="Why it deserves attention">
            {theme.attention}
          </Callout>
          {theme.quotes.length > 0 && (
            <Stack gap={4}>
              <Text weight="semibold" size="small">Representative quotes</Text>
              {theme.quotes.map((q) => (
                <Text size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

function getUniversalBugs(selectedStore: string): CrossStoreTheme[] {
  const storeName =
    selectedStore === "all"
      ? null
      : INTERVIEW_INSIGHTS.find((s) => s.id === selectedStore)?.name;

  return CROSS_STORE_THEMES.filter(
    (t) =>
      t.category === "Bug" &&
      t.stores.length === INTERVIEW_INSIGHTS.length &&
      (selectedStore === "all" || (storeName != null && t.stores.includes(storeName))),
  );
}

function UniversalBugsSection({ selectedStore }: { selectedStore: string }) {
  const universal = getUniversalBugs(selectedStore);

  if (universal.length === 0) return null;

  return (
    <Stack gap={12}>
      <Stack gap={4}>
        <H3 style={{ margin: 0 }}>Bugs across all stores</H3>
        <Text size="small" tone="secondary">
          Patterns reported across all 4 visited stores — highest portfolio priority.
        </Text>
      </Stack>
      {universal.map((theme) => (
        <CrossStoreThemeCard theme={theme} />
      ))}
    </Stack>
  );
}

function CrossStoreInsightsBlock() {
  return (
    <Stack gap={16} style={{ paddingTop: 8 }}>
      <Callout tone="warning" title="Cross-reading — 4 stores, 88 insights">
        The same themes recur in Bahia, Mixcoac, Los Alpes and Churubusco. These are not isolated cases: GPS, inventory with quantity, and in-app chat appear everywhere. Overlapping and order distribution concentrate operational pain. 7-day KPIs prevent daily management in all seller interviews.
      </Callout>

      <Table
        headers={["Priority", "Theme", "Stores", "Category"]}
        rows={CROSS_STORE_THEMES.map((t) => [
          <Pill tone={priorityTone(t.priority)} size="sm">{t.priority}</Pill>,
          t.title,
          t.stores.join(", "),
          t.category,
        ])}
        columnAlign={["center", "left", "left", "center"]}
        striped
      />

      {PRIORITY_ORDER.map((prio) => {
        const themes = CROSS_STORE_THEMES.filter((t) => t.priority === prio);
        if (themes.length === 0) return null;
        return (
          <Stack gap={10}>
            <Row gap={8} align="center">
              <H3 style={{ margin: 0 }}>{PRIORITY_LABELS[prio]}</H3>
              <Pill tone={priorityTone(prio)} size="sm">{themes.length}</Pill>
            </Row>
            {themes.map((theme) => (
              <CrossStoreThemeCard theme={theme} />
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
}

function categoryTone(cat: InsightCategory): "warning" | "success" | "neutral" | "info" {
  if (cat === "Bug") return "warning";
  if (cat === "UX") return "info";
  if (cat === "Product") return "success";
  return "neutral";
}

function InterviewPhotoGallery({
  storeId,
  compact,
}: {
  storeId: string;
  compact?: boolean;
}) {
  const photos = STORE_PHOTOS[storeId]?.filter((p) => !p.src.includes("IMAGE_REMOVED"));
  if (!photos?.length) return null;

  const columns = compact ? Math.min(photos.length, 4) : photos.length >= 3 ? 3 : photos.length;
  const imgHeight = compact ? 88 : 160;

  return (
    <Stack gap={8}>
      <Text weight="semibold" size="small">
        {compact ? "Evidence (store photos)" : "Photos from the visit"}
      </Text>
      <Grid columns={columns} gap={10}>
        {photos.map((photo) => (
          <Stack gap={4}>
            <div
              style={{
                padding: 0,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--bg-elevated)",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                style={{ display: "block", width: "100%", height: imgHeight, objectFit: "cover" }}
              />
            </div>
            <Text size="small" tone="secondary">{photo.caption}</Text>
          </Stack>
        ))}
      </Grid>
      {!compact && (
        <Text size="small" tone="tertiary">Click the photo to open full size.</Text>
      )}
    </Stack>
  );
}

function InterviewInsightBlock({ store }: { store: StoreInterview }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: store.insights.filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <Stack gap={12} style={{ paddingTop: 8 }}>
      <Text size="small" tone="secondary">
        Source: {store.files}
      </Text>
      <Callout tone="neutral" title="Summary">
        {store.summary}
      </Callout>
      <InterviewPhotoGallery storeId={store.id} />
      <Stack gap={6}>
        <Text weight="semibold" size="small">Main comments</Text>
        {store.highlights.map((h) => (
          <Text size="small">• {h}</Text>
        ))}
      </Stack>
      {grouped.map((group) => (
        <Stack gap={8}>
          <Row gap={8} align="center">
            <H3 style={{ margin: 0 }}>{CATEGORY_LABELS[group.category]}</H3>
            <Pill tone={categoryTone(group.category)} size="sm">
              {group.items.length}
            </Pill>
          </Row>
          {group.items.map((item) => (
            <Card>
              <CardBody>
                <Stack gap={4}>
                  <Row gap={8} align="center">
                    <Text weight="semibold" size="small">{item.title}</Text>
                    <Pill tone="neutral" size="sm">{item.source}</Pill>
                  </Row>
                  <Text size="small" tone="secondary">{item.detail}</Text>
                  {item.quotes.length > 0 && (
                    <Stack gap={4} style={{ marginTop: 4 }}>
                      {item.quotes.map((q) => (
                        <Text size="small" style={{ fontStyle: 'italic' }}>
                          "{q}"
                        </Text>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

type MeetingTopic = {
  title: string;
  detail: string;
  quotes: string[];
};

const CX_MEETING = {
  date: "22/07/2026",
  location: "St Isidro Suites — CDMX",
  participants:
    "Product team (Vivian, Canelas) + CX leadership + Diego (new CX-only PM)",
  context:
    "The day before, Arturo and Caro visited 5 stores; product was in 2 stores (Bahia, Mixcoac, Los Alpes, Churubusco). Objective: map CX opportunities with what we saw in the field and align priorities with Diego. Tomorrow (23/07) would be the OPS dynamics for planning 2027.",
  topics: [
    {
      title: "Zendesk + TADA Viewer: mirror without data retention",
      detail:
        "Agents do not have Loadmin. Integration with Beast created the TADA Viewer (copy of the 360 ​​view), but Zendesk does not retain fields — it is only a visual mirror. Agent fills in manually. There is a lack of CRM with lifecycle segmentation: new customers and frequent customers receive the same service.",
      quotes: [
        "Zendesk does not retain these fields. Right now everything is manual. The agent fills everything manually.",
        "A customer who buys more from us should be served better, they should have a specific process. Right now we don't know who is who.",
        "The bot currently does not retain data... the name, the city, what order you place.",
      ],
    },
    {
      title: "Incomplete/wrong order — seller vs consumer dispute",
      detail:
        "Frequent reason for contact. CX asks for a photo, but it is not possible to validate what was missing. Scale email to store with order number, customer and product; Waiting for confirmation from the seller. If they don't respond within 2 days (before SLA 5), they offer a coupon. Inventory without quantity in stores makes things worse: seller doesn’t know if the product has been shipped.",
      quotes: [
        "I can receive two cokes, I'll move this over here. There is no way to validate what was missing.",
        "Another consumer says I missed it. Seller says I gave it to him. What are we going to trust?",
        "After two days... we offer a coupon for compensation.",
      ],
    },
    {
      title: "Late order = display problem (validated in store)",
      detail:
        "Main volume of late tickets. Distributor can operate without internet; consumer map does not follow reality. During the visit: pin stopped at the store with courier already on the way. CX does not know how many distributors are offline. No notification of arrival to the consumer.",
      quotes: [
        "Consumer maps do not equal reality. There we were in the store, Locur was gone 15 minutes ago and Gomapa was in the store.",
        "We have no notification of it happening, it reached the clients, we do nothing for the clients.",
        "I don't think that where is my order? It's a real problem. It's a display problem.",
      ],
    },
    {
      title: "Seller-consumer chat: not open chat in Mexico",
      detail:
        "Chat with pre-printed messages (alert center), no free field — labor restrictions in Mexico. Goal: reduce ~40% of the volume of tickets that are currently coordinating delivery. Seller takes that part; CX becomes more technical (platform, Jira).",
      quotes: [
        "Here in Mexico we cannot have a direct chat between consumer and customer... It is an alert center with an imprinted message. There is no open field to type anything.",
        "It would reduce around 40% of the volume of tickets that we receive. And the seller begins to assume that.",
        "Now we have to become more technical for problems as a product, with the platform and everything else.",
      ],
    },
    {
      title: "Fast resolution vs investigation (iFood/Didi reference)",
      detail:
        "Brazil (iFood): bot offers immediate partial coupon for missing item. Didi/Mercado Libre: photo upon delivery or consumer selects which item was missing in the app. Today TaDa asks what was missing without validation — dispute between the three sides.",
      quotes: [
        "When you manage any problem with your order, it would be a bot that offers you a smaller amount... as a quick resolution proposal.",
        "Within the platform you can select which product you were missing... That currently does not exist either.",
        "We always dispute between the three of us. The three between seller and courier against consumer.",
      ],
    },
    {
      title: "Other topics: order exchange, security, moderation",
      detail:
        "Product replacement (consumer changes their mind on the order) and a separate, more complex case. You can't blindly trust sellers or consumers. CX also deals with insults, dangerous neighborhoods (cannot force courier) — no 15 min SLA to prioritize risk.",
      quotes: [
        "It's like I made an order, I changed my mind. I don't want twelve crowns, I want fourteen.",
        "We cannot trust the OK sellers and the consumer. We have to make any experience for everyone.",
        "The house is a very dangerous neighborhood, but the AL cannot force delivery girls, how do we do it?",
      ],
    },
  ] as MeetingTopic[],
  connectsToStores: [
    "GPS/map does not update - confirmed by CX as cause of delay tickets (4/4 stores)",
    "Inventory without quantity — prevents validating incomplete orders in disputes",
    "In-app chat — sellers already ask for it; CX validates pre-defined message model in MX",
    "Code against delivery — Mixcoac/Bahia cites reduction in complaints; CX still disputes payment",
  ],
  nextSteps: [
    "Diego (PM CX) as focal point with product",
    "Evolve Zendesk for data retention + CRM/segmentation",
    "Pilot pre-defined seller-customer messages and measure impact on tickets",
    "Explore fast-resolution flow (partial coupon) and missing-item selection",
    "OPS workshop (Jul 23) to prioritize real platform problems in 2027",
  ],
};

function MeetingTopicCard({ topic }: { topic: MeetingTopic }) {
  return (
    <Card>
      <CardBody>
        <Stack gap={8}>
          <Text weight="semibold" size="small">{topic.title}</Text>
          <Text size="small" tone="secondary">{topic.detail}</Text>
          {topic.quotes.length > 0 && (
            <Stack gap={4}>
              <Text weight="semibold" size="small">Meeting quotes</Text>
              {topic.quotes.map((q) => (
                <Text size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

function ReuniaoCxView() {
  return (
    <Stack gap={16}>
      <Stack gap={4}>
        <H2>CX meeting ({CX_MEETING.date})</H2>
        <Text size="small" tone="secondary">
          {CX_MEETING.location} · {CX_MEETING.participants}
        </Text>
      </Stack>

      <Callout tone="info" title="Context">
        {CX_MEETING.context}
      </Callout>

      <Callout tone="warning" title="Connection with store visits">
        <Stack gap={4}>
          {CX_MEETING.connectsToStores.map((item) => (
            <Text size="small">• {item}</Text>
          ))}
        </Stack>
      </Callout>

      <Stack gap={10}>
        <H3 style={{ margin: 0 }}>Topics discussed</H3>
        {CX_MEETING.topics.map((topic) => (
          <MeetingTopicCard topic={topic} />
        ))}
      </Stack>

      <CollapsibleSection title="Next steps and alignments" defaultOpen>
        <Stack gap={6} style={{ paddingTop: 8 }}>
          {CX_MEETING.nextSteps.map((step) => (
            <Text size="small">• {step}</Text>
          ))}
        </Stack>
      </CollapsibleSection>

      <Text size="small" tone="tertiary">
        Source: transcript CX/St Isidro Suites Corporate Housing SPA & Wellness Center.txt
      </Text>
    </Stack>
  );
}

const PRODUTO_MEETING = {
  date: "22/07/2026",
  location: "St Isidro Suites — CDMX",
  participants:
    "Felipe Canelas (PM Seller/Courier/Admin), Vivian (designer), OPS leadership (Luis, Andre, Javi, Nadia, Alex) and CX",
  context:
    "Presentation of the strategic product pillars, changes since 2025 and upcoming roadmap. The day before, the product team visited stores in CDMX; tomorrow (07/23) OPS dynamics for vision 2027. Focus: right tools for fewer people, automation and KPIs (Perfect Order, Perfect Service, free rate, demand coverage, SLA).",
  testeCancelamento: {
    titulo: "Test: cancellation transfer with extended overlap",
    resumo:
      "Recover already canceled orders (~3% of volume) expanding coverage only for canceled orders. Normal algorithm does not change for regular orders. Experiment: 2 weekends, 1 city, 15 days, with dynamic fare per km.",
    comoFuncionaHoje: [
      "With 2 POCs in the area, a canceled/expired order at the 1st goes to the 2nd — in 90% of cases the 2nd POC delivers",
      "Up to 3 POCs in the chain; ~4 min to accept each one; ~12 min total until final cancellation",
      "Current transfer adds +2 min to average SLA",
      "Consumer only sees cancellation when the last store in the chain cancels (final status)",
      "Typical reason for cancellation at the 1st store: unsafe area, distance, no distributor available",
    ],
    oQueMudaNoTeste: [
      "Extended overlap (dynamic coverage) for canceled orders only — not for all orders",
      "Max 2 POCs in the chain (no 3rd transfer)",
      "1st POC still chosen by current algorithm (best KPI/proximity)",
      "2nd POC can be any store in the city that accepts — algorithm chooses who has stock",
      "Stores are not obliged to accept; dynamic fare per km incentive (ex: 6 km = 70 pesos, 10 km = 120 pesos)",
      "Manual and temporary configuration; without increasing permanent polygon (do not draw over the ocean/San Diego)",
    ],
    cidades: {
      candidatas: "Puebla (good stock, free rate 97%), Tijuana (original impact, fulfillment 97%+), Merida (circular polygons, good stock)",
      descartadas: "CDMX, Guadalajara (distance), Toluca (heavy stock)",
      propostaAndre: "Max 3-4 stores per sector (not entire city); larger but limited dynamic overlap; be careful with heat (5-8 min more = warm beer)",
      cidadesPequenas: "Valladolid (2 POCs), Mayadoliques — city walked in 20 min; Torreon routes max 25 min",
      cidadesComplexas: "Tijuana, Merida, Tuxtla — would need a base every 500m; Andre fears impact on Merida’s 98.5% fulfillment",
    },
    riscos: [
      "Stock out: distant store may not have the SKU (Luis) — mitigation: store turns off the SKU when it runs out",
      "SLA: long journeys reduce courier productivity and increase delivery time",
      "Fulfillment: courier far from the store fails to fulfill nearby orders",
      "SDA: stores in opposite points of the city will not cross the entire city",
      "Initial confusion: OPS thought that ALL orders would go to all stores — clarified that they are only canceled",
      "Previous test failed: Torreon/Celaya 2024 with dynamic polygons for ALL hourly orders (before current algorithm)",
    ],
    metricas: [
      "First-order retention vs rating (new users acquired on test weekend)",
      "Retention frequency and CX tickets",
      "Impact on free rate, SLA, stockout, fulfillment",
      "Guard rail: monitor first orders from new users separately",
    ],
    decisoes: [
      "2 weekends, 1 city — decide which (debate Puebla vs Tijuana vs Merida)",
      "15 days of quick trial; then take a more complete solution to tech",
      "Rate per km aligned with Nadia/Dani before the test",
      "Communicate clearly to POPs: no one is obliged to accept orders from far away",
    ],
  },
  topics: [
    {
      title: "Pillars, KPIs and strategic context",
      detail:
        "Prioritization by quarter (SDA, free rate, demand coverage). Mexico: fewer people than Brazil with higher quality. Target 95% Perfect Service (today ~92); 6 cities with 90% target (Torreon and Puebla reaching). 118+ changes in Seller/Courier since 2025. Current focus: growing perfect orders, demand coverage, stockout and perfect service. Free rate: consumer is primarily responsible for cancellations; changes focused on free rate single consumers. 10 cities closed (2% of the drop in orders vs last year).",
      quotes: [
        "Today, consumers are mainly responsible for canceling orders.",
        "We have been 92 but we want the goal 95.",
        "The 3% that we have fewer orders compared to last year, 2% are due to 10 cities that we closed.",
      ],
    },
    {
      title: "Order Flow — order summary and acceptance",
      detail:
        "Order summary reduced screens (fewer screens = faster computer). Evolution of the acceptance flow. Micro-conversions: reduction of 1.34 expected requests and an increase of 1 point lower in acceptance.",
      quotes: [
        "This made it possible for stores not to do multiple screens with each one having an order.",
        "The fewer screens on the computer, the better, the faster the computers.",
        "We will never make a change of more than 50% of the operation level.",
      ],
    },
    {
      title: "Map — 2nd most accessed screen",
      detail:
        "Critical screen to decide who delivers each order. Known issue: map without real-time GPS updates — also validated during store visits.",
      quotes: [
        "This is the second most accessed screen of all TADA stores.",
        "We see that we have a problem with the map, it is not having updates.",
      ],
    },
    {
      title: "Order distribution and overlap algorithm",
      detail:
        "Algorithm considers distance, clustering rate and load. Last year's test: -4 min delivery with variant B. Mexico Overlap: 25% orders (demand coverage overlap 40%; area overlap != order overlap). Brazil: 50%. Rolling hourly: last 3h, 1h gap. No real-time data from couriers — uses history (~6h). New POC: ~30-40% fewer orders than the best store. Distribution 1 in 20 to the 2nd store when the 1st operates well (tradeoff: worse SLA). Luis pending: case of canceling and not arriving at the other store.",
      quotes: [
        "We have 4 minutes of agility in delivery when we use the B algorithm.",
        "Overlap of Mexico is 25%... overlap demand coverage of 40%.",
        "Every hour it is updating... we have a GP of one hour of update.",
        "If you don't distribute your orders to all your delivery drivers... you won't have many orders.",
      ],
    },
    {
      title: "OPS feedback: flexibility on peak days (Epsunan)",
      detail:
        "Andre: on the day of a football match, an overloaded store does not redistribute to neighbors. Idle couriers: 'I have no orders'. Same problem in Brazil (Epsunan). Product evaluates 2nd version of the algorithm with progressive distribution — tradeoff between SLA and fairness between stores.",
      quotes: [
        "That strong operational day was lost on a typical day.",
        "The messages begin: I have no orders, how is your day?",
        "If we make that distribution fairer, we will not have the same levels of service.",
        "This is the second version of the algorithm.",
      ],
    },
    {
      title: "Courier Acquisition, Seller Acquisition and Courier Financial Report",
      detail:
        "Courier App with store information doubled acquisition. Online seller landing page (request from Nadia). Courier Financial Report: weekly payment closure for couriers — widely used on Sundays. Next step: couriers information for sellers.",
      quotes: [
        "We managed to double Kuhiers' acquisition levels.",
        "Sunday, Sunday, much used almost one for one.",
        "People can search for that here on the Internet and register here practically.",
      ],
    },
    {
      title: "Top Stores — ranking, prediction and competition",
      detail:
        "Initial test with Airplay in Queretaro and Monterrey. Main screen: ranking, perfect order, summary, forecast (last 7 days), best-selling products in the region. Errors in prognosis confirmed during visits — stores do not understand SLA. Sellers who see rankings perform better. Evolutions: competitor's name in the ranking, 4th/5th place award, AI tips, couriers needed per hour, emphasis on new consumers (fulfillment below average despite the banner).",
      quotes: [
        "Let the forecasts be more correct because we saw in the stores that we have some errors.",
        "Some don't really understand what an SLA is.",
        "I don't know what pop is winning me.",
        "Who else sees the top stores... much better or who understands the top stores.",
      ],
    },
    {
      title: "Fleet Manager — remove delivery drivers",
      detail:
        "New function to remove couriers (before just adding them). 6,000 removals in 2 weeks vs ~100 tickets/month before. During visits: stores still do not remove inactive employees; Alphabetical list makes it difficult to find assets (2nd page).",
      quotes: [
        "That caused practically 100 tickets per month to do the removals.",
        "Six thousand in two weeks delivery people from Pueblos.",
        "They are arranged alphabetically to assign which ones are active.",
      ],
    },
    {
      title: "TEST — How cancellation transfer works today",
      detail:
        "When 2+ POCs cover the zone and the 1st cancels/expires, order goes to 2nd (and possibly 3rd) POC. In 90% of cases the 2nd delivery. Each POC has ~4 min to accept; total ~12 min until final cancellation. Adds +2 min to average SLA. Consumer receives cancellation notification only in the final status. Typical case: store cancels due to unsafe zone — another store could deliver.",
      quotes: [
        "In 90% of cases we deliver with a second POC.",
        "During the cancellation transfer we have a 2 minute growth in SLA.",
        "The final cancellation status is that second or third... it's 12 minutes.",
        "I don't want to deliver to the store because that area seems unsafe. There is another store that could even deliver there.",
      ],
    },
    {
      title: "TESTING — What will be tested (overlap enlarged, are canceled)",
      detail:
        "Proposal: 100% overlap or extended only for canceled orders — dynamic coverage over the existing polygon. Normal algorithm DOES NOT change for regular orders. Only the 2nd attempt uses wider coverage; max 2 POCs (no 3rd transfer). Expected impact: ~3% of orders (Puebla free rate 97%). Recover lost orders, do not transfer active orders away. Brazil: it was a test for smart polygons, it is NOT live in big cities.",
      quotes: [
        "This is for an impact on the 3% write-off.",
        "Only for canceled ones... we are recovering an order that was already canceled.",
        "Today the algorithm will work like this, only for the canceled ones.",
        "In Brazil this functionality is not available... we do not have the technology to make entire changes to the city.",
        "We are not going to increase the polygon... I am not going to buy a polygon over the ocean.",
      ],
    },
    {
      title: "TEST — OPS risks and debates (stock, SLA, geography)",
      detail:
        "Luis: stores with disparate inventory at opposite points — stock out if SKU does not exist in the distant store; impact on SDA if they cross cities. Javi: stock at city level could benefit (<1%); store turns off SKU when it runs out. SLA: 5 km/50 pesos today vs 10 km/100 pesos; Long-distance courier loses productivity. Andre (Merida): large cities with 40-60 POCs — operational risk; fulfillment 98.5%; orders outside the sector generate tickets ('10 km, can I cancel or take it?'); intense heat — 5-8 min more = perception of hot product. Previous test Torreon/Celaya 2024 (dynamic polygons for ALL orders) did not work.",
      quotes: [
        "Many orders will fall for a SKU that the nearby store probably does not have.",
        "Productivity of that delivery person will be lost by being at a fairly distant distance.",
        "For small cities it is good, but for large cities... putting all productivity at risk.",
        "Intense heat zones, arriving late means the product is warm.",
        "We made four polygons... we all put the polygon in the city and it didn't work that much.",
      ],
    },
    {
      title: "TEST — Non-consumer impact, CX and experience",
      detail:
        "With the new tool, consumers DO NOT see cancellations until the 2nd store cancels — better experience (chance of redemption). Concerned CX: tickets 'why did they cancel?' — SLA can increase from 45 to 55 min. Debate: which is worse, canceling or delaying? After 25 minutes users increase churn. Reporting a delay via push can help. Future vision Canelas: Uber-style dynamic ETA before ordering + variable delivery fee.",
      quotes: [
        "With this new tool, the consumer does not find out until the second store cancels.",
        "That it is better to have a canceled order, to have an order delivered in 50 minutes, we don't know.",
        "After 25 minutes, users already increase the probability of chatting.",
        "How is the demand... it is not possible to deliver in 30 minutes... I will get it in 50 before placing the order. It's exactly like Uber.",
      ],
    },
    {
      title: "TEST — Fares, cities and Andre's proposal",
      detail:
        "Dynamic fare per km mandatory (Nadia/Dani align with POPs). Examples: 6 km = 70 pesos, 10 km = 120 pesos. Cities: Puebla (good stock), Tijuana (origin of the idea, SLA 91-94%), Merida (circular polygons). Andre proposes: max 3-4 stores per sector, greater dynamic overlap but not the entire city; 3 stores = little data for 3 months of testing. No one is obliged to accept orders from far away — POP decides based on available distributors.",
      quotes: [
        "If it is 6 kilometers we are going to pay it in 70 pesos, if it is 10 kilometers we have to pay it in 120 pesos.",
        "Grab a maximum of three stores, four stores and try it out.",
        "Stores are not obligated to accept an order that is far away.",
        "We can start with Puebla, which has a relatively good stock in stores.",
      ],
    },
    {
      title: "TEST — Experiment design and metrics",
      detail:
        "Duration: 2 weekends, 1 city, ~15 days total. Launch in ~2 weeks (holiday conflict). Manual and temporary configuration. Metrics: first-order retention vs rating, retention frequency, CX tickets. Guard rail for new users (first orders). After testing: take a complete solution to tech with mileage limits for the entire country.",
      quotes: [
        "Two weekends, one city, one game.",
        "First one, retention versus rating, retention frequency, luego cuantos tickets levantan.",
        "In 15 days we will see all the impacts, we will take it to tech.",
        "We are going to make small changes with mileage limits for the entire country.",
      ],
    },
    {
      title: "Courier Financial Report (Jumbo) — statement on platform",
      detail:
        "Weekly communication of payment for couriers directly on the Seller platform (same financial Excel). V1: summary by concept, line by line (not in order; not this year). Dream: statement requested on request + direct bank transfer (complicated: customer's bank account). OPS concern: everyone in charge of the store sees values. Store comments on visits: they want today's cut and yesterday's routes.",
      quotes: [
        "Our dream is to do order by order as a banking layer.",
        "The information will be available to all store managers.",
        "Yesterday's routes... were from the comments that the store made to us.",
      ],
    },
    {
      title: "Communication: alert center, WhatsApp and Zendesk",
      detail:
        "Chat that is not chat (MX): courier-client with pre-defined messages (call, instructions, time 5/10/15 min). Customer has 5 minutes to respond. Seller receives alert if courier no response 5-10 min. Seller-customer: button opens WhatsApp on the computer (like today). Brazil: -30% tickets; 60% 'I'm here' messages. Zendesk-Brase: popup on Seller Web for CX tickets. Arrival push exists but couriers say that consumers don't see — complement. Open order: courier only; closed/incomplete: CX. Login vs communication: changing phone/email requires a new account — validate with Iya.",
      quotes: [
        "Tiene forma, sabor, olor, pero no es un chat.",
        "In Brazil 60% of the reasons were I'm here, I'm here.",
        "We have a 30% reduction in ticket volume with communication alone.",
        "I have to generate a new account again with a different name.",
      ],
    },
    {
      title: "Notification center for sellers",
      detail:
        "In-app inbox (already in Bolivia; adds Braze). NPS, institutional communications, features, promotions by POC/city (ex: Corona 40%). Evolution: ticket backlog ('you have 50 tickets, respond'), PDFs for download, orders.",
      quotes: [
        "A communication inbox... starting with sending NPS to seller.",
        "Tienes un backlog de 30. Exactamente.",
        "It was what we talked about yesterday about commandments.",
      ],
    },
  ] as MeetingTopic[],
  connectsToStores: [
    "Inaccurate order forecast — Top Stores + visits (Bahia, Los Alpes, Churubusco)",
    "Map/GPS does not update — 2nd most used screen; confirmed in the field and in the meeting",
    "Remove inactive distributors — new Fleet Manager, stores are not yet using it (visits)",
    "Alphabetical list of couriers — makes operations difficult (Churubusco)",
    "Overlap/unevenness on peak days — idle couriers vs overload",
    "New consumers with below-average fulfillment — flag exists but they don’t prioritize",
    "Cancellation test: stores cancel due to insecure zone — expanded overlap could rescue",
    "Courier statement: stores asked for a cut of the day and yesterday's routes for visits",
    "SLA not understood by sellers — Top Tiendas needs to explain metrics",
  ],
  nextSteps: [
    "TEST cancellation: define city (Puebla/Tijuana/Merida), 2 weekends, rate per km with Nadia/Dani",
    "TEST: communicate SOPs that are not obliged to accept; measure retention, rating, tickets, new users",
    "After 15 days of testing: take results to tech (km limits nationwide)",
    "Launch Courier Financial Report (Jumbo) this week — weekly summary on platform",
    "Seller notification center — NPS rollout + communications by POC/city",
    "Top Tiendas: IA tips, competitor names, 4th/5th award, emphasis on new consumers",
    "2nd algorithm version: progressive distribution on peak days (Epsunan)",
    "Validate with Iya: email/phone update vs critical login",
    "Dynamic OPS (23/07) for vision 2027",
  ],
};

function ReuniaoProductView() {
  const t = PRODUTO_MEETING.testeCancelamento;
  return (
    <Stack gap={16}>
      <Stack gap={4}>
        <H2>Product meeting ({PRODUTO_MEETING.date})</H2>
        <Text size="small" tone="secondary">
          {PRODUTO_MEETING.location} · {PRODUTO_MEETING.participants}
        </Text>
      </Stack>

      <Callout tone="info" title="Context">
        {PRODUTO_MEETING.context}
      </Callout>

      <Callout tone="warning" title={t.titulo}>
        <Stack gap={8}>
          <Text size="small">{t.resumo}</Text>
          <Grid columns={2} gap={12}>
            <Stack gap={6}>
              <Text weight="semibold" size="small">How it works today</Text>
              {t.comoFuncionaHoje.map((item) => (
                <Text size="small">• {item}</Text>
              ))}
            </Stack>
            <Stack gap={6}>
              <Text weight="semibold" size="small">What changes in the test</Text>
              {t.oQueMudaNoTeste.map((item) => (
                <Text size="small">• {item}</Text>
              ))}
            </Stack>
          </Grid>
        </Stack>
      </Callout>

      <CollapsibleSection title="Test — cities, risks, metrics and decisions" defaultOpen>
        <Stack gap={12} style={{ paddingTop: 8 }}>
          <Card>
            <CardBody>
              <Stack gap={6}>
                <Text weight="semibold" size="small">Cities</Text>
                <Text size="small"><Text weight="semibold" size="small">Candidates: </Text>{t.cidades.candidatas}</Text>
                <Text size="small"><Text weight="semibold" size="small">Ruled out: </Text>{t.cidades.descartadas}</Text>
                <Text size="small"><Text weight="semibold" size="small">Andre's proposal: </Text>{t.cidades.propostaAndre}</Text>
                <Text size="small"><Text weight="semibold" size="small">Small cities: </Text>{t.cidades.cidadesPequenas}</Text>
                <Text size="small"><Text weight="semibold" size="small">Complex cities: </Text>{t.cidades.cidadesComplexas}</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack gap={6}>
                <Text weight="semibold" size="small">Risks raised</Text>
                {t.riscos.map((item) => (
                  <Text size="small">• {item}</Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Grid columns={2} gap={12}>
            <Card>
              <CardBody>
                <Stack gap={6}>
                  <Text weight="semibold" size="small">Experiment metrics</Text>
                  {t.metricas.map((item) => (
                    <Text size="small">• {item}</Text>
                  ))}
                </Stack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stack gap={6}>
                  <Text weight="semibold" size="small">Decisions</Text>
                  {t.decisoes.map((item) => (
                    <Text size="small">• {item}</Text>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </Grid>
        </Stack>
      </CollapsibleSection>

      <Callout tone="warning" title="Connection with store visits">
        <Stack gap={4}>
          {PRODUTO_MEETING.connectsToStores.map((item) => (
            <Text size="small">• {item}</Text>
          ))}
        </Stack>
      </Callout>

      <Stack gap={10}>
        <H3 style={{ margin: 0 }}>Topics presented and discussed</H3>
        {PRODUTO_MEETING.topics.map((topic) => (
          <MeetingTopicCard topic={topic} />
        ))}
      </Stack>

      <CollapsibleSection title="Next steps and decisions" defaultOpen>
        <Stack gap={6} style={{ paddingTop: 8 }}>
          {PRODUTO_MEETING.nextSteps.map((step) => (
            <Text size="small">• {step}</Text>
          ))}
        </Stack>
      </CollapsibleSection>

      <Text size="small" tone="tertiary">
        Source: transcript Reuniao/St Isidro Suites Corporate Housing SPA & Wellness Center 2 copia.txt
      </Text>
    </Stack>
  );
}

type DinamicaCategory = {
  id: string;
  label: string;
  topics: MeetingTopic[];
};

const DINAMICA_OPS = {
  date: "23/07/2026",
  location: "St Isidro Suites — CDMX",
  participants:
    "OPS (Luis, Daniela, Andre, Javi, Nadia), CX (Marcela), Comercial/Marketplace (Armando, Mitch, David), Marketing (Itamar), Retention (Carol), Product (Canelas, Vivian), Capacitacao (Manu)",
  context:
    "Dynamics to build vision 2027. Phase 1: post-its of challenges by area (10 min). Phase 2: open discussion (40 min). Phase 3: friction map. Phase 4: dreams/future of the product by area (Courier, Seller, Admin, CX, Consumer). Notification center for sellers already being tested in Bolivia.",
  categories: [
    {
      id: "courier",
      label: "Courier",
      topics: [
        {
          title: "Inefficient tracking and failures to close orders",
          detail:
            "Post-it: inefficient courier tracking even with active permissions (consumer and seller). Constant failures when closing orders; orders that cannot be closed. Failures in courier app directly impact SLA.",
          quotes: [
            "Courier tracking is inefficient in several cases even with active permissions for both consumer and seller.",
            "Constant failures in the courier app when closing orders.",
            "Courier app failures cause SLA problems.",
          ],
        },
        {
          title: "Available vs offline — manual assignment",
          detail:
            "In the delivery app it appears available but in the system it appears offline. Error adding order to delivery person; They have to manually enter the order key. Help and support not visible in the app.",
          quotes: [
            "Although it appears as available, here it appears offline and perhaps that causes an error to appear when they try to add the order to the delivery person.",
            "They have to write it manually in the delivery person's app, where it says order key.",
            "Put the help and support action in a visible place.",
          ],
        },
        {
          title: "Android versions and OS updates",
          detail:
            "Luis (OPS): frequent issues may be linked to Android versions and OS updates on courier phones. Drives several post-it comments.",
          quotes: [
            "I think it has to do with Android versions, with operating system updates on phones.",
            "I think that is one of the main problems we have, which is where several comments come from.",
          ],
        },
        {
          title: "Real-time supervision panel (Andre)",
          detail:
            "They need a panel to see couriers in real time: routes, if they take orders, how long they take to travel. Before they had it with Tucker. Today they wait 24 hours to find out what happened on the route — without real-time corrections. Access for immediate cancellation reason.",
          quotes: [
            "We need a panel in which we can see in real time how the delivery people are moving.",
            "We have to wait 24 hours to know what is really happening en route and we cannot have corrections in real time.",
            "When they cancel it they will notify us minutes later, we practically need access.",
          ],
        },
        {
          title: "Future: Uber-style visibility for the consumer",
          detail:
            "Consumer should see delivery person in real time. Today it seems stopped/delayed; If you leave and come back in it updates but it is not live. Uber idea: notify when a courier delivers another order sooner — calmer, fewer tickets.",
          quotes: [
            "The consumer can see the delivery man in real time... in practice, not, because he does not see him, he sees him delayed, he sees him standing still.",
            "As happens in Uber... you are with another person... the consumer can see that you are going to place an order first.",
            "Entre mas informacion le demos, entre mas visual, mas calma y menos nos levantan tickets.",
          ],
        },
      ],
    },
    {
      id: "seller",
      label: "Seller",
      topics: [
        {
          title: "Inventory: groups vs products and minimum portfolio",
          detail:
            "Managers confuse group pages with products (e.g. rum/liqueurs). They propose bold, color or drop-down list by group (Coca-Cola displays everything). New POCs don't know a catalog — they need filters. The first thing they see is general inventory; You should see the minimum portfolio first. Operating incentive pays for groups on, not for individual SKUs. Unmissable SKUs section by city.",
          quotes: [
            "They are unable to distinguish the group pages from the product pages of each group.",
            "The first thing they see is the general inventory... the duty is to do it from the minimum portfolio.",
            "In the operating incentive we pay them on the groups turned on.",
          ],
        },
        {
          title: "Invisible store PIN on map and coverage",
          detail:
            "Seller does not appear in map PIN or coverage. In My Account they do not see real coverage with PIN. When assigning order they do not see where the store is.",
          quotes: [
            "Seller does not appear in the store's PIN on the map or in coverage.",
            "You cannot see where the store is and you cannot see where it is located.",
          ],
        },
        {
          title: "Unfriendly inventory management",
          detail:
            "Complicated process: visualizations, SKUs that appear/disappear. Inventory slow to update. Completed orders continue to appear. Without reassigning orders in emergency. Excessive weight for deliveries. Filters by brand, sub-brand, highest to lowest inventory.",
          quotes: [
            "Inventory management today is not at all friendly for whoever is in charge of the seller.",
            "Inventory is not very efficient when it comes to updating inventory in seller.",
            "Not having the option to reassign orders as an emergency protocol.",
          ],
        },
        {
          title: "Returnables and automatic variant activation",
          detail:
            "If you have a returnable or non-returnable button, the other one is automatically turned on — very hard management. Filters by brand would help. You cannot download the entire file of PIN-enabled SKUs.",
          quotes: [
            "If you have one of the two on, it is automatically turning on because the management is very hard.",
            "No se puede descargar archivo completo de SKUs habilitados en PIN.",
          ],
        },
        {
          title: "Consola admin tipo Armis/Vitex (Luis)",
          detail:
            "OPS needs to enter seller by seller with credentials (which change). Before on Vitex/Armis: store code, see live inventory. Proposal: mirror without asking each seller for a bag of credentials.",
          quotes: [
            "We have to enter seller by seller, have the credentials... if they changed them, wait for them to pass them to us.",
            "In Armis we could literally select the code of each store and see what the item is in real life.",
          ],
        },
        {
          title: "Automatic combos and creation module (Armando)",
          detail:
            "If store has 3 combo SKUs on, create automatic combo; if one goes off, undo combo. Module to select parts (3+ years ordered). Today: Create SKUs that add value, manual breakdown, only 6 of 200 active combos. GMB combos grew 30-40% but represent 10% today. Profit goes to Marketplace instead of Beer.",
          quotes: [
            "If the store has those three turned on, the combo is automatically made.",
            "It has been more than 3 years since we have requested this and it has never happened.",
            "Nowadays the combos... all the profit goes to the Marketplace and it is not the right thing to do.",
          ],
        },
        {
          title: "Seller KPIs: SLA 35 min and time filters (Daniela)",
          detail:
            "Seller view should show % deliveries in 35 min or less. Filter not only 7 days — monthly, previous day, etc. Personalized breakdown of price differences and shipping costs for business owners.",
          quotes: [
            "Have the percentage of those delivered in 35 minutes or less.",
            "Agregar un filtro... mensual, dia anterior, etc.",
            "The personalized breakdown of price differences and shipping costs.",
          ],
        },
        {
          title: "End-of-day close with SKU detail (Andre)",
          detail:
            "Entrepreneurs need daily counting: folio, SKU, cost per SKU to cross-reference with their system. They only see amounts and orders without details. Detected losses of 25-30 thousand pesos/month due to embezzlement in stores.",
          quotes: [
            "They have detected losses between 25 thousand and 30 thousand pesos in a month of embezzlement in stores.",
            "They can only view the amount... but they do not have the specific details of how much was charged and which SKUs left the store.",
          ],
        },
        {
          title: "Outdated manuals and training",
          detail:
            "Seller page with manuals from 2 years ago. They need updated videos and infographics integrated into the platform. Training section with the most important things.",
          quotes: [
            "These manuals have been updated for two years, it was the last update.",
            "Informative videos, infographics and everything, but keep updating.",
          ],
        },
        {
          title: "Future: inbox, notifications and voice of consumer",
          detail:
            "Notification/inbox when new SKU or combo available (click here). Current promotions of the week in one place. Notification center (Bolivia test, Braze). Voice of consumer box: problems that customers report in your store. B2B report delivery people needed per week.",
          quotes: [
            "A new SKU notification would be great... Victoria's new presentation already exists, turn it on here.",
            "Within the seller's app... voice of consumer... such are the problems that are occurring.",
            "Now we are doing a test in Bolivia with notification centers.",
          ],
        },
      ],
    },
    {
      id: "admin",
      label: "Admin",
      topics: [
        {
          title: "Polygons: see coverage of the neighboring POC",
          detail:
            "When modifying polygons you have to check street by street to splice. They need to see POC coverage next to them when modifying to close white space.",
          quotes: [
            "When modifying polygons... you have to be looking street by street to try to close the coverage.",
            "If we can see the pop coverage next door it would help a lot.",
          ],
        },
        {
          title: "Seller acquisition: bulk download and incorrect data",
          detail:
            "Registration landing active but you have to enter one by one to get data. Some enter incorrect information and the lead is lost. Onboarding asks for too many fields (~10). Very bad initial board.",
          quotes: [
            "They have to enter one by one to get the data.",
            "Some put their tooth number in their phone number... it's already lost, I no longer have a way to contact them.",
            "Son 10 informaciones diferentes.",
          ],
        },
        {
          title: "Heat map and order concentration (Nadia)",
          detail:
            "Ultra laborious process: download data, upload to Kepler, use 3 map programs. They need to visualize concentration of orders in coverage. They detected fraud (90 chips per POC) with this manual work. Mass download of maps coverage; filters changed and lost visualization.",
          quotes: [
            "That process that Nadia does is honestly ultra laborious.",
            "I have to use other tools... I use three programs to download the maps.",
            "We detected that there was a POC where he sold 90 chips... it was fraud.",
          ],
        },
        {
          title: "Admin coupons unlinked from categories",
          detail:
            "Coupon admin not linked to product categories. Categories that appear are old (Cuca). Loading coupons with unique codes very manually. First purchase coupon abuse with multiple accounts.",
          quotes: [
            "The coupon admin is not linked to the product categories.",
            "The categories that appear are already super old since Cuca's communication was there.",
            "They create different accounts on the same device and continue using it.",
          ],
        },
        {
          title: "SKUs deleted without notice",
          detail:
            "Massive shutdown of obsolete SKUs, eliminating 24 combos from the world cup that they used. They had to recreate it without knowing if they lost data. They need to protect SKUs that they use in promos.",
          quotes: [
            "Every time they played Mexico we turned it on... the SKU disappeared, was eliminated and we had to recreate it.",
            "We don't know if we were going to lose previous data.",
          ],
        },
        {
          title: "Braze communications verification/encrypting",
          detail:
            "CX does not know if the user received the coupon/communication. They need to get Braze history by specific email to verify.",
          quotes: [
            "We don't know if a user received the coupon... get the encryption history, from brace.",
          ],
        },
      ],
    },
    {
      id: "cx",
      label: "CX",
      topics: [
        {
          title: "Without visibility of what the consumer sees",
          detail:
            "CX cannot see wallet, points, consumer screen. They always ask for captures — annoying ('if you can't see, they'll wait for me'). No personalization: new and frequent drinkers receive the same attention.",
          quotes: [
            "We cannot visualize what they see, we do not know what they have in their wallet.",
            "We're always asking for screenshots, always, always.",
            "Attention is equal for everyone when it shouldn't be.",
          ],
        },
        {
          title: "Disconnected ecosystem and blind map",
          detail:
            "Without internal communication between CX, seller and courier. CX does not see the courier's map or location — 'completely blind' to guide or calm the consumer.",
          quotes: [
            "The ecosystem is not connected to be able to talk internally between the three.",
            "We have no idea or visibility of where the courier is going... we are completely blind.",
          ],
        },
        {
          title: "Mandatory and visible cancellation reason",
          detail:
            "Marcela wants to see the reason for each cancellation/expiration in her system. Reason 'other' with free text is lost — it does not reach CX. Useful for rain, without distributor, etc.",
          quotes: [
            "Every time an order expires or is canceled I have the reason... I want it to be mandatory.",
            "When he clicks on another... we lose that part that he wrote, we don't see it.",
          ],
        },
        {
          title: "Delivered not received and completion options",
          detail:
            "High impact category in tickets. Delivery driver has 3 options to dial endlessly — CX wants only 1. Delivery PIN low volume but cases persist.",
          quotes: [
            "I have ordered marked as delivered and not received... it has an impact on my tickets.",
            "There are three options to mark orders endlessly, I want there to be only one.",
          ],
        },
        {
          title: "Consumer cancellation = 20% tickets",
          detail:
            "Top reason for contact: I want to cancel (wrong address, change product, I no longer want). Proposal: modify direction on the perimeter (500m-1km) without canceling. Block/delay users who cancel 2-5 consecutive times within the first minute.",
          quotes: [
            "Almost 20% of my tickets are intended to be cancelled.",
            "Consumers who cancel our orders in the first minute... two, three, four, five in a row.",
          ],
        },
        {
          title: "Decision tree and unified view (Uber/iFood style)",
          detail:
            "Benchmark Uber: decision tree for complaints without reaching a human. iFood DC Delivery already has it. Vitex-style proposal: an account to view inventory, orders, map of any seller without credentials. Ticket history per consumer does not exist. Branded calling (TaDa logo when calling).",
          quotes: [
            "Uber gives you a decision tree... don't contact a human.",
            "Something similar to what we had with Vitex... an account where you log in, you see the seller, you see their orders, you see their inventory.",
            "Well-established decision tree... for it to happen with support was not so easy.",
          ],
        },
        {
          title: "WhatsApp and notifications without background",
          detail:
            "WhatsApp main MX channel but without notification in the background. Email communication between platforms is slow. Late/store order push does not arrive if the consumer is not in the app.",
          quotes: [
            "WhatsApp is the main contact channel here in Mexico.",
            "It does not work in the background... the consumer does not receive a notification saying I already answered you.",
            "You never get an app notification.",
          ],
        },
        {
          title: "Future: AI bots, SLA as support and integrations",
          detail:
            "Resolving AI bots for team management and communication. SLA is not always a problem to solve — TaDa should be a technological tool that helps entrepreneurs sell. Complicated Braze/SLA data integrations with third parties (NTT Data).",
          quotes: [
            "The artificial intelligence bots that we are building can be decisive.",
            "SLA can become more supportive of SLA to make it easier for them to manage and sell.",
          ],
        },
      ],
    },
    {
      id: "consumer",
      label: "Consumer",
      topics: [
        {
          title: "App crashes on peak days and massive promos",
          detail:
            "World: app collapse, CSAT very low for 2 months. Friday fortnight, massive events. Strategy was to anticipate demand with aggressive discounting. There was no 'we are collapsing' alert. 80% Corona discount — courier and app collapse.",
          quotes: [
            "I had two months with very, very, very low satisfaction.",
            "We collapsed with what we saw and the couriers collapsed.",
            "Is our application ready for this level of promotions?",
          ],
        },
        {
          title: "Loading times and weight of the app",
          detail:
            "8-9 second load with animation before main screen. App has weighed up to 3 GB. Users in focus groups: it is not accessible, it is not easy to use.",
          quotes: [
            "Application loading times are very slow, 8.9 seconds.",
            "The application has reached despite up to 3 gigabytes.",
            "They are not satisfied because it is not so easy to use.",
          ],
        },
        {
          title: "Onboarding y cupones",
          detail:
            "Verification SMS/WhatsApp does not arrive — acquisition traffic is lost. Coupon difficult to apply for recurring user ('I already have an active coupon, how do I add it'). First abuseable purchase with multiple accounts.",
          quotes: [
            "Suddenly you don't get the message via SMS or WhatsApp and there we lose a large part of the traffic.",
            "I am a user, I already have an active coupon there... it's complicated.",
          ],
        },
        {
          title: "Cart, update and failures by device",
          detail:
            "Nobody knows what to enter number and delete to remove product from cart. Forced update only when there is a problem — you should be proactive as a bank. More failures on iPhone in the world. Confusion between network failure and app failure.",
          quotes: [
            "No user knows that if they type the number and click delete, everything is deleted.",
            "I should say like at the bank... a notice updating your application.",
            "The failures are more on the iPhone.",
          ],
        },
        {
          title: "Future: live map, blocking update and payment",
          detail:
            "Force update blocking purchase if outdated version. Functional real-time delivery map. Card payment/PayPal stuck — gift ideas (birthday crowns). GIFs in promotional banners (Brace images only). AI to explain T&C and promotions.",
          quotes: [
            "Don't let him continue or buy... let him accept the process to update.",
            "We have heard about the town with cards... send them some crowns for their birthday.",
            "When it is a gif we can put a little more information in the banner.",
          ],
        },
      ],
    },
    {
      id: "comercial",
      label: "Comercial / Marketplace",
      topics: [
        {
          title: "Aisles and rampages without editable priority",
          detail:
            "Category aisles cannot be prioritized even if they change position. Beer promotions go to the bottom. Rampages without editing access — duplicate work (hallway + rampage for new Tigres can).",
          quotes: [
            "In the category hallways we cannot give them priority.",
            "We do not have access to those rampages, we cannot be giving you every notion.",
          ],
        },
        {
          title: "Commercial communication via WhatsApp unsustainable",
          detail:
            "Each new product requires art + message to groups. Many groups (national, city, ops, failures, commercial). Entrepreneurs saturated with messages. Central inbox would solve it.",
          quotes: [
            "Every time we create something new... I have to create art to tell the businessman to turn it on.",
            "One day the businessman notifies me that I am receiving many messages and it is too much.",
          ],
        },
        {
          title: "Retention and acquisition (Carol / Itamar)",
          detail:
            "Carol: capabilities for long-term retention. Itamar: acquisition of users and orders, owner Marketplace. App must be ready for any promo volume.",
          quotes: [
            "Everything we need to create capabilities to improve retention.",
            "Main objectives, acquisition of new users and orders.",
          ],
        },
      ],
    },
    {
      id: "processo",
      label: "Internal process / Supervision / OPS",
      topics: [
        {
          title: "Real-time KPI cockpit (Daniela / John)",
          detail:
            "Admin master console: view inventories, orders, SLA, free rate by POC without logging into each seller. Update every 1.5-2 hours acceptable. John I think Power BI view — they need it for weekends and on call. Detect new POCs that are stuck.",
          quotes: [
            "We would love a summary where we can see real time... SLA, free rate.",
            "Have a cockpit type... especially on Saturdays and Sundays who are on guard.",
            "John helped us create a view of how the POCs were doing.",
          ],
        },
        {
          title: "Stock audit and slow commercial reaction",
          detail:
            "OPS audits stock entering seller by seller. Commercial creates new SKU with potential but operational activation is slow and manual. Combos and promos complicate management.",
          quotes: [
            "As operations we have to be auditing stock and today the process for us is not friendly at all.",
            "Commercial creates a new idea... operational reaction is very complicated.",
          ],
        },
        {
          title: "Friction map: rework between areas",
          detail:
            "Session included friction map: recurring pains, bottlenecks, rework, noise points between areas, moments when operations break.",
          quotes: [
            "Friction map... recurring pains, noise points between areas.",
            "Moments when the operation breaks down.",
          ],
        },
        {
          title: "B2B report and AI delivery suggestion",
          detail:
            "B2B report for POC to know how many delivery drivers you need next week. Benchmark Uber Eats with AI for POC supervisor. Automatic suggestion according to weekly order growth.",
          quotes: [
            "The B2B report that we apply so that the POC knows how much delivery person to use for the following week.",
            "How many orders are needed, so many delivery people.",
          ],
        },
        {
          title: "Inaccurate pedal forecast",
          detail:
            "Mentioned in dynamics: forecast 20-40% error. They need a more precise stage; Bad forecast generates chain of bad experiences (turn off/reprimand in matches).",
          quotes: [
            "We drive a 20 to 40... when will it arrive, I know it's difficult but I don't have a more precise stage.",
            "It is often wrong... a chain of bad experiences.",
          ],
        },
      ],
    },
  ] as DinamicaCategory[],
  connectsToStores: [
    "Minimum vs general portfolio inventory — confirmed on all visits",
    "PIN/mapa seller invisible — Bahia, Mixcoac, Churubusco",
    "Courier app crashes when closing — mentioned in the field",
    "Inaccurate prognosis — Top Stores + visits",
    "Remove delivery drivers / alphabetical list — Churubusco",
    "Outdated manuals — sellers don’t understand SLA and metrics",
    "Reason for cancellation — CX needed for disputes (meeting 07/22)",
  ],
  nextSteps: [
    "Seller notification center — test in a small town (Bolivia -> MX)",
    "Combos module — commercial priority (Armando, 3+ years)",
    "Admin console / real-time KPI cockpit — resume John Power BI",
    "Closing of the day with SKU details — validate with entrepreneurs",
    "CX decision tree — Uber/iFood benchmark",
    "Force update consumer app — block purchase from being outdated",
    "Order heat map integrated in Admin/coverage",
  ],
};

function DinamicaOpsView() {
  return (
    <Stack gap={16}>
      <Stack gap={4}>
        <H2>OPS workshop ({DINAMICA_OPS.date})</H2>
        <Text size="small" tone="secondary">
          {DINAMICA_OPS.location} · {DINAMICA_OPS.participants}
        </Text>
      </Stack>

      <Callout tone="info" title="Context of the dynamics">
        {DINAMICA_OPS.context}
      </Callout>

      <Callout tone="warning" title="Connection with store visits and meetings">
        <Stack gap={4}>
          {DINAMICA_OPS.connectsToStores.map((item) => (
            <Text size="small">• {item}</Text>
          ))}
        </Stack>
      </Callout>

      <Stack gap={12}>
        {DINAMICA_OPS.categories.map((cat) => (
          <CollapsibleSection title={cat.label} defaultOpen>
            <Stack gap={8} style={{ paddingTop: 8 }}>
              {cat.topics.map((topic) => (
                <MeetingTopicCard topic={topic} />
              ))}
            </Stack>
          </CollapsibleSection>
        ))}
      </Stack>

      <CollapsibleSection title="Next steps and priorities" defaultOpen>
        <Stack gap={6} style={{ paddingTop: 8 }}>
          {DINAMICA_OPS.nextSteps.map((step) => (
            <Text size="small">• {step}</Text>
          ))}
        </Stack>
      </CollapsibleSection>

      <Text size="small" tone="tertiary">
        Source: Dinamica/St Isidro Suites 4.pdf + 4 (2).pdf + full transcripts audios 4 and 5
      </Text>
    </Stack>
  );
}

type TripSource = "Stores" | "CX" | "Product" | "OPS";

type SynthesisTheme = {
  rank: number;
  title: string;
  mentions: number;
  sources: TripSource[];
  stores: string;
  summary: string;
  impact: string;
};

type CriticalPriority = {
  rank: number;
  title: string;
  why: string;
  evidence: { source: TripSource; detail: string }[];
  suggestion: string;
  owners: string;
};

const TRIP_SYNTHESIS = {
  period: "20–23 Jul/2026",
  scope:
    "4 stores visited (Bahia, Mixcoac, Los Alpes, Churubusco) · CX meeting (Jul 22) · Product meeting (Jul 22) · OPS workshop (Jul 23)",
  executiveSummary:
    "The trip confirms the biggest gaps are not isolated: GPS/map, inventory with quantity, in-app chat and overlapping appear in all stores and are reinforced by CX, Product and OPS. KPIs show pressure on Fill Rate (Bahia −8 pp), critical stockout (Mixcoac Others 17%) and low TML 10 (Churubusco 38%). Business meetings converge on: fixing real-time tracking, inventory quantity, seller-customer communication within the platform, and operational visibility (daily KPIs, admin cockpit, reliable forecast).",
  stats: {
    stores: 4,
    interviews: 8,
    crossThemes: CROSS_STORE_THEMES.length,
    cxTopics: CX_MEETING.topics.length,
    productTopics: PRODUTO_MEETING.topics.length,
    opsTopics: DINAMICA_OPS.categories.reduce((n, c) => n + c.topics.length, 0),
    criticalThemes: CROSS_STORE_THEMES.filter((t) => t.priority === "Critical").length,
  },
  kpiAlerts: [
    "Bahia: Fill Rate dropped 8 pp (Jun→Jul) — largest drop in the group; SLA 35 below 90%",
    "Mixcoac: stockout Others 17% — critical risk; Availability 89.1%",
    "Churubusco: lowest TML 10 in the group (38%); still uses Telegram to route orders",
    "Los Alpes: best overall performance, but forecast ignored and manual operations (Excel + notebook)",
  ],
  themes: [
    {
      rank: 1,
      title: "GPS / map does not update in real time",
      mentions: 4,
      sources: ["Stores", "CX", "Product", "OPS"],
      stores: "4/4 stores",
      summary:
        "Courier pin stuck at the store; tracking disappears when returning. Consumer complains about delay that is actually a display problem.",
      impact: "SLA 35, rating, CX late-order tickets, seller confidence in the map (2nd most accessed screen)",
    },
    {
      rank: 2,
      title: "Inventory without real quantity",
      mentions: 4,
      sources: ["Stores", "CX", "Product", "OPS"],
      stores: "4/4 stores — unanimous #1 priority",
      summary:
        "On/off does not reflect stock. Inflated numbers, no TADA + floor-sale auto-decrement. Impossible to validate incomplete orders.",
      impact: "Fill rate, stockout, CX seller vs consumer disputes, system confidence",
    },
    {
      rank: 3,
      title: "In-app chat (seller ↔ customer / courier)",
      mentions: 4,
      sources: ["Stores", "CX", "Product", "OPS"],
      stores: "4/4 stores",
      summary:
        "100% WhatsApp and personal calls today. CX validates pre-defined message model in MX (no open chat). Would reduce ~40% of coordination tickets.",
      impact: "CX volume, operational risk, no history/tracking",
    },
    {
      rank: 4,
      title: "Overlapping / wrong order routing",
      mentions: 4,
      sources: ["Stores", "CX", "Product", "OPS"],
      stores: "3/4 stores + algorithm debate",
      summary:
        "Nearby customer receives order from distant store. In-stock products do not appear. Cancellation transfer test (3% volume) under discussion.",
      impact: "Cancellations, SLA, free rate, consumer experience",
    },
    {
      rank: 5,
      title: "7-day KPIs — no daily management",
      mentions: 4,
      sources: ["Stores", "Product", "OPS"],
      stores: "4/4 stores",
      summary:
        "Seller cannot see yesterday's performance to manage the team today. Unintuitive dashboard. OPS requests real-time cockpit.",
      impact: "Team management, TML 10, SLA 35, peak preparation",
    },
    {
      rank: 6,
      title: "Inaccurate daily order forecast",
      mentions: 4,
      sources: ["Stores", "Product", "OPS"],
      stores: "3/4 stores",
      summary:
        "Top Stores shows volume that does not match (e.g. 30 expected, 7 arrived). 20–40% error. Seller scales team by eye.",
      impact: "Staffing, preparation, dashboard confidence",
    },
    {
      rank: 7,
      title: "Operations map with weak UX and assignment bugs",
      mentions: 3,
      sources: ["Stores", "Product", "OPS"],
      stores: "4/4 stores",
      summary:
        "Most used screen at peak. Assigning courier kicks you off the map. Store pin disappeared. They want map + kanban together.",
      impact: "Order distribution, TML 10, Saturday bottleneck",
    },
    {
      rank: 8,
      title: "Order distribution fails at peak",
      mentions: 3,
      sources: ["Stores", "OPS"],
      stores: "3/4 stores",
      summary:
        "Order does not reach courier app without refresh. App freezes. Available courier appears offline. Telegram still used.",
      impact: "TML 10, SLA 35, courier productivity",
    },
    {
      rank: 9,
      title: "Notification center / inbox for seller",
      mentions: 3,
      sources: ["Product", "OPS"],
      stores: "Validated in meetings",
      summary:
        "Communication via WhatsApp unsustainable. Bolivia test. Promotions, new SKUs, NPS, PDFs in one place.",
      impact: "Feature adoption, combos, commercial communication",
    },
    {
      rank: 10,
      title: "Manual reports and reconciliation",
      mentions: 3,
      sources: ["Stores", "OPS"],
      stores: "3/4 stores",
      summary:
        "Excel, notebook, WhatsApp for payments and taxes. End-of-day close with SKU detail requested by Andre.",
      impact: "Seller time, errors, financial confidence",
    },
  ] as SynthesisTheme[],
  convergences: [
    "Broken tracking/GPS is root cause of late-order tickets (stores + CX) and the 2nd most accessed screen (product)",
    "Inventory with quantity unlocks fill rate, stockout AND incomplete-order disputes (stores + CX + OPS)",
    "Off-platform communication (WhatsApp) creates operational risk in stores and 40% of CX tickets",
    "Overlapping and distribution algorithm concentrate pain at peak — idle courier at one store, overload at another",
    "Inaccurate KPIs and forecast prevent daily management — seller, OPS and product ask for the same thing in different ways",
    "Outdated manuals: seller does not understand SLA — cited in stores, product (Top Stores) and OPS",
  ],
  criticalPriorities: [
    {
      rank: 1,
      title: "Fix real-time GPS tracking (seller + consumer + courier)",
      why: "Theme #1 by frequency (4 sources, 4 stores). CX confirms delay is a display problem, not a real delivery problem.",
      evidence: [
        { source: "Stores", detail: "4/4 stores: pin stuck, tracking disappears on return, ~80% of customers complain" },
        { source: "CX", detail: "Main volume of late-order tickets; map does not follow reality" },
        { source: "Product", detail: "Map is the 2nd most accessed screen; known problem validated in the field" },
        { source: "OPS", detail: "Inefficient courier tracking; failures when closing orders impact SLA" },
      ],
      suggestion:
        "Prioritize pin update fix in foreground/background. Arrival notification to consumer. Offline couriers panel for CX/OPS.",
      owners: "Eng. Seller/Courier + CX (Diego)",
    },
    {
      rank: 2,
      title: "Inventory with quantity and auto-decrement",
      why: "Unanimous priority across 4 stores. Blocks fill rate, creates false stockout and prevents validating CX disputes.",
      evidence: [
        { source: "Stores", detail: "Los Alpes: 'top priority'. Bahia wants quantity field + auto-decrement" },
        { source: "CX", detail: "Impossible to validate what was missing without real quantity" },
        { source: "OPS", detail: "Minimum vs general portfolio confusing; manual and slow stock audit" },
        { source: "Product", detail: "Quantity column proposal in minimum portfolio already tested in Figma" },
      ],
      suggestion:
        "Launch quantity in minimum portfolio with TADA auto-decrement. Category/brand filters. Integrate with CX disputes (missing-item selection).",
      owners: "PM Seller + Design (Vivian) + CX (Diego)",
    },
    {
      rank: 3,
      title: "Seller-customer communication within the platform",
      why: "4/4 stores request chat. CX validates MX model with pre-defined messages. Potential −40% tickets.",
      evidence: [
        { source: "Stores", detail: "100% WhatsApp/calls; courier calls 90% of the time on arrival" },
        { source: "CX", detail: "Alert center with pre-printed messages; seller takes over coordination" },
        { source: "OPS", detail: "Commercial WhatsApp unsustainable; central inbox would solve it" },
        { source: "Product", detail: "Seller×consumer chat under exploration; code against delivery reduced 30% tickets" },
      ],
      suggestion:
        "Pilot pre-defined seller→customer messages in order context. Measure impact on CX tickets. Expand to courier.",
      owners: "PM CX (Diego) + PM Seller (Canelas)",
    },
    {
      rank: 4,
      title: "Overlapping and fair distribution at peak",
      why: "3/4 stores with explicit pain. Product tests cancellation transfer. OPS: idle courier vs overloaded store.",
      evidence: [
        { source: "Stores", detail: "Churubusco compares 2 stores side by side; Bahia loses SLA due to routing" },
        { source: "Product", detail: "Expanded overlap test for cancelled orders (~3%); debate Puebla/Tijuana/Merida" },
        { source: "OPS", detail: "Match day: overloaded store does not redistribute; messages 'I have no orders'" },
        { source: "CX", detail: "Cancellation due to unsafe zone — another store could deliver" },
      ],
      suggestion:
        "Run cancellation test (2 weekends, 1 city). Parallel: 2nd algorithm version with progressive distribution at peak.",
      owners: "PM Product (Canelas) + OPS (Luis, Andre)",
    },
    {
      rank: 5,
      title: "Operational visibility: daily KPIs + cockpit + forecast",
      why: "4/4 stores without daily view. Wrong forecast in 3/4. OPS and Product request cockpit and better Top Stores.",
      evidence: [
        { source: "Stores", detail: "7-day KPIs prevent management; forecast 30 vs 7 orders documented" },
        { source: "Product", detail: "Top Stores with forecast errors; seller does not understand SLA" },
        { source: "OPS", detail: "Real-time KPI cockpit (Daniela/John); end-of-day close with SKU" },
        { source: "CX", detail: "Poorly understood metrics generate unnecessary tickets" },
      ],
      suggestion:
        "Daily filter on seller KPIs. Improve Top Stores forecast (AI tips, couriers/hour). Resume Power BI cockpit for OPS.",
      owners: "PM Seller + OPS (Daniela, John) + Data",
    },
    {
      rank: 6,
      title: "Operations map: UX + integrated map/kanban",
      why: "Critical screen at peak. Navigation bugs delay distribution. Visual request for map+kanban in all stores.",
      evidence: [
        { source: "Stores", detail: "Assigning courier kicks off map; store pin disappeared; everything red with no priority" },
        { source: "Product", detail: "2nd most accessed screen; acceptance flow evolution in progress" },
        { source: "OPS", detail: "Order heat map integrated in Admin/coverage (Nadia)" },
      ],
      suggestion:
        "Keep seller on map when assigning. Visually differentiate urgency (time remaining). Prototype map+kanban.",
      owners: "Design (Vivian) + PM Seller",
    },
    {
      rank: 7,
      title: "Courier app stability at peak",
      why: "Distribution fails on Saturdays. App freezes when closing order. Available/offline inconsistent.",
      evidence: [
        { source: "Stores", detail: "3/4 stores: order does not arrive without refresh; Mixcoac and Bahia critical" },
        { source: "OPS", detail: "Failures when closing orders; Android versions; courier offline in system" },
        { source: "Product", detail: "Courier Financial Report (Jumbo) — weekly close launching" },
      ],
      suggestion:
        "Investigate Android/OS crashes. Available/offline sync fix. Reliable new-order push. Launch courier statement.",
      owners: "PM Courier + Eng.",
    },
    {
      rank: 8,
      title: "Seller notification center + updated manuals",
      why: "Fragmented communication (WhatsApp, groups). Seller does not understand features or SLA.",
      evidence: [
        { source: "OPS", detail: "Central inbox; 2-year-old manuals; combos module priority Armando" },
        { source: "Product", detail: "Bolivia notification center test; NPS + promotions by POC" },
        { source: "Stores", detail: "Seller does not remove inactive couriers; alphabetical list makes it hard" },
      ],
      suggestion:
        "Expand Bolivia test notification center to MX. Update manuals with videos/infographics. Combos module.",
      owners: "PM Seller + Training (Manu) + Commercial (Armando)",
    },
  ] as CriticalPriority[],
  roadmap: {
    now: [
      "Fix GPS/map real-time (seller + consumer)",
      "Inventory quantity — minimum portfolio MVP",
      "Pilot pre-defined seller→customer messages",
      "Launch Courier Financial Report (Jumbo)",
      "Cancellation transfer test (define city, 2 weekends)",
    ],
    next: [
      "Daily KPI filter + Top Stores forecast",
      "Operations map: stay on screen + visual priority",
      "Seller notification center (Bolivia → MX)",
      "Real-time KPI cockpit for OPS",
      "2nd algorithm version progressive distribution (peak)",
      "CX fast-resolution flow (partial coupon, missing item)",
    ],
    later: [
      "Integrated map + kanban",
      "CRM/segmentation in Zendesk",
      "Automatic combos module",
      "Order heat map in Admin",
      "Force update consumer app",
      "CX decision tree (Uber/iFood benchmark)",
    ],
  },
};

function SourcePills({ sources }: { sources: TripSource[] }) {
  const tones: Record<TripSource, "warning" | "info" | "success" | "neutral"> = {
    Stores: "warning",
    CX: "info",
    Product: "success",
    OPS: "neutral",
  };
  return (
    <Row gap={4} wrap>
      {sources.map((s) => (
        <Pill tone={tones[s]} size="sm">{s}</Pill>
      ))}
    </Row>
  );
}

function OverallResultView() {
  const s = TRIP_SYNTHESIS;
  return (
    <Stack gap={20}>
      <Stack gap={4}>
        <H2>Overall trip result</H2>
        <Text size="small" tone="secondary">{s.period} · {s.scope}</Text>
      </Stack>

      <Callout tone="info" title="Executive summary">
        {s.executiveSummary}
      </Callout>

      <Grid columns={4} gap={10}>
        <Stat label="Stores visited" value={String(s.stats.stores)} />
        <Stat label="Interviews" value={String(s.stats.interviews)} />
        <Stat label="Cross-store themes" value={String(s.stats.crossThemes)} />
        <Stat label="Critical themes" value={String(s.stats.criticalThemes)} tone="warning" />
      </Grid>

      <Grid columns={4} gap={10}>
        <Stat label="CX topics" value={String(s.stats.cxTopics)} />
        <Stat label="Product topics" value={String(s.stats.productTopics)} />
        <Stat label="OPS topics" value={String(s.stats.opsTopics)} />
        <Stat label="Total store insights" value={String(INTERVIEW_INSIGHTS.reduce((n, st) => n + st.insights.length, 0))} />
      </Grid>

      <CollapsibleSection title="KPI alerts (Mar–Jul 2026)" defaultOpen>
        <Stack gap={6} style={{ paddingTop: 8 }}>
          {s.kpiAlerts.map((a) => (
            <Text size="small">• {a}</Text>
          ))}
        </Stack>
      </CollapsibleSection>

      <Stack gap={8}>
        <H3 style={{ margin: 0 }}>Most mentioned topics — frequency ranking</H3>
        <Text size="small" tone="secondary">
          Cross-reference of 4 stores + CX meeting + Product meeting + OPS workshop. The more sources cite a theme, the stronger the convergence.
        </Text>
        <Table
          headers={["#", "Tema", "Fontes", "Stores", "Impacto"]}
          rows={s.themes.map((t) => [
            String(t.rank),
            t.title,
            <SourcePills sources={t.sources} />,
            t.stores,
            <Text size="small" tone="secondary">{t.impact}</Text>,
          ])}
          columnAlign={["center", "left", "left", "left", "left"]}
          striped
        />
      </Stack>

      <CollapsibleSection title="Detail of the 10 most cited themes" count={10}>
        <Stack gap={10} style={{ paddingTop: 8 }}>
          {s.themes.map((t) => (
            <Card>
              <CardHeader
                trailing={<Pill tone="warning" size="sm">#{t.rank}</Pill>}
              >
                {t.title}
              </CardHeader>
              <CardBody>
                <Stack gap={6}>
                  <SourcePills sources={t.sources} />
                  <Text size="small">{t.summary}</Text>
                  <Callout tone="neutral" title="Impact">
                    {t.impact}
                  </Callout>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </CollapsibleSection>

      <Stack gap={8}>
        <H3 style={{ margin: 0 }}>Convergences — what repeated everywhere</H3>
        <Text size="small" tone="secondary">
          Patterns that appear across stores, CX, product and OPS — not isolated cases.
        </Text>
        {s.convergences.map((c) => (
          <Callout tone="neutral">{c}</Callout>
        ))}
      </Stack>

      <Stack gap={12}>
        <H3 style={{ margin: 0 }}>Suggested critical priorities</H3>
        <Text size="small" tone="secondary">
          Ordered by what appeared most in business meetings and stores, with evidence from each source and suggested action.
        </Text>
        {s.criticalPriorities.map((p) => (
          <Card>
            <CardHeader
              trailing={<Pill tone="warning" size="sm">P{p.rank}</Pill>}
            >
              {p.title}
            </CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Callout tone="warning" title="Why it is critical">
                  {p.why}
                </Callout>
                <Stack gap={6}>
                  <Text weight="semibold" size="small">Evidence by source</Text>
                  {p.evidence.map((e) => (
                    <Row gap={8} align="start">
                      <Pill tone="neutral" size="sm">{e.source}</Pill>
                      <Text size="small" style={{ flex: 1 }}>{e.detail}</Text>
                    </Row>
                  ))}
                </Stack>
                <Callout tone="success" title="Suggested action">
                  {p.suggestion}
                </Callout>
                <Text size="small" tone="tertiary">Suggested owners: {p.owners}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>

      <CollapsibleSection title="Suggested roadmap (Now / Next / Later)" defaultOpen>
        <Grid columns={3} gap={16} style={{ paddingTop: 12 }}>
          <Card>
            <CardHeader trailing="0–3 months">Now</CardHeader>
            <CardBody>
              <Stack gap={6}>
                {s.roadmap.now.map((item) => (
                  <Text size="small">• {item}</Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing="3–6 months">Next</CardHeader>
            <CardBody>
              <Stack gap={6}>
                {s.roadmap.next.map((item) => (
                  <Text size="small">• {item}</Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing="6+ months">Later</CardHeader>
            <CardBody>
              <Stack gap={6}>
                {s.roadmap.later.map((item) => (
                  <Text size="small">• {item}</Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </CollapsibleSection>

      <CollapsibleSection title="Next steps already agreed in meetings" count={CX_MEETING.nextSteps.length + PRODUTO_MEETING.nextSteps.length + DINAMICA_OPS.nextSteps.length}>
        <Grid columns={3} gap={12} style={{ paddingTop: 12 }}>
          <Stack gap={6}>
            <Text weight="semibold" size="small">CX (22/07)</Text>
            {CX_MEETING.nextSteps.map((step) => (
              <Text size="small">• {step}</Text>
            ))}
          </Stack>
          <Stack gap={6}>
            <Text weight="semibold" size="small">Product (22/07)</Text>
            {PRODUTO_MEETING.nextSteps.map((step) => (
              <Text size="small">• {step}</Text>
            ))}
          </Stack>
          <Stack gap={6}>
            <Text weight="semibold" size="small">OPS (23/07)</Text>
            {DINAMICA_OPS.nextSteps.map((step) => (
              <Text size="small">• {step}</Text>
            ))}
          </Stack>
        </Grid>
      </CollapsibleSection>

      <Text size="small" tone="tertiary">
        Synthesis cross-referencing: in-store interviews (TXT), Power BI KPIs (data-206/207/208), CX meeting, Product meeting and OPS workshop (transcripts Jul 22–23).
      </Text>
    </Stack>
  );
}

function getInterviewForStore(storeId: string): StoreInterview | undefined {
  return INTERVIEW_INSIGHTS.find((s) => s.id === storeId);
}

type MainTab = "visitas-lojas" | "reuniao-cx" | "reuniao-produto" | "dinamica-ops" | "resultado-geral";

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: "visitas-lojas", label: "Store visits (Jul 20–21)" },
  { id: "reuniao-cx", label: "CX meeting (Jul 22)" },
  { id: "reuniao-produto", label: "Product meeting (Jul 22)" },
  { id: "dinamica-ops", label: "OPS workshop (Jul 23)" },
  { id: "resultado-geral", label: "Overall result" },
];

type AppTab = "home" | "bugs" | "product" | "ux";

const APP_TABS: { id: AppTab; label: string; category?: InsightCategory }[] = [
  { id: "home", label: "Home" },
  { id: "bugs", label: "Bugs", category: "Bug" },
  { id: "product", label: "Product", category: "Product" },
  { id: "ux", label: "UX", category: "UX" },
];

function countInsights(category: InsightCategory): number {
  return INTERVIEW_INSIGHTS.reduce(
    (n, store) => n + store.insights.filter((i) => i.category === category).length,
    0,
  );
}

function MainTabBar({
  active,
  onChange,
}: {
  active: MainTab;
  onChange: (tab: MainTab) => void;
}) {
  return (
    <Card>
      <CardHeader>Agenda</CardHeader>
      <CardBody>
        <Grid columns={3} gap={8}>
          {MAIN_TABS.map((tab) => (
            <Button
              variant={active === tab.id ? "primary" : "secondary"}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
}

function AppTabBar({
  active,
  onChange,
}: {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}) {
  return (
    <Row gap={8} wrap>
      {APP_TABS.map((tab) => {
        const count = tab.category ? countInsights(tab.category) : undefined;
        const label = count !== undefined ? `${tab.label} (${count})` : tab.label;
        return (
          <Button
            variant={active === tab.id ? "primary" : "secondary"}
            onClick={() => onChange(tab.id)}
          >
            {label}
          </Button>
        );
      })}
    </Row>
  );
}

function InsightEvidenceCard({ item }: { item: InterviewInsight }) {
  return (
    <Card>
      <CardBody>
        <Stack gap={6}>
          <Row gap={8} align="center">
            <Text weight="semibold" size="small">{item.title}</Text>
            <Pill tone="neutral" size="sm">{item.source}</Pill>
          </Row>
          <Text size="small" tone="secondary">{item.detail}</Text>
          {item.quotes.length > 0 && (
            <Stack gap={4}>
              <Text weight="semibold" size="small">Quotes</Text>
              {item.quotes.map((q) => (
                <Text size="small" style={{ fontStyle: "italic" }}>"{q}"</Text>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

function CategoryInsightsView({
  category,
  selectedStore,
}: {
  category: InsightCategory;
  selectedStore: string;
}) {
  const stores =
    selectedStore === "all"
      ? INTERVIEW_INSIGHTS
      : INTERVIEW_INSIGHTS.filter((s) => s.id === selectedStore);

  const visible = stores
    .map((store) => ({
      store,
      items: store.insights.filter((i) => i.category === category),
    }))
    .filter((entry) => entry.items.length > 0);

  const total = visible.reduce((n, e) => n + e.items.length, 0);
  const universalBugs = category === "Bug" ? getUniversalBugs(selectedStore) : [];

  return (
    <Stack gap={16}>
      <Stack gap={4}>
        <H2>{CATEGORY_LABELS[category]}</H2>
        <Text size="small" tone="secondary">
          {total} items from {visible.length} store(s) · verbatim interview quotes
        </Text>
      </Stack>

      {visible.length === 0 && (
        <Callout tone="neutral">No items in this category for the selected filter.</Callout>
      )}

      {category === "Bug" && <UniversalBugsSection selectedStore={selectedStore} />}

      {category === "Bug" && universalBugs.length > 0 && visible.length > 0 && (
        <H3>By store</H3>
      )}

      {visible.map(({ store, items }) => (
        <CollapsibleSection
          title={store.name}
          count={items.length}
          trailing={store.files}
          defaultOpen
        >
          <Stack gap={12} style={{ paddingTop: 8 }}>
            {category !== "Bug" && <InterviewPhotoGallery storeId={store.id} compact />}
            {items.map((item) => (
              <InsightEvidenceCard item={item} />
            ))}
          </Stack>
        </CollapsibleSection>
      ))}
    </Stack>
  );
}

function fmtPct(v: number, decimals = 1): string {
  return `${v.toFixed(decimals).replace(".", ",")}%`;
}

function fmtPp(v: number): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1).replace(".", ",")} pp`;
}

function fillTone(v: number): "success" | "warning" | "danger" {
  if (v >= 93) return "success";
  if (v >= 90) return "warning";
  return "danger";
}

function slaTone(v: number): "success" | "warning" | "danger" {
  if (v >= 95) return "success";
  if (v >= 90) return "warning";
  return "danger";
}

function tmlTone(v: number): "success" | "warning" | "danger" {
  if (v >= 60) return "success";
  if (v >= 45) return "warning";
  return "danger";
}

function availTone(v: number): "success" | "warning" | "danger" {
  if (v >= 97) return "success";
  if (v >= 93) return "warning";
  return "danger";
}

function trendTone(v: number): "success" | "warning" | "neutral" {
  if (v > 0.5) return "success";
  if (v < -0.5) return "warning";
  return "neutral";
}

export default function Dashboard() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("visitas-lojas");
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [selectedStore, setSelectedStore] = useState<string>("all");

  const totalOrders = STORES.reduce((s, st) => s + st.orders, 0);
  const avgFill = STORES.reduce((s, st) => s + st.fillRate, 0) / STORES.length;
  const avgSla35 = STORES.reduce((s, st) => s + st.sla35, 0) / STORES.length;
  const avgTml = STORES.reduce((s, st) => s + st.tml10, 0) / STORES.length;

  const storeOptions = [
    { value: "all", label: "All stores" },
    ...STORES.map((s) => ({ value: s.id, label: s.name })),
  ];

  const filteredStores =
    selectedStore === "all" ? STORES : STORES.filter((s) => s.id === selectedStore);

  const filteredInterviewInsights =
    selectedStore === "all"
      ? INTERVIEW_INSIGHTS
      : INTERVIEW_INSIGHTS.filter((s) => s.id === selectedStore);

  const fillSeries = STORES.map((s) => ({
    name: s.name,
    data: s.monthly.fillRate,
  }));

  const tmlSeries = STORES.map((s) => ({
    name: s.name,
    data: s.monthly.tml10,
  }));

  const slaSeries = STORES.map((s) => ({
    name: s.name,
    data: s.monthly.sla35,
  }));

  const stockoutSeries = STORES.map((s) => ({
    name: s.name,
    data: s.monthly.stockout,
  }));

  const ordersSeries = STORES.map((s) => ({
    name: s.name,
    data: s.monthly.orders,
  }));

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={6}>
        <H1>Mexico City Store Visit</H1>
      </Stack>

      <MainTabBar active={activeMainTab} onChange={setActiveMainTab} />

      {activeMainTab === "visitas-lojas" && (
      <Stack gap={16}>
      <AppTabBar active={activeTab} onChange={setActiveTab} />

      {activeTab !== "home" && (
        <Row gap={12} align="center">
          <Text size="small" tone="secondary">Filter store:</Text>
          <Select value={selectedStore} onChange={setSelectedStore} options={storeOptions} />
        </Row>
      )}

      {activeTab === "bugs" && (
        <CategoryInsightsView category="Bug" selectedStore={selectedStore} />
      )}

      {activeTab === "product" && (
        <CategoryInsightsView category="Product" selectedStore={selectedStore} />
      )}

      {activeTab === "ux" && (
        <CategoryInsightsView category="UX" selectedStore={selectedStore} />
      )}

      {activeTab === "home" && (
      <>
      <Callout tone="warning" title="Main alerts for the visit">
        Bahia with fill rate in free fall (−8 pp Jun→Jul). Mixcoac with 17% stockout in Others. Churubusco with lowest TML 10 in the group (38%). Bahia and Mixcoac with SLA 35 below 90%. Interviews confirm GPS/map bugs, overlapping, and need for in-app chat — pattern repeated in Churubusco and Los Alpes.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat label="Total orders (4 stores)" value={totalOrders.toLocaleString("pt-BR")} />
        <Stat label="Average Fill Rate" value={fmtPct(avgFill)} tone={fillTone(avgFill)} />
        <Stat label="Average SLA 35" value={fmtPct(avgSla35)} tone={slaTone(avgSla35)} />
        <Stat label="TML 10 medium" value={fmtPct(avgTml)} tone={tmlTone(avgTml)} />
      </Grid>

      <H2>Store comparison</H2>
      <Table
        headers={[
          "Store",
          "Orders",
          "Fill Rate",
          "SLA 35",
          "TML 10",
          "Availability",
          "Rating",
          "Stockout",
        ]}
        rows={STORES.map((s) => [
          s.name,
          s.orders.toLocaleString("pt-BR"),
          fmtPct(s.fillRate),
          fmtPct(s.sla35),
          fmtPct(s.tml10),
          fmtPct(s.availability),
          s.rating.toFixed(2).replace(".", ","),
          fmtPct(s.stockoutAvg),
        ])}
        columnAlign={["left", "right", "right", "right", "right", "right", "right", "right"]}
        rowTone={STORES.map((s) => {
          if (s.fillRate < 91 || s.availability < 90) return "danger";
          if (s.sla35 >= 95 && s.fillRate >= 94) return "success";
          return undefined;
        })}
        striped
      />
      <Text size="small" tone="secondary">
        Linhas em vermelho: Fill Rate &lt; 91% ou Availability &lt; 90%. Linhas em verde: SLA 35
        ≥ 95% e Fill Rate ≥ 94%.
      </Text>

      <H2>Interview insights</H2>
      <Text size="small" tone="secondary">
        Summary of in-store interviews (TXT) — Bahia, Mixcoac, Los Alpes and Churubusco, Jul/2026. Organized by category with verbatim quotes.
      </Text>

      <CollapsibleSection
        title="General insights — cross-store patterns"
        count={CROSS_STORE_THEMES.length}
        trailing="Cross-store"
        defaultOpen
      >
        <CrossStoreInsightsBlock />
      </CollapsibleSection>

      <H3>By store</H3>
      <Row gap={8} wrap>
        {INTERVIEW_INSIGHTS.map((s) => (
          <Pill tone="neutral" size="sm">
            {s.name}: {s.insights.length} insights
          </Pill>
        ))}
      </Row>

      {filteredInterviewInsights.map((store) => (
        <CollapsibleSection
          title={store.name}
          count={store.insights.length}
          trailing="Interview"
          defaultOpen
        >
          <InterviewInsightBlock store={store} />
        </CollapsibleSection>
      ))}

      <CollapsibleSection title="Monthly trends (Mar–Jul 2026)" trailing="5 graphs" count={5}>
        <Stack gap={16} style={{ paddingTop: 12 }}>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader trailing="%">Monthly fill rate by store</CardHeader>
          <CardBody>
            <LineChart
              categories={MONTHS}
              series={fillSeries}
              height={220}
              valueSuffix="%"
              beginAtZero={false}
              yMin={78}
              yMax={100}
              referenceLines={[{ value: 93, label: "Target 93%", tone: "warning" }]}
            />
            <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
              Bahia dropped sharply in Jul. Mixcoac recovered after May trough (90.6%).
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing="%">Monthly TML 10 by store</CardHeader>
          <CardBody>
            <LineChart
              categories={MONTHS}
              series={tmlSeries}
              height={220}
              valueSuffix="%"
              referenceLines={[{ value: 60, label: "Target 60%", tone: "success" }]}
            />
            <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
              Los Alpes leads TML 10 (~68%). Churubusco lowest (~38%). Higher % = better.
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing="%">Monthly SLA 35 by store</CardHeader>
          <CardBody>
            <LineChart
              categories={MONTHS}
              series={slaSeries}
              height={220}
              valueSuffix="%"
              beginAtZero={false}
              yMin={82}
              yMax={100}
              referenceLines={[{ value: 95, label: "Target 95%", tone: "success" }]}
            />
            <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
              Bahia and Mixcoac below 90% in several months. Los Alpes fell from 97.7% (Mar).
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing="%">Monthly stockout by store</CardHeader>
          <CardBody>
            <LineChart
              categories={MONTHS}
              series={stockoutSeries}
              height={220}
              valueSuffix="%"
              referenceLines={[{ value: 2, label: "Target 2%", tone: "warning" }]}
            />
            <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
              Churubusco improved from 3.0% to 1.1%. Bahia and Mixcoac stable ~3%.
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader trailing="orders">Monthly order volume by store</CardHeader>
        <CardBody>
          <BarChart
            categories={MONTHS}
            series={ordersSeries}
            height={240}
            stacked={false}
          />
          <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
            Mixcoac leads volume. Los Alpes grew through May (2,133) and stabilized. Jul partial
            (~12 days).
          </Text>
        </CardBody>
      </Card>
        </Stack>
      </CollapsibleSection>

      <H2>Changes Jun → Jul 2026</H2>
      <Table
        headers={["Store", "Fill Rate", "SLA 35", "TML 10", "Availability"]}
        rows={STORES.map((s) => [
          s.name,
          <Pill tone={trendTone(s.junJul.fillRate)} size="sm">
            {fmtPp(s.junJul.fillRate)}
          </Pill>,
          <Pill tone={trendTone(s.junJul.sla35)} size="sm">
            {fmtPp(s.junJul.sla35)}
          </Pill>,
          <Pill tone={trendTone(s.junJul.tml10)} size="sm">
            {fmtPp(s.junJul.tml10)}
          </Pill>,
          <Pill tone={trendTone(s.junJul.availability)} size="sm">
            {fmtPp(s.junJul.availability)}
          </Pill>,
        ])}
        columnAlign={["left", "center", "center", "center", "center"]}
        striped
      />
      <Text size="small" tone="secondary">
        SLA 35 and TML 10: higher % = better. Mixcoac improved Fill Rate, SLA 35 and TML 10 in Jul;
        all stores gained TML 10 in the period.
      </Text>

      <Row gap={12} align="center">
        <H2 style={{ margin: 0 }}>Detail by store</H2>
        <Select
          value={selectedStore}
          onChange={setSelectedStore}
          options={storeOptions}
        />
      </Row>

      {filteredStores.map((store) => (
          <CollapsibleSection
            title={store.name}
            trailing={`${store.orders.toLocaleString("en-US")} orders`}
            defaultOpen={selectedStore === store.id}
          >
            <Stack gap={16} style={{ paddingTop: 12 }}>
              <Grid columns={5} gap={10}>
                <Stat label="Fill Rate" value={fmtPct(store.fillRate)} tone={fillTone(store.fillRate)} />
                <Stat label="SLA 35" value={fmtPct(store.sla35)} tone={slaTone(store.sla35)} />
                <Stat label="TML 10" value={fmtPct(store.tml10)} tone={tmlTone(store.tml10)} />
                <Stat label="Availability" value={fmtPct(store.availability)} tone={availTone(store.availability)} />
                <Stat label="Perfect Orders" value={fmtPct(store.perfectOrders)} />
              </Grid>

              <Grid columns={2} gap={16}>
                <Stack gap={8}>
                  <H3>Alerts</H3>
                  <Callout tone="danger">
                    {store.alerts.map((a) => `• ${a}`).join("\n")}
                  </Callout>
                </Stack>
                <Stack gap={8}>
                  <H3>Positives</H3>
                  <Callout tone="success">
                    {store.positives.map((p) => `• ${p}`).join("\n")}
                  </Callout>
                </Stack>
              </Grid>

              {store.stockoutCats && (
                <Stack gap={8}>
                  <H3>Stockout by category (%)</H3>
                  <BarChart
                    categories={Object.keys(store.stockoutCats)}
                    series={[
                      {
                        name: "Stockout",
                        data: Object.values(store.stockoutCats),
                        tone: "danger",
                      },
                    ]}
                    height={160}
                    horizontal
                    valueSuffix="%"
                    showValues
                  />
                </Stack>
              )}

              {getInterviewForStore(store.id) && (
                <Stack gap={8}>
                  <H3>In-store interview — highlights</H3>
                  <Callout tone="neutral">
                    <Stack gap={4}>
                      {getInterviewForStore(store.id)!.highlights.map((h) => (
                        <Text size="small">• {h}</Text>
                      ))}
                    </Stack>
                  </Callout>
                </Stack>
              )}
            </Stack>
          </CollapsibleSection>
      ))}

      <Card>
        <CardHeader>Quick ranking — leaders and stores needing attention</CardHeader>
        <CardBody>
          <Grid columns={2} gap={20}>
            <Stack gap={10}>
              <Text weight="semibold">Best performance</Text>
              <Text size="small">TML 10: Los Alpes (67,8%)</Text>
              <Text size="small">Fill Rate: Los Alpes (94,7%)</Text>
              <Text size="small">SLA 35: Los Alpes (95,2%)</Text>
              <Text size="small">Availability: Los Alpes (98,6%)</Text>
              <Text size="small">Rating: Bahia and Los Alpes (4.91)</Text>
              <Text size="small">Lowest stockout: Los Alpes (1.3%)</Text>
            </Stack>
            <Stack gap={10}>
              <Text weight="semibold">Needs attention on visit</Text>
              <Text size="small">Fill Rate: Bahia (90.9%) — sharp drop</Text>
              <Text size="small">SLA 35: Bahia e Mixcoac (88,7%)</Text>
              <Text size="small">TML 10: Churubusco (38,0%)</Text>
              <Text size="small">Availability: Mixcoac (89,1%)</Text>
              <Text size="small">Critical stockout: Mixcoac Others (17%)</Text>
            </Stack>
          </Grid>
        </CardBody>
      </Card>

      <CollapsibleSection title="INTERVIEW SCRIPT" trailing="Jul/2026">
        <Stack gap={10} style={{ paddingTop: 8 }}>
          <Text size="small" tone="secondary">
            Mexico interview script — Seller (60 min) + Courier (30 min). English in each block.
          </Text>
          {ROTEIRO_BLOCKS.map((block) => (
            <CollapsibleSection title={block.title}>
              <RoteiroBody body={block.body} />
            </CollapsibleSection>
          ))}
        </Stack>
      </CollapsibleSection>

      <Text size="small" tone="tertiary">
        Source: Power BI exports (data-206 daily KPIs, data-207/208 stockout) · Filtered period
        01/03/2026–13/07/2026 · Jul partial (~13 days)
      </Text>
      </>
      )}
      </Stack>
      )}

      {activeMainTab === "reuniao-cx" && <CxMeetingView />}

      {activeMainTab === "reuniao-produto" && <ProductMeetingView />}

      {activeMainTab === "dinamica-ops" && <DinamicaOpsView />}

      {activeMainTab === "resultado-geral" && <OverallResultView />}
    </Stack>
  );
}

