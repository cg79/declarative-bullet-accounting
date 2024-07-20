import { useState } from "react";

const useShortcut = () => {
  const [isShortcutEnabled, setShortcutEnabled] = useState(true);
  return {
    isShortcutEnabled,
    setShortcutEnabled,
  };
};
export default useShortcut;
