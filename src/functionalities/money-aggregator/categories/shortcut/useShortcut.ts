import { useState } from "react";

const useShortcut = () => {
  const [isShortcutEnabled, setShortcutEnabled] = useState(true);
  const [shortcutKey, setShortcutKey] = useState("");

  const enableDisableShortcut = (value: boolean) => {
    setShortcutEnabled(value);
  };
  return {
    isShortcutEnabled,
    enableDisableShortcut,
    shortcutKey,
    setShortcutKey,
  };
};
export default useShortcut;
