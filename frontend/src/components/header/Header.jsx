// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import logo from "../../assets/argentBankLogo.png"; // adapte le chemin selon ton projet
import "./header.css"

function Header({ user, showLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>

      <div className="navi">
        {user && showLogout ? (
          <>
          <div className="header-navi">
            <Link className="main-nav-item" to="/profile">
              {user.userName}
              <i className="fa fa-user-circle"></i>

            </Link>
            <i className="fa fa-sign-out"></i>
            <button className="main-nav-item button-sign" onClick={handleLogout}>
              
              Sign Out
            </button>
            </div>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
    
  );
}

export default Header;
