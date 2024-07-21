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
