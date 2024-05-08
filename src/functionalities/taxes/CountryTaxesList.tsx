import { useEffect, useState } from "react";
import { MyButton } from "../../_components/reuse/my-button";
import { ICompanyTax } from "../transactions/model/accounting_types";

import { AddEditTax } from "./add-edit-tax";

import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import { utils } from "../../_utils/utils";
import { useBetween } from "use-between";
import useTaxes from "./useTaxes";
import DataTableWrapper from "../../_components/reuse/DataTableWrapper";
import { ConfirmDialogWrapper } from "../../_components/reuse/ConfirmDialogWrapper";
import { Dialog } from "primereact/dialog";

export const CountryTaxesList = () => {
  const { deleteCompanyTax, saveCompanyTax, importTaxe } =
    useAccountingDbActions();

  const [item, setItem] = useState<ICompanyTax | null>(null);
  const [itemToBedeleted, setItemToBeDeleted] = useState<ICompanyTax | null>(
    null
  );
  const { reload, countryTaxesList } = useBetween(useTaxes);

  useEffect(() => {
    reload();
  }, []);

  const executeDeleteCompanyTax = (item: ICompanyTax) => {
    return deleteCompanyTax(item).then(() => {
      reload();
    });
  };

  const addTaxa = (nume, value, description = "") => {
    const newItem: ICompanyTax = {
      nume,
      value,
      description: description || nume,
      dataTaxa: 0,
    };
    setItem(newItem);
  };

  const executeSaveCompanyTax = (item: ICompanyTax) => {
    return saveCompanyTax(item).then(() => {
      setItem(null);
      reload();
    });
  };

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        <div className="ml5">
          <MyButton
            text="Adaugare TVA"
            onClick={() => addTaxa("TVA", 0.19, "TVA")}
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="ml5">
          <MyButton
            text="Adaugare Dividende"
            onClick={() => addTaxa("Dividende", 0.5)}
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>
        <div className="ml5">
          <MyButton
            text="Adaugare Taxa Profit"
            onClick={() => addTaxa("TaxaProfit", 0.1, "Taxa Profit")}
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="ml5">
          <MyButton
            text="Adaugare Taxa Pensie"
            onClick={() => addTaxa("TaxaPensie", 0.25, "Taxa Pensie")}
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="ml5">
          <MyButton
            text="Adaugare Taxa Sanatate"
            onClick={() => addTaxa("TaxaSanatate", 0.1, "Taxa Sanatate")}
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>

        <div className="ml5">
          <MyButton
            text="Adaugare Taxa Asigurare munca"
            onClick={() =>
              addTaxa("TaxaAsigurareMunca", 0.0225, "Taxa Asigurare Munca")
            }
            className="w300 linkbutton"
            useBaseButton={false}
          ></MyButton>
        </div>
      </div>
    );
  };

  const executeImportTAxe = async () => {
    console.log("importTaxe");
    await importTaxe();
    reload();
  };

  const renderActiuni = (item: ICompanyTax) => {
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
      <div className="fcenter">
        {/* <div className="flex flex1 ml5">{renderAvailableActions()}</div> */}
        <div className="fcenter  ">
          <div className="flex flex-column center-v">
            {item && (
              <Dialog
                header="Date firma"
                visible={item !== null}
                style={{ width: "80vw" }}
                onHide={() => setItem(null)}
              >
                <AddEditTax
                  taxItem={item}
                  onSave={executeSaveCompanyTax}
                  onCancel={() => setItem(null)}
                ></AddEditTax>
              </Dialog>
            )}
            {!item && (
              <div className=" center">
                <h3>Lista taxelor si data de cand sunt aplicate</h3>

                {countryTaxesList.length === 0 && (
                  <div className="flex center">
                    <MyButton
                      text="Importa taxe"
                      onClick={executeImportTAxe}
                    ></MyButton>
                  </div>
                )}
                {renderAvailableActions()}
              </div>
            )}
            <div style={{ marginTop: "15px" }}>
              <DataTableWrapper
                data={countryTaxesList}
                fieldHeader={[
                  { field: "nume", header: "Nume" },
                  { field: "value", header: "Valoare" },
                  {
                    field: "dataTaxa",
                    header: "Data",
                    body: (el) => utils.dateNumberToYYYYMMDD(el.dataTaxa),
                  },
                  {
                    header: "Actiuni",
                    body: (item: ICompanyTax) => renderActiuni(item),
                  },
                ]}
              ></DataTableWrapper>
              {itemToBedeleted && (
                <ConfirmDialogWrapper
                  onConfirm={() => {
                    if (!itemToBedeleted) {
                      return;
                    }
                    executeDeleteCompanyTax(itemToBedeleted).then(() => {
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
      </div>
    </>
  );
};
