# Service layer

The service layer separates endpoint configuration from transport execution. `APIService` owns the root URL and request lifecycle; `Endpoint` owns one request and its options.

## Basic request

```ts
import {
  APIService,
  EndpointOptions,
  RequestMethod,
} from "ophelia-next";

const service = new APIService();
service.RootURL = "https://api.example.com";

const options = new EndpointOptions();
options.Method = RequestMethod.GET;
options.Parameters = { page: 1, pageSize: 20 };

const result = await service.CallEndpoint("/products", options);
```

Use `CallEndpointT<T>()` or `endpoint.callT<T>()` when the endpoint returns a known application type:

```ts
type Product = { id: number; name: string };

const products = await service.CallEndpointT<Product[]>("/products", options);
```

## Create and call an endpoint

```ts
const endpoint = service.CreateEndpoint("/products", options);
endpoint.OnUploadProgress = (bytes, percentage) => {
  console.log({ bytes, percentage });
};

const response = await endpoint.call();
```

An endpoint exposes `Status`, `StatusCode`, `Data`, `RequestID`, transfer lengths, and whether a cached value was used.

## EndpointOptions

| Option | Purpose |
| --- | --- |
| `Parameters` | Query parameters |
| `Payload` | Request body data |
| `Method` | `RequestMethod` enum value |
| `ContentType` | Explicit content type |
| `Headers` | Additional request headers |
| `Credentials` | Fetch credentials mode |
| `IncludeCredentials` | Compatibility credential flag |
| `Signal` | `AbortSignal` for cancellation |
| `Files` | Named browser `File` values |
| `Infra` | Selects `"Fetch"` or `"Xhr"` transport |
| `CanBeCached`, `CacheDuration`, `ValidateCache` | Cache controls |
| `EnableConcurrentRequests` | Allows equivalent requests to overlap |
| `toString` | Custom URL formatter |

Use XHR when upload progress is required; use Fetch for ordinary requests. Files and browser `File` objects are client-side concerns.

## Request lifecycle

Subclass `APIService` to centralize authorization, telemetry, and error handling:

```ts
import { APIService, Endpoint } from "ophelia-next";

class ApplicationService extends APIService {
  OnBeforeRequest(endpoint: Endpoint) {
    endpoint.Options.Headers = {
      ...endpoint.Options.Headers,
      "x-client": "web",
    };
  }

  onAfterResponse(endpoint: Endpoint, data: unknown) {
    // Record successful response metadata.
  }

  OnErrorResponse(endpoint: Endpoint, reason: unknown) {
    // Normalize or report transport errors.
  }
}
```

Do not log authorization headers, tokens, file contents, or personal response data.

## Status and result types

`ServiceStatus` distinguishes `Success`, `NotModified`, `Error`, `Timeout`, `Abort`, `ParseError`, `Unknown`, and pre-request states. `ServiceResult`, `ServiceCollectionResult`, `ServiceMessage`, and `ServiceMessageResult` model common API responses.

Check both the service status and the application response contract. A successful HTTP request does not necessarily imply a successful business operation.

## SWR integration

The root exports `useEndpointSWR(endpoint)` and `useEndpointSWRCallback(endpoint)`. They bridge a configured `Endpoint` to SWR. Because they are hooks, call them only at the top level of a React component or another hook and within a client-compatible React tree.

## Cancellation, caching, and concurrency

- Pass an `AbortSignal` and abort it when a request becomes obsolete.
- Cache only responses safe to reuse for the current user and authorization context.
- Set an explicit cache duration and validation policy for mutable resources.
- Leave concurrent equivalent requests disabled unless the endpoint is safe to call more than once.
