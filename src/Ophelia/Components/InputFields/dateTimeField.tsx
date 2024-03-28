import BaseField from "./baseField";
import DateTime from "../Inputs/DateTime";
export default class DateTimeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <DateTime {...this.GetProps()} />;
    }
  }