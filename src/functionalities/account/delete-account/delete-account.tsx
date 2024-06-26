import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { MyLottie } from "../../../_components/reuse/my-lottie";
import { useBetween } from "use-between";
import useIdentity from "../../../_store/useIdentity";
import { useUserMethods } from "../../user/useUserMethods";

export const DeleteAccount = () => {
  const { deleteAccount } = useUserMethods();
  const { deconectare } = useBetween(useIdentity);
  const [error, setError] = useState("");
  const trimite = async () => {
    setError("");
    const response = await deleteAccount();
    if (!response.success) {
      setError(response.message);
      return;
    }
    deconectare();
  };
  return (
    <div>
      <div className="fcenter bold">Stergere cont</div>
      <div className="fcenter mt15">
        <MyLottie
          fileName="delete"
          loop={false}
          // height={200} width={200}
        />
      </div>
      <div className="fcenter mt15" style={{ marginTop: "50px" }}>
        <MyButton text="Stergere cont" onClick={trimite}></MyButton>
      </div>

      <div className="fcenter mt15" style={{ marginTop: "50px" }}>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};
