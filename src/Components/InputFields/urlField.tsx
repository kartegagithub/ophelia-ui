import BaseField from "./baseField";
import URLInput from "../Inputs/URLInput";
export default class URLField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <URLInput {...this.GetProps()} />;
    }
  }