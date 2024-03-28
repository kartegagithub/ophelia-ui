import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '../../../Ophelia/Components//Spinner/Spinner';

const meta = {
  title: 'Ophelia/Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    
  },
};