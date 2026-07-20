# Data binders

Binders implement metadata-driven CRUD screens. `CollectionBinder` lists and manages a set of records; `EntityBinder` loads and edits one record. Both are stateful React class components and must be rendered below a client boundary.

The recommended application structure is:

```text
SDK binder
└── Application base binder
    └── Feature binder
        └── Page or nested binder
```

An application base binder centralizes headers, service creation, permissions, shared columns, confirmation dialogs, imports, and persistent settings. A feature binder should normally contain only its data source, columns or fields, and entity-specific rules.

## Shared BinderOptions

`BinderOptions` controls commands, routes, visibility, identity, import, and export. Pass it through the `options` prop of `CollectionBinder` or the case-sensitive `Options` prop of `EntityBinder`.

### Navigation and identity

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `PageTitle` | `string?` | — | Header title when a prop-level title is not used |
| `NewURL` | `string?` | — | Destination for creating a record |
| `ActionURL` | `string?` | — | Base action endpoint or application action path |
| `EditURL` | `string?` | — | Edit-page URL pattern |
| `ViewURL` | `string?` | — | Read-only detail URL pattern |
| `BackURL` | `string?` | — | Explicit destination for the back action |
| `UpdateContent` | `string?` | — | Application-defined update content |
| `UniqueKeyName` | `string?` | `"id"` | Property used as the record identity |
| `IsUniqueKeyNumeric` | `boolean?` | `true` | Whether the unique key is treated as numeric |
| `IsNewEntity` | `boolean?` | `false` | Forces new-record behavior |

### Capabilities and visibility

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `AllowBack` | `boolean?` | `true` | Enables the back command |
| `AllowNew` | `boolean?` | `true` | Enables record creation |
| `AllowEdit` | `boolean?` | `true` | Enables editing |
| `AllowSave` | `boolean?` | `true` | Enables save behavior |
| `AllowDelete` | `boolean?` | `true` | Enables deletion behavior |
| `AllowRefresh` | `boolean?` | `true` | Enables data refresh |
| `AllowExport` | `boolean?` | `true` | Enables export |
| `AllowImport` | `boolean?` | `false` | Enables file import |
| `AllowSettings` | `boolean?` | `true` | Enables binder layout/settings UI |
| `AllowColumnSummarize` | `boolean?` | `false` | Enables column summaries in collections |
| `AllowCopyAndSave` | `boolean?` | `false` | Enables duplicating the current entity before save |
| `AllowDetailNavigation` | `boolean?` | `true` | Allows navigation from a collection row to detail |
| `DrawViewLinkInsteadOfEdit` | `boolean?` | `false` | Renders a view action instead of edit navigation |
| `SaveButtonVisibility` | `boolean?` | `true` | Shows the save button when saving is allowed |
| `DeleteButtonVisibility` | `boolean?` | `true` | Shows the delete button when deletion is allowed |
| `RefreshButtonVisibility` | `boolean?` | `true` | Shows the refresh button when refresh is allowed |
| `Visible` | `boolean?` | `true` | Controls the whole binder's visibility |
| `PageTitleVisibility` | `boolean?` | `true` | Controls title rendering |
| `HeaderVisibility` | `boolean?` | `true` | Controls binder header rendering |

Capability flags are UI controls, not authorization. The API must independently authorize every read and mutation.

### Export and import

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `Export.Types` | `ExportOption[]?` | Excel option | Available export formats |
| `Export.Mode` | `"remote" \| "screenshot" \| "custom"` | `"screenshot"` | Chooses server export, rendered-table export, or callback behavior |
| `Export.Callback` | `(option) => Promise<ArrayBuffer>` | — | Produces custom export bytes |
| `Import.FileTypes` | `string?` | `"*.xlsx,*.csv"` | File-picker acceptance hint |
| `Import.Message` | `string \| JSX.Element` | — | Instructions shown in import UI |
| `Import.SampleFile` | `string \| JSX.Element` | — | Sample-file link or custom UI |
| `Import.Callback` | `(file: FileData) => Promise<ArrayBuffer>` | — | Processes an imported file |

