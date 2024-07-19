import { useEffect, useState } from "react";
import { CategoryTree } from "./category-tree";
import { MyButton } from "../../_components/reuse/my-button";
import { ICategory } from "./category-type";
import useCategoryState from "./hooks/useCategoryState";
import { Dialog } from "primereact/dialog";
import { AddEditCategory } from "./add-edit/add-edit-category";
import { defaultCategory } from "./category-helpers";
import MoneyTransactionsList from "../money-transactions/list/money-transactions-list";
import { useBetween } from "use-between";
import useMoneyEntities from "../money-entity/hooks/useMoneyEntities";
import { IMoneyEntity } from "../money-entity/money-entity-type";
import { LabelDropDown } from "../../_components/reuse/LabelDropDown";
import useMoneyAccounts from "../money-account/hooks/useMoneyAccounts";
import DateStartEnd from "../../_components/reuse/date/date-start-end";
import useMoneyTransactionsFilter from "../money-transactions/hooks/useMoneyTransactionsFilter";
import { useNavigate } from "react-router-dom";
import {
  ACCOUNT_TYPE_VALUE,
  IMoneyAccount,
} from "../money-account/money-account-type";
import useMoneyTransactions from "../money-transactions/hooks/useMoneyTransactions";
import { DialogWrapper } from "../../_components/reuse/DialogWrapper";

export const Categories = () => {
  //#region Hooks
  const {
    newCategory,
    setNewCategory,
    selectedCategory,
    saveCategory,
    getCategories,
    categoryTree,
    aggregateAmountByCategory,
  } = useBetween(useCategoryState);

  const navigate = useNavigate();

  const { moneyEntities, selectedMoneyEntity, setSelectedMoneyEntity } =
    useBetween(useMoneyEntities);
  const {
    accounts,
    accountsLoaded,
    selectedAccount,
    setSelectedAccount,
    guid,
    getAccounts,
  } = useBetween(useMoneyAccounts);

  const accountsWithDefaultValue: IMoneyAccount[] = [
    {
      _id: "",
      name: "--DEFAULT--",
      amount: 0,
      date: 0,
      account_type: ACCOUNT_TYPE_VALUE.ALL,
      description: "",
      userid: "",
      nick: "",
    },
    ...(accounts || []),
  ];

  const moneyEntitiesList: IMoneyEntity[] = [
    { _id: "", name: "--ALL--", date: 0, description: "" },
    ...(moneyEntities || []),
  ];

  const {
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,
    aggregationFilterBy,
  } = useBetween(useMoneyTransactionsFilter);

  //#endregion

  //#region States
  const [message, setMessage] = useState("");
  //#endregion

  //#region Effects
  useEffect(() => {
    getCategories(selectedMoneyEntity);
  }, [selectedMoneyEntity]);

  useEffect(() => {
    console.log(aggregationFilterBy);
    const entityId = selectedMoneyEntity?._id || "";
    const filterValue = aggregationFilterBy || {};
    aggregateAmountByCategory(entityId, filterValue);
  }, [aggregationFilterBy]);

  useEffect(() => {
    // return;
    if (!accountsLoaded) {
      return;
    }

    if (!accounts || accounts.length === 0) {
      setMessage("Va rugam adaugati conturile necesare");
      setTimeout(() => {
        navigate("/accounts");
      }, 2000);
    }
  }, [accounts, accountsLoaded]);
  //#endregion

  //#region Functions
  const executeSaveCategory = (val: ICategory) => {
    saveCategory(val, selectedMoneyEntity).then((response: any) => {
      setNewCategory(null);
    });
    setNewCategory(null);
  };

  const onNodeSelected = (node: any) => {
    console.log(node);
  };
  //#endregion

  //#region Rendering
  const renderCategoryDialog = () => {
    return newCategory ? (
      <DialogWrapper
        header="Date categorie"
        visible={newCategory !== null}
        // style={{ width: "50vw" }}
        onHide={() => setNewCategory(null)}
      >
        <AddEditCategory
          category={newCategory}
          onSave={executeSaveCategory}
          onCancel={() => setNewCategory(null)}
        ></AddEditCategory>
      </DialogWrapper>
    ) : null;
  };

  return (
    <div className="fcenter1">
      {guid}
      {message && <div className="error fcenter">{message}</div>}
      {/* {JSON.stringify(accounts, null, 2)} */}
      {/* {JSON.stringify(moneyEntities)} */}
      {moneyEntitiesList && moneyEntitiesList.length > 1 && (
        <div className="fcenter">
          <LabelDropDown
            label="Entitati"
            onChange={(item) => {
              console.log(item);

              setSelectedMoneyEntity(item);
            }}
            options={moneyEntitiesList}
            value={selectedMoneyEntity}
            placeholder="Selecteaza"
            optionLabel="name"
            className=""
          ></LabelDropDown>
        </div>
      )}

      {selectedCategory && (
        <div className="fcenter mt10">
          {renderCategoryDialog()}
          <MyButton
            onClick={() => setNewCategory(defaultCategory())}
            text="Adaugare Categorie"
          ></MyButton>
        </div>
      )}

      <div className="fcenter">
        <CategoryTree
          categoryTree={categoryTree}
          onNodeSelected={onNodeSelected}
        ></CategoryTree>
      </div>

      <div className="fcenter">
        <div className="flex mt10">
          <LabelDropDown
            label={"Cont: "}
            className=""
            lwidth="135px"
            onChange={(accountValue: IMoneyAccount) => {
              const account = accountsWithDefaultValue.find(
                (a) => a._id === accountValue._id
              );
              setSelectedAccount(account);
            }}
            options={accountsWithDefaultValue}
            value={selectedAccount}
            optionLabel="name"
            optionValue="_id"
          ></LabelDropDown>
        </div>
      </div>

      <div className="fcenter3">
        <DateStartEnd
          startDate={startDate}
          endDate={endDate}
          onStartDate={(val) => {
            updateStartDate(val);
            console.log(getAccounts());
            console.log(accounts);
          }}
          onEndDate={updateEndDate}
        ></DateStartEnd>
      </div>

      <div className="fcenter">
        <MoneyTransactionsList></MoneyTransactionsList>
      </div>
    </div>
  );
  //#endregion
};
