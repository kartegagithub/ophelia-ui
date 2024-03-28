import type { Meta, StoryObj } from '@storybook/react';
import Progress from '../../../Ophelia/Components//Progress/Progress';

const meta = {
  title: 'Ophelia/Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    width: "45%"
  },
};