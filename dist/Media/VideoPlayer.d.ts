export declare class VideoPlayerProps {
    disablePictureInPicture?: boolean;
    playsInline?: boolean;
    poster?: string;
    disableremoteplayback?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: "none" | "metadata" | "auto" | "";
    src?: string;
    srcType?: string;
    isLiveStream?: boolean;
}
declare var eventType: "abort" | "canplay" | "canplaythrough" | "durationchange" | "emptied" | "encrypted" | "ended" | "error" | "interruptbegin" | "interruptend" | "loadeddata" | "loadedmetadata" | "loadstart" | "mozaudioavailable" | "pause" | "play" | "playing" | "progress" | "ratechange" | "seeked" | "seeking" | "stalled" | "suspend" | "timeupdate" | "volumechange" | "waiting";
export declare type VideoElementEvent = typeof eventType;
export declare class VideoPlayerListener {
    onVideoError?: ((error: any) => void);
    onVideoEvent?: ((e: any) => void);
}
export default class VideoPlayer {
    VideoElem: HTMLVideoElement;
    Listener: VideoPlayerListener;
    IsLiveStream: boolean;
    Events: Array<VideoElementEvent>;
    constructor(videoElem: HTMLVideoElement, listener: VideoPlayerListener, props?: VideoPlayerProps);
    RegisterEvents(): void;
    UnregisterEvents(): void;
    OnEvent(e: any): void;
    SetSource(src: string, type?: string): Promise<void>;
    CanPlayType(type: string): any;
    Play(): Promise<any>;
    OnError(error: any): void;
    GetVideoPlaybackQuality(): any;
    Pause(): any;
    GetDuration(): any;
    Seek(timeToSeek: number): void;
    Stop(afterBehaviour?: "none" | "seekToBeginning" | "destroySource"): any;
}
export {};
