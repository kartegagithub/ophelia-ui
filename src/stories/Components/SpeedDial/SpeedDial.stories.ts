import type { Meta, StoryObj } from '@storybook/react';
import SpeedDial from '../../../Ophelia/Components//SpeedDial/SpeedDial';

const meta = {
  title: 'Ophelia/Components/SpeedDial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    
  },
};