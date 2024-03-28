import type { Meta, StoryObj } from '@storybook/react';
import Select from '../../../Ophelia/Components//Inputs/Select';

const meta = {
  title: 'Ophelia/Components/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumericSelection: Story = {
  args: {
    id: "select-primary",
    name: "select-primary",
    className: "",
    low: 1,
    high:10,
    value: "5"
  },
};

export const OptionsSelection: Story = {
  args: {
    id: "select-secondary",
    name: "select-secondary",
    className: '',
    value: "4",
    options:[
      { text: "text-1", value: "1"},
      { text: "text-2", value: "2"},
      { text: "text-3", value: "3"},
      { text: "text-4", value: "4"},
      { text: "text-5", value: "5"}
    ]
  },
};