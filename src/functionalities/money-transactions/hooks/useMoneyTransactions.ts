import { useCallback, useState } from "react";
import { useBetween } from "use-between";
import useApi from "../../../hooks/useApi";
import useIdentity from "../../../_store/useIdentity";
import { IMoneyTransaction } from "../money-transaction-type";

const useMoneyTransactions = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();

  const saveMoneyTransaction = useCallback(
    async (moneyTransaction: IMoneyTransaction) => {
      // const {startAccountingData}  = useStartAccountingData();
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
        };
      }
      return executeMethodFromModule({
        method: "addMoneyTransaction",
        moduleName: "accounting",

        body: moneyTransaction,
      });
      // - daca nu exista, le insereaza
      // return executeMethod()
      //   .collection((c) =>
      //     c
      //       .name(MONEY_TRANSACTIONS_COLLECTION(loggedUser))
      //       .method(BULLET_METHOD.INSERT_OR_UPDATE)
      //   )
      //   .body(moneyTransaction)

      //   .execute({
      //     beforeSendingRequest: (apiBulletJSON: any) => {
      //       console.log(JSON.stringify(apiBulletJSON));
      //     },
      //   });
    },
    []
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
