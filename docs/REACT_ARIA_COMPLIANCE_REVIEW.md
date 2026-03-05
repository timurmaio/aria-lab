# React Aria Compliance Review

Проверка компонентов aria-lab на соответствие документации React Aria.

## ✅ Соответствуют доке

| Компонент | Статус | Примечания |
|-----------|--------|------------|
| **Button** | OK | `composeRenderProps`, `isPending`, варианты — по доке |
| **Input** | OK | Обёртка над RAC Input, `size` переопределён |
| **TextField** | OK | Label, Input, FieldDescription, FieldErrorText — структура по доке |
| **Select** | OK | Label, Button+SelectValue, Popover+ListBox, FieldError — соответствует |
| **ComboBox** | OK | Label, Input+FieldButton, Popover+ListBox — по доке |
| **Dialog** | OK | Обёртка над AriaDialog |
| **Modal** | OK | ModalOverlay + AriaModal — по доке |
| **AlertDialog** | OK | Кастомная обёртка с role="alertdialog" |
| **Checkbox** | OK | `composeRenderProps`, `isIndeterminate`, индикатор — по доке |
| **CheckboxGroup** | OK | Label, children, Description, FieldError, `data-orientation` |
| **Radio** | OK | `composeRenderProps`, индикатор — по доке |
| **RadioGroup** | OK | Label, children, Description, FieldError — по доке |
| **Tabs** | OK | Tabs, TabList, Tab, TabPanel — по доке. TabPanels — fragment (RAC 1.11 не экспортирует TabPanels) |
| **Switch** | OK | `composeRenderProps`, track+handle — по доке |
| **Disclosure** | OK | DisclosureHeader с Button slot="trigger", DisclosurePanel, DisclosureStateContext |
| **Tooltip** | OK | OverlayArrow, AriaTooltip — по доке |
| **Breadcrumbs** | OK | Breadcrumb с Link/href, composeRenderProps, isCurrent |
| **Slider** | OK | Label, SliderOutput, SliderTrack с state, SliderThumb |
| **ProgressBar** | OK | Render prop с percentage, valueText, isIndeterminate |
| **Popover** | OK | Обёртка над AriaPopover |
| **Field** | OK | FieldLabel (Label), FieldDescription (Text slot="description"), FieldErrorText (FieldError) |
| **DropdownItem** | OK | ListBoxItem с composeRenderProps |

## ⚠️ Уточнения

### TabPanels
RAC 1.11.0 **не экспортирует** TabPanels. Компонент реализован как Fragment — семантическая обёртка. TabPanel получает `TabListStateContext` от Tabs и работает корректно.

### Badge
Не из React Aria — собственный presentational-компонент.

### InputGroup / InputAddon
Не из RAC — утилиты для композиции. RAC имеет `Field`, `Input` — наши расширяют композицию.

### UIListBox / UIPicker
Кастомные компоненты поверх RAC (ListBox, ComboBox). Используют `useListState`, `useItemSelection`.

## Рекомендации

1. **SelectionIndicator в Tab** — в доке используется `<SelectionIndicator />` для анимированного подчёркивания. Сейчас — CSS `data-[selected]:border-b-2`. Визуально эквивалентно.
2. **Popover OverlayArrow** — в доке условный (hideArrow, trigger). Наш Popover всегда без стрелки; при необходимости можно добавить.
3. **Modal** — при использовании передавать `children` в `Modal`; они попадут в AriaModal через `{...props}`.
