import { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuShortcut,
} from './dropdown.web';
import { Button } from '../button/button.web';
import Typography from '../typography/typography.web';

const meta = {
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>,
      <DropdownMenuContent>
        <DropdownMenuItem>Item One</DropdownMenuItem>
        <DropdownMenuItem>Item Two</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Typography.Body as='span'>Item Three</Typography.Body>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>,
    ],
  },
};

export const WithCheckboxItems: Story = {
  args: {
    children: [
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>,
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem defaultChecked={true}>Option One</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked={false}>Option Two</DropdownMenuCheckboxItem>
      </DropdownMenuContent>,
    ],
  },
};

export const WithRadioItems: Story = {
  args: {
    children: [
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>,
      <DropdownMenuContent>
        <DropdownMenuLabel>Select an option</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue={'one'}>
          <DropdownMenuRadioItem value='one'>Option One</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='two'>Option Two</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='three'>Option Three</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>,
    ],
  },
};

export const WithSubmenus: Story = {
  args: {
    children: [
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>,
      <DropdownMenuContent>
        <DropdownMenuItem>Item One</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Sub Item One</DropdownMenuItem>
            <DropdownMenuItem>Sub Item Two</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>Item Three</DropdownMenuItem>
      </DropdownMenuContent>,
    ],
  },
};
