import { useBetween } from "use-between";
import GenericList from "../../todo/list/GenericList";
import useIdentity, { ILoggedUser } from "../../../_store/useIdentity";
import { utils } from "../../../_utils/utils";
import observer from "../../../_store/observer";
import AddEditMoneyEntity from "../add-edit/add-edit-money-account";
import { getDefaultMoneyEntity } from "../money-account-helpers";
import { MONEY_ACCOUNT_COLLECTION } from "../constants";
import { IMoneyAccount } from "../money-account-type";
import useMoneyAccounts from "../hooks/useMoneyAccounts";
import MyIcon from "../../../_components/reuse/my-icon";

const MoneyAccountList = () => {
  const { loggedUser } = useBetween(useIdentity);

  const collectionName = MONEY_ACCOUNT_COLLECTION(loggedUser as ILoggedUser);

  const createItem = (): IMoneyAccount => getDefaultMoneyEntity(loggedUser);

  const { refresh } = useBetween(useMoneyAccounts);

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

  const renderActions = (
    item: IMoneyAccount,
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
            field: "nick",
            header: "User",
            body: (item) => item.nick,
          },
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
        onAfterItemSaved={(item: IMoneyAccount) => {
          refresh();
        }}
        renderActions={renderActions}
      ></GenericList>
    </>
  );
};

export default MoneyAccountList;
