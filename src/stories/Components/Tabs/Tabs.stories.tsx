import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '../../../Ophelia/Components//Tabs/Tabs';
import Tab from '../../../Ophelia/Components//Tabs/Tab';

const meta = {
  title: 'Ophelia/Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Tab id="firstTab" text='first tab' active={true} visible={true}>Test içerik 1</Tab>
        <Tab id="secondTab" text='second tab' active={false} visible={true}>Test içerik 2</Tab>
      </>
    )
  },
};