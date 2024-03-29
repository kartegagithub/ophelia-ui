import BaseField from "./baseField";
import Number from "../Inputs/Number";
export default class NumericField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Number {...this.GetProps()} />;
    }
  }