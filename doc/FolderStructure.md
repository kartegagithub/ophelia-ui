### Recommended Folder Structure for Development
Each of us has our own development style. But if you are responsible for development team, you want all your developers code similar on every projects. So you can maintain better and fast.

We decided on a standart for folder structure.

1. pages: Holds SSR physical page structure.
2. Service: Holds entry point service and wraps other services.
3. Shared: Holds shared classes and components. ApplicationClient, appSettings, ErrorBoundry, withBasePage files are located.
   1. Components: Holds app components
   2. Enums: Holds enum values
   3. extensions: Holds app specific extensions
   4. hooks: Holds app specific hooks
   5. Models: Holds app model classes