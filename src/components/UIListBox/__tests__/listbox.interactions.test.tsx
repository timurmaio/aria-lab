import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UIListBox } from "../index";
import type { Key } from "../types";
import { createTestEnvironment, mockItems, mockItemsWithDisabled } from "./test-utils";

describe("UIListBox Interactions", () => {
	let testEnv: ReturnType<typeof createTestEnvironment>;

	beforeEach(() => {
		testEnv = createTestEnvironment();
	});

	afterEach(() => {
		testEnv.cleanup();
	});

	describe("Поведение пользователя при взаимодействии", () => {
		it("пользователь может выбрать элемент при клике", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} onSelectionChange={onSelectionChange} />);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
		});

		it("пользователь может выбрать несколько элементов в multiple режиме", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const { rerender } = render(
				<UIListBox {...testEnv.defaultProps} selectionMode="multiple" onSelectionChange={onSelectionChange} />,
			);

			// Выбираем первый элемент
			const firstItem = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(firstItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));

			// Обновляем компонент с выбранным элементом
			rerender(
				<UIListBox
					{...testEnv.defaultProps}
					selectionMode="multiple"
					selectedKeys={new Set(["1"])}
					onSelectionChange={onSelectionChange}
				/>,
			);

			// Выбираем второй элемент
			const secondItem = screen.getByRole("option", { name: "TypeScript Typed JavaScript" });
			await user.click(secondItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "2"]));
		});

		it("пользователь может выбрать только один элемент в single режиме", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} selectionMode="single" onSelectionChange={onSelectionChange} />);

			// Выбираем первый элемент
			const firstItem = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(firstItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));

			// Выбираем второй элемент
			const secondItem = screen.getByRole("option", { name: "TypeScript Typed JavaScript" });
			await user.click(secondItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["2"]));
		});

		it("пользователь не может выбрать отключенные элементы", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			render(
				<UIListBox {...testEnv.defaultProps} items={mockItemsWithDisabled} onSelectionChange={onSelectionChange} />,
			);

			// Пытаемся выбрать отключенный элемент
			const disabledItem = screen.getByRole("option", { name: "TypeScript Typed JavaScript" });
			await user.click(disabledItem);

			expect(onSelectionChange).not.toHaveBeenCalled();
		});

		it("пользователь может снять выбор с элемента в multiple режиме", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			render(
				<UIListBox
					{...testEnv.defaultProps}
					selectionMode="multiple"
					selectedKeys={new Set(["1", "2"])}
					onSelectionChange={onSelectionChange}
				/>,
			);

			// Снимаем выбор с первого элемента
			const firstItem = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(firstItem);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["2"]));
		});

		it("пользователь может выбрать элемент в none режиме", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} selectionMode="none" onSelectionChange={onSelectionChange} />);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			// В none режиме onSelectionChange может быть вызван с пустым Set
			expect(onSelectionChange).toHaveBeenCalledWith(new Set([]));
		});
	});

	describe("Управление фокусом", () => {
		it("пользователь может сфокусироваться на элементе при клике", async () => {
			const user = userEvent.setup();
			const onFocusedChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} onFocusedChange={onFocusedChange} />);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			expect(onFocusedChange).toHaveBeenCalledWith("1");
		});

		it("пользователь не может сфокусироваться на отключенном элементе", async () => {
			const user = userEvent.setup();
			const onFocusedChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} items={mockItemsWithDisabled} onFocusedChange={onFocusedChange} />);

			const disabledItem = screen.getByRole("option", { name: "TypeScript Typed JavaScript" });
			await user.click(disabledItem);

			expect(onFocusedChange).not.toHaveBeenCalled();
		});

		it("followKeyboardFocus=false не вызывает onFocusedChange", async () => {
			const user = userEvent.setup();
			const onFocusedChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} onFocusedChange={onFocusedChange} followKeyboardFocus={false} />);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			expect(onFocusedChange).not.toHaveBeenCalled();
		});

		it("followKeyboardFocus=true вызывает onFocusedChange", async () => {
			const user = userEvent.setup();
			const onFocusedChange = vi.fn();
			render(<UIListBox {...testEnv.defaultProps} onFocusedChange={onFocusedChange} followKeyboardFocus={true} />);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			expect(onFocusedChange).toHaveBeenCalledWith("1");
		});
	});

	describe("Комбинированные взаимодействия", () => {
		it("выбор и фокус работают одновременно", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const onFocusedChange = vi.fn();
			render(
				<UIListBox
					{...testEnv.defaultProps}
					onSelectionChange={onSelectionChange}
					onFocusedChange={onFocusedChange}
				/>,
			);

			const item = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(item);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
			expect(onFocusedChange).toHaveBeenCalledWith("1");
		});

		it("множественный выбор с фокусом", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const onFocusedChange = vi.fn();
			const { rerender } = render(
				<UIListBox
					{...testEnv.defaultProps}
					selectionMode="multiple"
					onSelectionChange={onSelectionChange}
					onFocusedChange={onFocusedChange}
				/>,
			);

			// Выбираем первый элемент
			const firstItem = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(firstItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
			expect(onFocusedChange).toHaveBeenCalledWith("1");

			// Обновляем компонент с выбранным элементом
			rerender(
				<UIListBox
					{...testEnv.defaultProps}
					selectionMode="multiple"
					selectedKeys={new Set(["1"])}
					onSelectionChange={onSelectionChange}
					onFocusedChange={onFocusedChange}
				/>,
			);

			// Выбираем второй элемент
			const secondItem = screen.getByRole("option", { name: "TypeScript Typed JavaScript" });
			await user.click(secondItem);
			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "2"]));
			expect(onFocusedChange).toHaveBeenCalledWith("2");
		});

		it("снятие выбора с сохранением фокуса", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const onFocusedChange = vi.fn();
			render(
				<UIListBox
					{...testEnv.defaultProps}
					selectionMode="multiple"
					selectedKeys={new Set(["1"])}
					onSelectionChange={onSelectionChange}
					onFocusedChange={onFocusedChange}
				/>,
			);

			// Снимаем выбор
			const firstItem = screen.getByRole("option", { name: "JavaScript Programming language" });
			await user.click(firstItem);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set([]));
			expect(onFocusedChange).toHaveBeenCalledWith("1");
		});
	});

	describe("Edge cases взаимодействий", () => {
		it("клик по пустому списку не вызывает ошибок", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const onFocusedChange = vi.fn();
			render(
				<UIListBox
					{...testEnv.defaultProps}
					items={[]}
					onSelectionChange={onSelectionChange}
					onFocusedChange={onFocusedChange}
				/>,
			);

			// Компонент должен рендериться без ошибок
			expect(screen.queryByRole("listbox")).toBeInTheDocument();
		});

		it("клик по элементу с пустым именем", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const itemsWithEmptyName = [
				{ id: "1", name: "" },
				{ id: "2", name: "Normal item" },
			];
			render(<UIListBox {...testEnv.defaultProps} items={itemsWithEmptyName} onSelectionChange={onSelectionChange} />);

			// Кликаем по элементу с пустым именем
			const items = screen.getAllByRole("option");
			await user.click(items[0]);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
		});

		it("клик по элементу с очень длинным именем", async () => {
			const user = userEvent.setup();
			const onSelectionChange = vi.fn();
			const itemsWithLongName = [
				{
					id: "1",
					name: "Очень длинное название элемента которое может не поместиться в контейнер и должно корректно обрабатываться",
					description: "Описание тоже может быть длинным",
				},
			];
			render(<UIListBox {...testEnv.defaultProps} items={itemsWithLongName} onSelectionChange={onSelectionChange} />);

			const item = screen.getByRole("option");
			await user.click(item);

			expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
		});
	});
});
