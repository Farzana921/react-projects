import { Link } from "react-router";

export default function NotFound() {
  return (
    <div style={{ padding: 16 }}>
      <h1>404 - Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
