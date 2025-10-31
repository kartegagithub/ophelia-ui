# ophelia-icons

✨ A beautifully crafted React icon library that brings your UI to life with customizable variants, smooth animations, and comprehensive accessibility support. Built with TypeScript and optimized for performance.

## Features

- 🎨 **4 Variants**: Filled, Outlined, Duotone, Linear
- 🎯 **Rich Props**: Size, color, stroke, transform, animation
- ⚡ **Tree-shakable**: Import only what you need
- 📱 **TypeScript**: Full type safety
- 🎭 **Animations**: Spin, pulse, bounce
- 🔄 **Transformations**: Rotate, mirror, flip
- ♿ **Accessible**: ARIA support built-in

## Installation

```bash
npm install ophelia-icons
# or
yarn add ophelia-icons
# or
pnpm add ophelia-icons
```

## Quick Start

```tsx
import { ArrowRightIcon, LikeIcon, CheckIcon } from 'ophelia-icons';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <ArrowRightIcon size={24} color="#262626" />
      
      {/* With variants */}
      <LikeIcon 
        size={32}
        color="#FF0000"
        variant="duotone"
        secondaryColor="#FF69B4"
      />
      
      {/* With animations */}
      <CheckIcon 
        size={20}
        color="#00FF00"
        variant="outlined"
        strokeWidth={2}
        spin={true}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size (applies to both width and height) |
| `width` | `number \| string` | - | Custom width |
| `height` | `number \| string` | - | Custom height |
| `color` | `string` | - | Primary color |
| `secondaryColor` | `string` | - | Secondary color (for duotone variant) |
| `variant` | `'filled' \| 'outlined' \| 'duotone' \| 'linear'` | `'filled'` | Icon variant |
| `strokeWidth` | `number \| string` | `1.5` | Stroke width (for outlined/linear) |
| `strokeLinecap` | `'butt' \| 'round' \| 'square'` | `'round'` | Stroke line cap |
| `strokeLinejoin` | `'miter' \| 'round' \| 'bevel'` | `'round'` | Stroke line join |
| `rotate` | `number` | `0` | Rotation in degrees |
| `mirrored` | `boolean` | `false` | Horizontal flip |
| `flipped` | `boolean` | `false` | Vertical flip |
| `spin` | `boolean` | `false` | Spin animation |
| `pulse` | `boolean` | `false` | Pulse animation |
| `bounce` | `boolean` | `false` | Bounce animation |
| `opacity` | `number` | - | Opacity (0-1) |
| `visible` | `boolean` | `true` | Visibility |
| `title` | `string` | - | Accessibility title |
| `description` | `string` | - | Accessibility description |

## Variants

### Filled (Default)
```tsx
<ArrowRightIcon variant="filled" color="#262626" />
```

### Outlined
```tsx
<ArrowRightIcon 
  variant="outlined" 
  color="#262626" 
  strokeWidth={2} 
/>
```

### Duotone
```tsx
<LikeIcon 
  variant="duotone" 
  color="#FF0000" 
  secondaryColor="#FF69B4" 
/>
```

### Linear
```tsx
<CheckIcon 
  variant="linear" 
  color="#00FF00" 
  strokeWidth={1.5} 
/>
```

## Animations

```tsx
// Spin animation
<SpinnerIcon spin={true} />

// Pulse animation
<LikeIcon pulse={true} />

// Bounce animation
<CheckIcon bounce={true} />

// Multiple animations
<ArrowRightIcon spin={true} pulse={true} />
```

## Transformations

```tsx
// Rotation
<ArrowRightIcon rotate={45} />

// Mirror (horizontal flip)
<ArrowRightIcon mirrored={true} />

// Flip (vertical flip)
<ArrowRightIcon flipped={true} />

// Combined
<ArrowRightIcon rotate={90} mirrored={true} />
```

## Accessibility

```tsx
<Button 
  title="Close dialog"
  description="Click to close the current dialog"
  aria-label="Close"
/>
```

## Available Icons

- AdvertIcon
- ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon
- BellIcon
- CheckIcon
- ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon
- CombinedShapeIcon
- EyeIcon
- Flag1Icon
- HomeIcon
- LikeIcon
- MenuIcon
- MoonIcon
- PngIcon
- ProfileIcon
- RevenueIcon
- SearchIcon
- SignUpIcon
- SpinnerIcon
- StarIcon
- SunIcon
- WalletIcon
- XIcon

## Development

```bash
# Clone the repository
git clone https://github.com/kartegagithub/ophelia-ui.git
cd ophelia-ui/ophelia-icons

# Install dependencies
npm install

# Build icons from SVG files
npm run build:icons

# Build the library
npm run build

# Start development mode
npm run dev
```

## License

MIT © Ophelia Team
