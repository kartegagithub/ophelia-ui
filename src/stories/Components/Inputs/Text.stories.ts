import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../../Ophelia/Components//Inputs/Text';

const meta = {
  title: 'Ophelia/Components/Inputs/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "text-primary",
    name: "text-primary",
    className: "",
    defaultValue: "type text",
    list: "textOptions",
    dataOptions: "test,deneme,merhaba,hello"
  },
};