import type { Meta, StoryObj } from '@storybook/react';
import Range from '../../../Ophelia/Components//Inputs/Range';

const meta = {
  title: 'Ophelia/Components/Inputs/Range',
  component: Range,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Range-primary",
    name: "Range-primary",
    className: '',
    defaultValue: '5',
    min: 4,
    max: 10
  },
};