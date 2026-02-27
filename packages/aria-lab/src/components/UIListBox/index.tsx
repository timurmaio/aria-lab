import { useCallback, useMemo, useState, type KeyboardEvent } from "react";
import { UIListBoxItem } from "./UIListBoxItem.js";
import type { UIListBoxProps, Key, UIListItem } from "./types.js";
import { LIST_BOX_STYLES } from "./constants.js";

// Re-export getListItemId for backward compatibility
export { getListItemId } from "./utils.js";

// Export hooks for list state management
export { useListState } from "./hooks/useListState.js";
export { useItemSelection } from "./hooks/useItemSelection.js";
export type { ListStateReturn } from "./hooks/useListState.js";

// Export types for React Aria compatibility
export type { ListProps, NewListState as ListState, Selection } from "./types.js";

export function UIListBox<T extends UIListItem>({
	listId,
	items,
	selectionMode = "single",
	selectedKeys,
	onSelectionChange,
	focusedKey,
	onFocusedChange = () => {},
	disabledKeys = new Set<Key>(),
	followKeyboardFocus = true,
	renderEmptyState,
	ariaLabel,
	ariaLabelledby,
	className = "",
	onKeyDown,
	...props
}: UIListBoxProps<T>) {
	const [internalFocusedKey, setInternalFocusedKey] = useState<Key | null>(null);

	const effectiveDisabledKeys = disabledKeys;
	const effectiveFocusedKey = focusedKey === undefined ? internalFocusedKey : focusedKey;

	const setFocus = useCallback((key: Key | null) => {
		if (focusedKey === undefined) {
			setInternalFocusedKey(key);
		}
		onFocusedChange?.(key);
	}, [focusedKey, onFocusedChange]);

	const selectableItems = useMemo(
		() => items.filter((item) => !item.disabled && !effectiveDisabledKeys.has(item.id)),
		[items, effectiveDisabledKeys],
	);

	const selectedSet = useMemo(() => new Set(selectedKeys || []), [selectedKeys]);

	const selectFocusedItem = useCallback(
		(key: Key) => {
			if (!onSelectionChange) {
				return;
			}

			switch (selectionMode) {
				case "single": {
					onSelectionChange(new Set([key]));
					break;
				}
				case "multiple": {
					const next = new Set(selectedSet);
					if (next.has(key)) {
						next.delete(key);
					} else {
						next.add(key);
					}
					onSelectionChange(next);
					break;
				}
				case "none": {
					onSelectionChange(new Set());
					break;
				}
			}
		},
		[onSelectionChange, selectedSet, selectionMode],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLUListElement>) => {
			if (selectableItems.length === 0) {
				return;
			}

			const focusedIndex = effectiveFocusedKey == null
				? -1
				: selectableItems.findIndex((item) => item.id === effectiveFocusedKey);

			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();
					const nextIndex = focusedIndex < selectableItems.length - 1 ? focusedIndex + 1 : 0;
					setFocus(selectableItems[nextIndex]?.id ?? null);
					break;
				}
				case "ArrowUp": {
					event.preventDefault();
					const nextIndex = focusedIndex > 0 ? focusedIndex - 1 : selectableItems.length - 1;
					setFocus(selectableItems[nextIndex]?.id ?? null);
					break;
				}
				case "Home": {
					event.preventDefault();
					setFocus(selectableItems[0]?.id ?? null);
					break;
				}
				case "End": {
					event.preventDefault();
					setFocus(selectableItems[selectableItems.length - 1]?.id ?? null);
					break;
				}
				case "Enter":
				case " ": {
					if (effectiveFocusedKey == null) {
						return;
					}
					event.preventDefault();
					selectFocusedItem(effectiveFocusedKey);
					break;
				}
			}
		},
		[effectiveFocusedKey, selectableItems, selectFocusedItem, setFocus],
	);

	const activeDescendant = effectiveFocusedKey == null ? undefined : `${listId}-item-${effectiveFocusedKey}`;
	const fallbackAriaLabel = ariaLabelledby ? undefined : (ariaLabel ?? "Options");

	const commonListProps = {
		role: "listbox" as const,
		id: listId,
		"aria-label": fallbackAriaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-multiselectable": selectionMode === "multiple",
		"aria-activedescendant": activeDescendant,
		"data-selection-mode": selectionMode,
		tabIndex: 0,
		className: `${LIST_BOX_STYLES.root} ${className}`.trim(),
		onKeyDown: (event: KeyboardEvent<HTMLUListElement>) => {
			handleKeyDown(event);
			onKeyDown?.(event);
		},
	};

	if (items.length === 0 && renderEmptyState) {
		return (
			<ul
				{...commonListProps}
				{...props}
			>
				<li role="presentation">{renderEmptyState()}</li>
			</ul>
		);
	}

	return (
		<ul
			{...commonListProps}
			{...props}
		>
			{items.map((item, index) => (
				<UIListBoxItem
					key={String(item.id)}
					listId={listId}
					item={item}
					index={index}
					siblings={items}
					selectionMode={selectionMode}
					selectedKeys={selectedKeys}
					onSelectionChange={onSelectionChange}
					focusedKey={effectiveFocusedKey}
					onFocusedChange={setFocus}
					disabledKeys={effectiveDisabledKeys}
					followKeyboardFocus={followKeyboardFocus}
				/>
			))}
		</ul>
	);
}
