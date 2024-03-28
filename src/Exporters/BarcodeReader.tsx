import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat, Result } from '@zxing/library';

export class ClientBarcodeReader {
    onResult?: ((text: string, format: any) => void)
    onError?: ((error: any) => void)
    Reader?:BrowserMultiFormatReader
    VideoElement?: React.RefObject<HTMLVideoElement>
    constructor(videoElement?: React.RefObject<HTMLVideoElement>){
        if(videoElement) this.VideoElement = videoElement
    }
    OnError(error: any){
        if(this.onError) this.onError(error)
        this.Destroy();
        console.log("ClientBarcodeReader:OnError", error.name)
    }
    OnResult(result?: Result){
        if(this.onResult && result) this.onResult(result.getText(), result.getBarcodeFormat())
        if(this.onResult && !result) this.onResult("", 0)
        this.Destroy();
        console.log("ClientBarcodeReader:OnResult", result)
    }
    OnCancel(){
        this.OnResult(undefined)     
        this.Destroy();   
    }
    Detect = async () => {
        if(!this.VideoElement || !this.VideoElement.current) return;
        const hints = new Map();
        const enabledFormats = [BarcodeFormat.UPC_A, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
        hints.set(DecodeHintType.POSSIBLE_FORMATS, enabledFormats);
        this.Reader = new BrowserMultiFormatReader(hints);
        this.Reader.decodeFromConstraints(
            {
              audio: false,
              video: true
            },
            this.VideoElement.current,
            (result, error) => {
              if (result) this.OnResult(result);
              //if (error) this.OnError(error);
            }
          ).catch((error) => {
            this.OnError(error)
          });
    }
    Destroy(){
        this.Reader?.reset();
        this.Reader = undefined
    }
}