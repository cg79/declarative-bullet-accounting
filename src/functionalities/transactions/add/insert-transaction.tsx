import { useState } from "react";
import { AccountingInput } from "./accounting-input";
import { IAddEditTransactionValues } from "../model/accounting_types";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";
import useAccountingDbActions from "../hook/useAccountingDbActions";
import { createDefaultIAddEditTransactionValues } from "../model/helpers";
import { useTransactions } from "../hook/useTransactions";

//not used
export const InsertTransaction = ({ onCancel, accountingRecord }) => {
  const { selectedAngajat, selectedFirma } = useBetween(useFirme);
  const [error, setError] = useState("");
  const { insertAccountingAction } = useAccountingDbActions();
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

    return insertAccountingAction(
      accountingRecord,
      accountingValues,
      selectedAngajat
    ).then((value) => {
      console.log(value);
    });
  };

  const onAddAccountingRecord = (val: IAddEditTransactionValues) => {
    return executeAddAccountingAction(val).then(() => {
      reloadAccountingRecords();
    });
  };

  return (
    <div className="flex center-h">
      <div>
        <AccountingInput
          onSave={(val: IAddEditTransactionValues) =>
            onAddAccountingRecord(val)
          }
          onCancel={onCancel}
          addEditTransactionValues={createDefaultIAddEditTransactionValues()}
        ></AccountingInput>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
