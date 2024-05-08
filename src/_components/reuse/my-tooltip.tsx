import { utils } from "../../_utils/utils";
import { Tooltip } from "react-tooltip";

export const MyTooltip = ({ tooltip = "", content = <></> }) => {
  const id = "a" + utils.createUUID().substring(0, 8);
  return (
    <div className={id}>
      {content}
      {tooltip && (
        <Tooltip anchorSelect={`.${id}`} place="top">
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
};
