import {TableColumn} from 'src/app/shared/components/table/table-column'
import { UserFields } from '../user.fields';

export const USER_COLUMNS: TableColumn[] = [
    {
        name: UserFields.NAME,
        dataKey: ['name'],
        position: 'left',
        isSortable: true
    },
    {
      name: UserFields.DESIGNATION,
      dataKey: ['designation'],
      position: 'center',
      isSortable: true
    },
    {
        name: UserFields.EMAIL,
        dataKey: ['email'],
        position: 'center',
        isSortable: true
    },
    {
        name: UserFields.MOBILE_NO,
        dataKey: ['mobile'],
        position: 'left',
        isSortable: true
    },
    {
        name: UserFields.STATUS,
        dataKey: ['status'],
        position: 'left',
        isSortable: false
    }
];

// Define a type alias for COMMON_COLUMNS
export type UsersColumnsType = typeof USER_COLUMNS;
