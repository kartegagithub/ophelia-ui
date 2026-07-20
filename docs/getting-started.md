# Getting started

## Install

```bash
npm install ophelia-next
```

The SDK supports both ESM and CommonJS consumers and includes TypeScript declarations. React and Next.js must be installed by the host application.

## Import from the package root

`AppClient` is the default export. All other supported APIs are named exports.

```ts
import AppClient, {
  Button,
  Notification,
  TextInput,
  getAppTheme,
} from "ophelia-next";
```

The package does not expose supported subpath imports. This keeps application code independent of the build layout.

## Next.js runtime boundaries

Many UI controls and helpers use React state, event handlers, `window`, `document`, media devices, or storage. Use them in a Client Component:

```tsx
"use client";

import { Button, TextInput } from "ophelia-next";

export default function SearchForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <TextInput name="query" placeholder="Search" />
      <Button type="submit" text="Search" />
    </form>
  );
}
```

Server-safe utilities may be used on the server, but verify each function before doing so. `AppClient.IsClientSide` reports whether the instance was created in a browser.

## Create an application client

Extend `AppClient` when an application needs a shared service base URL, translation behavior, or request-specific data.

```ts
import AppClient, { APIService } from "ophelia-next";

export class ApplicationClient extends AppClient {
  Region = "EN";
  AppTitle = "Example application";
  AppDescription = "Example built with Ophelia Next";

  CreateService() {
    const service = new APIService(this);
    service.RootURL = process.env.NEXT_PUBLIC_API_URL ?? "";
    return service;
  }

  Translate(key?: string) {
    return key ?? "";
  }
}
```

Do not share a mutable `AppClient` singleton between server requests. Create request-scoped instances on the server; use application state or context to share an instance inside a client-side tree.

## Next steps

- Configure the application runtime in [Core concepts](./core-concepts.md).
- Build UI in [Components and forms](./components/README.md).
- Connect an API in [Service layer](./service-layer.md).

## Troubleshooting

### A browser global is unavailable

Move the consumer below a `"use client"` boundary and call browser-only APIs in an event handler or effect.

### A deep import fails

Replace it with a root import from `ophelia-next`. The package export map intentionally exposes only `.`.

### Types and runtime output differ

Remove stale build artifacts in the SDK repository and run `npm run build`; in an application, reinstall the exact package version used by the lockfile.
