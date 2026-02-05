import { Link } from "react-router";
import { products } from "../data/products";

export default function ProductsList() {
  return (
    <div>
      <h2>All Products</h2>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <p style={{ margin: "6px 0" }}><b>Price:</b> ${p.price}</p>
            <p style={{ margin: "6px 0" }}><b>Category:</b> {p.category}</p>
            <Link to={`/products/${p.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
