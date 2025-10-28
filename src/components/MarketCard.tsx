import React, { useState } from "react";
import { Market } from "../utils/markets";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

type Props = {
  market: Market;
  onVote: (id: number, choice: "yes" | "no") => void;
};

export default function MarketCard({ market, onVote }: Props) {
  const [voting, setVoting] = useState(false);

  const handleVote = (choice: "yes" | "no") => {
    setVoting(true);
    onVote(market.id, choice);
    setTimeout(() => setVoting(false), 600);
  };

  const yesPercent = Math.round(market.yes);
  const noPercent = Math.round(market.no);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -4 }}
      className="market-card"
    >
      <div className="market-head">
        <div>
          <h4 className="question">{market.question}</h4>
          <div className="meta">
            <span className="category">{market.category}</span>
            {market.description && <span className="dot">•</span>}
            {market.description && <span className="muted">{market.description}</span>}
          </div>
        </div>
      </div>

      <div className="probabilities">
        <div className="prob-row">
          <div className="label"><FaCheck /> YES</div>
          <div className="bar-wrap" aria-hidden>
            <div className="bar-bg">
              <motion.div
                className="bar-yes"
                animate={{ width: `${yesPercent}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 16 }}
              />
            </div>
          </div>
          <div className="percent">{yesPercent}%</div>
        </div>

        <div className="prob-row">
          <div className="label"><FaTimes /> NO</div>
          <div className="bar-wrap" aria-hidden>
            <div className="bar-bg">
              <motion.div
                className="bar-no"
                animate={{ width: `${noPercent}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 16 }}
              />
            </div>
          </div>
          <div className="percent">{noPercent}%</div>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn btn-yes" onClick={() => handleVote("yes")} disabled={voting}>
          Vote YES
        </button>
        <button className="btn btn-no" onClick={() => handleVote("no")} disabled={voting}>
          Vote NO
        </button>
      </div>
    </motion.article>
  );
}
