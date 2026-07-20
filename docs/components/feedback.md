# Actions and feedback

## Alert

Displays persistent inline feedback.

| Prop | Type | Purpose |
| --- | --- | --- |
| `id` | `string?` | DOM identity |
| `visible` | `boolean?` | Controls rendering |
| `text` | `string?` | Plain alert message |
| `children` | `ReactNode` | Custom message content |
| `type` | `"error" \| "success" \| "warning" \| "info" \| "custom"` | Semantic state and default appearance |
| `iconProps` | `IconProps?` | Configures the default icon |
| `image` | Image-like value | Replaces the default icon |
| `theme` | `AlertTheme?` | Overrides status images |
| `style`, `textStyle` | `any` | Inline container/text styling |
| `className` | `string?` | Additional CSS class |

```tsx
<Alert type="warning" text="Unsaved changes" />
```

## Button

Renders an SDK-styled native button. All `ButtonHTMLAttributes<HTMLButtonElement>` are supported.

| Prop | Type | Purpose |
| --- | --- | --- |
| `text` | `string?` | Button label; `value` is used as fallback |
| `priority` | `string?` | Theme priority key, such as primary/secondary |
| `size` | `string?` | Theme size key |
| `background` | `string?` | Theme background key |
| `inlineStyle` | `string?` | Additional class string used by the component |
| `leftIcon`, `rightIcon` | `JSX.Element \| string \| IconProps` | Icons around the label |
| `id`, `className`, `type`, `disabled`, `onClick`, … | Native button props | Native behavior and accessibility |

The component defaults `type` to `button`, preventing accidental submission unless `type="submit"` is supplied.

## ContentLoading

Wraps content with loading text/spinner behavior.

| Prop | Type | Purpose |
| --- | --- | --- |
| `appClient` | `AppClient?` | Provides translations/theme integration |
| `loading` | `boolean?` | Shows loading UI instead of children |
| `text` | `string?` | Custom loading message |
| `showDefaultText` | `boolean?` | Enables built-in loading text |
| `showDefaultSpinner` | `boolean?` | Enables built-in spinner |
| `image` | Image-like value | Replaces the spinner image |
| `children` | `ReactNode` | Content rendered when not loading |
| `id` | `string?` | DOM identity |

## IconRating

Displays a row of filled/unfilled rating icons.

| Prop | Type | Purpose |
| --- | --- | --- |
| `count` | `number?` | Total number of icons |
| `value` | `number?` | Number/current rating marked as filled |
| `text` | `string?` | Accompanying label |
| `image`, `filledImage` | `string \| JSX.Element` | Empty and filled icon renderers |
| `onClick(index)` | Function | Handles selecting an icon index |
| `visible` | `boolean?` | Controls rendering |
| `className`, `textClassName` | `string?` | Root and label classes |
| `id` | `string?` | DOM identity |

## Indicator

Renders selectable steps or carousel-style indicators.

| Prop | Type | Purpose |
| --- | --- | --- |
| `count` | `number?` | Indicator count when items are not supplied |
| `activeIndex` | `number?` | Selected indicator index |
| `items` | `{ text?, component? }[]` | Per-indicator label or renderer |
| `onChange(index)` | Function | Reports selection |
| `visible` | `boolean?` | Controls rendering |
| `id` | `string?` | DOM identity |

An item `component` may be an element or `(selected) => ReactNode`.

## Notification

Displays a dismissible notification and optionally closes it automatically.

| Prop | Type | Purpose |
| --- | --- | --- |
| `type` | `"error" \| "info" \| "success" \| "warning"` | Semantic state |
| `title` | `string?` | Notification heading |
| `content` | `string?` | Notification body |
| `image` | Image-like value | Overrides the status icon |
| `theme` | `NotificationTheme?` | Overrides classes and status images |
| `autoClose` | `boolean?` | Closes after `duration` |
| `duration` | `number?` | Auto-close duration in milliseconds |
| `listenEvents` | `boolean?` | Enables the component's event-driven behavior |
| `defaultVisibility` | `boolean?` | Initial visibility |
| `onClose` | `() => void` | Called when closed |

## Progress

Displays a progress bar.

| Prop | Type | Purpose |
| --- | --- | --- |
| `width` | `string?` | Progress width, normally a CSS percentage |
| `text` | `string?` | Progress label |
| `showWidthAsText` | `boolean?` | Displays `width` as the label |
| `visible` | `boolean?` | Controls rendering |
| `id` | `string?` | DOM identity |

## Spinner

Displays indeterminate progress.

| Prop | Type | Purpose |
| --- | --- | --- |
| `text` | `string?` | Loading label |
| `visible` | `boolean?` | Controls rendering |
| `image` | Image-like value | Replaces the theme spinner |
| `className` | `string?` | Additional CSS class |
| `id` | `string?` | DOM identity |

## Toast

Displays compact transient feedback.

| Prop | Type | Purpose |
| --- | --- | --- |
| `text` | `string?` | Toast message |
| `visible` | `boolean?` | Controls rendering |
| `type` | `"error" \| "success" \| "warning" \| "info" \| "custom"` | Semantic state |
| `showCloseButton` | `boolean?` | Shows a manual close action |
| `image` | Image-like value | Overrides the status icon |
| `theme` | `ToastTheme?` | Overrides status images |
| `id` | `string?` | DOM identity |

Use `Alert` for persistent inline state, `Notification` for richer dismissible messages, and `Toast` for brief transient feedback.
