import BaseField from "./baseField";
import PhoneInput from "../Inputs/PhoneInput";
export default class PhoneField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <PhoneInput {...this.GetProps()} />;
    }
  }