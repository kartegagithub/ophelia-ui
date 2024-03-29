import BaseField from "./baseField";
import Week from "../Inputs/Week";
import File from "../Inputs/File";
export default class FileField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <File {...this.GetProps()} />;
    }
  }