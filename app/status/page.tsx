export default function StatusPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 600, margin: "80px auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Futuvara Demo</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Current time: {new Date().toLocaleString()}
      </p>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#16a34a",
          color: "#fff",
          padding: "6px 16px",
          borderRadius: 9999,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Operational
      </span>
    </div>
  );
}
