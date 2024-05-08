import { utils } from "../../_utils/utils";
import { Tooltip } from "react-tooltip";

export const LabelTooltip = ({
  label,
  tooltip = "",
  labelCss = "",
  lwidth = "80px",
  content = <></>,
}) => {
  const id = "a" + utils.createUUID().substring(0, 8);
  return (
    <>
      <label
        className={tooltip ? `${labelCss} ${id}` : labelCss}
        style={{
          cursor: "pointer",
          width: lwidth,
          display: "inline-block",
          fontSize: "0.7em",
        }}
      >
        {label}
        {content}
      </label>
      {tooltip && (
        <Tooltip anchorSelect={`.${id}`} place="top">
          {tooltip}
        </Tooltip>
      )}
    </>
  );
};
