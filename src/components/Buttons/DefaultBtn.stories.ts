import type { Meta, StoryObj } from '@storybook/vue3';
import DefaultBtn from './DefaultBtn.vue';

const meta: Meta<typeof DefaultBtn> = {
  title: 'components/Buttons/DefaultBtn',
  component: DefaultBtn,
  argTypes: {
    bgColor: { control: 'color' },
    title: { control: 'text' },
    color: { control: 'color' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = {
  args: {
    bgColor: 'red',
    title: "I'm Red",
    color: 'white',
  },
};

export const Blue: Story = {
  args: {
    bgColor: 'blue',
    title: "I'm blue",
    color: 'white',
  },
};

export const Black: Story = {
  args: {
    bgColor: 'black',
    title: "I'm black",
    color: 'white',
  },
};
