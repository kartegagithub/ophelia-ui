import Filterbox from "../Inputs/Filterbox";
import BaseField from "./baseField";
export default class DropdownFilterboxField<P> extends BaseField<
  P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    remoteDataSource?: {
        DisplayProp?: string,
        ValueProp?: string,
        CallFunction: (input: string, page: number, pageSize: number) => Promise<any>
    },
    displayProp?: string
    valueProp?: string
    listener?: any,
    multiple?:boolean
    allowClear?: boolean
    hideSelections?: boolean
    dropDownDefaultOpen?: boolean
  }> {

  constructor(props: any){
    super(props)
  }

  Searching: boolean = false;
  onSearch = (input?: string) => {
    if(!this.Searching && this.props.remoteDataSource && this.props.remoteDataSource.CallFunction){
      this.Searching = true;
      var data = this.props.remoteDataSource.CallFunction(input ?? "", 1, 10); 
      this.Searching = false;
      return data;
    }
  };
  renderInput() {
    var props = this.GetProps();
    var pureProps = (({ value, defaultValue, displayProp, valueProp,  remoteDataSource, ...others }) => others)(props)
    return <Filterbox 
     hideSelections={this.props.hideSelections}
     displayProp={this.props.displayProp ?? this.props.remoteDataSource?.DisplayProp}
     valueProp={this.props.valueProp ?? this.props.remoteDataSource?.ValueProp}
     {...pureProps} 
     searchFn={(key) => this.onSearch(key)} 
     options={[]} 
     defaultValue={props.value} 
     dropDownDefaultOpen={this.props.dropDownDefaultOpen}/>;
  }
}