import {TableColumn} from 'src/app/shared/components/table/table-column'

export const USER_COLUMNS: TableColumn[] = [
    {
        name: "New Sanction Amount",
        dataKey: ['sanctionAmount'],
        position: 'left',
        isSortable: true
    },
    {
        name: "Allocation Date",
        dataKey: ['allocationDate'],
        position: 'center',
        isSortable: true
    },
    {
        name: "Documents",
        dataKey: ['uploadPath'],
        position: 'center',
        isSortable: true
    },
    {
        name: "Status",
        dataKey: [''],
        position: 'center',
        isSortable: true
    },

];

export const SANSTHA_COLUMNS: TableColumn[] = [
    {
        name: "Remark",
        dataKey: ['remarks'],
        position: 'left',
        isSortable: true
    },
    {
        name: "Rejected By",
        dataKey: ['rejectedByName'],
        position: 'center',
        isSortable: true
    },
    {
        name: "Rejected At",
        dataKey: ['rejectedAt'],
        position: 'center',
        isSortable: true
    },

];

// Define a type alias for COMMON_COLUMNS
export type UsersColumnsType = typeof USER_COLUMNS;
