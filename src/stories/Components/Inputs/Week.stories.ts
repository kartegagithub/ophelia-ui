import type { Meta, StoryObj } from '@storybook/react';
import Week from '../../../Ophelia/Components//Inputs/Week';

const meta = {
  title: 'Ophelia/Components/Inputs/Week',
  component: Week,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Week>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Week-primary",
    name: "Week-primary",
    className: '',
    defaultValue: '2024-W48'
  },
};