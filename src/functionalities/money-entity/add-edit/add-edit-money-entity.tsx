import { useBetween } from "use-between";
import { MyButton } from "../../../_components/reuse/my-button";
import useEvents from "../../../_store/useEvents";
import { useEffect, useState } from "react";
import { IMoneyEntity } from "../money-entity-type";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import useScreenSize from "../../../hooks/useScreenSize";

export const AddEditMoneyTransaction = ({
  moneyEntity,
  onSave,
  onCancel,
}: {
  moneyEntity: IMoneyEntity;
  onSave: (moneyTransaction: IMoneyEntity) => void;
  onCancel: () => void;
}) => {
  const { width } = useScreenSize();

  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [currentTransaction, setCurrentTransaction] =
    useState<IMoneyEntity>(moneyEntity);

  const triggerSaveCategory = () => {
    setError("");

    if (!currentTransaction?.name) {
      setError("invalid name");
      return;
    }
    onSave(currentTransaction);
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
                ...currentTransaction,
                name: val,
              };
              setCurrentTransaction(newV);
            }}
            value={currentTransaction?.name}
            // onEnter={() => triggerSaveCategory()}
          ></LabelInput>
        </div>
        {/* <div className="flex mt10">
          <LabelDate
            label={"Data tranzactiei: "}
            lwidth="135px"
            onChange={(date: number) => {
              const newItem: IMoneyTransaction = {
                ...moneyTransaction,
                date: date,
              };
              setCurrentTransaction(newItem);
            }}
            data={currentTransaction.date}
          ></LabelDate>
        </div> */}
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

export default AddEditMoneyTransaction;
