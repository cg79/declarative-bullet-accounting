import { useBetween } from "use-between";
import { ICategory } from "../category-type";
import TreeNode from "./tree-node";
import useCategoryState from "../hooks/useCategoryState";

const Tree = ({
  nodes,
  shortCutAction,
  setShortCutAction,
}: {
  nodes: ICategory[];
  shortCutAction: any;
  setShortCutAction: any;
}) => {
  const { selectedCategory } = useBetween(useCategoryState);

  return (
    <div>
      {nodes.map((node) => {
        node.level = 0;
        return (
          <TreeNode
            key={node._id}
            node={node}
            parent={null}
            selectedCategory={selectedCategory}
            shortCutAction={shortCutAction}
            setShortCutAction={setShortCutAction}
          />
        );
      })}
    </div>
  );
};

export default Tree;
