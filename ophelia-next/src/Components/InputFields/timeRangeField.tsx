import BaseField from "./baseField";
import { TimeRangeInput } from "../Inputs";
export default class TimeRangeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    lowValue?: string,
    highValue?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <TimeRangeInput lowValue={this.props.lowValue} highValue={this.props.highValue} {...this.GetProps()} />;
    }
  }