import type { Meta, StoryObj } from '@storybook/react';
import Alert from '../../../Ophelia/Components//Alert/Alert';

const meta = {
  title: 'Ophelia/Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    visible: true,
    text: "Your message is here",
    iconProps: {name:"bell", color:"#5B6782", fill:"#5B6782", size:24 }
  },
};