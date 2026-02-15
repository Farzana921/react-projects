import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="card">
      <div className="cardInner">
        <h1 className="h1">404</h1>
        <p className="muted">That page doesn’t exist.</p>
        <Link className="btn" to="/">Go Home</Link>
      </div>
    </div>
  );
}