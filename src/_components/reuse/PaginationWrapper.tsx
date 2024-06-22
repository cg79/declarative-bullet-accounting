// import "react-datepicker/dist/react-datepicker.css";
import { Paginator } from "primereact/paginator";

export const PaginationWrapper = ({
  pageState,
  pageCountAndTotalRecords,
  goToPage,
}) => {
  return pageCountAndTotalRecords.totalRecords > 0 ? (
    <div className="flex center-h">
      <div>
        <Paginator
          first={pageState.first}
          rows={pageState.rowsPerPage}
          totalRecords={pageCountAndTotalRecords.totalRecords}
          rowsPerPageOptions={[1, 3, 5, 10, 20, 30]}
          onPageChange={(value) => {
            goToPage({
              first: value.first,
              pageNo: value.page,
              rowsPerPage: value.rows,
            });
          }}
        />
      </div>
      <div className="flex ml5 flexcolumn center">
        {pageCountAndTotalRecords.totalRecords}
      </div>
    </div>
  ) : null;
};
