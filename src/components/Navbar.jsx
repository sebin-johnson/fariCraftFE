import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { isAuthTokenContext } from "../Context/ContextShare";
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detect route change
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  // Check login status on route change or reload
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // re-run on location (URL) change

  const logout = () => {
    toast.success("Logout successfull")
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    setIsAuthToken(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark px-4">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/faircraft.svg"
              alt="FairCraft Logo"
              className="me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="fw-bold fs-4" style={{ color: "#9F70FD" }}>
              FairCraft
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={{ color: "#9F70FD" }}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" style={{ color: "#9F70FD" }}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/project" style={{ color: "#9F70FD" }}>
                  Project
                </NavLink>
              </li>
            </ul>

            <div className="d-flex ms-lg-3">
              {isLoggedIn ? (
                <button onClick={logout} className="btn btn-primary">Logout</button>
              ) : (
                <Link to="/login" className="btn btn-primary">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <hr className="m-0 border-secondary" />
    </>
  );
};

export default Navbar;
