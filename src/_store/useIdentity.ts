import React, { useEffect } from "react";
import observer from "./observer";
import GoogleAuth from "../functionalities/user/google-auth";
import SessionStorageManager from "../functionalities/user/session-management";
import LocalStorageStorageManager from "../functionalities/user/localstorage-management";

export interface ILoggedUser {
  _id: string;
  isInvited: boolean;
  bkguid: string;
  token: string;
  clientId: string;
  bulletGuid: string;
  email: string;
}
const useIdentity = () => {
  const [loggedUser, setLoggedUser] = React.useState<ILoggedUser | null>(null);

  const setareUserLogat = (user: any) => {
    setLoggedUser(user);
    LocalStorageStorageManager.setItem("username", user);
  };
  const clearLoggedUser = () => {
    setLoggedUser(null);
    LocalStorageStorageManager.removeItem("username");
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
    debugger;
    try {
      GoogleAuth.logout();
    } catch (e) {}

    clearLoggedUser();
    observer.publish("reset");

    // navigate("/login");
  };

  useEffect(() => {
    const user = LocalStorageStorageManager.getItem("username") as any;

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
    clearLoggedUser,
  };
};

export default useIdentity;
