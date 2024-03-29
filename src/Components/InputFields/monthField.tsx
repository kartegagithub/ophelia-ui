import BaseField from "./baseField";
import MonthInput from "../Inputs/MonthInput";
export default class MonthField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <MonthInput {...this.GetProps()} />;
    }
  }