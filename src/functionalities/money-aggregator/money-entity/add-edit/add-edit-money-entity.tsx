import { useBetween } from "use-between";
import { MyButton } from "../../../../_components/reuse/my-button";
import useEvents from "../../../../_store/useEvents";
import { useEffect, useState } from "react";
import { IMoneyEntity } from "../money-entity-type";
import { LabelInput } from "../../../../_components/reuse/LabelInput";
import { WysYWYG } from "../../../../_components/reuse/my-wysywyg";

export const AddEditMoneyEntity = ({
  moneyEntity,
  onSave,
  onCancel,
}: {
  moneyEntity: IMoneyEntity;
  onSave: (moneyTransaction: IMoneyEntity) => void;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [currentEntity, setCurrentEntity] = useState<IMoneyEntity>(moneyEntity);

  const triggerSaveCategory = () => {
    setError("");

    if (!currentEntity?.name) {
      setError("invalid name");
      return;
    }
    onSave(currentEntity);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveCategory();
    clearEnterPressed();
  }, [enterPressed]);

  return (
    <div className="fcenter">
      <div>
        <div className="flex mt10">
          <LabelInput
            autoFocus
            label="Nume: "
            lwidth="135px"
            // autoFocus
            onChange={(val: string) => {
              setError("");
              const newV: IMoneyEntity = {
                ...currentEntity,
                name: val,
              };
              setCurrentEntity(newV);
            }}
            value={currentEntity?.name}
          ></LabelInput>
        </div>
        <div className="mt10">
          <WysYWYG
            html={currentEntity.description}
            setHtml={(val) =>
              setCurrentEntity({ ...currentEntity, description: val })
            }
          />
        </div>
        <div className="error">{error}</div>
        <div className="flex space-between mt15">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => triggerSaveCategory()}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};

export default AddEditMoneyEntity;
