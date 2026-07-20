# Ophelia Next SDK documentation

This documentation describes the public API shipped by `ophelia-next`. It is organized by developer task: install the package, understand its runtime model, use the UI and data layers, then consult the API index when needed.

## Start here

1. [Getting started](./getting-started.md) — requirements, installation, imports, and a first component.
2. [Core concepts](./core-concepts.md) — `AppClient`, hydration boundaries, analytics, SEO, and themes.
3. [Components and forms](./components/README.md) — individual components, props, inputs, validation, and feedback.
4. [Service layer](./service-layer.md) — `APIService`, `Endpoint`, request options, results, and SWR.
5. [Data binders](./data-binders.md) — collection and entity workflows.
6. [Localization and routing](./localization-and-routing.md) — regions, translations, and localized URLs.
7. [Utilities and browser APIs](./utilities.md) — storage, media, exporters, diagnostics, and extensions.
8. [Public API index](./api-reference.md) — a compact inventory of root exports.

Maintainers should also read [Architecture and contributing](./architecture.md).

## Compatibility notes

- The package requires Node.js `>=18.17.1`.
- React and Next.js are peer dependencies.
- The current package is built with React 18 and Next.js 14 in development.
- Only the package root is public. Do not depend on `dist/` paths.
- Several features depend on browser APIs. In the Next.js App Router, place them below a `"use client"` boundary.

## Documentation conventions

- Examples use TypeScript and the Next.js App Router unless stated otherwise.
- Optional values are omitted when defaults are sufficient.
- Class names and method names retain the casing of the public API.
- Examples show supported primitives, not application-specific abstractions.

## Reporting documentation issues

When an example and the emitted TypeScript declarations disagree, treat the declarations for the installed package version as authoritative and report the mismatch in the project repository.
