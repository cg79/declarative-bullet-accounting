// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

export type FieldHeaderType = {
  field?: string;
  header: string;
  body?: any;
  style?: any;
};

export interface MyDataTableProps {
  data: any[];
  fieldHeader: FieldHeaderType[];

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
      <table>
        <tbody>
          <tr>
            {fieldHeader.map((header) => (
              <th
                key={header.field}
                className="bold tcell"
                style={header.style}
              >
                {header.header}
              </th>
            ))}
            {renderDefaultActions && (
              <th style={{ flex: 1 }}>{renderDefaultActions(null)}</th>
            )}
          </tr>

          {data.map((item) => (
            <tr
              key={item._id}
              // style={{ display: 'flex' }}
              className="mycardFilter"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {fieldHeader.map((header) => (
                <td key={Math.random()} style={header.style}>
                  {header.body ? header.body(item) : item[header.field || '']}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableWrapper;
