import AppClient from "../AppClient";
import Endpoint, { EndpointOptions } from "./endpoint";
import ServiceResult from "./serviceResult";
export default class APIService {
    RootURL: string;
    Client?: AppClient;
    constructor(client?: AppClient);
    getURL(url: string): string;
    invokeEndpoint(endpoint: Endpoint): Promise<any>;
    GetRequestOptions(endpoint: Endpoint): RequestInit;
    CreateEndpoint(api: string, options?: EndpointOptions): Endpoint;
    CallEndpoint(api: string, options?: EndpointOptions): Promise<ServiceResult>;
    OnBeforeRequest(endpoint: Endpoint): void;
    onAfterResponse(endpoint: Endpoint, data: any): void;
    OnErrorResponse(endpoint: Endpoint, reason: any): void;
    AddToCache(endpoint: Endpoint, val: string): void;
    GetFromCache(endpoint: Endpoint): boolean;
    RemoveFromCache(key: string): void;
}
