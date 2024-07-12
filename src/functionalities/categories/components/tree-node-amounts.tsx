import { ICategory } from "../category-type";

const TreeNodeAmounts = ({
  node,
  isCollapsed,
}: {
  node: ICategory;
  isCollapsed: boolean;
}) => {
  return (
    <div className="flex" style={{ gap: "10px" }}>
      <div>{node.props?.["available"] ?? 0}</div>
      <div>{node.transactionsAmount || 0}</div>
      <div className="ml10">{node.spent || 0}</div>
    </div>
  );
};

export default TreeNodeAmounts;
