import { Dialog } from 'primereact/dialog';
import useShortcut from '../../functionalities/money-aggregator/categories/shortcut/useShortcut';
import { useBetween } from 'src/hooks/useBetween';
import { useEffect } from 'react';

export const DialogWrapper = ({ header, visible, onHide, children }) => {
  const { enableDisableShortcut } = useBetween(useShortcut);

  useEffect(() => {
    if (!visible) {
      return;
    }
    enableDisableShortcut(false);
  }, []);

  const hideFunction = () => {
    enableDisableShortcut(true);
    onHide();
  };

  return !visible ? null : (
    <Dialog header={header} visible={visible} onHide={hideFunction}>
      {children}
    </Dialog>
  );
};
