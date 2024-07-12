import { useState } from "react";
import { ICategory } from "../category-type";
import { AddEditCategoryInline } from "../add-edit/add-edit-category-inline";

const TreeNodeAddEdit = ({
  node,
  newNode,
  editNode,
  triggerOnClose,
  onEditSaveNodeName,
}: {
  node: ICategory;
  newNode: ICategory | null;
  editNode: ICategory | null;

  triggerOnClose: () => void;
  onEditSaveNodeName: (item: ICategory) => void;
}) => {
  const category = newNode || editNode;
  if (!category) {
    return null;
  }
  return (
    <>
      <AddEditCategoryInline
        category={category}
        onSave={(item: ICategory) => onEditSaveNodeName(item)}
        onCancel={() => triggerOnClose()}
      ></AddEditCategoryInline>
    </>
  );
};

export default TreeNodeAddEdit;
