// src/components/Header.jsx
import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png"; // adapte le chemin selon ton projet
import "./header.css"

function Header() {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
    
  );
}

export default Header;
