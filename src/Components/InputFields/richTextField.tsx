import BaseField from "./baseField";
import RichText from "../Inputs/RichText";
export default class RichTextField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <RichText {...this.GetProps()} />;
    }
  }