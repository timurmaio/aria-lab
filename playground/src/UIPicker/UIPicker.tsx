import React from 'react'
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { Autocomplete, Button, Input, Label, SearchField, useFilter, Dialog, DialogTrigger, OverlayArrow, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export function UIPicker() {
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  let { contains } = useFilter({ sensitivity: 'base' });

  return (
    <DialogTrigger>
      <div className="relative inline-block">
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          {selectedKeys.size > 0 ? Array.from(selectedKeys).join(', ') : 'Select Value'}
        </Button>
      </div>
      <Popover className="bg-white border border-gray-200 rounded-lg shadow-xl outline-none max-w-sm z-50">
        <OverlayArrow>
        </OverlayArrow>
        <Dialog>
          <div className="p-4 outline-none">
            <div className="space-y-3">
              <Autocomplete filter={contains}>
                <SearchField>
                  <Label className="block text-sm font-medium text-gray-700">
                    Commands
                  </Label>
                  <Input
                    placeholder="Search commands...."
                    className="flex-1 border-none outline-none bg-transparent text-sm text-gray-900 placeholder-gray-500"
                    autoFocus={true}
                  />
                  <Button className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                    ✕
                  </Button>
                </SearchField>
                <ListBox
                  escapeKeyBehavior="none"
                  aria-label="Favorite animal"
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) => setSelectedKeys(keys as unknown as Set<Key>)}
                  className="max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white"
                >
                  <ListBoxItem className={itemStyles}>
                    Aardvark
                  </ListBoxItem>
                  <ListBoxItem className={itemStyles}>
                    Cat
                  </ListBoxItem>
                  <ListBoxItem className={itemStyles}>
                    Dog
                  </ListBoxItem>
                  <ListBoxItem className={itemStyles}>
                    Kangaroo
                  </ListBoxItem>
                  <ListBoxItem className={itemStyles}>
                    Panda
                  </ListBoxItem>
                  <ListBoxItem className={itemStyles}>
                    Snake
                  </ListBoxItem>
                </ListBox>
              </Autocomplete>
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

export const focusRing = tv({
  base: 'outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2'
    }
  }
});

export const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex items-center gap-8 cursor-default select-none py-1.5 px-2.5 rounded-md will-change-transform text-sm forced-color-adjust-none',
  variants: {
    isSelected: {
      false: 'text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 -outline-offset-2',
      true: 'bg-blue-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] [&:has(+[data-selected])]:rounded-b-none [&+[data-selected]]:rounded-t-none -outline-offset-4 outline-white dark:outline-white forced-colors:outline-[HighlightText]'
    },
    isHovered: {
      true: 'bg-slate-200 dark:bg-zinc-700'
    },
    isFocused: {
      true: 'bg-blue-500 text-white'
    },
    isDisabled: {
      true: 'text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText]'
    }
  }
});
