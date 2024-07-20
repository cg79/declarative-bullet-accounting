import { useState } from "react";
import TreeHeaderLabel from "./tree-header-label";
import TreeNodeAmounts from "./tree-node-amounts";
import TreeNodeHeaderActions from "./tree-node-header-actions";
import { useBetween } from "use-between";
import useCategoryState from "../hooks/useCategoryState";

const TreeHeader = ({
  node,
  toggleCollapse,
  isCollapsed,
  onAddNewNode,
  onEditNode,
  setIsModalIconsVisible,
  selectedCategory,
  onStartAddTransaction,
  onStartDeleteNode,
}) => {
  const [isMouseHover, setIsMouseHover] = useState(false);
  const { setSelectedCategory } = useBetween(useCategoryState);

  const handleMouseEnter = () => {
    setIsMouseHover(true);
  };

  const handleMouseLeave = () => {
    setIsMouseHover(false);
  };

  const onNodeClicked = () => {
    // toggleCollapse();
    setSelectedCategory(node);
  };

  const getBackgroundColor = () => {
    if (node === selectedCategory) {
      return "lightgray";
    }
    return isMouseHover ? "lightgray" : "white";
  };

  return (
    <div
      onClick={onNodeClicked}
      style={{
        cursor: "pointer",
        backgroundColor: getBackgroundColor(),
        height: "50px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex space-between center"
    >
      <TreeHeaderLabel
        node={node}
        toggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
        setIsModalIconsVisible={setIsModalIconsVisible}
      ></TreeHeaderLabel>
      {/* {JSON.stringify(node._id)} */}
      {/* {JSON.stringify(node.parentIds)} */}

      <div className="ml10 flex flex-end">
        <TreeNodeHeaderActions
          node={node}
          isMouseHover={isMouseHover}
          onAddNewNode={onAddNewNode}
          onEditNode={onEditNode}
          onStartAddTransaction={onStartAddTransaction}
          onStartDeleteNode={onStartDeleteNode}
        ></TreeNodeHeaderActions>
        <TreeNodeAmounts
          node={node}
          isCollapsed={isCollapsed}
        ></TreeNodeAmounts>
      </div>
    </div>
  );
};

export default TreeHeader;
