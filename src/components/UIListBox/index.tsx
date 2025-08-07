import { UIListBoxItem } from "./UIListBoxItem";
import type { UIListBoxProps, Key, UIListItem } from "./types";
import { LIST_BOX_STYLES } from "./constants";

// Re-export getListItemId for backward compatibility
export { getListItemId } from "./utils";

// Export hooks for list state management
export { useListState } from "./hooks/useListState";
export { useItemSelection } from "./hooks/useItemSelection";
export type { ListStateReturn } from "./hooks/useListState";

// Export types for React Aria compatibility
export type { ListProps, NewListState as ListState, Selection } from "./types";

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
	className = "",
	...props
}: UIListBoxProps<T>) {
	const effectiveDisabledKeys = disabledKeys;

	if (items.length === 0 && renderEmptyState) {
		return <div className={`${LIST_BOX_STYLES.root} ${className}`.trim()}>{renderEmptyState()}</div>;
	}

	return (
		<ul
			role="listbox"
			id={listId}
			aria-multiselectable={selectionMode === "multiple"}
			data-selection-mode={selectionMode}
			className={`${LIST_BOX_STYLES.root} ${className}`.trim()}
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
					focusedKey={focusedKey}
					onFocusedChange={onFocusedChange}
					disabledKeys={effectiveDisabledKeys}
					followKeyboardFocus={followKeyboardFocus}
				/>
			))}
		</ul>
	);
}
