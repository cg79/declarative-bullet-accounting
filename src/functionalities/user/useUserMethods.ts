import { useCallback } from "react";
import useDeclarativeBulletApi from "../../hooks/useDeclarativeBulletApi";

const useUserMethods = () => {
  const { createBulletHttpRequestLibrary } = useDeclarativeBulletApi();

  const callLoginMethod = useCallback(
    async (payload, route = "loginWithGoogle") => {
      if (!payload.email) {
        throw new Error("Email-ul trebuie sa fie completat");
      }

      if (!payload.password) {
        throw new Error("Parola trebuie completata");
      }

      const bulletHttp = createBulletHttpRequestLibrary(true);
      let response;
      if (route === "loginWithGoogle") {
        response = await bulletHttp.loginWithGoogle({
          email: payload.email,
          password: payload.password,
        });
      } else {
        response = await bulletHttp.managementLogin({
          email: payload.email,
          password: payload.password,
        });
      }

      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    [createBulletHttpRequestLibrary]
  );

  return {
    callLoginMethod,
  };
};

export { useUserMethods };
