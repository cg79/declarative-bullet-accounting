import { useBetween } from "use-between";
import GenericList from "../../todo/list/GenericList";
import useIdentity, { ILoggedUser } from "../../../_store/useIdentity";
import { utils } from "../../../_utils/utils";
import observer from "../../../_store/observer";
import AddEditMoneyEntity from "../add-edit/add-edit-money-account";
import { getDefaultMoneyEntity } from "../money-account-helpers";
import { MONEY_ACCOUNT_COLLECTION } from "../constants";
import { IMoneyAccount } from "../money-account-type";

const MoneyAccountList = () => {
  const { loggedUser } = useBetween(useIdentity);

  const collectionName = MONEY_ACCOUNT_COLLECTION(loggedUser as ILoggedUser);

  const createItem = (): IMoneyAccount => getDefaultMoneyEntity();

  // const onSaveMoneyTransaction = (moneyTransaction: IMoneyTransaction) => {
  //   // console.log(moneyTransaction);
  //   return saveMoneyTransaction(moneyTransaction).then((response: any) => {
  //
  //     observer.publish("ENABLE_SHORTCUT", true);
  //     if (!response.success) {
  //       return;
  //     }
  //     const { categories, transactionResponse } = response.data;
  //     setUpdatedCategories(categories);
  //     // observer.publish("UPDATE_TRANSACTION", transactionResponse);
  //   });
  // };

  const renderAddEditContent = (
    item: IMoneyAccount,
    onSave: (item: IMoneyAccount) => Promise<unknown>,
    onCancel: () => void
  ) => {
    return (
      <AddEditMoneyEntity
        moneyEntity={item || createItem()}
        onCancel={() => {
          observer.publish("ENABLE_SHORTCUT", true);
          onCancel();
        }}
        onSave={onSave}
      ></AddEditMoneyEntity>
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
            field: "name",
            header: "Nume",
          },
          {
            field: "amount",
            header: "Amount",
          },
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Account"
        renderAddEditContent={renderAddEditContent}
        collectionName={collectionName}
        sortBy={[{ field: "date", ascending: false }]}
        modalTitle={(item: IMoneyAccount) => {
          return item?.name ? `${item.name}` : "Adaugare Account";
        }}
      ></GenericList>
    </>
  );
};

export default MoneyAccountList;
