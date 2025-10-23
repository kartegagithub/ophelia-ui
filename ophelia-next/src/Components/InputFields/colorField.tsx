import BaseField from "./baseField";
import ColorInput from "../Inputs/ColorInput";
export default class ColorField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <ColorInput {...this.GetProps()} />;
    }
  }