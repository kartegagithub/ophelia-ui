import BaseField from "./baseField";
import URL from "../Inputs/URL";
export default class URLField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <URL {...this.GetProps()} />;
    }
  }