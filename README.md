# aria-lab

React Aria component library with full accessibility.

## Installation

```bash
npm install aria-lab
```

## Usage

```tsx
import { Button, Input, TextField, UI } from 'aria-lab';
import 'aria-lab/styles';
import 'aria-lab/theme/default';

function App() {
  return (
    <>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
      <TextField label="Email" placeholder="you@example.com" />
      
      {/* Or use UI namespace */}
      <UI.Button variant="secondary">Secondary</UI.Button>
    </>
  );
}
```

## Theming

Override CSS variables in your CSS:

```css
:root {
  /* Colors */
  --aria-accent: #8b5cf6;
  --aria-text-primary: #1f2937;
  
  /* Radius */
  --aria-radius-md: 0.75rem;
  
  /* Focus ring */
  --aria-focus-ring: 0 0 0 2px #fff, 0 0 0 4px #8b5cf6;
}
```

### Default Theme

Import prebuilt component styles and the default shadcn-like theme:

```tsx
import 'aria-lab/styles';
import 'aria-lab/theme/default';
```

### Tokens Only

Import only CSS variables (without default values):

```tsx
import 'aria-lab/theme/tokens';
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run demo
pnpm dev:demo

# Run storybook
pnpm storybook
```

## Packages

- `packages/aria-lab` - Component library
- `apps/demo` - Demo application
- `apps/storybook` - Storybook documentation

## License

MIT
