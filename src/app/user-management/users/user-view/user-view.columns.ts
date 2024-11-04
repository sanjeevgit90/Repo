import { TableColumn } from 'src/app/shared/components/table/table-column';
import { UserFields } from '../user.fields';

export const USER_VIEW_COLUMNS: TableColumn[] = [
  {
    name: "GLOBAL_SR_NO",
    dataKey: ['srno'],
    position: 'left',
    isSortable: true,
  },
  {
    name: "GLOBAL_SCHEME",
    dataKey: ['schemeName'],
    position: 'left',
    isSortable: true,
  },
  {
    name: "GLOBAL_PROJECT",
    dataKey: ['projectName'],
    position: 'left',
    isSortable: true,
  },
  {
    name: "GLOBAL_LEVEL_OFFICE_TYPE",
    dataKey: ['officeLevelType'],
    position: 'left',
    isSortable: true,
  },
  {
    name: "GLOBAL_OFFICE",
    dataKey: ['officeLevelType'],
    position: 'left',
    isSortable: true,
  },
  {
    name: "GLOBAL_ROLE",
    dataKey: ['officeLevelType'],
    position: 'left',
    isSortable: true,
  },
];

// Define a type alias for COMMON_COLUMNS
export type UserViewColumnsType = typeof USER_VIEW_COLUMNS;
