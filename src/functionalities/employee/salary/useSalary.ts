import { useCallback, useEffect, useState } from "react";
import { ISalarAddEdit } from "../../transactions/model/accounting_types";
import { useBetween } from "use-between";
import useFirme from "../../../_store/useFirme";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";

const useSalary = () => {
  const [salaries, setSalaries] = useState<ISalarAddEdit[]>([]);
  const { selectedAngajat } = useBetween(useFirme);
  const { getAngajatSalaries } = useAccountingDbActions();
  const [areSalariesLoaded, setAreSalariesLoaded] = useState(false);

  const reload = useCallback(() => {
    if (!selectedAngajat) {
      return;
    }
    return getAngajatSalaries(selectedAngajat).then((val) => {
      setSalaries(val);
      setAreSalariesLoaded(true);
    });
  }, [getAngajatSalaries, selectedAngajat]);

  useEffect(() => {
    reload();
  }, [reload, selectedAngajat]);

  return {
    salaries,
    areSalariesLoaded,
    reload,
  };
};

export default useSalary;
