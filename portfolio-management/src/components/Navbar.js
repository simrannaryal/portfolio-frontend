import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Portfolio Management</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
      </div>
    </nav>
  );
}
