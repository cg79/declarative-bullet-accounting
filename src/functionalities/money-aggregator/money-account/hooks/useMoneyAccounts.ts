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

  const getAccountsForAUser = async (
    userid: string
  ): Promise<IMoneyAccount[]> => {
    if (!loggedUser) {
      return [];
    }

    const userIdValue = userid || loggedUser._id;

    const collectionName = MONEY_ACCOUNT_COLLECTION(loggedUser as ILoggedUser);
    const response = await executeMethod()
      .collection((c) => c.name(collectionName).method(BULLET_METHOD.FIND))
      .search((s) =>
        s.findByObject({
          userid: userIdValue,
        })
      )
      .execute();

    if (!response.success) {
      return [];
    }

    return response.data;
  };

  const refreshAccounts = useCallback(() => {
    if (!loggedUser) {
      return;
    }

    getAccountsForAUser(loggedUser._id)
      .then((response) => {
        helpers.checkHttpResponseForErrors(response);
        updateAccountsValue(response);
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
    getAccountsForAUser,
  };
};

export default useMoneyAccounts;
