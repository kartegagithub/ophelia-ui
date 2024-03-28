import type { Meta, StoryObj } from '@storybook/react';
import Indicator from '../../../Ophelia/Components//Indicator/Indicator';

const meta = {
  title: 'Ophelia/Components/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    visible: true,
    count: 10,
    activeIndex: 4
  },
};

const renderItem = (selected: boolean, text :string) => {
  return <div>{selected && text}</div>
}
export const Secondary: Story = {
  args: {
    visible: true,
    activeIndex: 2,
    items: [
      {component: (selected) => renderItem(selected, "item1")},
      {component: (selected) => renderItem(selected, "item2")},
      {component: (selected) => renderItem(selected, "item3")},
      {component: (selected) => renderItem(selected, "item4")},
    ]
  },
};