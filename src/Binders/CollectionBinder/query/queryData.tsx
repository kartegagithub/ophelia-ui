import { isNullOrEmpty, isValidDate, pascalize } from "../../../Extensions";
import TableColumnClass from "../../../Components/Table/TableColumnClass";
import QueryDataModel from "./queryDataModel";
import QueryFilter, { DataComparison } from "./queryFilter";
import QuerySorter from "./querySorter";
import moment from "moment";

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
          var columnKey = key.replace("Low", "").replace("High", "");
          const column = columns.find((x: TableColumnClass) => x.Filtering?.Name === columnKey || x.Filtering?.ValueName === columnKey || x.PropertyName === columnKey);
          if(!column) continue;

          var fieldName = column.Filtering?.ValueName ?? column.Filtering?.Name ?? column.PropertyName;
          if (fieldName && !isNullOrEmpty(columnKey) && (!disabledFilters || disabledFilters.indexOf(columnKey) == -1)) {
            var internalFilter = new QueryFilter();
            internalFilter.name = columnKey;
            if(key.endsWith("Low")){
              internalFilter.value = filters[key];
              if(internalFilter.value && internalFilter.value.toString().indexOf("-") != internalFilter.value.toString().lastIndexOf("-")){
                internalFilter.value = moment(internalFilter.value + " 00:00:00").utc().toJSON();
              }
              internalFilter.comparison = DataComparison.GreaterOrEqual;
            }
            else if(key.endsWith("High")){
              internalFilter.value = filters[key];
              if(internalFilter.value && internalFilter.value.toString().indexOf("-") != internalFilter.value.toString().lastIndexOf("-")){
                internalFilter.value = moment(internalFilter.value + " 23:59:59").utc().toJSON();
              }
              internalFilter.comparison = DataComparison.LessOrEqual;
            }
            else{
              internalFilter.value = filters[key];
              internalFilter.comparison = column.Filtering?.Comparison ?? DataComparison.Equal;
            }
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
    if(filterToApply && !this.model.filter) {
      this.model.filter = filterToApply;
      return filterToApply;
    }
    if(!filterToApply && this.model.filter) return this.model.filter;

    var newFilter = new QueryFilter();
    newFilter.left = filterToApply;
    newFilter.right = this.model.filter;
    this.model.filter = newFilter;
  }
}
