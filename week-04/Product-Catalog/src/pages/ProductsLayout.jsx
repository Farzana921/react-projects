import { Outlet } from "react-router";

export default function ProductsLayout() {
  return (
    <div className="card">
      <div className="cardInner">
        <h1 className="h1">Products</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Browse the catalog. Filter controls can go here later.
        </p>
        <div style={{ height: 1, background: "rgba(255,255,255,0.10)", margin: "14px 0" }} />
        <Outlet />
      </div>
    </div>
  );
}