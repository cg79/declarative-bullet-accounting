import { utils } from "../../_utils/utils";
import { ICategory } from "./category-type";

function buildTreeFromParent(elements: ICategory[]): ICategory[] | null {
  // Helper function to find element by id
  const findElementByParentId = (id: string | null): ICategory | undefined => {
    return elements.find((element) => element.parentId === id);
  };

  // Helper function to find children of a given parent
  const findChildrens = (parentId: string): ICategory[] => {
    return elements.filter((element) => element.parentId === parentId);
  };

  // Find the root element
  const rootElement = findElementByParentId(null);

  if (!rootElement) {
    throw new Error("No root element found");
  }

  // Recursive function to build the tree
  const buildSubTree = (parentNode: ICategory): void => {
    if (!parentNode.parentIds) {
      parentNode.parentIds = [];
    }
    const childrens = findChildrens(parentNode._id);
    if (childrens.length > 0) {
      childrens.forEach((child) => {
        child.parent = parentNode;
        child.parentId = parentNode._id;
        child.parentIds = parentNode.parentIds.concat(parentNode._id);
      });
      parentNode.children = childrens;
      childrens.forEach((child) => buildSubTree(child));
    }
  };

  // Initialize the tree from the root element
  const tree: ICategory = { ...rootElement, children: [] };
  buildSubTree(tree);

  return [tree];
}

const defaultCategory = (node?: ICategory): ICategory => {
  return {
    _id: "",
    parentId: node?._id || null,
    label: "",
    icon: "pi pi-folder",
    description: "",
    available: 0,
    expense: 0,
    income: 0,
    blocked: 0,
    parentIds: node ? (node.parentIds || []).concat(node._id) : [],
    level: 0,
    props: {
      income: 0,
      expense: 0,
      available: 0,
    },
    date: utils.dateToEpoch(new Date()),
    children: [],
  };
};

export { buildTreeFromParent, defaultCategory };
