import Checkbox from "../Inputs/Checkbox";
import BaseField from "./baseField";
export default class BoolField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Checkbox {...this.GetProps()} />;
    }
  }