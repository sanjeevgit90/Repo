import {TableColumn} from 'src/app/shared/components/table/table-column';
import {LanguageListField} from '../language.field';

export const LANG_COLUMNS: TableColumn[]=[
    {
        name: LanguageListField.MENU_CODE,
        dataKey :['menuCode'],
        position: 'left',
        isSortable: true
    },
    {
        name:LanguageListField.FIELD_ID,
        dataKey:['fieldid'],
        position:'left',
        isSortable:true
    },
    {
        name:LanguageListField.ENGLISH_TEXT,
        dataKey:['englishText'],
        position:'left',
        isSortable:true
    },
    {
        name:LanguageListField.HINDI_TEXT,
        dataKey:['hindiText'],
        position:'left',
        isSortable:true
    }

]

export type LangColumnsType = typeof LANG_COLUMNS;