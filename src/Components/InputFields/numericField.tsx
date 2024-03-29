import BaseField from "./baseField";
import NumberInput from "../Inputs/NumberInput";
export default class NumericField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <NumberInput {...this.GetProps()} />;
    }
  }