import type { Meta, StoryObj } from '@storybook/react';
import Date from '../../../Ophelia/Components//Inputs/Date';

const meta = {
  title: 'Ophelia/Components/Inputs/Date',
  component: Date,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "date-primary",
    name: "date-primary",
    className: "",
    value: "2024-01-02"
  },
};