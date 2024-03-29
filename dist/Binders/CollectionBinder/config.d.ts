import TableClass from "../../Components/Table/TableClass";
import QueryData from "./query/queryData";
export default class Config {
    Key?: number;
    Entity?: string;
    Schema?: string;
    DataSourcePath?: string;
    PageSize: number;
    Query?: QueryData;
    Component?: any;
    AjaxBinder?: boolean;
    Table?: TableClass;
    RowSelection?: string;
    RowClickOption?: "navigate" | "showEntityBinder";
    HideSelectAll?: boolean;
    beforeSendRequest?: (data: any) => any;
    onRowSelectionChange?: (selectedRowKeys: Array<number>, selectedRows: Array<any>) => void;
    constructor();
}
