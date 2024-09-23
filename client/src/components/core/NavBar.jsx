import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";
import { useCart } from "../../pages/foodManagement/context/CartContext";
import { useAuth } from "../../pages/foodManagement/context/authContext";

const NavBar = ({ name }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const { cart } = useCart();
  const { authState, logout, user } = useAuth();

  useEffect(() => {
    setCurrentPage(name);
  }, [name]);

  return (
    <nav className={styles.nav}>
      <img src="/logo.png" alt="logo" className={styles.logo} />
      <div className="navlinks">
        <Link
          to="/"
          className={styles.link}
          style={{
            backgroundColor: currentPage === "home" ? "white" : "transparent",
            color: currentPage === "home" ? "black" : "white",
          }}
        >
          Home
        </Link>
        <Link
          to="/games"
          className={styles.link}
          style={{
            backgroundColor: currentPage === "games" ? "white" : "transparent",
            color: currentPage === "games" ? "black" : "white",
          }}
        >
          Games
        </Link>
        <Link
          to="/movies"
          className={styles.link}
          style={{
            backgroundColor: currentPage === "movies" ? "white" : "transparent",
            color: currentPage === "movies" ? "black" : "white",
          }}
        >
          Movies
        </Link>
        <Link
          to="/food/start"
          className={styles.link}
          style={{
            backgroundColor: currentPage === "foods" ? "white" : "transparent",
            color: currentPage === "foods" ? "black" : "white",
          }}
        >
          Foods
        </Link>
        <Link
          to="/eventdashboard"
          className={styles.link}
          style={{
            backgroundColor: currentPage === "events" ? "white" : "transparent",
            color: currentPage === "events" ? "black" : "white",
          }}
        >
          Events
        </Link>
        <Link
          to="/support"
          className={styles.link}
          style={{
            backgroundColor:
              currentPage === "support" ? "white" : "transparent",
            color: currentPage === "support" ? "black" : "white",
          }}
        >
          Support
        </Link>
        {authState.isAuthenticated && currentPage === "foods" ? (
        <Link to="/cart" style={{ color: "white" }}>
        🛒 Cart ({cart.length})
        </Link>
        ) : (
        <></>
        )}
        

        {authState.isAuthenticated ? (
          <Link to="/" className={styles.link}>
            <button type="button" className={styles.signIn} onClick={logout}>
              Log out
            </button>
          </Link>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              <button type="button" className={styles.signIn}>
                Sign in
              </button>
            </Link>
            <Link to="/RegistrationForm" className={styles.link}>
              <button type="button" className={styles.register}>
                Register
              </button>
            </Link>
          </>
        )}

        {user && user.user.role ? (

          user.user.role === 'Manager' ? (<Link to="/admin-dash" className={styles.link}>
            <button type="button" className={styles.register}>
              Admin portal
            </button>
          </Link>) : (<Link to="/staffmemberdash" className={styles.link}>
            <button type="button" className={styles.register}>
              My Dashboard
            </button>
          </Link>)
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
