import { useEffect, useRef, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { ITodo } from "../types";

export const AddEditTodo = ({
  entity,
  onSave,
  onCancel,
}: {
  entity: ITodo;
  onSave: (item: ITodo) => Promise<unknown>;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState<ITodo>(entity);

  const executeSave = (item: ITodo) => {
    setError("");
    if (!item.name) {
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
      <div className="">
        {/* <div className="fcenter bold mt15">
          {entity?._id ? "Modificare " : "Adaugare "}
        </div> */}

        <div className="flex mt10 fwrap">
          <LabelInput
            label="Denumire: "
            lwidth="125px"
            onChange={(val: string) => {
              const newV: ITodo = {
                ...item,
                name: val,
              };
              setItem(newV);
            }}
            value={item.name}
          ></LabelInput>
        </div>

        {error && <div className="error">{error}</div>}
        <div className="flex space-between mt10">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => executeSave(item)}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
