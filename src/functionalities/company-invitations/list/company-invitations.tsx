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
import useIdentity from "../../../_store/useIdentity";
import { utils } from "../../../_utils/utils";
import { LabelDropDown } from "../../../_components/reuse/LabelDropDown";
import useMoneyEntities from "../../money-entity/hooks/useMoneyEntities";
import { IMoneyEntity } from "../../money-entity/money-entity-type";
import { DialogWrapper } from "../../../_components/reuse/DialogWrapper";

export const CompanyInvitations = () => {
  const { deleteInvitation, saveInvitation, getInvitations } =
    useAccountingDbActions();
  const [item, setItem] = useState<IInvitation | null>(null);
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  const { moneyEntities } = useBetween(useMoneyEntities);
  const [selectedMoneyEntity, setSelectedMoneyEntity] =
    useState<IMoneyEntity | null>(null);

  const { loggedUser } = useBetween(useIdentity);

  const refreshInvitations = useCallback(
    (selectedMoneyEntity: IMoneyEntity | null) => {
      getInvitations(selectedMoneyEntity).then((response) => {
        helpers.checkHttpResponseForErrors(response);
        setInvitations(response.data);
      });
    },
    []
  );

  useEffect(() => {
    refreshInvitations(selectedMoneyEntity);
  }, [selectedMoneyEntity]);

  const executeDeleteInvitation = (item: IInvitation) => {
    deleteInvitation(item).then(() => {
      refreshInvitations(selectedMoneyEntity);
    });
  };

  const addInvitation = () => {
    if (!loggedUser) {
      return;
    }
    const newInvitation: IInvitation = {
      _id: "",
      dataInvitatie: 0,
      accepted: false,
      email: "",
      name: "",
      clientId: loggedUser.clientId,
      entityId: selectedMoneyEntity?._id || "",
    };

    setItem(newInvitation);
  };

  const executeSaveInvitation = (item: IInvitation) => {
    return saveInvitation(item).then((response) => {
      helpers.checkHttpResponseForErrors(response);
      setItem(null);
      refreshInvitations(selectedMoneyEntity);
    });
  };

  useEffect(() => {
    refreshInvitations(selectedMoneyEntity);
  }, []);

  const renderAvailableActions = () => {
    return (
      <div className="mt10">
        {/* {JSON.stringify(selectedFirma)} */}
        <div className="ml5">
          <MyButton
            text="Adaugare Invitatie"
            onClick={() => addInvitation()}
            className="w300"
          ></MyButton>
        </div>
      </div>
    );
  };

  return (
    <div className="fcenter ">
      <div className="flex flex-column center-v">
        {!item && invitations.length > 0 && (
          <div className="flex center">
            <h3>Lista invitati</h3>
          </div>
        )}

        <div className="flex center">{renderAvailableActions()}</div>

        {moneyEntities && moneyEntities.length > 0 && (
          <LabelDropDown
            label="Entitati"
            onChange={(item) => {
              console.log(item);
              setSelectedMoneyEntity(item);
            }}
            options={moneyEntities}
            value={selectedMoneyEntity}
            placeholder="Selecteaza firme"
            optionLabel="name"
          ></LabelDropDown>
        )}

        {item && (
          <DialogWrapper
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
          </DialogWrapper>
        )}
        <DataTableWrapper
          data={invitations}
          fieldHeader={[
            { header: "Email", field: "email" },
            {
              header: "Data Invitatie",
              field: "dataInvitatie",
              body: (el) => utils.dateNumberToYYYYMMDD(el.dataInvitatie),
            },
            { header: "Acceptat", field: "accepted" },
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
