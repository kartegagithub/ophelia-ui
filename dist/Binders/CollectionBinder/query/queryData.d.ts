import TableColumnClass from "../../../Components/Table/TableColumnClass";
import QueryDataModel from "./queryDataModel";
import QueryFilter from "./queryFilter";
import QuerySorter from "./querySorter";
export default class QueryData {
    model: QueryDataModel;
    constructor();
    processQuery(columns: Array<TableColumnClass>, filters: any, sorter: QuerySorter): {
        queryData: QueryDataModel;
    } | null;
    applyFilter(filterToApply: QueryFilter): void;
}
