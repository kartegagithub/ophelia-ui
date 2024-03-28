export default class QueryFilter {
  name: string = "";
  left?: QueryFilter;
  right?: QueryFilter;
  constraint: DataConstraint = 0;
  value: any;
  value2: any;
  comparison: DataComparison = 0;
  constructor() {
    
  }
}
export enum DataConstraint{
  And = 0,
  Or = 1
}
export enum DataComparison {
    Equal = 0,
    Different = 1,
    Greater = 2,
    Less = 3,
    GreaterOrEqual = 4,
    LessOrEqual = 5,
    In = 6,
    Between = 7,
    StartsWith = 8,
    EndsWith = 9,
    Contains = 10,
    Exists = 11,
    ContainsFTS = 12
}