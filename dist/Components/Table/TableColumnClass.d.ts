import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";
export default class TableColumnClass {
    Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea" | "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image";
    PropertyName?: string;
    DataSource?: Array<any> | Function;
    HeaderText?: string;
    Format?: string;
    TextFormatter?: Function;
    Freeze?: boolean;
    DisplayOrder?: number;
    Visible?: boolean;
    AllowSorting?: boolean;
    AllowFiltering?: boolean;
    AllowEditing?: boolean;
    IsSorted?: boolean;
    SortDirection?: string;
    IsFiltered?: boolean;
    MaxTextLength?: number;
    Checkboxes?: boolean;
    Filtering?: {
        Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea" | "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image";
        Name?: string;
        EnumSelectionType?: any;
        Value?: any;
        Comparison?: DataComparison;
        RemoteDataSource?: {
            DisplayProp?: string;
            ValueProp?: string;
            CallFunction?: Function;
        };
    };
}
