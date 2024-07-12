import { useCallback, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useBetween } from "use-between";
import { IEntityInvitation } from "../entity-invitation-type";
import useIdentity from "../../../_store/useIdentity";
import { ENTITY_INVITATIONS } from "../constants";
import { IMoneyEntity } from "../../money-entity/money-entity-type";
import { BULLET_METHOD } from "../../../_fluentApi/fluent/constants";
// import { utils } from "../../../_utils/utils";

const useMoneyInvitations = () => {
  const { executeMethodFromModule, executeMethod } = useBetween(useApi);
  const { loggedUser } = useBetween(useIdentity);
  const [invitations, setInvitations] = useState<IEntityInvitation[]>([]);

  const saveInvitation = useCallback(async (invitation: IEntityInvitation) => {
    // const {startAccountingData}  = useStartAccountingData();
    if (!loggedUser) {
      return {
        success: false,
        message: "Nu sunteti autentificat",
      };
    }

    const response = await executeMethodFromModule({
      method: "sendEntityInvitation",
      moduleName: "user",
      body: invitation,
    });
    return response;
  }, []);

  const deleteInvitation = useCallback(
    async (invitation: IEntityInvitation) => {
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
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
    []
  );

  const getInvitations = useCallback(
    async (selectedMoneyEntity: IMoneyEntity | null) => {
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
          data: [],
        };
      }
      const body = selectedMoneyEntity?._id
        ? {
            entityId: selectedMoneyEntity?._id,
          }
        : {};
      const response = await executeMethodFromModule({
        method: "getEntityInvitations",
        moduleName: "user",
        body,
      });
      return response;
      // return executeMethod()
      //   .collection((c) =>
      //     c.name(ENTITY_INVITATIONS(loggedUser)).method(BULLET_METHOD.FIND)
      //   )
      //   .search((s) => s.findByObject({ entityId: selectedMoneyEntity?._id }))
      //   .sort((s) => s.field("dataInvitatie").ascending(false))
      //   .execute({
      //     beforeSendingRequest: (apiBulletJSON: any) => {
      //       console.log(JSON.stringify(apiBulletJSON));
      //     },
      //   })
      //   .then((val: CustomHttpResponse) => {
      //     //   helpers.checkHttpResponseForErrors(val);
      //     if (val.data) {
      //       val.data.forEach((el) => (el.date = new Date(el.date)));
      //     }
      //     return val;
      //   });
    },
    []
  );

  const refreshInvitations = useCallback(
    (selectedMoneyEntity: IMoneyEntity | null) => {
      getInvitations(selectedMoneyEntity).then((response) => {
        setInvitations(response.data);
      });
    },
    []
  );

  const acceptInvitation = useCallback(async (invitation) => {
    // const {startAccountingData}  = useStartAccountingData();

    const { clientId } = invitation;

    const response = await executeMethodFromModule({
      moduleName: "user",
      method: "acceptInvitation",
      body: invitation,
    });

    return response;
    // - daca nu exista, le insereaza
  }, []);

  return {
    saveInvitation,
    deleteInvitation,
    getInvitations,
    acceptInvitation,
    refreshInvitations,
    invitations,
    setInvitations,
  };
};
export default useMoneyInvitations;
