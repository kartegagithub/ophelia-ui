import ServiceMessage from "./serviceMessage"

export default class ServiceResult{
    data?: any
    success?: boolean
    error: Array<ServiceMessage> = []
    hasFailed: boolean = false
    messages: Array<ServiceMessage> = []
    message?: any
    token: string = ""
    extraData: any
    performance: any
    encryptedData: any
    responseStatusCode: number = 0
    MessageCallback?: (item: ServiceMessage) => void
    Error(e: Error){
        this.hasFailed = true;
        var message = new ServiceMessage();
        message.code = "SYSERR";
        message.type = 1;
        message.message = e.message ?? "System error";
        message.description = e.stack ?? e.message;
        this.messages.push(message);
        if(this.MessageCallback) this.MessageCallback(message);
    }
    Fail(code: string, desc: string){
        this.hasFailed = true;
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 1;
        message.description = desc;
        this.messages.push(message);
        if(this.MessageCallback) this.MessageCallback(message);
    }
    Warn(code: string, desc: string){
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 2;
        message.description = desc;
        this.messages.push(message);
        if(this.MessageCallback) this.MessageCallback(message);
    }
    Success(code: string, desc: string){
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 3;
        message.description = desc;
        this.messages.push(message);
        if(this.MessageCallback) this.MessageCallback(message);
    }
    SetData<T>(data: T){
        this.data = data;
    }
}