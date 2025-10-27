import React from "react";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  marketQuestion: string;
  choice: "yes" | "no" | null;
};

export default function VoteModal({ open, onClose, marketQuestion, choice }: Props) {
  if (!open) return null;

  const displayText =
    choice === "yes"
      ? `You voted YES on "${marketQuestion}" 🎯`
      : choice === "no"
      ? `You voted NO on "${marketQuestion}" ❌`
      : "";

  return (
    <div className="mk-modal-backdrop" onClick={onClose}>
      <motion.div
        className="mk-modal"
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{displayText}</h3>
        
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </div>
  );
}
