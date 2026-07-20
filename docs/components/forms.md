# Form

`Form` coordinates Ophelia field components, maintains a data object, runs registered-field validation, and reports submission state. Use ordinary React forms with low-level inputs when this coordination is unnecessary.

## Props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `formData` | `any` | `{}` | Initial/current object read and updated by fields |
| `onFormDataChange` | `(data, name, newVal?, isValid?) => void` | — | Reports field changes and validation state |
| `onSubmit` | `(event, data, isValid, fieldStates) => any` | — | Receives submission event, complete data, form validity, and field messages |
| `keepDataChanges` | `boolean?` | `true` | Registers the internal listener so fields read/write `formData` |
| `setFieldsEvenIfNotValid` | `boolean?` | `false` | Writes invalid field values into form data |
| `showSeperateFieldError` | `boolean?` | `true` | Allows each field to render its validation error; public name retains legacy spelling |
| `translateFn` | `(key: string) => string` | Identity | Translates labels and validation messages |
| `preventSubmitEvent` | `boolean?` | `true` | Calls `preventDefault()` during submit |
| `action` | `string?` | — | Native form action |
| `method` | `"get" \| "post"` | `"post"` | Native form method |
| `encType` | `string?` | `"multipart/form-data"` | Native encoding type |
| `target` | `string?` | — | Native submission target |
| `className` | `string?` | — | Additional form class |
| `children` | `ReactNode` | — | Ophelia fields and other form content |

## Submission callback

`fieldStates` is an array of objects with `name`, `valid`, and `msg`. Submission is not automatically blocked merely because `isValid` is false; the callback must decide whether to continue.

```tsx
"use client";

import { Button, Form, TextField } from "ophelia-next";

export function ProfileForm() {
  return (
    <Form
      formData={{ displayName: "" }}
      translateFn={(key) => translations[key] ?? key}
      onSubmit={async (_event, data, isValid, fieldStates) => {
        if (!isValid) {
          console.warn(fieldStates);
          return;
        }

        await saveProfile(data);
      }}
    >
      <TextField id="display-name" name="displayName" required />
      <Button type="submit" text="Save" />
    </Form>
  );
}
```

## Data behavior

Fields register themselves with their nearest Ophelia form listener. The form uses nested property helpers, so a field name may address nested data according to SDK object-path behavior. `onFormDataChange` can be called either after a committed value or with the proposed `newVal` and `isValid` state.

## Choosing fields or inputs

| Need | Use |
| --- | --- |
| Native controlled/uncontrolled React form | A low-level component from [Inputs](./inputs.md) |
| Shared data object and coordinated validation | `Form` plus components from [Fields](./fields.md) |
| Metadata-driven entity CRUD | `EntityBinder` and `useInput()` |

## Caveats

- `formData` is mutated through object helpers; treat callbacks as change notifications rather than immutable Redux-style updates.
- Keep field `name` values unique within a form unless they intentionally address the same data.
- Server-side validation remains required.
- Validate files by content and policy on the server even when a field rejects them in the browser.
