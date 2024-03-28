import BaseField from "./baseField";
import Email from "../Inputs/Email";
export default class EmailField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Email {...this.GetProps()} />;
    }
  }