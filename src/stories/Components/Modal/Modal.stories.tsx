import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../../../Ophelia/Components//Modal/Modal';

const meta = {
  title: 'Ophelia/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Sample Modal",
    dismissText: "Dismiss",
    defaultOpen: true,
    buttons: [
      { text: "OK", closeModalOnClick: false, onClick: (e, item)=> alert(item.text + " clicked")}
    ],
    children: <div>Modal Content</div>
  },
};