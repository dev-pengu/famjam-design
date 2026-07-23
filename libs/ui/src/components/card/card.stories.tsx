import { Meta, StoryObj } from '@storybook/react';

import { Card } from './card.web';
import { CardElevation, CardVariant } from './card.types';
import { CardActionArea } from '../card-action-area/card-action-area.web';
import { CardActions } from '../card-actions/card-actions.web';
import { CardContent } from '../card-content/card-content.web';
import { CardHeader } from '../card-header/card-header.web';
import { CardMedia } from '../card-media/card-media.web';
import { Avatar, AvatarSize } from '../avatar/avatar.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';
import Typography from '../typography/typography.web';
import { Button, ButtonVariant } from '../button/button.web';
import { TypographySize } from '../typography';

const meta = {
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(CardVariant),
    },
    elevation: {
      control: 'select',
      options: Object.values(CardElevation),
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: CardVariant.Elevated,
    elevation: CardElevation.Raised,
    children: [
      <CardHeader
        avatar={
          <Avatar
            name='Jane Smith'
            size={AvatarSize.Small}
          />
        }
        title='Jane Smith'
        subheader='September 14, 2024'
        action={
          <Button variant={ButtonVariant.Text}>
            <Icon name={IconName.MoreVertical} />
          </Button>
        }
      />,
      <CardMedia
        src='https://images.pexels.com/photos/17200877/pexels-photo-17200877.jpeg'
        alt='Mountain landscape'
        height={200}
      />,
      <CardContent>
        <Typography.Body>A beautiful mountain landscape captured at sunrise.</Typography.Body>
      </CardContent>,
      <CardActions>
        <Button variant={ButtonVariant.Ghost}>Share</Button>
        <Button variant={ButtonVariant.Ghost}>Learn More</Button>
      </CardActions>,
    ],
  },
};

export const ClickableCard: Story = {
  args: {
    variant: CardVariant.Elevated,
    elevation: CardElevation.Raised,
    children: [
      <CardActionArea onClick={() => alert('Clicked on card')}>
        <CardMedia
          src='https://images.pexels.com/photos/17200877/pexels-photo-17200877.jpeg'
          alt='Mountain landscape'
          height={200}
        />
        <CardContent>
          <Typography.Title as='h5'>Product Name</Typography.Title>
          <Typography.Body muted>$29.99</Typography.Body>
        </CardContent>
      </CardActionArea>,
      <CardActions>
        <Button variant={ButtonVariant.Ghost}>Add to Cart</Button>
      </CardActions>,
    ],
  },
};

export const LinkCard: Story = {
  args: {
    variant: CardVariant.Elevated,
    elevation: CardElevation.Raised,
    children: (
      <CardActionArea href='#'>
        <CardMedia
          src='https://images.pexels.com/photos/17200877/pexels-photo-17200877.jpeg'
          alt='Article'
          height={140}
        />
        <CardContent>
          <Typography.Title as='h5'>Article Title</Typography.Title>
          <Typography.Body
            muted
            size={TypographySize.Small}
          >
            A short description of the article.
          </Typography.Body>
        </CardContent>
      </CardActionArea>
    ),
  },
};

export const CustomMedia: Story = {
  args: {
    variant: CardVariant.Elevated,
    elevation: CardElevation.Raised,
    children: [
      <CardMedia
        component='iframe'
        height={240}
      >
        <iframe
          width='100%'
          height='100%'
          src='https://www.youtube.com/embed/XfELJU1mRMg?controls=0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen'
          title='Media Embed'
          //   style={{position: 'absolute', top: '0px', left: '0px'}}' left: 0px; width: 100%; height: 100%; border: 0px;'
        >
          <small>
            Powered by <a href='https://embed.tube/embed-code-generator/youtube/'>fast youtube embed</a>
          </small>
        </iframe>
      </CardMedia>,
      <CardContent>
        <Typography.Body>Watch the demo.</Typography.Body>
      </CardContent>,
    ],
  },
};
