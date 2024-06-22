import { InputText } from "primereact/inputtext";
import { utils } from "../../_utils/utils";

export const LabelInput = ({
  label,
  labelCss = "bold",
  onChange,
  error = "",
  value = "",
  lwidth = "80px",
  type = "text",
  disabled = false,
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
          <InputText
            id={id}
            value={value}
            className="myInput"
            type={type}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
