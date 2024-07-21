import { useCallback, useEffect, useState } from 'react';
import useApi from '../../../../hooks/useApi';
import { IEntityInvitation } from '../entity-invitation-type';
import useIdentity from '../../../../_store/useIdentity';
import { ENTITY_INVITATIONS } from '../constants';
import { IMoneyEntity } from '../../money-entity/money-entity-type';
import { BULLET_METHOD } from '../../../../_fluentApi/fluent/constants';
import useMoneyTransactionsFilter from '../../money-transactions/hooks/useMoneyTransactionsFilter';
import { useBetween } from '../../../../hooks/useBetween';
// import { utils } from "../../../_utils/utils";

const useMoneyInvitations = () => {
  const { executeMethodFromModule, executeMethod } = useBetween(useApi);
  const { loggedUser } = useBetween(useIdentity);
  const { setSelectedUsers } = useBetween(useMoneyTransactionsFilter);
  const [invitations, setInvitations] = useState<IEntityInvitation[]>([]);

  const toggleInvitationSelection = useCallback(
    (el: IEntityInvitation) => {
      const updatedFilters = invitations.map((filter) => {
        if (filter._id === el._id) {
          return {
            ...filter,
            selected: !filter.selected,
          };
        }
        return filter;
      });
      setInvitations(updatedFilters);
      setSelectedUsers(updatedFilters.filter((el) => el.selected));
    },
    [invitations, setInvitations, setSelectedUsers]
  );

  const saveInvitation = useCallback(
    async (invitation: IEntityInvitation) => {
      // const {startAccountingData}  = useStartAccountingData();
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
        };
      }

      const response = await executeMethodFromModule({
        method: 'sendEntityInvitation',
        moduleName: 'user',
        body: invitation,
      });
      return response;
    },
    [loggedUser, executeMethodFromModule]
  );

  const deleteInvitation = useCallback(
    async (invitation: IEntityInvitation) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
        };
      }

      // - daca nu exista, le insereaza
      return executeMethod()
        .collection((c) =>
          c
            .name(ENTITY_INVITATIONS(loggedUser))
            .method(BULLET_METHOD.DELETE_ONE)
        )
        .body(invitation)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [loggedUser, executeMethod]
  );

  const getInvitations = useCallback(
    async (selectedMoneyEntity: IMoneyEntity | null) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
          data: [],
        };
      }
      const body = selectedMoneyEntity?._id
        ? {
            entityId: selectedMoneyEntity?._id,
          }
        : {};
      const response = await executeMethodFromModule({
        method: 'getEntityInvitations',
        moduleName: 'user',
        body,
      });
      return response;
    },
    [loggedUser, executeMethodFromModule]
  );

  const refreshInvitations = useCallback(
    (selectedMoneyEntity: IMoneyEntity | null) => {
      getInvitations(selectedMoneyEntity).then((response) => {
        setInvitations(response.data);
      });
    },
    [getInvitations]
  );

  const acceptInvitation = useCallback(
    async (invitation: IEntityInvitation) => {
      const response = await executeMethodFromModule({
        moduleName: 'user',
        method: 'acceptInvitation',
        body: invitation,
      });

      return response;
      // - daca nu exista, le insereaza
    },
    [executeMethodFromModule]
  );

  useEffect(() => {
    refreshInvitations(null);
  }, [refreshInvitations]);

  return {
    saveInvitation,
    deleteInvitation,
    getInvitations,
    acceptInvitation,
    refreshInvitations,
    invitations,
    setInvitations,
    toggleInvitationSelection,
  };
};
export default useMoneyInvitations;
