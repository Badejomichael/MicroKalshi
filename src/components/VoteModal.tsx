import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
  marketQuestion: string;
  choice: "yes" | "no" | null;
};

export default function VoteModal({ open, onClose, marketQuestion, choice }: Props) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(true);
  const [fakePrice, setFakePrice] = useState(0);
  const [fakeOrderId, setFakeOrderId] = useState("");
  const [fakeQty, setFakeQty] = useState(0);

  useEffect(() => {
    if (open) {
      // Randomize fake order data
      const randomPrice = (Math.random() * 9 + 1).toFixed(2);
      const randomOrderId = "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const randomQty = Math.floor(Math.random() * 5) + 1;
      setFakePrice(Number(randomPrice));
      setFakeOrderId(randomOrderId);
      setFakeQty(randomQty);

      const timer = setTimeout(() => setIsPlacingOrder(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [open]);

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
        <AnimatePresence mode="wait">
          {isPlacingOrder ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>Placing your simulated order...</h3>
              <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: 30,
                  height: 30,
                  border: "3px solid rgba(255,255,255,0.1)",
                  borderTop: "3px solid var(--green)",
                  borderRadius: "50%",
                  margin: "16px auto",
                }}
              />
              <p className="muted">Simulating a trade on your prediction...</p>
            </motion.div>
          ) : (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <FaCheckCircle color="#2dd4bf" size={40} style={{ marginBottom: 10 }} />
              <h3>Order Confirmed</h3>
              <p className="muted">{displayText}</p>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  marginTop: 14,
                  textAlign: "left",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                <p><strong>Order ID:</strong> {fakeOrderId}</p>
                <p>
                  <strong>Filled:</strong> {fakeQty} contract{fakeQty > 1 ? "s" : ""} @ ${fakePrice}
                </p>
                <p>
                  <strong>Side:</strong>{" "}
                  <span style={{ color: choice === "yes" ? "var(--green)" : "#f87171" }}>
                    {choice?.toUpperCase()}
                  </span>
                </p>
              </div>

              <p className="muted" style={{ marginTop: 10 }}>
                This is a simulation — in a full product your vote would create a real trade/order.
              </p>
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
