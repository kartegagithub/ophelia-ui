# Localization and routing

Localization stores region metadata and translations. Routing maps internal destinations to localized public URLs. `AppClient` connects the two through its active `Region`.

## Built-in regions

English (`EN`), Turkish (`TR`), and Azerbaijani (`AZ`) settings are registered when the package loads. Region lookup is case-insensitive.

```ts
import {
  changeRegion,
  getAllRegions,
  getCurrentRegionSetting,
  getRegionSetting,
} from "ophelia-next";

changeRegion("TR");
const current = getCurrentRegionSetting();
const english = getRegionSetting("EN");
const regions = getAllRegions();
```

`changeRegion()` ignores unregistered codes. Validate registration before presenting a region as available.

## Register a region

```ts
import { registerRegionSetting, RegionSetting } from "ophelia-next";

const de: RegionSetting = {
  Code: "DE",
  Tag: "de-DE",
  TimeZone: "Europe/Berlin",
  DateFormat: {
    ShortDateFormat: "DD.MM.YYYY",
    FirstDayOfWeek: "Monday",
  },
  NumberFormat: {
    DecimalSeperator: ",",
    ThousandGrouper: ".",
  },
  Currency: { Symbol: "€" },
  Translations: {},
};

registerRegionSetting("DE", de);
```

A `RegionSetting` contains `Code`, `Tag`, `TimeZone`, optional date/number/currency formatting metadata, and `Translations`. Register regions once during application initialization.

## Translation strategy

The base `AppClient.Translate(key)` returns the key. Override it to read the active region's translation map and define a predictable missing-key policy. Keep translation loading outside render and avoid mutating shared server state across requests.

## Configure localized routes

`UrlHandler.Current` is the shared `UrlHandlerClass` instance.

```ts
import { RouteItem, UrlHandler } from "ophelia-next";

UrlHandler.Current.Init(
  [{ key: "/en/", lang: "en" }, { key: "/tr/", lang: "tr" }],
  "en",
);

const routes: RouteItem[] = [
  { source: "/en/products", destination: "/products", language: "en" },
  { source: "/tr/urunler", destination: "/products", language: "tr" },
];

UrlHandler.Current.RegisterItems(routes);
```

Resolve an internal destination for a language:

```ts
const listUrl = UrlHandler.Current.Get("/products", "tr");
const detailUrl = UrlHandler.Current.Get("/products/:id", "tr", { id: 42 });
```

`Get()` returns absolute HTTP(S) destinations unchanged. With no route map it returns the supplied destination and logs that routes are not registered.

## Dynamic route discovery

Assign `OnRouteNotFound` to asynchronously load missing `RouteItem` values. `FindRoute()` can then register the returned routes and retry lookup. Cache and validate remote route data; malformed mappings can create redirect loops or incorrect navigation.

## Navigation

`UrlHandler.Current.Push()` uses `next/router`, which is the Pages Router navigation API. `AppClient.PushUrl()` delegates to it. In App Router applications, resolve with `GetUrl()` and navigate with `useRouter()` from `next/navigation` when appropriate.

## State management

The active region and current route handler are global module state. Initialize them deterministically on the client. For server rendering, avoid request-specific mutations of shared module state; derive URLs and formatting from explicit request data where isolation matters.
