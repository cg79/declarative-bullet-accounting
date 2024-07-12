import { useBetween } from "use-between";
import { MyButton } from "../../../_components/reuse/my-button";
import { ICategory } from "../../categories/category-type";
import useEvents from "../../../_store/useEvents";
import { useEffect, useState } from "react";
import { LabelNumericInput } from "../../../_components/reuse/LabelNumericInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { ACCOUNT_TYPES, IMoneyAccount } from "../money-account-type";
import RadioButtonList from "../../../_components/reuse/radio-button-list";
import LabelRadioButtonList from "../../../_components/reuse/LabelRadioButtonList";

export const AddEditMoneyAccount = ({
  moneyEntity: moneyAccount,
  onSave,
  onCancel,
}: {
  moneyEntity: IMoneyAccount;
  onSave: (moneyTransaction: IMoneyAccount) => void;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [currentTransaction, setCurrentTransaction] =
    useState<IMoneyAccount>(moneyAccount);

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
            label="Name: "
            lwidth="135px"
            // autoFocus
            onChange={(val: string) => {
              setError("");
              const newV: IMoneyAccount = {
                ...currentTransaction,
                name: val,
              };
              setCurrentTransaction(newV);
            }}
            value={currentTransaction?.name}
            // onEnter={() => triggerSaveCategory()}
          ></LabelInput>
        </div>
        <div className="flex mt10">
          <LabelNumericInput
            label="Amount: "
            lwidth="135px"
            // autoFocus
            onChange={(val: number) => {
              setError("");
              const newV: IMoneyAccount = {
                ...currentTransaction,
                amount: val,
              };
              setCurrentTransaction(newV);
            }}
            value={currentTransaction?.amount}
            // onEnter={() => triggerSaveCategory()}
          ></LabelNumericInput>
        </div>

        <div className="flex mt10">
          <LabelRadioButtonList
            label="Type: "
            lwidth="130px"
            options={ACCOUNT_TYPES}
            name="type"
            selectedValue={currentTransaction?.account_type}
            onChange={(value: any) => {
              const newItem: IMoneyAccount = {
                ...currentTransaction,
                account_type: value,
              };
              setCurrentTransaction(newItem);
            }}
            labelField="label"
            valueField="value"
            // onEnter={() => triggerSaveCategory()}
          ></LabelRadioButtonList>
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
        <div className="error mt10">{error}</div>
        <div className="flex space-between mt10">
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

export default AddEditMoneyAccount;
