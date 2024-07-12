import { ILoggedUser } from "../../_store/useIdentity";

export const ENTITY_INVITATIONS = (loggedUser: ILoggedUser) =>
  `_invitations${loggedUser.clientId}`;
