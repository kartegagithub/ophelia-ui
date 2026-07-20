# Utilities and browser APIs

Ophelia Next includes focused helpers beyond its component and data layers. Import each symbol from the package root and use browser-dependent APIs below a client boundary.

## Storage and cookies

The store module exports:

- `getLocalstorage`, `setLocalstorage`, and related local-storage helpers
- Client and server cookie readers, writers, and removers
- `ClientCookies` for cookie management
- `Locker` for keyed operation locking

Browser storage is synchronous and unavailable during server rendering. Never store passwords or long-lived secrets in local storage. Apply appropriate `Secure`, `HttpOnly`, and `SameSite` settings to authentication cookies on the server; client-side JavaScript cannot create `HttpOnly` cookies.

```ts
import { getLocalstorage, setLocalstorage } from "ophelia-next";

setLocalstorage("preferred-view", "compact");
const preferredView = getLocalstorage("preferred-view");
```

## Hooks

`useMediaQuery(query)` observes a CSS media query. Like every React hook, call it unconditionally at the top level of a component or custom hook.

```tsx
"use client";

import { useMediaQuery } from "ophelia-next";

export function ResponsiveLabel() {
  const isCompact = useMediaQuery("(max-width: 640px)");
  return <span>{isCompact ? "Compact" : "Full"}</span>;
}
```

## File models and exporters

`FileData` and `convertToFileData()` convert browser files into the SDK model. `ExcelExporter` exports an HTML element, HTML string, or mapped array data.

```ts
import { ExcelExporter } from "ophelia-next";

const exporter = new ExcelExporter();
exporter.FileName = "products.xls";
exporter.Data = [{ id: 1, name: "Keyboard" }];
exporter.DataColumnMapping = [
  { key: "id", title: "ID", type: "number" },
  { key: "name", title: "Name", type: "string" },
];
exporter.Export();
```

`BarcodeReader` and `SpeechRecognizer` wrap interactive browser capabilities. Request permission in response to a clear user action and provide a fallback when the API or device is unavailable.

## Media

`MediaDevice` coordinates media-device listeners. `VideoPlayer`, `VideoPlayerProps`, and `VideoPlayerListener` provide programmatic video playback and event handling. Clean up streams and listeners when their owner unmounts; stop active media tracks when capture ends.

Media access requires a secure context in normal browser deployments and explicit user permission.

## Extensions

The SDK exports helper families for:

| Module | Typical responsibilities |
| --- | --- |
| Array | Search, mutation, cloning, and collection helpers |
| Component | React element processing |
| Date | Parsing, formatting, ranges, and date calculations |
| Document | Browser document and download operations |
| Input | Input normalization and validation support |
| MIME resolver | File extension and MIME type lookup |
| Reflection | Nested object access, merging, conversion, and type checks |
| Request | Request metadata such as client IP extraction |
| String | Formatting, masking, sanitization, slugging, and conversion |

Several extension names are intentionally general. Import only the functions needed and check their TypeScript signatures. Avoid adding the whole namespace to application globals or prototypes.

## HTML sanitization

`sanitizeHtml` and `ISanitizeOptions` support rich content processing. Define an allowlist appropriate for the rendering context. URL schemes, embedded media, inline styles, and event attributes require particular care.

## Diagnostics

`SystemLog` is exported through the diagnostic module. Use it for application diagnostics without including credentials, tokens, or personal data. Production logging should have explicit retention and redaction policies.

## Environment matrix

| Capability | Browser | Next.js server |
| --- | --- | --- |
| Pure array/string/date helpers | Yes | Usually |
| Request helpers | Limited | Yes |
| React hooks and interactive components | Yes | No |
| Local storage, document, media, speech, barcode | Yes | No |
| Cookie helpers | API-dependent | API-dependent |

“Usually” means the particular helper must not touch browser globals; confirm the implementation or declaration before using it in shared code.
