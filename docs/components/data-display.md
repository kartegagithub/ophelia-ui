# Data display

## Icon

Renders an SDK or application theme icon.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Icon registry name |
| `size` | `number?` | No | Shared width/height size |
| `width`, `height` | `number \| string` | No | Explicit dimensions |
| `color` | `string?` | No | General icon color |
| `fill` | `string?` | No | Fill color |
| `className` | `string?` | No | CSS class |
| `ext1`, `ext2`, `ext3` | `string?` | No | Extra theme-icon color/value channels |
| `alt` | `string?` | No | Alternative text where applicable |
| `unoptimized` | `boolean?` | No | Disables image optimization where applicable |
| `id` | `string?` | No | DOM identity |

Decorative icons should be hidden from assistive technology; meaningful icons need an accessible label in their surrounding control.

## Image

Wraps image rendering with a fallback and Next-compatible source support. Native `ImgHTMLAttributes<HTMLImageElement>` are supported.

| Prop | Type | Purpose |
| --- | --- | --- |
| `src` | `string \| StaticImport` | Image source |
| `alt` | `string?` | Alternative text |
| `width`, `height` | `number?` | Explicit dimensions |
| `size` | `number?` | Shared dimension shortcut |
| `defaultImage` | `string?` | Fallback source |
| `unoptimized` | `boolean?` | Disables Next image optimization behavior |
| `id` and native image props | Native | Identity, loading, events, classes, etc. |

`getImageComponent(value, props?, funcParams?)` normalizes icon props, strings, elements, or renderer functions into an element.

## Label

Class-based label/value presentation.

| Prop | Type | Purpose |
| --- | --- | --- |
| `name` | `string?` | Label name |
| `value` | `string?` | Displayed value |
| `for` | `string?` | Associated control ID (legacy public prop name) |
| `children` | `ReactNode` | Custom label content |
| `className`, `id` | `string?` | Styling and identity |

## RawHTML

Renders strings or nodes using a selected wrapper and optional sanitization.

| Prop | Type | Purpose |
| --- | --- | --- |
| `html` | `string \| JSX.Element \| ReactNode` | Content to render |
| `tag` | `"span" \| "div" \| "label"` | Wrapper element |
| `sanitize` | `boolean?` | Sanitizes string HTML |
| `clearHtml` | `boolean?` | Removes HTML markup according to component behavior |
| `replaceNewLines` | `boolean?` | Converts newline presentation |
| `className`, `id` | `string?` | Styling and identity |

Keep sanitization enabled for user- or API-provided markup. Review URL schemes and allowed tags for the rendering context.

## Table

Renders structured data using `TableClass` and `TableColumnClass`.

### Table props

| Prop | Type | Purpose |
| --- | --- | --- |
| `table` | `TableClass?` | Column configuration model |
| `data` | `any[]?` | Rows to render |
| `appClient` | `AppClient?` | Translation/theme integration |
| `allowFiltering`, `allowSorting` | `boolean?` | Enables column filters and sorting |
| `selectedRowIndex` | `number?` | Selected row |
| `applyRowValidation` | `boolean?` | Applies row validation UI |
| `refreshKey` | `string \| number` | Invalidates/re-renders table state |
| `focusForNewRow` | `boolean?` | Focuses a newly inserted editable row |
| `emptyColumnToBeginning`, `emptyColumnToEnd` | `boolean?` | Adds action/empty columns |
| `checkboxes` | `boolean?` | Enables row checkbox UI |
| `checkedItems` | `any[]?` | Checked rows |
| `columnData` | `any` | Auxiliary column metadata |
| `hierarchicalDisplay` | `boolean?` | Enables hierarchy rendering |
| `hierarchyPropertyName` | `string?` | Parent/relationship property |
| `hierarchyParentValue` | `string \| number` | Root hierarchy value |
| `isHeaderSticky` | `boolean?` | Keeps header visible |
| `adjustHeight` | `boolean?` | Enables height adjustment |
| `theme` | `TableTheme?` | Filter/sort icon overrides |
| `listener` | Listener object | Cell, row, sort, filter, edit, selection, and sanitization callbacks |
| `children`, `className`, `id` | Optional | Extra content, styling, identity |

### Table listener

| Callback | Purpose |
| --- | --- |
| `canClickCell` | Asynchronously permits a cell action |
| `onCellClick` | Observes cell clicks |
| `renderCellValue`, `renderEmptyCell` | Custom cell renderers |
| `canRenderRow` | Filters row rendering |
| `onSortingChanged`, `onFilteringChanged` | Reports query changes |
| `onCellValueChanging`, `onCellValueChanged`, `onCellValueCancelled` | Coordinates editing |
| `onSelectedRowChange` | Reports row selection |
| `getItemPropertyValue` | Custom nested/value lookup |
| `getSanitizeOptions` | Supplies HTML sanitization policy |
| `getRowProps`, `getCellProps` | Adds calculated attributes/classes |
| `setCheckedItems`, `isChecked` | External checkbox state integration |

### TableColumnClass

| Property group | Important members |
| --- | --- |
| Identity/rendering | `Type`, `PropertyName`, `HeaderText`, `Format`, `TextFormatter`, `Width`, `MaxTextLength` |
| Visibility/order | `Visible`, `DisplayOrder`, `Freeze` |
| Capabilities | `AllowSorting`, `AllowFiltering`, `AllowEditing`, `AllowEditingOnNewRow`, `AllowSummarize` |
| State | `IsSorted`, `SortDirection`, `SortOrder`, `IsFiltered` |
| Input/data | `DataSource`, `InputProps`, `DecimalPlaces`, `I18n`, `CellDisplayProp`, `CellValueProp` |
| Lifecycle | `OnBeforeSetData`, `OnAfterSetData`, `OnAfterGetData` |
| Filtering | `Filtering.Type`, names/values, comparison, enum, multi-select, and remote data source |

```tsx
const table = new TableClass();
table.Columns = [
  Object.assign(new TableColumnClass(), {
    Type: "text",
    PropertyName: "name",
    HeaderText: "Name",
    AllowSorting: true,
  }),
];

<Table table={table} data={products} allowSorting />
```
