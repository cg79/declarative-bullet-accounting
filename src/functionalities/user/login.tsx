import { useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "../../_components/reuse/LabelInput";
import { MyButton } from "../../_components/reuse/my-button";
import { MyLottie } from "../../_components/reuse/my-lottie";
import useIdentity from "../../_store/useIdentity";
import { useBetween } from "use-between";
import GoogleAuth from "./google-auth";
import { gapi } from "gapi-script";

import { useUserMethods } from "./useUserMethods";
import { LabelButton } from "../../_components/reuse/LabelButton";
import useFirme from "../../_store/useFirme";
import useEvents from "../../_store/useEvents";
import { MyCheckbox } from "../../_components/reuse/my-checkbox";
import LocalStorageStorageManager from "./localstorage-management";
// import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";

export const Login = () => {
  const navigate = useNavigate();
  const { loggedUser, setareUserLogat } = useBetween(useIdentity);
  const { callLoginMethod, createAccount } = useUserMethods();
  const { firme } = useBetween(useFirme);
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const storedEmail = LocalStorageStorageManager.getItem("email");

  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const [checked, setChecked] = useState(false);
  const updateChecked = (value: boolean) => {
    setChecked(value);
    if (value && !data.email) {
      const storedEmail = LocalStorageStorageManager.getItem("email");
      if (storedEmail) {
        setData((data) => ({ ...data, email: storedEmail }));
      }
    }
  };
  const updateData = (value: any, key: string) => {
    setData(() => ({ ...data, [key]: value }));
  };

  const updateEmail = (value: string) => {
    // if(checked && storedEmail){
    //   if()
    // }
    updateData(value, "email");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onLogin = (user: any) => {
    setareUserLogat(user);
    if (checked) {
      LocalStorageStorageManager.setItem("email", user.email);
    } else {
      LocalStorageStorageManager.removeItem("email");
    }
  };

  useEffect(() => {
    if (!loggedUser) {
      return;
    }

    if (!firme || !firme.length) {
      return navigate("/start");
    }
    return navigate("/accounting");
  }, [firme]);

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    callLoginMethod(data, "login")
      .then((res) => onLogin(res))
      .catch((err) => {
        setError(err.message);
      });
    clearEnterPressed();
  }, [enterPressed]);

  const [error, setError] = useState("");

  return (
    <div className="flex flex-column center-v">
      <div style={{ marginBottom: "20px" }}>
        <MyLottie></MyLottie>
      </div>

      {/* <div className="mt10 fcenter">
        <LabelButton label="">
          <MyButton
            text="Logare cu Google"
            onClick={() => {
              function start() {
                gapi.client.init({
                  clientId,
                  scope: "",
                });
                GoogleAuth.login().then((res: any): any => {
                  callLoginMethod(res, "loginWithGoogle")
                    .then((res) => onLogin(res))
                    .catch((err) => {
                      setError(err);
                    });
                });
              }
              gapi.load("client:auth2", start);
            }}
            className="linkbutton"
          ></MyButton>
        </LabelButton>
      </div> */}

      <div className="">
        <LabelInput
          label="Email: "
          onChange={(val: string) => updateData(val, "email")}
          value={data.email}
        ></LabelInput>

        <div className="mt10">
          <LabelInput
            label="Parola:"
            // type="password"
            onChange={(val: string) => updateData(val, "password")}
            value={data.password}
            type="password"
          ></LabelInput>
        </div>

        <div className="fcenter " style={{ marginTop: "20px" }}>
          <MyCheckbox
            id="remember"
            label="Pastreaza utilizatorul"
            checked={checked}
            value={checked}
            onChange={() => updateChecked(!checked)}
          ></MyCheckbox>
        </div>
        <div className="fcenter " style={{ marginTop: "20px" }}>
          <MyButton
            onClick={() =>
              callLoginMethod(data, "login")
                .then((res) => onLogin(res))
                .catch((err) => {
                  setError(err.message);
                })
            }
            text="Logare"
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          {error && <div className="mt10 error">{error}</div>}
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate("/parola")}
            text="Am uitat Parola"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="fcenter mt10">
          <MyButton
            onClick={() => navigate("/crearecont")}
            text="Navigare catre ecranul de creare utilizator"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
