import MyIcon from '../../../../_components/reuse/my-icon';
import { ICategory } from '../category-type';

const TreeCollapseExpand = ({
  node,
  isCollapsed,
  onClick,
}: {
  node: ICategory;
  isCollapsed: boolean;
  onClick: () => void;
}) => {
  if (node.children && node.children.length === 0) {
    return <span className="hidden">no.</span>;
  }
  if (isCollapsed) {
    return (
      <MyIcon
        icon="mycardFilter text-2xl mb-3 text-color-secondary pi pi-arrow-circle-right"
        onClick={onClick}
      ></MyIcon>
    );
    // return (
    //   <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-right"></i>
    // );
  }
  return (
    <MyIcon
      icon="mycardFilter text-2xl mb-3 text-color-secondary pi pi-arrow-circle-down"
      onClick={onClick}
    ></MyIcon>
  );
  // return (
  //   <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-down"></i>
  // );
};

export default TreeCollapseExpand;
