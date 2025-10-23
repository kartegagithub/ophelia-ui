import BaseField from "./baseField";
import CodeInput from "../Inputs/CodeInput";
export default class CodeField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <CodeInput {...this.GetProps()} />;
    }
  }