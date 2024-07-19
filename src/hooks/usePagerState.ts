import React from "react";

export interface IPageNoAndRowsPerPage {
  first: number;
  pageNo: number;
  rowsPerPage: number;
}
export function usePagerState() {
  const [pageState, setPageState] = React.useState<IPageNoAndRowsPerPage>({
    first: 0,
    pageNo: 0,
    rowsPerPage: 5,
  });

  const [pageCountAndTotalRecords, setPageCountAndTotalRecords] =
    React.useState({
      pageCount: 0,
      totalRecords: 0,
    });

  const goToPage = (request: IPageNoAndRowsPerPage) => {
    setPageState({
      ...pageState,
      ...request,
    });
  };
  return {
    goToPage,
    pageState,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
  };
}
