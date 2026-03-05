# Code Review: ветка vs main

Ветка: `cursor/-bc-0e65c991-1021-4685-a172-996ccd37ad7e-bcf4`  
База: `main`  
Дата: 2025-03-04

---

## Обзор изменений

- **65 файлов**, +4146 / -1200 строк
- **12 коммитов** от main
- Разбиение монолита, новые компоненты, маршрутизация, оптимизации

---

## Критичные замечания

### 1. Дублирование `detectPresetId`

**Файл:** `apps/showcase/src/components/ThemePanel.tsx:204`

```tsx
const detectPresetId = (v: ThemeVars) => presets.find((p) => JSON.stringify(p.vars) === JSON.stringify(v))?.id ?? 'custom'
```

Та же логика уже экспортируется из `tokens.ts`. Layout импортирует из `tokens`, ThemePanel объявляет локально — лучше использовать один источник.

**Рекомендация:** заменить на `import { detectPresetId } from '../tokens'`.

### 2. `loadTheme` и невалидные данные

**Файл:** `apps/showcase/src/theme-io.ts`

`loadTheme()` вызывает `parseThemePayload(raw)` и возвращает `parsed.vars`. При невалидном JSON `parseThemePayload` возвращает `{ vars: initialVars, warnings: [...] }`, так что `vars` всегда валидны. Логика корректна.

---

## Средний приоритет

### 3. CustomItem и `role="option"`

**Файл:** `apps/showcase/src/pages/Components.tsx:173`

```tsx
<div role="option" aria-selected={isSelected} tabIndex={0} ...>
```

Элемент с `role="option"` должен быть внутри контейнера с `role="listbox"`. Сейчас родитель — `demo-lb-wrap` без `role="listbox"`.

**Рекомендация:** добавить `role="listbox"` и `aria-label` на обёртку или использовать `UIListBox` для семантически корректного варианта.

### 4. ThemePanel — `saveTheme` не вызывается

Layout вызывает `saveTheme(vars)` в `useEffect`. ThemePanel меняет `vars` через `onVarsChange`, Layout синхронизирует их с хранилищем. Цепочка корректна, замечаний нет.

### 5. Кнопки в ThemePanel без явных `aria-label`

Частично: `Button` для закрытия уже с `aria-label="Close panel"`. Остальные табы (`Colors`, `Typography`, `Sizing`) — обычные кнопки с текстом, для скринридеров достаточно. Критичной проблемы нет.

---

## Низкий приоритет

### 6. Стили `demo-action-btn`

Кнопки "Select All" и "Clear" в UIListBox демо — нативные `<button>`, без компонента Button. Поведение ок, можно оставить.

### 7. Таймеры тостов в ThemePanel — утечка при unmount

**Файл:** `ThemePanel.tsx:85-88`

```tsx
window.setTimeout(() => {
  setToasts((prev) => prev.filter((toast) => toast.id !== id))
}, 3000)
```

При закрытии панели ThemePanel размонтируется, но таймеры продолжают работать. Вызов `setToasts` на размонтированном компоненте приведёт к React-предупреждению.

**Рекомендация:** хранить id таймеров в ref, очищать их в `useEffect` при unmount.

### 8. `totalComponents` в Landing

Значение обновляется вручную при добавлении компонентов. Риск — забыть обновить. Можно получать длину из `componentRegistry.length`.

---

## Положительные моменты

- Разделение на Layout, Landing, Components, ThemePanel, data, tokens
- Роутинг и lazy loading страницы Components
- Чёткая структура aria-lab (index, UI, отдельные компоненты)
- Использование токенов `--aria-*`, focus rings, accessibility
- Storybook для всех новых компонентов
- Документация (CODE_REVIEW, REACT_ARIA_COMPLIANCE_REVIEW)
- Отсутствие DropdownItem вне коллекции
- Корректный разбор и сохранение темы (parseThemePayload, loadTheme, saveTheme)

---

## Рекомендуемые правки

| # | Файл | Действие | Статус |
|---|------|----------|--------|
| 1 | ThemePanel.tsx | Убрать дублирование detectPresetId, импортировать из tokens | ✓ |
| 2 | ThemePanel.tsx | Очищать таймер тостов в useEffect return | ✓ |
| 3 | Components.tsx | Добавить role="listbox" + aria-label для CustomListItemDemo | ✓ |
| 4 | Landing.tsx | Заменить totalComponents на componentRegistry.length | ✓ |

---

## Итог

Ветка в целом в хорошем состоянии: структура, разбиение, доступность и стилизация на уровне. Оставшиеся замечания некритичны и могут быть внесены по мере доработки.