## CollectionBinder

`CollectionBinder` coordinates data retrieval, query state, table rendering, selection, inline editing, nested entity binders, imports, exports, and persistent column settings.

### CollectionBinderProps

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `AppClient` | `AppClient \| undefined` | Yes | Supplies services, region, translations, routing, and theme integration |
| `config` | `Config?` | No | Collection data source, table, query, paging, and interaction configuration |
| `options` | `BinderOptions?` | No | Collection commands, routes, visibility, identity, import, and export options |
| `initialFilters` | `any` | No | Initial server/client filter object merged into collection requests |
| `manualFilters` | `string[]?` | No | Property names managed outside normal column-filter UI |
| `data` | `any` | No | Initial or externally supplied collection data |
| `shownInParent` | `boolean?` | No | Marks the binder as nested; applications commonly use a modal/drawer header |
| `pageTitle` | `string?` | No | Page-level title supplied by the host page |
| `parent` | `EntityBinder \| CollectionBinder` | No | Parent binder used for nested actions and coordination |
| `viewId` | `string?` | No | Identifies a binder view or persistent configuration |
| `checkedItems` | `any[]?` | No | Initial externally supplied checked rows |
| `className` | `string?` | No | CSS class added to the binder root |
| `hidePagination` | `boolean?` | No | Hides pagination controls; it does not itself change request strategy |
| `showTotalDataCount` | `boolean?` | No | Displays the total server/client result count |
| `page` | `number?` | No | Initial or host-supplied page number |
| `pageSize` | `number?` | No | Initial or host-supplied page size |
| `readonly` | `boolean?` | No | Prevents collection editing behavior |
| `listener` | `CollectionBinderListener?` | No | Supplies row, cell, selection, and data callbacks |

Prop names are case-sensitive: CollectionBinder uses lowercase `config` and `options`.

### listener callbacks

| Callback | Return | Purpose |
| --- | --- | --- |
| `canClickCell(event, row, column, rowIndex, columnIndex)` | `Promise<boolean>` | Asynchronously allows or rejects a cell action |
| `getSelectedRowIndex()` | `number` | Supplies an externally managed selected-row index |
| `canCheckRow(row, rowIndex)` | `boolean` | Controls checkbox availability per row |
| `onCheckedItemsChanged(items)` | `void` | Receives the full checked-item collection |
| `onCellClick(event, row, column, rowIndex, columnIndex)` | `void` | Observes a permitted cell click |
| `onDataChanged(data?)` | `void` | Observes collection data replacement or mutation |
| `renderEmptyCell(event, row)` | `JSX.Element` | Renders application actions in an empty/action cell |
| `getRowProps(row, index)` | `any` | Adds calculated props such as classes or data attributes to a row |

### Config

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `Entity` | `string?` | `""` | Singular backend entity name |
| `Schema` | `string?` | `""` | Backend schema or service group |
| `DataSourcePath` | `string?` | `""` | Explicit endpoint/data-source path |
| `PageSize` | `number?` | `25` | Default rows per page |
| `Query` | `QueryData?` | New instance | Filter, sort, and paging query state |
| `Table` | `TableClass?` | New instance | Table and column rendering model |
| `RowSelection` | `string?` | `""` | Application selection mode identifier |
| `RowClickOption` | `"navigate" \| "showEntityBinder"` | — | Navigates to a page or opens the nested entity binder |
| `NewEntityMethod` | `"Default" \| "Row"` | `"Default"` | Uses a separate entity flow or creates an editable collection row |
| `NewEntityLocation` | `"Beginning" \| "End"` | `"Beginning"` | Placement of a new inline row |
| `SaveActionType` | `"EnterKey" \| "SaveButtonClick"` | `"EnterKey"` | Trigger used for inline-row saves |
| `SaveOnCellValueChange` | `boolean?` | `false` | Saves after a cell value changes |
| `ChildBinderContainer` | `"modal" \| "drawer"` | `"drawer"` | Container for a nested entity binder |
| `Checkboxes` | `boolean?` | `false` | Enables row checkboxes |
| `HideSelectAll` | `boolean?` | `false` | Hides the header select-all control |
| `HierarchicalDisplay` | `boolean?` | `false` | Enables parent/child row presentation |
| `StickyHeader` | `boolean?` | `false` | Keeps the table header visible while scrolling |
| `HierarchyPropertyName` | `string?` | `""` | Property used to relate hierarchical rows |
| `HierarchyParentValue` | `string?` | `""` | Root/parent value for hierarchy evaluation |
| `EmptyColumnSelection` | `"Both" \| "Beginning" \| "End" \| "None"` | `"None"` | Adds empty action columns around table data |
| `SortingMethod` | `"Server" \| "Client"` | `"Server"` | Location of sorting work |
| `FilteringMethod` | `"Server" \| "Client"` | `"Server"` | Location of filtering work |
| `PaginationMethod` | `"Server" \| "Client"` | `"Server"` | Location of pagination work |
| `beforeSendRequest(data)` | `(any) => any` | Identity | Transforms request data immediately before dispatch |
| `onRowSelectionChange(keys, rows)` | Function | No-op | Receives selected keys and row objects |

