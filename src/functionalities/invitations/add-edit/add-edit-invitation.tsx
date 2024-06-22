import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { IInvitation } from "../../transactions/model/accounting_types";
import { Tooltip } from "react-tooltip";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";

export const AddEditInvitation = ({
  invitation,
  onSave,
  onCancel,
}: {
  invitation: IInvitation;
  onSave: (item: IInvitation) => Promise<void> | undefined;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<IInvitation>(invitation);

  const executeSaveAngajat = (item: IInvitation) => {
    setError("");

    if (!item.email) {
      setError("Emailul trebuie sa fie completat");
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
            label="Email: "
            lwidth="135px"
            onChange={(val: string) => {
              const newV: IInvitation = {
                ...item,
                email: val,
              };
              setItem(newV);
            }}
            value={item.email}
          ></LabelInput>
        </div>

        {/* <div className="flex mt10">
          <LabelDate
            label={"Data angajare: "}
            lwidth="135px"
            onChange={(date: number) => {
              const newItem: IInvitation = {
                ...item,
                dataInvitatie: date,
              };
              setItem(newItem);
            }}
            data={item.dataInvitatie}
          ></LabelDate>
        </div> */}

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
