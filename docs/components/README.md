# Components

Ophelia Next exports UI components, input controls, and form-aware field components from the package root. This reference groups them by responsibility while documenting every public component individually.

## Reference

| Category | Components |
| --- | --- |
| [Actions and feedback](./feedback.md) | `Alert`, `Button`, `ContentLoading`, `IconRating`, `Indicator`, `Notification`, `Progress`, `Spinner`, `Toast` |
| [Layout and overlays](./layout-and-overlays.md) | `Accordion`, `AccordionGroup`, `Backdrop`, `Carousel`, `Drawer`, `Footer`, `Grid`, `GridRow`, `GridColumn`, `Modal`, `ImportModal`, `Panel`, `SpeedDial`, `Tab`, `Tabs` |
| [Navigation and selection](./navigation-and-selection.md) | `Dropdown`, `Menu`, `MenuItem`, `Pagination`, `Searchbar`, `Shortcutlist`, `Sidebar` |
| [Data display](./data-display.md) | `Icon`, `Image`, `Label`, `RawHTML`, `Table` |
| [Forms](./forms.md) | `Form` and the form/field integration model |
| [Inputs](./inputs.md) | All public low-level input components |
| [Fields](./fields.md) | `BaseField`, `InputField`, validation, and form-aware typed fields |

## Usage rules

- Import supported components from `ophelia-next`, never from `dist/`.
- Interactive components belong below a Next.js `"use client"` boundary.
- Props inherited from React native attribute interfaces remain available even when a table lists only SDK-specific props.
- `visible` generally controls rendering; it is not an authorization mechanism.
- Sanitize untrusted HTML and validate files again on the server.

```tsx
"use client";

import { Button, Notification, TextInput } from "ophelia-next";

export function Example() {
  return (
    <form>
      <TextInput name="title" placeholder="Title" />
      <Button type="submit" text="Save" />
      <Notification type="info" content="Complete all required fields." />
    </form>
  );
}
```

The generated TypeScript declarations shipped with the installed version remain authoritative for exact signatures.
