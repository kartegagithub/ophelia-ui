import BaseField from "./baseField";
import RichTextInput from "../Inputs/RichTextInput";
export default class RichTextField<P> extends BaseField<P & {
    name: string,
    text?: string,
    value?: string,
    listener?: any,
    imageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => Promise<string | undefined>)
  }>{
    renderInput(){
        return <RichTextInput {...this.GetProps()} />;
    }
  }