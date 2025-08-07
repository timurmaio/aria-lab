import React, { useState } from "react";
import { UIListBox } from "./index";
import { TEST_DATA, formatSelectedKeys, DISABLED_KEYS } from "./stories.utils";
import type { Key, UIListItem, Selection } from "./types";

// Интерактивный компонент с состоянием
function InteractiveUIListBox({
	selectionMode = "single",
	items = TEST_DATA.basic,
	disabledKeys = new Set<Key>(),
	...props
}: Partial<Parameters<typeof UIListBox>[0]>) {
	const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
	const [focusedKey, setFocusedKey] = useState<Key | null>(null);

	const handleSelectionChange = (keys: Selection) => {
		if (keys instanceof Set) {
			setSelectedKeys(keys);
		} else {
			setSelectedKeys(new Set(keys));
		}
	};

	return (
		<div className="w-80">
			<UIListBox
				listId="story-listbox"
				items={items}
				selectionMode={selectionMode}
				selectedKeys={selectedKeys}
				onSelectionChange={handleSelectionChange}
				focusedKey={focusedKey}
				onFocusedChange={setFocusedKey}
				disabledKeys={disabledKeys}
				{...props}
			/>
			<div className="mt-4 text-sm text-gray-600">
				<div>Selected: {formatSelectedKeys(selectedKeys)}</div>
				{focusedKey && <div>Focused: {focusedKey}</div>}
			</div>
		</div>
	);
}

// Default export для Storybook
const meta = {
	title: "Components/UIListBox",
	component: UIListBox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент списка с возможностью выбора элементов. Поддерживает единичный и множественный выбор.",
			},
		},
	},
	argTypes: {
		selectionMode: {
			control: "select",
			options: ["single", "multiple", "none"],
			description: "Режим выбора элементов",
		},
		items: {
			description: "Массив элементов для отображения",
		},
		selectedKeys: {
			description: "Set выбранных ключей",
		},
		disabledKeys: {
			description: "Set отключенных ключей",
		},
	},
};

export default meta;

export const Default = {
	render: () => <InteractiveUIListBox selectionMode="single" />,
};

export const MultipleSelection = {
	render: () => <InteractiveUIListBox selectionMode="multiple" />,
};

export const WithDisabledItems = {
	render: () => (
		<InteractiveUIListBox
			items={TEST_DATA.withDisabled}
			disabledKeys={DISABLED_KEYS}
			selectionMode="single"
		/>
	),
};

export const MinimalData = {
	render: () => <InteractiveUIListBox items={TEST_DATA.minimal} selectionMode="single" />,
};

export const NoSelection = {
	render: () => <InteractiveUIListBox selectionMode="none" />,
};