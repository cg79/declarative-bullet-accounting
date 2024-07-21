// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

import { MyDataTableProps } from './DataTableWrapper';

const DEFAULT_STYLE = {
  // minWidth: '100px',
  // flex: 1,
  // padding: '0 10px',
  // boxSizing: 'border-box',
  // padding: '5px',
  // 'border-bottom': '1px solid lightgray',
};

const DataTableRenderer = ({
  data,
  fieldHeader,
  // actions,
  onRowClick,
  renderDefaultActions,
}: MyDataTableProps) => {
  return (
    <div className="hscroll" key={Math.random()}>
      <table className="my-table">
        <tbody>
          <tr className="header">
            {fieldHeader.map((header, index) => (
              <th
                key={header.field}
                className="bold "
                style={{ ...(header.style || {}), ...DEFAULT_STYLE }}
              >
                <div className="flex">
                  {header.header}
                  {index === fieldHeader.length - 1 &&
                    renderDefaultActions &&
                    renderDefaultActions(null)}
                </div>
              </th>
            ))}
          </tr>

          {data.map((item) => (
            <tr
              key={item._id}
              className="mycardFilter1 "
              onClick={() => onRowClick && onRowClick(item)}
            >
              {fieldHeader.map((header) => (
                <td
                  key={Math.random()}
                  className="tcellh"
                  style={{ ...(header.style || {}), ...DEFAULT_STYLE }}
                >
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

export default DataTableRenderer;
