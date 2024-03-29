import { enumToArray } from "../../Extensions/ReflectionExtensions";
import SelectInput from "../Inputs/SelectInput";
import BaseField from "./baseField";
export default class EnumSelectBoxField<P> extends BaseField<
  P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    options: Array<{ text: string; value: string }>;
    enumSelectionType?: any
    listener?: any
    translateFn?: (key: string) => string
  }
> {
  renderInput() {
    var options: Array<{ text: string; value: string }> = this.props.options;
    var displayProp = (this.props as any).displayProp;
    var valueProp = (this.props as any).valueProp;
    var otherProps = (({ options, displayProp, valueProp, ...others }) => others)(this.GetProps())
    if(this.props.enumSelectionType && !this.props.options){
      options = enumToArray(this.props.enumSelectionType, this.props.translateFn)
      options.splice(0, 0, { text: "", value: ""})
      displayProp = "text";
      valueProp = "value"
    }
    return <SelectInput displayProp={displayProp} valueProp={valueProp} options={options} {...otherProps} />;
  }
}