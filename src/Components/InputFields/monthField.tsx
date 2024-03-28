import BaseField from "./baseField";
import Month from "../Inputs/Month";
export default class MonthField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Month {...this.GetProps()} />;
    }
  }