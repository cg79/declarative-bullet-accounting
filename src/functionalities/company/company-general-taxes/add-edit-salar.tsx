import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { ISalarAddEdit } from "../../transactions/model/accounting_types";
import { NumericInput } from "../../../_components/reuse/numeric-input";
import DatePickerWrapper from "../../../_components/reuse/DatePickerWrapper";

export const AddEditSalar = ({
  taxItem,
  onSave,
  onCancel,
}: {
  taxItem: ISalarAddEdit;
  onSave: (item: ISalarAddEdit) => Promise<void> | undefined;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<ISalarAddEdit>(taxItem);

  const executeSaveCompanyTax = (item: ISalarAddEdit) => {
    setError("");

    onSave(item);
  };

  return (
    <div>
      <div>
        {item.nume}
        <div className="flex mt10">
          <div className="actionname tlabel">
            <span className="bold">Data:</span>
          </div>
          <div>
            <DatePickerWrapper
              data={item.dataSalar}
              onChange={(data: number) => {
                //
                const newItem: ISalarAddEdit = {
                  ...item,
                  dataSalar: data,
                };
                setItem(newItem);
                // item.date = date;
              }}
            />
          </div>
        </div>

        <div className="flex mt10">
          <div className="actionname flexcolumn tlabel">
            <span className="bold">Valoare:</span>
          </div>
          <div>
            <NumericInput
              value={item.value}
              onUpdate={(val) => (item.value = val)}
            ></NumericInput>
          </div>
        </div>

        <div className="flex mt10">
          <div className="actionname flexcolumn tlabel">
            <span className="bold">Scutire impozit:</span>
          </div>
          <div>
            <NumericInput
              value={item.scutire_impozit || 0}
              onUpdate={(val) => (item.scutire_impozit = val)}
            ></NumericInput>
          </div>
        </div>
        <div className="flex mt10">
          <div className="actionname flexcolumn tlabel">
            <span className="bold">Impozit pe venit%:</span>
          </div>
          <div>
            <NumericInput
              value={item.impozit_venit || 0}
              onUpdate={(val) => (item.impozit_venit = val)}
            ></NumericInput>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="flex space-between mt10">
        <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
        <MyButton
          text="Salveaza"
          onClick={() => executeSaveCompanyTax(item)}
        ></MyButton>
      </div>
    </div>
  );
};
