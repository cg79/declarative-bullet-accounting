import { BULLET_METHOD } from "declarative-fluent-bullet-api/fluent/constants";

import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";
import { useCallback } from "react";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";
import { helpers } from "../../../_utils/helpers";
import useApi from "../../transactions/hook/useApi";

const useGenericDB = () => {
  const { executeMethod } = useApi();

  const insertOrUpdate = useCallback(async (entity: any, collection) => {
    // const {startAccountingData}  = useStartAccountingData();

    // - daca nu exista, le insereaza
    return executeMethod()
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
  }, []);

  const deleteEntityFromDB = useCallback(
    async (entity: any, collection: string) => {
      // const {startAccountingData}  = useStartAccountingData();

      // - daca nu exista, le insereaza
      return executeMethod()
        .collection((c) => c.name(collection).method(BULLET_METHOD.DELETE_ONE))
        .body(entity)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    []
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
      return executeMethod()
        .collection((c) => c.name(collection).method(BULLET_METHOD.PAGINATION))
        .page((p) => p.itemsOnPage(rowsPerPage).pageNo(pageNo + 1))
        .sort((s) => s.field(sortBy).ascending(true))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    []
  );

  return {
    deleteEntityFromDB,
    insertOrUpdate,
    getPagedList,
  };
};

export default useGenericDB;
