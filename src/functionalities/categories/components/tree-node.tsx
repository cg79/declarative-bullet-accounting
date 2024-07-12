import { useEffect, useState } from "react";
import TreeHeader from "./tree-header";
import { ICategory } from "../category-type";
import TreeNodeAddEdit from "./tree-node-add-edit";
import { Dialog } from "primereact/dialog";
import IconGallery from "./icons/icons-gallery";
import { SHORTCUT_ACTIONS } from "../constants";
import { useBetween } from "use-between";
import useCategoryState from "../hooks/useCategoryState";
import AddEditMoneyTransaction from "../../money-transactions/add-edit/add-edit-money-transaction";
import useMoneyTransactions from "../../money-transactions/hooks/useMoneyTransactions";
import { IMoneyTransaction } from "../../money-transactions/money-transaction-type";
import { ConfirmDialogWrapper } from "../../../_components/reuse/ConfirmDialogWrapper";
import observer from "../../../_store/observer";
import { getDefaultMoneyTransaction } from "../../money-transactions/money-helpers";
import useMoneyEntities from "../../money-entity/hooks/useMoneyEntities";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";
// import { faL } from "@fortawesome/free-solid-svg-icons";

const ItemTypes = {
  NODE: "node",
};

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
  const { accounts } = useBetween(useMoneyAccounts);
  const { selectedMoneyEntity } = useBetween(useMoneyEntities);
  const [opacity, setOpacity] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(node.isCollapsed || false);
  const [newNode, setNewNode] = useState<ICategory | null>(null);
  const [editNode, setEditNode] = useState<ICategory | null>(null);
  const [showTransactionScreen, setShowTransactionScreen] = useState(false);
  const [isModalIconsVisible, setIsModalIconsVisible] = useState(false);
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

  const showModalIcons = () => {
    setIsModalIconsVisible(true);
  };
  const onAddNewNode = () => {
    setEditNode(null);
    if (newNode) {
      setNewNode(null);
      return;
    }
    const newNodeInstance: ICategory = {
      children: [],
      _id: "",
      parentId: node._id,
      label: "",
      icon: "",
      description: "",
      transactionsAmount: 0,
      childTransactionsAmount: 0,
      spent: 0,
      blocked: 0,
      parentIds: (node.parentIds || []).concat(node._id),
      level: node.level + 1,
      props: {},
    };
    setNewNode(newNodeInstance);
  };

  const onSaveTransaction = (moneyTransaction: IMoneyTransaction) => {
    setShowTransactionScreen(false);
    observer.publish("ENABLE_SHORTCUT", true);
    saveMoneyTransaction(moneyTransaction).then((response: any) => {});
  };
  const onCancelAddTransaction = () => {
    observer.publish("ENABLE_SHORTCUT", true);
    setShowTransactionScreen(false);
  };

  const onStartAddTransaction = () => {
    observer.publish("DISABLE_SHORTCUT", false);
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
        setIsModalIconsVisible(false);
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
        setIsModalIconsVisible(true);
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

  /* #region Drag Drop */
  const onDragStart = (e, draggedNode) => {
    // e.preventDefault();
    e.stopPropagation();
    console.log(node.label);
    //
    e.dataTransfer.setData("draggedNode", node._id);
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
        marginLeft: "20px",
        marginTop: "10px",
        opacity,
        // backgroundColor: isMouseOver ? "lightgray" : "white",
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
      {/* {JSON.stringify(node.props)} */}

      <TreeNodeAddEdit
        node={node}
        newNode={newNode}
        editNode={editNode}
        triggerOnClose={triggerOnClose}
        onEditSaveNodeName={onEditSaveNodeName}
      ></TreeNodeAddEdit>

      {isModalIconsVisible && (
        <Dialog
          header="Selectare icon"
          visible={isModalIconsVisible}
          onHide={() => setIsModalIconsVisible(false)}
          style={{ width: "80vw" }}
        >
          <IconGallery onIconChoosed={onIconChoosed}></IconGallery>
        </Dialog>
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
        <Dialog
          header="Selectare icon"
          visible={showTransactionScreen}
          onHide={onCancelAddTransaction}
          style={{ width: "80vw" }}
        >
          <AddEditMoneyTransaction
            category={node}
            moneyTransaction={getDefaultMoneyTransaction(
              selectedCategory,
              selectedMoneyEntity,
              accounts
            )}
            onSaveMoneyTransaction={onSaveTransaction}
            onCancel={onCancelAddTransaction}
          ></AddEditMoneyTransaction>
        </Dialog>
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
