import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { AccountingInput } from "./accounting-input";
import { IAddEditTransactionValues } from "../model/accounting_types";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";
import { Dialog } from "primereact/dialog";
import useAccountingDbActions from "../hook/useAccountingDbActions";
import { accountingRecordToIAddEditTransactionValues } from "../model/helpers";
import { useTransactions } from "../hook/useTransactions";

export const EditTransaction = ({ onCancel, accountingRecord }) => {
  const [addMode, setAddMode] = useState<boolean>(true);
  const uptadeAddMode = () => {
    setAddMode(!addMode);
    onCancel();
  };
  const { selectedAngajat, selectedFirma } = useBetween(useFirme);
  const [error, setError] = useState("");
  const { updateAccountingAction } = useAccountingDbActions();
  const { reloadAccountingRecords } = useBetween(useTransactions);

  const executeUpdateAccountingAction = async (
    accountingValues: IAddEditTransactionValues
  ) => {
    if (!selectedAngajat) {
      return;
    }
    if (!selectedFirma) {
      return;
    }
    setError("");

    return updateAccountingAction(
      accountingRecord,
      accountingValues,
      selectedAngajat
    ).then((value) => {
      console.log(value);
    });
  };

  // const deleteTransaction = () => {
  //   if (!selectedAngajat) {
  //     return;
  //   }
  //   deleteAccountingRecord(accountingRecord, selectedAngajat._id).then(() => {
  //     onCancel();
  //     reloadAccountingRecords();
  //   });
  // };

  const onUpdateAccountingRecord = (val: IAddEditTransactionValues) => {
    return executeUpdateAccountingAction(val).then(() => {
      setAddMode(false);
      reloadAccountingRecords();
      onCancel();
    });
  };

  return (
    <div className="flex center-h">
      {error && <p>{error}</p>}
      {addMode ? (
        <div>
          {/* <Dialog
            header="Modificare tranzactie"
            visible={addMode}
            style={{ width: "80vw" }}
            onHide={() => setAddMode(false)}
          > */}
          <AccountingInput
            onSave={(val: IAddEditTransactionValues) => {
              return onUpdateAccountingRecord(val);
            }}
            onCancel={() => uptadeAddMode()}
            addEditTransactionValues={accountingRecordToIAddEditTransactionValues(
              accountingRecord
            )}
          ></AccountingInput>

          {/* <div className="fcenter">
              <MyButton
                onClick={() => deleteTransaction()}
                text={"Sterge tranzactia"}
                disabled={selectedAngajat?._id === ""}
              ></MyButton>
            </div> */}
          {/* </Dialog> */}
        </div>
      ) : (
        <div>
          <MyButton
            onClick={() => uptadeAddMode()}
            text={"Adaugare"}
            disabled={selectedAngajat?._id === ""}
          ></MyButton>
        </div>
      )}
    </div>
  );
};
