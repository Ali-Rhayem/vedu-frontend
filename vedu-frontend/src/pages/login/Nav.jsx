import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { navItems } from "../../constants";

const Navbar = ({ showButtons }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
            <span className="logo-text">VEDU</span>
          </div>
          {showButtons && (
            <div className="nav-actions">
              <a href="#" className="btn-signin" onClick={handleSignInClick}>
                Sign In
              </a>
              <a href="#" className="btn-create" onClick={handleRegister}>
                Register
              </a>
            </div>
          )}
          <div className="menu-toggle">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="mobile-menu">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            {showButtons && (
              <div className="mobile-actions">
                <a href="#" className="btn-signin">
                  Sign In
                </a>
                <a href="#" className="btn-create">
                  Create an account
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;