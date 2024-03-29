import { getQueryString } from "../Extensions/ReflectionExtensions";
import AppClient from "../AppClient";
import Endpoint, { EndpointOptions, ServiceStatus } from "./endpoint";
import ServiceResult from "./serviceResult";
import { convertToDate } from "../Extensions/StringExtensions";

export default class APIService {
  RootURL:string = ""
  Client?: AppClient

  constructor(client?: AppClient) {
    this.Client = client
  }
  
  getURL(url: string) {
    if (url.startsWith("http")) return url;
    if(!this.RootURL.endsWith('/')) this.RootURL += "/";
    if(url.startsWith('/')) url = url.substring(1, url.length)
    return (this.RootURL + url);
  }

  async invokeEndpoint(endpoint: Endpoint) : Promise<any>{
    this.OnBeforeRequest(endpoint)
    endpoint.Status = ServiceStatus.Fetching
    
    var options: RequestInit = {
      body: endpoint.Options.Payload? JSON.stringify(endpoint.Options.Payload): null,
      cache: "no-cache",
      headers: endpoint.Options.Headers,
      credentials: "same-origin",
      method: endpoint.Options.Method
    }
    options = {...options, ...this.GetRequestOptions(endpoint)}

    var url = getQueryString(endpoint.Options.Parameters, endpoint.URL);
    var fetcher = fetch(url, options).then((res) => {
      return res.json()
    }).catch((reason) => {
      console.error(url, reason)
      endpoint.Status = ServiceStatus.Error
      this.OnErrorResponse(endpoint, reason)
    });

    var data = await fetcher;
    endpoint.Status = ServiceStatus.Success
    endpoint.Data = data;
    this.onAfterResponse(endpoint, data)
    return data
  }

  GetRequestOptions(endpoint: Endpoint): RequestInit {
    return {}
  }
  CreateEndpoint(api: string, options?: EndpointOptions): Endpoint {
    return new Endpoint(this, api, options);
  }

  CallEndpoint(api: string, options?: EndpointOptions): Promise<ServiceResult> {
    return new Endpoint(this, api, options).call();
  }

  OnBeforeRequest(endpoint: Endpoint) {

  }

  onAfterResponse(endpoint: Endpoint, data: any) {
      
  }

  OnErrorResponse(endpoint: Endpoint, reason: any) {
    
  }

  AddToCache(endpoint: Endpoint, val: string) {
    if (this.Client && endpoint.Data && endpoint.Options.CanBeCached && endpoint.Options.CacheDuration && endpoint.Options.CacheDuration > 0) {
        try {
            if (endpoint.Options.ValidateCache == null || endpoint.Options.ValidateCache(val)) {
              if(!this.Client.AppData.Cache)
                this.Client.AppData.Cache = {}
              if(endpoint.Options.toString){
                var optionKey = endpoint.Options.toString(endpoint.URL);
                this.Client.AppData.Cache[optionKey] = { Data: endpoint.Data, DateCreated: new Date() };
              }
            }
        } catch (e) {
            console.error(e);
        }
    }
  }

  GetFromCache(endpoint: Endpoint): boolean {
      if (this.Client && endpoint.Options.CanBeCached && endpoint.Options.CacheDuration && endpoint.Options.toString) {
          try {
              if(!this.Client.AppData.Cache)
                this.Client.AppData.Cache = {}

              var optionKey = endpoint.Options.toString(endpoint.URL);
              if (this.Client.AppData.Cache.hasOwnProperty(optionKey)) {
                  var data = this.Client.AppData.Cache[optionKey];
                  if(!data)
                    return false;

                  var cacheDate = convertToDate(data.DateCreated as string)
                  if (cacheDate.milliseconds() + endpoint.Options.CacheDuration * 60 * 1000 > Date.now()) {
                      endpoint.Data = data.Data
                      endpoint.Status = ServiceStatus.Success;
                      endpoint.RetreivedFromCache = true;
                      return true
                  }
                  this.RemoveFromCache(optionKey)
              }
          } catch (e) {
              console.error(e)
          }
      }
      return false
  }
  RemoveFromCache(key: string) {
    if (this.Client){
      if(!this.Client.AppData.Cache)
        this.Client.AppData.Cache = {}

      delete this.Client.AppData.Cache[key];
    }
  }
}
