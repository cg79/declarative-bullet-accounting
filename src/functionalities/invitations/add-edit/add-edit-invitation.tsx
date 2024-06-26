import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { IInvitation } from "../../transactions/model/accounting_types";
import { Tooltip } from "react-tooltip";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { LabelEmail } from "../../../_components/reuse/LabelEmail";
import { helpers } from "../../../_utils/helpers";
import observer from "../../../_store/observer";
import { useBetween } from "use-between";
import useEvents from "../../../_store/useEvents";

export const AddEditInvitation = ({
  invitation,
  onSave,
  onCancel,
}: {
  invitation: IInvitation;
  onSave: (item: IInvitation) => Promise<void> | undefined;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [item, setItem] = useState<IInvitation>(invitation);

  const triggerSaveInvitation = () => {
    setError("");
    debugger;

    if (!item.email) {
      setError("Emailul trebuie sa fie completat");
      return;
    }
    if (!helpers.isValidEmail(item.email)) {
      setError("Emailul nu este valid");
      return;
    }
    onSave(item);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveInvitation();
    clearEnterPressed();
  }, [enterPressed]);
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
          <LabelEmail
            label="Email: "
            lwidth="135px"
            autoFocus
            onChange={(val: string) => {
              setError("");
              const newV: IInvitation = {
                ...item,
                email: val,
              };
              setItem(newV);
            }}
            value={item.email}
          ></LabelEmail>
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

        <div className="error">{error}</div>

        <div className="flex space-between mt10">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => triggerSaveInvitation()}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
