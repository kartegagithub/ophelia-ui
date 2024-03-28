import type { Meta, StoryObj } from '@storybook/react';
import Email from '../../../Ophelia/Components//Inputs/Email';

const meta = {
  title: 'Ophelia/Components/Inputs/Email',
  component: Email,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Email>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Email-primary",
    name: "Email-primary",
    className: '',
    defaultValue: "test@test.com",
    list: "emailOptions",
    dataOptions: "x@y.com,z@c.com"
  },
};