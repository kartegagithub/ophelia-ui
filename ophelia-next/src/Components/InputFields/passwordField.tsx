import BaseField from "./baseField";
import PasswordInput from "../Inputs/PasswordInput";
export default class PasswordField<P> extends BaseField<P & {
    name: string,
    text?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <PasswordInput {...this.GetProps()} />;
    }
  }