### Minimal collection subclass

The following pattern is adapted from the administration project. It keeps page code small and defines the table in one feature class.

```tsx
"use client";

import {
  CollectionBinder,
  CollectionBinderProps,
} from "ophelia-next";

export default class UserCollectionBinder<P> extends CollectionBinder<
  P & CollectionBinderProps
> {
  Configure() {
    this.SetDataSource("membership", "User");
    this.SetColumns([
      { Type: "text", PropertyName: "fullName" },
      { Type: "email", PropertyName: "emailAddress" },
      { Type: "date", PropertyName: "birthDate" },
      { Type: "checkbox", PropertyName: "isGlobalAdmin" },
    ]);

    this.Config.StickyHeader = true;
    this.Config.RowClickOption = "showEntityBinder";
    this.Options.AllowDelete = false;
    super.Configure();
  }
}
```

Call `super.Configure()` after feature configuration when the application base class applies final defaults. If the base class must establish defaults first, call it first and document which layer wins.

### Render a collection page

```tsx
<UserCollectionBinder
  AppClient={client}
  pageTitle="Users"
  manualFilters={["description"]}
  showTotalDataCount
  options={{ AllowNew: true, AllowDelete: false }}
/>
```

For external filters, update `initialFilters`. If a binder does not react to object changes in the desired way, remount it with a stable key derived from the filter state:

```tsx
<ReportCollectionBinder
  key={`${startDate}:${endDate}`}
  AppClient={client}
  initialFilters={{ startDate, endDate }}
  hidePagination
/>
```

Avoid random remount keys unless a full state reset is intentional; they discard selection, paging, loading, and nested binder state.

### Nested EntityBinder

Set `RowClickOption` to `"showEntityBinder"` and override `renderEntityBinder`:

```tsx
renderEntityBinder(entity: User) {
  return (
    <UserEntityBinder
      AppClient={this.props.AppClient}
      Data={entity}
      parent={this}
      shownInParent
    />
  );
}
```

The child receives the selected row through `Data`, identifies its parent, and can notify the collection after save or delete.

### Important collection extension points

| Member | Typical use |
| --- | --- |
| `Configure()` | Set data source, columns, options, and behavior |
| `SetDataSource(schema, entity, pluralEntity?)` | Configure convention-based collection and update paths |
| `SetDataSourcePath(path)` | Use an explicit data path |
| `SetColumns(columns)` | Define table columns |
| `CreateService()` | Return the application API service |
| `renderEntityBinder(entity)` | Provide nested detail/edit UI |
| `onAfterSetData()` | Synchronize application headers or dependent state |
| `CanAddNewRow(action, list?)` | Guard inline row creation |
| `OnNewRowAdded(data)` | Initialize new-row defaults |
| `CanSaveEntity(data)` | Apply client-side save policy |
| `CanDeleteEntity(data)` | Apply client-side delete policy |
| `ConfirmDeletion()` | Display an application confirmation dialog |
| `getCellProps(...)`, `getRowProps(...)` | Apply conditional styling and attributes |
| `renderCellValue(...)`, `renderEmptyCell(...)` | Customize cell content and action columns |
| `GetPersistentSetting(...)`, `OnSaveSettings(...)` | Load and save user-specific column layout |
| `uploadFiles`, `approveImport`, `rejectImport` | Integrate the import workflow |

