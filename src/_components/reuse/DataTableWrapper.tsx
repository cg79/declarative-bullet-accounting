import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { utils } from "../../_utils/utils";
import { useState } from "react";

export interface MyDataTableProps {
  data: any[];
  fieldHeader: { field?: string; header: string; body?: any }[];

  onRowClick?: (data: any) => void;
}
const DataTableWrapper = ({
  data,
  fieldHeader,
  // actions,
  onRowClick,
}: MyDataTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  return (
    <div className="hscroll" key={Math.random()}>
      <DataTable
        value={data}
        onRowClick={onRowClick}
        selectionMode="single"
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.value)}
        dataKey="_id"
        metaKeySelection={true}
      >
        {fieldHeader.map((el) => (
          <Column
            key={utils.createUUID()}
            field={el.field}
            header={el.header}
            body={el.body}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default DataTableWrapper;
