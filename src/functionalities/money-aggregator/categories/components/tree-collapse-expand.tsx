import MyIcon from 'src/_components/reuse/my-icon';
import { ICategory } from '../category-type';

const TreeCollapseExpand = ({
  node,
  isCollapsed,
}: {
  node: ICategory;
  isCollapsed: boolean;
}) => {
  if (node.children && node.children.length === 0) {
    return <span className="hidden">no.</span>;
  }
  if (isCollapsed) {
    // return (
    //   <MyIcon icon="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-right"></MyIcon>
    // );
    return (
      <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-right"></i>
    );
  }
  return (
    <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-down"></i>
  );
};

export default TreeCollapseExpand;
