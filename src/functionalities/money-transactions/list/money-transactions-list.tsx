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
import { getDefaultMoneyTransaction } from "../money-helpers";
import useMoneyTransactions from "../hooks/useMoneyTransactions";
import useMoneyEntities from "../../money-entity/hooks/useMoneyEntities";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";

const MoneyTransactionsList = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { accounts, selectedAccount } = useBetween(useMoneyAccounts);
  const { selectedCategory, setUpdatedCategories, newTransactionAdded } =
    useBetween(useCategoryState);

  const [filterBy, setFilterBy] = useState({});
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
    if (!selectedCategory) {
      return;
    }
    if (!selectedCategory.parentId) {
      return setFilterBy({});
    }
    setFilterBy({
      category_id: selectedCategory?._id,
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }

    setFilterBy({
      accountId: selectedAccount?._id,
    });
  }, [selectedAccount]);

  useEffect(() => {
    setCollectionName(
      MONEY_TRANSACTIONS_COLLECTION(
        loggedUser as ILoggedUser,
        selectedMoneyEntity
      )
    );
  }, [selectedMoneyEntity]);

  const createItem = (): IMoneyTransaction =>
    getDefaultMoneyTransaction(selectedCategory, selectedMoneyEntity, accounts);

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
      // const { categories, transactionResponse } = response.data;
      // setUpdatedCategories(categories);
      // observer.publish("UPDATE_TRANSACTION", transactionResponse);
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
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Tranzactie"
        isButtonDisabled={!selectedCategory}
        // addItemTemplate={() => <></>}
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
