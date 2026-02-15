import { Link, useNavigate, useParams } from "react-router";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="card">
        <div className="cardInner">
          <h2 className="h2">Product not found</h2>
          <p className="muted">We couldn’t find a product with id: <b>{id}</b></p>
          <Link className="btn" to="/products">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="cardInner">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
          <div>
            <h2 className="h2" style={{ marginBottom: 6 }}>{product.name}</h2>
            <div className="muted">Category: <span style={{ color: "rgba(255,255,255,0.85)" }}>{product.category}</span></div>
          </div>
          <div className="pill" style={{ fontWeight: 800 }}>${product.price}</div>
        </div>

        <p className="muted" style={{ marginTop: 14, lineHeight: 1.6 }}>
          {product.description}
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button className="btn" onClick={() => navigate(-1)}>← Back</button>
          <Link className="btn" to="/products">All Products</Link>
        </div>
      </div>
    </div>
  );
}