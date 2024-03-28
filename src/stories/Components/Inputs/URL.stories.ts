import type { Meta, StoryObj } from '@storybook/react';
import URL from '../../../Ophelia/Components//Inputs/URL';

const meta = {
  title: 'Ophelia/Components/Inputs/URL',
  component: URL,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof URL>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "URL-primary",
    name: "URL-primary",
    className: '',
    list: "urlList",
    dataOptions: "x.com,y.com,z.com"
  },
};