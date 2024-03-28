import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../../../Ophelia/Components//Dropdown/Dropdown';

const meta = {
  title: 'Ophelia/Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchboxUsage: Story = {
  args: {
    visible: true,
    enableSearch: true,
    searchPlaceholder: "Type to search",
    multipleSelection: true,
    options: [
      {text: "Item1", value: "0"},
      {text: "Item2", value: "1"},
      {text: "Item3", value: "2"}
    ],
    buttons:[
      {text: "Cancel", type: "dismiss"},
      {text: "Reset", type: "reset"},
      {text: "Apply", type: "button", hideDropdownOnClick: true}
    ]
  },
};

export const StandartDropdown: Story = {
  args: {
    visible: true,
    enableSearch: false,
    searchPlaceholder: "Type to search",
    options: [
      {text: "Item1", value: "0", url: "/"},
      {text: "Item2", value: "1", url: "/membership"},
      {text: "Item3", value: "2"}
    ]
  },
};