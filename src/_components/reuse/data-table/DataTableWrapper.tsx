// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { utils } from '../../_utils/utils';
// import { useState } from 'react';

import { useBetween } from '../../../hooks/useBetween';
import useScreenSize from '../../../hooks/useScreenSize';
import DataCardRenderer from './DataCardRenderer';
import DataTableRenderer from './DataTableRenderer';

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
  const { width } = useBetween(useScreenSize);
  return width < 768 ? (
    <DataCardRenderer
      data={data}
      fieldHeader={fieldHeader}
      onRowClick={onRowClick}
      renderDefaultActions={renderDefaultActions}
    ></DataCardRenderer>
  ) : (
    <DataTableRenderer
      data={data}
      fieldHeader={fieldHeader}
      onRowClick={onRowClick}
      renderDefaultActions={renderDefaultActions}
    ></DataTableRenderer>
  );
};

export default DataTableWrapper;
