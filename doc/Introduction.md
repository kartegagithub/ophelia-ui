## Ophelia Next

### Introduction
Ophelia Next is designed for NextJS projects. It aims to standardize the development structure and flow. It also aims to give developers common functionality so they can write less code.

### Installation
`npm i ophelia-next`

### Examples
You can find examples inside `samples` folder.

### Basic Concepts before beginning
First of all, we used to code `SSR` from beginning of our personal carier. So, after NextJS is released it became our first choice. But before Ophelia, we made lots of re-engenering, re-coding and moved codes from one project to another (with bugs also). After many many projects we decided to standardize our code over a SDK, framework, middleware (what ever you want to say). Ophelia born at that point.
Ophelia is coded by backend developers first, then frontend developers got in project. Because backend developers mostly manage logics inside single points to code less & manage easily. Frontend developers like flexibility. So when two teams work together, a better approach we had.

### Single Entry Point Logic
We designed a single entry point for apps, called AppClient. AppClient is responsible for i18n (globalization, localization), user specific data store for each request, easly access to api call interfaces.
You can find out more at examples.

### Table of components & functions
1. [AppClient](./AppClient.md)
2. [AppTheme](./AppTheme.md)
3. [Binders](./Binders/Index.md)
4. [Components](./Components/Index.md)
5. [Diagnostics](./Diagnostics/Index.md)
6. [Enums](./Enums/Index.md)
7. [Exporters](./Exporters/Index.md)
8. [Extensions](./Extensions/Index.md)
9. [Hooks](./Hooks/Index.md)
10. [Localization](./Localization/Index.md)
11. [Media](./Media/Index.md)
12. [Metrics](./Metrics/Index.md)
13. [Models](./Models/Index.md)
14. [Routing](./Routing/Index.md)
15. [Service/API](./Service/Index.md)
16. [Store](./Store/Index.md)
17. Styling (for future components)