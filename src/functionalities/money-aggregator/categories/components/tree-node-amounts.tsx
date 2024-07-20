import { LabelTooltip } from "../../../../_components/reuse/LabelTooltip";
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
      {/* {JSON.stringify(node.props, null, 2)} */}
      <div className="ml10">
        <LabelTooltip
          label={node.props?.available ?? 0}
          tooltip="Available"
        ></LabelTooltip>
      </div>
      <div className="ml10">
        <LabelTooltip
          label={node.props?.expense ?? 0}
          tooltip="Expense"
        ></LabelTooltip>
      </div>
      <div className="ml10">
        <LabelTooltip
          label={node.props?.income ?? 0}
          tooltip="Income"
        ></LabelTooltip>
      </div>
    </div>
  );
};

export default TreeNodeAmounts;
