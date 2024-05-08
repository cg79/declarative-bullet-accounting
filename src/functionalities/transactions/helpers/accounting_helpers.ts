import { IAccountingValues } from "../model/accounting_types";

export function formatDate(date: Date) {
  // const date = new Date(date);
  const month = "" + (date.getMonth() + 1);
  const day = "" + date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return [day, month, year, hours, minutes].join(".");
}

export const isNumeric = (str: string) => {
  console.log(str);
  if (str[str.length - 1] === ".") {
    str += "0";
  }
  if (!Number.isNaN(Number(str))) {
    return true;
  }
  return false;
  // return /^\d+$/.test(str);
};

export const parseToNUmericString = (str: string) => {
  console.log(str);
  if (str[str.length - 1] === ".") {
    str += "0";
  }
  if (!Number.isNaN(Number(str))) {
    return true;
  }
  return false;
  // return /^\d+$/.test(str);
};

export const getYMD = (dateObj: Date) => {
  var luna = dateObj.getMonth() + 1; //months from 1-12
  var zi = dateObj.getDate();
  var an = dateObj.getFullYear();
  return { an, luna, zi };
};

// export const convertDate = (dateObj: Date, dateFormat = "mm/dd/yyyy") => {
//   try {
//
//     var luna = dateObj.getUTCMonth() + 1; //months from 1-12
//     var zi = dateObj.getUTCDate();
//     var an = dateObj.getUTCFullYear();
//     return new Date(an, luna, zi, 0, 0, 0, 0);
//   } catch (ex) {
//
//     console.log(ex);
//   }
// };

export const convertDateToString = (
  dateObj: Date
  // dateFormat = "mm/dd/yyyy"
) => {
  try {
    var luna = dateObj.getMonth() + 1; //months from 1-12
    var zi = dateObj.getDate();
    var an = dateObj.getFullYear();
    return "" + luna + "/" + zi + "/" + an;
  } catch (ex) {
    console.log(ex);
  }
};
export const getDateFromString = (
  dateString: string,
  dateFormat = "mm/dd/yyyy"
) => {
  let d = dateString.split("/");
  switch (dateFormat) {
    case "dd/mm/yyyy": {
      return new Date(d[2] + "/" + d[1] + "/" + d[0]); //{ an: d[2], luna: d[1], zi: d[0] };
    }
    case "mm/dd/yyyy": {
      return new Date(d[2] + "/" + d[0] + "/" + d[1]); //{ an: d[2], luna: d[0], zi: d[1] };
    }
    default: {
      return new Date(d[0] + "/" + d[1] + "/" + d[2]); //{ an: d[0], luna: d[1], zi: d[2] };
    }
  }
  // var luna = dateObj.getUTCMonth() + 1; //months from 1-12
  // var zi = dateObj.getUTCDate();
  // var an = dateObj.getUTCFullYear();
  // return { an, luna, zi };
};

export const parseDate = (dateAsStr) => {
  return new Date(dateAsStr);
};

export const getYMDFromString = (
  dateString: string,
  dateFormat = "mm/dd/yyyy"
) => {
  let d = getDateFromString(dateString, dateFormat);
  return getYMD(d);
  // var luna = dateObj.getUTCMonth() + 1; //months from 1-12
  // var zi = dateObj.getUTCDate();
  // var an = dateObj.getUTCFullYear();
  // return { an, luna, zi };
};

export const cloneParameters = (params: IAccountingValues) => {
  return {
    ...params,
    casa: {
      ...params.casa,
    },
    taxe: {
      ...params.taxe,
    },
  };
};

export function cloneFromResult(result: any) {
  return {
    ...result.newConta,
    taxe: {
      ...result.newConta.taxe,
    },
    casa: {
      ...result.newConta.casa,
    },
  };
}

export function checkResults(result: any, expectedNewConta: any) {
  const newConta = result.newConta;
  delete newConta.addedms;
  delete newConta.modifiedms;
  delete newConta.updatedBy;
  delete newConta.userid;

  expect(newConta).toEqual(expectedNewConta);
}

export const setValueForProperty = (
  obj: any,
  val: any,
  prop: string,
  setHookFunction?: Function
) => {
  const newItem = {
    ...obj,
    [prop]: val,
  };
  setHookFunction && setHookFunction(newItem);
};
