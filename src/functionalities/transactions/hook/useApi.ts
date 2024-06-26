import { MethodExecutionRequest } from "declarative-fluent-bullet-api/facade";
import { helpers } from "../../../_utils/helpers";
import PubSub from "../../../_utils/PubSub";
import { useBetween } from "use-between";
import useIdentity from "../../../_store/useIdentity";
import { useCallback } from "react";
import BulletHttpRequestLibrary from "declarative-fluent-bullet-api/BulletHttpRequestLibrary";
import { BULLET_IO_URL } from "../../../constants";
import DeclarativeBulletApi from "declarative-fluent-bullet-api/declarative-bullet-api";

export interface ApiOptions {
  allowAnonymous?: boolean;
}
const useApi = () => {
  const { clearLoggedUser, loggedUser } = useBetween(useIdentity);

  const createBulletHttpRequestLibrary = useCallback(
    (options: ApiOptions = { allowAnonymous: false }) => {
      debugger;
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
    [loggedUser?.token]
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
