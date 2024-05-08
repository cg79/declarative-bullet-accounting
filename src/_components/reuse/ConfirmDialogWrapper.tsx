import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

export const ConfirmDialogWrapper = ({
  onConfirm,
  onCancel,
  headerMessage,
  dWidth = "80vw",
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      onCancel();
    }
  }, [onCancel, visible]);

  return (
    <div>
      <Dialog
        header={headerMessage}
        visible={visible}
        style={{ width: dWidth }}
        onHide={() => setVisible(false)}
      >
        <div className="flex space-between">
          <Button
            onClick={onConfirm}
            icon="pi pi-check"
            label="Confirmare"
          ></Button>
          <Button
            onClick={onCancel}
            icon="pi pi-times"
            label="Renunta"
            className="p-button-danger"
          ></Button>
        </div>
      </Dialog>
    </div>
  );
};
