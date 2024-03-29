import Label from "../Label";
import BaseField from "./baseField";
export default class LabelField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    defaultValue?: string,
    listener?: any
  }>{
    
    renderInput(){
        const {value, defaultValue, ...pureProps} = this.GetProps()
        return <Label {...pureProps}>{value}</Label>;
    }
  }