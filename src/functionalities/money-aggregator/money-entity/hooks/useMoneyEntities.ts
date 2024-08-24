import { useCallback, useEffect, useState } from 'react';
import useApi from '../../../../hooks/useApi';
import useIdentity from '../../../../_store/useIdentity';
import { IMoneyEntity } from '../money-entity-type';
import { MONEY_ENTITY_COLLECTION } from '../constants';
import { BULLET_METHOD } from '../../../../_fluentApi/fluent/constants';
import { CustomHttpResponse } from '../../../../_fluentApi/CustomHttpResponse';
import { useBetween } from '../../../../hooks/useBetween';

const useMoneyEntities = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [selectedMoneyEntity, setSelectedMoneyEntity] =
    useState<IMoneyEntity | null>(null);
  const [moneyEntities, setMoneyEntities] = useState<IMoneyEntity[] | null>(
    null
  );
  const [reloadItems, setReloadItems] = useState('');

  const getAllEntities = useCallback(
    async (selectedMoneyEntity: IMoneyEntity | null) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
          data: [],
        };
      }
      if (loggedUser.isInvited) {
        const response = await executeMethodFromModule({
          method: 'getEntitiesForInvitedUser',
          moduleName: 'user',
          body: {},
        });
        return response;
      }
      return (
        executeMethod()
          .collection((c) =>
            c
              .name(MONEY_ENTITY_COLLECTION(loggedUser))
              .method(BULLET_METHOD.FIND)
          )
          // .search((s) => s.findByObject({ entityId: selectedMoneyEntity?._id }))
          // .sort((s) => s.field("dataInvitatie").ascending(false))
          .execute({
            beforeSendingRequest: (apiBulletJSON: any) => {
              console.log(JSON.stringify(apiBulletJSON));
            },
          })
          .then((val: CustomHttpResponse) => {
            // helpers.checkHttpResponseForErrors(val);
            if (val.data) {
              val.data.forEach((el) => (el.date = new Date(el.date)));
            }
            return val;
          })
      );
    },
    []
  );

  useEffect(() => {
    if (!loggedUser) {
      return;
    }

    const fetchData = async () => {
      try {
        const categoriesResponse = await executeMethod()
          .collection((c) =>
            c
              .name(MONEY_ENTITY_COLLECTION(loggedUser))
              .method(BULLET_METHOD.FIND)
          )
          .execute({
            beforeSendingRequest: (apiBulletJSON) => {
              console.log(JSON.stringify(apiBulletJSON));
            },
          });

        return categoriesResponse;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData().then((response) => {
      setMoneyEntities(response?.data);
    });
  }, [loggedUser, reloadItems]);

  return {
    selectedMoneyEntity,
    setSelectedMoneyEntity,
    moneyEntities,
    setReloadItems,
  };
};

export default useMoneyEntities;
