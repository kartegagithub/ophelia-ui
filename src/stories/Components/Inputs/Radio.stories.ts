import type { Meta, StoryObj } from '@storybook/react';
import Radio from '../../../Ophelia/Components//Inputs/Radio';

const meta = {
  title: 'Ophelia/Components/Inputs/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    id: "radio-primary",
    name: "radio-primary",
    className: "",
    checked: true
  },
};

export const NotChecked: Story = {
  args: {
    id: "radio-secondary",
    name: "radio-secondary",
    className: '',
  },
};