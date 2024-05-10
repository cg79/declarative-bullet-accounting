import { useEffect, useState } from "react";
import Lottie from "react-lottie";
export const MyLottie = ({
  fileName = "accounting3",
  loop = false,
  height = "25vh",
  width = "100%",
}) => {
  // const animationData = require("/animation/accounting1.json");
  const [animationData, setAnimationData] = useState(null);
  const defaultOptions = {
    loop,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const background = fetch(`/animation/${fileName}.json`);
    background.then((response) => {
      response.json().then((data) => {
        setAnimationData(data);
      });
    });
  }, [fileName]);

  return (
    <div>
      <Lottie options={defaultOptions} height={height} />
    </div>
  );
};
