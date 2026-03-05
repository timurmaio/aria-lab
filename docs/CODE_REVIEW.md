# Code Review — aria-lab

Дата: 2025-03-04

## Архитектура

- **Монорепо**: pnpm workspace — `aria-lab`, `showcase`, `storybook`
- **Слои**: UI-обёртки над React Aria Components, единые токены (`--aria-*`)
- **Экспорты**: единая точка входа, все типы реэкспортируются

## Что сделано хорошо

1. **Единообразие** — компоненты используют `composeClassName`, `cn`, общие токены
2. **Доступность** — `aria-label`, `aria-labelledby`, `aria-current`, `aria-hidden` где нужно
3. **Фокус-ринги** — `--aria-focus-ring` и `focus-visible:` во всех интерактивных компонентах
4. **Code splitting** — lazy load страницы Components
5. **Типизация** — TypeScript, проброс пропсов через `extends Aria*Props`
6. **Документация** — `REACT_ARIA_COMPLIANCE_REVIEW.md`, Storybook

## Замечания и возможные правки

### 1. ~~NumberField — иконка Increment~~ ✓ Исправлено

Иконка increment заменена на chevron up: `M6 15l6-6 6 6`.

### 2. ~~Tag — кнопка Remove без фокус-ринга~~ ✓ Исправлено

Добавлен `focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)]` в `removeButtonBase`.

### 3. ~~CodeBlock — доступность кнопки Copy~~ ✓ Исправлено

Добавлен `aria-label="Copy code"` на кнопку.

### 4. Modal — дублирование пропсов

`{...props}` передаётся и в `ModalOverlay`, и в `AriaModal`. Это ок, если RAC умеет разделять пропсы, но стоит проверить, что `children` доходят до `AriaModal`.

### 5. Layout — `window.setTimeout` вместо `setTimeout`

```tsx
const timeout = window.setTimeout(() => saveTheme(vars), 250)
return () => window.clearTimeout(timeout)
```

`setTimeout` и `clearTimeout` глобальные; `window.` опционален, но не ошибка.

### 6. FieldErrorText — передача `errorMessage` как строки в TagGroup

В TagGroup `errorMessage` передаётся в `FieldErrorText` как `string`, тогда как другие компоненты используют `string | ((validation) => string)`. Для единообразия можно расширить тип, но для TagGroup строки достаточно.

### 7. UIListBox / UIPicker — другие стили

Используют `gray-900`, `sky-600` вместо `--aria-*`. Имеет смысл постепенно перевести на токены.

## Рекомендации

| Приоритет | Действие | Статус |
|-----------|----------|--------|
| ~~Высокий~~   | ~~Иконка increment в NumberField~~ | ✓ |
| ~~Средний~~   | ~~Focus ring на кнопку Remove в Tag~~ | ✓ |
| ~~Средний~~   | ~~aria-label на кнопку Copy~~ | ✓ |
| Низкий    | Унифицировать UIListBox/UIPicker под `--aria-*` | — |

## Проверки

- **Lint**: ошибок нет
- **Build**: `aria-lab`, `showcase`, `storybook` собираются
- **Типы**: TypeScript без ошибок
