import { Meta, StoryObj } from "@storybook/react";

import {Skeleton} from './skeleton.web';
import { SkeletonVariant } from "./skeleton.web";
import { Avatar, AvatarSize } from "../avatar/avatar.web";

const meta = {
    component: Skeleton
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rectangular: Story = {
    args: {
        width: 240,
        height: 16
    }
}

export const AvatarPlaceholder: Story = {
    args: {
        variant: SkeletonVariant.Circular,
        width: 40,
        height: 40
    }
}

export const SingleText: Story = {
    args: {
        variant: SkeletonVariant.Text,
        width: 200
    }
}

export const ParagraphText: Story = {
    args: {
        variant: SkeletonVariant.Text,
        lines: 4,
        lastLineWidth: "40%"
    }
}

export const ChildInference: Story = {
    args: {
        variant: SkeletonVariant.Circular,
        children: <Avatar name="Jane Smith" size={AvatarSize.Large} />
    }
}