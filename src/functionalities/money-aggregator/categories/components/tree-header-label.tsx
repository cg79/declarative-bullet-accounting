import { ICategory } from '../category-type';
import TreeCollapseExpand from './tree-collapse-expand';
import TreeIcon from './icons/tree-icon';
import DelayClick from './delay-click/delay-click';

const renderNodeIcon = (node: ICategory, onClick: () => void) => {
  if (node.icon) {
    return (
      <DelayClick handleClick={onClick} delay={500}>
        <TreeIcon icon={node.icon} onClick={() => void 0} />
      </DelayClick>
    );
  }
  return (
    <DelayClick handleClick={onClick} delay={500}>
      <TreeIcon icon="pi pi-folder" onClick={() => void 0} />
    </DelayClick>
  );
};
const TreeHeaderLabel = ({
  node,
  toggleCollapse,
  isCollapsed,
  setIsModalIconsVisible,
}: {
  node: ICategory;
  toggleCollapse: () => void;
  isCollapsed: boolean;
  setIsModalIconsVisible: (value: number) => void;
}) => {
  return (
    <div style={{ cursor: 'pointer' }}>
      <TreeCollapseExpand
        node={node}
        isCollapsed={isCollapsed}
        onClick={toggleCollapse}
      />
      {renderNodeIcon(node, () => setIsModalIconsVisible(1))}
      <DelayClick handleClick={() => setIsModalIconsVisible(2)} delay={500}>
        <span
          className="bold mycardFilter"
          style={{ marginLeft: '5px', color: node.color || 'black' }}
          onClick={toggleCollapse}
        >
          {node.label}
        </span>
      </DelayClick>
    </div>
  );
};

export default TreeHeaderLabel;
