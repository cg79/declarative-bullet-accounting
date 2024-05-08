import React, { useCallback, useEffect, useState } from "react";
import { usePagerState } from "../../../hooks/usePagerState";
import { IAccountingRecord, IPager } from "../model/accounting_types";
import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";
import { useChartState } from "../charts/useChartState";
import { utils } from "../../../_utils/utils";
import useFilters from "../../../_store/useFilters";
import useAccountingDbActions from "./useAccountingDbActions";
import { useBetween } from "use-between";
import useFirme from "../../../_store/useFirme";
import useImportTransactions from "../../import-extrase/pdf-import/useImportTransactions";

export function useTransactions() {
  const { selectedAngajat } = useBetween(useFirme);
  const { getHistoryDataFromDb } = useAccountingDbActions();
  const [error, setError] = React.useState<null | any>(null);
  const [insertMode, setInsertMode] = React.useState<boolean>(false);
  const { expression } = useBetween(useFilters);
  const { forRefresh } = useBetween(useImportTransactions);

  const [accountingRecords, setAccountingRecords] = useState<
    IAccountingRecord[]
  >([]);
  const { setChartingAccountingResponse, chartData } = useChartState();

  const {
    goToPage,
    pageState,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
  } = usePagerState();

  const setAccountingResponse = useCallback(
    (apiResponse: CustomHttpResponse) => {
      if (!apiResponse.success) {
        return;
      }
      const pagedRecords: IPager = processAccountingResponse(apiResponse);
      pagedRecords.records.forEach((el) => {
        if (!el.guid) {
          el.guid = utils.createUUID();
        }
      });

      if (!error) {
        // pager.setAccountingResponse(pagedRecords);

        setPageCountAndTotalRecords({
          ...pageCountAndTotalRecords,
          pageCount: pagedRecords.pageCount,
          totalRecords: pagedRecords.count,
        });

        setAccountingRecords(pagedRecords.records);
        setChartingAccountingResponse(pagedRecords.records);
      }
    },
    [
      error,
      setPageCountAndTotalRecords,
      pageCountAndTotalRecords,
      setChartingAccountingResponse,
    ]
  );

  const reloadAccountingRecords = () => {
    if (!selectedAngajat) {
      return;
    }
    let { pageNo } = pageState;
    pageNo++;

    getHistoryDataFromDb(
      selectedAngajat,
      expression,
      pageNo,
      pageState.rowsPerPage
    ).then((value) => {
      setAccountingResponse(value);
    });
  };

  useEffect(() => {
    reloadAccountingRecords();
  }, [selectedAngajat, pageState, expression, forRefresh]);

  const processAccountingResponse = (apiResponse: CustomHttpResponse) => {
    if (!apiResponse) {
      return;
    }
    if (!apiResponse.success) {
      return setError(apiResponse.message);
    }
    const accountingResponse = apiResponse.data;
    return accountingResponse;
  };

  return {
    accountingRecords,
    chartData,
    pageState,
    goToPage,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
    setAccountingResponse,
    error,
    setError,
    insertMode,
    setInsertMode,
    reloadAccountingRecords,
  };
}
