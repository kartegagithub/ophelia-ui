# Form-aware fields

Field components wrap low-level inputs with labels, visibility, data binding, validation, localization, and Ophelia `Form`/`EntityBinder` integration. Every typed field extends `BaseField`.

## BaseField shared props

These props apply to all field components unless a typed field narrows them.

### Identity and values

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `id` | `string` | Yes in `BaseField` contract | Field/control identity |
| `name` | `string` | Yes | Property read from and written to form/entity data |
| `valueName` | `string?` | No | Alternative property used for stored value |
| `lowValueName`, `highValueName` | `string?` | No | Property names for range endpoints |
| `value`, `defaultValue` | `any` | No | Current/initial value |
| `checked` | `boolean?` | No | Boolean checked state |
| `languageKey` | `string \| number` | No | Localized value key/identity |
| `i18n` | `boolean?` | No | Stores value in localized entity data |

### Label and presentation

| Prop | Type | Purpose |
| --- | --- | --- |
| `text` | `string?` | Field label |
| `labelVisible` | `boolean?` | Shows/hides label |
| `labelType` | `"seperated" \| "floatingFixed" \| "floating"` | Label layout; public value retains legacy spelling |
| `visible` | `boolean \| Function` | Static or calculated visibility |
| `rootStyle` | `any` | Root styling data |
| `errorClassName` | `string?` | Validation-error class |
| `errorMessageText` | `string?` | Explicit validation message |

### Behavior and validation

| Prop | Type | Purpose |
| --- | --- | --- |
| `required` | `boolean?` | Adds required validation |
| `rules` | `InputValidationRule \| InputValidationRule[]` | Additional validation rules |
| `validateCallback(isValid, value)` | Function | Adjusts final validation result |
| `errorDisplayFn(name, msg?)` | Function | Custom validation renderer |
| `setDataCallback(value)` | Function | Transforms data before storage |
| `valueFormatter(value)` | Function | Formats a displayed value |
| `format` | `string?` | Type-specific formatting pattern |
| `onChange` | `Function?` | Observes value change |
| `disabled` | `boolean?` | Disables input |
| `disabledFn` | `Function?` | Calculates disabled state |
| `multipleSelection` | `boolean?` | Enables multi-value fields where supported |
| `listener` | `any` | Explicit binder/form listener; normally injected |

## BaseField methods

| Method | Purpose |
| --- | --- |
| `GetValue()` | Reads the current field value |
| `GetProps()` | Returns effective field props |
| `Validate(value, propName?)` | Runs required/rule/callback validation |
| `onValueChange(eventOrValue)` | Processes and commits a change |
| `getVisibility()`, `getDisabled()` | Evaluates current calculated state |
| `showError()` | Renders current error through configured policy |

## InputValidationRule

| Property | Type | Purpose |
| --- | --- | --- |
| `field` | `string \| string[]` | Field(s) governed by the rule |
| `rule` | RegExp/function or array | Tests a value, optionally with full form data |
| `min`, `max` | `number \| Date` | Range constraints |
| `message` | String/function | Static or calculated failure message |
| `messageDisplayFn` | `Function?` | Custom message renderer |
| `format` | Function | Formats a value using optional translation |
| `ruleSatisfaction(index, satisfied)` | Function | Reports each rule in an array |

```ts
const rule = new InputValidationRule();
rule.field = "displayName";
rule.min = 3;
rule.rule = (value) => typeof value === "string" && value.trim().length >= 3;
rule.message = "Display name must contain at least three characters.";
```

## InputField

`InputField` is a dispatcher with a broad `any` prop contract. Its `type` chooses a typed field internally.

| `type` | Field |
| --- | --- |
| `text` | `TextField` |
| `numeric` | `NumericField` |
| `date`, `datetime`, `time`, `week`, `month` | Corresponding date/time field |
| `daterange`, `timerange` | Range field |
| `checkbox` | `BoolField` |
| `selectbox`, `enum` | Dropdown/enum field |
| `filterbox` | `DropdownFilterboxField` |
| `password`, `email`, `phone`, `url` | Corresponding text field |
| `richtext`, `textarea` | Corresponding content field |
| `color`, `file`, `range`, `image` | Corresponding specialized field |

