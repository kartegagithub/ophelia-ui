import BaseField from "./baseField";
import TextArea from "../Inputs/TextArea";
export default class TextAreaField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <TextArea {...this.GetProps()} />;
    }
  }