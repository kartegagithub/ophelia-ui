# Ophelia Next

Reusable React components and application infrastructure for Next.js projects. Ophelia Next combines UI primitives, form controls, data binders, API clients, localization, routing, browser storage, media helpers, and utility functions in one TypeScript package.

## Requirements

- Node.js 18.17.1 or newer
- React (peer dependency)
- Next.js (peer dependency)

## Installation

```bash
npm install ophelia-next
```

## Quick start

```tsx
"use client";

import { Button, Notification, TextInput } from "ophelia-next";

export default function ProfileForm() {
  return (
    <form className="space-y-4">
      <TextInput name="displayName" placeholder="Display name" />
      <Button type="submit" text="Save profile" />
      <Notification
        type="info"
        title="Profile"
        content="Changes are saved after you submit the form."
      />
    </form>
  );
}
```

Ophelia components that use state, effects, browser APIs, or event handlers must be rendered from a Client Component. Add `"use client"` at the relevant Next.js boundary.

## Package areas

| Area | Purpose |
| --- | --- |
| Components | Buttons, inputs, forms, tables, overlays, navigation, and feedback UI |
| Binders | Metadata-driven entity and collection editing |
| Service | Typed endpoint creation, requests, results, caching, and SWR helpers |
| Localization | Region registration, formatting metadata, and translations |
| Routing | Localized route registration, lookup, and navigation |
| Store | Cookies, local storage, and keyed locking |
| Exporters and media | Excel export, barcode and speech input, video and media devices |
| Extensions | Array, date, document, input, reflection, request, and string helpers |

## Documentation

- [Documentation home](./docs/README.md)
- [Getting started](./docs/getting-started.md)
- [AppClient and theming](./docs/core-concepts.md)
- [Components and forms](./docs/components.md)
- [Service layer](./docs/service-layer.md)
- [Data binders](./docs/data-binders.md)
- [Localization and routing](./docs/localization-and-routing.md)
- [Utilities and browser APIs](./docs/utilities.md)
- [Public API index](./docs/api-reference.md)
- [Architecture and contributing](./docs/architecture.md)

## Import policy

The package exposes a single public entry point. Import public symbols from `ophelia-next`:

```ts
import AppClient, { APIService, Button, UrlHandler } from "ophelia-next";
```

Deep imports such as `ophelia-next/dist/esm/...` are implementation details and are not supported.

## Development

```bash
npm install
npm run build
```

The build produces CommonJS and ES module distributions with TypeScript declarations in `dist/`.

## License

MIT © [kartegagithub](https://github.com/kartegagithub)
