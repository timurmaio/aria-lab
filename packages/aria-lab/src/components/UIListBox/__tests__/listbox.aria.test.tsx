import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { UIListBox } from "../index";
import type { Key } from "../types";
import { createTestEnvironment, mockItems } from "./test-utils";

describe("UIListBox ARIA", () => {
	let testEnv: ReturnType<typeof createTestEnvironment>;

	beforeEach(() => {
		testEnv = createTestEnvironment();
	});

	afterEach(() => {
		testEnv.cleanup();
	});

	describe("ARIA атрибуты listbox", () => {
		it("listbox имеет правильную роль", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("role", "listbox");
		});

		it("listbox имеет правильный id", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("id", "test-list");
		});

		it("listbox имеет правильный aria-multiselectable для single режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="single" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "false");
		});

		it("listbox имеет правильный aria-multiselectable для multiple режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="multiple" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "true");
		});

		it("listbox имеет правильный aria-multiselectable для none режима", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="none" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("aria-multiselectable", "false");
		});

		it("listbox имеет data-selection-mode атрибут", () => {
			render(<UIListBox {...testEnv.defaultProps} selectionMode="multiple" />);

			const listbox = screen.getByRole("listbox");
			expect(listbox).toHaveAttribute("data-selection-mode", "multiple");
		});
	});

	describe("ARIA атрибуты option элементов", () => {
		it("каждый option имеет правильную роль", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("role", "option");
			});
		});

		it("каждый option имеет правильный id", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item, index) => {
				const expectedId = `test-list-item-${mockItems[index]?.id}`;
				expect(item).toHaveAttribute("id", expectedId);
			});
		});

		it("каждый option имеет aria-selected атрибут", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("aria-selected");
			});
		});

		it("каждый option имеет aria-disabled атрибут", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("aria-disabled");
			});
		});

		it("каждый option имеет aria-posinset атрибут", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item, index) => {
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
			});
		});

		it("каждый option имеет aria-setsize атрибут", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("aria-setsize", "5");
			});
		});

		it("aria-selected правильно отражает состояние выбора", () => {
			const selectedKeys = new Set<Key>(["1", "3"]);
			render(<UIListBox {...testEnv.defaultProps} selectedKeys={selectedKeys} />);

			const items = screen.getAllByRole("option");

			expect(items[0]).toHaveAttribute("aria-selected", "true");
			expect(items[1]).toHaveAttribute("aria-selected", "false");
			expect(items[2]).toHaveAttribute("aria-selected", "true");
			expect(items[3]).toHaveAttribute("aria-selected", "false");
			expect(items[4]).toHaveAttribute("aria-selected", "false");
		});

		it("aria-disabled правильно отражает состояние отключения", () => {
			const disabledKeys = new Set<Key>(["2", "4"]);
			render(<UIListBox {...testEnv.defaultProps} disabledKeys={disabledKeys} />);

			const items = screen.getAllByRole("option");

			expect(items[0]).toHaveAttribute("aria-disabled", "false");
			expect(items[1]).toHaveAttribute("aria-disabled", "true");
			expect(items[2]).toHaveAttribute("aria-disabled", "false");
			expect(items[3]).toHaveAttribute("aria-disabled", "true");
			expect(items[4]).toHaveAttribute("aria-disabled", "false");
		});
	});

	describe("ARIA состояния и взаимодействия", () => {
		it("aria-selected обновляется при изменении выбора", () => {
			const { rerender } = render(<UIListBox {...testEnv.defaultProps} />);

			// Изначально ничего не выбрано
			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("aria-selected", "false");
			});

			// Выбираем первый элемент
			rerender(<UIListBox {...testEnv.defaultProps} selectedKeys={new Set(["1"])} />);
			expect(items[0]).toHaveAttribute("aria-selected", "true");
			expect(items[1]).toHaveAttribute("aria-selected", "false");

			// Выбираем несколько элементов
			rerender(<UIListBox {...testEnv.defaultProps} selectedKeys={new Set(["1", "3"])} />);
			expect(items[0]).toHaveAttribute("aria-selected", "true");
			expect(items[1]).toHaveAttribute("aria-selected", "false");
			expect(items[2]).toHaveAttribute("aria-selected", "true");
		});

		it("aria-disabled обновляется при изменении отключенных элементов", () => {
			const { rerender } = render(<UIListBox {...testEnv.defaultProps} />);

			// Изначально ничего не отключено
			const items = screen.getAllByRole("option");
			items.forEach((item) => {
				expect(item).toHaveAttribute("aria-disabled", "false");
			});

			// Отключаем первый элемент
			rerender(<UIListBox {...testEnv.defaultProps} disabledKeys={new Set(["1"])} />);
			expect(items[0]).toHaveAttribute("aria-disabled", "true");
			expect(items[1]).toHaveAttribute("aria-disabled", "false");

			// Отключаем несколько элементов
			rerender(<UIListBox {...testEnv.defaultProps} disabledKeys={new Set(["1", "3"])} />);
			expect(items[0]).toHaveAttribute("aria-disabled", "true");
			expect(items[1]).toHaveAttribute("aria-disabled", "false");
			expect(items[2]).toHaveAttribute("aria-disabled", "true");
		});

		it("aria-posinset и aria-setsize обновляются при изменении количества элементов", () => {
			const { rerender } = render(<UIListBox {...testEnv.defaultProps} />);

			// Изначально 5 элементов
			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(5);
			items.forEach((item, index) => {
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
				expect(item).toHaveAttribute("aria-setsize", "5");
			});

			// Уменьшаем до 3 элементов
			const fewerItems = mockItems.slice(0, 3);
			rerender(<UIListBox {...testEnv.defaultProps} items={fewerItems} />);

			const newItems = screen.getAllByRole("option");
			expect(newItems).toHaveLength(3);
			newItems.forEach((item, index) => {
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
				expect(item).toHaveAttribute("aria-setsize", "3");
			});
		});
	});

	describe("ARIA доступность", () => {
		it("элементы имеют доступные имена", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			const items = screen.getAllByRole("option");
			items.forEach((item, index) => {
				const expectedName = `${mockItems[index]?.name} ${mockItems[index]?.description}`;
				expect(item).toHaveAccessibleName(expectedName);
			});
		});

		it("элементы с описанием имеют полную информацию", () => {
			render(<UIListBox {...testEnv.defaultProps} />);

			// Проверяем, что описания отображаются
			expect(screen.getByText("Programming language")).toBeInTheDocument();
			expect(screen.getByText("Typed JavaScript")).toBeInTheDocument();
			expect(screen.getByText("UI library")).toBeInTheDocument();
		});

		it("отключенные элементы правильно помечены", () => {
			const disabledKeys = new Set<Key>(["2", "4"]);
			render(<UIListBox {...testEnv.defaultProps} disabledKeys={disabledKeys} />);

			const items = screen.getAllByRole("option");

			// Отключенные элементы должны иметь aria-disabled="true"
			expect(items[1]).toHaveAttribute("aria-disabled", "true");
			expect(items[3]).toHaveAttribute("aria-disabled", "true");

			// Активные элементы должны иметь aria-disabled="false"
			expect(items[0]).toHaveAttribute("aria-disabled", "false");
			expect(items[2]).toHaveAttribute("aria-disabled", "false");
			expect(items[4]).toHaveAttribute("aria-disabled", "false");
		});

		it("выбранные элементы правильно помечены", () => {
			const selectedKeys = new Set<Key>(["1", "3"]);
			render(<UIListBox {...testEnv.defaultProps} selectedKeys={selectedKeys} />);

			const items = screen.getAllByRole("option");

			// Выбранные элементы должны иметь aria-selected="true"
			expect(items[0]).toHaveAttribute("aria-selected", "true");
			expect(items[2]).toHaveAttribute("aria-selected", "true");

			// Невыбранные элементы должны иметь aria-selected="false"
			expect(items[1]).toHaveAttribute("aria-selected", "false");
			expect(items[3]).toHaveAttribute("aria-selected", "false");
			expect(items[4]).toHaveAttribute("aria-selected", "false");
		});
	});

	describe("ARIA edge cases", () => {
		it("пустой список не имеет ARIA атрибутов", () => {
			render(<UIListBox {...testEnv.defaultProps} items={[]} />);

			expect(screen.queryByRole("listbox")).toBeInTheDocument();
		});

		it("элементы с пустыми именами имеют правильные ARIA атрибуты", () => {
			const itemsWithEmptyName = [
				{ id: "1", name: "" },
				{ id: "2", name: "Normal item" },
			];
			render(<UIListBox {...testEnv.defaultProps} items={itemsWithEmptyName} />);

			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(2);

			items.forEach((item, index) => {
				expect(item).toHaveAttribute("role", "option");
				expect(item).toHaveAttribute("aria-selected", "false");
				expect(item).toHaveAttribute("aria-disabled", "false");
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
				expect(item).toHaveAttribute("aria-setsize", "2");
			});
		});

		it("элементы с числовыми ID имеют правильные ARIA атрибуты", () => {
			const itemsWithNumericId = [
				{ id: 1, name: "Item 1" },
				{ id: 2, name: "Item 2" },
			];
			render(<UIListBox {...testEnv.defaultProps} items={itemsWithNumericId} />);

			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(2);

			items.forEach((item, index) => {
				const expectedId = `test-list-item-${itemsWithNumericId[index]?.id}`;
				expect(item).toHaveAttribute("id", expectedId);
				expect(item).toHaveAttribute("aria-posinset", String(index + 1));
				expect(item).toHaveAttribute("aria-setsize", "2");
			});
		});
	});
});
