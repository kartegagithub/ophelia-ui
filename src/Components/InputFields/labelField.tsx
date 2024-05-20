import { getFormattedDateString, isValidDate } from "../../Extensions";
import Label from "../Label";
import BaseField from "./baseField";
export default class LabelField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    defaultValue?: string,
    listener?: any
  }>{
    
    renderInput(){
        const {value, defaultValue, ...pureProps} = this.GetProps()
        var valueToShow = value ?? defaultValue;
        if (isValidDate(valueToShow)) {
          valueToShow = getFormattedDateString(value, this.props.format, this.props.type);
        }
        return <Label {...pureProps}>{valueToShow}</Label>;
    }
  }