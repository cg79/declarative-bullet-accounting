import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { AccountingInput } from "./accounting-input";
import { IAddEditTransactionValues } from "../model/accounting_types";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";
import { Dialog } from "primereact/dialog";
import useAccountingDbActions from "../hook/useAccountingDbActions";
import { createDefaultIAddEditTransactionValues } from "../model/helpers";
import { useTransactions } from "../hook/useTransactions";

export const AddTransaction = () => {
  const [addMode, setAddMode] = useState<boolean>(false);
  const uptadeAddMode = () => setAddMode(!addMode);
  const { selectedAngajat, selectedFirma } = useBetween(useFirme);
  const [error, setError] = useState("");
  const { addAccountingRecord } = useAccountingDbActions();
  const { reloadAccountingRecords } = useBetween(useTransactions);

  const executeAddAccountingAction = async (
    accountingValues: IAddEditTransactionValues
  ) => {
    if (!selectedAngajat) {
      return;
    }
    if (!selectedFirma) {
      return;
    }
    setError("");

    return addAccountingRecord(accountingValues, selectedAngajat._id).then(
      (value) => {
        console.log(value);
      }
    );
  };

  const onAddAccountingRecord = (val: IAddEditTransactionValues) => {
    //todo/ asta nu ar trebuii sa fie aici
    return executeAddAccountingAction(val).then(() => {
      setAddMode(false);
      reloadAccountingRecords();
    });
  };

  return (
    <div className="">
      {error && <p>{error}</p>}
      {addMode ? (
        <div>
          <Dialog
            header="Adaugare tranzactie"
            visible={addMode}
            style={{ width: "50vw" }}
            onHide={() => setAddMode(false)}
          >
            <AccountingInput
              onSave={(val: IAddEditTransactionValues) =>
                onAddAccountingRecord(val)
              }
              onCancel={() => uptadeAddMode()}
              addEditTransactionValues={createDefaultIAddEditTransactionValues()}
            ></AccountingInput>
          </Dialog>
        </div>
      ) : (
        <div className="fcenter">
          <MyButton
            onClick={() => uptadeAddMode()}
            text={"Adaugare Tranzactie"}
            disabled={selectedAngajat?._id === ""}
          ></MyButton>
        </div>
      )}
    </div>
  );
};
