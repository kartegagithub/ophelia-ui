# Core concepts

## AppClient

`AppClient` is the SDK's application-level coordination object. It carries region and application data, creates service clients, stores analytics providers, manages dynamic metadata, and delegates localized navigation to `UrlHandler`.

```ts
import AppClient from "ophelia-next";

const client = new AppClient();
client.AppTitle = "Admin";
client.AppDescription = "Administration console";
client.ChangeUserRegion("TR");
```

### Properties

| Property | Type | Initial value | Purpose |
| --- | --- | --- | --- |
| `Region` | `string` | `"EN"` | Active region code |
| `AppTitle` | `string` | `""` | Application title |
| `AppDescription` | `string` | `""` | Application description |
| `AppData` | `any` | — | Application-defined state |
| `Analytics` | `AnalyticsList` | Empty list | Registered analytics adapters |
| `IsClientSide` | `boolean` | Runtime-derived | Whether the instance was created in a browser |
| `Context` | `NextPageContext?` | — | Optional Pages Router context |
| `Theme` | `AppTheme?` | — | Optional application theme reference |
| `DynamicSEO` | SEO object | `{}` | Metadata applied by `UpdateMetaTags()` |

### Methods

| Method | Description |
| --- | --- |
| `Hydrate()` | Extension hook for restoring an application-specific client |
| `ChangeUserRegion(code?)` | Updates the client region and active registered region |
| `Translate(key?)` | Translation hook; the base implementation returns the key |
| `CreateService()` | Creates an `APIService` associated with the client |
| `RegisterAnalytics(adapter)` | Adds an `IAnalytics` implementation |
| `UpdateMetaTags()` | Updates existing title and meta elements in the browser document |
| `PushUrl(destination, onSuccess?)` | Resolves and navigates through the shared `UrlHandler` |
| `GetUrl(destination, routeData?)` | Resolves a localized URL and optional route parameters |

`UpdateMetaTags()` only updates metadata elements already present in `<head>` (except its title fallback). In modern Next.js applications, prefer the framework Metadata API for server-rendered SEO and reserve this method for client-side updates.

## Analytics

Implement `IAnalytics`, then register it on the client. `AnalyticsList` fans supported events out to registered adapters.

```ts
client.RegisterAnalytics(myAnalyticsAdapter);
```

Keep vendor SDK initialization in the adapter rather than coupling it to components.

## Global theme

`getAppTheme()` reads the current theme and `changeAppTheme()` merges overrides into the SDK defaults.

```ts
import { changeAppTheme, getAppTheme } from "ophelia-next";

changeAppTheme({
  Spinner: {
    Image: { name: "spinner", size: 24, className: "app-spinner" },
  },
  RichTextEditor: {
    APIKey: process.env.NEXT_PUBLIC_TINYMCE_API_KEY ?? "",
    Height: 420,
  },
});

const theme = getAppTheme();
```

Theme overrides are global mutable configuration. Apply them once during client application initialization, not during render. Provide only the branches being customized; empty properties are removed during merging.

Common theme branches include `Alert`, `Searchbar`, `Table`, `Spinner`, `IconRating`, `Toast`, `Notification`, `SpeedDial`, `Dropdown`, `Highlight`, `RichTextEditor`, and `Icons`.

## Error and lifecycle guidance

- Override application hooks in a subclass and keep method signatures compatible.
- Avoid storing secrets in `AppData`; client instances may be serialized or inspected in the browser.
- Treat client-side theme, region, route, and analytics registries as process-global browser state.
- Create new mutable instances per server request to prevent cross-user data leakage.
