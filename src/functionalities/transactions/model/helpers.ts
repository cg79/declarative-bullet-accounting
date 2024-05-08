import { utils } from "../../../_utils/utils";
import {
  IAccountingRecord,
  IAddEditTransactionValues,
  ParsedAccountingRecord,
} from "./accounting_types";

const parseAccountingRecord = (
  accountingRecord: IAccountingRecord
): ParsedAccountingRecord | null => {
  console.log(accountingRecord);
  try {
    const {
      _id,
      trace: {
        accountingRequest: {
          operationid,
          suma,
          dataInregistrare: data,
          dataTranzactie,
          description = "",
          factura = null,
        },
        previous: {
          taxe: {
            pensie,
            sanatate,
            munca,
            dividende,
            tva,
            taxa_profit,
            total,
            tva_deductibil,
          },
          casa: { cont_personal, disponibil, firma },
          salar: { value: salar_value },
          taxeSalar,
          taxeTrezorerie = 0,
          // taxe_aplicate,
          numar,
        },
        newConta: {
          taxe: {
            pensie: pensie1,
            sanatate: sanatate1,
            munca: munca1,
            dividende: dividende1,
            tva: tva1,
            taxa_profit: taxa_profit1,
            total: total1,
            tva_deductibil: tva_deductibil1,
          },
          casa: {
            cont_personal: cont_personal1,
            disponibil: disponibil1,
            firma: firma1,
          },
          salar: { value: salar_value1 },
          taxeSalar: taxeSalar1,
          taxeTrezorerie: taxeTrezorerie1 = 0,
          numar: numar1,
          taxe_aplicate: taxe_aplicate1,
        },
      },
    } = accountingRecord;
    return {
      _id,
      operationid,
      suma,
      dataInregistrare: data,
      dataTranzactie,
      description,
      pensie,
      sanatate,
      munca,
      dividende,
      tva,
      taxa_profit,
      total,
      tva_deductibil,
      taxeTrezorerie,
      pensie1,
      sanatate1,
      munca1,
      dividende1,
      tva1,
      taxa_profit1,
      total1,
      tva_deductibil1,
      cont_personal,
      disponibil,
      firma,
      cont_personal1,
      disponibil1,
      firma1,
      salar_value,
      taxeSalar,
      numar,
      salar_value1,
      taxeSalar1,
      numar1,
      taxeTrezorerie1,
      taxe_aplicate1,
      factura,
    };
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

const accountingRecordToIAddEditTransactionValues = (
  record: IAccountingRecord
) => {
  const accountingRequest = record.trace.accountingRequest;

  const response: IAddEditTransactionValues = {
    _id: record._id,
    guid: record.guid,
    operationid: accountingRequest.operationid,
    suma: accountingRequest.suma,
    dataInregistrare: accountingRequest.dataInregistrare,
    dataTranzactie:
      accountingRequest.dataTranzactie || accountingRequest.dataInregistrare,

    description: accountingRequest.description,
  };
  return response;
};

const createDefaultIAddEditTransactionValues =
  (): IAddEditTransactionValues => {
    return {
      guid: utils.createUUID(),
      operationid: 0,
      suma: 0,
      dataInregistrare: 0,
      dataTranzactie: 0,
      description: "",
    };
  };

export {
  parseAccountingRecord,
  accountingRecordToIAddEditTransactionValues,
  createDefaultIAddEditTransactionValues,
};
