import { Meta, StoryObj } from '@storybook/react';

import { List, ListDivider, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from './list.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';
import { Collapse } from '../collapse/collapse.web';

import { Selected, Unselected, LinkItem } from './list-item.stories';
import { ListItemProps } from './list.types';

const meta = {
  component: List,
  subcomponents: { ListItem, ListSubheader, ListDivider },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

let inboxOpen = true;

const ListTemplate: Story = {
  render: ({ items, ...args }) => {
    return (
      <List {...args}>
        {items.map((item: ListItemProps) => (
          <ListItem {...item} />
        ))}
      </List>
    );
  },
};

export const NestedList: Story = {
  render: (args) => {
    const handleChevronClick = () => {
      inboxOpen = !inboxOpen;
    };

    return (
      <List {...args}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                name={IconName.Send}
                size={24}
              />
            </ListItemIcon>
            <ListItemText primary='Sent mail' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Icon
                name={IconName.Drafts}
                size={24}
              />
            </ListItemIcon>
            <ListItemText primary='Drafts' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleChevronClick}>
            <ListItemIcon>
              <Icon
                name={IconName.Inbox}
                size={24}
              />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
            <Icon
              name={inboxOpen ? IconName.ChevronUp : IconName.ChevronDown}
              size={24}
            />
          </ListItemButton>
        </ListItem>
        <Collapse open={inboxOpen}>
          <List
            as='div'
            disablePadding
          >
            <ListItem as='div'>
              <ListItemButton inset>
                <ListItemIcon>
                  <Icon
                    name={IconName.EmptyStar}
                    size={24}
                  />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  },
};

export const StickSubheader: Story = {
  render: (args) => (
    <List {...args}>
      <ListSubheader sticky>Recent</ListSubheader>
      <ListItem>
        <ListItemText primary='Item 1' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 2' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 3' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 4' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 5' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 6' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 7' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 8' />
      </ListItem>
      <ListSubheader sticky>Older</ListSubheader>
      <ListItem>
        <ListItemText primary='Item 1' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 2' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 3' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 4' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 5' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 6' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 7' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Item 8' />
      </ListItem>
    </List>
  ),
};

export const Nav: Story = {
  ...ListTemplate,
  args: {
    items: [{ ...Selected.args }, { ...LinkItem.args }, { ...Unselected.args }],
  },
};
