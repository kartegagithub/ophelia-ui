import BaseField from "./baseField";
import TimeInput from "../Inputs/TimeInput";
export default class TimeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <TimeInput {...this.GetProps()} />;
    }
  }