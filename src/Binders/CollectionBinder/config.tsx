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
  ChildBinderContainer?: "modal" | "drawer" = "drawer";
  HideSelectAll?: boolean = false
  HierarchicalDisplay?: boolean = false
  HierarchyPropertyName?: string = ""
  HierarchyParentValue?: string = ""
  beforeSendRequest? = (data: any) => {
    return data;
  }
  onRowSelectionChange? = (selectedRowKeys: Array<number>, selectedRows: Array<any>) => {

  }
  constructor(){
    
  }
}
