import { useState } from 'react';
import TreeHeaderLabel from './tree-header-label';
import TreeNodeAmounts from './tree-node-amounts';
import TreeNodeHeaderActions from './tree-node-header-actions';
import { useBetween } from 'use-between';
import useCategoryState from '../hooks/useCategoryState';
import { ICategory } from '../category-type';
import APP_CONSTANTS from '../../money-constants';

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
}: {
  node: ICategory;
  toggleCollapse: () => void;
  isCollapsed: boolean;
  onAddNewNode: () => void;
  onEditNode: () => void;
  setIsModalIconsVisible: () => void;
  selectedCategory: any;
  onStartAddTransaction: () => void;
  onStartDeleteNode: () => void;
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
    // return 'transparent';
    if (node === selectedCategory) {
      return APP_CONSTANTS.HOVER_COLOR;
    }
    return isMouseHover ? APP_CONSTANTS.HOVER_COLOR : 'transparent';
  };

  return (
    <div
      onClick={onNodeClicked}
      style={{
        cursor: 'pointer',
        backgroundColor: getBackgroundColor(),
        height: '50px',
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
