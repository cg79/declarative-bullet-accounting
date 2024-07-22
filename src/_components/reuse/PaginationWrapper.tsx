// import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";

export const PaginationWrapper = ({
  pageState,
  pageCountAndTotalRecords,
  goToPage,
}) => {
  const template2 = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 1, value: 1 },
        { label: 3, value: 3 },
        { label: 5, value: 5 },
        { label: 10, value: 10 },
      ];

      return (
        <>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Items per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  return pageCountAndTotalRecords.totalRecords > 0 ? (
    <div className="flex center-h">
      <div>
        <Paginator
          first={pageState.first}
          rows={pageState.rowsPerPage}
          totalRecords={pageCountAndTotalRecords.totalRecords}
          rowsPerPageOptions={[1, 3, 5, 10, 20, 30]}
          template={template2}
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
