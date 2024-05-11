import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";

import { AddEditCompany } from "../add-edit/add-edit-company";
import useFirme from "../../../_store/useFirme";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";
import { utils } from "../../../_utils/utils";
import { useBetween } from "use-between";
import { ICompany } from "../types";
import DataTableWrapper from "../../../_components/reuse/DataTableWrapper";
import { PaginationWrapper } from "../../../_components/reuse/PaginationWrapper";
import { Dialog } from "primereact/dialog";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";
import { ConfirmDialogWrapper } from "../../../_components/reuse/ConfirmDialogWrapper";

export const CompanyList = () => {
  const { deleteCompany, saveFirma } = useAccountingDbActions();
  const [item, setItem] = useState<ICompany | null>(null);
  const [itemToBedeleted, setItemToBeDeleted] = useState<ICompany | null>(null);
  const { firme, reload, pageState, goToPage, pageCountAndTotalRecords } =
    useBetween(useFirme);

  useEffect(() => {
    reload();
  }, []);
  // const executeDeleteCompany = (item: ICompany) => {
  //   deleteCompany(item).then(() => {
  //     reload();
  //   });
  // };

  const addCompany = () => {
    const newItem: ICompany = {
      _id: "",
      nume: "",
      dataInfiintare: utils.dateToEpoch(),
      isActive: false,
      codFiscal: "",
    };
    setItem(newItem);
  };

  const salveazaCompanie = useCallback(
    (item: ICompany) => {
      return saveFirma(item).then(() => {
        setItem(null);
        reload();
      });
    },
    [reload, saveFirma]
  );

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        <div className="ml5">
          <MyButton
            text="Adaugare Firma"
            onClick={() => addCompany()}
            className="w300"
          ></MyButton>
        </div>
      </div>
    );
  };

  const renderActiuni = (item: ICompany) => {
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

  return (
    <>
      <div className="flex center">
        <div className="flex">
          <div className="flex flex-column center-v">
            {item && (
              <Dialog
                header="Date firma"
                visible={item !== null}
                style={{ width: "40vw" }}
                onHide={() => setItem(null)}
              >
                <AddEditCompany
                  company={item}
                  onSave={salveazaCompanie}
                  onCancel={() => setItem(null)}
                ></AddEditCompany>
              </Dialog>
            )}
            {!item && (
              <>
                <div className="flex center">
                  <h3>Lista firmelor</h3>
                </div>
                <div className="flex mt10">{renderAvailableActions()}</div>
              </>
            )}
            <DataTableWrapper
              data={firme}
              fieldHeader={[
                { field: "nume", header: "Nume" },
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
            {itemToBedeleted && (
              <ConfirmDialogWrapper
                onConfirm={() => {
                  if (!itemToBedeleted) {
                    return;
                  }
                  deleteCompany(itemToBedeleted).then(() => {
                    reload();
                  });
                  setItemToBeDeleted(null);
                }}
                onCancel={() => setItemToBeDeleted(null)}
                headerMessage={() =>
                  `Esti sigur ca vrei sa stergi ${itemToBedeleted.nume} ?`
                }
              ></ConfirmDialogWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
