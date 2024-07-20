import { useCallback, useState } from "react";
import { useBetween } from "use-between";
import useApi from "../../../hooks/useApi";
import useIdentity from "../../../_store/useIdentity";
import {
  IMoneyTransaction,
  IMoneyTransactionType,
} from "../money-transaction-type";

const useMoneyTransactions = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();

  const saveMoneyTransaction = useCallback(
    async (moneyTransaction: IMoneyTransaction) => {
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
        };
      }
      if (moneyTransaction.amount < 0) {
        moneyTransaction.amount = Math.abs(moneyTransaction.amount);
      }
      const { type } = moneyTransaction;
      if (type === IMoneyTransactionType.INCOME) {
        moneyTransaction.income = moneyTransaction.amount;
      } else {
        moneyTransaction.expense = moneyTransaction.amount;
      }

      return executeMethodFromModule({
        method: "addOrEditMoneyTransaction",
        moduleName: "accounting",

        body: moneyTransaction,
      });
    },
    [loggedUser]
  );

  const deleteMoneyTransaction = useCallback(
    async (moneyTransaction: IMoneyTransaction) => {
      // const {startAccountingData}  = useStartAccountingData();
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
        };
      }
      return executeMethodFromModule({
        method: "deleteMoneyTransaction",
        moduleName: "accounting",

        body: moneyTransaction,
      });
    },
    []
  );

  return {
    saveMoneyTransaction,
    deleteMoneyTransaction,
  };
};

export default useMoneyTransactions;
