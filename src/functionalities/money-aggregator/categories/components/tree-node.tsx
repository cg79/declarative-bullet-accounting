import { useEffect, useState } from 'react';
import TreeHeader from './tree-header';
import { ICategory } from '../category-type';
import TreeNodeAddEdit from './tree-node-add-edit';
import IconGallery from './icons/icons-gallery';
import { SHORTCUT_ACTIONS } from '../constants';
import useCategoryState, { TREE_ACTION } from '../hooks/useCategoryState';
import AddEditMoneyTransaction from '../../money-transactions/add-edit/add-edit-money-transaction';
import useMoneyTransactions from '../../money-transactions/hooks/useMoneyTransactions';
import { IMoneyTransaction } from '../../money-transactions/money-transaction-type';
import { ConfirmDialogWrapper } from '../../../../_components/reuse/ConfirmDialogWrapper';
import { getDefaultMoneyTransaction } from '../../money-transactions/money-helpers';
import useMoneyEntities from '../../money-entity/hooks/useMoneyEntities';
import useMoneyAccounts from '../../money-account/hooks/useMoneyAccounts';
import useIdentity from '../../../../_store/useIdentity';
import { DialogWrapper } from '../../../../_components/reuse/DialogWrapper';
import { defaultCategory } from '../category-helpers';
import { useBetween } from '../../../../hooks/useBetween';
import { ColorPicker } from 'primereact/colorpicker';
// import { faL } from "@fortawesome/free-solid-svg-icons";

