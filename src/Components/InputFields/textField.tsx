import BaseField from "./baseField";
import Text from "../Inputs/Text";
export default class TextField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Text {...this.GetProps()} />;
    }
  }