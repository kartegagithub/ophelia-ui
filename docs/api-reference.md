# Public API index

All entries below are available from the `ophelia-next` package root. The generated `.d.ts` files included with each release are the authoritative source for full signatures.

## Core

| Export | Kind | Purpose |
| --- | --- | --- |
| `AppClient` | Default class | Application runtime and integration hooks |
| `AppTheme` | Type | Global theme shape |
| `getAppTheme` | Function | Reads the current theme |
| `changeAppTheme` | Function | Merges global theme overrides |
| `AnalyticsList` | Class | Collection of analytics adapters |
| `IAnalytics` | Type | Analytics adapter contract |

## Binders

`BinderOptions`, `ExportOption`, `EntityOperations`, `EntityBinder`, `EntityBinderProps`, `CollectionBinder`, `CollectionBinderProps`, `Config`, `QueryData`, `QueryDataModel`, `QueryFilter`, `QueryFunction`, `QuerySorter`, `PersistentConfig`, and `PersistentColumnConfig`.

## Components

### UI

`Accordion`, `AccordionGroup`, `Alert`, `Backdrop`, `Button`, `Carousel`, `ContentLoading`, `Drawer`, `Dropdown`, `Footer`, `Form`, `Grid`, `GridColumn`, `GridRow`, `Icon`, `IconRating`, `Image`, `Indicator`, `Label`, `Menu`, `Modal`, `ImportModal`, `Notification`, `Pagination`, `Panel`, `Progress`, `RawHTML`, `Searchbar`, `Shortcutlist`, `Sidebar`, `SpeedDial`, `Spinner`, `Table`, `Tabs`, `Tab`, and `Toast`.

Many components also export props, theme types, model classes, or event types. Let TypeScript auto-import these exact names for the installed version.

### Inputs

`AgreementCheckboxInput`, `CheckboxInput`, `ColorInput`, `DataList`, `DateInput`, `DateRangeInput`, `DateTimeInput`, `EmailInput`, `FileInput`, `FilterboxInput`, `HiddenInput`, `MonthInput`, `NumberInput`, `PasswordInput`, `PhoneInput`, `RadioInput`, `RangeInput`, `RichTextInput`, `SelectInput`, `TextAreaInput`, `TextInput`, `TimeInput`, `TimeRangeInput`, `URLInput`, and `WeekInput`.

### Fields

`BaseField`, `InputField`, `InputValidationRule`, `AgreementCheckboxField`, `BoolField`, `ColorField`, `DateField`, `DateRangeField`, `DateTimeField`, `DropdownField`, `DropdownFilterboxField`, `EmailField`, `EnumSelectBoxField`, `FileField`, `ImageField`, `LabelField`, `MonthField`, `NumericField`, `PasswordField`, `PhoneField`, `RadioField`, `RangeField`, `RichTextField`, `TextAreaField`, `TextField`, `TimeField`, `TimeRangeField`, `URLField`, and `WeekField`.

## Services

| Export | Kind | Purpose |
| --- | --- | --- |
| `APIService` | Class | Request creation, execution, lifecycle, and cache |
| `Endpoint` | Class | Configured request instance |
| `EndpointOptions` | Class | Request options |
| `RequestMethod` | Enum | HTTP method |
| `ServiceStatus` | Enum | Request outcome |
| `ServiceResult` | Class | Base response model |
| `ServiceCollectionResult` | Class | Collection response model |
| `ServiceMessage` | Class | API message model |
| `ServiceMessageResult` | Class | Message response model |
| `useEndpointSWR` | Hook | Executes an endpoint through SWR |
| `useEndpointSWRCallback` | Hook | Callback-oriented SWR integration |

## Localization and routing

`RegionSetting`, `Region_EN`, `Region_TR`, `registerRegionSetting`, `getRegionSetting`, `getAllRegions`, `getCurrentRegionSetting`, `changeRegion`, `UrlHandler`, `UrlHandlerClass`, and `RouteItem`.

Note: `Region_AZ` exists in source but is not re-exported by the localization barrel in the current release. The Azerbaijani region is still registered as a built-in setting.

## Store

`ClientCookies`, `Locker`, cookie read/write/remove functions, and local-storage functions.

## Models and enums

`FileData`, `convertToFileData`, `ISanitizeOptions`, `AdditionalHtmlAttributes`, `FileSizeUnit`, and `LoadingState`.

## Exporters, media, and diagnostics

`BarcodeReader`, `ExcelExporter`, `SpeechRecognizer`, `MediaDevice`, `MediaListener`, `VideoPlayer`, `VideoPlayerProps`, `VideoPlayerListener`, `VideoElementEvent`, and diagnostic exports including `SystemLog`.

## Extensions

Functions from `ArrayExtensions`, `ComponentExtensions`, `DateExtensions`, `DocumentExtension`, `InputExtensions`, `MimeTypeResolver`, `ReflectionExtensions`, `RequestExtentsions`, and `StringExtensions` are flattened into the root export.

Because flattened helper names may grow between releases, prefer named imports and rely on TypeScript completion instead of copying internal module paths.
