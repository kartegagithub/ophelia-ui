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

### Dependencies
1. [Tailwind CSS](https://tailwindcss.com/)
2. [pluralize](https://www.npmjs.com/package/pluralize)
3. [sanitize-html](https://www.npmjs.com/package/sanitize-html)
4. [next](https://www.npmjs.com/package/next)
5. [react](https://www.npmjs.com/package/react)
6. [moment](https://www.npmjs.com/package/moment)
7. [mime-types](https://www.npmjs.com/package/mime-types)
8. [js-cookie](https://www.npmjs.com/package/js-cookie)
9. [cookies](https://www.npmjs.com/package/cookies)
10. [@tinymce/tinymce-react](https://www.npmjs.com/package/@tinymce/tinymce-react)
11. [@heroicons/react](https://www.npmjs.com/package/@heroicons/react)

### Table of components & functions
1. [Recommended Folder Structure for development](./FolderStructure.md)
2. [AppClient](./AppClient.md)
3. [AppTheme](./AppTheme.md)
4. [withBasePage](./withBasePage.md)
6. [Binders](./Binders/Index.md)
7. [Components](./Components/Index.md)
8. [Diagnostics](./Diagnostics/Index.md)
9. [Enums](./Enums/Index.md)
10. [Exporters](./Exporters/Index.md)
11. [Extensions](./Extensions/Index.md)
12. [Hooks](./Hooks/Index.md)
13. [Localization](./Localization/Index.md)
14. [Media](./Media/Index.md)
15. [Metrics](./Metrics/Index.md)
16. [Models](./Models/Index.md)
17. [Routing](./Routing/Index.md)
18. [Service/API](./Service/Index.md)
19. [Store](./Store/Index.md)
20. Styling (Reserved for future components)