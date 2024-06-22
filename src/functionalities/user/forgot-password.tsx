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

export const ForgotPassword = () => {
  const navigate = useNavigate();

  // const { getFirme } = useAccountingDbActions();
  const { firme } = useBetween(useFirme);
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  const { loggedUser, setareUserLogat } = useBetween(useIdentity);

  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const updateData = (value: string, key: string) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  const callSendResetPasswordEmail = async (payload: any) => {
    setError("");
    const { email } = payload;
    if (!payload.email) {
      setError("Email-ul trebuie sa fie completat");
      return;
    }

    const bulletHttp = createBulletHttpRequestLibrary(true);
    const responseData = await bulletHttp.forgotpassword(
      {
        email: email,
      },
      email
        .replace("@", "")
        .replace(".", "")
        .replace(/[^a-zA-Z]+/g, "")
    );
    helpers.checkHttpResponseForErrors(responseData);

    if (!responseData.success) {
      if (typeof responseData.message === "string") {
        setError(responseData.message || "Eroare la resetarea parolei");
      } else {
        setError("Eroare la resetarea parolei");
      }
      return;
    }

    setEmailSent(true);
    setError("Verificati email-ul pentru resetarea parolei");
  };

  // const checkShouldTriggerImport = useCallback(async () => {
  //   //
  //   const response = await getFirme({
  //     first: 0,
  //     pageNo: 0,
  //     rowsPerPage: 10,
  //   });

  //   if (!response.success) {
  //     setError(response.message);
  //     return false;
  //   }
  //   return response.data.records.length > 0;
  // }, [getFirme]);

  useEffect(() => {
    if (!loggedUser) {
      return;
    }

    if (!firme || !firme.length) {
      return navigate("/start");
    }
    return navigate("/accounting");
  }, [firme]);

  return !loggedUser ? (
    <>
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
          <span>
            Dupa ce introduceti adresa de email o sa primiti un email cu
            instrucutiuni de resetare a parolei
          </span>
        </div>

        <div className="mt10">
          <LabelInput
            label="Email: "
            onChange={(val: string) => updateData(val, "email")}
            value={data.email}
            disabled={emailSent}
          ></LabelInput>
        </div>
        <div className="flex" style={{ marginTop: "20px" }}>
          <MyButton
            onClick={() => callSendResetPasswordEmail(data)}
            text="Resetare Parola"
            disabled={emailSent}
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
  ) : null;
};
