import { useCallback } from "react";
import type { Key, Selection, SelectionMode } from "../types";

export interface UseItemSelectionProps {
  itemKey: Key;
  selectionMode: SelectionMode;
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  isDisabled?: boolean;
}

export interface UseItemSelectionReturn {
  handleClick: () => void;
  isSelected: boolean;
}

/**
 * Хук для управления выбором элемента в списке
 * Инкапсулирует логику выбора/снятия выбора элементов
 */
export function useItemSelection({
  itemKey,
  selectionMode,
  selectedKeys,
  onSelectionChange,
  isDisabled = false,
}: UseItemSelectionProps): UseItemSelectionReturn {
  
  const currentSelectedKeys = new Set(selectedKeys || []);
  const isSelected = currentSelectedKeys.has(itemKey);

  const handleClick = useCallback(() => {
    if (isDisabled || !onSelectionChange) return;

    const newSelectedKeys = new Set(currentSelectedKeys);

    switch (selectionMode) {
      case "single": {
        newSelectedKeys.clear();
        newSelectedKeys.add(itemKey);
        break;
      }
      
      case "multiple": {
        if (newSelectedKeys.has(itemKey)) {
          newSelectedKeys.delete(itemKey);
        } else {
          newSelectedKeys.add(itemKey);
        }
        break;
      }
      
      case "none": {
        // В режиме "none" очищаем выбор
        newSelectedKeys.clear();
        break;
      }
      
      default: {
        // Не должно произойти, но для безопасности
        return;
      }
    }

    onSelectionChange(newSelectedKeys);
  }, [itemKey, selectionMode, currentSelectedKeys, isDisabled, onSelectionChange]);

  return {
    handleClick,
    isSelected,
  };
}
