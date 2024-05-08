import React, { useEffect } from "react";
import useGenericList from "../hooks/useGenericList";
import { MyButton } from "../../../_components/reuse/my-button";
import { Dialog } from "primereact/dialog";
import DataTableWrapper from "../../../_components/reuse/DataTableWrapper";
import { PaginationWrapper } from "../../../_components/reuse/PaginationWrapper";
import { ConfirmDialogWrapper } from "../../../_components/reuse/ConfirmDialogWrapper";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";

// Define the props interface with a generic type
interface MyGenericComponentProps<T> {
  createItem: () => T;
  addItemButtonLabel: string;
  renderAddEditContent: (
    item: T,
    onSave: (item: T) => Promise<unknown>,
    onCancel: () => void
  ) => React.ReactNode;
  collectionName: string;
  sortBy: string;
}

// Define the generic component
function MyGenericComponent<T>({
  createItem,
  addItemButtonLabel,
  renderAddEditContent,
  collectionName,
  sortBy,
}: MyGenericComponentProps<T>) {
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
  } = useGenericList<T>(collectionName, sortBy);

  useEffect(() => {
    getPaginatedList();
  }, [getPaginatedList]);

  const renderAddNewButton = () => {
    return (
      <div className="mt10">
        <div className="ml5">
          <MyButton
            text={addItemButtonLabel}
            onClick={() => {
              setItem(createItem());
            }}
            className="w300"
          ></MyButton>
        </div>
      </div>
    );
  };

  const renderActiuni = (item: T) => {
    return (
      <div className="fcenter">
        <div className="ml10">
          <MyButton
            text="Editare"
            onClick={() => setItem(item)}
            className="linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="ml10">
          <MyButton
            text="Sterge"
            onClick={() => setItemToBeDeleted(item)}
            className="linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>
      </div>
    );
  };

  const renderNewOrEditItem = () => {
    if (!item) {
      return null;
    }

    return (
      <div className="flex center">
        <div className="flex">
          <div className="flex flex-column center-v">
            <Dialog
              header="Date element"
              visible={item !== null}
              style={{ width: "50vw" }}
              onHide={() => setItem(null)}
            >
              {renderAddEditContent(item, save, () => setItem(null))}
            </Dialog>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex center">
        <div className="flex">
          <div className="flex flex-column center-v">
            {renderNewOrEditItem()}
            {renderAddNewButton()}

            <DataTableWrapper
              data={list}
              fieldHeader={[
                { field: "name", header: "Nume" },
                { header: "Actiuni", body: (item) => renderActiuni(item) },
              ]}
            ></DataTableWrapper>
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
                dWidth="40vw"
                onConfirm={() => {
                  if (!itemToBeDeleted) {
                    return;
                  }
                  deleteEntity(itemToBeDeleted).then(() => {
                    getPaginatedList();
                  });
                  setItemToBeDeleted(null);
                }}
                onCancel={() => setItemToBeDeleted(null)}
                headerMessage={() => `Esti sigur ca vrei sa stergi  ?`}
              ></ConfirmDialogWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyGenericComponent;
