import { Autocomplete, Button, Input, Label, SearchField, useFilter, ListBox, ListBoxItem } from 'react-aria-components';

export function UIPicker() {
  let { contains } = useFilter({ sensitivity: 'base' });

  return (
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
        <Button slot="clear" className="ml-2 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
          ✕
        </Button>
      </SearchField>
      <ListBox
        aria-label="Favorite animal"
        selectionMode="single"
        className="max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white"
      >
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Aardvark
        </ListBoxItem>
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Cat
        </ListBoxItem>
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Dog
        </ListBoxItem>
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Kangaroo
        </ListBoxItem>
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Panda
        </ListBoxItem>
        <ListBoxItem className="px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 selected:bg-blue-600 selected:text-white selected:hover:bg-blue-700 transition-colors text-sm">
          Snake
        </ListBoxItem>
      </ListBox>
    </Autocomplete>
  )
}
