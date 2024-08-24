import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { useBetween } from '../../hooks/useBetween';
import useMongoUi from './useTranslations';
import GenericList from '../todo/list/GenericList';
import { MyButton } from '../../_components/reuse/my-button';
import { utils } from '../../_utils/utils';
import { ITranslations, getDefaultTranslation } from './types';
import useIdentity from '../../_store/useIdentity';
import AddEditTranslation from './add-edit-translation';

const Translations = () => {
  //   const { mongoUi } = useBetween(useMongoUi);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [collections, setCollections] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  const renderAddEditContent = (
    item: ITranslations,
    onSave: (item: ITranslations) => Promise<unknown>,
    onCancel: () => void
  ) => {
    return (
      <AddEditTranslation
        moneyEntity={item || createItem()}
        onCancel={() => {
          onCancel();
        }}
        onSave={onSave}
      ></AddEditTranslation>
    );
  };

  const { loggedUser } = useBetween(useIdentity);

  const collectionName = 'money_translations';

  const createItem = (): ITranslations => getDefaultTranslation();

  return (
    <>
      <GenericList
        renderCreateFirstItem={(onClickFunction) => (
          <div className="mt10">
            {/* {JSON.stringify(selectedFirma)} */}
            <div className="ml5">
              <MyButton
                text="Adaugare Translatie"
                onClick={onClickFunction}
                className="w300"
              ></MyButton>
            </div>
          </div>
        )}
        fieldHeader={[
          {
            field: 'key',
            header: 'Key',
          },
          {
            field: 'value',
            header: 'Value',
          },
        ]}
        createItem={createItem}
        addItemButtonLabel="Adaugare Entitate"
        renderAddEditContent={renderAddEditContent}
        collectionName={collectionName}
        sortBy={[{ field: 'date', ascending: false }]}
        modalTitle={(entity: ITranslations, isForDeletion) => {
          debugger;
          if (isForDeletion) {
            return entity?.key;
          }
          return entity?.key
            ? `Editare Entitate - ${entity.key}` || entity.key
            : 'Adaugare Entitate 1';
        }}
        onAfterItemSaved={(item) => {
          // setReloadItems(new Date().toString());
        }}
      ></GenericList>
    </>
  );
};
export default Translations;
