import type { Meta, StoryObj } from '@storybook/react';
import Password from '../../../Ophelia/Components//Inputs/Password';

const meta = {
  title: 'Ophelia/Components/Inputs/Password',
  component: Password,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Password-primary",
    name: "Password-primary",
    className: '',
    value: "123456"
  },
};