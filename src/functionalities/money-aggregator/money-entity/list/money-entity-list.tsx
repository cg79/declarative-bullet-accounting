import GenericList from '../../../todo/list/GenericList';
import { IMoneyEntity } from '../money-entity-type';
import useCategoryState from '../../categories/hooks/useCategoryState';
import useIdentity, { ILoggedUser } from '../../../../_store/useIdentity';
import { utils } from '../../../../_utils/utils';
import observer from '../../../../_store/observer';
import { useEffect, useState } from 'react';
import useMoneyEntities from '../hooks/useMoneyEntities';
import AddEditMoneyEntity from '../add-edit/add-edit-money-entity';
import { MONEY_ENTITY_COLLECTION } from '../constants';
import { getDefaultMoneyEntity } from '../money-entity-helpers';
import useScreenSize from '../../../../hooks/useScreenSize';
import { useBetween } from '../../../../hooks/useBetween';

const MoneyEntityList = () => {
  const { width } = useScreenSize();
  const { selectedMoneyEntity, setSelectedMoneyEntity, setReloadItems } =
    useBetween(useMoneyEntities);

  const { loggedUser } = useBetween(useIdentity);

  const collectionName = MONEY_ENTITY_COLLECTION(loggedUser as ILoggedUser);

  const createItem = (): IMoneyEntity => getDefaultMoneyEntity();

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
    item: IMoneyEntity,
    onSave: (item: IMoneyEntity) => Promise<unknown>,
    onCancel: () => void
  ) => {
    observer.publish('DISABLE_SHORTCUT', false);
    return (
      <AddEditMoneyEntity
        moneyEntity={item || createItem()}
        onCancel={() => {
          observer.publish('ENABLE_SHORTCUT', true);
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
            field: 'date',
            header: 'Data',
            body: (item) => utils.dateNumberToYYYYMMDD(item.date),
          },
          {
            field: 'name',
            header: 'Nume',
          },
          {
            field: 'description',
            header: 'Description',
          },
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Entitate"
        renderAddEditContent={renderAddEditContent}
        collectionName={collectionName}
        sortBy={[{ field: 'date', ascending: false }]}
        modalTitle={() =>
          selectedMoneyEntity?.name
            ? `Editare Entitate - ${selectedMoneyEntity.name}` ||
              selectedMoneyEntity.name
            : 'Adaugare Entitate'
        }
        onAfterItemSaved={(item) => {
          setReloadItems(new Date().toString());
        }}
      ></GenericList>
    </>
  );
};

export default MoneyEntityList;
