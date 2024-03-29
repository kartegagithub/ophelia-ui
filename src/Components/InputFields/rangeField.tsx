import BaseField from "./baseField";
import Range from "../Inputs/Range";
export default class RangeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Range {...this.GetProps()} />;
    }
  }