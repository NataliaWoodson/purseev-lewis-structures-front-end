import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <header>
      <nav className="navbar">
        {/* <img src="transparent-100.jpg" alt="" width={100} /> */}
        <img src="purseev-logo.png" className="logo" alt="" height={100} />
        <ul
          className={isMobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setIsMobile(false)}
        >
          {/* <h1 id="logo-name">Purseev</h1> */}
          {/* <li className="hamburger-menu">
            <img src="noun-menu.png" alt="" width={50} />
          </li> */}
          <Link to="/" className="home">
            <li>Game page</li>
          </Link>
          <Link to="/aboutus" className="aboutus">
            <li>About us</li>
          </Link>
          {/* <li className="hamburger-menu">
            <img id="account-img" src="noun-account.png" alt="" width={50} />
          </li> */}
        </ul>
        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? (
            <i className="hamburger-menu"></i>
          ) : (
            <i className="hamburger-menu"></i>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
