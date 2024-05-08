import { useEffect, useState } from "react";
import "./home1.css";
import StepperPresentation from "./stepper-presentation";
export const Home1 = () => {
  const [animCss, setAnimCss] = useState("anim");

  useEffect(() => {
    setTimeout(() => {
      setAnimCss("anim0");
    }, 5000);
  }, []);

  return (
    <>
      <div className="img_bk">
        {/* <div className="flex1">
          <p className="uppercase text-base lg:text-xl font-semibold">
            Efficiency Payroll and workforce mastery{" "}
          </p>
        </div> */}
        <div className="  flex1 relative">
          <div className="second-div">
            <img
              src="images/home1_1.png"
              className="right-aligned-img"
              style={{ width: "50%", zIndex: 1, height: "auto" }}
              alt=""
            />
          </div>

          <div
            className="absolute"
            style={{ zIndex: 2, top: "20%", left: "0px" }}
          >
            <div style={{ marginLeft: "20px", width: "70%" }}>
              <p
                className={`uppercase text-base lg:text-xl font-semibold ${animCss}`}
              >
                Contabilitate pe baza extraselor de cont
              </p>
            </div>
            <div style={{ marginLeft: "20px", width: "70%" }}>
              <p
                className={`uppercase text-base lg:text-xl font-semibold ${animCss}`}
              >
                Vizualizare situatie in decurs de 5 minute
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="img_bk1">
        <StepperPresentation></StepperPresentation>
      </div>
    </>
  );
};
