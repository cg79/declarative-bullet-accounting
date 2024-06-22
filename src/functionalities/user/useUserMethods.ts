import { useCallback } from "react";
import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";
import { helpers } from "../../_utils/helpers";

const useUserMethods = () => {
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  const callLoginMethod = useCallback(
    async (payload, route = "loginWithGoogle") => {
      const { email } = payload;
      if (!payload.email) {
        throw new Error("Email-ul trebuie sa fie completat");
      }

      if (!payload.password) {
        throw new Error("Parola trebuie completata");
      }

      const bulletHttp = createBulletHttpRequestLibrary(true);
      const response = await bulletHttp.login(
        {
          email,
          password: payload.password,
        },
        email.replace(/[^a-zA-Z]+/g, "")
      );

      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    [createBulletHttpRequestLibrary]
  );

  const createAccount = async ({ email, password }, sendEmail = false) => {
    const bulletHttp = createBulletHttpRequestLibrary(true);
    const responseData = await bulletHttp.createuser(
      {
        email,
        password,
        nick: sendEmail ? email : "",
      },
      email
        .replace("@", "")
        .replace(".", "")
        .replace(/[^a-zA-Z]+/g, "")
    );
    helpers.checkHttpResponseForErrors(responseData);
    return responseData;
  };

  const deleteAccount = async () => {
    const bulletHttp = createBulletHttpRequestLibrary();
    const response = await bulletHttp.delete();
    helpers.checkHttpResponseForErrors(response);
    // const response = await bulletHttp.executeMethodFromModule({
    //   method: "deleteAccount",
    //   moduleName: "management",
    //   body: {},
    // });
    return response;
  };

  return {
    callLoginMethod,
    createAccount,
    deleteAccount,
  };
};

export { useUserMethods };
