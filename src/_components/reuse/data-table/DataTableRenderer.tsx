// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

import { useBetween } from '../../../hooks/useBetween';
import useScreenSize from '../../../hooks/useScreenSize';
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
  renderCreateFirstItem,
}: MyDataTableProps) => {
  const { width } = useBetween(useScreenSize);

  const isObject = (value) => {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    );
  };
  const getVal = (item: any, field?: string) => {
    if (!field) {
      return 'no';
    }
    if (item && item[field]) {
      const val = item[field];
      console.log(val);
      return isObject(val) ? JSON.stringify(val) : val;
    }
    return 'no';
  };

  const renderActions = () => {
    return <div className="fcenter mt15">{renderCreateFirstItem()}</div>;
  };

  return !data.length ? (
    <div className="mt10">
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
    <div
      className="hscroll mt10"
      key={Math.random()}
      style={{ maxWidth: '800px' }}
    >
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
                  {header.body ? header.body(item) : getVal(item, header.field)}
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
