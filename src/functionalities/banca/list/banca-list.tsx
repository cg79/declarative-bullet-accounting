import { IBanca } from '../types';
import { AddEditBanca } from '../add-edit/add-edit-banca';
import GenericList from '../../todo/list/GenericList';

export const BancaList = () => {
  const createItem = (): IBanca => {
    return {
      _id: '',
      name: '',
      description: '',
      status: 0,
    };
  };

  const renderAddEditContent = (
    item: IBanca,
    onSave: (item: IBanca) => Promise<unknown>,
    onCancel: () => void
  ) => {
    return (
      <AddEditBanca
        entity={item}
        onSave={onSave}
        onCancel={onCancel}
      ></AddEditBanca>
    );
  };
  return (
    <GenericList
      renderCreateFirstItem={() => null}
      fieldHeader={[]}
      createItem={createItem}
      addItemButtonLabel="Adaugare"
      renderAddEditContent={renderAddEditContent}
      collectionName={'banca'}
      sortBy={[{ field: 'name', ascending: true }]}
      modalTitle={(item: IBanca) => item.name}
    ></GenericList>
  );
};
