import type { Meta, StoryObj } from '@storybook/react';
import Number from '../../../Ophelia/Components//Inputs/Number';

const meta = {
  title: 'Ophelia/Components/Inputs/Number',
  component: Number,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Number>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "number-primary",
    name: "number-primary",
    className: "",
    defaultValue: 5,
    list: "numberOptions",
    dataOptions: "50,100,150"
  },
};