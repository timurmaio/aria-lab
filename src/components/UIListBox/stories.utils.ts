import type { Key, UIListItem } from "./types";

// Общие тестовые данные для всех stories UIListBox
export const TEST_DATA = {
  basic: [
    { id: "1", name: "Элемент 1", description: "Описание первого элемента" },
    { id: "2", name: "Элемент 2", description: "Описание второго элемента" },
    { id: "3", name: "Элемент 3", description: "Описание третьего элемента" },
    { id: "4", name: "Элемент 4", description: "Описание четвертого элемента" },
    { id: "5", name: "Элемент 5", description: "Описание пятого элемента" },
  ] as UIListItem[],

  withDisabled: [
    { id: "1", name: "Активный элемент 1", description: "Этот элемент активен" },
    { id: "2", name: "Отключенный элемент 2", description: "Этот элемент отключен", disabled: true },
    { id: "3", name: "Активный элемент 3", description: "Этот элемент активен" },
    { id: "4", name: "Отключенный элемент 4", description: "Этот элемент отключен", disabled: true },
    { id: "5", name: "Активный элемент 5", description: "Этот элемент активен" },
  ] as UIListItem[],

  minimal: [
    { id: "1", name: "Минимальный элемент 1" },
    { id: "2", name: "Минимальный элемент 2" },
    { id: "3", name: "Минимальный элемент 3" },
  ] as UIListItem[],
} as const;

// Утилита для форматирования выбранных ключей
export const formatSelectedKeys = (keys: Iterable<Key>): string => {
  const keyArray = Array.from(keys);
  return keyArray.length > 0 ? keyArray.join(", ") : "пусто";
};

// Константы для отключенных элементов
export const DISABLED_KEYS = new Set(["2", "4"]);
