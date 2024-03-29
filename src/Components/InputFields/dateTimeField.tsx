import BaseField from "./baseField";
import DateTimeInput from "../Inputs/DateTimeInput";
export default class DateTimeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <DateTimeInput {...this.GetProps()} />;
    }
  }