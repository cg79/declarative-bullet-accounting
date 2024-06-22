import { useState } from "react";
import { useBetween } from "use-between";
import useFirme from "../../../_store/useFirme";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";
import { IAddEditTransactionValues } from "../../transactions/model/accounting_types";

import useDeclarativeBulletApi from "../../../hooks/useDeclarativeBulletApi";
import { utils } from "../../../_utils/utils";
import { helpers } from "../../../_utils/helpers";

const useImportTransactions = () => {
  const [importedTransactions, setImportedTransactions] = useState([]);
  const [forRefresh, setForRefresh] = useState("");

  const { pdfAngajatCollection, selectedAngajat, selectedFirma } =
    useBetween(useFirme);

  const {
    addAccountingRecordFromPdfImport,
    addMultipleAccountingRecordsFromPdfImport,
  } = useAccountingDbActions();
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  // const importTransaction = async (
  //   accountingValues: IAddEditTransactionValues
  // ) => {
  //   if (!selectedFirma) {
  //     return;
  //   }

  //   if (!selectedAngajat) {
  //     return;
  //   }

  //
  //   accountingValues.imported = true;
  //   accountingValues.checked = false;
  //   const response = await addAccountingRecordFromPdfImport(
  //     accountingValues,
  //     selectedAngajat,
  //     selectedFirma?._id
  //   );
  //   const accountingRecord = { trace: response.data };

  //   // setTransactions([...transactions]);
  //   return accountingRecord;
  // };

  const importTransactions = async () => {
    if (!selectedFirma) {
      return;
    }

    if (!selectedAngajat) {
      return;
    }
    let trans: IAddEditTransactionValues;
    let fileTransaction: any = null;

    const ggg: { accountingRequest: IAddEditTransactionValues }[] = [];

    for await (fileTransaction of importedTransactions) {
      for await (trans of fileTransaction.dates) {
        if (trans.checked) {
          trans.imported = true;
          trans.checked = false;
          trans.guid = utils.createUUID();
          if (!trans.dataTranzactie) {
            trans.dataTranzactie = trans.dataInregistrare;
          }
          ggg.push({ accountingRequest: trans });
        }
      }
    }

    await addMultipleAccountingRecordsFromPdfImport(
      ggg,
      selectedAngajat,
      selectedFirma?._id
    );
    setForRefresh(new Date().toString());
  };

  const setTransactionAccountingRecord = (
    transaction: any,
    accountingRecord
  ) => {
    transaction.accountingRecord = accountingRecord;
    setImportedTransactions([...importedTransactions]);
    setForRefresh(new Date().toString());
  };

  const selectDeselectAllTransactions = async (selected) => {
    importedTransactions.forEach((transaction: any) => {
      transaction.dates.forEach((trans: any) => {
        if (!trans.imported) {
          trans.checked = selected ? true : false;
        }
      });
    });
    setImportedTransactions([...importedTransactions]);
  };

  const getSelectedTransactionsCount = () => {
    let count = 0;
    importedTransactions.forEach((transaction: any) => {
      transaction.dates.forEach((trans: any) => {
        if (trans.checked) {
          count++;
        }
      });
    });
    return count;
  };

  const toggleSelection = (transaction: any) => {
    transaction.checked = !!!transaction.checked;
    setImportedTransactions([...importedTransactions]);
  };

  const setFacturaForTransaction = (transaction: any, factura) => {
    transaction.factura = factura;
    setImportedTransactions([...importedTransactions]);
  };

  const setOperationId = (transaction: any, operationid) => {
    transaction.operationid = operationid;
    setImportedTransactions([...importedTransactions]);
  };

  const setTransactionDate = (transaction: any, date) => {
    transaction.date = date;
    setImportedTransactions([...importedTransactions]);
  };

  const setTransactionFacturaDate = (
    transaction: IAddEditTransactionValues,
    date
  ) => {
    transaction.dataTranzactie = date;
    setImportedTransactions([...importedTransactions]);
  };

  const parsePdfFile = async (uploadedFiles) => {
    const body: any = {
      bucket: pdfAngajatCollection,
      list: [],
    };
    uploadedFiles.forEach((file: any) => {
      console.log(file);
      if (file.checked) {
        // request.bucket = record.files.bucket;
        body.list.push(file.name);
      }
    });

    const bulletHttp = createBulletHttpRequestLibrary();
    const response = await bulletHttp.executeMethodFromModule({
      method: "executeParseBtFiles",
      moduleName: "pdfParser",
      body: body,
    });
    helpers.checkHttpResponseForErrors(response);
    if (!response.success) {
      return;
    }

    setImportedTransactions(response.data);
  };

  const resetTransactions = () => {
    setImportedTransactions([]);
  };

  return {
    importedTransactions,
    // importTransaction,
    importTransactions,
    selectDeselectAllTransactions,
    getSelectedTransactionsCount,
    toggleSelection,
    setOperationId,
    setTransactionDate,
    setTransactionFacturaDate,
    parsePdfFile,
    resetTransactions,
    setFacturaForTransaction,
    setTransactionAccountingRecord,
    forRefresh,
    setForRefresh,
  };
};

export default useImportTransactions;
