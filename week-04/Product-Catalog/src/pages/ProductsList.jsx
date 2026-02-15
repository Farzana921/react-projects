import { Link } from "react-router";
import { products } from "../data/products";

export default function ProductsList() {
  return (
    <div>
      <h2 className="h2">All Products</h2>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div className="cardInner">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{p.name}</div>
                <div className="pill">${p.price}</div>
              </div>

              <div className="muted" style={{ marginTop: 8 }}>
                Category: <span style={{ color: "rgba(255,255,255,0.85)" }}>{p.category}</span>
              </div>

              <div style={{ marginTop: 12 }}>
                <Link className="btn" to={`/products/${p.id}`}>View Details →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}