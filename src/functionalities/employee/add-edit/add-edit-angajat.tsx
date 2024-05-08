import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { IAngajat } from "../../transactions/model/accounting_types";
import { Tooltip } from "react-tooltip";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { LabelCheckbox } from "../../../_components/reuse/LabelCheckbox";

export const AddEditAngajat = ({
  angajat,
  onSave,
  onCancel,
}: {
  angajat: IAngajat;
  onSave: (item: IAngajat) => Promise<void> | undefined;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<IAngajat>(angajat);

  const executeSaveAngajat = (item: IAngajat) => {
    setError("");

    if (!item.nume) {
      setError("Numele trebuie sa fie completat");
      return;
    }
    onSave(item);
  };

  // const dataForDemisie = useCallback(() => {
  //   return item.dataDemisie ? new Date(item.dataDemisie) : new Date();
  // }, [item.dataDemisie]);

  return (
    <div className="fcenter">
      <Tooltip anchorSelect=".contpersonal" place="top">
        este folosit la import tranzactii din pdf
      </Tooltip>
      <div className="">
        <div className="flex mt10">
          <LabelInput
            label="Nume: "
            lwidth="135px"
            onChange={(val: string) => {
              const newV: IAngajat = {
                ...item,
                nume: val,
              };
              setItem(newV);
            }}
            value={item.nume}
          ></LabelInput>
        </div>

        <div className="flex mt10">
          <LabelDate
            label={"Data angajare: "}
            lwidth="135px"
            onChange={(date: number) => {
              const newItem: IAngajat = {
                ...item,
                dataAngajare: date,
              };
              setItem(newItem);
            }}
            data={item.dataAngajare}
          ></LabelDate>
        </div>

        <div className="flex mt10">
          <LabelCheckbox
            value={item.showDemisie}
            lwidth="135px"
            onChange={() => {
              const newitem: IAngajat = {
                ...item,
                showDemisie: !item.showDemisie,
              };
              setItem(newitem);
            }}
            label={"Contract incetat? "}
          ></LabelCheckbox>
        </div>

        {item.showDemisie && (
          <div className="flex mt10">
            <LabelDate
              label={"Data demisie: "}
              lwidth="135px"
              onChange={(date: number) => {
                // const newItem: IAngajat = {
                //   ...item,
                //   dataDemisie: date,
                // };
                // setItem(newItem);
                item.dataDemisie = date;
              }}
              data={item.dataDemisie}
            ></LabelDate>
          </div>
        )}

        <div className="flex mt10">
          <LabelInput
            label="Cont Personal: "
            labelCss="contpersonal bold"
            lwidth="135px"
            onChange={(val: string) => {
              const newV: IAngajat = {
                ...item,
                contPersonal: val,
              };
              setItem(newV);
            }}
            value={item.contPersonal}
          ></LabelInput>
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

      {/* <SalariiIngajat
        salarii={item.salarii}
        onNew={() => {
          
          const newArr: ISalarAngajat[] = [
            ...item.salarii || [],
            {
              date: new Date(),
              guid: utils.createUUID(),
              value: 0,
              taxe: {
                guid: utils.createUUID(),
                sanatate: 0,
                munca: 0,
                pensie: 0,
              },
            },
          ];
          item.salarii = newArr;
          setItem({...item});
        }}
        onDelete={(salar: ISalarAngajat)=>{
          
          const newSalarii = item.salarii.filter(el=>el.guid !== salar.guid);
          setItem({
            ...item,
            salarii: [...newSalarii]
          })
        }}
      ></SalariiIngajat> */}
      {/* {
        item.salar.map((el: ISalarAngajat) => {
          return (
            <div className="flex mt10">
              <div className=" flex">
                <div className="ml5 cell-v-align fixw">{el.value}</div>
              </div>
              <div>
          </div>
              <div className="ml10">
                <MyButton text="Editare" onClick={() => setItem(el)}></MyButton>
              </div>
            </div>
          );
        })} */}
    </div>
  );
};
