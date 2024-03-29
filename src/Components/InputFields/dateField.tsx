import BaseField from "./baseField";
import Date from "../Inputs/Date";
export default class DateField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Date {...this.GetProps()} />;
    }
  }