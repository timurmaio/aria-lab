import React from "react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useListState } from "../hooks/useListState";
import type { UIListItem } from "../types";

const mockItems: UIListItem[] = [
	{ id: "1", name: "JavaScript", description: "Programming language" },
	{ id: "2", name: "TypeScript", description: "Typed JavaScript" },
	{ id: "3", name: "React", description: "UI library" },
	{ id: "4", name: "Vue", description: "Progressive framework" },
	{ id: "5", name: "Angular", description: "Platform for building applications" },
];

describe("useListState", () => {
	it("инициализируется с пустым состоянием", () => {
		const { result } = renderHook(() => useListState());

		expect(result.current.items).toEqual([]);
		expect(result.current.selectedKeys).toEqual(new Set());
		expect(result.current.selectionMode).toBe("none");
		expect(result.current.disabledKeys).toEqual(new Set());
	});

	it("инициализируется с переданными элементами", () => {
		const { result } = renderHook(() => useListState({ items: mockItems }));

		expect(result.current.items).toEqual(mockItems);
		expect(result.current.selectedKeys).toEqual(new Set());
		expect(result.current.selectionMode).toBe("none");
	});

	it("инициализируется с режимом выбора", () => {
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
			}),
		);

		expect(result.current.selectionMode).toBe("multiple");
	});

	it("инициализируется с отключенными ключами", () => {
		const disabledKeys = new Set(["2", "4"]);
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				disabledKeys,
			}),
		);

		expect(result.current.disabledKeys).toEqual(disabledKeys);
	});

	it("правильно определяет выбранные элементы", () => {
		const selectedKeys = new Set(["1", "3"]);
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectedKeys,
			}),
		);

		expect(result.current.isSelected("1")).toBe(true);
		expect(result.current.isSelected("3")).toBe(true);
		expect(result.current.isSelected("2")).toBe(false);
		expect(result.current.isSelected("4")).toBe(false);
	});

	it("правильно определяет отключенные элементы", () => {
		const disabledKeys = new Set(["2", "4"]);
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				disabledKeys,
			}),
		);

		expect(result.current.isDisabled("2")).toBe(true);
		expect(result.current.isDisabled("4")).toBe(true);
		expect(result.current.isDisabled("1")).toBe(false);
		expect(result.current.isDisabled("3")).toBe(false);
	});

	it("переключает выбор элемента", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.toggleKey("1");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));

		act(() => {
			result.current.toggleKey("2");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "2"]));

		act(() => {
			result.current.toggleKey("1");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["2"]));
	});

	it("выбирает элемент в режиме single", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "single",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.toggleKey("1");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));

		act(() => {
			result.current.toggleKey("2");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["2"]));
	});

	it("выбирает элемент", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.selectKey("1");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
	});

	it("снимает выбор с элемента", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				selectedKeys: new Set(["1", "2"]),
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.deselectKey("1");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["2"]));
	});

	it("выбирает все элементы в режиме multiple", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.selectAll();
		});

		expect(onSelectionChange).toHaveBeenCalledWith(["1", "2", "3", "4", "5"]);
	});

	it("не выбирает все элементы в режиме single", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "single",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.selectAll();
		});

		expect(onSelectionChange).not.toHaveBeenCalled();
	});

	it("снимает выбор со всех элементов", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				selectedKeys: new Set(["1", "2", "3"]),
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.deselectAll();
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set());
	});

	it("устанавливает выбранные ключи", () => {
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.setSelectedKeys(new Set(["1", "3", "5"]));
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "3", "5"]));
	});
});

describe("useListState - Controlled Mode", () => {
	it("работает в controlled режиме", () => {
		const selectedKeys = new Set(["1", "3"]);
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectedKeys,
				onSelectionChange,
			}),
		);

		expect(result.current.selectedKeys).toEqual(selectedKeys);
		expect(result.current.isSelected("1")).toBe(true);
		expect(result.current.isSelected("3")).toBe(true);
		expect(result.current.isSelected("2")).toBe(false);
	});

	it("вызывает onSelectionChange в controlled режиме", () => {
		const selectedKeys = new Set(["1"]);
		const onSelectionChange = vi.fn();
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectedKeys,
				selectionMode: "multiple",
				onSelectionChange,
			}),
		);

		act(() => {
			result.current.toggleKey("2");
		});

		expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "2"]));
	});
});

describe("useListState - Uncontrolled Mode", () => {
	it("работает в uncontrolled режиме", () => {
		const defaultSelectedKeys = new Set(["1", "3"]);
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				defaultSelectedKeys,
			}),
		);

		expect(result.current.selectedKeys).toEqual(defaultSelectedKeys);
		expect(result.current.isSelected("1")).toBe(true);
		expect(result.current.isSelected("3")).toBe(true);
	});

	it("обновляет внутреннее состояние в uncontrolled режиме", () => {
		const { result } = renderHook(() =>
			useListState({
				items: mockItems,
				selectionMode: "multiple",
			}),
		);

		act(() => {
			result.current.toggleKey("1");
		});

		expect(result.current.selectedKeys).toEqual(new Set(["1"]));
		expect(result.current.isSelected("1")).toBe(true);

		act(() => {
			result.current.toggleKey("2");
		});

		expect(result.current.selectedKeys).toEqual(new Set(["1", "2"]));
		expect(result.current.isSelected("1")).toBe(true);
		expect(result.current.isSelected("2")).toBe(true);
	});
});
