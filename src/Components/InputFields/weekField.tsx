import BaseField from "./baseField";
import Week from "../Inputs/Week";
export default class WeekField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    format?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Week {...this.GetProps()} />;
    }
  }