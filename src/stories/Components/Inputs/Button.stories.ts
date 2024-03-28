import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../../Ophelia/Components//Inputs/Button';

const meta = {
  title: 'Ophelia/Components/Inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Button-primary",
    name: "Button-primary",
    className: '',
    value: "click me!"
  },
};