import BaseField from "./baseField";
import Phone from "../Inputs/Phone";
export default class PhoneField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Phone {...this.GetProps()} />;
    }
  }