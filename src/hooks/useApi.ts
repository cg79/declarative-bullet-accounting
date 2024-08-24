import PubSub from "../_utils/PubSub";
import { useBetween } from "./useBetween";
import useIdentity from "../_store/useIdentity";
import { useCallback } from "react";
import { BULLET_IO_URL } from "../constants";
import BulletHttpRequestLibrary from "../_fluentApi/BulletHttpRequestLibrary";
import DeclarativeBulletApi from "../_fluentApi/declarative-bullet-api";
import { MethodExecutionRequest } from "../_fluentApi/facade";
import { CustomHttpResponse } from "../_fluentApi/CustomHttpResponse";

export interface ApiOptions {
  allowAnonymous?: boolean;
}
const useApi = () => {
  const { clearLoggedUser, loggedUser } = useBetween(useIdentity);

  const createBulletHttpRequestLibrary = useCallback(
    (options: ApiOptions = { allowAnonymous: false }) => {
      if (!loggedUser && !options.allowAnonymous) {
        throw new Error("no bullet key");
      }

      return new BulletHttpRequestLibrary({
        authentication: loggedUser?.token || "",
        serverUrl: BULLET_IO_URL(),
      });
    },
    [loggedUser]
  );

  const createDeclarativeBulletApi = useCallback(
    (options: ApiOptions = { allowAnonymous: false }) => {
      if (!loggedUser && !options?.allowAnonymous) {
        throw new Error("no token. please get a token first");
      }

      const onResponse = (response: CustomHttpResponse) => {
        if (!response.success) {
          if (response.message === "jwt expired") {
            clearLoggedUser();
          }
          PubSub.publish("onError", response.message);
        }
      };

      return new DeclarativeBulletApi(
        {
          authentication: loggedUser?.token || "",
          serverUrl: BULLET_IO_URL(),
        },
        onResponse
      );
    },
    [loggedUser]
  );
  const executeMethodFromModule = useCallback(
    async (
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
    },
    [createBulletHttpRequestLibrary, clearLoggedUser]
  );

  const executeMethod = useCallback(() => {
    return createDeclarativeBulletApi();
  }, [createDeclarativeBulletApi]);

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
