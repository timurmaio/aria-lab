# aria-lab npm release checklist

## 1) Verify local builds

```bash
pnpm --filter aria-lab build
pnpm --filter storybook build-storybook
pnpm --filter demo build
pnpm --filter theme-generator build
```

## 2) Inspect package contents

```bash
pnpm --filter aria-lab pack --pack-destination /tmp
```

Inspect the tarball and verify it contains only `dist/*` plus package metadata.

## 3) Bump version

```bash
pnpm --filter aria-lab exec bumpp
```

Use `beta` prerelease tags until API is stable across your projects.

## 4) Publish

```bash
pnpm --filter aria-lab publish --access public
```

If publishing a prerelease:

```bash
pnpm --filter aria-lab publish --access public --tag beta
```

## 5) Validate from a clean consumer

In a fresh test app:

```tsx
import 'aria-lab/styles.css'
import 'aria-lab/theme/default.css'
```

Confirm the package renders components without any Tailwind setup in the consumer.
