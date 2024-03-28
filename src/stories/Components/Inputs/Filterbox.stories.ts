import type { Meta, StoryObj } from '@storybook/react';
import Filterbox from '../../../Ophelia/Components//Inputs/Filterbox';

const meta = {
  title: 'Ophelia/Components/Inputs/Filterbox',
  component: Filterbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Filterbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "filterboxid",
    name: "filterboxid",
    valueProp: "id",
    displayProp: "name",
    applyText: "Apply",
    resetText: "Reset",
    defaultValue:[
      {id: 1, name: "item 1"}
    ],
    options:[
      {id: 1, name: "item 1"},
      {id: 2, name: "item 2"},
      {id: 3, name: "item 3"}
    ]
  },
};