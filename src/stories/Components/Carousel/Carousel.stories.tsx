import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '../../../Ophelia/Components//Carousel/Carousel';

const meta = {
  title: 'Ophelia/Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    visible: true,
    data:  [
      {image: "https://picsum.photos/id/237/400/250", location: "/test"}, 
      {image: "https://picsum.photos/id/238/400/250"}, 
      {image: "https://picsum.photos/id/236/400/250"},
      {image: "https://picsum.photos/id/235/400/250"},
      {image: "https://picsum.photos/id/234/400/250"},
      {image: "https://picsum.photos/id/233/400/250"},
      {image: "https://picsum.photos/id/232/400/250"},
      {image: "https://picsum.photos/id/231/400/250"},
      {image: "https://picsum.photos/id/230/400/250"},
      // {component: <div className='w-full bg-slate-500'>MERHABA <a href="/test2">Test</a></div>}
    ] ,
    slidesToShow: 1
  },
};