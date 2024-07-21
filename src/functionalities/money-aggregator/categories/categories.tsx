import { useEffect, useState } from 'react';
import { CategoryTree } from './category-tree';
import { ICategory } from './category-type';
import useCategoryState from './hooks/useCategoryState';
import { AddEditCategory } from './add-edit/add-edit-category';
import MoneyTransactionsList from '../money-transactions/list/money-transactions-list';
import { useBetween } from 'use-between';
import useMoneyEntities from '../money-entity/hooks/useMoneyEntities';
import { IMoneyEntity } from '../money-entity/money-entity-type';
import { LabelDropDown } from '../../../_components/reuse/LabelDropDown';
import useMoneyAccounts from '../money-account/hooks/useMoneyAccounts';
import useMoneyTransactionsFilter from '../money-transactions/hooks/useMoneyTransactionsFilter';
import { useNavigate } from 'react-router-dom';
import { DialogWrapper } from '../../../_components/reuse/DialogWrapper';
import MoneyFilter from '../money-filter/money-filter';

export const Categories = () => {
  //#region Hooks
  const {
    newCategory,
    setNewCategory,
    saveCategory,
    getCategories,
    categoryTree,
    aggregateAmountByCategory,
  } = useBetween(useCategoryState);

  const navigate = useNavigate();

  const { moneyEntities, selectedMoneyEntity, setSelectedMoneyEntity } =
    useBetween(useMoneyEntities);
  const { accounts, accountsLoaded } = useBetween(useMoneyAccounts);

  const moneyEntitiesList: IMoneyEntity[] = [
    { _id: '', name: '--ALL--', date: 0, description: '' },
    ...(moneyEntities || []),
  ];

  const { aggregationFilterBy } = useBetween(useMoneyTransactionsFilter);

  //#endregion

  //#region States
  const [message, setMessage] = useState('');
  //#endregion

  //#region Effects
  useEffect(() => {
    getCategories(selectedMoneyEntity);
  }, [selectedMoneyEntity]);

  useEffect(() => {
    console.log(aggregationFilterBy);
    const entityId = selectedMoneyEntity?._id || '';
    const filterValue = aggregationFilterBy || {};
    aggregateAmountByCategory(entityId, filterValue);
  }, [aggregationFilterBy]);

  useEffect(() => {
    // return;
    if (!accountsLoaded) {
      return;
    }

    if (!accounts || accounts.length === 0) {
      setMessage('Va rugam adaugati conturile necesare');
      setTimeout(() => {
        navigate('/accounts');
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

      {/* {selectedCategory && (
        <div className="fcenter mt10">
          {renderCategoryDialog()}
          <MyButton
            onClick={() => setNewCategory(defaultCategory())}
            text="Adaugare Categorie"
          ></MyButton>
        </div>
      )} */}

      <div className="fcenter">
        <CategoryTree
          categoryTree={categoryTree}
          onNodeSelected={onNodeSelected}
        ></CategoryTree>
      </div>

      <MoneyFilter></MoneyFilter>

      <div className="fcenter">
        <MoneyTransactionsList></MoneyTransactionsList>
      </div>
    </div>
  );
  //#endregion
};
