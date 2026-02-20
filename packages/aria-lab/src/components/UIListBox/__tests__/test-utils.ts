import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, expect } from "vitest";
import type { Key, UIListItem } from "../types";

// Общие тестовые данные для всех тестов
export const TEST_DATA = {
	basic: [
		{ id: "1", name: "JavaScript", description: "Programming language" },
		{ id: "2", name: "TypeScript", description: "Typed JavaScript" },
		{ id: "3", name: "React", description: "UI library" },
		{ id: "4", name: "Vue", description: "Progressive framework" },
		{ id: "5", name: "Angular", description: "Platform for building applications" },
	] as UIListItem[],

	withDisabled: [
		{ id: "1", name: "JavaScript", description: "Programming language" },
		{ id: "2", name: "TypeScript", description: "Typed JavaScript", disabled: true },
		{ id: "3", name: "React", description: "UI library" },
		{ id: "4", name: "Vue", description: "Progressive framework", disabled: true },
		{ id: "5", name: "Angular", description: "Platform for building applications" },
	] as UIListItem[],

	minimal: [
		{ id: "1", name: "Item 1" },
		{ id: "2", name: "Item 2" },
	] as UIListItem[],
} as const;

// Для обратной совместимости
export const mockItems = TEST_DATA.basic;
export const mockItemsWithDisabled = TEST_DATA.withDisabled;

/**
 * Общие настройки для всех тестов UIListBox
 */
export const createTestSetup = () => {
	let originalScrollIntoView: any;

	// Проверяем, что мы в DOM окружении
	if (typeof Element !== 'undefined' && Element.prototype) {
		originalScrollIntoView = Element.prototype.scrollIntoView;
		Element.prototype.scrollIntoView = vi.fn();
	}

	const cleanup = () => {
		if (typeof Element !== 'undefined' && Element.prototype && originalScrollIntoView) {
			Element.prototype.scrollIntoView = originalScrollIntoView;
		}
	};

	return { cleanup };
};

/**
 * Общие пропсы для тестов
 */
export const createDefaultProps = (overrides: Partial<Record<string, unknown>> = {}) => ({
	listId: "test-list",
	items: mockItems,
	selectionMode: "single" as const,
	selectedKeys: new Set<Key>(),
	onSelectionChange: vi.fn(),
	focusedKey: null as Key | null,
	onFocusedChange: vi.fn(),
	disabledKeys: new Set<Key>(),
	followKeyboardFocus: true,
	...overrides,
});

/**
 * Хелпер для создания тестового окружения
 */
export const createTestEnvironment = () => {
	const { cleanup } = createTestSetup();
	const defaultProps = createDefaultProps();
	const listBoxUtils = createListBoxUtils(defaultProps.listId);
	const mockCallbacks = createMockCallbacks();

	return {
		defaultProps,
		listBoxUtils,
		mockCallbacks,
		cleanup,
	};
};

/**
 * Утилиты для тестирования UIListBox компонента
 */
export class ListBoxTestUtils {
	constructor(private listId: string) { }

	/**
	 * Найти элемент по тексту
	 */
	findItemByText(text: string | RegExp) {
		return screen.getByRole("option", { name: text });
	}

	/**
	 * Найти элемент по индексу
	 */
	findItemByIndex(index: number) {
		const items = screen.getAllByRole("option");
		return items[index];
	}

	/**
	 * Получить все элементы списка
	 */
	getAllItems() {
		return screen.getAllByRole("option");
	}

	/**
	 * Получить выбранные элементы
	 */
	getSelectedItems() {
		return screen.getAllByRole("option").filter((item) => item.getAttribute("aria-selected") === "true");
	}

	/**
	 * Получить элемент в фокусе
	 */
	getFocusedItem() {
		return screen.getAllByRole("option").find((item) => item.getAttribute("data-focused") === "true");
	}

	/**
	 * Получить отключенные элементы
	 */
	getDisabledItems() {
		return screen.getAllByRole("option").filter((item) => item.getAttribute("aria-disabled") === "true");
	}

	/**
	 * Кликнуть по элементу
	 */
	async clickItem(text: string | RegExp) {
		const user = userEvent.setup();
		const item = this.findItemByText(text);
		if (item) {
			await user.click(item);
		}
		return item;
	}

	/**
	 * Кликнуть по элементу по индексу
	 */
	async clickItemByIndex(index: number) {
		const user = userEvent.setup();
		const item = this.findItemByIndex(index);
		if (item) {
			await user.click(item);
		}
		return item;
	}

	/**
	 * Проверить состояние элемента
	 */
	getItemState(text: string | RegExp) {
		const item = this.findItemByText(text);
		return {
			isSelected: item.getAttribute("aria-selected") === "true",
			isFocused: item.getAttribute("data-focused") === "true",
			isDisabled: item.getAttribute("aria-disabled") === "true",
			ariaPosinset: item.getAttribute("aria-posinset"),
			ariaSetsize: item.getAttribute("aria-setsize"),
		};
	}

	/**
	 * Валидировать структуру списка
	 */
	validateListStructure() {
		const listbox = screen.getByRole("listbox");
		const items = this.getAllItems();

		expect(listbox).toBeInTheDocument();
		expect(listbox).toHaveAttribute("id", this.listId);
		expect(items.length).toBeGreaterThan(0);

		items.forEach((item, index) => {
			expect(item).toHaveAttribute("role", "option");
			expect(item).toHaveAttribute("aria-posinset", String(index + 1));
			expect(item).toHaveAttribute("aria-setsize", String(items.length));
		});
	}

	/**
	 * Валидировать ARIA атрибуты
	 */
	validateAriaAttributes() {
		const listbox = screen.getByRole("listbox");
		const items = this.getAllItems();

		// Проверяем listbox
		expect(listbox).toHaveAttribute("role", "listbox");
		expect(listbox).toHaveAttribute("id", this.listId);

		// Проверяем элементы
		items.forEach((item) => {
			expect(item).toHaveAttribute("role", "option");
			expect(item).toHaveAttribute("aria-selected");
			expect(item).toHaveAttribute("aria-disabled");
			expect(item).toHaveAttribute("aria-posinset");
			expect(item).toHaveAttribute("aria-setsize");
		});
	}
}

export const createListBoxUtils = (listId: string) => new ListBoxTestUtils(listId);

export const createMockCallbacks = () => ({
	onSelectionChange: vi.fn(),
	onFocusedChange: vi.fn(),
});