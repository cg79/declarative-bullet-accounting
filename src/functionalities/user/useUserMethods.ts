import { useCallback } from 'react';
import { helpers } from '../../_utils/helpers';
import useApi from '../../hooks/useApi';
import { EntityUser, LoginRequest } from './types';
import { useBetween } from 'use-between';
import useIdentity from '../../_store/useIdentity';
import { BULLET_METHOD } from '../../_fluentApi/fluent/constants';

const useUserMethods = () => {
  const { executeMethodFromModule, callDeleteAccount, executeMethod } =
    useApi();
  const { loggedUser } = useBetween(useIdentity);

  const callLoginMethod = useCallback(
    async (payload: LoginRequest) => {
      const { email } = payload;
      if (!payload.email) {
        throw new Error('Email-ul trebuie sa fie completat');
      }

      if (!payload.password) {
        throw new Error('Parola trebuie completata');
      }

      // const bulletHttp = createBulletHttpRequestLibrary(true);
      const response = await executeMethodFromModule(
        {
          method: 'login',
          moduleName: 'user',
          body: payload,
        },
        { allowAnonymous: true }
      );
      //   {
      //     email,
      //     password: payload.password,
      //   },
      //   email.replace(/[^a-zA-Z]+/g, "")
      // );

      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    [executeMethodFromModule]
  );

  const getUsers = async (entityId: string): Promise<EntityUser[]> => {
    if (!loggedUser) {
      return [];
    }
    const findObject: any = {};
    if (entityId) {
      findObject.entityId = entityId;
    }

    const collectionName = `users_${loggedUser.clientId}`;
    const response = await executeMethod()
      .collection((c) => c.name(collectionName).method(BULLET_METHOD.FIND))
      .search((s) => s.findByObject(findObject))
      .execute();

    return response.data;
  };

  // const createAccount = async ({ email, password }, sendEmail = false) => {
  //   const responseData = await executeMethodFromModule(
  //     {
  //       method: 'createUser',
  //       moduleName: 'user',

  //       body: {
  //         email,
  //         password,
  //       },
  //     },
  //     {
  //       allowAnonymous: true,
  //     }
  //   );

  //   helpers.checkHttpResponseForErrors(responseData);
  //   return responseData;
  // };

  const deleteAccount = async () => {
    const response = await callDeleteAccount();
    helpers.checkHttpResponseForErrors(response);

    return response;
  };

  return {
    callLoginMethod,
    // createAccount,
    deleteAccount,
    getUsers,
  };
};

export { useUserMethods };
