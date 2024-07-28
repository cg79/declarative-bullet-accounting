import { ICategory } from '../category-type';
import TreeNode from './tree-node';
import useCategoryState, { TREE_ACTION } from '../hooks/useCategoryState';
import { useBetween } from '../../../../hooks/useBetween';
import useScreenSize from '../../../../hooks/useScreenSize';
import TreeNodeHeaderActions from './tree-node-header-actions';

const Tree = ({
  nodes,
  shortCutAction,
  setShortCutAction,
}: {
  nodes: ICategory[];
  shortCutAction: any;
  setShortCutAction: any;
}) => {
  const { selectedCategory, setTreeAction } = useBetween(useCategoryState);
  const { width } = useBetween(useScreenSize);

  return (
    <div>
      {width < 500 && selectedCategory && (
        <TreeNodeHeaderActions
          node={selectedCategory}
          isMouseHover={true}
          onAddNewNode={() => setTreeAction(TREE_ACTION.ADD_NEW_CATEGORY)}
          onEditNode={() => setTreeAction(TREE_ACTION.EDIT_CATEGORY)}
          onStartAddTransaction={() =>
            setTreeAction(TREE_ACTION.ADD_NEW_TRANSACTION)
          }
          onStartDeleteNode={() => setTreeAction(TREE_ACTION.DELETE_CATEGORY)}
        ></TreeNodeHeaderActions>
      )}
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
