import { insertToIndex } from "../../Extensions/ArrayExtensions";
import { enumToArray } from "../../Extensions/ReflectionExtensions";
import SelectInput from "../Inputs/SelectInput";
import BaseField from "./baseField";
export default class EnumSelectBoxField<P> extends BaseField<
  P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    options?: Array<{ text: string; value: string }>;
    enumSelectionType?: any
    listener?: any
    translateFn?: (key: string) => string
  }
> {
  renderInput() {
    var options: Array<{ text: string; value: string }> = this.props.options ?? [];
    var displayProp = (this.props as any).displayProp;
    var valueProp = (this.props as any).valueProp;
    var otherProps = (({ options, displayProp, translateFn, placeholder, enumSelectionType, valueProp, ...others }) => others)(this.GetProps())
    if(this.props.enumSelectionType && !this.props.options){
      options = enumToArray(this.props.enumSelectionType, this.props.translateFn)
      if(this.props.placeholder) {
        var placeholder: string = this.props.placeholder ?? "";
        if(this.props.translateFn) placeholder = this.props.translateFn(placeholder)
        insertToIndex(options, 0, { text: "", value: placeholder})
      }
      displayProp = "text";
      valueProp = "value"
    }
    return <SelectInput displayProp={displayProp} valueProp={valueProp} options={options} {...otherProps} />;
  }
}