import type { Meta, StoryObj } from '@storybook/vue3';
import SearchInput from './SearchInput.vue';

const meta: Meta<typeof SearchInput> = {
  title: 'components/Inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'You can pass the size in any unit of measurement (px, em).',
    },
    color: {
      control: 'color',
      description: 'This value is responsible for illuminating the bottom strip when focusing.',
    },
    btnColor: {
      control: 'color',
    },
    labelColor: {
      defaultValue: { summary: '#000' },
    },
  },
  args: {
    btnColor: 'red',
    width: '850px',
    color: 'red',
    label: 'Search',
    fontSize: '15px',
    labelColor: 'black',
  },
};

export default meta;
type Story = StoryObj<typeof meta>

export const LongerWidth: Story = {
  args: { width: '850px' },
};

export const MiddleWidth: Story = {
  args: { width: '500px' },
};

export const ShortWidth: Story = {
  args: { width: '100px' },
};
