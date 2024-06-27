import BaseField from "./baseField";
import TextInput from "../Inputs/TextInput";
export default class TextField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any,
    isDate?: boolean
  }>{
    
    renderInput(){
        return <TextInput isDate={this.props.isDate} {...this.GetProps()} />;
    }
  }