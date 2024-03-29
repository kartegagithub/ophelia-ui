import BaseField from "./baseField";
import TextAreaInput from "../Inputs/TextAreaInput";
export default class TextAreaField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <TextAreaInput {...this.GetProps()} />;
    }
  }