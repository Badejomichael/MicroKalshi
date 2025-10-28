import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  open: boolean;
  onClose: () => void;
  marketQuestion: string;
  choice: "yes" | "no" | null;
};

export default function VoteModal({ open, onClose, marketQuestion, choice }: Props) {
  const [stage, setStage] = useState<"preview" | "processing" | "done">("preview");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (open) setStage("preview");
  }, [open]);

  const fakePrice = choice === "yes" ? "20" : "15";
  const fakeQuantity = "10";

  useEffect(() => {
    if (stage === "processing") {
      const timer = setTimeout(() => setStage("done"), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleClose = () => {
    onClose();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

   const handleCancel = () => {
    onClose();
  };

  const toastColor = choice === "yes" ? "mk-toast-green" : "mk-toast-red";

  if (!open)
    return (
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`mk-toast ${toastColor}`}
          >
            ✅ Order Filled ({choice?.toUpperCase()}) — Simulation
          </motion.div>
        )}
      </AnimatePresence>
    );

  const displayTitle =
    choice === "yes"
      ? `You’re going long on "${marketQuestion}"`
      : choice === "no"
      ? `You’re going short on "${marketQuestion}"`
      : "";

  return (
    <>
      <div className="mk-modal-backdrop" onClick={handleClose}>
        <motion.div
          className="mk-modal"
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            {stage === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3>{displayTitle}</h3>
                <div style={{ margin: "12px 0", fontSize: "14px" }}>
                  <p>Order Summary:</p>
                  <p><strong>Side:</strong> {choice?.toUpperCase()}</p>
                  <p><strong>Price:</strong> ${fakePrice}</p>
                  <p><strong>Quantity:</strong> {fakeQuantity} contracts</p>
                </div>
                <button className="btn btn-yes" onClick={() => setStage("processing")}>
                  Place Order
                </button>
                <button className="btn btn-no" onClick={handleCancel}>
                  Cancel
                </button>
              </motion.div>
            )}

            {stage === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ textAlign: "center" }}
              >
                <AiOutlineLoading3Quarters className="spin" size={36} color="#2dd4bf" />
                <p style={{ marginTop: "10px", fontSize: "14px" }}>Placing order...</p>
              </motion.div>
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ textAlign: "center" }}
              >
                <FaCheckCircle size={40} color="#2dd4bf" />
                <h3 style={{ marginTop: "10px" }}>Order Confirmed!</h3>
                <p className="muted" style={{ marginTop: 8 }}>
                  Demo order confirmed — no real funds or trades were executed.
                </p>
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`mk-toast ${toastColor}`}
          >
            ✅ Order Filled ({choice?.toUpperCase()}) — Simulation
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
