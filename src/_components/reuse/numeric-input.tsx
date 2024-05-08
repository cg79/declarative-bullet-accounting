import { useRef, useState } from "react";
import { isNumeric } from "../../functionalities/transactions/helpers/accounting_helpers";
import { InputText } from "primereact/inputtext";

export const NumericInput = ({
  value,
  onUpdate,
  id,
}: {
  value: number;
  onUpdate: (n: number) => void;
  id?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value.toString());
  const lastKeyRef = useRef("");

  return (
    <InputText
      ref={inputRef}
      id={id}
      name="message"
      autoComplete="off"
      // className="myInput"
      onChange={(e) => {
        if (!lastKeyRef.current) {
          return;
        }
        if (lastKeyRef.current === "Backspace" || lastKeyRef.current === ".") {
          setInputValue(e.target.value);
          onUpdate(Number(e.target.value));
          return;
        }
        const isLatNumeric = isNumeric(lastKeyRef.current);
        if (!isLatNumeric) {
          return;
        }
        const x = e.target.value;
        setInputValue(x);
        onUpdate(Number(e.target.value));
      }}
      onKeyDown={(k) => {
        console.log(k);
        //
        // k.stopPropagation();
        lastKeyRef.current = k.key;
      }}
      value={inputValue.toString()}
    />
  );
};
