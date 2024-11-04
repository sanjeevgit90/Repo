import {TableColumn} from 'src/app/shared/components/table/table-column'

export const DESIGNATION_COLUMNS: TableColumn[] = [
  {
      name: 'Designation Name',
      dataKey: ['name'],
      position: 'left',
      isSortable: true
  },
];

// Define a type alias for COMMON_COLUMNS
export type DesignationColumnsType = typeof DESIGNATION_COLUMNS;
