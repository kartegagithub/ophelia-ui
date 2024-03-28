import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '../../../Ophelia/Components//Inputs/TextArea';

const meta = {
  title: 'Ophelia/Components/Inputs/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "TextArea-primary",
    name: "TextArea-primary",
    className: ''
  },
};