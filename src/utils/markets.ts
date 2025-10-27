export type Market = {
  id: number;
  question: string;
  yes: number; // percent
  no: number; // percent
  category: string;
  description?: string;
};

export const markets: Market[] = [
  {
    id: 1,
    question: "Will BTC hit $200K by December 31, 2025?",
    yes: 62,
    no: 38,
    category: "Crypto",
    description: "Short-term macro + adoption-driven move."
  },
  {
    id: 2,
    question: "Will the US pass a comprehensive AI regulation by 2026?",
    yes: 47,
    no: 53,
    category: "Politics",
    description: "National-level regulatory action on AI."
  },
  {
    id: 3,
    question: "Will ETH overtake BTC in market cap by 2030?",
    yes: 33,
    no: 67,
    category: "Crypto",
    description: "Long-term structural shift in crypto."
  },
  {
    id: 4,
    question: "Will global average temperature anomaly exceed +1.5°C in any month by 2028?",
    yes: 28,
    no: 72,
    category: "Weather",
    description: "Climate variability and extreme month-level spikes."
  }
];