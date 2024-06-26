import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../_components/reuse/my-button";
import { LabelInput } from "../../_components/reuse/LabelInput";
import useIdentity from "../../_store/useIdentity";
import { useBetween } from "use-between";
import { MyLottie } from "../../_components/reuse/my-lottie";
import { helpers } from "../../_utils/helpers";
import { utils } from "../../_utils/utils";
import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";

export const AcceptInvitation = () => {
  const navigate = useNavigate();

  const { acceptInvitation } = useAccountingDbActions();
  const { clearLoggedUser, setareUserLogat } = useBetween(useIdentity);

  const [error, setError] = useState("");

  const { _id, clientId } = utils.getQueryAsJson();

  const [data, setData] = React.useState<any>({
    password: "",
  });

  const updateData = (value: string, key: string) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  useEffect(() => {
    clearLoggedUser();
  }, []);
  const callCreateAccountFromInvitation = async (payload: any) => {
    setError("");
    debugger;

    const responseData = await acceptInvitation({
      _id,
      clientId,
      password: data.password,
    });
    helpers.checkHttpResponseForErrors(responseData);

    if (responseData.success) {
      setareUserLogat(responseData.data);
      return navigate("/home");
    }
    if (!responseData.success) {
      if (typeof responseData.message === "string") {
        setError(responseData.message || "Eroare la acceptarea invitatiei");
      } else {
        setError("Eroare la resetarea parolei");
      }
    }
  };

  return (
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
          <LabelInput
            type="password"
            label="Setare parola: "
            onChange={(val: string) => updateData(val, "password")}
            value={data.password}
          ></LabelInput>
        </div>

        <div className="flex" style={{ marginTop: "20px" }}>
          <MyButton
            onClick={() => callCreateAccountFromInvitation(data)}
            text="Setare Parola"
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
