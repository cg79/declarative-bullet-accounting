import { InputText } from "primereact/inputtext";
import { utils } from "../../_utils/utils";
import { useEffect, useRef } from "react";
import observer from "../../_store/observer";
import { useBetween } from "use-between";
import useEvents from "../../_store/useEvents";

export const LabelInput = ({
  label,
  labelCss = "bold",
  onChange,
  error = "",
  value = "",
  lwidth = "80px",
  type = "text",
  disabled = false,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = utils.createUUID();
  const { triggerEnterPressed } = useBetween(useEvents);

  useEffect(() => {
    // Focus the input when the component mounts
    const input = inputRef?.current;
    if (input && autoFocus) {
      input.focus();
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Your code here, e.g., submit the form, call an API, etc.
      // observer.publish("ENTER_PRESSED");
      triggerEnterPressed();
    }
  };
  return (
    <>
      <div className="flex fwrap fcenter">
        <label
          htmlFor={id}
          className={labelCss} // ${labelCss}
          style={{
            cursor: "pointer",
            width: lwidth,
            display: "inline-block",
            marginTop: "15px",
          }}
        >
          {label}
        </label>
        <div>
          <InputText
            ref={inputRef}
            id={id}
            value={value}
            className="myInput"
            type={type}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
