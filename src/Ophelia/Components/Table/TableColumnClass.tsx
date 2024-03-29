import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";

export default class TableColumnClass{
    Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea"| "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image" = "text"
    PropertyName?: string = ""
    DataSource? : Array<any> | Function = undefined;
    HeaderText?: string = ""
    Format?: string = ""
    TextFormatter?: Function = (text: string) => text;
    Freeze?: boolean = false
    DisplayOrder?: number = 0
    Visible?: boolean = true
    AllowSorting?: boolean = true
    AllowFiltering?: boolean = true
    AllowEditing?: boolean = false
    IsSorted?: boolean = false
    SortDirection?: string = ""
    IsFiltered?: boolean = false
    MaxTextLength?: number = 0
    Checkboxes?: boolean = false
    Filtering?: {
        Type?: "text" | "file" | "month" | "week" | "url" | "phone" | "textarea"| "richtext" | "password" | "enum" | "email" | "numeric" | "filterbox" | "selectbox" | "date" | "time" | "datetime" | "checkbox" | "radio" | "range" | "image",
        Name?: string,
        EnumSelectionType?: any,
        Value?: any
        Comparison?: DataComparison
        RemoteDataSource?: {
            DisplayProp?: string,
            ValueProp?: string,
            CallFunction?: Function
        }
    } = { Type: "text", RemoteDataSource: { DisplayProp: "name", ValueProp: "id" }}
}