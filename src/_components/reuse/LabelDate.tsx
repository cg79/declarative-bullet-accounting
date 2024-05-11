import { useRef } from "react";
import { utils } from "../../_utils/utils";
import { ReactDatePicker } from "react-datepicker";
import DatePickerWrapper from "./DatePickerWrapper";
export const LabelDate = ({
  label,
  onChange,
  data,
  error = "",
  lwidth = "160px",
}) => {
  const inputRef = useRef<ReactDatePicker>(null);
  const id = utils.createUUID();
  return (
    <>
      <div className="flex fwrap">
        <div className="actionname1">
          <label
            htmlFor={id}
            className="bold"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.setFocus();
              }
              onChange(null);
            }}
            style={{
              cursor: "pointer",
              width: lwidth,
              display: "inline-block",
              marginTop: "8px",
            }}
          >
            {label}
          </label>
        </div>
        <div>
          <DatePickerWrapper
            inputRef={inputRef}
            data={data}
            onChange={onChange}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
