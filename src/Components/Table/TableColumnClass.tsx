import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";

export default class TableColumnClass{
    Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea"| "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image" = "text"
    PropertyName?: string = ""
    DataSource? : Array<any> | Function = undefined;
    HeaderText?: string = ""
    Format?: string = ""
    TextFormatter?: Function = (text: string, row?: any, column?: TableColumnClass) => text;
    OnAfterSetData?: (row: any, value: any, field: any, rawValue?: any) => void;
    OnBeforeSetData?: (row: any, name: string, value: any, field: any, isValid: boolean) => undefined;
    Freeze?: boolean = false
    DisplayOrder?: number = 0
    Visible?: boolean | Function = true
    AllowSorting?: boolean = true
    AllowFiltering?: boolean = true
    AllowEditing?: boolean = false
    AllowSummarize?: boolean = false
    AllowEditingOnNewRow?: boolean = true
    InputProps?: any = undefined
    IsSorted?: boolean = false
    SortDirection?: string = ""
    SortOrder?: number  = 0
    Width?: string  = ""
    IsFiltered?: boolean = false
    MaxTextLength?: number = 100
    Checkboxes?: boolean = false
    I18n?: boolean = false
    CellDisplayProp?: string = ""
    CellValueProp?: string = ""
    Filtering?: {
        Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea"| "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image",
        Name?: string,
        EnumSelectionType?: any,
        Value?: any
        LowValue?: any
        HighValue?: any
        ValueName?: string
        Comparison?: DataComparison
        MultipleSelection?: boolean
        RemoteDataSource?: {
            ExtraFilters?: any | ((row: any) => any)
            DisplayProp?: string,
            ValueProp?: string,
            CallFunction?: Function
        }
    } = { Type: "text", RemoteDataSource: { DisplayProp: "name", ValueProp: "id" }}
}