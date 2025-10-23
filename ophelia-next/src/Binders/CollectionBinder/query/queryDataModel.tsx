import QueryFilter from "./queryFilter";
import QueryFunction from "./queryFunction";
import QuerySorter from "./querySorter";

export default class QueryDataModel {
  filter?: QueryFilter;
  functions?: QueryFunction[] = [];
  sorters: QuerySorter[] = [];
}
