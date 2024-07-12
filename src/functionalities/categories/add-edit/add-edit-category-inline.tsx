import { useCallback, useEffect, useRef, useState } from "react";
import { useBetween } from "use-between";
import useEvents from "../../../_store/useEvents";
import { ICategory } from "../category-type";
import { InputText } from "primereact/inputtext";
import { LabelInput } from "../../../_components/reuse/LabelInput";

export const AddEditCategoryInline = ({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerEnterPressed } = useBetween(useEvents);

  const onChange = (val: string) => {
    setItem({ ...item, label: val });
  };

  useEffect(() => {
    // Focus the input when the component mounts
    const input = inputRef?.current;
    if (input) {
      input.focus();
    } else {
      console.log("input is null");
    }
  }, []);

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

  const handleKeyPress = (e: any) => {
    console.log(e.key);
    if (e.key === "Enter") {
      // Your code here, e.g., submit the form, call an API, etc.
      // observer.publish("ENTER_PRESSED");
      return triggerEnterPressed();
    }

    if (e.key === "Escape") {
      return onCancel();
    }
    e.stopPropagation();
  };

  return (
    <div className="xxx">
      {/* <InputText
        ref={inputRef}
        value={item.label}
        className="myInput1"
        type="text"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
      /> */}
      <LabelInput
        autoFocus
        value={item.label}
        error={error}
        labelCss="bold"
        lwidth="auto"
        label="Nume categorie:"
        labelStyles={{ marginRight: "5px" }}
        inputStyles={{ width: "130px" }}
        // type="text"
        onChange={(e) => {
          onChange(e);
        }}
        className="flex"
        onCancel={onCancel}
      ></LabelInput>
    </div>
  );
};
