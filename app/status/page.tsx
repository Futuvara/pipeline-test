"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "48px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Futuvara Demo</h1>
      <p style={{ color: "#555", marginBottom: "16px" }}>{currentTime}</p>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#22c55e",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        Operational
      </span>
    </div>
  );
}
