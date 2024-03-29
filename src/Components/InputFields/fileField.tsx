import BaseField from "./baseField";
import FileInput from "../Inputs/FileInput";
export default class FileField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any
  }>{
    
    renderInput(){
        return <FileInput {...this.GetProps()} />;
    }
  }