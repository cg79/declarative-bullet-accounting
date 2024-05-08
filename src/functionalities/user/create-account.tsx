import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../_components/reuse/my-button";
import { LabelInput } from "../../_components/reuse/LabelInput";
import useIdentity from "../../_store/useIdentity";
import { useBetween } from "use-between";
import GoogleAuth from "./google-auth";
import { MyLottie } from "../../_components/reuse/my-lottie";
import { MyCheckbox } from "../../_components/reuse/my-checkbox";
import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  const [checked, setChecked] = useState(false);

  const { loggedUser, setareUserLogat } = useBetween(useIdentity);

  const [error, setError] = useState("");

  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const updateData = (value: string, key: string) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  const callCreateAccount = async (payload: any) => {
    setError("");
    if (!checked) {
      setError("Trebuie sa fiti de acord cu termenii si conditii");
      return;
    }
    if (!payload.email) {
      setError("Email-ul trebuie sa fie completat");
      return;
    }

    if (!payload.password) {
      setError("Parola trebuie completata");
      return;
    }

    const bulletHttp = createBulletHttpRequestLibrary(true);
    const responseData = await bulletHttp.createManagementUser({
      email: payload.email,
      password: payload.password,
    });

    if (!responseData.success) {
      setError(responseData.message);
      return;
    }
    setareUserLogat(responseData.data);

    navigate("/accounting");
  };

  const createGoogleUser = async (payload: any) => {
    setError("");
    if (!payload.email) {
      setError("Email-ul trebuie sa fie completat");
      return;
    }

    if (!payload.password) {
      setError("Parola trebuie completata");
      return;
    }
    const bulletHttp = createBulletHttpRequestLibrary(true);
    const responseData = await bulletHttp.createManagementUser({
      email: payload.email,
      password: payload.password,
    });

    if (!responseData.success) {
      setError(responseData.message);
      return;
    }
    setareUserLogat(responseData.data);
  };

  return !loggedUser ? (
    <>
      <div className="fcenter mt15">
        <MyLottie
          fileName="create-account"
          loop={false}
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-column center-v">
        <div className="mt10">
          <LabelInput
            label="Email: "
            onChange={(val: string) => updateData(val, "email")}
            value={data.email}
          ></LabelInput>
        </div>

        <div className="mt10">
          <LabelInput
            label="Parola:"
            // type="password"
            onChange={(val: string) => updateData(val, "password")}
            value={data.password}
          ></LabelInput>
        </div>

        <div className="mt10">
          <MyCheckbox
            id="termeni-conditii"
            label="Sunt de acord cu termenii si conditiile"
            checked={checked}
            value={checked}
            onChange={() => setChecked(!checked)}
          ></MyCheckbox>
        </div>
        <div className="flex" style={{ marginTop: "20px" }}>
          <MyButton
            onClick={() => callCreateAccount(data)}
            text="Creaza Utilizator"
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          <MyButton
            text="Logare cu Google"
            onClick={() => {
              if (!checked) {
                setError("Trebuie sa fie de acord cu termenii si conditiile");
                return;
              }
              GoogleAuth.login().then((res: any): any => {
                createGoogleUser(res);
              });
            }}
            className="linkbutton"
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
