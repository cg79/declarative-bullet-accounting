import { useCallback, useEffect, useState } from 'react';
import { MyButton } from '../../../../_components/reuse/my-button';
import DataTableWrapper from '../../../../_components/reuse/data-table/DataTableWrapper';
import { helpers } from '../../../../_utils/helpers';
import { AddEditInvitation } from '../add-edit/add-edit-invitation';
import { IInvitation } from '../../../transactions/model/accounting_types';
import useIdentity from '../../../../_store/useIdentity';
import { utils } from '../../../../_utils/utils';
import { LabelDropDown } from '../../../../_components/reuse/LabelDropDown';
import useMoneyEntities from '../../money-entity/hooks/useMoneyEntities';
import { IMoneyEntity } from '../../money-entity/money-entity-type';
import {
  IEntityInvitation,
  getDefaultEntityInvitation,
} from '../entity-invitation-type';
import useMoneyInvitations from '../hooks/useMoneyInvitations';
import TreeIcon from '../../categories/components/icons/tree-icon';
import { DialogWrapper } from '../../../../_components/reuse/DialogWrapper';
import { useBetween } from '../../../../hooks/useBetween';
import { useNavigate } from 'react-router-dom';
import GenericList from '../../../todo/list/GenericList';

export const EntityInvitations = () => {
  const navigate = useNavigate();
  const { loggedUser } = useBetween(useIdentity);
  const { moneyEntities } = useBetween(useMoneyEntities);

  const { deleteInvitation, saveInvitation, refreshInvitations, invitations } =
    useMoneyInvitations();

  // const [item, setItem] = useState<IEntityInvitation | null>(null);

  const moneyEntitiesList: IMoneyEntity[] = [
    { _id: '', name: '--ALL--', date: 0, description: '' },
    ...(moneyEntities || []),
  ];

  const collectionName = `_invitations${loggedUser?.clientId}`;

  const [selectedMoneyEntity, setSelectedMoneyEntity] =
    useState<IMoneyEntity | null>(null);

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
      _id: '',
      dataInvitatie: utils.dateToEpoch(new Date()),
      accepted: false,
      email: '',
      name: '',
      clientId: loggedUser.clientId,
      entityId: selectedMoneyEntity?._id || '',
    };

    // setItem(newInvitation);
  };

  const executeSaveInvitation = (item: IInvitation) => {
    return saveInvitation(item).then((response) => {
      helpers.checkHttpResponseForErrors(response);
      // setItem(null);
      refreshInvitations(selectedMoneyEntity);
    });
  };

  // useEffect(() => {
  //   refreshInvitations(selectedMoneyEntity);
  // }, []);

  useEffect(() => {
    if (loggedUser && loggedUser.isInvited) {
      navigate('/');
    }
  }, []);

  const renderAvailableActions = (onClick: () => void) => {
    return (
      <div className="mt10">
        {/* {JSON.stringify(selectedFirma)} */}
        <div className="ml5">
          <MyButton
            text="Adaugare Invitatie"
            onClick={onClick}
            className="w300"
          ></MyButton>
        </div>
      </div>
    );
  };

  const createItem = (): IEntityInvitation => getDefaultEntityInvitation();
  const renderAddEditContent = (
    item: IEntityInvitation,
    onSave: (item: IEntityInvitation) => Promise<unknown>,
    onCancel: () => void
  ) => {
    return (
      // <DialogWrapper
      //   header="Invita "
      //   visible={item !== null}
      //   // style={{ width: "50vw" }}
      //   onHide={() => {
      //     debugger;
      //     onCancel();
      //   }}
      // >
      <AddEditInvitation
        invitation={item}
        // onSave={executeSaveInvitation}
        onSave={onSave}
        onCancel={onCancel}
      ></AddEditInvitation>
      // </DialogWrapper>
    );
  };

  return (
    <div className="fcenter ">
      <div className="flex flex-column center-v">
        <div className="flex center">
          <h3>Lista invitati</h3>
        </div>

        {moneyEntities && moneyEntities.length > 0 && (
          <LabelDropDown
            label="Evenimente"
            onChange={(item) => {
              console.log(item);
              setSelectedMoneyEntity(item);
            }}
            options={moneyEntitiesList}
            value={selectedMoneyEntity}
            placeholder="Selecteaza"
            optionLabel="name"
          ></LabelDropDown>
        )}

        {/* {item && (
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
        )} */}
        {/* <DataTableWrapper
          data={invitations || []}
          fieldHeader={[
            { header: 'Email', field: 'email' },
            { header: 'Name', field: 'name' },
            {
              header: 'Data Invitatie',
              field: 'dataInvitatie',
              body: (el) => utils.dateNumberToYYYYMMDD(el.dataInvitatie),
            },
            {
              header: 'Acceptat',
              field: 'accepted',
              body: (el) =>
                el.accepted ? (
                  <TreeIcon
                    size={20}
                    icon="pi pi-check-circle"
                    color="green"
                    onClick={() => {}}
                  />
                ) : (
                  <TreeIcon size={20} icon="notcheck" onClick={() => {}} />
                ),
            },
            {
              header: 'Actiuni1',
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
          renderCreateFirstItem={() => null}
        ></DataTableWrapper> */}

        <GenericList
          renderCreateFirstItem={(onClickFunction) =>
            renderAvailableActions(onClickFunction)
          }
          fieldHeader={[
            { header: 'Email', field: 'email' },
            { header: 'Name', field: 'name' },
            {
              header: 'Data Invitatie',
              field: 'dataInvitatie',
              body: (el) => utils.dateNumberToYYYYMMDD(el.dataInvitatie),
            },
            {
              header: 'Acceptat',
              field: 'accepted',
              body: (el) =>
                el.accepted ? (
                  <TreeIcon
                    size={20}
                    icon="pi pi-check-circle"
                    color="green"
                    onClick={() => {}}
                  />
                ) : (
                  <TreeIcon size={20} icon="notcheck" onClick={() => {}} />
                ),
            },
          ]}
          createItem={createItem}
          addItemButtonLabel="Adaugare Account"
          renderAddEditContent={renderAddEditContent}
          collectionName={collectionName}
          sortBy={[{ field: 'date', ascending: false }]}
          modalTitle={(item: IEntityInvitation, isForDeletion) => {
            return item?.name
              ? `Editare Invitatie ${item.name}`
              : 'Adaugare Invitatie';
          }}
          onAfterItemSaved={() => {
            debugger;
          }}
          // renderActions={renderActions}
        ></GenericList>
      </div>
    </div>
  );
};
