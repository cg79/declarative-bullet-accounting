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

import SessionStorageManager from "./session-management";
import { useUserMethods } from "./useUserMethods";
import { clientId } from "./constants";
import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import { LabelButton } from "../../_components/reuse/LabelButton";
import useFirme from "../../_store/useFirme";
// import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const Login = () => {
  const navigate = useNavigate();
  const { loggedUser, setareUserLogat } = useBetween(useIdentity);
  const { getFirme } = useAccountingDbActions();
  const { callLoginMethod } = useUserMethods();
  const { firme } = useBetween(useFirme);

  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
  });

  const updateData = (value: any, key: string) => {
    setData(() => ({ ...data, [key]: value }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkShouldTriggerImport = async () => {
    //
    const response = await getFirme({
      first: 0,
      pageNo: 0,
      rowsPerPage: 10,
    });

    if (!response.success) {
      setError(response.message);
      return false;
    }
    return response.data.records.length > 0;
  };

  const onLogin = (user: any) => {
    SessionStorageManager.setItem("username", user);
    setareUserLogat(user);
  };

  const useEffectDebugger = (
    effectHook,
    dependencies,
    dependencyNames = []
  ) => {
    const previousDeps = usePrevious(dependencies, []);

    const changedDeps = dependencies.reduce((accum, dependency, index) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    }, {});

    if (Object.keys(changedDeps).length) {
      console.log("[use-effect-debugger] ", changedDeps);
    }

    useEffect(effectHook, dependencies);
  };

  useEffect(() => {
    debugger;
    if (!loggedUser) {
      return;
    }

    if (!firme || !firme.length) {
      return navigate("/start");
    }
    return navigate("/accounting");

    // async function fetchData() {
    //   // You can await here
    //   const shouldNavigateToAccounting = await checkShouldTriggerImport();
    //   debugger;
    //   if (shouldNavigateToAccounting) {
    //     navigate("/accounting");
    //   } else {
    //     navigate("/start");
    //   }
    // }
    // fetchData();
  }, [firme]);

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
        ></LabelInput>
      </div>
      <div className="fcenter " style={{ marginTop: "20px" }}>
        <LabelButton label="">
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
        </LabelButton>
      </div>

      <div className="fcenter mt10">
        {error && <div className="mt10 error">{error}</div>}
      </div>

      <div className="fcenter mt10">
        <LabelButton label="">
          <MyButton
            onClick={() => navigate("/crearecont")}
            text="Navigare catre ecranul de creare utilizator"
            className="linkbutton ml5"
            useBaseButton={false}
          ></MyButton>
        </LabelButton>
      </div>
    </div>
  );
};
