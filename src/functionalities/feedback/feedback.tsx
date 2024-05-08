import { MyButton } from "../../_components/reuse/my-button";
import { WysYWYG } from "../../_components/reuse/my-wysywyg";
import { MyLottie } from "../../_components/reuse/my-lottie";
import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";
import { useState } from "react";
// import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";

export const Feedback = () => {
  const [html, setHtml] = useState("");
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();
  const trimite = async () => {
    const bulletHttp = createBulletHttpRequestLibrary();
    const response = await bulletHttp.executeMethodFromModule({
      method: "sendEmail",
      moduleName: "email",
      body: {
        useBody: true,
        to: "claudiu9379@yahoo.com",
        subject: "Feedback",
        html,
      },
    });
    if (!response.success) {
      return;
    }
  };
  return (
    <div>
      <div>
        <MyLottie fileName="feedback" loop={true} />
      </div>
      <div className="fcenter" style={{ marginTop: "50px" }}>
        <WysYWYG html={html} setHtml={setHtml} />
      </div>
      <div className="fcenter mt10">
        <MyButton text="Trimite" onClick={trimite}></MyButton>
      </div>
    </div>
  );
};
