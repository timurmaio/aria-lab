import { Autocomplete, Button, Input, Label, SearchField, useFilter, Dialog, DialogTrigger, OverlayArrow, Popover, ListBox, ListBoxItem } from 'react-aria-components';

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
        <Button className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
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


  return (
    <DialogTrigger>
      <div className="relative inline-block">
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Settings
        </Button>
      </div>
      <Popover className="bg-white border border-gray-200 rounded-lg shadow-xl outline-none max-w-sm z-50">

        <OverlayArrow>
          <div className="fill-white stroke-gray-200 stroke-1">
            <svg width={12} height={12} viewBox="0 0 12 12">
              <path d="M0 0 L6 6 L12 0" />
            </svg>
          </div>
        </OverlayArrow>
        <Dialog>
          <div className="p-4 outline-none">
            <div className="space-y-3">
              <Autocomplete filter={contains}>
                <SearchField>
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700">
                      Commands
                    </Label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                      <Input
                        placeholder="Search commands...."
                        className="flex-1 border-none outline-none bg-transparent text-sm text-gray-900 placeholder-gray-500"
                        autoFocus={true}
                      />
                      <Button className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        ✕
                      </Button>
                    </div>
                  </div>
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
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
