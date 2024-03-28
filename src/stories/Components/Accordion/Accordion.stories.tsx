import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '../../../Ophelia/Components/Accordion/Accordion';

const meta = {
  title: 'Ophelia/Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandartDropdown: Story = {
  args: {
    title: "You can click here to see content",
    content: "Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.Here is the content.",

  },
};