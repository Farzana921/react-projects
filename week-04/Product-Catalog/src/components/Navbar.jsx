import { NavLink} from "react-router";
export default function Navbar() {
    const linkstyle = ({isActive }) => ({
        textDecoration: isActive ? "underline" : "none",
        fontWeight : isActive ? "800" : "500",
        marginRight: 12,
    });

    return (
        <nav style={{padding: 12, borderBotton: "1px solid #ddd"}}>
            <NavLink to="/" style={linkStyle} end>
            Home
            </NavLink>
            <NavLink to="/products" style={linkstyle}>
             Products     
            </NavLink>
        </nav>
    );
    
}