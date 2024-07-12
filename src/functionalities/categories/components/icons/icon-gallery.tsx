import { useState } from "react";
import TreeIcon from "./tree-icon";

const IconGallery = ({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const iconStyle = isMouseOver
    ? {
        color: "slateblue",
        cursor: "pointer",
        margin: "5px",
      }
    : {
        color: "gray",
        cursor: "pointer",
        margin: "5px",
      };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={iconStyle}
      onClick={onClick}
    >
      <div className="fcenter">
        <TreeIcon icon={icon} onClick={onClick} />
      </div>

      <div>
        <span style={{ marginLeft: "5px" }}>
          {icon.replaceAll("-", " ").replaceAll("pi", "")}
        </span>
      </div>
    </div>
  );
};

export default IconGallery;
