import type { Meta, StoryObj } from '@storybook/react';
import Label from '../../../Ophelia/Components//Readonly/Label';

const meta = {
  title: 'Ophelia/Components/Readonly/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "label-primary",
    name: "label-primary",
    className: "",
  },
};