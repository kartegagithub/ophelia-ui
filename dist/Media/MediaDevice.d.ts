export declare class MediaListener {
    OnMediaStreamReceived?: ((stream?: MediaStream) => void);
    OnMediaStreamRemoved?: (() => void);
    OnMediaError?: ((type: string, message: any) => void);
}
export default class MediaDevice {
    Stream?: MediaStream;
    Listener: MediaListener;
    constructor(listener: MediaListener);
    GetDevices(kind?: "audioinput" | "audiooutput" | "videoinput"): Promise<MediaDeviceInfo[]>;
    GetSupportedConstraints(): MediaTrackSupportedConstraints;
    OnError(type: string, message: any): void;
    GetDisplayMedia(options?: {
        audio?: boolean;
        video?: boolean;
    }): Promise<any>;
    GetUserMedia(constraints?: MediaStreamConstraints): Promise<any>;
}
