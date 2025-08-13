import React from "react";
import { UIPicker } from "./UIPicker";

// Интерактивный компонент с состоянием
function InteractiveUIPicker() {
	return (
		<div className="w-80">
			<UIPicker
			/>
		</div>
	);
}

// Default export для Storybook
const meta = {
	title: "Components/UIPicker",
	component: UIPicker,
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
	render: () => <InteractiveUIPicker />,
};

export const MultipleSelection = {
	render: () => <InteractiveUIPicker />,
};

export const WithDisabledItems = {
	render: () => (
		<InteractiveUIPicker
		/>
	),
};

export const MinimalData = {
	render: () => <InteractiveUIPicker />,
};

export const NoSelection = {
	render: () => <InteractiveUIPicker />,
};