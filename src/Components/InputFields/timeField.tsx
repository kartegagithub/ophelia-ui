import BaseField from "./baseField";
import Time from "../Inputs/Time";
export default class TimeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Time {...this.GetProps()} />;
    }
  }