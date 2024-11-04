import {TableColumn} from 'src/app/shared/components/table/table-column'
import { MenuMasterFields} from '../menu-creation.fields'

export const MENU_MASTER_COLUMNS: TableColumn[] = [
  {
    name: MenuMasterFields.MENU_NAME,
    dataKey: ['name'],
    position: 'left',
    isSortable: true
  },
  {
    name: MenuMasterFields.MENU_URL,
    dataKey: ['url'],
    position: 'left',
    isSortable: true
  },
  {
    name: MenuMasterFields.MENU_TYPE,
    dataKey: ['type'],
    position: 'left',
    isSortable: true
  },
  {
    name: MenuMasterFields.PRIMARY_MENU_TYPE,
    dataKey: ['primaryMenuType'],
    position: 'left',
    isSortable: true
  },
  {
    name: MenuMasterFields.STATUS,
    dataKey: ['status'],
    position: 'left',
    isSortable: true
  },
];

// Define a type alias for COMMON_COLUMNS
export type MenuMasterColumnsType = typeof MENU_MASTER_COLUMNS;

