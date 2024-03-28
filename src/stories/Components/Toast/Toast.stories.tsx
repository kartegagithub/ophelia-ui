import type { Meta, StoryObj } from '@storybook/react';
import Toast from '../../../Ophelia/Components//Toast/Toast';

const meta = {
  title: 'Ophelia/Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    showCloseButton: true,
    type: "info",
    text: "This is toast message",
    visible: true
  },
};