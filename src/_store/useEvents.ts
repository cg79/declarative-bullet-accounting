import React, { useCallback, useEffect } from "react";
import { utils } from "../_utils/utils";

const useEvents = () => {
  const [enterPressed, setEnterPressed] = React.useState("");

  const triggerEnterPressed = useCallback(() => {
    setEnterPressed(utils.createUUID());
  }, []);

  const clearEnterPressed = useCallback(() => {
    setEnterPressed("");
  }, []);

  return {
    enterPressed,
    triggerEnterPressed,
    clearEnterPressed,
  };
};

export default useEvents;
