import { useBetween } from '../../../../hooks/useBetween';
import GenericList from '../../../todo/list/GenericList';
import AddEditMoneyTransaction from '../add-edit/add-edit-money-transaction';
import {
  IMoneyTransaction,
  IMoneyTransactionType,
  IMoneyTransactionTypeIcons,
} from '../money-transaction-type';
import useCategoryState from '../../categories/hooks/useCategoryState';
import useIdentity, { ILoggedUser } from '../../../../_store/useIdentity';
import { MONEY_TRANSACTIONS_COLLECTION } from '../constants';
import { utils } from '../../../../_utils/utils';
import observer from '../../../../_store/observer';
import { useEffect, useState } from 'react';
import { getDefaultMoneyTransaction } from '../money-helpers';
import useMoneyTransactions from '../hooks/useMoneyTransactions';
import useMoneyEntities from '../../money-entity/hooks/useMoneyEntities';
import useMoneyAccounts from '../../money-account/hooks/useMoneyAccounts';
import useMoneyTransactionsFilter, {
  IMoneyTransactionsFilter,
} from '../hooks/useMoneyTransactionsFilter';
import MyIcon from '../../../../_components/reuse/my-icon';
import parse from 'html-react-parser';
import { MyButton } from '../../../../_components/reuse/my-button';
import useTranslations from '../../../translations/useTranslations';
import { LabelDropDown } from '../../../../_components/reuse/LabelDropDown';
import { ICategory } from '../../categories/category-type';
import { EntityUser } from '../../../user/types';

