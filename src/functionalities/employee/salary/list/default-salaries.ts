import { ISalarAddEdit } from "../../../transactions/model/accounting_types";

const DEFAULT_SALARIES: ISalarAddEdit[] = [
  {
    nume: "Salar",
    value: 3300,
    description: "Salar",
    dataSalar: 1696169477,
    impozit_venit: 0,
    scutire_impozit: 0,
  },
  {
    nume: "Salar",
    value: 3000,
    description: "Salar",
    dataSalar: 1672585877,
    impozit_venit: 0,
    scutire_impozit: 200,
  },
  {
    _id: "659d3300b0c83fd2a9445378",
    nume: "Salar",
    value: 2550,
    description: "Salar",
    dataSalar: 1641049877,
    impozit_venit: 0,
    scutire_impozit: 0,
  },
  {
    _id: "659d61d7b0c83fd2a9445379",
    nume: "Salar",
    value: 2300,
    description: "Salar",
    dataSalar: 1609513877,
    impozit_venit: 0,
    scutire_impozit: 0,
  },
];

export default DEFAULT_SALARIES;
