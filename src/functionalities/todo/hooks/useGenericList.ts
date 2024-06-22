import { useCallback, useEffect, useState } from "react";
import {
  IPageNoAndRowsPerPage,
  usePagerState,
} from "../../../hooks/usePagerState";
import useGenericDB from "./useGenericDB";
import { helpers } from "../../../_utils/helpers";

const useGenericList = <T>(collectionName: string, sortBy: string) => {
  const [list, setList] = useState<T[]>([]);
  const [item, setItem] = useState<T | null>(null);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<T | null>(null);

  const {
    goToPage,
    pageState,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
  } = usePagerState();

  const { getPagedList, insertOrUpdate, deleteEntityFromDB } = useGenericDB();

  const getPaginatedList = useCallback(async () => {
    return getPagedList(pageState, collectionName, sortBy).then((val: any) => {
      const pagedRecords = val.data;
      setList(pagedRecords.records);
      setPageCountAndTotalRecords({
        pageCount: pagedRecords.pageCount,
        totalRecords: pagedRecords.count,
      });
    });
  }, [
    collectionName,
    getPagedList,
    pageState,
    setPageCountAndTotalRecords,
    sortBy,
  ]);

  const save = useCallback(
    async (entity: T) => {
      insertOrUpdate(entity, collectionName).then((httpResponse: any) => {
        helpers.checkHttpResponseForErrors(httpResponse);

        setItem(null);
        getPaginatedList();
      });
    },
    [collectionName, getPaginatedList, insertOrUpdate]
  );

  const deleteEntity = useCallback(
    async (entity: T) => {
      return deleteEntityFromDB(entity, collectionName);
    },
    [collectionName, deleteEntityFromDB]
  );

  useEffect(() => {}, []);
  return {
    save,
    list,
    getPaginatedList,
    deleteEntity,
    goToPage,
    pageState,
    pageCountAndTotalRecords,
    item,
    setItem,
    itemToBeDeleted,
    setItemToBeDeleted,
  };
};

export default useGenericList;
