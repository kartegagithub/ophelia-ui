import BaseField from "./baseField";
import WeekInput from "../Inputs/WeekInput";
export default class WeekField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <WeekInput {...this.GetProps()} />;
    }
  }