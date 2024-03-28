import type { Meta, StoryObj } from '@storybook/react';
import Table from '../../../Ophelia/Components//Table/Table';

const meta = {
  title: 'Ophelia/Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    table: {
      Columns: [
        {
          AllowEditing: false,
          AllowFiltering: true,
          AllowSorting: true,
          DisplayOrder: 0,
          Format: "",
          Freeze: false,
          HeaderText: "Column1",
          PropertyName: "Column1",
          Type: 'text',
          Visible: true,
          TextFormatter: (text:string) => text
        },
      ]
    },
    data: [
      { Column1: "Row1 Col1", Column2: "Row1 Col2"},
      { Column1: "Row2 Col1", Column2: "Row2 Col2"},
      { Column1: "Row3 Col1", Column2: "Row3 Col2"},
    ],
  },
};