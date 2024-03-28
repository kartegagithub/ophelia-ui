import type { Meta, StoryObj } from '@storybook/react';
import RichText from '../../../Ophelia/Components//Inputs/RichText';

const meta = {
  title: 'Ophelia/Components/Inputs/RichText',
  component: RichText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "RichText-primary",
    name: "RichText-primary",
    className: '',
    onChange: (e: any)=> {
      console.log(e)
    }
  },
};