const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <img src="transparent-100.jpg" alt="" width={100} />
          </li>
          <li>
            <h1 id="logo-name">Purseev</h1>
          </li>
          <li className="hamburger-menu">
            <img src="noun-menu.png" alt="" width={50} />
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