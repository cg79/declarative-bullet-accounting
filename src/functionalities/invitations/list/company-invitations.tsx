import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { FirmeDropDown } from "../../company/dropdown/firme-dropdown";
import useFirme from "../../../_store/useFirme";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";
import { useBetween } from "use-between";
import DataTableWrapper from "../../../_components/reuse/DataTableWrapper";
import { Dialog } from "primereact/dialog";
import { helpers } from "../../../_utils/helpers";
import { AddEditInvitation } from "../add-edit/add-edit-invitation";
import { IInvitation } from "../../transactions/model/accounting_types";

export const CompanyInvitations = () => {
  const { deleteInvitation, saveInvitation, getInvitations } =
    useAccountingDbActions();
  const [item, setItem] = useState<IInvitation | null>(null);
  const [invitations, setInvitations] = useState<IInvitation[]>([]);

  const { selectedFirma } = useBetween(useFirme);

  const refreshInvitations = useCallback((selectedFirma) => {
    if (!selectedFirma) {
      return;
    }
    getInvitations(selectedFirma?._id).then((response) => {
      helpers.checkHttpResponseForErrors(response);
      setInvitations(response.data);
    });
  }, []);

  const executeDeleteInvitation = (item: IInvitation) => {
    if (!selectedFirma) {
      return;
    }
    deleteInvitation(item, selectedFirma?._id).then(() => {
      refreshInvitations(selectedFirma);
    });
  };

  const addAngajat = () => {
    const newItem: IInvitation = {
      _id: "",
      dataInvitatie: 0,
      accepted: false,
      email: "",
    };

    setItem(newItem);
  };

  const executeSaveInvitation = (item: IInvitation) => {
    if (!selectedFirma) {
      return;
    }
    return saveInvitation(item, selectedFirma?._id).then((response) => {
      helpers.checkHttpResponseForErrors(response);
      setItem(null);
      refreshInvitations(selectedFirma);
    });
  };

  useEffect(() => {
    refreshInvitations(selectedFirma);
  }, [refreshInvitations, selectedFirma]);

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        {/* {JSON.stringify(selectedFirma)} */}
        <div className="ml5">
          <MyButton
            text="Adaugare Invitatie"
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
        <div className="fcenter">
          <h3 className="fcenter">
            Selecteaza firma pentru care se doreste invitarea personalelor
          </h3>
        </div>
        <div className="flex cell-h-align  ">
          <FirmeDropDown></FirmeDropDown>
        </div>

        {!item && invitations.length > 0 && (
          <div className="flex center">
            <h3>Lista invitati</h3>
          </div>
        )}

        <div className="flex center">{renderAvailableActions()}</div>

        {item && (
          <Dialog
            header="Invita "
            visible={item !== null}
            // style={{ width: "50vw" }}
            onHide={() => setItem(null)}
          >
            <AddEditInvitation
              invitation={item}
              onSave={executeSaveInvitation}
              onCancel={() => setItem(null)}
            ></AddEditInvitation>
          </Dialog>
        )}
        <DataTableWrapper
          data={invitations}
          fieldHeader={[
            { header: "Email", field: "email" },
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
                        onClick={() => executeDeleteInvitation(el)}
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
