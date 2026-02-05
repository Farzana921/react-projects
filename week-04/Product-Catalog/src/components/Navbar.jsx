import { NavLink } from "react-router";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "800" : "500",
    marginRight: 12,
  });

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle} end>
        Home
      </NavLink>

      <NavLink to="/products" style={linkStyle}>
        Products
      </NavLink>
    </nav>
  );
}