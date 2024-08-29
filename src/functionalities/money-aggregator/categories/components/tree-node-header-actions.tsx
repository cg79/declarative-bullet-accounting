import { ICategory } from '../category-type';
import TreeIcon from './icons/tree-icon';

const TreeNodeHeaderActions = ({
  node,
  isMouseHover,
  onAddNewNode,
  onEditNode,
  onStartAddTransaction,
  onStartDeleteNode,
}: {
  node: ICategory;
  isMouseHover: boolean;
  onAddNewNode: () => void;
  onEditNode: () => void;
  onStartAddTransaction: () => void;
  onStartDeleteNode: () => void;
}) => {
  return (
    <div className="fcenter" style={{ marginBottom: '5px' }}>
      {isMouseHover ? (
        <>
          <TreeIcon
            icon="pi pi-plus"
            onClick={onStartAddTransaction}
            tooltip="Add Transaction (a)"
          ></TreeIcon>
          {node.parentId && (
            <TreeIcon
              icon="pi pi-trash"
              onClick={onStartDeleteNode}
              tooltip="Delete (d)"
              disabled={node.parentId ? true : false}
            ></TreeIcon>
          )}
          <TreeIcon
            icon="pi pi-file-edit"
            onClick={onEditNode}
            tooltip="Edit (e)"
          ></TreeIcon>
          <TreeIcon
            icon="pi pi-folder-plus"
            onClick={onAddNewNode}
            tooltip="Add Node (n)"
          ></TreeIcon>
        </>
      ) : null}
    </div>
  );
};

export default TreeNodeHeaderActions;
