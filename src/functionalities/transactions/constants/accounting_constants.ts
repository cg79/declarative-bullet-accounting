import { IAccountingValues } from "../model/accounting_types";

export const DELTA_FUNCTION = "accounting";

export const ACCOUNTING_START_VALUES = (firmaId: string) =>
  `_accounting1_start1${firmaId}`;
export const ACCOUNTING_HISTORY = (angajatId: string) => {
  return `_accounting_history${angajatId}`;
};
export const ANGAJAT_SALARY = (angajatId: string) =>
  `_angajat_salary${angajatId}`;
export const GENERAL_TAXES = `_general_taxes11`;
export const ANGAJATI = (firmaId: string) => `_angajati1${firmaId}`;
export const FIRME = `_firme`;

export const ACCOUNTING_GUID = "31ef10b0-bab4-77a8-b9db-551e48fa8374";

export const STARTING_ACCOUNTING_EVENTS_PERCENTS = {
  TAXA_TVA: 19,
  TAXA_INTRARE: 1,
  PENSIE: 25,
};

export const country_taxes = [
  {
    _id: "65905f05427a2f6d78214b42",
    nume: "TVA",
    value: 0.19,
    description: "TVA",
    date: "2023-01-01T18:18:43.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960325254,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290152093,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
  {
    _id: "65905f08427a2f6d78214b43",
    nume: "Dividende",
    value: 0.05,
    description: "Dividende",
    date: "2023-01-01T18:18:47.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960328426,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290142139,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
  {
    _id: "65905f0a427a2f6d78214b44",
    nume: "TaxaProfit",
    value: 0.01,
    description: "Taxa Profit",
    date: "2023-01-01T18:18:49.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960330547,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290161079,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
  {
    _id: "65905f0c427a2f6d78214b45",
    nume: "TaxaPensie",
    value: 0.25,
    description: "Taxa Pensie",
    date: "2023-01-01T18:18:51.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960332644,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290168571,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
  {
    _id: "65905f0e427a2f6d78214b46",
    nume: "TaxaSanatate",
    value: 0.1,
    description: "Taxa Sanatate",
    date: "2023-01-01T18:18:53.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960334506,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290174363,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
  {
    _id: "65905f10427a2f6d78214b47",
    nume: "TaxaAsigurareMunca",
    value: 0.0225,
    description: "Taxa Asigurare Munca",
    date: "2023-01-01T18:18:55.000Z",
    year: 2023,
    month: 1,
    day: 1,
    addedms: 1703960336248,
    userid: "657c2455a8464f5b07db3a55",
    modifiedms: 1704290180488,
    updatedBy: "657c2455a8464f5b07db3a55",
  },
];

export const STARTING_ACCOUNT_VALUES: IAccountingValues = Object.freeze({
  guid: "31ef10b0-bab4-77a8-b9db-551e48fa8374",
  numar: 0,
  taxe: {
    pensie: 0,
    sanatate: 0,
    munca: 0,
    dividende: 0,
    tva: 0,
    taxa_profit: 0,
    total: 0,
    tva_deductibil: 0,
  },
  casa: { firma: 0, cont_personal: 0, disponibil: 0 },
  salar: {
    value: 0,
  },
  description: "",
  taxeSalar: 0,
  taxeTrezorerie: 0,
});

export const expected: IAccountingValues = {
  ...STARTING_ACCOUNT_VALUES,
};

export const CHART_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export const chartDatasets = ({
  pensie,
  sanatate,
  munca,
  dividende,
  taxa_profit,
  tva,
  tva_deductibil,
  salar,
  totalTaxe,
  personalAccountData,
  casaFirma,
  disponibil,
}) => [
  {
    label: "Taxa.Pensie",
    data: pensie,
    backgroundColor: "rgba(255,0,0, 0.5)",
  },
  {
    label: "Taxa.Sanatate",
    data: sanatate,
    backgroundColor: "rgba(102,0,0, 0.5)",
  },
  {
    label: "Taxa.Munca",
    data: munca,
    backgroundColor: "rgba(102,0,0, 0.5)",
  },
  {
    label: "Taxa.Dividende",
    data: dividende,
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    label: "Taxa Profit",
    data: taxa_profit,
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    label: "Taxa.tva",
    data: tva,
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    label: "tva.Deductibil",
    data: tva_deductibil,
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    label: "Salar",
    data: salar,
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Total Taxe",
    data: totalTaxe,
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Personal Account",
    data: personalAccountData,
    backgroundColor: "rgba(53, 102,0, 0.5)",
  },
  {
    label: "Casa Firma",
    data: casaFirma,
    backgroundColor: "rgba(53, 102,0, 0.5)",
  },
  {
    label: "Disponibil",
    data: disponibil,
    backgroundColor: "rgba(53, 102,0, 0.5)",
  },
];
