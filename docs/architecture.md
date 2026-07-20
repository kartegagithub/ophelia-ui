# Architecture and contributing

## Repository map

```text
src/
├── Components/      React UI, inputs, fields, and display models
├── Binders/         Metadata-driven collection and entity workflows
├── Service/         API client, endpoint, results, and SWR adapters
├── Localization/    Region registry and built-in regions
├── Routing/         Localized route registry and navigation
├── Store/           Cookies, local storage, and locking
├── Extensions/      General-purpose helper functions
├── Exporters/       Excel, barcode, and speech capabilities
├── Media/           Devices and video playback
├── Metrics/         Analytics contracts and fan-out
├── Models/          Shared data models
├── Diagnostic/      Logging support
├── AppClient.tsx    Application integration point
├── AppTheme.tsx     Global theme configuration
└── index.tsx        Public package surface
```

`src/index.tsx` is the public API boundary. Feature barrels re-export their supported symbols into it. `tsconfig.esm.json` and `tsconfig.cjs.json` build parallel distributions; declarations are published from the ESM build.

## Build

```bash
npm install
npm run build
```

The build:

1. Removes the previous `dist/` directory.
2. Compiles ESM and CommonJS outputs.
3. Copies SCSS assets beside both outputs.
4. Cleans TypeScript build metadata.

The package `prepare` script runs the full build before packaging from a local checkout.

## Design boundaries

- Components depend on shared extensions and theme configuration.
- Binders compose components, services, models, routing, and application hooks.
- `AppClient` is the application-owned integration seam.
- Localization and routing use module-level registries in the browser.
- The package exposes one root entry point through `package.json#exports`.

## Adding a public API

1. Implement the symbol in the appropriate feature directory.
2. Export it from that feature's `index.tsx`.
3. Confirm it reaches `src/index.tsx` through the feature barrel.
4. Add or update TypeScript types without exposing private implementation details.
5. Document behavior, defaults, environment constraints, and a minimal example.
6. Run the build and inspect the emitted declaration.

Do not document an internal path as public before it is reachable from the package root.

## Documentation quality bar

- Examples must compile against the public root export.
- Describe defaults and side effects, especially global mutable state.
- Mark browser-only and Pages Router-specific APIs.
- Include security guidance for HTML, files, credentials, storage, and logging.
- Prefer task-oriented examples over large application-specific templates.
- Use the exact public casing, including legacy names.

## Release checklist

- `npm run build` succeeds from a clean dependency install.
- ESM, CommonJS, and declaration entry points exist.
- The package export map resolves in both import modes.
- Public API additions are documented.
- Removed or renamed exports have migration notes.
- README links resolve with case-sensitive paths.
- The package version and compatibility notes are current.
