import QueryFilter from "./queryFilter";
import QuerySorter from "./querySorter";
export default class QueryDataModel {
    filter?: QueryFilter;
    sorters: QuerySorter[];
}
