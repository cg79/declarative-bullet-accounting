import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../../../_components/reuse/my-button";
import { Tooltip } from "react-tooltip";
import { LabelInput } from "../../../../_components/reuse/LabelInput";
import { LabelDate } from "../../../../_components/reuse/LabelDate";
import { LabelEmail } from "../../../../_components/reuse/LabelEmail";
import { helpers } from "../../../../_utils/helpers";
import observer from "../../../../_store/observer";
import { useBetween } from "use-between";
import useEvents from "../../../../_store/useEvents";
import { ICategory } from "../category-type";

export const AddEditCategory = ({
  category,
  onSave,
  onCancel,
}: {
  category: ICategory;
  onSave: (item: ICategory) => void;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState("");
  const [item, setItem] = useState<ICategory>(category);

  const triggerSaveCategory = () => {
    setError("");

    if (!item.label) {
      setError("Nume categorie invalid");
      return;
    }
    onSave(item);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveCategory();
    clearEnterPressed();
  }, [enterPressed]);

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
            autoFocus
            onChange={(val: string) => {
              setError("");
              const newV: ICategory = {
                ...item,
                label: val,
              };
              setItem(newV);
            }}
            value={item.label}
          ></LabelInput>
        </div>
      </div>

      <div className="error">{error}</div>

      <div className="flex space-between mt10">
        <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
        <MyButton
          text="Salveaza"
          onClick={() => triggerSaveCategory()}
        ></MyButton>
      </div>
    </div>
  );
};
