import TableClass from "../../Components/Table/TableClass";
import QueryData from "./query/queryData";

export default class Config {
  Key?: number = Math.random() * (10000 - 1) + 1
  Entity?: string = ""
  Schema?: string = ""
  DataSourcePath?: string = ""
  PageSize: number = 25
  Query?: QueryData = new QueryData()
  Component?: any
  AjaxBinder?: boolean = false
  Table?: TableClass = new TableClass()
  RowSelection?: string = "";
  RowClickOption?: "navigate" | "showEntityBinder";
  HideSelectAll?: boolean = false
  beforeSendRequest? = (data: any) => {
    return data;
  }
  onRowSelectionChange? = (selectedRowKeys: Array<number>, selectedRows: Array<any>) =>{

  }
  constructor(){
    
  }
}
