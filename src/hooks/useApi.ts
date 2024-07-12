import PubSub from "../_utils/PubSub";
import { useBetween } from "use-between";
import useIdentity from "../_store/useIdentity";
import { useCallback } from "react";
import { BULLET_IO_URL } from "../constants";
import BulletHttpRequestLibrary from "../_fluentApi/BulletHttpRequestLibrary";
import DeclarativeBulletApi from "../_fluentApi/declarative-bullet-api";
import { MethodExecutionRequest } from "../_fluentApi/facade";

export interface ApiOptions {
  allowAnonymous?: boolean;
}
const useApi = () => {
  const { clearLoggedUser, loggedUser } = useBetween(useIdentity);

  const createBulletHttpRequestLibrary = useCallback(
    (options: ApiOptions = { allowAnonymous: false }) => {
      const bulletKey = loggedUser?.token || "";
      if (!bulletKey && !options.allowAnonymous) {
        throw new Error("no bullet key");
      }

      return new BulletHttpRequestLibrary({
        authentication: bulletKey,
        serverUrl: BULLET_IO_URL(),
      });
    },
    [loggedUser?.token]
  );

  const createDeclarativeBulletApi = useCallback(
    (options: ApiOptions = { allowAnonymous: false }) => {
      let authentication = loggedUser?.token;

      if (!authentication && !options?.allowAnonymous) {
        throw new Error("no token. please get a token first");
      }

      return new DeclarativeBulletApi({
        authentication: authentication || "",
        serverUrl: BULLET_IO_URL(),
      });
    },
    [loggedUser]
  );
  const executeMethodFromModule = async (
    request: MethodExecutionRequest,
    options: { allowAnonymous?: boolean } = { allowAnonymous: false }
  ) => {
    const bulletHttp = createBulletHttpRequestLibrary(options);
    const response = await bulletHttp.executeMethodFromModule(request);

    if (!response.success) {
      if (response.message === "jwt expired") {
        clearLoggedUser();
      }
      PubSub.publish("onError", response.message);
    }
    return response;
  };

  const executeMethod = () => {
    return createDeclarativeBulletApi();
  };

  const callDeleteAccount = async () => {
    const bulletHttp = createBulletHttpRequestLibrary();
    const response = await bulletHttp.delete();
    return response;
  };

  return {
    executeMethodFromModule,
    executeMethod,
    callDeleteAccount,
  };
};

export default useApi;
