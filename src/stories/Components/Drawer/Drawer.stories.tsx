import type { Meta, StoryObj } from '@storybook/react';
import Drawer from '../../../Ophelia/Components//Drawer/Drawer';

const meta = {
  title: 'Ophelia/Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    visible: true,
    children: <div className='text-black dark:text-white bg-gray-600 w-full dark:bg-white'>
      Test content
    </div>
  },
};