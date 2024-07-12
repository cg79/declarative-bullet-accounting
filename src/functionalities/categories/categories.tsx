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
import { IMoneyTransaction } from "../money-transactions/money-transaction-type";
import useMoneyAccounts from "../money-account/hooks/useMoneyAccounts";

export const Categories = () => {
  const {
    newCategory,
    setNewCategory,
    selectedCategory,
    saveCategory,
    getCategories,
    categoryTree,
  } = useBetween(useCategoryState);

  const { moneyEntities, selectedMoneyEntity, setSelectedMoneyEntity } =
    useBetween(useMoneyEntities);

  const { accounts, selectedAccount, setSelectedAccount } =
    useBetween(useMoneyAccounts);

  const moneyEntitiesList: IMoneyEntity[] = [
    { _id: "", name: "--DEFAULT--", date: 0, description: "" },
    ...(moneyEntities || []),
  ];

  const executeSaveCategory = (val: ICategory) => {
    saveCategory(val, selectedMoneyEntity).then((response: any) => {
      setNewCategory(null);
    });
    setNewCategory(null);
  };
  const renderCategoryDialog = () => {
    return newCategory ? (
      <Dialog
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
      </Dialog>
    ) : null;
  };

  const onNodeSelected = (node: any) => {
    console.log(node);
  };

  useEffect(() => {
    getCategories(selectedMoneyEntity);
  }, [selectedMoneyEntity]);

  return (
    <div className="fcenter1">
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
            className="w300"
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
        <div>
          <div className="flex mt10">
            <LabelDropDown
              label={"Cont: "}
              lwidth="135px"
              onChange={(accountId) => {
                setSelectedAccount(accounts.find((a) => a._id === accountId));
              }}
              options={accounts}
              value={selectedAccount?._id}
              optionLabel="name"
              optionValue="_id"
            ></LabelDropDown>
          </div>

          <MoneyTransactionsList></MoneyTransactionsList>
        </div>
      </div>
    </div>
  );
};
