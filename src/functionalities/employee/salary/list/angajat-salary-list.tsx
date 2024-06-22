import { useState } from "react";
import { MyButton } from "../../../../_components/reuse/my-button";
import { ISalarAddEdit } from "../../../transactions/model/accounting_types";

import { FirmeAngajatiDropDown } from "../../dropdown/firme-angajati-dropdown";
import { AddEditSalar } from "../../../company/company-general-taxes/add-edit-salar";

import useFirme from "../../../../_store/useFirme";
import useAccountingDbActions from "../../../transactions/hook/useAccountingDbActions";
import { useBetween } from "use-between";
import useSalary from "../useSalary";
import { utils } from "../../../../_utils/utils";
import DataTableWrapper from "../../../../_components/reuse/DataTableWrapper";
import { Dialog } from "primereact/dialog";

export const AngajatSalaryList = () => {
  const { deleteAngajatSalary, saveAngajatSalary, importSalariiForAngajat } =
    useAccountingDbActions();
  const [item, setItem] = useState<ISalarAddEdit | null>(null);
  const { selectedAngajat } = useBetween(useFirme);
  const { salaries, reload } = useBetween(useSalary);

  const executeDeleteCompanyTax = (item: ISalarAddEdit) => {
    if (!selectedAngajat) {
      return;
    }
    deleteAngajatSalary(item, selectedAngajat).then(() => {
      reload();
    });
  };

  const addTaxa = (nume, value, description = "") => {
    const newItem: ISalarAddEdit = {
      nume,
      value,
      description: description || nume,
      dataSalar: 0,
      impozit_venit: 0,
      scutire_impozit: 0,
    };
    setItem(newItem);
  };

  const executeSaveSalarAngajat = (item: ISalarAddEdit) => {
    if (!selectedAngajat) {
      return;
    }
    return saveAngajatSalary(item, selectedAngajat).then(() => {
      setItem(null);
      reload();
    });
  };

  const renderAvailableActions = () => {
    return (
      <div className="mt10 flex">
        <div className="ml5">
          <MyButton
            text="Adaugare Salar"
            onClick={() => addTaxa("Salar", 2020)}
            className="w300"
            disabled={selectedAngajat === null}
          ></MyButton>
        </div>
      </div>
    );
  };

  const executeImportSAlariesForEmployee = async () => {
    if (!selectedAngajat) {
      return;
    }
    await importSalariiForAngajat(selectedAngajat);
    reload();
  };

  return (
    <div className="flex flex-column center-v">
      <div className="fcenter">
        <h3>Selecteaza firma la care se doreste managementul salariilor</h3>
      </div>
      <div className="fcenter">{renderAvailableActions()}</div>
      <div className="flex cell-h-align  ">
        <FirmeAngajatiDropDown></FirmeAngajatiDropDown>
      </div>

      {item && (
        <Dialog
          header="Date salar"
          visible={item !== null}
          // style={{ width: "50vw" }}
          onHide={() => setItem(null)}
        >
          <AddEditSalar
            taxItem={item}
            onSave={executeSaveSalarAngajat}
            onCancel={() => setItem(null)}
          ></AddEditSalar>
        </Dialog>
      )}

      {!item && (
        <div className="flex center">
          {selectedAngajat && (
            <h3>Lista salariilor pentru {selectedAngajat.nume}</h3>
          )}
        </div>
      )}
      {salaries.length === 0 && selectedAngajat && (
        <div className="flex center">
          <MyButton
            text="Import salarii"
            onClick={executeImportSAlariesForEmployee}
          ></MyButton>
        </div>
      )}

      {salaries.length > 0 && (
        <DataTableWrapper
          data={salaries}
          fieldHeader={[
            { field: "nume", header: "Nume" },
            { field: "value", header: "Valoare" },
            { header: "Scutire Impozit", field: "scutire_impozit" },
            {
              header: "Data",
              body: (item) => {
                return <div>{utils.dateNumberToYYYYMMDD(item.dataSalar)}</div>;
              },
            },
            {
              header: "Actiuni",
              body: (el: ISalarAddEdit) => {
                return (
                  <div className="fcenter">
                    <div className="ml10">
                      <MyButton
                        text="Editare"
                        onClick={() => setItem(el)}
                        className="linkbutton"
                        useBaseButton={false}
                      ></MyButton>
                    </div>

                    <div className="ml10">
                      <MyButton
                        text="Sterge"
                        onClick={() => executeDeleteCompanyTax(el)}
                        className="linkbutton"
                        useBaseButton={false}
                      ></MyButton>
                    </div>
                  </div>
                );
              },
            },
          ]}
        ></DataTableWrapper>
      )}
    </div>
  );
};