const MoneyTransactionsList = ({ users }: { users: EntityUser[] }) => {
  const { currentTranslation } = useBetween(useTranslations);
  const { loggedUser } = useBetween(useIdentity);
  const { accounts, getAccountById } = useBetween(useMoneyAccounts);
  const {
    selectedCategory,
    setSelectedCategory,
    getCategoryById,
    newTransactionAdded,
    categories,
  } = useBetween(useCategoryState);

  const { filterBy } = useBetween(useMoneyTransactionsFilter);

  const { saveMoneyTransaction, deleteMoneyTransaction } =
    useBetween(useMoneyTransactions);

  const { selectedMoneyEntity } = useBetween(useMoneyEntities);

  const [collectionName, setCollectionName] = useState(
    MONEY_TRANSACTIONS_COLLECTION(
      loggedUser as ILoggedUser,
      selectedMoneyEntity
    )
  );

  useEffect(() => {
    const newCollectionName = MONEY_TRANSACTIONS_COLLECTION(
      loggedUser as ILoggedUser,
      selectedMoneyEntity
    );
    if (collectionName !== newCollectionName) {
      setCollectionName(newCollectionName);
    }
  }, [selectedMoneyEntity]);

  const createItem = (): IMoneyTransaction =>
    getDefaultMoneyTransaction(
      selectedCategory,
      selectedMoneyEntity,
      accounts || [],
      loggedUser
    );

  const onSaveMoneyTransaction = (moneyTransaction: IMoneyTransaction) => {
    if (selectedMoneyEntity && selectedMoneyEntity?._id) {
      moneyTransaction.entityId = selectedMoneyEntity._id;
    }

    // console.log(moneyTransaction);
    return saveMoneyTransaction(moneyTransaction).then((response: any) => {
      //
      observer.publish('ENABLE_SHORTCUT', true);
      if (!response.success) {
        return;
      }
      const { data } = response;
      // if (selectedCategory) {
      newTransactionAdded(data.category);
      // }

      // const { categories, transactionResponse } = response.data;
      // setUpdatedCategories(categories);
      // observer.publish("UPDATE_TRANSACTION", transactionResponse);
    });
  };

  const onDeleteMoneyTransaction = (moneyTransaction: IMoneyTransaction) => {
    return deleteMoneyTransaction(moneyTransaction).then((response: any) => {
      //
      observer.publish('ENABLE_SHORTCUT', true);
      if (!response.success) {
        return;
      }
      newTransactionAdded(response.data.category);
      // newTransactionAdded(response.data.categories[0]);
    });
  };

  const renderAddEditContent = (
    item: IMoneyTransaction,
    onSave: (item: IMoneyTransaction) => Promise<unknown>,
    onCancel: () => void
  ) => {
    observer.publish('DISABLE_SHORTCUT', false);

    return (
      <AddEditMoneyTransaction
        category={selectedCategory}
        users={users}
        moneyTransaction={{ ...item }}
        onSaveMoneyTransaction={onSave}
        onCancel={() => {
          observer.publish('ENABLE_SHORTCUT', true);
          onCancel();
        }}
      ></AddEditMoneyTransaction>
    );
  };

  const renderActions = (
    item: IMoneyTransaction,
    setItem: any,
    setItemToBeDeleted: any
  ) => {
    if (item.userid !== loggedUser?._id) {
      return null;
    }
    return (
      <div className="fcenter">
        <div className="ml10">
          <MyIcon
            disabled={item.userid !== loggedUser?._id}
            icon="pi pi-calendar"
            tooltip="Edit"
            onClick={() => setItem(item)}
          ></MyIcon>
        </div>

        <div className="ml10">
          <MyIcon
            disabled={item.userid !== loggedUser?._id}
            icon="pi pi-trash"
            tooltip="Delete"
            onClick={() => setItemToBeDeleted(item)}
          ></MyIcon>
        </div>
      </div>
    );
  };

  return (
    <>
      <GenericList
        renderCreateFirstItem={(onClickFunction) => (
          <div className="mt10">
            {/* {JSON.stringify(selectedFirma)} */}
            <div className="ml5">
              <MyButton
                text={currentTranslation.MONEY_TRANSACTIONS.addTransaction}
                onClick={onClickFunction}
              ></MyButton>
            </div>
          </div>
        )}
        fieldHeader={[
          {
            field: 'username',
            header: 'User',
            body: (item: IMoneyTransaction) => {
              if (!item.username) {
                return null;
              }
              if (item.touserid) {
                const toUser = users.find((el) => el.userid === item.touserid);
                if (toUser) {
                  return (
                    <div>
                      <div>{item.username}</div>
                      <div>{toUser.nick}</div>
                    </div>
                  );
                }
              }
              return item.username;
            },
          },
          {
            field: 'date',
            header: 'Data',
            body: (item) => utils.dateNumberToYYYYMMDD(item.tdate),
            // body: (item: IMoneyTransaction) => item.tdate,
          },
          {
            field: 'amount',
            header: 'Suma',
          },
          {
            field: 'description',
            header: 'Descriere',
            body: (item: IMoneyTransaction) =>
              item.description ? parse(item.description) : null,
          },
          {
            field: 'type',
            header: 'Tip',
            style: { textAlign: 'center' },
            body: (item) => {
              switch (item.type) {
                case IMoneyTransactionType.INCOME:
                  return (
                    <MyIcon icon={IMoneyTransactionTypeIcons.INCOME}></MyIcon>
                  );
                case IMoneyTransactionType.EXPENSE:
                  return (
                    <MyIcon icon={IMoneyTransactionTypeIcons.EXPENSE}></MyIcon>
                  );
                case IMoneyTransactionType.TRANSFER:
                  return (
                    <MyIcon icon={IMoneyTransactionTypeIcons.TRANSFER}></MyIcon>
                  );
              }
            },
          },
          {
            field: 'category_id',
            header: 'Categorie',
            body: (item) =>
              getCategoryById(item.category_id)?.label || item.category_id,
          },
          {
            field: 'accountId',
            header: 'Cont',
            body: (item: IMoneyTransaction) => {
              return (
                (getAccountById(item.accountId)?.name || '?') +
                ': ' +
                item.accountAmount
              );
              // return item.accountAmount;
              // return (
              //   (getAccountById(item.accountId)?.name || item.accountId || "") +
              //   (item.accountAmount || "")
              // );
            },
          },
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Tranzactie"
        isButtonDisabled={!selectedCategory}
        renderAddEditContent={renderAddEditContent}
        collectionName={collectionName}
        sortBy={[{ field: 'tdate', ascending: false }]}
        filterBy={filterBy}
        // modalTitle={(item: IMoneyTransaction) =>
        //   selectedCategory?.label || 'Adaugare Tranzactie'
        // }
        modalTitle={(item: IMoneyTransaction, isForDeletion) => {
          if (isForDeletion) {
            return item.amount;
          }
          return (
            <div className="flex">
              <LabelDropDown
                label={currentTranslation.CATEGORIES.categories}
                lwidth="135px"
                onChange={(category: ICategory) => {
                  setSelectedCategory(category);
                }}
                options={categories || []}
                value={selectedCategory}
                optionLabel="label"
                optionValue="_id"
              ></LabelDropDown>
            </div>
          );
        }}
        customSaveFunction={onSaveMoneyTransaction}
        customDeleteFunction={onDeleteMoneyTransaction}
        renderActions={renderActions}
      ></GenericList>
    </>
  );
};

export default MoneyTransactionsList;
