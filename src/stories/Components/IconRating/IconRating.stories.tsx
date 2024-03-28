import type { Meta, StoryObj } from '@storybook/react';
import IconRating from '../../../Ophelia/Components//IconRating/IconRating';

const meta = {
  title: 'Ophelia/Components/IconRating',
  component: IconRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "{0} / {1}",
    count: 10,
    value: 4.5
  },
};