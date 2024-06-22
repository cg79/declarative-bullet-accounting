import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";

import { AddEditTodo } from "../add-edit/add-edit-todo";
import DataTableWrapper from "../../../_components/reuse/DataTableWrapper";
import { PaginationWrapper } from "../../../_components/reuse/PaginationWrapper";
import { Dialog } from "primereact/dialog";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";
import { ConfirmDialogWrapper } from "../../../_components/reuse/ConfirmDialogWrapper";
import useGenericList from "../hooks/useGenericList";
import { ITodo } from "../types";

export const TodoList = () => {
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
  } = useGenericList<ITodo>("todo", "name");

  useEffect(() => {
    getPaginatedList();
  }, [getPaginatedList]);

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        <div className="ml5">
          <MyButton
            text="Adaugare Todo"
            onClick={() => {
              const newItem: ITodo = {
                _id: "",
                name: "",
                description: "",
                status: 0,
              };
              setItem(newItem);
            }}
            className="w300"
          ></MyButton>
        </div>
      </div>
    );
  };

  const renderActiuni = (item: ITodo) => {
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
              // style={{ width: "50vw" }}
              onHide={() => setItem(null)}
            >
              <AddEditTodo
                entity={item}
                onSave={save}
                onCancel={() => setItem(null)}
              />
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
            {renderAvailableActions()}

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
                headerMessage={() =>
                  `Esti sigur ca vrei sa stergi ${itemToBeDeleted.name} ?`
                }
              ></ConfirmDialogWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
