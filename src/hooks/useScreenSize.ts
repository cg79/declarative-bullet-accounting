import { useEffect, useState } from "react";
import { utils } from "../_utils/utils";
import { SCREEN } from "../constants";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    popupCss: { css: string; style: any };
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
    popupCss: { css: "flex fwrap fcenter", style: {} },
  });

  useEffect(() => {
    const handleResize = () => {
      console.log("resize");
      const newSize: any = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      if (window.innerWidth < SCREEN.POPUP) {
        newSize.popupCss = { css: "sm", style: { marginTop: "10px" } };
      } else {
        newSize.popupCss = { css: "flex fwrap fcenter", style: {} };
      }

      setScreenSize(newSize);
    };

    const debounceResize = utils.debounce(handleResize, 100);

    window.addEventListener("resize", debounceResize);
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width: screenSize.width,
    height: screenSize.height,
    popupCss: screenSize.popupCss,
  };
};

export default useScreenSize;
