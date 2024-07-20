import { useCallback, useState } from "react";
import { AggregateCategory, ICategory } from "../category-type";
import { useBetween } from "use-between";
import useIdentity from "../../../../_store/useIdentity";
import useApi from "../../../../hooks/useApi";
import { CATEGORY_COLLECTION } from "../constants";
import { IMoneyEntity } from "../../money-entity/money-entity-type";
import { utils } from "../../../../_utils/utils";
import { buildTreeFromParent, defaultCategory } from "../category-helpers";
import { BULLET_METHOD } from "../../../../_fluentApi/fluent/constants";

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
  const [aggregateCategories, setAggregateCategories] =
    useState<AggregateCategory>({});

  // const [categories, setCategories] = useState([]);x
  const [categoryTree, setCategoryTree] = useState<ICategory[]>([]);

  const { loggedUser } = useBetween(useIdentity);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategoryById = (id: string) => {
    return categories.find((category) => category._id === id);
  };

  const calculateAmounts = (
    node: ICategory,
    updatedCategory?: ICategory
  ): ICategory => {
    // Update the node if it matches the updatedCategory
    if (updatedCategory && node._id === updatedCategory._id) {
      node.props.expense = updatedCategory.expense;
      node.props.income = updatedCategory.income;
      node.props.available = updatedCategory.income - updatedCategory.expense;
    } else {
      node.props.expense = node.expense;
      node.props.income = node.income;
      node.props.available = node.income - node.expense;
    }

    if (!node.children || node.children.length === 0) {
      return node;
    }

    node.children = node.children.map((child) =>
      calculateAmounts(child, updatedCategory)
    );

    node.children.forEach((child) => {
      if (child) {
        node.props!.income += child.props.income;
        node.props!.expense += child.props.expense;
        node.props!.available += child.props.available;
      }
    });

    return node;
  };

  const calculateAmountsWithAggregates = (
    node: ICategory,
    aggregateAmountByCategory: AggregateCategory = {}
  ): ICategory => {
    if (!node.props) {
      node.props = { income: 0, expense: 0, available: 0 };
    }
    node.props.income = aggregateAmountByCategory[node._id]?.income || 0;
    node.props.expense = aggregateAmountByCategory[node._id]?.expense || 0;
    node.props.available = node.props.income - node.props.expense;

    if (!node || !node.children) {
      return node;
    }

    node.children = node.children.map((child) =>
      calculateAmountsWithAggregates(child, aggregateAmountByCategory)
    );

    node.children.forEach((child) => {
      if (child) {
        node.props!.income += child.props.income;
        node.props!.expense += child.props.expense;
        node.props!.available += child.props.available;
      }
    });

    return node;
  };

  const updateCategoryTree = (category: ICategory[] = categoryTree) => {
    const newRootNode = calculateAmounts(category[0]);
    setCategoryTree([newRootNode]);
  };

  const newTransactionAdded = (category: ICategory) => {
    calculateAmounts(categoryTree[0], category);
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
      setCategories(categoryList);

      const rootCategory = categoryList.find(
        (category) => category.parentId === null
      );
      if (!rootCategory) {
        const rootCategory: ICategory = defaultCategory();
        rootCategory.label = "Categorii";
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

  const aggregateAmountByCategory = (entityId: string, filterBy = {}) => {
    if (!loggedUser) {
      return Promise.resolve({
        success: false,
        message: "Nu sunteti autentificat",
      });
    }
    executeMethodFromModule({
      method: "aggregateAmountByCategory",
      moduleName: "accounting",

      body: {
        find: filterBy,
        entityId,
      },
    }).then((response) => {
      if (!response.success) {
        return;
      }
      setAggregateCategories(response.data);

      calculateAmountsWithAggregates(categoryTree[0], response.data);
      setCategoryTree([...categoryTree]);
    });
  };

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

    // categories,
    getCategories,
    saveCategory,
    deleteCategory,
    categoryTree,
    updateCategory,
    getCategoryParentIds,
    calculateAmounts,
    newTransactionAdded,
    getCategoryById,
    aggregateAmountByCategory,
  };
};
export default useCategoryState;
