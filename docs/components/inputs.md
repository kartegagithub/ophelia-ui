# Inputs

Low-level inputs are suitable for ordinary React forms. Most extend native input/select/textarea attributes; the tables below focus on SDK-specific props. Public components not re-exported by the package root are intentionally omitted.

## AgreementCheckboxInput

Requires the user to view/accept agreement content, optionally after scrolling to the bottom.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `agreementText` | `string` | Yes | Agreement content shown in the modal |
| `label` | `ReactNode` | No | Checkbox label/trigger content |
| `modalTitle`, `modalClassName` | `string?` | No | Dialog heading and class |
| `agreeButtonText`, `rejectButtonText` | `string?` | No | Action labels |
| `agreeButtonClassName`, `rejectButtonClassName` | `string?` | No | Action classes |
| `waitForBottomScroll` | `boolean?` | No | Delays acceptance until content bottom is reached |
| `onCheckChange(checked, ref)` | Function | No | Reports agreement state and input reference |
| Native input props except `checked` | Native | No | Name, disabled, required, etc. |

## CheckboxInput

Checkbox with optional switch presentation.

| Prop | Type | Purpose |
| --- | --- | --- |
| `switchbox` | `boolean?` | Uses switch-style UI |
| `onText`, `offText` | `string?` | Labels for switch states |
| `label` | `string?` | Checkbox label |
| Native input props | Native | `checked`, `defaultChecked`, `onChange`, `name`, etc. |

## ColorInput

Color picker with optional alpha channel. Supports native input attributes and additional SDK HTML attributes.

| Prop | Type | Purpose |
| --- | --- | --- |
| `useAlpha` | `boolean?` | Includes alpha in the color value |
| `labelType` | `any` | SDK label presentation mode |
| Native input props | Native | Value, change, disabled, class, etc. |

Color helpers `addAlphaToHexColorCode`, `removeAlphaFromHexColorCode`, and `getAlphaFromHexColorCode` are also exported.

## DataList

Renders a native datalist model.

| Prop | Type | Purpose |
| --- | --- | --- |
| `options` | `string \| string[]` | Candidate values |
| Native datalist attributes | Native | Standard element attributes |

Connect it to an input with matching input `list` and datalist `id` values.

## DateInput

Date input with SDK label behavior.

| Prop | Type | Purpose |
| --- | --- | --- |
| `showPickerOnFocus` | `boolean?` | Opens the browser picker on focus where supported |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Value, min, max, onChange, required, etc. |

## DateRangeInput

Paired date inputs for a low/high range.

| Prop | Type | Purpose |
| --- | --- | --- |
| `lowValue` | `string?` | Lower/start date |
| `highValue` | `string?` | Upper/end date |
| DateInput props | Inherited | Picker, label, native date attributes |

## DateTimeInput

Date-time input.

| Prop | Type | Purpose |
| --- | --- | --- |
| `showPickerOnFocus` | `boolean?` | Opens the browser picker on focus where supported |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Value, limits, events, and accessibility attributes |

## EmailInput

Email input with optional action icons.

| Prop | Type | Purpose |
| --- | --- | --- |
| `list` | `string?` | Associated datalist ID |
| `rightIcon`, `rightIcon2` | `JSX.Element \| string \| IconProps` | Input action/status icons |
| `iconOnClick` | `() => void` | Icon action callback |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Value, autocomplete, pattern, etc. |

## FileInput

File picker with preview/icon presentation and client validation.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `validateFile(file)` | `(File) => boolean` | Yes | Accepts/rejects a selected file in the browser |
| `previewSize` | `string?` | No | Preview dimensions/class value |
| `sizeKey` | `string?` | No | Application size metadata key |
| `languageID` | `number?` | No | Associates file with a localized value |
| `leftIcon`, `rightIcon` | Image-like | No | Picker icons |
| `iconText` | `string?` | No | Icon/button label |
| `fileTypeWithButton` | `boolean?` | No | Uses button-style file selection |
| Native file input props | Native | No | `accept`, `multiple`, `onChange`, etc. |

Client validation is only a usability check. Validate size, MIME type, extension, content, and authorization on the server.

## FilterboxInput

Searchable local or remote selection component.

### Data and selection

| Prop | Type | Purpose |
| --- | --- | --- |
| `options` | `any[]?` | Local options |
| `defaultValue` | `any[]?` | Initial selections |
| `displayProp`, `valueProp` | `string?` | Option label/value properties |
| `displayFn(item)` | Function | Selected-item renderer |
| `dropDownDisplayProp`, `dropDownValueProp` | `string?` | Alternative dropdown properties |
| `valueName` | `string?` | Hidden value field name |
| `multipleSelection` | `boolean?` | Enables multiple values |
| `disabledOptions` | `any[]?` | Unavailable options |
| `allowClear` | `boolean?` | Allows clearing selection |
| `hideSelections` | `boolean?` | Hides selected-value chips/content |

### Search and creation

| Prop | Type | Purpose |
| --- | --- | --- |
| `searchFn(key?, page?, pageSize?)` | Async function | Retrieves remote results |
| `searchPlaceholder` | `string?` | Search hint |
| `enableSearch` | `boolean?` | Enables search UI |
| `allowNew` | `boolean?` | Enables inline option creation |
| `newTextInputPlaceholder` | `string?` | New-option input hint |
| `onNewAction(text)` | Async function | Creates and returns an option |
| `refreshOnOpen` | `boolean?` | Reloads results when opened |
| `getCollectionBinder(listener)` | Function | Supplies binder-backed content |

