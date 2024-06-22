import { useState } from "react";
import { MyButton } from "../../_components/reuse/my-button";
import { ICompanyTax } from "../transactions/model/accounting_types";
import { NumericInput } from "../../_components/reuse/numeric-input";
import DatePickerWrapper from "../../_components/reuse/DatePickerWrapper";

export const AddEditTax = ({
  taxItem,
  onSave,
  onCancel,
}: {
  taxItem: ICompanyTax;
  onSave: (item: ICompanyTax) => Promise<unknown>;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<ICompanyTax>(taxItem);

  const executeSaveCompanyTax = (item: ICompanyTax) => {
    setError("");

    onSave(item);
  };

  return (
    <div className="fcenter hscroll1">
      <div className="flexcolumn">
        <div>
          <div className="fcenter bold">{item.nume}</div>

          <div className="flex mt15">
            <div className="actionname flexcolumn center">
              <span className="bold  " style={{ width: "200px" }}>
                Data de cand se aplica taxa:
              </span>
            </div>
            <div>
              <DatePickerWrapper
                data={item.dataTaxa}
                onChange={(data: number) => {
                  //
                  const newItem: ICompanyTax = {
                    ...item,
                    dataTaxa: data,
                  };
                  setItem(newItem);
                  // item.date = date;
                }}
              />
            </div>
          </div>

          <div className="flex mt10">
            <div className="actionname flexcolumn center">
              <span className="bold " style={{ width: "200px" }}>
                Valoare:
              </span>
            </div>
            <div>
              <NumericInput
                value={item.value}
                onUpdate={(val) => (item.value = val)}
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
    </div>
  );
};
