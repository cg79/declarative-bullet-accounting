import "./App.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
// import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primeicons/primeicons.css";

// primereact/resources/themes/bootstrap4-light-blue/theme.css
// primereact/resources/themes/bootstrap4-light-purple/theme.css
// primereact/resources/themes/bootstrap4-dark-blue/theme.css
// primereact/resources/themes/bootstrap4-dark-purple/theme.css
// primereact/resources/themes/md-light-indigo/theme.css
// primereact/resources/themes/md-light-deeppurple/theme.css
// primereact/resources/themes/md-dark-indigo/theme.css
// primereact/resources/themes/md-dark-deeppurple/theme.css
// primereact/resources/themes/mdc-light-indigo/theme.css
// primereact/resources/themes/mdc-light-deeppurple/theme.css
// primereact/resources/themes/mdc-dark-indigo/theme.css
// primereact/resources/themes/mdc-dark-deeppurple/theme.css

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./home";
import NoPage from "./no-page";
import { DemoAccounting } from "./functionalities/transactions/root/demo-accounting";
import { Login } from "./functionalities/user/login";
import GuardedRoute1 from "./functionalities/home/guarder-route";
import { AccountingInitialValues } from "./functionalities/initial-values/accounting-initial-values";
import { CountryTaxesList } from "./functionalities/taxes/CountryTaxesList";
import { CompanyAngajati } from "./functionalities/employee/list/company-angajati";
import { AngajatSalaryList } from "./functionalities/employee/salary/list/angajat-salary-list";
import { CompanyList } from "./functionalities/company/list/company-list";
import { PdfImport } from "./functionalities/import-extrase/pdf-import/pdf-import";
import { CreateAccount } from "./functionalities/user/create-account";

import { Terms } from "./functionalities/terms/terms";
import { Feedback } from "./functionalities/feedback/feedback";
import { DeleteAccount } from "./functionalities/account/delete-account/delete-account";

import { Navbar } from "./functionalities/home/navbar/Navbar";

import { LamdaFunctions } from "./functionalities/lamda/lamda_functions";
import { Contact } from "./functionalities/contact/contact";
import useIdentity from "./_store/useIdentity";
import Start from "./functionalities/start/start";
import { useBetween } from "use-between";
import Footer from "./functionalities/footer/Footer";
import { TodoList } from "./functionalities/todo/list/todo-list";
import { BancaList } from "./functionalities/banca/list/banca-list";

// const useScreenSize = () => {
//   const [screenSize, setScreenSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       const newSize = {
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };
//       setScreenSize(newSize);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return screenSize;
// };

function App() {
  const { loggedUser } = useBetween(useIdentity);
  return (
    <div>
      <div className="" style={{ minHeight: "90vh" }}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
          </div>

          <div className="">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="login" element={<Login />} />

                <Route index element={<Home />} />

                <Route
                  path="accounting"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <DemoAccounting />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="todo"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <TodoList />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="banci"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <BancaList />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="stergerecont"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <DeleteAccount />
                    </GuardedRoute1>
                  }
                />

                <Route path="start" element={<Start />} />
                <Route path="termeni" element={<Terms />} />
                <Route path="feedback" element={<Feedback />} />

                <Route
                  path="taxe"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CountryTaxesList />
                    </GuardedRoute1>
                  }
                />

                <Route path="contact" element={<Contact />} />

                <Route path="crearecont" element={<CreateAccount />} />

                <Route
                  path="initial"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <AccountingInitialValues />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="firme"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CompanyList />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="angajati"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CompanyAngajati />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="salarii"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <AngajatSalaryList />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="pdfimport"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <PdfImport />
                    </GuardedRoute1>
                  }
                />
                <Route
                  path="lamda"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <LamdaFunctions />
                    </GuardedRoute1>
                  }
                />

                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
        {/* <BulletLogsComponent eventName="LOGS"></BulletLogsComponent> */}
        {/* <FacturaEditor></FacturaEditor> */}
        {/* <LamdaFunctions></LamdaFunctions> */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
