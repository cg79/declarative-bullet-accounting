import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/accounting">Accounting</Link>
          </li>
         
        </ul>
      </nav>

      <Outlet />
    </header>
  );
};

export default Layout;
