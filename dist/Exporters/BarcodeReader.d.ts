/// <reference types="react" />
import { BrowserMultiFormatReader, Result } from '@zxing/library';
export declare class ClientBarcodeReader {
    onResult?: ((text: string, format: any) => void);
    onError?: ((error: any) => void);
    Reader?: BrowserMultiFormatReader;
    VideoElement?: React.RefObject<HTMLVideoElement>;
    constructor(videoElement?: React.RefObject<HTMLVideoElement>);
    OnError(error: any): void;
    OnResult(result?: Result): void;
    OnCancel(): void;
    Detect: () => Promise<void>;
    Destroy(): void;
}
