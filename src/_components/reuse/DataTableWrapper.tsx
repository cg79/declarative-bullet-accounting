import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export interface MyDataTableProps {
  data: any[];
  fieldHeader: { field?: string; header: string; body?: any }[];
  // actions?: {
  //   header: string;
  //   action?: (data: any) => void;

  // }[];
  onRowClick?: (data: any) => void;
}
const DataTableWrapper = ({
  data,
  fieldHeader,
  // actions,
  onRowClick,
}: MyDataTableProps) => {
  return (
    <div className="hscroll" key={Math.random()}>
      <DataTable
        value={data}
        // tableStyle={{ minWidth: "414px" }}
        onRowClick={onRowClick}
      >
        {/* <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column> */}
        {fieldHeader.map((el) => (
          <Column field={el.field} header={el.header} body={el.body} />
        ))}
        {/* {actions &&
        actions.map((el) => <Column header={el.header} body={el.body} />)} */}
      </DataTable>
    </div>
  );
};

export default DataTableWrapper;
