import { useCallback, useEffect, useState } from 'react';
import useApi from '../../../../hooks/useApi';
import useIdentity, { ILoggedUser } from '../../../../_store/useIdentity';
import { IMoneyAccount } from '../money-account-type';
import { helpers } from '../../../../_utils/helpers';
import { MONEY_ACCOUNT_COLLECTION } from '../constants';
import { BULLET_METHOD } from '../../../../_fluentApi/fluent/constants';
import { useBetween } from '../../../../hooks/useBetween';

const useMoneyAccounts = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod } = useApi();
  const [selectedAccount, setSelectedAccount] = useState<IMoneyAccount>();
  const [accounts, setAccounts] = useState<IMoneyAccount[] | null>(null);

  const updateAccountsValue = useCallback(
    (newAccounts: IMoneyAccount[]) => {
      setAccounts(newAccounts);
    },
    [setAccounts]
  );

  const getAccountById = useCallback(
    (id: string) => {
      return (accounts || []).find((account) => account._id === id);
    },
    [accounts]
  );

  const refreshAccounts = useCallback(() => {
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
      })
      .catch((error) => {
        console.error('Error refreshing accounts:', error);
      });
  }, [executeMethod, loggedUser, updateAccountsValue]);

  useEffect(() => {
    refreshAccounts();
  }, [loggedUser]);

  return {
    selectedAccount,
    setSelectedAccount,
    accounts,
    refreshAccounts,
    getAccountById,
  };
};

export default useMoneyAccounts;
