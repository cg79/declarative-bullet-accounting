import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../_components/reuse/my-button";
import { LabelInput } from "../../_components/reuse/LabelInput";
import { useBetween } from "use-between";
import { MyLottie } from "../../_components/reuse/my-lottie";
// import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import { helpers } from "../../_utils/helpers";
import { utils } from "../../_utils/utils";
import useApi from "../../hooks/useApi";
import useEvents from "../../_store/useEvents";

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);

  const resetcode = utils.getQueryVariable("resetcode") || "";
  const email = utils.getQueryVariable("email") || "";
  const { executeMethodFromModule } = useApi();

  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const updateData = (value: string, key: string) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    callResetPassword();
    clearEnterPressed();
  }, [enterPressed]);

  const callResetPassword = async () => {
    setError("");

    const responseData = await executeMethodFromModule(
      {
        method: "resetPassword",
        moduleName: "user",

        body: {
          reset: resetcode,
          password: data.password,
          email,
        },
      },
      {
        allowAnonymous: true,
      }
    );
    helpers.checkHttpResponseForErrors(responseData);

    if (responseData.success) {
      return navigate("/login");
    }
    if (!responseData.success) {
      if (typeof responseData.message === "string") {
        setError(responseData.message || "Eroare la resetarea parolei");
      } else {
        setError("Eroare la resetarea parolei");
      }
    }
  };

  return (
    <>
      {resetcode}
      <div className="fcenter mt15">
        <MyLottie
          fileName="create-account"
          loop={false}
          // height={200}
          // width={200}
        />
      </div>
      <div className="flex flex-column center-v">
        <div className="mt10">
          <LabelInput
            type="password"
            label="Noua Parola: "
            onChange={(val: string) => updateData(val, "password")}
            value={data.password}
          ></LabelInput>
        </div>

        <div className="flex" style={{ marginTop: "20px" }}>
          <MyButton
            onClick={() => callResetPassword()}
            text="Resetare Parola"
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate("/login")}
            text="Navigare catre ecranul de autentificare"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>

        {error ? <div className="error mt10">{error}</div> : null}
      </div>
    </>
  );
};
