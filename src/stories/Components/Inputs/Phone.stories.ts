import type { Meta, StoryObj } from '@storybook/react';
import Phone from '../../../Ophelia/Components//Inputs/Phone';

const meta = {
  title: 'Ophelia/Components/Inputs/Phone',
  component: Phone,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Phone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Phone-primary",
    name: "Phone-primary",
    className: '',
    pattern: "5[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}",
    list: "phoneList",
    dataOptions: "50712312312,5091457898"
  },
};