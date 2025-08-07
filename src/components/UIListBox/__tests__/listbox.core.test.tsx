import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { UIListBox } from "../index";
import type { Key } from "../types";
import { createTestEnvironment, mockItems, mockItemsWithDisabled } from "./test-utils";

describe("UIListBox Core", () => {
	let testEnv: ReturnType<typeof createTestEnvironment>;

	beforeEach(() => {
		testEnv = createTestEnvironment();
	});

	afterEach(() => {
		testEnv.cleanup();
	});

	describe("Рендеринг и базовая функциональность", () => {
		it("рендерит корневой элемент с правильными ARIA атрибутами", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("id", "test-list");
			expect(listbox).toHaveAttribute("aria-multiselectable", "false");
			expect(listbox).toHaveAttribute("data-selection-mode", "single");
		});

		it("рендерит все элементы списка", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(5);

			mockItems.forEach((item, index) => {
				expect(screen.getByText(item.name)).toBeInTheDocument();
				if (item.description) {
					expect(screen.getByText(item.description)).toBeInTheDocument();
				}
			});
		});

		it("каждый элемент получает правильный id", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(5);

			items.forEach((item, index) => {
				const expectedId = `${testEnv.defaultProps.listId}-item-${mockItems[index]?.id}`;
				expect(item).toHaveAttribute("id", expectedId);
			});
		});

		it("элементы имеют правильные ARIA атрибуты", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(5);

			items.forEach((item, index) => {
				expect(item).toHaveAttribute("role", "option");
				expect(item).toHaveAttribute("aria-selected", "false");
				expect(item).toHaveAttribute("aria-disabled", "false");
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
				expect(item).toHaveAttribute("aria-setsize", "5");
			});
		});

		it("отображает пустое состояние", () => {
			const renderEmptyState = () => <div>Нет элементов</div>;
			render(<UIListBox {...testEnv.defaultProps} items={[]} renderEmptyState={renderEmptyState} />);

			expect(screen.getByText("Нет элементов")).toBeInTheDocument();
		});

		it("применяет кастомные стили", () => {
			render(<UIListBox {...testEnv.defaultProps} className="custom-class" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveClass("custom-class");
		});
	});

	describe("Состояния элементов", () => {
		it("правильно отображает выбранные элементы", () => {
			const selectedKeys = new Set<Key>(["1", "3"]);
			render(<UIListBox {...testEnv.defaultProps} selectedKeys={selectedKeys} />);

			const items = screen.getAllByRole("option");

			// Первый и третий элементы должны быть выбраны
			expect(items[0]).toHaveAttribute("aria-selected", "true");
			expect(items[2]).toHaveAttribute("aria-selected", "true");

			// Остальные элементы не должны быть выбраны
			expect(items[1]).toHaveAttribute("aria-selected", "false");
			expect(items[3]).toHaveAttribute("aria-selected", "false");
			expect(items[4]).toHaveAttribute("aria-selected", "false");
		});

		it("правильно отображает элемент в фокусе", () => {
			const focusedKey = "2";
			render(<UIListBox {...testEnv.defaultProps} focusedKey={focusedKey} />);

			const items = screen.getAllByRole("option");

			// Второй элемент должен быть в фокусе
			expect(items[1]).toHaveAttribute("data-focused", "true");

			// Остальные элементы не должны быть в фокусе
			expect(items[0]).toHaveAttribute("data-focused", "false");
			expect(items[2]).toHaveAttribute("data-focused", "false");
			expect(items[3]).toHaveAttribute("data-focused", "false");
			expect(items[4]).toHaveAttribute("data-focused", "false");
		});

		it("правильно отображает отключенные элементы", () => {
			const disabledKeys = new Set<Key>(["2", "4"]);
			render(<UIListBox {...testEnv.defaultProps} disabledKeys={disabledKeys} />);

			const items = screen.getAllByRole("option");

			// Элементы с id "2" и "4" должны быть отключены
			expect(items[1]).toHaveAttribute("aria-disabled", "true");
			expect(items[3]).toHaveAttribute("aria-disabled", "true");

			// Остальные элементы не должны быть отключены
			expect(items[0]).toHaveAttribute("aria-disabled", "false");
			expect(items[2]).toHaveAttribute("aria-disabled", "false");
			expect(items[4]).toHaveAttribute("aria-disabled", "false");
		});

		it("правильно отображает элементы с disabled свойством", () => {
			render(<UIListBox {...testEnv.defaultProps} items={mockItemsWithDisabled} />);

			const items = screen.getAllByRole("option");

			// Элементы с disabled: true должны быть отключены
			expect(items[1]).toHaveAttribute("aria-disabled", "true"); // TypeScript
			expect(items[3]).toHaveAttribute("aria-disabled", "true"); // Vue

			// Остальные элементы не должны быть отключены
			expect(items[0]).toHaveAttribute("aria-disabled", "false"); // JavaScript
			expect(items[2]).toHaveAttribute("aria-disabled", "false"); // React
			expect(items[4]).toHaveAttribute("aria-disabled", "false"); // Angular
		});
	});

	describe("Режимы выбора", () => {
		it("правильно устанавливает aria-multiselectable для single режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="single" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "false");
		});

		it("правильно устанавливает aria-multiselectable для multiple режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="multiple" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "true");
		});

		it("правильно устанавливает aria-multiselectable для none режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="none" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "false");
		});
	});

	describe("Структура данных", () => {
		it("отображает элементы с описанием", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			expect(screen.getByText("Programming language")).toBeInTheDocument();
			expect(screen.getByText("Typed JavaScript")).toBeInTheDocument();
			expect(screen.getByText("UI library")).toBeInTheDocument();
		});

		it("отображает элементы без описания", () => {
			const itemsWithoutDescription = [
				{ id: "1", name: "Item 1" },
				{ id: "2", name: "Item 2" },
			];
			render(<UIListBox {...testEnv.defaultProps} items={itemsWithoutDescription} />);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
		});
	});
});
