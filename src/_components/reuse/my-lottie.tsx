import { useEffect, useState } from "react";
import Lottie from "react-lottie";
export const MyLottie = ({
  fileName = "accounting3",
  loop = false,
  width = 300,
  height = 300,
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
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};
