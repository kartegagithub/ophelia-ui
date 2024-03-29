import BaseField from "./baseField";
import Image from "../Image/Image";
export default class ImageField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <Image src={this.GetValue()} {...this.GetProps()} />;
    }
  }