const TreeNode = ({
  node,
  parent,
  selectedCategory,
  shortCutAction,
  setShortCutAction,
}: {
  node: ICategory;
  parent: ICategory | null;
  selectedCategory: ICategory | null;
  shortCutAction: any;
  setShortCutAction: any;
}) => {
  const { loggedUser } = useBetween(useIdentity);
  const { accounts } = useBetween(useMoneyAccounts);
  const { selectedMoneyEntity } = useBetween(useMoneyEntities);
  const [opacity, setOpacity] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(node.isCollapsed || false);
  const [newNode, setNewNode] = useState<ICategory | null>(null);
  const [editNode, setEditNode] = useState<ICategory | null>(null);
  const [showTransactionScreen, setShowTransactionScreen] = useState(false);
  const [modalIconOrColors, setModalIconOrColors] = useState<number>(0);
  const [
    isModalDeletionConfirmationVisible,
    setIsModalDeletionConfirmationVisible,
  ] = useState(false);
  const {
    setSelectedCategory,
    setDraggedCategory,
    setDroppedCategory,
    setDeletedCategory,
    deleteCategory,
    saveCategory,
    updateCategory,
    treeAction,
    setTreeAction,
  } = useBetween(useCategoryState);
  const { saveMoneyTransaction } = useMoneyTransactions();

  const onStartDeleteNode = () => {
    setIsModalDeletionConfirmationVisible(true);
  };
  const executeDeleteNode = () => {
    deleteCategory(node).then((response: any) => {
      setIsModalDeletionConfirmationVisible(false);
      if (!response.success) {
        return;
      }
      executeArrowUP();
      setDeletedCategory(node);
      //
    });
  };

  const updateCollapseState = (value: boolean) => {
    node.isCollapsed = value;
    setIsCollapsed(value);
  };

  const showModalIcons = (value) => {
    setModalIconOrColors(value);
  };
  const onAddNewNode = () => {
    setEditNode(null);
    if (newNode) {
      setNewNode(null);
      return;
    }
    const newNodeInstance: ICategory = defaultCategory(node);
    setNewNode(newNodeInstance);
  };

  const onSaveTransaction = (moneyTransaction: IMoneyTransaction) => {
    setShowTransactionScreen(false);
    saveMoneyTransaction(moneyTransaction).then((response: any) => {});
  };
  const onCancelAddTransaction = () => {
    setShowTransactionScreen(false);
  };

  const onStartAddTransaction = () => {
    setShowTransactionScreen(true);
  };

  const onEditNode = () => {
    setNewNode(null);
    if (editNode) {
      return setEditNode(null);
    }
    setEditNode(node);
  };

  const triggerOnClose = () => {
    setEditNode(null);
    setNewNode(null);
  };

  const onEditSaveNodeName = (item: ICategory) => {
    if (!item._id) {
      return saveCategory(item, selectedMoneyEntity).then((response: any) => {
        node.children?.push(response.data);
        node.isCollapsed = false;
        setIsCollapsed(false);
        setNewNode(null);
      });
    }

    updateCategory(
      item._id,
      {
        label: item.label,
        description: item.description,
      },
      selectedMoneyEntity
    ).then((response: any) => {
      node.label = item.label;
      node.description = item.description;
      setEditNode(null);
    });
  };

  const onIconChoosed = (icon: string) => {
    updateCategory(node._id, { icon }, selectedMoneyEntity).then(
      (response: any) => {
        node.icon = icon;
        setModalIconOrColors(0);
      }
    );
  };

  const onColorChoosed = (color: string) => {
    updateCategory(node._id, { color }, selectedMoneyEntity).then(
      (response: any) => {
        node.color = color;
        setModalIconOrColors(0);
      }
    );
  };

  const executeArrowUP = () => {
    const index = parent?.children?.indexOf(node);
    if (index) {
      setSelectedCategory(parent?.children?.[index - 1] ?? null);
    } else {
      parent && setSelectedCategory(parent);
    }
  };

  useEffect(() => {
    if (!shortCutAction) {
      return;
    }
    if (selectedCategory !== node) {
      return;
    }
    // alert(shortCutAction);
    setShortCutAction(null);
    switch (shortCutAction) {
      case SHORTCUT_ACTIONS.ADD_NODE: {
        onAddNewNode();
        break;
      }
      case SHORTCUT_ACTIONS.ADD_TRANSACTION: {
        onStartAddTransaction();
        break;
      }
      case SHORTCUT_ACTIONS.EDIT: {
        onEditNode();
        break;
      }
      case SHORTCUT_ACTIONS.DELETE: {
        onStartDeleteNode();
        break;
      }
      case SHORTCUT_ACTIONS.ARROW_DOWN: {
        const index = parent?.children?.indexOf(node);
        if (index === undefined) {
          if (node?.children?.length) {
            setSelectedCategory(node?.children?.[0] ?? null);
            if (isCollapsed) {
              updateCollapseState(false);
            }
          }
          return;
        }
        if (!isCollapsed) {
          if (node.children?.length) {
            setSelectedCategory(node?.children?.[0] ?? null);
            return;
          }
        }
        const childrensLength = parent?.children?.length ?? 0;
        if (index >= 0 && childrensLength - 1 > index) {
          setSelectedCategory(parent?.children?.[index + 1] ?? null);
        } else {
          parent && setSelectedCategory(parent);
        }
        break;
      }
      case SHORTCUT_ACTIONS.ARROW_UP: {
        executeArrowUP();
        break;
      }
      case SHORTCUT_ACTIONS.ARROW_LEFT: {
        updateCollapseState(true);
        if (isCollapsed) {
          parent && setSelectedCategory(parent);
        }
        break;
      }
      case SHORTCUT_ACTIONS.ARROW_RIGHT: {
        updateCollapseState(false);
        break;
      }
      case SHORTCUT_ACTIONS.ICON: {
        setModalIconOrColors(1);
        break;
      }

      default:
        break;
    }
    // if (selectedCategory && selectedCategory._id === node._id) {
    //   setIsCollapsed(false);
    // } else {
    //   setIsCollapsed(true);
    // }
  }, [selectedCategory, shortCutAction]);

  useEffect(() => {
    if (!treeAction) {
      return;
    }
    if (selectedCategory !== node) {
      return;
    }
    setTreeAction(0);
    switch (treeAction) {
      case TREE_ACTION.ADD_NEW_CATEGORY: {
        onAddNewNode();
        break;
      }
      case TREE_ACTION.EDIT_CATEGORY: {
        onEditNode();
        break;
      }
      case TREE_ACTION.DELETE_CATEGORY: {
        onStartDeleteNode();
        break;
      }
      case TREE_ACTION.ADD_NEW_TRANSACTION: {
        onStartAddTransaction();
        break;
      }
    }
  }, [treeAction]);

  /* #region Drag Drop */
  const onDragStart = (e, draggedNode) => {
    // e.preventDefault();
    e.stopPropagation();
    console.log(node.label);
    //
    e.dataTransfer.setData('draggedNode', node._id);
    node.parent = parent || undefined;
    setDraggedCategory(node);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetNode) => {
    console.log(targetNode);
    e.stopPropagation();
    setOpacity(1);
    e.preventDefault();
    // const draggedNode = JSON.parse(e.dataTransfer.getData("draggedNode"));
    // moveNode(draggedNode, targetNode);
    setDroppedCategory(node);
  };

  /* #endregion */

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, node)}
      onDragOver={(e) => onDragOver(e)}
      onDragEnter={(e) => {
        onDragEnter(e);
        setOpacity(0.5); // Change opacity when dragging over
      }}
      onDragLeave={(e) => {
        onDragLeave(e);
        setOpacity(1); // Reset opacity when drag leaves
      }}
      onDrop={(e) => onDrop(e, node)}
      style={{
        marginLeft: '20px',
        marginTop: '2px',
        opacity,
      }}
    >
      <TreeHeader
        node={node}
        toggleCollapse={() => updateCollapseState(!isCollapsed)}
        isCollapsed={isCollapsed}
        onAddNewNode={onAddNewNode}
        onEditNode={onEditNode}
        setIsModalIconsVisible={showModalIcons}
        selectedCategory={selectedCategory}
        onStartAddTransaction={onStartAddTransaction}
        onStartDeleteNode={onStartDeleteNode} // TODO: fix this
      ></TreeHeader>

      <TreeNodeAddEdit
        node={node}
        newNode={newNode}
        editNode={editNode}
        triggerOnClose={triggerOnClose}
        onEditSaveNodeName={onEditSaveNodeName}
      ></TreeNodeAddEdit>

      {modalIconOrColors > 0 && (
        <DialogWrapper
          header="Selectare icon"
          visible={modalIconOrColors}
          onHide={() => {
            if (modalIconOrColors === 2) {
              onColorChoosed(node.color || '#000000');
            }
            setModalIconOrColors(0);
          }}
          // style={{ width: "80vw" }}
        >
          {modalIconOrColors === 1 && (
            <IconGallery onIconChoosed={onIconChoosed}></IconGallery>
          )}
          {modalIconOrColors === 2 && (
            <div className="fcenter mt15">
              <ColorPicker
                value={node.color || '#000000'}
                onChange={(e) => {
                  // onColorChoosed(`#${e.value}`);
                  node.color = `#${e.value}`;
                  // setModalIconOrColors(0);
                  // node.color = 'red';
                }}
              />
            </div>
          )}
        </DialogWrapper>
      )}
      {isModalDeletionConfirmationVisible && (
        <ConfirmDialogWrapper
          onConfirm={() => {
            executeDeleteNode();
          }}
          onCancel={() => setIsModalDeletionConfirmationVisible(false)}
          headerMessage={() => `Esti sigur ca vrei sa stergi ${node.label} ?`}
        ></ConfirmDialogWrapper>
      )}

      {showTransactionScreen && (
        <DialogWrapper
          header={`Adaugare tranzactie pentru ${node.label}`}
          visible={showTransactionScreen}
          onHide={onCancelAddTransaction}
          // style={{ width: "80vw" }}
        >
          <AddEditMoneyTransaction
            category={node}
            moneyTransaction={getDefaultMoneyTransaction(
              selectedCategory,
              selectedMoneyEntity,
              accounts || [],
              loggedUser
            )}
            onSaveMoneyTransaction={onSaveTransaction}
            onCancel={onCancelAddTransaction}
          ></AddEditMoneyTransaction>
        </DialogWrapper>
      )}

      {!isCollapsed && node.children && (
        <div>
          {node.children.map((child) => {
            child.level = (node.level || 0) + 1;
            return (
              <TreeNode
                key={child._id}
                node={child}
                parent={node}
                selectedCategory={selectedCategory}
                shortCutAction={shortCutAction}
                setShortCutAction={setShortCutAction}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
