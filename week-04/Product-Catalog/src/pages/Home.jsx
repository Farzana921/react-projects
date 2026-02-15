import { Link } from "react-router";

export default function Home() {
  return (
    <div className="card">
      <div className="cardInner">
        <h1 className="h1">Welcome</h1>
        <p className="muted" style={{ lineHeight: 1.6 }}>
          This is a React Router v7 Product Catalog with nested routes, dynamic product details,
          and a clean modern UI.
        </p>

        <div style={{ marginTop: 14 }}>
          <Link className="btn" to="/products">Browse Products →</Link>
        </div>
      </div>
    </div>
  );
}