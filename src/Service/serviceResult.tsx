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
    Fail(code: string, desc: string){
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 1;
        message.description = desc;
        this.messages.push(message);
    }
    Warn(code: string, desc: string){
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 2;
        message.description = desc;
        this.messages.push(message);
    }
    Success(code: string, desc: string){
        if(!this.messages) this.messages = [];

        var message = new ServiceMessage();
        message.code = code;
        message.type = 3;
        message.description = desc;
        this.messages.push(message);
    }
    SetData<T>(data: T){
        this.data = data;
    }
}