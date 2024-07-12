import { useBetween } from "use-between";
import { MyButton } from "../../../_components/reuse/my-button";
import { ICategory } from "../../categories/category-type";
import useEvents from "../../../_store/useEvents";
import { useEffect, useState } from "react";
import {
  IMoneyTransaction,
  moneyTransactionOptionTypes,
  IMoneyTransactionType,
} from "../money-transaction-type";
import { LabelNumericInput } from "../../../_components/reuse/LabelNumericInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { LabelDropDown } from "../../../_components/reuse/LabelDropDown";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";
import { IMoneyAccount } from "../../money-account/money-account-type";
import { WysYWYG } from "../../../_components/reuse/my-wysywyg";
import { SelectButtons } from "../../../_components/reuse/SelectButtons";
import { LabelSelectButtons } from "../../../_components/reuse/LabelSelectButtons";
import MyIcon from "../../../_components/reuse/my-icon";

export const AddEditMoneyTransaction = ({
  category,
  moneyTransaction,
  onSaveMoneyTransaction,
  onCancel,
}: {
  category: ICategory | null;
  moneyTransaction: IMoneyTransaction;
  onSaveMoneyTransaction: (moneyTransaction: IMoneyTransaction) => void;
  onCancel: () => void;
}) => {
  const { accounts } = useBetween(useMoneyAccounts);
  const [selectedAccount, setSelectedAccount] = useState<IMoneyAccount | null>(
    null
  );

  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [currentTransaction, setCurrentTransaction] =
    useState<IMoneyTransaction>(
      moneyTransaction || {
        _id: "",
        category_id: category?._id || "",
        description: "",
        amount: 0,
        addedDate: 0,
        date: 0,
      }
    );

  const triggerSaveCategory = () => {
    setError("");

    if (!currentTransaction?.amount) {
      setError("invalid amount");
      return;
    }
    if (currentTransaction._id) {
      currentTransaction.amount =
        currentTransaction.amount - moneyTransaction.amount;
    }
    onSaveMoneyTransaction(currentTransaction);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveCategory();
    clearEnterPressed();
  }, [enterPressed]);

  const moneyTransactionOptionTemplate = (option) => {
    return <MyIcon icon={option.icon} tooltip={"option.label"}></MyIcon>;
  };

  return (
    <div className="fcenter">
      {/* {JSON.stringify(accounts)} */}
      <div>
        <div className="flex mt10" style={{ marginTop: "50px" }}>
          <LabelSelectButtons
            label="Tip tranzactie: "
            lwidth="135px"
            value={currentTransaction?.type}
            options={moneyTransactionOptionTypes}
            itemTemplate={moneyTransactionOptionTemplate}
            onChange={(val) => {
              debugger;
              const newV: IMoneyTransaction = {
                ...currentTransaction,
                type: val as IMoneyTransactionType,
              };
              setCurrentTransaction(newV);
            }}
          ></LabelSelectButtons>
        </div>
        <div className="flex mt10">
          <LabelNumericInput
            autoFocus
            label="Suma: "
            lwidth="135px"
            // autoFocus
            onChange={(val: number) => {
              setError("");
              const newV: IMoneyTransaction = {
                ...currentTransaction,
                amount: val,
              };
              setCurrentTransaction(newV);
            }}
            value={currentTransaction?.amount}
            onEnter={() => triggerSaveCategory()}
          ></LabelNumericInput>
        </div>
        <div className="flex mt10">
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
        </div>

        <div className="flex mt10">
          <LabelDropDown
            label={"Cont: "}
            lwidth="135px"
            onChange={(accountId) => {
              debugger;
              const newItem: IMoneyTransaction = {
                ...moneyTransaction,
                accountId,
              };
              setCurrentTransaction(newItem);
            }}
            options={accounts}
            value={currentTransaction.accountId}
            optionLabel="name"
            optionValue="_id"
          ></LabelDropDown>
        </div>

        <div className="mt10">
          <WysYWYG
            html={currentTransaction.description}
            setHtml={(val) =>
              setCurrentTransaction({ ...currentTransaction, description: val })
            }
          />
        </div>

        <div className="error">{error}</div>
        <div className="flex space-between mt10">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => {
              console.log(moneyTransaction);
              console.log(currentTransaction);
              triggerSaveCategory();
            }}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};

export default AddEditMoneyTransaction;
