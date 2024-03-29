import BaseField from "./baseField";
import RichTextInput from "../Inputs/RichTextInput";
export default class RichTextField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <RichTextInput {...this.GetProps()} />;
    }
  }