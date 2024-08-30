import './App.css';
import 'primereact/resources/themes/md-light-indigo/theme.css';
// import "primereact/resources/themes/md-light-deeppurple/theme.css";
import 'primeicons/primeicons.css';
import 'react-tooltip/dist/react-tooltip.css';

//import  primereact/resources/themes/bootstrap4-light-blue/theme.css
//import  primereact/resources/themes/bootstrap4-light-purple/theme.css
//import  primereact/resources/themes/bootstrap4-dark-blue/theme.css
//import  primereact/resources/themes/bootstrap4-dark-purple/theme.css
//import  primereact/resources/themes/md-light-indigo/theme.css
//import  primereact/resources/themes/md-light-deeppurple/theme.css
//import  primereact/resources/themes/md-dark-indigo/theme.css
//import  primereact/resources/themes/md-dark-deeppurple/theme.css
//import  primereact/resources/themes/mdc-light-indigo/theme.css
//import  primereact/resources/themes/mdc-light-deeppurple/theme.css
//import  primereact/resources/themes/mdc-dark-indigo/theme.css
// import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NoPage from './no-page';
import { DemoAccounting } from './functionalities/transactions/root/demo-accounting';
import { Login } from './functionalities/user/login';
import GuardedRoute1 from './functionalities/home/guarder-route';
import { AccountingInitialValues } from './functionalities/initial-values/accounting-initial-values';
import { CountryTaxesList } from './functionalities/taxes/CountryTaxesList';
import { CompanyAngajati } from './functionalities/employee/list/company-angajati';
import { AngajatSalaryList } from './functionalities/employee/salary/list/angajat-salary-list';
import { CompanyList } from './functionalities/company/list/company-list';
import { PdfImport } from './functionalities/import-extrase/pdf-import/pdf-import';
import { CreateAccount } from './functionalities/user/create-account';

import { Terms } from './functionalities/terms/terms';
import { Feedback } from './functionalities/feedback/feedback';
import { DeleteAccount } from './functionalities/account/delete-account/delete-account';

import { Navbar } from './functionalities/home/navbar/Navbar';

import { LamdaFunctions } from './functionalities/lamda/lamda_functions';
import { Contact } from './functionalities/contact/contact';
import useIdentity from './_store/useIdentity';
import Footer from './functionalities/footer/Footer';
import { TodoList } from './functionalities/todo/list/todo-list';
import ErrorsComponent from './functionalities/error/ErrorsComponent';
import { ForgotPassword } from './functionalities/user/forgot-password';
import { ResetPassword } from './functionalities/user/reset-password';
import { AcceptInvitation } from './functionalities/user/accept-invitation';
import { Home } from './functionalities/home/home';
import { Categories } from './functionalities/money-aggregator/categories/categories';
import MoneyAccountList from './functionalities/money-aggregator/money-account/list/money-account-list';
import { EntityInvitations } from './functionalities/money-aggregator/entity-invitations/list/entity-invitations';
import { useBetween } from './hooks/useBetween';
import MongoUi from './functionalities/mongoui/mongoui';
import MoneyEntityList from './functionalities/money-aggregator/money-entity/list/money-entity-list';
import Translations from './functionalities/translations/translations';

function App() {
  const { loggedUser } = useBetween(useIdentity);
  return (
    <div>
      <div className="" style={{ minHeight: '90vh' }}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
          </div>

          <div className="">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="login" element={<Login />} />
                <Route index element={<Home />} />
                {/* <Route
                  path="accounting"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <DemoAccounting />
                    </GuardedRoute1>
                  }
                /> */}
                <Route
                  path="todo"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <TodoList />
                    </GuardedRoute1>
                  }
                />
                {/* <Route
                  path="banci"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <BancaList />
                    </GuardedRoute1>
                  }
                /> */}

                <Route
                  path="accounts"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <MoneyAccountList />
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
                <Route
                  path="mongoui"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <MongoUi />
                    </GuardedRoute1>
                  }
                />
                {/* <Route path="start" element={<Start />} /> */}
                <Route path="termeni" element={<Terms />} />
                <Route path="feedback" element={<Feedback />} />
                {/* <Route
                  path="taxe"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CountryTaxesList />
                    </GuardedRoute1>
                  }
                /> */}
                <Route
                  path="categories"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <Categories />
                    </GuardedRoute1>
                  }
                />

                <Route path="contact" element={<Contact />} />
                <Route path="crearecont" element={<CreateAccount />} />
                <Route path="parola" element={<ForgotPassword />} />
                <Route path="resetareparola" element={<ResetPassword />} />
                {/* <Route path="invitations" element={<CompanyInvitations />} /> */}

                <Route path="home" element={<Home />} />
                <Route
                  path="acceptare-invitatie"
                  element={<AcceptInvitation />}
                />

                {/* <Route
                  path="initial"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <AccountingInitialValues />
                    </GuardedRoute1>
                  }
                /> */}

                <Route
                  path="events"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <MoneyEntityList />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="translations"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <Translations />
                    </GuardedRoute1>
                  }
                />

                <Route
                  path="entity-invitations"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <EntityInvitations />
                    </GuardedRoute1>
                  }
                />

                {/* <Route
                  path="firme"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CompanyList />
                    </GuardedRoute1>
                  }
                /> */}
                {/* <Route
                  path="angajati"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <CompanyAngajati />
                    </GuardedRoute1>
                  }
                /> */}
                {/* <Route
                  path="salarii"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <AngajatSalaryList />
                    </GuardedRoute1>
                  }
                /> */}
                {/* <Route
                  path="pdfimport"
                  element={
                    <GuardedRoute1 loggedUser={loggedUser}>
                      <PdfImport />
                    </GuardedRoute1>
                  }
                /> */}
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
      {/* <ErrorsComponent></ErrorsComponent> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
