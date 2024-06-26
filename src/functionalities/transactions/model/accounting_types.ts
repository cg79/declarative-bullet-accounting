import { Actions } from "../constants/dd-options";

export enum ACTIONS_ENUM {
  NO_ACTION = 0,
  INTRARE_SALAR_FARA_TVA = 1,
  INTRARE_SALAR_SE_ADAUGA_TVA = 2,
  CUMPARARE_DEDUCERE_TVA = 3,
  PLATA_TVA = 4,
  PLATA_SALAR = 5,
  PLATA_PENSIE_SANATATE_ONEP_DIVIDENDE = 6,
  PLATA_ASIGURARE_MUNCA = 7,
  TRANSFER_CONT_PERSONAL = 8,
  COMISION_TRANZACTIE = 9,
  ABONAMENT_BANCA = 10,
  COMISION_TRANSFER = 11,
  //     { value: '2', label: 'Intrare salar fara TVA' },
  //     { value: '3', label: 'Cumparare cu Deducere TVA' },
  //     { value: '4', label: 'Plata TVA' },
  //     { value: '5', label: 'Plata Salar' },
  //     { value: '6', label: 'Plata Pensie si Sanatate' },
  //     { value: '7', label: 'Plata Asigurare munca' },
  //     { value: '8', label: 'Transfer cont personal' },
}

export type ExecuteDeleteAccountingActionType = (
  record: IAccountingRecord,
  angajatId: string
) => Promise<void>;

export const getActionById = (id: number) => {
  return {
    value: id.toString(),
    label: Actions[id],
  };
};

export interface ICompanyTax {
  _id?: string;
  nume: string;
  value: number;

  description: string;
  dataTaxa: number;
}

export interface ISalarAddEdit {
  scutire_impozit: number;
  impozit_venit: number;
  _id?: string;
  nume: string;
  value: number;

  description: string;
  dataSalar: number;
}

export interface IAngajat {
  _id: string;
  nume: string;
  dataAngajare: number;
  showDemisie: boolean;
  dataDemisie?: number;
  salarii: ISalarAngajat[];
  contPersonal: string;
}

export interface IInvitation {
  _id: string;
  dataInvitatie: number;
  accepted: boolean;
  email: string;
  clientId: string;
}

export interface ISalarAngajat {
  guid: string;
  value: number;
  date: number;
  taxe: ITaxeSalar;
}

export interface ITaxeSalar {
  guid: string;
  pensie: number;
  sanatate: number;
  munca: number;
}

export interface ITaxe {
  pensie: number;
  sanatate: number;
  munca: number;
  dividende: number;
  tva: number;
  taxa_profit: number;
  total: number;
  tva_deductibil: number;
}

export interface ISalar {
  value: number;
}

export interface ICasa {
  firma: number;
  cont_personal: number;
  disponibil: number;
}

export interface IAddEditTransactionValues {
  _id?: string;

  guid: string;
  suma: number;
  operationid: number;
  dataInregistrare: number;
  dataTranzactie: number;
  description?: string;
  explanation?: string;
  factura?: {
    filePath: string;
    fileName: string;
  };
  imported?: boolean;
  checked?: boolean;
  accountingRecord?: IAccountingRecord;
}

export interface IAccountingValues {
  guid: string;
  casa: ICasa;
  taxe: ITaxe;
  salar: ISalar;
  numar: number;
  description: string;
  taxeSalar: number;
  taxeTrezorerie: number;
  taxe_aplicate?: any;
}

export type IAccountingInput = [IAddEditTransactionValues, IAccountingValues];

export interface IAccountingRecord {
  _id?: string;
  guid: string;

  simulation?: boolean;
  trace: {
    accountingRequest: IAddEditTransactionValues;
    previous: IAccountingValues;
    newConta: IAccountingValues;
  };
}

export interface IPager {
  count: number;
  records: any[];
  pageNo: number;
  pageCount: number;
}

export interface ParsedAccountingRecord {
  _id?: string;
  operationid: number;
  suma: number;
  dataInregistrare: number;
  dataTranzactie: number;
  description: string;
  pensie: number;
  sanatate: number;
  munca: number;
  dividende: number;
  tva: number;
  taxa_profit: number;
  total: number;
  tva_deductibil: number;
  taxeTrezorerie: number;
  pensie1: number;
  sanatate1: number;
  munca1: number;
  dividende1: number;
  tva1: number;
  taxa_profit1: number;
  total1: number;
  tva_deductibil1: number;
  cont_personal: number;
  disponibil: number;
  firma: number;
  cont_personal1: number;
  disponibil1: number;
  firma1: number;
  salar_value: number;
  taxeSalar: number;
  numar: number;
  salar_value1: number;
  taxeSalar1: number;
  numar1: number;
  taxeTrezorerie1: number;
  taxe_aplicate1: any;
  factura: any;
}
