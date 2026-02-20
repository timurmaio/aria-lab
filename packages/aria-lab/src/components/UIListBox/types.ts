import type { ReactNode } from "react";

export type Key = string | number;

export type SelectionMode = "single" | "multiple" | "none";

export type Selection = Iterable<Key>;

export interface UIListItem {
	id: Key;
	name: string;
	description?: string;
	disabled?: boolean;
}

export interface UIListBoxProps<T extends UIListItem = UIListItem> {
	/**
	 * Уникальный идентификатор списка
	 */
	listId: string;
	/**
	 * Массив элементов списка
	 */
	items: T[];
	/**
	 * Режим выбора элементов
	 */
	selectionMode?: SelectionMode;
	/**
	 * Выбранные ключи
	 */
	selectedKeys?: Selection;
	/**
	 * Callback при изменении выбора
	 */
	onSelectionChange?: (keys: Selection) => void;
	/**
	 * Ключ сфокусированного элемента
	 */
	focusedKey?: Key | null;
	/**
	 * Callback при изменении фокуса
	 */
	onFocusedChange?: (key: Key | null) => void;
	/**
	 * Отключенные ключи
	 */
	disabledKeys?: Set<Key>;
	/**
	 * Следовать за фокусом клавиатуры
	 */
	followKeyboardFocus?: boolean;
	/**
	 * Функция рендера пустого состояния
	 */
	renderEmptyState?: () => ReactNode;
	/**
	 * Дополнительные CSS классы
	 */
	className?: string;
}

export interface UIListBoxItemProps<T extends UIListItem = UIListItem> {
	/**
	 * Уникальный идентификатор списка
	 */
	listId: string;
	/**
	 * Элемент списка
	 */
	item: T;
	/**
	 * Индекс элемента в списке
	 */
	index: number;
	/**
	 * Все элементы списка (соседи)
	 */
	siblings: T[];
	/**
	 * Режим выбора
	 */
	selectionMode: SelectionMode;
	/**
	 * Выбранные ключи
	 */
	selectedKeys?: Selection;
	/**
	 * Callback при изменении выбора
	 */
	onSelectionChange?: (keys: Selection) => void;
	/**
	 * Ключ сфокусированного элемента
	 */
	focusedKey?: Key | null;
	/**
	 * Callback при изменении фокуса
	 */
	onFocusedChange?: (key: Key | null) => void;
	/**
	 * Отключенные ключи
	 */
	disabledKeys: Set<Key>;
	/**
	 * Следовать за фокусом клавиатуры
	 */
	followKeyboardFocus: boolean;
}

// React Aria совместимые типы
export interface ListProps<T extends UIListItem = UIListItem> {
	items?: T[];
	selectionMode?: SelectionMode;
	selectedKeys?: Selection;
	defaultSelectedKeys?: Selection;
	onSelectionChange?: (keys: Selection) => void;
	disabledKeys?: Set<Key>;
}

export interface ListContextValue<T> {
	listId: string;
	items: T[];
	selectionMode: SelectionMode;
	selectedKeys?: Selection;
	onSelectionChange?: (keys: Selection) => void;
	focusedKey?: Key | null;
	onFocusedChange?: (key: Key | null) => void;
	disabledKeys: Set<Key>;
	followKeyboardFocus: boolean;
}

export interface NewListState<T extends UIListItem = UIListItem> {
	items: T[];
	selectedKeys: Set<Key>;
	selectionMode: SelectionMode;
	disabledKeys: Set<Key>;
	setSelectedKeys: (keys: Selection) => void;
	toggleKey: (key: Key) => void;
	selectKey: (key: Key) => void;
	deselectKey: (key: Key) => void;
	selectAll: () => void;
	deselectAll: () => void;
	isSelected: (key: Key) => boolean;
	isDisabled: (key: Key) => boolean;
}
