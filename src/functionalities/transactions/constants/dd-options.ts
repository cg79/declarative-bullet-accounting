const ddOptions = [
  { value: 0, label: "-- Alegeti Actiunea --" },
  {
    value: 1,
    label: "Intrare bani",
    className: "myOptionClassName",
  },
  { value: 2, label: "Intrare salar" },
  { value: 3, label: "Cumparare cu Deducere TVA" },
  {
    value: 13,
    label: "Cumparare cu Deducere TVA (50%)",
    className: "myOptionClassName",
  },
  { value: 4, label: "Plata TVA" },
  { value: 5, label: "Plata Salar" },
  { value: 6, label: "Plata Pensie si Sanatate si 1% (TREZ)" },
  { value: 7, label: "Plata Asigurare munca" },
  { value: 8, label: "Plata Dividende", className: "myOptionClassName" },

  { value: 9, label: "Transfer cont personal" },

  { value: 10, label: "Comision Tranzactie", className: "myOptionClassName" },
  { value: 11, label: "Abonament Banca", className: "myOptionClassName" },
  { value: 12, label: "Comision Incasare", className: "myOptionClassName" },
];
const Actions = {
  0: "Alegeti actiunea",
  1: "Intrare Bani",
  2: "Intrare Salar",
  3: "Cumparare cu Deducere TVA",
  13: "Cumparare cu Deducere TVA (50%)",
  4: "Plata TVA",
  5: "Plata Salar",
  6: "Plata Pensie si Sanatate",
  7: "Plata Asigurare munca",
  8: "Plata Dividende",
  9: "Transfer cont personal",
  10: "Comision Tranzactie",
  11: "Abonament Banca",
  12: "Comision Incasare",
};

export { ddOptions, Actions };
