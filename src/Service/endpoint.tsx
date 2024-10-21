import { randomId } from "../Extensions/ReflectionExtensions"
import APIService from "./apiService";
import ServiceResult from "./serviceResult";

export default class Endpoint{
    Service: APIService
    URL: string = ""
    Options: EndpointOptions = new EndpointOptions()
    Status: ServiceStatus = ServiceStatus.NotInitialized;
    StatusCode: number = 0
    RetreivedFromCache?: boolean = false
    RequestID: string = ""
    Data: any = {}

    call(): Promise<ServiceResult> {
        return this.Service.invokeEndpoint(this);
    }

    callT<T>(): Promise<T> {
        return this.Service.invokeEndpoint(this);
    }

    constructor(service: APIService, url: string, options?: EndpointOptions) {
        this.Service = service
        this.URL = url
        if(!this.Options) this.Options = new EndpointOptions()
        this.Options = {...this.Options, ...options}
        this.RequestID = randomId() + randomId()
    }
}

export class EndpointOptions{
    Parameters?: any = undefined
    Payload?: any = undefined
    Method?: RequestMethod = RequestMethod.POST
    ContentType?: string = "application/json"
    CanBeCached?: boolean = false
    CacheDuration?: number = 0
    Headers?: Record<string, any> = []
    ValidateCache?: Function = undefined
    ValidateSSL?: boolean = false
    ByPassHttpsAgent?: boolean = false
    toString? = (apiURL: string) => {
        return `${apiURL}_${this.Method}_${JSON.stringify(this.Parameters)}`
    }
}

export enum ServiceStatus {
    Success = "success",
    NotModified = "notmodified",
    Error = "error",
    Timeout = "timeout",
    Abort = "abort",
    ParseError = "parserror",
    Unknown = "unknown",
    NotInitialized = "",
    Fetching = ""
}

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    HEAD = "HEAD",
    TRACE = "TRACE",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    DELETE = "DELETE"
}