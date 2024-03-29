import BaseField from "./baseField";
import AsyncSelect from 'react-select/async';
import { defaultProps } from "react-select/base";
export default class FilterBoxField<P> extends BaseField<
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
  } & typeof defaultProps> {

  constructor(props: any){
    super(props)
  }

  Searching: boolean = false;
  promiseOptions = (input: string, callback: (options: any[]) => void) => {
    if(!this.Searching && callback && this.props.remoteDataSource && this.props.remoteDataSource.CallFunction){
      this.Searching = true;
      var result = this.props.remoteDataSource.CallFunction(input, 1, 10);
      result.then((data) => {
        var valueProp = this.props.remoteDataSource?.ValueProp ?? this.props.valueProp ?? "id";
        var displayProp = this.props.remoteDataSource?.DisplayProp ?? this.props.displayProp ?? "name";
        data = data.map((item: any) => { return {label: item[displayProp], value: item[valueProp]}})
        callback(data);
        this.Searching = false;
      }); 
    }
  };
  renderInput() {
    var props = this.GetProps();
    var pureProps = (({ options, displayProp, multiple, valueProp, value, defaultValue, remoteDataSource, ...others }) => others)(props)
    return <AsyncSelect isMulti={this.props.isMulti ?? this.props.multiple} defaultValue={props.value} {...pureProps} cacheOptions defaultOptions loadOptions={(input, callback) => this.promiseOptions(input, callback)} />;
  }
}