## EntityBinder

`EntityBinder` loads or creates an entity, registers fields, manages validation and files, saves/deletes through `EntityOperations`, renders tabs and panels, and coordinates with a parent collection.

### EntityBinderProps

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `AppClient` | `AppClient \| undefined` | Yes | Supplies services, translation, routing, analytics, and theme integration |
| `Options` | `BinderOptions?` | No | Entity commands, routes, visibility, identity, import, and export options |
| `id` | `string \| number \| string[]` | No | Identity loaded by `GetEntity`; omit for a new entity |
| `Data` | `any` | No | Preloaded entity data; can avoid a second fetch when supplied with the selected row |
| `shownInParent` | `boolean?` | No | Marks the binder as nested in a collection, drawer, modal, or another entity |
| `useI18N` | `boolean?` | No | Enables localized entity property handling |
| `parent` | `EntityBinder \| CollectionBinder` | No | Parent that receives nested actions and refresh behavior |
| `pageTitle` | `string?` | No | Host-provided title used by headers and metadata integrations |
| `initialFilters` | `any` | No | Extra filters sent while loading or creating the entity |
| `onDataChange` | `(data: any) => void` | No | Observes changes to the binder's entity data |

Prop names are case-sensitive: EntityBinder uses uppercase `Options` and `Data`, but lowercase `id` and `initialFilters`.

### Loading modes

| Props | Behavior |
| --- | --- |
| `id` only | Loads the entity through the configured service |
| `Data` only | Starts from supplied data, commonly in a nested binder |
| `id` and `Data` | Uses the supplied data where supported while retaining identity |
| Neither | Creates a new entity through `CreateEntity()` |

Do not assume `Data` is current merely because it came from a collection row. Reload it when the edit screen requires fields not present in the list projection.

### Minimal entity subclass

This example follows the feature-binder pattern used by the administration project:

```tsx
"use client";

import {
  EntityBinder,
  EntityBinderProps,
} from "ophelia-next";

export default class UserEntityBinder<P> extends EntityBinder<
  P & EntityBinderProps
> {
  Configure() {
    this.SetDataSource("membership", "User");
    this.Options.AllowNew = false;
    super.Configure();
  }

  renderBinder() {
    return this.useTabs(
      this.useTab(
        "definition",
        "Definition",
        true,
        true,
        this.useInput({ type: "text", name: "fullName", required: true }),
        this.useInput({ type: "email", name: "emailAddress", required: true }),
        this.useInput({ type: "phone", name: "phoneNumber" }),
        this.useInput({ type: "date", name: "birthDate" }),
        this.useInput({ type: "checkbox", name: "isGlobalAdmin" }),
        this.useInput({ type: "file", name: "profilePicture" }),
      ),
    );
  }
}
```

`useInput()` creates and registers an `InputField`, so its values participate in binder validation, i18n, file handling, and save operations.

### Render an entity page

```tsx
<UserEntityBinder
  AppClient={client}
  id={params.id}
  Data={pageData}
  pageTitle="Edit user"
  Options={{ AllowDelete: false, AllowCopyAndSave: true }}
  onDataChange={(user) => setPreviewUser(user)}
/>
```

### Conditional and localized fields

Fields can derive visibility and disabled state from binder data. Localized fields opt into entity i18n storage with `i18n: true`.

```tsx
this.useInput({
  type: "checkbox",
  name: "sendMobileNotification",
});

this.useInput({
  type: "text",
  name: "mobileNotificationTitle",
  i18n: true,
  visible: () => this.state.data.sendMobileNotification === true,
});

this.useInput({
  type: "file",
  name: "notificationImage",
  i18n: true,
  disabled: this.state.data.id > 0,
});
```

Set `this.UseI18n = true`, populate `Languages` and `DefaultLanguageID`, and render `useI18NLanguageSelection()` when users must edit multiple language values.

