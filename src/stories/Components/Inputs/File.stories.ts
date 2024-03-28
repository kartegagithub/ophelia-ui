import type { Meta, StoryObj } from '@storybook/react';
import File from '../../../Ophelia/Components//Inputs/File';

const meta = {
  title: 'Ophelia/Components/Inputs/File',
  component: File,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof File>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "file-primary",
    name: "file-primary",
    className: ''
  },
};