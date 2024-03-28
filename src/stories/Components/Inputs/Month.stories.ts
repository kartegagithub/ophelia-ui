import type { Meta, StoryObj } from '@storybook/react';
import Month from '../../../Ophelia/Components//Inputs/Month';

const meta = {
  title: 'Ophelia/Components/Inputs/Month',
  component: Month,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Month>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Month-primary",
    name: "Month-primary",
    className: '',
    defaultValue: "2024-02"
  },
};