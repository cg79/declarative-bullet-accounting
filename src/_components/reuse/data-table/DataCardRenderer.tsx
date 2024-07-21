// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

import { MyDataTableProps } from './DataTableWrapper';
import './CardList.css';

const DataCardRenderer = ({
  data,
  fieldHeader,
  // actions,
  onRowClick,
  renderDefaultActions,
}: MyDataTableProps) => {
  return (
    <div className="card-list">
      <div className="cards-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            {fieldHeader.map((header) => (
              <div key={header.field} className="flex card-field">
                <div className="flex flex1">
                  <strong>{header.header}: </strong>
                </div>
                <div className="flex flex1 flex-end">
                  {header.body ? header.body(item) : item[header.field || '']}
                </div>
              </div>
            ))}
            {/* <div key={header.field} className="card-field1 flex">
                <strong>{header.header}: </strong>
                <span>
                  {header.body ? header.body(item) : item[header.field || '']}
                </span>
              </div> */}
            {/* ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCardRenderer;
