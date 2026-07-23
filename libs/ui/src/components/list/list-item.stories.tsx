import { Meta, StoryObj } from '@storybook/react';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, ListDivider } from './list.web';
import { Icon } from '../icon/icon.web';
import { Avatar, AvatarSize } from '../avatar/avatar.web';
import { IconName } from '@famjam/icons';
import { Collapse } from '../collapse/collapse.web';
import { Badge, BadgeDisplay, BadgeVariant } from '../badge/badge.web';
import { Switch, SwitchSize } from '../switch/switch.web';

const meta = {
  component: ListItem,
  subcomponents: { ListItemButton, ListItemAvatar, ListItemIcon, ListItemText },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarItem: Story = {
  render: (args) => (
    <ListItem {...args}>
      <ListItemAvatar>
        <Badge
          variant={BadgeVariant.Success}
          display={BadgeDisplay.Dot}
        >
          <Avatar
            name='Jane Smith'
            size={AvatarSize.Small}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary='Jane Smith'
        secondary='Online'
        style={{ paddingLeft: '8px' }}
      />
    </ListItem>
  ),
};

export const LinkItem: Story = {
  args: {
    children: (
      <ListItemButton href='#'>
        <ListItemIcon>
          <Icon
            name={IconName.Settings}
            size={24}
          />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItemButton>
    ),
  },
  render: (args) => <ListItem {...args}></ListItem>,
};

export const Selected: Story = {
  args: {
    children: (
      <ListItemButton
        href='#'
        selected
      >
        <ListItemIcon>
          <Icon
            name={IconName.Home}
            size={24}
          />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton>
    ),
  },
  render: (args) => <ListItem {...args}></ListItem>,
};

export const Unselected: Story = {
  args: {
    selected: false,
    children: (
      <ListItemButton href='#'>
        <ListItemIcon>
          <Icon
            name={IconName.Account}
            size={24}
          />
        </ListItemIcon>
        <ListItemText primary='Account' />
      </ListItemButton>
    ),
  },
  render: (args) => <ListItem {...args}></ListItem>,
};

export const TrailingAction: Story = {
  render: (args) => (
    <ListItem {...args}>
      <ListItemIcon>
        <Icon
          name={IconName.Wifi}
          size={24}
        />
      </ListItemIcon>
      <ListItemText primary='Wi-Fi' />
      <Switch
        defaultChecked={false}
        size={SwitchSize.Small}
      />
    </ListItem>
  ),
};
