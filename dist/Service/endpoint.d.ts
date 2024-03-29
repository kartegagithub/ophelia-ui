import APIService from "./apiService";
import ServiceResult from "./serviceResult";
export default class Endpoint {
    Service: APIService;
    URL: string;
    Options: EndpointOptions;
    Status: ServiceStatus;
    RetreivedFromCache?: boolean;
    RequestID: string;
    Data: any;
    call(): Promise<ServiceResult>;
    constructor(service: APIService, url: string, options?: EndpointOptions);
}
export declare class EndpointOptions {
    Parameters?: any;
    Payload?: any;
    Method?: RequestMethod;
    ContentType?: string;
    CanBeCached?: boolean;
    CacheDuration?: number;
    Headers?: Record<string, any>;
    ValidateCache?: Function;
    toString?: (apiURL: string) => string;
}
export declare enum ServiceStatus {
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
export declare enum RequestMethod {
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
