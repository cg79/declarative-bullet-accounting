import { useCallback, useState } from "react";
import { ICategory } from "../category-type";
import { useBetween } from "use-between";
import useIdentity from "../../../_store/useIdentity";
import useApi from "../../../hooks/useApi";
import { CATEGORY_COLLECTION } from "../constants";
import { IMoneyEntity } from "../../money-entity/money-entity-type";
import { utils } from "../../../_utils/utils";
import { buildTreeFromParent } from "../category-helpers";
import { BULLET_METHOD } from "../../../_fluentApi/fluent/constants";

const useCategoryState = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [draggedCategory, setDraggedCategory] = useState<ICategory | null>(
    null
  );
  const [droppedCategory, setDroppedCategory] = useState<ICategory | null>(
    null
  );
  const [newCategory, setNewCategory] = useState<ICategory | null>(null);
  const [deletedCategory, setDeletedCategory] = useState<ICategory | null>(
    null
  );
  const [updatedCategories, setUpdatedCategories] = useState<ICategory[]>([]);

  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState<any>(null);

  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();

  const calculateAmounts = (
    node: ICategory,
    key: string = "available",
    updatedCategory: ICategory | undefined = undefined
  ): number => {
    if (updatedCategory) {
      if (node._id === updatedCategory._id) {
        node.transactionsAmount = updatedCategory.transactionsAmount;
      }
    }

    if (!node || !node.children) {
      return node.transactionsAmount;
    }

    node.props = {};
    node.props[key] =
      node.transactionsAmount +
      node.children.reduce((total, child) => {
        return total + calculateAmounts(child, key, updatedCategory);
      }, 0);

    return node.props[key];
  };

  const updateCategoryTree = (category: ICategory[] = categoryTree) => {
    calculateAmounts(category[0], "available");
    setCategoryTree(category);
  };

  const newTransactionAdded = (category: ICategory) => {
    calculateAmounts(categoryTree[0], "available", category);
    setCategoryTree([...categoryTree]);
  };

  const getCategories = useCallback(
    async (selectedMoneyEntity: IMoneyEntity | null) => {
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
          data: [],
        };
      }

      debugger;
      const categoriesResponse = await executeMethod()
        .collection((c) =>
          c
            .name(CATEGORY_COLLECTION(loggedUser, selectedMoneyEntity))
            .method(BULLET_METHOD.FIND)
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });

      let categoryList = categoriesResponse.data;
      // setCategories(categoryList);

      const rootCategory = categoryList.find(
        (category) => category.parentId === null
      );
      if (!rootCategory) {
        const rootCategory: ICategory = {
          label: "Root",
          parentId: null,
          addedDate: utils.dateToEpoch(new Date()),
          transactionsAmount: 0,
          childTransactionsAmount: 0,
          spent: 0,
          blocked: 0,
          icon: "pi pi-folder",
          description: "",
          _id: "",
          parentIds: [],
          level: 0,
          props: {},
        };
        const saveResponse = await saveCategory(
          rootCategory,
          selectedMoneyEntity
        );
        if (saveResponse.success && saveResponse.data) {
          categoryList = [{ ...rootCategory, _id: saveResponse.data._id }];
        }
      }

      const tree = buildTreeFromParent(categoryList);

      if (tree) {
        updateCategoryTree(tree);
        setSelectedCategory(tree?.[0] ?? null);
      }

      return categoriesResponse;
    },
    []
  );
  const getCategoryParentIds = (category: ICategory) => {
    const parentIds: string[] = [];
    let node: ICategory | undefined = category;
    while (node) {
      parentIds.unshift(node._id);
      node = node.parent;
    }
    return parentIds;
  };

  const saveCategory = useCallback(
    async (category: ICategory, selectedMoneyEntity: IMoneyEntity | null) => {
      // const {startAccountingData}  = useStartAccountingData();
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
          data: null,
        };
      }
      // category.addedDate = utils.dateToEpoch(new Date());
      // - daca nu exista, le insereaza
      return executeMethod()
        .collection((c) =>
          c
            .name(CATEGORY_COLLECTION(loggedUser, selectedMoneyEntity))
            .method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(category)

        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    []
  );

  const updateCategory = useCallback(
    async (
      _id: string,
      body: any,
      selectedMoneyEntity: IMoneyEntity | null
    ) => {
      if (!loggedUser) {
        return {
          success: false,
          message: "Nu sunteti autentificat",
        };
      }
      // - daca nu exista, le insereaza
      return executeMethod()
        .collection((c) =>
          c
            .name(CATEGORY_COLLECTION(loggedUser, selectedMoneyEntity))
            .method(BULLET_METHOD.UPDATE_ONE)
        )
        .body({ ...body, _id })

        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    []
  );

  const deleteCategory = useCallback(async (category: ICategory) => {
    if (!loggedUser) {
      return {
        success: false,
        message: "Nu sunteti autentificat",
      };
    }

    // - daca nu exista, le insereaza
    const response = await executeMethodFromModule({
      method: "deleteCategory",
      moduleName: "accounting",
      body: {
        _id: category._id,
        parentId: category.parentId,
      },
    });

    return response;
  }, []);

  return {
    newCategory,
    setNewCategory,
    selectedCategory,
    setSelectedCategory,
    draggedCategory,
    setDraggedCategory,
    droppedCategory,
    setDroppedCategory,
    deletedCategory,
    setDeletedCategory,
    updatedCategories,
    setUpdatedCategories,

    categories,
    getCategories,
    saveCategory,
    deleteCategory,
    categoryTree,
    updateCategory,
    getCategoryParentIds,
    calculateAmounts,
    newTransactionAdded,
  };
};
export default useCategoryState;
