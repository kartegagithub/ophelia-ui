# Navigation and selection

## Dropdown

General-purpose dropdown supporting local/remote options, search, multi-selection, custom templates, action buttons, and nested collection content.

### Core props

| Prop | Type | Purpose |
| --- | --- | --- |
| `visible` | `boolean?` | Controls rendering |
| `options` | `any[]?` | Local option collection |
| `defaultValue` | `any \| any[]` | Initial selection |
| `multipleSelection` | `boolean?` | Enables multiple values |
| `displayProp`, `valueProp` | `string?` | Option label and value properties |
| `selectedItemDisplayProp`, `selectedItemValueProp` | `string?` | Alternative properties for selected-item display/value |
| `disabledOptions` | `any[]?` | Options unavailable for selection |
| `onSelectionChange(value, clickedButton?)` | Function | Reports selection or action |
| `optionTemplateFn(item)` | Function | Custom option renderer |
| `label` | `string?` | Dropdown label |
| `className`, `id` | `string?` | Styling and identity |

### Search and content props

| Prop | Type | Purpose |
| --- | --- | --- |
| `enableSearch` | `boolean?` | Shows search UI |
| `searchPlaceholder` | `string?` | Search input hint |
| `onSearch(key?, page?, pageSize?)` | Async function | Loads remote options |
| `refreshSearchList` | `boolean?` | Requests search-result refresh |
| `refreshKey` | `string \| number` | Invalidates dropdown content |
| `listHeight` | `string?` | Option-list height |
| `getCollectionBinder(listener, checkedItems)` | Function | Renders binder-backed selection content |
| `children` | `ReactNode` | Custom dropdown content |

### Trigger and behavior props

| Prop | Type | Purpose |
| --- | --- | --- |
| `button` | Button config | Trigger text, icons, class, size, children, and click/hover action |
| `newBtn` | `JSX.Element?` | Custom create-new action |
| `buttons` | Action config[] | Dismiss/reset/custom footer actions |
| `positionClass` | `"left" \| "right" \| "top" \| "bottom" \| "custom"` | Menu placement |
| `contentTopClass` | `string?` | Content positioning class |
| `backdrop` | `boolean?` | Adds backdrop |
| `alwaysOpen` | `boolean?` | Keeps menu open |
| `handleOutboundClick` | `boolean?` | Enables outside-click handling |
| `visibilityCallback(open)` | Function | Reports open state |
| `selectAllOptions` | `boolean?` | Enables select all |
| `selectAllOptionsTitle` | `string?` | Select-all label |
| `urlProp`, `iconProp` | `string?` | Option navigation/icon property names |

```tsx
<Dropdown
  enableSearch
  options={users}
  displayProp="fullName"
  valueProp="id"
  button={{ text: "Select user", dropdownAction: "click" }}
  onSelectionChange={(user) => setUser(user)}
/>
```

## Menu

Renders a structured `MenuClass` and manages collapse/search state.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `menu` | `MenuClass` | Yes | Menu model and behavior |
| `setMenuCollapsed` | React state setter | Yes | Updates collapsed state |
| `menuCollapsed` | `boolean` | Yes | Current collapsed state |
| `searchKey` | `string?` | No | Active search text |
| `stateKey` | `any` | No | Forces/reconciles menu state changes |
| `AppClient` | `AppClient?` | No | Translation and navigation integration |
| `children` | `ReactNode` | No | Additional content |
| `id` | `string?` | No | DOM identity |

### MenuClass

| Member | Purpose |
| --- | --- |
| `Items` | Root `MenuItemClass[]` |
| `Name`, `Data` | Menu identity and application data |
| `RTL` | Right-to-left rendering |
| `PreventURLCache` | Prevents cached URL behavior |
| `ItemClassConfig` | Normal/selected CSS classes |
| `ItemLoader(menu, item)` | Loads children on demand |
| `ItemVisiblityFn(menu, item)` | Applies application visibility policy |
| `Search`, `SearchItem` | Custom search behavior |
| `Init(menu, initialPath?)` | Initializes selected state from a path |
| `UnselectItems(menu, item?)` | Clears selection |

