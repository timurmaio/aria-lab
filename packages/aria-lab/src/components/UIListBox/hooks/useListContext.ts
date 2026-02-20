import { useContext, createContext } from "react";
import type { ListContextValue } from "../types";

const ListContext = createContext<ListContextValue<any> | null>(null);

/**
 * Хук для использования контекста списка
 */
export function useListContext<T>(): ListContextValue<T> {
	const context = useContext(ListContext);
	if (!context) {
		throw new Error("useListContext must be used within UIListBox");
	}
	return context as ListContextValue<T>;
}

export { ListContext };