### Nested CollectionBinder

An entity can render a related collection after the parent has been saved:

```tsx
{this.state.data.id > 0 && (
  <PushNotificationUserCollectionBinder
    AppClient={this.props.AppClient}
    parent={this}
    shownInParent
    initialFilters={{ pushNotificationID: this.state.data.id }}
    options={{ AllowBack: false, PageTitleVisibility: false }}
  />
)}
```

Only render a dependent collection after its foreign key exists. Pass that key through `initialFilters` and enforce the same relationship server-side.

### Important entity configuration members

| Member | Values/default | Purpose |
| --- | --- | --- |
| `Controller` | `string` | Service/controller group configured by `SetDataSource` |
| `Entity` | `any` | Entity name or application entity metadata |
| `AjaxBinder` | `boolean` | Controls remote binder behavior |
| `UseI18n` | `boolean` | Enables localized field storage |
| `Languages` | `{ id, name, isoCode }[]` | Languages available to localized fields |
| `DefaultLanguageID` | `number` | Fallback language identity |
| `LanguageSelectionType` | `"dropdown" \| "buttons"` | Language selector presentation |
| `AfterSaveAction` | `"BackToList" \| "PreviousPage" \| "RefreshData"` | Navigation/state action after save |
| `RefreshDataOnLoad` | `boolean` | Whether data is refreshed during initialization |
| `UploadFiles` | `FileData[]` | Files accumulated for the next save |

### Important entity extension points

| Member | Typical use |
| --- | --- |
| `Configure()` | Set data source, permissions, i18n, and post-save behavior |
| `SetDataSource(controller, entity)` | Configure convention-based get/update paths |
| `CreateService()` | Return the application API service |
| `renderBinder()` | Compose fields, tabs, panels, and nested binders |
| `useInput(props)` | Create and register a typed field |
| `useTabs`, `useTab`, `usePanel` | Structure entity UI |
| `beforeSendRequest(data)` | Normalize a payload before save |
| `CreateEntity()` | Supply defaults for a new entity |
| `GetEntity(id, data)` | Customize entity loading |
| `validateFields()` | Run registered field validation |
| `ConfirmDeletion()` | Display an application confirmation dialog |
| `OnAfterSave()` | Customize redirect behavior after a successful save |
| `onAfterSetData(data)` | Update headers, metadata, or dependent state after loading |
| `onChildAction(type, param?)` | React to nested binder actions |
| `ImageUploadHandler(...)` | Upload/transform an image and return its stored value |
| `validateFileUpload(file)` | Enforce client-side file policy before upload |
| `ProcessCopiedData(data)` | Remove or transform values during copy-and-save |

## EntityOperations

Both binders use `EntityOperations` for property access, localized values, file tracking, save, delete, and entity retrieval. Its service-related members are:

| Member | Purpose |
| --- | --- |
| `Service` | `APIService` used for entity requests |
| `UpdateURL` | Save/delete endpoint |
| `GetEntityURL` | Single-entity endpoint |
| `Entity` | Entity name used by i18n conventions |
| `UseI18n` | Enables localized property resolution |
| `DefaultLanguageID` | Fallback language used for localized values |

`SaveEntity()` submits `{ data, languageID, files }`. `DeleteEntity()` submits a cloned record with `statusID: 2`, so the default implementation is a soft-delete convention. The backend remains responsible for validating payloads and enforcing deletion policy.

## Production checklist

- Create a request-safe `AppClient` and application `APIService`.
- Use a shared application base binder for repeated headers, columns, services, and confirmation behavior.
- Give every entity a stable `UniqueKeyName`.
- Match client/server pagination, sorting, and filtering modes.
- Keep `options`/`Options` and `data`/`Data` casing correct.
- Validate filters, sorts, file content, and entity permissions on the server.
- Confirm destructive operations and prevent duplicate saves.
- Abort obsolete requests where the application service supports cancellation.
- Test new, preloaded, remotely loaded, nested, empty, loading, error, and read-only states.
- Test localized and file fields for every supported language and failure path.
