import type { Meta, StoryObj } from '@storybook/react';
import DateTime from '../../../Ophelia/Components//Inputs/DateTime';

const meta = {
  title: 'Ophelia/Components/Inputs/DateTime',
  component: DateTime,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "datetime-primary",
    name: "datetime-primary",
    className: "",
    value: "2024-01-05T23:10"
  },
};