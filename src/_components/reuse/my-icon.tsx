import { InputHTMLAttributes, PropsWithChildren, useState } from "react";
import { Tooltip } from "react-tooltip";
import { utils } from "../../_utils/utils";

interface CustomProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  onClick?: () => void;
  icon: string;
  tooltip?: string;
}
const MyIcon = ({ icon, onClick, tooltip, ...rest }: CustomProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };
  const myClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };

  const id = "t" + utils.createUUID().substring(0, 8);
  const css = isMouseOver ? "color: #ebef0b" : "hover:text-color-primary";
  return (
    <>
      <i
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => myClick(e)}
        style={isMouseOver ? { color: "slateblue" } : {}}
        className={`text-2xl mb-3 text-color-secondary ml5 mr5 ${icon} ${css}`}
      ></i>
      {tooltip && (
        <>
          <Tooltip
            anchorSelect={`#${id}`}
            place="top"
            style={{ zIndex: 9999, position: "absolute" }}
          >
            {tooltip}
          </Tooltip>
        </>
      )}
    </>
  );
};

export default MyIcon;
