import { useState } from 'react';

const useShortcut = () => {
  const [isShortcutEnabled, setShortcutEnabled] = useState(true);

  const enableDisableShortcut = (value: boolean) => {
    debugger;
    setShortcutEnabled(value);
  };
  return {
    isShortcutEnabled,
    enableDisableShortcut,
  };
};
export default useShortcut;
