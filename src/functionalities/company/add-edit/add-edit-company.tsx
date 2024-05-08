import { useEffect, useRef, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { MyCheckbox } from "../../../_components/reuse/my-checkbox";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { ICompany } from "../types";

export const AddEditCompany = ({
  company,
  onSave,
  onCancel,
}: {
  company: ICompany;
  onSave: (item: ICompany) => Promise<unknown>;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<ICompany>(company);

  const executeSaveAngajat = (item: ICompany) => {
    setError("");
    if (!item.nume) {
      setError("Numele trebuie sa fie completat");
      return;
    }
    onSave(item);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fcenter">
      {/* {JSON.stringify(company)} */}
      <div className="">
        <div className="fcenter bold mt15">
          {company?.nume ? "Modificare Firma" : "Adaugare Firma"}
        </div>

        <div className="flex mt10 fwrap">
          <LabelInput
            label="Denumire: "
            lwidth="125px"
            onChange={(val: string) => {
              const newV: ICompany = {
                ...item,
                nume: val,
              };
              setItem(newV);
            }}
            value={item.nume}
          ></LabelInput>
        </div>

        <div className="flex mt10">
          <LabelInput
            label="Cod Fiscal: "
            lwidth="125px"
            onChange={(val: string) => {
              const newV: ICompany = {
                ...item,
                codFiscal: val,
              };
              setItem(newV);
            }}
            value={item.codFiscal}
          ></LabelInput>
        </div>

        <div className="flex mt10">
          <LabelDate
            label={"Data infiintare: "}
            lwidth="125px"
            onChange={(date: number) => {
              const newItem: ICompany = {
                ...item,
                dataInfiintare: date,
              };
              setItem(newItem);
            }}
            data={item.dataInfiintare}
          ></LabelDate>
        </div>

        <div className="flex mt10">
          <div className="actionname">
            <label
              htmlFor="chkDemisie"
              className="fixw"
              style={{ width: "125px" }}
            >
              Activa?:
            </label>
          </div>
          <div>
            <MyCheckbox
              name={"chkDemisie"}
              id={"chkDemisie"}
              onChange={() => {
                const newitem: ICompany = {
                  ...item,
                  isActive: !item.isActive,
                };
                setItem(newitem);
              }}
              value={item.isActive}
              label="Activa?"
            ></MyCheckbox>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        <div className="flex space-between mt10">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => executeSaveAngajat(item)}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
