import { utils } from "../../_utils/utils";
import { Dropdown } from "primereact/dropdown";

type LabelDropDownProps = {
  label?: string;
  labelCss?: string;
  value: number;
  onChange: (e: any) => void;
  error?: string;
  lwidth?: string;
  defaultOption?: any;
  options?: { value: any; label: string }[];
  placeholder?: string;
};
export const LabelDropDown = ({
  label,
  labelCss = "bold",
  onChange,
  error = "",
  lwidth = "160px",
  defaultOption,
  value,
  options = [],
  placeholder = "Selectati o optiune",
}: LabelDropDownProps) => {
  const id = utils.createUUID();
  return (
    <>
      <div className="flex fwrap">
        <div className="actionname1u">
          <label
            htmlFor={id}
            className={labelCss}
            style={{
              cursor: "pointer",
              width: lwidth,
              display: "inline-block",
              marginTop: "15px",
            }}
          >
            {label || "asd"}
          </label>
        </div>
        <div className="flex checkbox-wrapper">
          <Dropdown
            options={options}
            onChange={onChange}
            value={value || defaultOption}
            placeholder={placeholder}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </>
  );
};
