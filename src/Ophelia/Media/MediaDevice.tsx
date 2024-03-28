export class MediaListener{
    OnMediaStreamReceived?: ((stream: MediaStream) => void)
    OnMediaStreamRemoved?: (() => void)
    OnMediaError?: ((type: string, message: any) => void)
}
export default class MediaDevice{
    Stream?: MediaStream
    Listener: MediaListener
    constructor(listener: MediaListener){
        this.Listener = listener;
    }
    async GetDevices(kind: "audioinput" | "audiooutput" | "videoinput" = "videoinput"){
        const allAvailableDevices = await navigator.mediaDevices.enumerateDevices();
        const filteredDevices = allAvailableDevices.filter(device => device.kind === kind);
        return filteredDevices;
    }

    GetSupportedConstraints(){
        return navigator.mediaDevices.getSupportedConstraints()
    }
    OnError(type: string, message: any){
        this.Listener.OnMediaError && this.Listener.OnMediaError(type, message)
    }
    async GetDisplayMedia(options?: DisplayMediaStreamOptions){
        return await navigator.mediaDevices.getDisplayMedia(options).then((stream) => {
            this.Stream = stream;
            this.Listener.OnMediaStreamReceived && this.Listener.OnMediaStreamReceived(this.Stream)
            this.Stream.onremovetrack = () => {
                this.Stream = undefined
                this.Listener.OnMediaStreamRemoved && this.Listener.OnMediaStreamRemoved()
            };
            return this.Stream
        })
        .catch((error) => {
            this.Stream = undefined;
            this.OnError(error.name, error);
            return undefined
        });
    }
    async GetUserMedia(constraints?: MediaStreamConstraints){
        return await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            this.Stream = stream;
            this.Listener.OnMediaStreamReceived && this.Listener.OnMediaStreamReceived(this.Stream)
            this.Stream.onremovetrack = () => {
                this.Stream = undefined
                this.Listener.OnMediaStreamRemoved && this.Listener.OnMediaStreamRemoved()
            };
            return this.Stream
        })
        .catch((error) => {
            this.Stream = undefined;
            this.OnError(error.name, error);
            return undefined
        });
    }
}