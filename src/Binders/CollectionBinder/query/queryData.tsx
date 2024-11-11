import TableColumnClass from "../../../Components/Table/TableColumnClass";
import QueryDataModel from "./queryDataModel";
import QueryFilter, { DataComparison } from "./queryFilter";
import QuerySorter from "./querySorter";

export default class QueryData {
  model: QueryDataModel;
  constructor() {
    this.model = new QueryDataModel();
  }
  processQuery(columns: Array<TableColumnClass>, filters: any, sorter: QuerySorter, disabledFilters?: Array<string>) {
    //console.log(filters);
    var internalFilters = [];
    var internalSorters = [];
    if(filters){
      for (var key of Object.keys(filters)) {
        if (filters[key] && filters[key].length > 0) {
          const column = columns.find((x) => x.Filtering?.Name === key);
          if (column && column.Filtering?.Name && (!disabledFilters || disabledFilters.indexOf(key) == -1)) {
            var internalFilter = new QueryFilter();
            internalFilter.name = key;
            internalFilter.value = filters[key];
            internalFilter.comparison = column.Filtering?.Comparison ?? DataComparison.Equal;
            if(internalFilter.value && typeof internalFilter.value == "string") {
              if(internalFilter.value.startsWith("[") && internalFilter.value.endsWith("]")){
                internalFilter.value = JSON.parse(internalFilter.value)
              }
            }
            if(Array.isArray(internalFilter.value)){
              internalFilter.comparison = DataComparison.In;
            }
            internalFilters.push(internalFilter);
          }
        }
      }
    }
    
    if (sorter && sorter.name) {
      internalSorters.push(sorter);
    }

    if (internalSorters.length === 0 && internalFilters.length === 0)
      return null;

    this.model = new QueryDataModel();
    this.model.sorters = internalSorters;
    if (internalFilters.length > 0) {
      for (let i = 0; i < internalFilters.length; i++) {
        this.applyFilter(internalFilters[i]);
      }
    }
    return { queryData: this.model };
  }

  applyFilter(filterToApply: QueryFilter) {
    var newFilter = new QueryFilter();
    newFilter.left = filterToApply;
    newFilter.right = this.model.filter;
    this.model.filter = newFilter;
  }
}
