import type { Meta, StoryObj } from '@storybook/react';
import Notification from '../../../Ophelia/Components//Notification/Notification';

const meta = {
  title: 'Ophelia/Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationPanel: Story = {
  args: {
    title:"This is a info alert",
    content:` More info about this info alert goes here. This example text is
    going to run a bit longer so that you can see how spacing within an
    alert works with this kind of content.`

  },
};