### Presentation and behavior

| Prop | Type | Purpose |
| --- | --- | --- |
| `placeholder` | `string?` | Empty selection text |
| `dropDownDefaultOpen`, `alwaysOpen` | `boolean?` | Initial/permanent open behavior |
| `applyText`, `resetText` | `string?` | Action labels |
| `applyButtonClassName`, `resetButtonClassName` | `string?` | Action classes |
| `applyIcon`, `resetIcon` | Image-like | Action icons |
| `shownInDropdown` | `boolean?` | Adapts rendering inside another dropdown |
| `allowSorting` | `boolean?` | Allows selection reordering |
| `selectedOptionDetailUrlPattern` | `string \| (item) => string` | Builds selected-option detail link |
| `selectAllOptions`, `selectAllOptionsTitle` | Optional | Select-all behavior and label |
| `optionTemplateFn(item)` | Function | Option renderer |
| `usePortal` | `boolean?` | Renders overlay through a portal |
| `low`, `high` | `number?` | Range/limit metadata |
| `hooks`, `className`, `id` | Optional | Extension hooks, styling, identity |

## HiddenInput

Thin hidden-input wrapper.

| Prop | Type | Purpose |
| --- | --- | --- |
| Native input props | `InputHTMLAttributes<HTMLInputElement>` | Name, value, form, identity, and event attributes |

Use it when a native hidden control must participate in submission.

## MonthInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| `showPickerOnFocus` | `boolean?` | Opens the browser picker on focus |
| Native input props | Native | Value, min/max, events, etc. |

## NumberInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Use `min`, `max`, and `step` for constraints |

## PasswordInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Value, autocomplete, events, etc. |

Set appropriate `autoComplete` values and never retain raw passwords in application state longer than necessary.

## PhoneInput

Phone input with SDK label behavior.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `list` | `string` | Yes | Associated datalist ID |
| `labelType` | `any` | No | Label presentation mode |
| Native input props | Native | No | Pattern, value, autocomplete, etc. |

## RadioInput

Controlled radio option.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `selectedValue` | `string` | Yes | Current group value |
| `setSelectedValue(value)` | Function | Yes | Updates group value |
| `label` | `string?` | No | Option label |
| `labelClass` | `string?` | No | Label class |
| `shape` | `string?` | No | Visual variation |
| `radioSize` | `number?` | No | Control size |
| Native input props | Native | No | `name`, `value`, disabled, etc. |

## RangeInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | `min`, `max`, `step`, `value`, and `onChange` |

## RichTextInput

Rich-text editor with optional async image upload.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `onChange` | `Function` | Yes | Reports editor content |
| `defaultValue` | `string?` | No | Initial markup |
| `imageHandler(fileName, size, buffer, base64, progress?)` | Async function | No | Uploads an inserted image and returns its URL/value |
| `visible` | `boolean?` | No | Controls rendering |
| `name`, `className`, `id` | `string?` | No | Form name, styling, identity |

Sanitize rich text at trust boundaries and validate uploaded images on the server.

## SelectInput

Native select enhanced with mapped option data.

| Prop | Type | Purpose |
| --- | --- | --- |
| `options` | `any[]?` | Options to render |
| `displayProp`, `valueProp` | `string?` | Object label/value properties |
| `placeholder` | `string?` | Empty option text |
| `low`, `high` | `number?` | Numeric range metadata |
| `switchbox` | `boolean?` | Switch-style presentation |
| `isDisabled` | `boolean?` | SDK disabled flag |
| Native select props | Native | Value, multiple, onChange, disabled, etc. |

`SelectInputOption` contains required `text` and `value`, plus optional normal/selected classes and `isDisabled`.

## TextAreaInput

Textarea with optional automatic height tracking.

| Prop | Type | Purpose |
| --- | --- | --- |
| `trackHeight` | `boolean?` | Adjusts height to content |
| `maxTrackedHeight` | `number?` | Caps automatic height |
| `rows` | `number?` | Initial/native row count |
| `labelType` | `any` | Label presentation mode |
| Native textarea props | Native | Value, maxLength, onChange, etc. |

## TextInput

General text input with optional icons and date behavior.

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| `list` | `string?` | Associated datalist ID |
| `isDate` | `boolean?` | Enables SDK date-specific handling |
| `rightIcon`, `rightIcon2` | Image-like | Input icons/actions |
| `iconOnClick` | `() => void` | Icon action callback |
| `value` | `any` | Current value |
| Native input props | Native | Placeholder, defaultValue, onChange, etc. |

## TimeInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| `list` | `string?` | Associated datalist ID |
| `showPickerOnFocus` | `boolean?` | Opens picker on focus |
| Native input props | Native | Value, limits, events, etc. |

## TimeRangeInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `lowValue`, `highValue` | `string?` | Range endpoints |
| TimeInput props | Inherited | Picker, label, datalist, and native time attributes |

## URLInput

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `list` | `string` | Yes | Associated datalist ID |
| `labelType` | `any` | No | Label presentation mode |
| Native input props | Native | No | Value, pattern, and change handling |

## WeekInput

| Prop | Type | Purpose |
| --- | --- | --- |
| `labelType` | `any` | Label presentation mode |
| Native input props | Native | Value, min/max, events, etc. |
