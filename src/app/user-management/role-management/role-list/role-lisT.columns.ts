import {TableColumn} from 'src/app/shared/components/table/table-column'
import { RoleMasterFields} from '../role-management.field'

export const ROLE_MASTER_COLUMNS: TableColumn[] = [
  {
    name: RoleMasterFields.ROLE_NAME,
    dataKey: ['name'],
    position: 'left',
    isSortable: true
  },
  {
    name: RoleMasterFields.ROLE_TYPE,
    dataKey: ['type'],
    position: 'left',
    isSortable: true
  },
  {
    name: RoleMasterFields.STATUS,
    dataKey: ['status'],
    position: 'left',
    isSortable: true
  },
];

// Define a type alias for COMMON_COLUMNS
export type RoleMasterColumnsType = typeof ROLE_MASTER_COLUMNS;

