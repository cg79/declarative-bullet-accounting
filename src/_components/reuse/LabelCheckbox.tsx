import { utils } from "../../_utils/utils";

export const LabelCheckbox = ({
  label,
  labelCss = "bold",
  text = "",
  onChange,
  error = "",
  lwidth = "160px",
  value = false,
}) => {
  const id = utils.createUUID();
  return (
    <>
      <div
        className="flex fwrap"
        onClick={() => {
          onChange(!value);
        }}
      >
        <div className="actionname1u">
          <label
            htmlFor={id}
            className={labelCss}
            style={{
              cursor: "pointer",
              width: lwidth,
              display: "inline-block",
            }}
          >
            {label || "asd"}
          </label>
        </div>
        <div className="flex checkbox-wrapper">
          <input
            type="checkbox"
            id="toggle"
            className="checkbox"
            checked={value}
          />
          <label className="switch"></label>
          <div className="ml5">{text}</div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </>
  );
};
