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
  renderDefaultHeaderActions,
  renderCreateFirstItem,
}: MyDataTableProps) => {
  const getVal = (item: any, field?: string) => {
    if (!field) {
      return 'no';
    }
    if (item && item[field]) {
      const val = item[field];
      console.log(val);
      return JSON.stringify(val) || val;
    }
    return 'no';
  };
  const renderActions = () => {
    return <div className="fcenter mt15">{renderCreateFirstItem()}</div>;
  };

  return !data.length ? (
    <div className="no-data">
      {/* <div className="mt10">Nu s-au gasit date</div> */}
      <div className="mt10">
        <div
          className="mt10 bold fcenter"
          style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '50px' }}
        >
          Adaugare Inregistrare
        </div>
        {renderActions()}
      </div>
    </div>
  ) : (
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
                  {header.body ? header.body(item) : getVal(item, header.field)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCardRenderer;
