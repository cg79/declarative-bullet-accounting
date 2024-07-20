import { useRef } from "react";
import { utils } from "../../_utils/utils";
import { ReactDatePicker } from "react-datepicker";
import DatePickerWrapper from "./DatePickerWrapper";
import useScreenSize from "../../hooks/useScreenSize";
export const LabelDate = ({
  label,
  onChange,
  data,
  error = "",
  lwidth = "160px",
}) => {
  const { popupCss } = useScreenSize();
  const inputRef = useRef<ReactDatePicker>(null);
  const id = utils.createUUID();
  return (
    <>
      <div className={popupCss.css}>
        <div className="actionname1">
          <label
            htmlFor={id}
            className="bold"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current["focus"]();
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
        <div style={popupCss.style}>
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
