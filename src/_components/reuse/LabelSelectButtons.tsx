import { SelectItemOptionsType } from "primereact/selectitem";
import { utils } from "../../_utils/utils";
import { Dropdown } from "primereact/dropdown";
import { LabelProps } from "./LabelEmail";
import { SelectButtons, SelectButtonsProps } from "./SelectButtons";
import { LabelComponentProps } from "./facade";
import useScreenSize from "../../hooks/useScreenSize";

//https://primereact.org/selectbutton/
type LabelSelectButtonsProps = LabelComponentProps &
  LabelProps &
  SelectButtonsProps;

export const LabelSelectButtons = ({
  options,
  itemTemplate,
  label,
  labelCss = "bold",
  onChange,
  lwidth = "160px",
  value,
}: LabelSelectButtonsProps) => {
  const { popupCss } = useScreenSize();
  const id = utils.createUUID();
  return (
    <>
      {/* {JSON.stringify(value, null, 2)} */}
      <div className={popupCss.css}>
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
          <SelectButtons
            value={value}
            onChange={onChange}
            options={options}
            itemTemplate={itemTemplate}
          ></SelectButtons>
        </div>
      </div>
    </>
  );
};
