import BaseField from "./baseField";
import RangeInput from "../Inputs/RangeInput";
export default class RangeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <RangeInput {...this.GetProps()} />;
    }
  }