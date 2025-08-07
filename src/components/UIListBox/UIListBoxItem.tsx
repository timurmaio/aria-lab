import { useRef } from "react";
import type { UIListBoxItemProps, Key } from "./types";
import { getListItemId, isItemDisabled } from "./utils";
import { LIST_BOX_STYLES } from "./constants";
import { useItemSelection } from "./hooks/useItemSelection";

export function UIListBoxItem<T extends { id: Key; name: string; description?: string; disabled?: boolean }>({
	listId,
	item,
	index,
	siblings,
	selectionMode,
	selectedKeys,
	onSelectionChange,
	focusedKey,
	onFocusedChange,
	disabledKeys,
	followKeyboardFocus,
}: UIListBoxItemProps<T>) {
	const itemRef = useRef<HTMLLIElement>(null);
	const itemKey = item.id;
	const itemId = getListItemId(listId, itemKey);
	const isDisabled = item.disabled || isItemDisabled(itemKey, disabledKeys);
	const isFocused = focusedKey === itemKey;

	const { handleClick, isSelected } = useItemSelection({
		itemKey,
		selectionMode,
		selectedKeys,
		onSelectionChange,
		isDisabled,
	});

	const handleItemClick = () => {
		handleClick();
		
		if (followKeyboardFocus && !isDisabled) {
			onFocusedChange?.(itemKey);
		}
	};

	return (
		<li
			ref={itemRef}
			id={itemId}
			role="option"
			aria-selected={isSelected}
			aria-disabled={isDisabled}
			aria-setsize={siblings.length}
			aria-posinset={index + 1}
			data-selected={isSelected}
			data-focused={isFocused}
			data-disabled={isDisabled}
			data-testid={`listbox-item-${itemKey}`}
			className={LIST_BOX_STYLES.item}
			onMouseDown={(e) => e.preventDefault()}
			onClick={handleItemClick}
		>
			{/* Визуальный чекбокс для множественного выбора */}
			{selectionMode === "multiple" && (
				<div className={LIST_BOX_STYLES.checkbox}>
					{isSelected ? (
						<div className={LIST_BOX_STYLES.checkboxSelected} />
					) : (
						<div className={LIST_BOX_STYLES.checkboxUnselected} />
					)}
				</div>
			)}

			{/* Контент элемента */}
			<div className={LIST_BOX_STYLES.itemContent}>
				<span className={`${LIST_BOX_STYLES.itemName} ${isSelected ? "font-medium" : ""}`}>{item.name}</span>
				{item.description && (
					<span className={`${LIST_BOX_STYLES.itemDescription} ${isFocused ? "text-sky-200" : ""}`}>
						{item.description}
					</span>
				)}
			</div>
		</li>
	);
}
