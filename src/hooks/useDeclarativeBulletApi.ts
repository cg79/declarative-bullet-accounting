import DeclarativeBulletApi from "declarative-fluent-bullet-api/declarative-bullet-api";
import BulletHttpRequestLibrary from "declarative-fluent-bullet-api/BulletHttpRequestLibrary";

import { BULLET_IO_URL } from "../constants";
import useIdentity from "../_store/useIdentity";
import { useBetween } from "use-between";
import { useCallback } from "react";

const useDeclarativeBulletApi = () => {
  const { loggedUser } = useBetween(useIdentity);

  const createDeclarativeBulletApi = useCallback(
    (allowAnonymous = false) => {
      let authentication = loggedUser?.token;

      if (!authentication && !allowAnonymous) {
        throw new Error("no token. please get a token first");
      }

      return new DeclarativeBulletApi({
        authentication,
        serverUrl: BULLET_IO_URL(),
      });
    },
    [loggedUser?.token]
  );

  const createBulletHttpRequestLibrary = useCallback(
    (allowAnonymous = false) => {
      const bulletKey = loggedUser?.token;
      if (!bulletKey && !allowAnonymous) {
        throw new Error("no bullet key");
      }

      return new BulletHttpRequestLibrary({
        authentication: bulletKey,
        serverUrl: BULLET_IO_URL(),
      });
    },
    [loggedUser?.token]
  );

  return {
    createDeclarativeBulletApi,
    createBulletHttpRequestLibrary,
  };
};

export default useDeclarativeBulletApi;
