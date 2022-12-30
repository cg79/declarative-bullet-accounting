import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home";
import Layout from "./layout";
import NoPage from "./no-page";
import { BulletLogsComponent } from "./_components/bullet-logs-component";
import { DemoAccounting } from "./demo/demo-accounting";
import { UserPassword } from "./user/user-password";
import GuardedRoute1 from "./demo/guarder-route";


//https://www.developerway.com/posts/react-component-as-prop-the-right-way

function App() {
  // useEffect(() => {
  //   prerequisites({
  //     login: "claudiu9379@yahoo.com.com",
  //     password: "a1",
  //   });
  // }, []);

  // const handleClick = () => {

  //   prerequisites({
  //     login: "claudiu9379@yahoo.com",
  //     password: "a1",
  //   });
  // };

  return (
    <div>
      {/* <button type="button" onClick={handleClick}>
        execute prerequisites
      </button> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<UserPassword />} />

            <Route index element={<Home />} />
           
            {/* <Route path="accounting" 
            element={
              <GuardedRoute  
                renderFunc={()=> <DemoAccounting/>}
              />  } /> */}

            <Route path="accounting" 
              element={
                <GuardedRoute1>
                  <DemoAccounting/>
                </GuardedRoute1>
              } />



            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <BulletLogsComponent eventName="LOGS"></BulletLogsComponent>
    </div>
  );
}

export default App;
