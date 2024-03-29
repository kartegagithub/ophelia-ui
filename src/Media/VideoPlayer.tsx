import { execInTry } from "../Extensions/ReflectionExtensions"

export class VideoPlayerProps{
    disablePictureInPicture?: boolean
    playsInline?: boolean
    poster?: string
    disableremoteplayback?: boolean
    loop?: boolean
    muted?: boolean
    preload?: "none" | "metadata" | "auto" | "" = "auto"
    src?: string
    srcType?: string
    isLiveStream?: boolean
}
var eventType: "abort" | "canplay" | "canplaythrough" | "durationchange" | "emptied" | "encrypted" | "ended" | "error" | "interruptbegin" | "interruptend" | "loadeddata" | "loadedmetadata" | "loadstart" | "mozaudioavailable" | "pause" | "play" | "playing" | "progress" | "ratechange" | "seeked" | "seeking" | "stalled" | "suspend" | "timeupdate" | "volumechange" | "waiting";
export type VideoElementEvent = typeof eventType

export class VideoPlayerListener{
    onVideoError?: ((error: any) => void)
    onVideoEvent?: ((e: any) => void)
}
export default class VideoPlayer{
    VideoElem: HTMLVideoElement
    Listener: VideoPlayerListener
    IsLiveStream: boolean
    Events: Array<VideoElementEvent> = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "interruptbegin", "interruptend", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"]
    constructor(videoElem: HTMLVideoElement, listener: VideoPlayerListener, props?: VideoPlayerProps){
        this.VideoElem = videoElem;
        this.Listener = listener
        this.IsLiveStream = false;
        if(props){
            this.IsLiveStream = props.isLiveStream === true;
            if(props.disablePictureInPicture != undefined) (this.VideoElem as any).disablePictureInPicture = props.disablePictureInPicture
            if(props.playsInline != undefined) (this.VideoElem as any).playsInline = props.playsInline
            if(props.poster != undefined) (this.VideoElem as any).poster = props.poster 
            if(props.disableremoteplayback != undefined) (this.VideoElem as any).disableRemotePlayback = props.disableremoteplayback 
            if(props.loop != undefined) (this.VideoElem as any).loop = props.loop 
            if(props.muted != undefined) (this.VideoElem as any).muted = props.muted 
            if(props.preload != undefined) (this.VideoElem as any).preload = props.preload
            if(props.src) this.SetSource(props.src, props.srcType)
        }
        this.RegisterEvents()
    }
    
    RegisterEvents(){
        for (let index = 0; index < this.Events.length; index++) {
            const event = this.Events[index];
            this.VideoElem.addEventListener(event, (e) => { this.OnEvent(e)}, false)
        }
    }
    UnregisterEvents(){
        for (let index = 0; index < this.Events.length; index++) {
            const event = this.Events[index];
            this.VideoElem.removeEventListener(event, (e) => { this.OnEvent(e)}, false)
        }
    }
    OnEvent(e: any){
        this.Listener.onVideoEvent && this.Listener.onVideoEvent(e);
    }
    async SetSource(src: string, type?:string){
        var srcElem = new HTMLSourceElement();
        srcElem.src = src;
        if(type) srcElem.type = type;
        this.VideoElem.innerHTML = ""
        this.VideoElem.appendChild(srcElem)
        this.VideoElem.src = src;
    }
    CanPlayType(type: string){
        return execInTry(() => this.VideoElem.canPlayType(type), (error) => this.OnError(error))
    }
    async Play(){
        return await execInTry(async () => {
            return this.VideoElem.play().then(() => { return undefined})
        }, (error) => this.OnError(error)) 
    }
    OnError(error: any){
        this.Listener.onVideoError && this.Listener.onVideoError(error);
    }
    GetVideoPlaybackQuality(){
        return execInTry(() => this.VideoElem.getVideoPlaybackQuality(), (error) => this.OnError(error)) 
    }
    Pause(){
        return execInTry(() => this.VideoElem.pause(), (error) => this.OnError(error)) 
    }
    GetDuration(){
        return execInTry(() => this.VideoElem.duration, (error) => this.OnError(error)) 
    }
    Seek(timeToSeek: number){
        if(this.VideoElem.seekable){
            if(this.IsLiveStream){
                var duration = this.GetDuration();
                if(duration) this.VideoElem.currentTime = duration - timeToSeek
            }
            else
                this.VideoElem.currentTime = timeToSeek
        }
    }
    Stop(afterBehaviour: "none" | "seekToBeginning" | "destroySource" = "destroySource"){
        return execInTry(() => {
            this.Pause();
            if(afterBehaviour == "seekToBeginning") this.Seek(0);
            if(afterBehaviour == "destroySource"){
                this.VideoElem.innerHTML = "";
                this.VideoElem.src = "";
                this.UnregisterEvents();
            }
        }, (error) => this.OnError(error))        
    }
}