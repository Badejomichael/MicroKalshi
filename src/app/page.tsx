"use client";

import React, { useEffect, useState } from "react";
import { markets as initialMarkets, Market } from "../utils/markets";
import MarketCard from "../components/MarketCard";
import VoteModal from "../components/VoteModal";
import Footer from "../components/Footer"
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChoice, setModalChoice] = useState<"yes" | "no" | null>(null);
  const [modalQuestion, setModalQuestion] = useState("");

  // Simulate subtle probability drift every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setMarkets((prev) =>
        prev.map((m) => {
          // random small delta between -1.5 and 1.5
          const deltaYes = (Math.random() - 0.5) * 3;
          let newYes = m.yes + deltaYes;
          newYes = Math.max(5, Math.min(95, newYes));
          const newNo = 100 - newYes;
          return { ...m, yes: newYes, no: newNo };
        })
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const handleVote = (id: number, choice: "yes" | "no") => {
    setMarkets((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        // simulate a vote shifting probability towards chosen side
        const shift = choice === "yes" ? 1.8 + Math.random() * 3 : -(1.8 + Math.random() * 3);
        let yes = m.yes + shift;
        yes = Math.max(2, Math.min(98, yes));
        const no = 100 - yes;
        return { ...m, yes, no };
      })
    );

    const chosenMarket = markets.find((m) => m.id === id);
    setModalQuestion(chosenMarket?.question ?? "");
    setModalChoice(choice);
    setModalOpen(true);
  };

  const totalVolumeSim = markets.reduce((acc, m) => acc + Math.round((m.yes + m.no) * 10), 0);

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand">
          <Image src="/kalshi-logo.jpg" alt="Kalshi logo" width={36} height={36} className="rounded-sm opacity-90"/>
          <div className="brand-text">
            <h1>MicroKalshi</h1>
            <p className="tag">Predict the Future — MicroKalshi demo</p>
          </div>
        </div>
        <div className="nav-right">
          <a className="cta" href="#" onClick={(e) => e.preventDefault()}>
            Try Demo
          </a>
        </div>
      </header>

      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Explore what people believe about the future</h2>
          <p className="muted">
            A small dashboard showing a handful of event markets with simulated probabilities.
          </p>
        </motion.div>

        <div className="grid">
          <div className="col main">
            <div className="markets-grid">
              {markets.map((m) => (
                <MarketCard key={m.id} market={m} onVote={handleVote} />
              ))}
            </div>
          </div>

          <aside className="col side">
            <motion.div className="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Market Insights</h3>
              <p className="muted">Simulated stats</p>
              <div className="ins-row">
                <div>
                  <p className="stat">{markets.length}</p>
                  <p className="muted">Active markets</p>
                </div>
                <div>
                  <p className="stat">${totalVolumeSim.toLocaleString()}</p>
                  <p className="muted">Total Volume (sim)</p>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <h4>Top category</h4>
                <p className="muted">Crypto</p>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      <VoteModal open={modalOpen} onClose={() => setModalOpen(false)} marketQuestion={modalQuestion} choice={modalChoice} />
      
      <Footer />
    </main>
  );
}