Prefer a typed field in application code when possible; it provides better TypeScript guidance. `EntityBinder.useInput()` uses the dispatcher because binder metadata is dynamic.

## Individual typed fields

Every component below accepts the shared `BaseField` props. The table lists its purpose and additional/narrowed props.

| Component | Purpose | Specific props |
| --- | --- | --- |
| `AgreementCheckboxField` | Agreement acceptance with form validation | Agreement input props passed through the field |
| `BoolField` | Checkbox/boolean value | `name`, `text?`, `value?`, `listener?` |
| `ColorField` | Color value | `name`, `text?`, `value?`, `listener?` |
| `DateField` | Single date | `format?` in addition to common value props |
| `DateRangeField` | Start/end date range | `lowValue?`, `highValue?`, `format?` |
| `DateTimeField` | Date and time | `format?` in addition to common value props |
| `DropdownField` | Local select/dropdown | `placeholder?`, `options?`, `displayProp?`, `valueProp?`, `low?`, `high?`, `multiple?` |
| `DropdownFilterboxField` | Remote/searchable selection | Remote source, mapping, creation, clear, templates, select-all, nested binder props |
| `EmailField` | Email address | Common `name`, `text`, `value`, listener props |
| `EnumSelectBoxField` | Enum-backed select | `placeholder?`, `options?`, `enumSelectionType?`, `translateFn?` |
| `FileField` | File selection and binder file tracking | Common value props plus input/file props passed through |
| `ImageField` | Image value/preview | `alt?` plus common value props |
| `LabelField` | Read-only label value | `defaultValue?` plus common value props |
| `MonthField` | Month value | Common value props |
| `NumericField` | Numeric value | Common value props and numeric input attributes passed through |
| `PasswordField` | Password value | `name`, `text?`, `listener?` |
| `PhoneField` | Phone value | Common value props |
| `RangeField` | Numeric range slider | Common value props and range input props passed through |
| `RichTextField` | Rich-text markup | `imageHandler?` for async inserted-image upload |
| `TextAreaField` | Multi-line text | Common value props and textarea props passed through |
| `TextField` | General text | `isDate?` plus common value props |
| `TimeField` | Single time | `format?` plus common value props |
| `TimeRangeField` | Start/end time | `lowValue?`, `highValue?`, `format?` |
| `URLField` | URL value | Common value props |
| `WeekField` | Week value | `format?` plus common value props |

### DropdownFilterboxField props

| Prop | Type | Purpose |
| --- | --- | --- |
| `remoteDataSource.CallFunction(input, page, pageSize, extraFilters?)` | Async function | Loads options; required when remote source is supplied |
| `remoteDataSource.DisplayProp`, `ValueProp` | `string?` | Maps remote option labels/values |
| `remoteDataSource.ExtraFilters` | `any` | Extra request filter data |
| `remoteDataSource.Hooks` | `any` | Application extension hooks |
| `displayProp`, `valueProp`, `valueName` | `string?` | Maps displayed/stored data |
| `displayFn(item)` | Function | Custom selected-item renderer |
| `multiple` | `boolean?` | Enables multiple selection |
| `allowNew` | `boolean?` | Enables creating an option |
| `newTextInputClassName`, `newTextInputPlaceholder` | `string?` | New-option input presentation |
| `allowClear`, `hideSelections`, `dropDownDefaultOpen` | `boolean?` | Selection/dropdown behavior |
| `selectAllOptions`, `selectAllOptionsTitle` | Optional | Select-all behavior |
| `optionTemplateFn(item)` | Function | Option renderer |
| `getCollectionBinder(listener)` | Function | Binder-backed selection content |

## Example

```tsx
<Form
  formData={{ email: "", active: true }}
  onSubmit={(_event, data, isValid) => isValid && save(data)}
>
  <EmailField id="email" name="email" text="Email" required />
  <BoolField id="active" name="active" text="Active" />
  <Button type="submit" text="Save" />
</Form>
```

Field visibility and disabled callbacks may read other form/entity values, but should remain deterministic and free of side effects.
