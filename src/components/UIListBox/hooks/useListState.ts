import { useState, useCallback, useMemo } from "react";
import type { Key, ListProps, NewListState, Selection, UIListItem } from "../types";
import { cloneSet, selectionToSet } from "../utils";

/**
 * React Aria-совместимый хук для управления состоянием списка
 *
 * Обеспечивает управление состоянием для listbox-компонентов.
 * Поддерживает controlled/uncontrolled режимы для selected состояния.
 *
 * @param props - Конфигурация списка
 * @returns Объект состояния и методов управления списком
 */
export function useListState<T extends UIListItem = UIListItem>(props: ListProps<T> = {}): NewListState<T> {
	const {
		items = [],
		selectionMode = "none",
		selectedKeys: controlledSelectedKeys,
		defaultSelectedKeys,
		onSelectionChange,
		disabledKeys,
	} = props;

	const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = useState<Set<Key>>(() => {
		return new Set(defaultSelectedKeys || []);
	});

	const selectedKeys = useMemo(() => {
		if (controlledSelectedKeys !== undefined) {
			return new Set(controlledSelectedKeys);
		}
		return uncontrolledSelectedKeys;
	}, [controlledSelectedKeys, uncontrolledSelectedKeys]);

	const setSelectedKeys = useCallback(
		(keys: Selection) => {
			const keySet = new Set(keys);

			if (controlledSelectedKeys === undefined) {
				setUncontrolledSelectedKeys(keySet);
			}
			onSelectionChange?.(keys);
		},
		[controlledSelectedKeys, onSelectionChange],
	);

	const disabledKeysSet = useMemo(() => new Set(disabledKeys || []), [disabledKeys]);

	const toggleKey = useCallback(
		(key: Key) => {
			const newKeys = cloneSet(selectedKeys);
			if (newKeys.has(key)) {
				newKeys.delete(key);
			} else {
				if (selectionMode === "single") {
					newKeys.clear();
				}
				newKeys.add(key);
			}
			setSelectedKeys(newKeys);
		},
		[selectedKeys, selectionMode, setSelectedKeys],
	);

	const selectKey = useCallback(
		(key: Key) => {
			const newKeys = new Set<Key>();
			newKeys.add(key);
			setSelectedKeys(newKeys);
		},
		[setSelectedKeys],
	);

	const deselectKey = useCallback(
		(key: Key) => {
			const newKeys = cloneSet(selectedKeys);
			newKeys.delete(key);
			setSelectedKeys(newKeys);
		},
		[selectedKeys, setSelectedKeys],
	);

	const selectAll = useCallback(() => {
		if (selectionMode === "multiple") {
			const allKeys = items.map((item) => item.id);
			setSelectedKeys(allKeys);
		}
	}, [items, selectionMode, setSelectedKeys]);

	const deselectAll = useCallback(() => {
		setSelectedKeys(new Set());
	}, [setSelectedKeys]);

	const isSelected = useCallback((key: Key): boolean => selectedKeys.has(key), [selectedKeys]);

	const isDisabled = useCallback((key: Key): boolean => disabledKeysSet.has(key), [disabledKeysSet]);

	return {
		items: items as T[],
		selectedKeys,
		selectionMode,
		disabledKeys: disabledKeysSet,

		setSelectedKeys,
		toggleKey,
		selectKey,
		deselectKey,
		selectAll,
		deselectAll,

		isSelected,
		isDisabled,
	};
}

/**
 * Тип возвращаемого значения хука useListState
 */
export type ListStateReturn<T extends UIListItem = UIListItem> = ReturnType<typeof useListState<T>>;
