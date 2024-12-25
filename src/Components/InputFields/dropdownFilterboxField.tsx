import FilterboxInput from "../Inputs/FilterboxInput";
import BaseField from "./baseField";
export default class DropdownFilterboxField<P> extends BaseField<
  P & {
    name: string;
    valueName?: string;
    text?: string;
    value?: string;
    placeholder?: string;
    allowNew?: boolean;
    newTextInputClassName?: string;
    newTextInputPlaceholder?: string;
    remoteDataSource?: {
        ExtraFilters?: any
        DisplayProp?: string,
        ValueProp?: string,
        Hooks?: any,
        CallFunction: (input: string, page: number, pageSize: number, extraFilters?: any) => Promise<any>
    },
    displayProp?: string
    valueProp?: string
    listener?: any,
    multiple?:boolean
    allowClear?: boolean
    hideSelections?: boolean
    dropDownDefaultOpen?: boolean
    optionTemplateFn?: (item: any) => React.JSX.Element;
  }> {

  constructor(props: any){
    super(props)
  }

  Searching: boolean = false;
  onSearch = (input?: string, page: number = 1) => {
    if(!this.Searching && this.props.remoteDataSource && this.props.remoteDataSource.CallFunction){
      this.Searching = true;
      var data = this.props.remoteDataSource.CallFunction(input ?? "", page, 10, this.props.remoteDataSource.ExtraFilters); 
      this.Searching = false;
      return data;
    }
    return undefined
  };
  renderInput() {
    var props = this.GetProps();
    var pureProps = (({ value, defaultValue, displayProp, valueProp,  remoteDataSource, ...others }) => others)(props)
    return <FilterboxInput 
     hooks={this.props.remoteDataSource?.Hooks}
     alwaysOpen={this.props.dropDownDefaultOpen}
     hideSelections={this.props.hideSelections}
     optionTemplateFn={this.props.optionTemplateFn}
     displayProp={this.props.displayProp ?? this.props.remoteDataSource?.DisplayProp ?? "name"}
     valueProp={this.props.valueProp ?? this.props.remoteDataSource?.ValueProp ?? "id"}
     dropDownDisplayProp={this.props.remoteDataSource?.DisplayProp ?? this.props.displayProp ?? "name"}
     dropDownValueProp={this.props.remoteDataSource?.ValueProp ?? this.props.valueProp ?? "id"}
     {...pureProps} 
     searchFn={(key, page) => this.onSearch(key, page)} 
     options={[]} 
     defaultValue={props.defaultValue}
     dropDownDefaultOpen={this.props.dropDownDefaultOpen}/>;
  }
}