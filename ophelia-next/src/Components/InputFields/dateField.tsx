import BaseField from "./baseField";
import DateInput from "../Inputs/DateInput";
export default class DateField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <DateInput {...this.GetProps()} />;
    }
  }