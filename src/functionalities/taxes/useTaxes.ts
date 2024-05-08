import { useState } from "react";
import { ICompanyTax } from "../transactions/model/accounting_types";
import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";

const useTaxes = () => {
  const [countryTaxesList, setCountryTaxesList] = useState<ICompanyTax[]>([]);
  const { getCompanyTaxes } = useAccountingDbActions();

  const reload = () => {
    getCompanyTaxes().then((val) => {
      setCountryTaxesList(val);
    });
  };

  return {
    countryTaxesList,
    reload,
  };
};
export default useTaxes;
