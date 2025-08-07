import type { Key } from "./types";

/**
 * Генерирует уникальный ID для элемента списка
 */
export function getListItemId(listId: string, itemKey: Key): string {
	return `${listId}-item-${itemKey}`;
}

/**
 * Проверяет, выбран ли элемент
 */
export function isItemSelected(itemKey: Key, selectedKeys: Set<Key>): boolean {
	return selectedKeys.has(itemKey);
}

/**
 * Проверяет, отключен ли элемент
 */
export function isItemDisabled(itemKey: Key, disabledKeys: Set<Key>): boolean {
	return disabledKeys.has(itemKey);
}

/**
 * Получает позиционную информацию для ARIA-атрибутов
 */
export function getAriaPositionInfo<T>(items: T[], itemKey: Key, getKey: (item: T) => Key) {
	const index = items.findIndex((item) => getKey(item) === itemKey);
	return {
		setsize: items.length,
		posinset: index >= 0 ? index + 1 : 1,
	};
}

/**
 * Создает функцию для получения ключа по умолчанию
 */
export function createDefaultGetKey<T>(): (item: T) => Key {
	return (item: any) => item.id || item.key || String(item);
}

/**
 * Создает функцию для получения текстового значения по умолчанию
 */
export function createDefaultGetTextValue<T>(): (item: T) => string {
	return (item: any) => item.name || item.text || String(item);
}

/**
 * Клонирует Set
 */
export function cloneSet<T>(set: Set<T>): Set<T> {
	return new Set(set);
}

/**
 * Преобразует Selection в Set
 */
export function selectionToSet(selection: any): Set<Key> {
	return new Set(selection);
}
