import CheckboxInput from "../Inputs/CheckboxInput";
import BaseField from "./baseField";
export default class BoolField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <CheckboxInput {...this.GetProps()} />;
    }
  }