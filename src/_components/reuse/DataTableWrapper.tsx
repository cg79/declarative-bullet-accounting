// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

export interface MyDataTableProps {
  data: any[];
  fieldHeader: { field?: string; header: string; body?: any }[];

  onRowClick?: (data: any) => void;
  renderDefaultActions?: (data: any) => any;
}
const DataTableWrapper = ({
  data,
  fieldHeader,
  // actions,
  onRowClick,
  renderDefaultActions,
}: MyDataTableProps) => {
  return (
    <div className="hscroll" key={Math.random()}>
      <div className="flex mt10 bold">
        {fieldHeader.map((header) => (
          <div key={header.field} style={{ flex: 1 }} className="bold tcell">
            {header.header}
          </div>
        ))}
        {renderDefaultActions && (
          <div style={{ flex: 1 }}>{renderDefaultActions(null)}</div>
        )}
      </div>
      <div className="mt10">
        {data.map((item) => (
          <div
            key={item._id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className="mycardFilter"
            onClick={() => onRowClick && onRowClick(item)}
          >
            {fieldHeader.map((header) => (
              <div key={Math.random()} style={{ flex: 1 }}>
                {header.body ? header.body(item) : item[header.field || '']}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTableWrapper;
