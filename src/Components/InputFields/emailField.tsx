import BaseField from "./baseField";
import EmailInput from "../Inputs/EmailInput";
export default class EmailField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <EmailInput {...this.GetProps()} />;
    }
  }