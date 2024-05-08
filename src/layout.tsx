import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  // return <div></div>;
  return (
    <header className="header">
      <nav className="navbar">
        <ul
          className="nav-menu"
          style={{
            overflowX: "scroll",
            // maxWidth: store.screenSize().width - 20,
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/crearecont">Creare Cont</Link>
          </li>

          <li>
            <Link to="/initial">Valori Initiale</Link>
          </li>

          <li>
            <Link to="/taxe">Valori Taxe</Link>
          </li>
          <li>
            <Link to="/firme">Firme</Link>
          </li>
          <li>
            <Link to="/angajati">Angajati</Link>
          </li>
          <li>
            <Link to="/salarii">Salarii</Link>
          </li>

          <li>
            <Link to="/accounting">Accounting</Link>
          </li>
          <li>
            <Link to="/pdfimport">Pdf Import</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </header>
  );
};

export default Layout;
