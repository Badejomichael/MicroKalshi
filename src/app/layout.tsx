import "./globals.css";
import React from "react";

export const metadata = {
  title: "MicroKalshi — Prediction Dashboard",
  description: "Small Next.js demo inspired by Kalshi — interactive event markets."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/kalshi-logo.jpg" />

                
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="app-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
