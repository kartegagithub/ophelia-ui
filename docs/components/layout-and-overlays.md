# Layout and overlays

## Accordion

Expandable content section.

| Prop | Type | Purpose |
| --- | --- | --- |
| `title` | `any` | Header content |
| `leftIcon` | `IconProps \| string \| JSX.Element \| Function` | Header icon |
| `content` | `string \| JSX.Element` | Explicit content |
| `children` | `ReactNode` | Nested content alternative |
| `defaultOpen` | `boolean?` | Initial expanded state |
| `iconSize` | `number?` | Header icon size |
| `id` | `string?` | DOM identity |

## AccordionGroup

Compact titled group/count presentation.

| Prop | Type | Purpose |
| --- | --- | --- |
| `title` | `string?` | Group heading |
| `content` | `string?` | Group content |
| `count` | `number?` | Associated item count |
| `id` | `string?` | DOM identity |

## Backdrop

Renders an overlay behind drawers or modals.

| Prop | Type | Purpose |
| --- | --- | --- |
| `visible` | `boolean?` | Shows/hides the overlay |
| `id` | `string?` | DOM identity |

## Carousel

Displays slides with responsive, autoplay, arrow, and indicator options.

| Prop | Type | Purpose |
| --- | --- | --- |
| `data` | `{ image?, component?, location? }[]` | Slide data and optional navigation destinations |
| `selectedIndex` | `number?` | Initially/currently selected slide |
| `children` | `ReactNode` | Custom slide content |
| `visible` | `boolean?` | Controls rendering |
| `options.autoplay` | `boolean?` | Enables automatic advancement |
| `options.autoplayInterval` | `number?` | Delay between slides |
| `options.gap` | `string?` | CSS gap between slides |
| `options.loop` | `boolean?` | Wraps at the final slide |
| `options.overflow` | `boolean?` | Controls overflow behavior |
| `options.fullWidth` | `string?` | Full-width sizing value |
| `options.theme` | `CarouselTheme?` | Component class overrides |
| `responsive` | Breakpoint settings[] | Defines `slidesToShow`/`slidesToScroll` per breakpoint |
| `arrow` | Arrow configuration | Icons, colors, placement, visibility, and indicators |
| `id` | `string?` | DOM identity |

## Drawer

Positions overlay content at an edge or custom location.

| Prop | Type | Purpose |
| --- | --- | --- |
| `position` | Nine named positions or `"custom"` | Drawer placement |
| `visible` | `boolean?` | Controls open state |
| `backdrop` | `boolean?` | Renders an overlay behind the drawer |
| `fullWidth` | `boolean?` | Expands drawer width |
| `swipe` | `boolean?` | Enables swipe interaction |
| `swipeElement` | `string \| JSX.Element` | Custom swipe handle |
| `swipeButtonText` | `string?` | Swipe handle label |
| `children` | `ReactNode` | Drawer content |
| `className`, `id` | `string?` | Styling and identity |

## Footer

Composes a site footer from structured menu and branding areas.

| Prop | Type | Purpose |
| --- | --- | --- |
| `logo` | `JSX.Element?` | Brand logo |
| `menuItems` | Grouped menu data[] | Footer link columns; nested items require `url` |
| `contactInformation` | `JSX.Element?` | Contact block |
| `socialMediaLinks` | `{ id?, component?, location? }[]` | Social link content |
| `languageOptions` | `JSX.Element?` | Region/language selector |
| `brandInfo` | `JSX.Element?` | Copyright or brand details |
| `siteMapUrl` | `string?` | Sitemap destination |
| `bgTop`, `bgBottom`, `bg` | `JSX.Element?` | Decorative backgrounds |
| `children` | `ReactNode` | Additional content |
| `visible`, `id` | Optional | Rendering and identity |

## Grid, GridRow, and GridColumn

`Grid` provides the grid root; `GridRow` and `GridColumn` wrap div elements.

| Component | Props | Purpose |
| --- | --- | --- |
| `Grid` | `id: string`, `children?` | Grid container; `id` is required |
| `GridRow` | All `HTMLAttributes<HTMLDivElement>` | Row container |
| `GridColumn` | All `HTMLAttributes<HTMLDivElement>` | Column container |

## Modal

