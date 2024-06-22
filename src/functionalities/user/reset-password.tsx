import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../_components/reuse/my-button";
import { LabelInput } from "../../_components/reuse/LabelInput";
import useIdentity from "../../_store/useIdentity";
import { useBetween } from "use-between";
import { MyLottie } from "../../_components/reuse/my-lottie";
import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";
// import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import useFirme from "../../_store/useFirme";
import { helpers } from "../../_utils/helpers";
import { utils } from "../../_utils/utils";

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  const [error, setError] = useState("");

  const resetcode = utils.getQueryVariable("resetcode") || "";
  const email = utils.getQueryVariable("email") || "";

  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const updateData = (value: string, key: string) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  const callResetPassword = async (payload: any) => {
    setError("");
    debugger;

    const bulletHttp = createBulletHttpRequestLibrary(true);
    const responseData = await bulletHttp.resetpassword(
      {
        reset: resetcode,
        password: data.password,
      },
      email
        .replace("@", "")
        .replace(".", "")
        .replace(/[^a-zA-Z]+/g, "")
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
            onClick={() => callResetPassword(data)}
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
