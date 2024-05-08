import React, { useEffect } from "react";
import observer from "./observer";
import GoogleAuth from "../functionalities/user/google-auth";
import SessionStorageManager from "../functionalities/user/session-management";

const useIdentity = () => {
  const [loggedUser, setLoggedUser] = React.useState<any>(null);

  const setareUserLogat = (user: any) => {
    setLoggedUser(user);
  };

  const bulletGuid = () => {
    const bulletUser = loggedUser;
    if (!bulletUser) {
      return null;
    }
    return bulletUser.bkguid;
  };

  const authorization = () => {
    if (!loggedUser) {
      return "";
    }
    return loggedUser.token as string;
  };

  const deconectare = () => {
    try {
      GoogleAuth.logout();
    } catch (e) {}

    setLoggedUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    observer.publish("reset");

    // navigate("/login");
  };

  useEffect(() => {
    const user = SessionStorageManager.getItem("username");

    if (user) {
      setLoggedUser(user);
    }
  }, []);
  return {
    loggedUser,
    setareUserLogat,
    bulletGuid,

    authorization,
    deconectare,
  };
};

export default useIdentity;
