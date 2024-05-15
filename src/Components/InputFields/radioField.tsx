import RadioInput from "../Inputs/RadioInput";
import BaseField from "./baseField";
export default class RadioField<P> extends BaseField<
  P & {
    name: string;
    text?: string;
    value?: string;
    listener?: any;
  }
> {
  renderInput() {
    return <RadioInput {...this.GetProps()} />;
  }
}
