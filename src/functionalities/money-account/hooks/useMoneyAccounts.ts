import { useCallback, useEffect, useState } from "react";
import { useBetween } from "use-between";
import useApi from "../../../hooks/useApi";
import useIdentity, { ILoggedUser } from "../../../_store/useIdentity";
import { IMoneyAccount } from "../money-account-type";
import { helpers } from "../../../_utils/helpers";
import { MONEY_ACCOUNT_COLLECTION } from "../constants";
import { BULLET_METHOD } from "../../../_fluentApi/fluent/constants";
import { utils } from "../../../_utils/utils";

const useMoneyAccounts = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [selectedAccount, setSelectedAccount] = useState<IMoneyAccount>();
  const [accounts, setAccounts] = useState<IMoneyAccount[]>([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const guid = utils.createUUID();

  const updateAccountsValue = useCallback(
    (newAccounts: IMoneyAccount[]) => {
      setAccounts(newAccounts);
    },
    [setAccounts]
  );

  const getAccountById = useCallback(
    (id: string) => {
      return accounts.find((account) => account._id === id);
    },
    [accounts]
  );

  // const refresh = useCallback(() => {
  //   setReloadAccounts(new Date().toISOString());
  // }, []);

  const getAccounts = () => accounts;

  const refreshAccounts = () => {
    if (!loggedUser) {
      return;
    }

    const collectionName = MONEY_ACCOUNT_COLLECTION(loggedUser as ILoggedUser);
    executeMethod()
      .collection((c) => c.name(collectionName).method(BULLET_METHOD.FIND))
      .execute()
      .then((response) => {
        helpers.checkHttpResponseForErrors(response);
        updateAccountsValue(response.data);
        setAccountsLoaded(true);
      })
      .catch((error) => {
        console.error("Error refreshing accounts:", error);
      });
  };

  useEffect(() => {
    refreshAccounts();
  }, [loggedUser]);

  return {
    selectedAccount,
    setSelectedAccount,
    accounts,
    refreshAccounts,
    accountsLoaded,
    getAccountById,
    guid,
    getAccounts,
  };
};

export default useMoneyAccounts;
