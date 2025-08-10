import { Autocomplete, Button, Input, Label, SearchField, useFilter, Dialog, DialogTrigger, OverlayArrow, Popover, ListBox, ListBoxItem } from 'react-aria-components';

export function UIPicker() {
  let { contains } = useFilter({ sensitivity: 'base' });
  return (
    <DialogTrigger>
      <Button>Settings</Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <div className="autocomplete">
            <Autocomplete filter={contains}>
              <SearchField autoFocus={true}>
                <Label>Commands</Label>
                <Input placeholder="Search commands...." />
                <Button>✕</Button>
              </SearchField>
              <ListBox aria-label="Favorite animal" selectionMode="single">
                <ListBoxItem>Aardvark</ListBoxItem>
                <ListBoxItem>Cat</ListBoxItem>
                <ListBoxItem>Dog</ListBoxItem>
                <ListBoxItem>Kangaroo</ListBoxItem>
                <ListBoxItem>Panda</ListBoxItem>
                <ListBoxItem>Snake</ListBoxItem>
              </ListBox>
            </Autocomplete>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger >
  );
}
