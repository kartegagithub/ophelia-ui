import { getQueryString } from "../Extensions/ReflectionExtensions";
import AppClient from "../AppClient";
import Endpoint, { EndpointOptions, ServiceStatus } from "./endpoint";
import ServiceResult from "./serviceResult";
import { convertToDate } from "../Extensions/StringExtensions";
import Locker from "../Store/Locker";

export default class APIService {
  RootURL:string = ""
  Client?: AppClient
  Locker?: Locker
  constructor(client?: AppClient) {
    this.Client = client
    this.Locker = new Locker();
  }
  
  getURL(url: string) {
    if (url.startsWith("http")) return url;
    if(!this.RootURL.endsWith('/')) this.RootURL += "/";
    if(url.startsWith('/')) url = url.substring(1, url.length)
    return (this.RootURL + url);
  }

  private getUploaderStream(endpoint: Endpoint){
    var data = endpoint.Options.Payload? JSON.stringify(endpoint.Options.Payload): null;
    if(!endpoint.OnUploadProgress) return data;
    if(!data) return null;
    
    const blob = new Blob([data]);
    endpoint.TotalDataLength = blob.size;
    var pipe = blob.stream().pipeThrough(new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(chunk);
        endpoint.UploadedDataLength += chunk.byteLength;
        if(endpoint.TotalDataLength > 0){
          var progress = endpoint.UploadedDataLength / endpoint.TotalDataLength;
          //console.log(endpoint.URL + ": on upload progress:" + progress);
          if(endpoint.OnUploadProgress)
            endpoint.OnUploadProgress(endpoint.UploadedDataLength, progress)
        }
      },
      flush(controller) {
        //console.log("Upload completed: " + endpoint.URL);
      },
    }));
    return pipe;
  }

  async invokeEndpoint(endpoint: Endpoint) : Promise<any>{
    if(this.Locker?.IsLocked === true){
      endpoint.Status = ServiceStatus.Abort
      console.warn("There is an ongoing request, could not call endpoint", endpoint)
      return undefined
    }
    this.OnBeforeRequest(endpoint)
    if(endpoint.Options.EnableConcurrentRequests != true)
      this.Locker?.Lock();
    var httpsAgent: any = undefined
    if(endpoint.Options.ByPassHttpsAgent != true && endpoint.URL.startsWith("https")){
      const https = require('https');
      httpsAgent = new https.Agent({
        rejectUnauthorized: endpoint.Options.ValidateSSL,
      });
    }
    endpoint.Status = ServiceStatus.Fetching
    
    //console.log(endpoint.URL + " " + JSON.stringify(endpoint.Options.Headers))
    var options: RequestInit | any = {
      body: this.getUploaderStream(endpoint),
      cache: "no-cache",
      headers: endpoint.Options.Headers,
      credentials: endpoint.Options.Credentials,
      method: endpoint.Options.Method,
      agent: httpsAgent,
    }
    if(endpoint.OnUploadProgress)
      options.duplex = "half";

    options = {...options, ...this.GetRequestOptions(endpoint)}

    var url = getQueryString(endpoint.Options.Parameters, endpoint.URL);
    var fetcher = fetch(url, options).then((res) => {
      this.Locker?.Unlock();
      if(res.status != 200){
        endpoint.Status = ServiceStatus.Error
      }
      endpoint.StatusCode = res.status
      var contentType = res.headers.get("content-type") ?? "";
       if(contentType.indexOf("text/plain") > -1)
        return res.text() 
      else
        return res.json()

    }).catch((reason: any) => {
      console.error("Request Error:" + url + ", Error: " + JSON.stringify(reason))
      this.Locker?.Unlock();
      endpoint.Status = ServiceStatus.Error
      this.OnErrorResponse(endpoint, reason)
    });

    endpoint.Status = ServiceStatus.Success
    endpoint.StatusCode = 200

    var data = await fetcher;
    if(data && typeof data == "object") data.responseStatusCode = endpoint.StatusCode;
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

  CallEndpointT<T>(api: string, options?: EndpointOptions): Promise<T> {
    return new Endpoint(this, api, options).callT<T>();
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
