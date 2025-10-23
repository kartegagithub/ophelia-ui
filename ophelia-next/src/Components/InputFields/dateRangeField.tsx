import BaseField from "./baseField";
import { DateRangeInput } from "../Inputs";
export default class DateRangeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    lowValue?: string,
    highValue?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <DateRangeInput lowValue={this.props.lowValue} highValue={this.props.highValue} {...this.GetProps()} />;
    }
  }