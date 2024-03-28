import type { Meta, StoryObj } from '@storybook/react';
import Time from '../../../Ophelia/Components//Inputs/Time';

const meta = {
  title: 'Ophelia/Components/Inputs/Time',
  component: Time,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Time>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "time-primary",
    name: "time-primary",
    className: '',
    value: "23:10"
  },
};