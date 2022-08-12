import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            {/* <img src="transparent-100.jpg" alt="" width={100} /> */}
            <img src="purseev-logo.png" alt="" height={100} />
          </li>
          <li>{/* <h1 id="logo-name">Purseev</h1> */}</li>
          <li className="hamburger-menu">
            <img src="noun-menu.png" alt="" width={50} />
          </li>
          <li>
            <Link to="/aboutus">about us</Link>
          </li>
          <li className="hamburger-menu">
            <img id="account-img" src="noun-account.png" alt="" width={50} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
