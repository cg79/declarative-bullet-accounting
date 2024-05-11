import { utils } from "../../_utils/utils";
import { NumericInput } from "./numeric-input";

export const LabelNumericInput = ({
  label,
  labelCss = "bold",
  onChange,
  error = "",
  value = 0,
  lwidth = "160px",
}) => {
  const id = utils.createUUID();
  return (
    <>
      <div className="flex fwrap">
        <div className="actionname1u ">
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
        </div>
        <div>
          <NumericInput
            id={id}
            value={value}
            // onChange={(e) => onChange(e.target.value)}
            onUpdate={(v) => onChange(v)}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
