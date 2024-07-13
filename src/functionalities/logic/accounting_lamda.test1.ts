import {
  STARTING_ACCOUNT_VALUES,
  expected,
} from "../transactions/constants/accounting_constants";
import {
  checkResults,
  cloneFromResult,
} from "../transactions/helpers/accounting_helpers";
import { accounting_lamda } from "./accounting_lamda";
import { ACTIONS_ENUM } from "../transactions/model/accounting_types";
import { prepareNewAccountingAction } from "./lamda-helpers";

describe.only("calculate", function () {
  it("add", function () {
    const p0 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.INTRARE_SALAR_SE_ADAUGA_TVA,
        value: 10000,
      },
      STARTING_ACCOUNT_VALUES
    );

    const result = accounting_lamda(p0);
    checkResults(result, {
      ...expected,
      numar: 1,
      casa: {
        ...expected.casa,
        firma: 10000,
        disponibil: 6901.5,
      },
      taxe: {
        ...expected.taxe,
        pensie: 750,
        sanatate: 300,
        munca: 67.5,
        dividende: 0,
        tva: 1900,
        taxa_profit: 81,
        total: 3098.5,
        tva_deductibil: 0,
      },
      salar: {
        value: 2020,
      },
    });

    let previous = cloneFromResult(result);

    const p1 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.CUMPARARE_DEDUCERE_TVA,
        value: 100,
      },
      result.newConta
    );

    const result1 = accounting_lamda(p1);
    checkResults(result1, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: 9900,
        disponibil: 6801.5,
      },
      taxe: {
        ...previous.taxe,
        total: 3079.5,
        tva: 1881,
        tva_deductibil: 19,
      },
    });
    previous = cloneFromResult(result1);

    const p2 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.PLATA_ASIGURARE_MUNCA,
        value: 50,
      },
      result1.newConta
    );

    const result2 = accounting_lamda(p2);
    checkResults(result2, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: 9850,
        disponibil: 6801.5,
      },
      taxe: {
        ...previous.taxe,
        munca: 17.5,
        total: 3029.5,
      },
    });

    previous = cloneFromResult(result2);
    let value = 50;
    const p3 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.PLATA_PENSIE_SANATATE_ONEP_DIVIDENDE,
        value,
      },
      result2.newConta
    );

    const result3 = accounting_lamda(p3);
    checkResults(result3, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: previous.casa.firma - value,
      },
      taxe: {
        ...previous.taxe,
        pensie: previous.taxe.pensie - value,
        total: previous.taxe.total - value,
      },
    });

    previous = cloneFromResult(result3);
    value = 50;
    const p4 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.PLATA_SALAR,
        value,
      },
      result3.newConta
    );

    const result4 = accounting_lamda(p4);
    checkResults(result4, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: previous.casa.firma - value,
      },
      salar: {
        value: previous.salar.value - value,
      },
    });

    previous = cloneFromResult(result4);
    value = 50;
    const p5 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.PLATA_TVA,
        value,
      },
      result4.newConta
    );
    const result5 = accounting_lamda(p5);
    checkResults(result5, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: previous.casa.firma - value,
      },
      taxe: {
        ...previous.taxe,
        tva: previous.taxe.tva - value,
        total: previous.taxe.total - value,
      },
    });

    previous = cloneFromResult(result5);
    value = 50;
    const p6 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.TRANSFER_CONT_PERSONAL,
        value,
      },
      result5.newConta
    );
    const result6 = accounting_lamda(p6);
    checkResults(result6, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: previous.casa.firma - value,
        cont_personal: previous.casa.cont_personal + value,
      },
      taxe: {
        ...previous.taxe,
        total: previous.taxe.total + value * 0.08,
        dividende: previous.taxe.dividende + value * 0.08,
      },
    });

    previous = cloneFromResult(result6);
    console.log(previous.taxe.total);
    value = previous.taxe.total;
    const p7 = prepareNewAccountingAction(
      {
        operationid: ACTIONS_ENUM.PLATA_PENSIE_SANATATE_ONEP_DIVIDENDE,
        value,
      },
      result6.newConta
    );
    const result7 = accounting_lamda(p7);
    checkResults(result7, {
      ...previous,
      numar: previous.numar + 1,
      casa: {
        ...previous.casa,
        firma: previous.casa.firma - value,
      },
      taxe: {
        ...previous.taxe,
        total: 0,
        pensie: 0,
        dividende: 0,
        taxa_profit: 0,
        sanatate: 0,
      },
    });

    // previous = cloneFromResult(result7);
    // value = previous.taxe.total;
    // const p8 = prepareNewAccountingAction(functionParameters, {
    //   operationid: ACTIONS.INTRARE_SALAR_TVA,
    //   value,
    // });
    // const result8 = accounting_lamda(p8);
    // expect(result8).toThrow();
  });
});
