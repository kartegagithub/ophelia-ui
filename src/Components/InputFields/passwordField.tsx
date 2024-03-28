import BaseField from "./baseField";
import Password from "../Inputs/Password";
export default class PasswordField<P> extends BaseField<P & {
    name: string,
    text?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Password {...this.GetProps()} />;
    }
  }