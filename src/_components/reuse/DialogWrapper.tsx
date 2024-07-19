import { Dialog } from "primereact/dialog";
import useShortcut from "../../functionalities/categories/shortcut/useShortcut";
import { useBetween } from "use-between";
import { useEffect } from "react";

export const DialogWrapper = ({ header, visible, onHide, children }) => {
  const { setShortcutEnabled } = useBetween(useShortcut);

  useEffect(() => {
    setShortcutEnabled(false);
  }, []);

  const hideFunction = () => {
    setShortcutEnabled(true);
    onHide();
  };

  return (
    <Dialog header={header} visible={visible} onHide={hideFunction}>
      {children}
    </Dialog>
  );
};