Visibility callbacks are not authorization controls; filter protected destinations and enforce permissions at the route/API.

## MenuItem

Renders one `MenuItemClass` inside a `MenuClass`.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `menu` | `MenuClass` | Yes | Owning menu |
| `item` | `MenuItemClass` | Yes | Item model |
| `searchKey`, `stateKey` | Optional | No | Search/state synchronization |
| `menuCollapsed` | `boolean?` | No | Current collapsed state |
| `setMenuCollapsed` | State setter | No | Updates collapsed state |
| `selected` | `boolean?` | No | Explicit selected state |
| `AppClient` | `AppClient?` | No | Translation/navigation integration |
| `listener` | Listener object | No | Select, unselect, and icon-click callbacks |
| `children`, `id` | Optional | No | Extra content and identity |

`MenuItemClass` defines `ID`, text, icons, CSS, `Location`, roles, login requirements, click handler, child items, lazy loading, custom component, direction, visibility, selection, level, and initialization behavior.

## Pagination

Renders page navigation and page-size controls.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `totalDatacount` | `number` | Yes | Total records across pages |
| `datacount` | `number` | Yes | Records in the current result |
| `page` | `number` | Yes | Current page |
| `pageSize` | `number` | Yes | Current records per page |
| `pageUrl` | `string` | Yes | URL used to construct page destinations |
| `pageSizes` | `number[]?` | No | Allowed page-size choices |
| `onChange` | `Function?` | No | Reports page changes |
| `onPageSizeChange` | `Function?` | No | Reports page-size changes |
| `pagesTitle`, `nextText`, `prevText` | `string?` | No | Navigation labels |
| `pageSizeSelectionText`, `totalCounText` | `string?` | No | Page-size and total labels |
| `visible`, `children`, `id` | Optional | No | Rendering, extra content, identity |

## Searchbar

Search interface with optional speech and barcode input.

| Prop | Type | Purpose |
| --- | --- | --- |
| `searchOptions` | `SearchOptionType[] \| async (key) => options` | Local or remote results |
| `onSearch(option, key?)` | Function | Handles a selected result/search |
| `placeholder` | `string?` | Input hint |
| `allowSpeechToText` | `boolean?` | Enables speech recognition |
| `allowBarcodeRead` | `boolean?` | Enables barcode scanning |
| `dismissText`, `selectText`, `navigateText` | `string?` | Action labels |
| `theme` | `SearchbarTheme?` | Search/microphone/barcode icons and item styling |
| `id` | `string?` | DOM identity |

`SearchOptionType` supports `id`, `image`, `title`, `location`, `badgeText`, and `shortCodeChar`. Media features require browser permission and a secure context.

## Shortcutlist

Displays shortcut tiles and an optional create-new tile. The public export intentionally uses the casing `Shortcutlist`.

| Prop | Type | Purpose |
| --- | --- | --- |
| `title` | `string?` | List heading |
| `items` | `ShortcutItemType[]` | Shortcut entries |
| `onItemClick(item)` | Function | Handles selection |
| `showBadge` | `boolean?` | Shows item badge values |
| `allowNew` | `boolean?` | Shows create-new item |
| `newImage`, `newTitle` | Image/string | New-item presentation |
| `visible`, `id` | Optional | Rendering and identity |

Each item supports `id`, `image`, `title`, `location`, and `badgeText`.

## Sidebar

Responsive container around `SidebarMenuClass`.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `menu` | `SidebarMenuClass` | Yes | Sidebar menu model |
| `stateKey` | `any` | No | Forces/reconciles state updates |
| `sidebarToggle` | `boolean \| null` | No | External open/close request |
| `closeOnNavigate` | `boolean?` | No | Closes after navigation |
| `closeOnOutsideClick` | `boolean?` | No | Closes when clicking outside |
| `defaultOpen` | `boolean?` | No | Initial open state |
| `AppClient` | `AppClient?` | No | Menu translation/navigation integration |
| `children`, `id` | Optional | No | Additional content and identity |

`SidebarMenuClass` extends `MenuClass` with `EnableSearch`, application/collapse/toggle/search icons, `AppTitle`, and `SearchIconPosition`.
