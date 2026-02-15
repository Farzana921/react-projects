import { NavLink } from "react-router";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: isActive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
    fontWeight: 700,
    color: "rgba(255,255,255,0.92)",
  });

  return (
    <div className="container" style={{ paddingTop: 18, paddingBottom: 10 }}>
      <div className="card">
        <div className="cardInner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>Product Catalog</div>
            <div className="muted" style={{ fontSize: 13 }}>React Router v7 • Nested Routes</div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <NavLink to="/" style={linkStyle} end>Home</NavLink>
            <NavLink to="/products" style={linkStyle}>Products</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}