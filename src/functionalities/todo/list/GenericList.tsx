import React, { useEffect } from 'react';
import useGenericList from '../hooks/useGenericList';
import { MyButton } from '../../../_components/reuse/my-button';
import DataTableWrapper, {
  FieldHeaderType,
} from '../../../_components/reuse/DataTableWrapper';
import { PaginationWrapper } from '../../../_components/reuse/PaginationWrapper';
import { ConfirmDialogWrapper } from '../../../_components/reuse/ConfirmDialogWrapper';
import { IPageNoAndRowsPerPage } from '../../../hooks/usePagerState';
import MyIcon from '../../../_components/reuse/my-icon';
import ShortcutComponent from '../../money-aggregator/categories/shortcut/shortcut-component';
import { DialogWrapper } from '../../../_components/reuse/DialogWrapper';

// Define the props interface with a generic type
interface MyGenericListProps<T> {
  createItem: () => T;
  addItemButtonLabel: string;
  isButtonDisabled?: boolean;
  renderAddEditContent: (
    item: T,
    onSave: (item: T) => Promise<unknown>,
    onCancel: () => void
  ) => React.ReactNode;
  collectionName: string;
  sortBy: { field: string; ascending: boolean }[];
  filterBy?: any;
  modalTitle: Function;
  fieldHeader: FieldHeaderType[];
  customSaveFunction?: (item: T) => Promise<unknown>;
  customDeleteFunction?: (item: T) => Promise<unknown>;
  onAfterItemSaved?: (item: T) => void;
  renderActions?: (item: T, setItem: any, setItemToBeDeleted: any) => any;
  onRowClick?: (item: T) => void;
}

// Define the generic component
function GenericList<T>({
  createItem,
  addItemButtonLabel,
  isButtonDisabled,
  renderAddEditContent,
  collectionName,
  sortBy,
  modalTitle,
  fieldHeader,
  filterBy,
  customSaveFunction,
  customDeleteFunction,
  onAfterItemSaved,
  renderActions,
}: MyGenericListProps<T>) {
  const {
    save,
    list,
    getPaginatedList,
    deleteEntity,
    pageState,
    item,
    setItem,
    itemToBeDeleted,
    setItemToBeDeleted,
    pageCountAndTotalRecords,
    goToPage,
  } = useGenericList<T>(collectionName, sortBy, filterBy);

  useEffect(() => {
    // if (!filterBy) {
    //   return;
    // }
    getPaginatedList();
  }, [filterBy, pageState]);

  const renderAddNewButton = () => {
    return null;
    return (
      <div className="mt10">
        <div className="ml5">
          <MyButton
            text={addItemButtonLabel}
            onClick={() => {
              setItem(createItem());
            }}
            className="w300"
            disabled={isButtonDisabled}
          ></MyButton>
        </div>
      </div>
    );
  };

  const renderActiuni = (item: T) => {
    return (
      <div className="fcenter">
        <div className="ml10">
          <MyIcon
            icon="pi pi-calendar"
            tooltip="Edit"
            onClick={() => setItem(item)}
          ></MyIcon>
        </div>

        <div className="ml10">
          <MyIcon
            icon="pi pi-trash"
            tooltip="Delete"
            onClick={() => setItemToBeDeleted(item)}
          ></MyIcon>
        </div>
      </div>
    );
  };

  const renderNewOrEditItem = () => {
    if (!item) {
      return null;
    }

    const saveWrapper = async (item: T) => {
      //
      const fct = customSaveFunction || save;
      fct(item).then((response: any) => {
        setItem(null);
        getPaginatedList();
        onAfterItemSaved?.(item);
      });
    };

    return (
      <div className="flex center">
        <div className="flex">
          <div className="flex flex-column center-v">
            <DialogWrapper
              header={modalTitle(item)}
              visible={item !== null}
              // style={{ width: "50vw" }}
              onHide={() => setItem(null)}
            >
              {renderAddEditContent(item, saveWrapper, () => setItem(null))}
            </DialogWrapper>
          </div>
        </div>
      </div>
    );
  };

  const onShortCutAction = (shortcut) => {
    // alert(shortcut);
  };

  const renderAddItem = () => {
    return createItem ? (
      <div className="ml10">
        <MyIcon
          icon="pi pi-plus"
          tooltip="Adaugare"
          onClick={() => setItem(createItem())}
        ></MyIcon>
      </div>
    ) : null;
  };

  return (
    <>
      <div className="flex center">
        <div className="flex">
          <div className="flex flex-column center-v">
            {/* {JSON.stringify(filterBy)} */}
            {renderNewOrEditItem()}
            {renderAddNewButton()}
            {/* {JSON.stringify(list, null, 2)} */}

            <ShortcutComponent onShortCutAction={onShortCutAction}>
              <DataTableWrapper
                data={list}
                fieldHeader={fieldHeader.concat([
                  {
                    field: 'actiuni',
                    header: 'Actiuni',
                    body: renderActions
                      ? (item: T) =>
                          renderActions(item, setItem, setItemToBeDeleted)
                      : (item) => renderActiuni(item),
                  },
                ])}
                // onRowClick={(item) => setItem(item)}
                renderDefaultActions={(item) => renderAddItem()}
              ></DataTableWrapper>
            </ShortcutComponent>
            <div className="flex center mt10">
              <PaginationWrapper
                pageState={pageState}
                pageCountAndTotalRecords={pageCountAndTotalRecords}
                goToPage={(val: IPageNoAndRowsPerPage) => {
                  goToPage(val);
                }}
              ></PaginationWrapper>
            </div>
            {itemToBeDeleted && (
              <ConfirmDialogWrapper
                onConfirm={() => {
                  if (!itemToBeDeleted) {
                    return;
                  }
                  const deleteFunction = customDeleteFunction || deleteEntity;
                  deleteFunction(itemToBeDeleted).then(() => {
                    onAfterItemSaved?.(itemToBeDeleted);
                    getPaginatedList();
                  });
                  setItemToBeDeleted(null);
                }}
                onCancel={() => setItemToBeDeleted(null)}
                headerMessage={() =>
                  `Esti sigur ca vrei sa stergi   ${modalTitle(
                    itemToBeDeleted
                  )} ?`
                }
              ></ConfirmDialogWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GenericList;
