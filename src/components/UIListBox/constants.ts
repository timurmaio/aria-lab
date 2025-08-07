export const LIST_BOX_STYLES = {
	root: "flex flex-col gap-1 outline-hidden",
	item: "group flex cursor-default items-center gap-2 rounded-sm px-4 py-2 text-gray-900 outline-hidden select-none hover:bg-gray-100 data-[focused=true]:bg-sky-600 data-[focused=true]:text-white data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed",
	itemContent: "flex flex-1 flex-col gap-1",
	itemName: "flex flex-1 items-center gap-2 truncate font-normal",
	itemDescription: "truncate text-xs text-gray-500",
	checkbox: "flex h-4 w-4 items-center justify-center rounded-sm border-2 transition-colors",
	checkboxSelected: "h-2.5 w-2.5 rounded-sm bg-sky-600 group-focus:bg-white",
	checkboxUnselected: "h-2.5 w-2.5 rounded-sm border border-gray-300 group-focus:border-white",
} as const;

export const LIST_BOX_LAYOUT = {
	itemHeight: "h-10",
	itemPadding: "px-4 py-2",
	itemGap: "gap-2",
} as const;

export const LIST_BOX_ITEM_STATES = {
	selected: "data-[selected=true]",
	focused: "data-[focused=true]",
	disabled: "data-[disabled=true]",
	hover: "hover:",
} as const;
