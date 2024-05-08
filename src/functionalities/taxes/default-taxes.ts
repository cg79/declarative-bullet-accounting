import { ICompanyTax } from "../transactions/model/accounting_types";

const DEFAULT_TAXES: ICompanyTax[] = [
  {
    nume: "TaxaProfit",
    value: 0.01,
    description: "Taxa Profit",
    dataTaxa: 1640990400,
  },
  {
    nume: "Dividende",
    value: 0.05,
    description: "Dividende",
    dataTaxa: 1641032400,
  },
  {
    nume: "TaxaAsigurareMunca",
    value: 0.0225,
    description: "Taxa Asigurare Munca",
    dataTaxa: 1641032400,
  },
  {
    nume: "TaxaSanatate",
    value: 0.1,
    description: "Taxa Sanatate",
    dataTaxa: 1641032400,
  },
  {
    nume: "TaxaPensie",
    value: 0.25,
    description: "Taxa Pensie",
    dataTaxa: 1641032400,
  },
  {
    nume: "TVA",
    value: 0.19,
    description: "TVA",
    dataTaxa: 1672568400,
  },
  {
    nume: "Dividende",
    value: 0.08,
    description: "Dividende",
    dataTaxa: 1696152000,
  },
];

export default DEFAULT_TAXES;
