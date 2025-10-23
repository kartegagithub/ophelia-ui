import TableClass from "../../Components/Table/TableClass";
import QueryData from "./query/queryData";

export default class Config {
  Entity?: string = ""
  Schema?: string = ""
  DataSourcePath?: string = ""
  PageSize?: number = 25
  Query?: QueryData = new QueryData()
  Table?: TableClass = new TableClass()
  RowSelection?: string = "";
  RowClickOption?: "navigate" | "showEntityBinder" | undefined = undefined;
  NewEntityMethod?: "Default" | "Row" = "Default";
  NewEntityLocation?: "Beginning" | "End" = "Beginning"
  SaveActionType?: "EnterKey" | "SaveButtonClick" = "EnterKey"
  SaveOnCellValueChange?: boolean = false
  ChildBinderContainer?: "modal" | "drawer" = "drawer";
  Checkboxes?: boolean = false
  HideSelectAll?: boolean = false
  HierarchicalDisplay?: boolean = false
  StickyHeader?: boolean = false
  HierarchyPropertyName?: string = ""
  HierarchyParentValue?: string = ""
  EmptyColumnSelection?: "Both" | "Beginning" | "End" | "None" = "None"
  SortingMethod?: "Server" | "Client" = "Server"
  FilteringMethod?: "Server" | "Client" = "Server"
  PaginationMethod?: "Server" | "Client" = "Server"  
  beforeSendRequest? = (data: any) => {
    return data;
  }
  onRowSelectionChange? = (selectedRowKeys: Array<number>, selectedRows: Array<any>) => {

  }
  constructor(){
    
  }
}
