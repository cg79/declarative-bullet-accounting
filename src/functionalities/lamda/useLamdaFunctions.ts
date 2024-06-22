import { useCallback, useState } from "react";
import useAccountingDbActions, {
  DeltaFunction,
} from "../transactions/hook/useAccountingDbActions";
import { DELTA_FUNCTION } from "../transactions/constants/accounting_constants";

const useLamdaFunctions = () => {
  const { getDeltaFunctions } = useAccountingDbActions();

  const [deltaFunctions, setDeltaFunctions] = useState<DeltaFunction[]>([]);
  const reload = useCallback(async () => {
    return getDeltaFunctions().then((val) => {
      console.log(val);
      setDeltaFunctions(val.data);
      return val;
    });
  }, [getDeltaFunctions]);

  const getAccountingLamda = useCallback(async () => {
    let deltas = deltaFunctions;
    if (!deltas.length) {
      deltas = (await reload()).data;
    }
    const accounting_lamda: any = deltas.find(
      (val: any) => val.method === DELTA_FUNCTION
    );
    return accounting_lamda;
  }, [deltaFunctions, reload]);

  return { getAccountingLamda, deltaFunctions, reload };
};

export default useLamdaFunctions;
