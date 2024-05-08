import { useState } from "react";
import { MyButton } from "../../../../_components/reuse/my-button";
import { ITaxeSalar } from "../../../transactions/model/accounting_types";
import { NumericInput } from "../../../../_components/reuse/numeric-input";

export const AddEditTaxeSalar = ({
  taxaSalar,
  onSave,
  onCancel,
}: {
  taxaSalar: ITaxeSalar;
  onSave: (item: ITaxeSalar) => Promise<unknown>;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<ITaxeSalar>(taxaSalar);

  const executeSave = (item: ITaxeSalar) => {
    setError("");

    onSave(item);
  };

  const setTaxaValue = (val: number, prop: string) => {
    const newItem = {
      ...item,
      [prop]: val,
    };
    setItem(newItem);
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div>
        <div className="flex mt10">
          <div className="actionname flexcolumn">
            <span className="bold">Pensie:</span>
          </div>
          <div>
            <NumericInput
              value={item.munca}
              onUpdate={(v) => setTaxaValue(v, "pensie")}
            ></NumericInput>
          </div>
        </div>
        <div className="flex mt10">
          <div className="actionname flexcolumn">
            <span className="bold">Sanatate:</span>
          </div>
          <div>
            <NumericInput
              value={item.sanatate}
              onUpdate={(v) => setTaxaValue(v, "sanatate")}
            ></NumericInput>
          </div>
        </div>
        <div className="flex mt10">
          <div className="actionname flexcolumn">
            <span className="bold">Munca:</span>
          </div>
          <div>
            <NumericInput
              value={item.sanatate}
              onUpdate={(v) => setTaxaValue(v, "sanatate")}
            ></NumericInput>
          </div>
        </div>
      </div>
      <div className="flex space-between mt10">
        <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
        <MyButton text="Salveaza" onClick={() => executeSave(item)}></MyButton>
      </div>
    </div>
  );
};
