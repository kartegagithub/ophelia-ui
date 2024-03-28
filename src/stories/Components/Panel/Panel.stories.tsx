import type { Meta, StoryObj } from '@storybook/react';
import Panel from '../../../Ophelia/Components//Panel/Panel';

const meta = {
  title: 'Ophelia/Components/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    headerText: "Panel Sample",
    children: (
      <>
        <div>test</div>
      </>
    )
  },
};