Dialog container with optional actions, dragging, backdrop dismissal, and bottom-scroll events.

| Prop | Type | Purpose |
| --- | --- | --- |
| `defaultOpen` | `boolean?` | Initial open state |
| `title` | `string \| ReactNode` | Dialog heading |
| `backdrop` | `boolean?` | Shows overlay |
| `dismissText` | `string?` | Dismiss action label |
| `center` | `boolean?` | Centers dialog |
| `showCloseButton` | `boolean?` | Shows close action |
| `dismissOnBackdropClick` | `boolean?` | Allows outside-click dismissal |
| `draggable` | `boolean?` | Enables dragging |
| `buttons` | Button config[] | Footer actions with text, type, disabled, close, and click behavior |
| `onCurrentValue` | `Function \| any` | Receives/holds current modal value |
| `onBottomScroll` | `Function?` | Called at scroll bottom |
| `onClose` | `Function?` | Called when dismissed |
| `children` | `ReactNode` | Dialog body |
| `className`, `id` | `string?` | Styling and identity |

## ImportModal

Specialized file-import dialog.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `onSubmit(data, files, isValid)` | Function | Yes | Receives form data, parsed `FileData[]`, and validation state |
| `fileName` | `string?` | No | File field name |
| `sampleFilePath` | `string \| JSX.Element` | No | Sample download/link UI |
| `message` | `string \| JSX.Element` | No | Import instructions |
| `accept` | `string?` | No | File picker acceptance hint |
| `multiple` | `boolean?` | No | Allows multiple files |
| `onSubmitButtonClicked` | Function | No | Observes submit-button click |
| `title` | `string?` | No | Dialog title |
| `AppClient` | `AppClient?` | No | Translation/service integration |
| `onVisibilityChange` | `(visible) => void` | No | Reports visibility |
| `children` | `ReactNode` | No | Additional form content |

Server-side file validation remains mandatory.

## Panel

Titled, optionally collapsed content container.

| Prop | Type | Purpose |
| --- | --- | --- |
| `headerText` | `string?` | Panel heading |
| `leftIcon`, `rightIcon` | `string \| JSX.Element` | Header icons |
| `collapsed` | `boolean?` | Initial/current collapsed state |
| `children` | `ReactNode` | Panel body |
| `id` | `string?` | DOM identity |

## SpeedDial

Expandable floating action collection.

| Prop | Type | Purpose |
| --- | --- | --- |
| `open` | `boolean?` | Initial/current expanded state |
| `image` | `string \| IconProps \| JSX.Element` | Main action icon |
| `buttons` | `SpeedDialButton[]` | Actions with `ID`, location/click, icon, class, and tooltip settings |
| `theme` | `SpeedDialTheme?` | Main image override |
| `children` | `ReactNode` | Additional content |
| `id` | `string?` | DOM identity |

## Tabs and Tab

`Tabs` manages tab selection; each `Tab` defines a header and pane.

### Tabs props

| Prop | Type | Purpose |
| --- | --- | --- |
| `defaultSelected` | `string?` | ID of the initially selected tab |
| `tabPosition` | `string \| any` | Header placement |
| `type` | `string?` | Theme variation |
| `InlineRootClass`, `InlineTabHeaderClass`, `InlineTabContentClass` | `string?` | Per-instance class overrides |
| `noContent` | `boolean?` | Renders headers without pane content |
| `noScroll` | `boolean?` | Disables internal scroll behavior |
| `children` | `ReactNode` | `Tab` children |
| `id` | `string?` | DOM identity |

### Tab props

| Prop | Type | Purpose |
| --- | --- | --- |
| `id` | `string?` | Tab identity used for selection |
| `text` | `string?` | Header label |
| `active` | `boolean?` | Marks active state |
| `visible` | `boolean?` | Controls tab rendering |
| `tabPaneClass` | `string?` | Pane class override |
| `type` | `"monochrome"` | Tab-specific variation |
| `onClick` | `any` | Header click handler |
| `children` | `ReactNode` | Pane content |

```tsx
<Tabs defaultSelected="profile">
  <Tab id="profile" text="Profile">Profile content</Tab>
  <Tab id="security" text="Security">Security content</Tab>
</Tabs>
```
