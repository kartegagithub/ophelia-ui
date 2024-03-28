import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../../../Ophelia/Components//Inputs/Checkbox';

const meta = {
  title: 'Ophelia/Components/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    id: "cb-primary",
    name: "cb-primary",
    className: "",
    checked: true
  },
};

export const NotChecked: Story = {
  args: {
    id: "cb-secondary",
    name: "cb-secondary",
    className: '',
  },
};