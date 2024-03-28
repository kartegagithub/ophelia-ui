import type { Meta, StoryObj } from '@storybook/react';
import ShortcutList from '../../../Ophelia/Components//ShortcutList/Shortcutlist';

const meta = {
  title: 'Ophelia/Components/ShortcutList',
  component: ShortcutList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShortcutList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "My Shortcuts",
    newTitle: "Add New",
    showBadge: true,
    items: [
      { id: 1, image: "task-square", title: "Orders", badgeText: 12 },
      { id: 2, image: "shipping", title: "Shipping" },
      { id: 3, image: "diagram", title: "Reports" },
      { id: 4, image: "graph", title: "Finance" },
    ]
  },
};