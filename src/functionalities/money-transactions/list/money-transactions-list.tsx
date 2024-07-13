import { useBetween } from "use-between";
import GenericList from "../../todo/list/GenericList";
import AddEditMoneyTransaction from "../add-edit/add-edit-money-transaction";
import {
  IMoneyTransaction,
  IMoneyTransactionType,
} from "../money-transaction-type";
import useCategoryState from "../../categories/hooks/useCategoryState";
import useIdentity, { ILoggedUser } from "../../../_store/useIdentity";
import { MONEY_TRANSACTIONS_COLLECTION } from "../constants";
import { utils } from "../../../_utils/utils";
import observer from "../../../_store/observer";
import { useEffect, useState } from "react";
import {
  createFilterExpression,
  getDefaultMoneyTransaction,
} from "../money-helpers";
import useMoneyTransactions from "../hooks/useMoneyTransactions";
import useMoneyEntities from "../../money-entity/hooks/useMoneyEntities";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";
import useMoneyTransactionsFilter, {
  IMoneyTransactionsFilter,
} from "../hooks/useMoneyTransactionsFilter";
import MyIcon from "../../../_components/reuse/my-icon";

const MoneyTransactionsList = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { accounts, getAccountById } = useBetween(useMoneyAccounts);
  const { selectedCategory, getCategoryById, newTransactionAdded } =
    useBetween(useCategoryState);

  const { filterBy } = useBetween(useMoneyTransactionsFilter);

  const { saveMoneyTransaction, deleteMoneyTransaction } =
    useBetween(useMoneyTransactions);
  const { moneyTransactionFilter } = useBetween(useMoneyTransactionsFilter);

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
      debugger;
      setCollectionName(newCollectionName);
    }
  }, [selectedMoneyEntity]);

  // useEffect(() => {
  //   debugger;
  //   updateFilterBy({
  //     ...moneyTransactionFilter,
  //   });
  // }, [moneyTransactionFilter]);

  const createItem = (): IMoneyTransaction =>
    getDefaultMoneyTransaction(
      selectedCategory,
      selectedMoneyEntity,
      accounts,
      loggedUser
    );

  const onSaveMoneyTransaction = (moneyTransaction: IMoneyTransaction) => {
    // console.log(moneyTransaction);
    return saveMoneyTransaction(moneyTransaction).then((response: any) => {
      //
      observer.publish("ENABLE_SHORTCUT", true);
      if (!response.success) {
        return;
      }
      if (selectedCategory) {
        newTransactionAdded(response.data.categories[0]);
      }

      // const { categories, transactionResponse } = response.data;
      // setUpdatedCategories(categories);
      // observer.publish("UPDATE_TRANSACTION", transactionResponse);
    });
  };

  const onDeleteMoneyTransaction = (moneyTransaction: IMoneyTransaction) => {
    moneyTransaction.parentIds = selectedCategory?.parentIds || [];
    // console.log(moneyTransaction);
    return deleteMoneyTransaction(moneyTransaction).then((response: any) => {
      //
      observer.publish("ENABLE_SHORTCUT", true);
      if (!response.success) {
        return;
      }
      newTransactionAdded(response.data.categories[0]);
    });
  };

  const renderAddEditContent = (
    item: IMoneyTransaction,
    onSave: (item: IMoneyTransaction) => Promise<unknown>,
    onCancel: () => void
  ) => {
    observer.publish("DISABLE_SHORTCUT", false);
    return (
      <AddEditMoneyTransaction
        category={selectedCategory}
        moneyTransaction={item}
        onSaveMoneyTransaction={onSave}
        onCancel={() => {
          observer.publish("ENABLE_SHORTCUT", true);
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
        fieldHeader={[
          {
            field: "date",
            header: "Data",
            body: (item) => utils.dateNumberToYYYYMMDD(item.date),
          },
          {
            field: "amount",
            header: "Suma",
          },
          {
            field: "description",
            header: "Descriere",
            body: (item) => item.description,
          },
          {
            field: "type",
            header: "Tip",
            body: (item) => {
              switch (item.type) {
                case IMoneyTransactionType.INCOME:
                  return "Tranzactie de cheltuiala";
                case IMoneyTransactionType.EXPENSE:
                  return "Tranzactie de cheltuiala";
                case IMoneyTransactionType.TRANSFER:
                  return "Tranzactie de transfer";
              }
            },
          },
          {
            field: "category_id",
            header: "Categorie",
            body: (item) =>
              getCategoryById(item.category_id)?.label || item.category_id,
          },
          {
            field: "account_id",
            header: "Cont",
            body: (item: IMoneyTransaction) =>
              getAccountById(item.accountId)?.name || item.accountId,
          },
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Tranzactie"
        isButtonDisabled={!selectedCategory}
        renderAddEditContent={renderAddEditContent}
        collectionName={collectionName}
        sortBy={[{ field: "date", ascending: false }]}
        filterBy={filterBy}
        modalTitle={() => selectedCategory?.label || "Adaugare Tranzactie"}
        customSaveFunction={onSaveMoneyTransaction}
        customDeleteFunction={onDeleteMoneyTransaction}
      ></GenericList>
    </>
  );
};

export default MoneyTransactionsList;
