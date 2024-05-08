import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { AddEditAngajat } from "../add-edit/add-edit-angajat";
import { IAngajat } from "../../transactions/model/accounting_types";
import { FirmeDropDown } from "../../company/dropdown/firme-dropdown";
import useFirme from "../../../_store/useFirme";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";
import { useBetween } from "use-between";
import DataTableWrapper from "../../../_components/reuse/DataTableWrapper";
import { Dialog } from "primereact/dialog";

export const CompanyAngajati = () => {
  const { deleteAngajat, saveAngajat } = useAccountingDbActions();
  const [item, setItem] = useState<IAngajat | null>(null);

  const { selectedFirma, refreshAngajati, angajati } = useBetween(useFirme);

  // const listaAngajati = getAngajatiForFirma(selectedFirma.value);
  // const onFirmaSelected = (angajat: any) => {
  //   setSelectedFirma(angajat);

  //   // reloadRecords();
  // };

  // const reload = (firmaId: string) => {
  //   getAngajati(firmaId).then((val) => {
  //
  //     setAngajatiForFirma(firmaId, val);
  //     setAngajati(getAngajatiForFirma(selectedFirma.value));
  //   });
  // };

  // useEffect(() => {
  //   reload(selectedFirma.value);
  // }, [selectedFirma]);

  const executeDeleteAngajat = (item: IAngajat) => {
    if (!selectedFirma) {
      return;
    }
    deleteAngajat(item, selectedFirma?._id).then(() => {
      refreshAngajati();
    });
  };

  const addAngajat = () => {
    const newItem: IAngajat = {
      _id: "",
      nume: "",
      dataAngajare: 0,
      salarii: [],
      showDemisie: false,
      contPersonal: "",
    };
    setItem(newItem);
  };

  const executeSaveCompanyTax = (item: IAngajat) => {
    if (!selectedFirma) {
      return;
    }
    return saveAngajat(item, selectedFirma?._id).then(() => {
      setItem(null);
      refreshAngajati();
    });
  };

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        {/* {JSON.stringify(selectedFirma)} */}
        <div className="ml5">
          <MyButton
            text="Adaugare Angajat"
            onClick={() => addAngajat()}
            className="w300"
            disabled={!selectedFirma}
          ></MyButton>
        </div>
      </div>
    );
  };

  return (
    <div className="fcenter ">
      <div className="flex flex-column center-v">
        <div className="flex center">
          <h3>
            Selecteaza firma pentru care se doreste managementul angajatilor
          </h3>
        </div>
        <div className="flex cell-h-align  ">
          <FirmeDropDown></FirmeDropDown>
        </div>

        {!item && angajati.length > 0 && (
          <div className="flex center">
            <h3>Lista angajatilor</h3>
          </div>
        )}

        <div className="flex center">{renderAvailableActions()}</div>

        {item && (
          <Dialog
            header="Date angajat"
            visible={item !== null}
            style={{ width: "80vw" }}
            onHide={() => setItem(null)}
          >
            <AddEditAngajat
              angajat={item}
              onSave={executeSaveCompanyTax}
              onCancel={() => setItem(null)}
            ></AddEditAngajat>
          </Dialog>
        )}
        <DataTableWrapper
          data={angajati}
          fieldHeader={[
            { header: "Nume", field: "nume" },
            {
              header: "Actiuni",
              body: (el) => {
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
                        onClick={() => executeDeleteAngajat(el)}
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
      </div>
    </div>
  );
};
