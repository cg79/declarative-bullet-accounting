export interface IEntityInvitation {
  _id: string;
  dataInvitatie: number;
  accepted: boolean;
  email: string;
  name: string;
  clientId: string;
  entityId: string;
  selected?: boolean;
  difs?: any;
}

export const getDefaultEntityInvitation = (
  clientId: string
): IEntityInvitation => {
  return {
    _id: '',
    dataInvitatie: 0,
    accepted: false,
    email: '',
    name: '',
    clientId: '',
    entityId: '',
  };
};
