import { useCallback } from "react";
import { helpers } from "../../_utils/helpers";
import useApi from "../transactions/hook/useApi";

const useUserMethods = () => {
  const { executeMethodFromModule, callDeleteAccount } = useApi();

  const callLoginMethod = useCallback(
    async (payload, route = "loginWithGoogle") => {
      const { email } = payload;
      if (!payload.email) {
        throw new Error("Email-ul trebuie sa fie completat");
      }

      if (!payload.password) {
        throw new Error("Parola trebuie completata");
      }

      // const bulletHttp = createBulletHttpRequestLibrary(true);
      const response = await executeMethodFromModule(
        {
          method: "login",
          moduleName: "user",
          body: {
            email,
            password: payload.password,
          },
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
    []
  );

  const createAccount = async ({ email, password }, sendEmail = false) => {
    const responseData = await executeMethodFromModule(
      {
        method: "createUser",
        moduleName: "user",

        body: {
          email,
          password,
        },
      },
      {
        allowAnonymous: true,
      }
    );

    helpers.checkHttpResponseForErrors(responseData);
    return responseData;
  };

  const deleteAccount = async () => {
    const response = await callDeleteAccount();
    helpers.checkHttpResponseForErrors(response);

    return response;
  };

  return {
    callLoginMethod,
    createAccount,
    deleteAccount,
  };
};

export { useUserMethods };
