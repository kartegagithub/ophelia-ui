# Components and forms

All supported components are named exports from `ophelia-next`. Most accept standard React HTML attributes in addition to SDK-specific props.

## Component families

| Family | Exports |
| --- | --- |
| Actions and feedback | `Button`, `Alert`, `Notification`, `Toast`, `Progress`, `Spinner`, `Indicator`, `ContentLoading` |
| Layout and disclosure | `Accordion`, `AccordionGroup`, `Grid`, `GridRow`, `GridColumn`, `Panel`, `Tabs`, `Tab`, `Footer` |
| Overlays | `Backdrop`, `Drawer`, `Dropdown`, `Modal`, `ImportModal`, `SpeedDial` |
| Navigation | `Menu`, `Sidebar`, `Pagination`, `Searchbar`, `Shortcutlist` |
| Data display | `Table`, `Label`, `Icon`, `IconRating`, `Image`, `RawHTML`, `Carousel` |
| Forms | `Form`, input components, `InputField`, and typed field classes |

## Buttons and feedback

```tsx
import { Button, Notification, Toast } from "ophelia-next";

export function Actions() {
  return (
    <>
      <Button text="Continue" priority="primary" type="button" />
      <Notification
        type="success"
        title="Saved"
        content="Your changes have been saved."
        autoClose
        duration={4000}
      />
      <Toast type="warning" text="Connection is unstable" visible />
    </>
  );
}
```

`Button` supports native button attributes plus `text`, `priority`, `size`, `background`, `leftIcon`, and `rightIcon`. Prefer a visible text label even when an icon is present.

## Input components

The low-level input family includes:

- `TextInput`, `TextAreaInput`, `EmailInput`, `PasswordInput`, `PhoneInput`, and `URLInput`
- `NumberInput`, `RangeInput`, and `ColorInput`
- `DateInput`, `DateTimeInput`, `DateRangeInput`, `TimeInput`, `TimeRangeInput`, `WeekInput`, and `MonthInput`
- `CheckboxInput`, `AgreementCheckboxInput`, `RadioInput`, and `SelectInput`
- `FileInput`, `FilterboxInput`, `DataList`, `HiddenInput`, and `RichTextInput`

Use the emitted prop types in your editor for the exact contract of a specific control. Inputs generally forward appropriate native input attributes.

```tsx
"use client";

import { NumberInput, SelectInput, TextInput } from "ophelia-next";

export function ProductFields() {
  return (
    <div>
      <TextInput name="name" placeholder="Product name" required />
      <NumberInput name="price" min={0} step={0.01} />
      <SelectInput
        name="status"
        options={[
          { text: "Draft", value: "draft" },
          { text: "Published", value: "published" },
        ]}
      />
    </div>
  );
}
```

## Form and field system

`Form` coordinates SDK field classes, keeps a form data object, validates registered fields, and invokes `onSubmit` with the event, data, validity, and field states.

```tsx
"use client";

import { Form, TextField } from "ophelia-next";

export function AccountForm() {
  return (
    <Form
      formData={{ displayName: "" }}
      onSubmit={(_event, data, isValid, fieldStates) => {
        if (!isValid) return;
        console.log(data, fieldStates);
      }}
    >
      <TextField id="display-name" name="displayName" required />
      <button type="submit">Save</button>
    </Form>
  );
}
```

Important `Form` options include `formData`, `onFormDataChange`, `keepDataChanges`, `setFieldsEvenIfNotValid`, `showSeperateFieldError`, `translateFn`, and `preventSubmitEvent`.

The field family provides `BaseField`, `InputField`, `InputValidationRule`, and type-specific fields such as `TextField`, `NumericField`, `DateField`, `DropdownField`, and `FileField`. Use fields inside `Form` when you need coordinated validation; use input components directly for ordinary controlled React forms.

## Tables and model classes

`Table` is configured with `TableClass` and `TableColumnClass`. These classes also underpin `CollectionBinder`. Prefer declarative table props for display-only data and a binder for server-backed CRUD workflows.

## Raw HTML security

`RawHTML` and rich-text features can render untrusted markup. Sanitize user- or API-provided HTML with the exported sanitization helpers and an explicit `ISanitizeOptions` policy. Sanitization is a security boundary; do not disable it merely to preserve unsupported markup.

## Accessibility

- Supply accessible names for icon-only controls.
- Associate labels and validation messages with form controls.
- Preserve keyboard focus when opening and closing drawers or modals.
- Do not communicate notification state by color alone.
- Test custom theme colors and focus styles for sufficient contrast.
