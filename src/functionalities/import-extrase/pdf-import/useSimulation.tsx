import { useBetween } from "use-between";
import useFirme from "../../../_store/useFirme";

import {
  IAccountingRecord,
  IAccountingValues,
  IAddEditTransactionValues,
} from "../../transactions/model/accounting_types";
import { executeAccountingLamda } from "../../logic/accounting_lamda";
import useSalary from "../../employee/salary/useSalary";
import useTaxes from "../../taxes/useTaxes";
import { useState } from "react";
import { STARTING_ACCOUNT_VALUES } from "../../transactions/constants/accounting_constants";
import useLamdaFunctions from "../../lamda/useLamdaFunctions";
import { DeltaFunction } from "../../transactions/hook/useAccountingDbActions";
import { utils } from "../../../_utils/utils";

export const useSimulation = () => {
  const [previousCasa, setPreviousCasa] = useState<IAccountingValues>(
    STARTING_ACCOUNT_VALUES
  );

  const resetCasa = () => {
    setPreviousCasa(STARTING_ACCOUNT_VALUES);
  };
  const { selectedAngajat, selectedFirma } = useBetween(useFirme);
  const { salaries, areSalariesLoaded, reload } = useBetween(useSalary);
  const { countryTaxesList } = useBetween(useTaxes);

  const { getAccountingLamda } = useBetween(useLamdaFunctions);
  // const { transactions } = useBetween(useImportTransactions);
  const simulateImportTransaction = async (
    trans: IAddEditTransactionValues
  ): Promise<IAccountingRecord | null> => {
    if (!selectedFirma) {
      return null;
    }
    if (!selectedAngajat) {
      return null;
    }

    if (!areSalariesLoaded) {
      await reload();
    }

    // const tDate = getDateFromString(trans.date, "dd/mm/yyyy");
    // const tDate = trans.data;
    // const fDate = trans.dataTranzactie || tDate;
    const accountingValues: IAddEditTransactionValues = {
      guid: trans.guid || utils.createUUID(),
      suma: trans.suma,
      operationid: trans.operationid,
      dataInregistrare: trans.dataInregistrare,
      dataTranzactie: trans.dataTranzactie || trans.dataInregistrare,
      description: trans.description,
      factura: trans.factura,
    };
    const lamda: DeltaFunction | null = await getAccountingLamda();
    if (!lamda) {
      return null;
    }
    const accountingResponse = executeAccountingLamda(
      lamda,
      previousCasa,
      countryTaxesList,
      salaries,
      accountingValues
    );
    setPreviousCasa(accountingResponse.newConta);

    const response: IAccountingRecord = {
      guid: accountingResponse.guid,
      simulation: true,
      trace: accountingResponse,
    };
    return response;
  };

  return {
    simulateImportTransaction,
    resetCasa,
  };
};

export default useSimulation;
