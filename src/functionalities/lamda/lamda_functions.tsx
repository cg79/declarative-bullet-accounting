import { useEffect, useState } from "react";
import { MonacoEditor } from "../../_components/editor/editor";
import { MyButton } from "../../_components/reuse/my-button";

import { useBetween } from "use-between";
import useAccountingDbActions, {
  DeltaFunction,
} from "../transactions/hook/useAccountingDbActions";
import { utils } from "../../_utils/utils";
import useLamdaFunctions from "./useLamdaFunctions";

export const LamdaFunctions = () => {
  const [selectedLamda, setSelectedLamda] = useState<DeltaFunction | null>(
    null
  );
  const { registerupdatedeltafunction } = useAccountingDbActions();

  const { deltaFunctions, reload } = useBetween(useLamdaFunctions);

  const onValChanged = (val: string) => {
    if (!selectedLamda) {
      return;
    }
    selectedLamda.functiontext = val;
    setSelectedLamda({ ...selectedLamda });
  };

  useEffect(() => {
    reload();
  }, [reload]);

  const salveaza = async () => {
    if (!selectedLamda) {
      return;
    }
    registerupdatedeltafunction(selectedLamda).then(() => {
      reload();
    });
  };
  return (
    <div className="">
      <div className="fcenter">
        <div>
          <h1>Lamda Functions 1</h1>
          {/* {JSON.stringify(selectedLamda || {}, null, 2)} */}
          {selectedLamda?.guid}
          <div>
            <input
              type="text"
              onChange={(e) => {
                if (!selectedLamda) {
                  return;
                }
                selectedLamda.module = e.target.value;
                setSelectedLamda({ ...selectedLamda });
              }}
              value={selectedLamda?.module}
            ></input>
          </div>

          <div>
            <input
              className=""
              type="text"
              onChange={(e) => {
                if (!selectedLamda) {
                  return;
                }
                selectedLamda.method = e.target.value;
                setSelectedLamda({ ...selectedLamda });
              }}
              value={selectedLamda?.method}
            ></input>
          </div>

          <MyButton
            onClick={salveaza}
            text="Salveaza"
            className="mt10"
          ></MyButton>
          <MyButton
            onClick={() =>
              setSelectedLamda({
                guid: utils.createUUID(),
                functiontext: "",
                module: "",
                method: "",
              })
            }
            text="New Function"
            className="mt10"
          ></MyButton>
          {deltaFunctions.map((val: any) => (
            <div key={utils.createUUID()} onClick={() => setSelectedLamda(val)}>
              {val.method}
            </div>
          ))}
        </div>
      </div>
      {/* {JSON.stringify(selectedLamda ? selectedLamda : {})} */}
      <MonacoEditor
        value={selectedLamda?.functiontext}
        language="javascript"
        onChange={onValChanged}
      ></MonacoEditor>
    </div>
  );
};
