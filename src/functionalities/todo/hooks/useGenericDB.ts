import { BULLET_METHOD } from "declarative-fluent-bullet-api/fluent/constants";

import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";
import useDeclarativeBulletApi from "../../../hooks/useDeclarativeBulletApi";
import { useCallback } from "react";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";
import { helpers } from "../../../_utils/helpers";

const useGenericDB = () => {
  const { createDeclarativeBulletApi, createBulletHttpRequestLibrary } =
    useDeclarativeBulletApi();

  // const {selectedAngajat} = useBetween(useFirme);

  const insertOrUpdate = useCallback(
    async (entity: any, collection) => {
      // const {startAccountingData}  = useStartAccountingData();

      // - daca nu exista, le insereaza
      return createDeclarativeBulletApi()
        .collection((c) =>
          c.name(collection).method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(entity)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          return val;
        });
    },
    [createDeclarativeBulletApi]
  );

  const deleteEntityFromDB = useCallback(
    async (entity: any, collection: string) => {
      // const {startAccountingData}  = useStartAccountingData();

      // - daca nu exista, le insereaza
      return createDeclarativeBulletApi()
        .collection((c) => c.name(collection).method(BULLET_METHOD.DELETE_ONE))
        .body(entity)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [createDeclarativeBulletApi]
  );

  const getPagedList = useCallback(
    async (
      pageState: IPageNoAndRowsPerPage,
      collection: string,
      sortBy: string
    ) => {
      // const {startAccountingData}  = useStartAccountingData();
      const { pageNo, rowsPerPage } = pageState;

      // - daca nu exista, le insereaza
      return createDeclarativeBulletApi()
        .collection((c) => c.name(collection).method(BULLET_METHOD.PAGINATION))
        .page((p) => p.itemsOnPage(rowsPerPage).pageNo(pageNo + 1))
        .sort((s) => s.field(sortBy).ascending(true))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [createDeclarativeBulletApi]
  );

  return {
    deleteEntityFromDB,
    insertOrUpdate,
    getPagedList,
  };
};

export default useGenericDB;
