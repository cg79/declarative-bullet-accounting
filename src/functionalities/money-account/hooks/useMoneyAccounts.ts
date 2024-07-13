import { useCallback, useEffect, useState } from "react";
import { useBetween } from "use-between";
import useApi from "../../../hooks/useApi";
import useIdentity, { ILoggedUser } from "../../../_store/useIdentity";
import { IMoneyAccount } from "../money-account-type";
import { helpers } from "../../../_utils/helpers";
import { MONEY_ACCOUNT_COLLECTION } from "../constants";
import { BULLET_METHOD } from "../../../_fluentApi/fluent/constants";

const useMoneyAccounts = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [selectedAccount, setSelectedAccount] = useState<IMoneyAccount>();
  const [accounts, setAccounts] = useState<IMoneyAccount[]>([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [reloadAccounts, setReloadAccounts] = useState("");

  const getAccountById = useCallback(
    (id: string) => {
      return accounts.find((account) => account._id === id);
    },
    [accounts]
  );

  const refresh = useCallback(() => {
    setReloadAccounts(new Date().toISOString());
  }, [selectedAccount]);

  const refreshAccounts = useCallback(() => {
    if (!loggedUser) {
      return;
    }
    setReloadAccounts("");

    const collectionName = MONEY_ACCOUNT_COLLECTION(loggedUser as ILoggedUser);
    executeMethod()
      .collection((c) => c.name(collectionName).method(BULLET_METHOD.FIND))
      .execute()
      .then((response) => {
        helpers.checkHttpResponseForErrors(response);
        setAccounts(response.data);
        setAccountsLoaded(true);
      });
  }, [loggedUser]);

  useEffect(() => {
    refreshAccounts();
  }, [loggedUser]);

  useEffect(() => {
    if (reloadAccounts) {
      refreshAccounts();
    }
  }, [reloadAccounts]);

  return {
    selectedAccount,
    setSelectedAccount,
    accounts,
    refresh,
    accountsLoaded,
    getAccountById,
  };
};

export default useMoneyAccounts;
