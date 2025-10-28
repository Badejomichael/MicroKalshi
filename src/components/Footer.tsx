"use client";

import { motion } from "framer-motion";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="footer"
    >
      <div
        style={{
          background: "var(--card)",
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: "var(--radius)",
          padding: "18px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/kalshi-logo.jpg"
            alt="MicroKalshi"
            width={24}
            height={24}
            className="rounded-sm opacity-90"
          />
          <span style={{ fontWeight: 600, letterSpacing: "-0.3px" }}>
            MicroKalshi
          </span>
        </div>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "13px",
            margin: "0",
            textAlign: "center",
          }}
        >
          Built by Michael — exploring prediction markets with style ⚡
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            fontSize: "16px",
            color: "var(--muted)",
          }}
        >
          <Link
            href="https://x.com/emperormikel_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-icon"
            aria-label="Twitter"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://github.com/Badejomichael/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-icon"
            aria-label="GitHub"
          >
            <FaGithub />
          </Link>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "var(--muted)",
            opacity: 0.7,
            marginTop: "4px",
          }}
        >
          © {new Date().getFullYear()} MicroKalshi. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

