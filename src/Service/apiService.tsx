import { getQueryString } from "../Extensions/ReflectionExtensions";
import AppClient from "../AppClient";
import Endpoint, { EndpointOptions, RequestMethod, ServiceStatus } from "./endpoint";
import ServiceResult from "./serviceResult";
import { convertToDate } from "../Extensions/StringExtensions";
import Locker from "../Store/Locker";

export default class APIService {
  RootURL: string = "";
  Client?: AppClient;
  Locker?: Locker;
  constructor(client?: AppClient) {
    this.Client = client;
    this.Locker = new Locker();
  }

  getURL(url: string) {
    if (url.startsWith("http")) return url;
    if (!this.RootURL.endsWith("/")) this.RootURL += "/";
    if (url.startsWith("/")) url = url.substring(1, url.length);
    return this.RootURL + url;
  }

  private getData(endpoint: Endpoint) {
    var data: any = endpoint.Options.Payload
      ? JSON.stringify(endpoint.Options.Payload)
      : null;
    if (endpoint.Options.ContentType == "multipart/form-data") {
      const formData = new FormData();
      if (data) formData.append("requestJson", data);
      if (endpoint.Options.Files) {
        for (let index = 0; index < endpoint.Options.Files.length; index++) {
          const file = endpoint.Options.Files[index];
          if (file.file) formData.append(file.name ?? "file", file.file);
        }
      }
      data = formData;
    }
    return data;
  }
  private getUploaderStream(endpoint: Endpoint) {
    var data = this.getData(endpoint);
    if (true) return data;
    if (!data) return null;

    var blob: Blob;
    if (endpoint.Options.ContentType == "multipart/form-data")
      blob = new Blob([data], { type: "multipart/form-data" });
    else blob = new Blob([data]);
    endpoint.TotalDataLength = blob.size;
    var pipe = blob.stream().pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(chunk);
          endpoint.UploadedDataLength += chunk.byteLength;
          if (endpoint.TotalDataLength > 0) {
            var progress =
              endpoint.UploadedDataLength / endpoint.TotalDataLength;
            //console.log(endpoint.URL + ": on upload progress:" + progress);
            if (endpoint.OnUploadProgress)
              endpoint.OnUploadProgress(endpoint.UploadedDataLength, progress);
          }
        },
        flush(controller) {
          //console.log("Upload completed: " + endpoint.URL);
        },
      })
    );
    return pipe;
  }

  async invokeEndpoint(endpoint: Endpoint): Promise<any> {
    if (endpoint.Options.Infra == "Fetch" || !globalThis.window)
      return this.invokeEndpointFetch(endpoint);
    else return this.invokeEndpointXhr(endpoint);
  }

  async invokeEndpointFetch(endpoint: Endpoint): Promise<any> {
    if (this.Locker?.IsLocked === true) {
      endpoint.Status = ServiceStatus.Abort;
      console.warn(
        "There is an ongoing request, could not call endpoint",
        endpoint
      );
      return undefined;
    }
    this.OnBeforeRequest(endpoint);
    if (endpoint.Options.EnableConcurrentRequests != true) this.Locker?.Lock();
    var httpsAgent: any = undefined;
    if (
      endpoint.Options.ByPassHttpsAgent != true &&
      endpoint.URL.startsWith("https")
    ) {
      const https = require("https");
      httpsAgent = new https.Agent({
        rejectUnauthorized: endpoint.Options.ValidateSSL,
      });
    }
    endpoint.Status = ServiceStatus.Fetching;

    if (endpoint.Options.Files && endpoint.Options.Files.length > 0) {
      endpoint.Options.ContentType = "multipart/form-data";
      if (endpoint.Options.Headers)
        delete endpoint.Options.Headers["Content-Type"];
    }

    //console.log(endpoint.URL + " " + JSON.stringify(endpoint.Options.Headers))
    var options: RequestInit | any = {
      body: this.getUploaderStream(endpoint),
      cache: "no-cache",
      headers: endpoint.Options.Headers,
      credentials: endpoint.Options.Credentials,
      method: endpoint.Options.Method,
      agent: httpsAgent,
    };

    if(endpoint.Options.Signal) options.signal = endpoint.Options.Signal;
    
    if (endpoint.OnUploadProgress) options.duplex = "half";

    options = { ...options, ...this.GetRequestOptions(endpoint) };

    var url = getQueryString(endpoint.Options.Parameters, endpoint.URL);
    var fetcher = fetch(url, options)
      .then((res) => {
        this.Locker?.Unlock();
        if (res.status != 200) {
          endpoint.Status = ServiceStatus.Error;
        }
        endpoint.StatusCode = res.status;
        var contentType = res.headers.get("content-type") ?? "";
        if (contentType.indexOf("text/plain") > -1) return res.text();
        else return res.json();
      })
      .catch((reason: any) => {
        console.error(
          "Request Error:" + url + ", Error: " + JSON.stringify(reason)
        );
        this.Locker?.Unlock();
        endpoint.Status = ServiceStatus.Error;
        this.OnErrorResponse(endpoint, reason);
      });

    endpoint.Status = ServiceStatus.Success;
    endpoint.StatusCode = 200;

    var data = await fetcher;
    if (data && typeof data == "object")
      data.responseStatusCode = endpoint.StatusCode;
    endpoint.Data = data;
    this.onAfterResponse(endpoint, data);
    return data;
  }

  async invokeEndpointXhr(endpoint: Endpoint): Promise<any> {
    if (this.Locker?.IsLocked === true) {
      endpoint.Status = ServiceStatus.Abort;
      console.warn(
        "There is an ongoing request, could not call endpoint",
        endpoint
      );
      return undefined;
    }

    this.OnBeforeRequest(endpoint);
    if (endpoint.Options.EnableConcurrentRequests !== true) this.Locker?.Lock();

    const url = getQueryString(endpoint.Options.Parameters, endpoint.URL);
    const method = endpoint.Options.Method || "GET";
    const headers = endpoint.Options.Headers || {};
    const isMultipart =
      endpoint.Options.Files && endpoint.Options.Files.length > 0;

    if (isMultipart) {
      endpoint.Options.ContentType = "multipart/form-data";
      delete headers["Content-Type"];
    }

    endpoint.Status = ServiceStatus.Fetching;

    //const requestOptions = { ...this.GetRequestOptions(endpoint) };

    const sendXHR = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = endpoint.Options.IncludeCredentials == true;
          xhr.open(method, url, true);

          // Set headers
          for (const key in headers) {
            if (headers.hasOwnProperty(key)) {
              xhr.setRequestHeader(key, headers[key]);
            }
          }

          if (endpoint.OnUploadProgress && xhr.upload) {
            xhr.upload.onprogress = (event) => {
              var progress = event.loaded / event.total;
              endpoint.OnUploadProgress &&
                endpoint.OnUploadProgress(event.loaded, progress);
            };
          }

          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              this.Locker?.Unlock();
              endpoint.StatusCode = xhr.status;

              if (xhr.status === 200) {
                endpoint.Status = ServiceStatus.Success;
                const contentType = xhr.getResponseHeader("content-type") ?? "";

                let data: any;
                try {
                  if (contentType.includes("application/json")) {
                    data = JSON.parse(xhr.responseText);
                  } else {
                    data = xhr.responseText;
                  }
                  if (typeof data === "object")
                    data.responseStatusCode = xhr.status;
                  endpoint.Data = data;
                  this.onAfterResponse(endpoint, data);
                  resolve(data);
                } catch (err) {
                  endpoint.Status = ServiceStatus.Error;
                  this.OnErrorResponse(endpoint, err);
                  reject(err);
                }
              } else {
                console.log("XHR Error 216: " + xhr.responseText);
                endpoint.Status = ServiceStatus.Error;
                this.OnErrorResponse(endpoint, xhr.responseText);
                reject(xhr.responseText);
              }
            }
          };

          xhr.onerror = () => {
            console.log("XHR Error 224:: " + xhr.responseText);
            this.Locker?.Unlock();
            endpoint.Status = ServiceStatus.Error;
            this.OnErrorResponse(endpoint, xhr.statusText);
            reject(xhr.statusText);
          };
          var data = this.getData(endpoint);
          xhr.send(endpoint.Options.Method == RequestMethod.GET ? null: data);
        } catch (error) {
          this.Locker?.Unlock();
          endpoint.Status = ServiceStatus.Error;
          reject("XHR Error 247: " + JSON.stringify(error));
        }
      });
    };

    try {
      const data = await sendXHR();
      return data;
    } catch (err) {
      console.error("XHR Error 239:" + JSON.stringify(err));
      return undefined;
    }
  }

  GetRequestOptions(endpoint: Endpoint): RequestInit {
    return {};
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

  OnBeforeRequest(endpoint: Endpoint) {}

  onAfterResponse(endpoint: Endpoint, data: any) {}

  OnErrorResponse(endpoint: Endpoint, reason: any) {}

  AddToCache(endpoint: Endpoint, val: string) {
    if (
      this.Client &&
      endpoint.Data &&
      endpoint.Options.CanBeCached &&
      endpoint.Options.CacheDuration &&
      endpoint.Options.CacheDuration > 0
    ) {
      try {
        if (
          endpoint.Options.ValidateCache == null ||
          endpoint.Options.ValidateCache(val)
        ) {
          if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};
          if (endpoint.Options.toString) {
            var optionKey = endpoint.Options.toString(endpoint.URL);
            this.Client.AppData.Cache[optionKey] = {
              Data: endpoint.Data,
              DateCreated: new Date(),
            };
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  GetFromCache(endpoint: Endpoint): boolean {
    if (
      this.Client &&
      endpoint.Options.CanBeCached &&
      endpoint.Options.CacheDuration &&
      endpoint.Options.toString
    ) {
      try {
        if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};

        var optionKey = endpoint.Options.toString(endpoint.URL);
        if (this.Client.AppData.Cache.hasOwnProperty(optionKey)) {
          var data = this.Client.AppData.Cache[optionKey];
          if (!data) return false;

          var cacheDate = convertToDate(data.DateCreated as string);
          if (
            cacheDate.milliseconds() +
              endpoint.Options.CacheDuration * 60 * 1000 >
            Date.now()
          ) {
            endpoint.Data = data.Data;
            endpoint.Status = ServiceStatus.Success;
            endpoint.RetreivedFromCache = true;
            return true;
          }
          this.RemoveFromCache(optionKey);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  }
  RemoveFromCache(key: string) {
    if (this.Client) {
      if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};

      delete this.Client.AppData.Cache[key];
    }
  }
}
