import { useEffect, useState } from 'react';
import Tree from './components/tree';
import ShortcutComponent from './shortcut/shortcut-component';
import useCategoryState from './hooks/useCategoryState';
import { ICategory } from './category-type';
import useMoneyEntities from '../money-entity/hooks/useMoneyEntities';
import { useBetween } from '../../../hooks/useBetween';

export const CategoryTree = ({ categoryTree, onNodeSelected }) => {
  const { selectedMoneyEntity } = useBetween(useMoneyEntities);
  const [treeData, setTreeData] = useState(categoryTree);
  const [shortCutAction, setShortCutAction] = useState<string>('');
  const {
    draggedCategory,
    setDraggedCategory,
    droppedCategory,
    setDroppedCategory,
    deletedCategory,
    setDeletedCategory,
    updatedCategories,
    updateCategory,
    calculateAmounts,
  } = useBetween(useCategoryState);

  useEffect(() => {
    if (!draggedCategory) {
      return;
    }
    if (!droppedCategory) {
      return;
    }
    if (draggedCategory._id === droppedCategory._id) {
      return;
    }
    if (
      droppedCategory.children?.find(
        (child) => child._id === draggedCategory._id
      )
    ) {
      return;
    }
    draggedCategory.parentId = droppedCategory._id;

    if (draggedCategory.parent) {
      const parent = draggedCategory.parent;
      // parent.available = parent.available + draggedCategory.available;
      parent.children = parent.children?.filter(
        (child) => child._id !== draggedCategory._id
      );
      setTreeData({ ...treeData });
    }
    droppedCategory?.children?.push(draggedCategory);
    //

    draggedCategory.parent = droppedCategory;
    draggedCategory.parentIds = droppedCategory.parentIds.concat(
      droppedCategory._id
    );

    calculateAmounts(categoryTree[0]);

    updateCategory(
      draggedCategory._id,
      {
        parentId: draggedCategory.parentId,
        parentIds: draggedCategory.parentIds,
      },
      selectedMoneyEntity
    ).then(() => {
      updateCategory(
        droppedCategory._id,
        {
          parentIds: droppedCategory.parentIds,
        },
        selectedMoneyEntity
      ).then(() => {
        setDraggedCategory(null);
        setDroppedCategory(null);

        setTreeData({ ...treeData });
      });
    });

    // setTreeData({ ...treeData });
  }, [droppedCategory]);

  useEffect(() => {
    if (!deletedCategory) {
      return;
    }
    if (!deletedCategory.parent) {
      return;
    }

    //
    // setShortCutAction(SHORTCUT_ACTIONS.ARROW_UP);
    deletedCategory.parent.children = deletedCategory.parent?.children?.filter(
      (c: ICategory) => c._id !== deletedCategory._id
    );
    setDeletedCategory(null);
    setTreeData({ ...treeData });
  }, [deletedCategory]);

  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key] = true;

      for (let child of node.children) {
        expandNode(child, _expandedKeys);
      }
    }
  };
  const onShortCutAction = (event) => {
    setShortCutAction(event);
  };

  // useEffect(() => {
  //   if (!categoryTree) {
  //     return;
  //   }

  //   const root: ICategory = categoryTree[0];

  //   const rootTransaction = updatedCategories.find((c) => c._id === root._id);
  //   if (!rootTransaction) {
  //
  //     return;
  //   }

  //   root.transactionsAmount = rootTransaction.transactionsAmount;

  //   let node: ICategory | undefined = root;
  //   for (var i = 1; i < updatedCategories.length; i++) {
  //     node = node?.children?.find(
  //       (child) => child._id === updatedCategories[i]._id
  //     );
  //     if (!node) {
  //
  //     }
  //     if (node) {
  //       node.transactionsAmount = updatedCategories[i].transactionsAmount;
  //     }
  //   }

  //   setTreeData({ ...categoryTree });
  // }, [updatedCategories]);

  return (
    <div id="category-tree" className="category-tree">
      {/* <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          onClick={expandAll}
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          onClick={collapseAll}
        />
      </div> */}

      {categoryTree && (
        <>
          <ShortcutComponent onShortCutAction={onShortCutAction}>
            <Tree
              nodes={categoryTree}
              shortCutAction={shortCutAction}
              setShortCutAction={setShortCutAction}
            />
          </ShortcutComponent>
        </>
      )}
    </div>
  );
};
