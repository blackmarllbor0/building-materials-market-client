import type { Meta, StoryObj } from '@storybook/vue3';
import DropdownBtns from './DropdownBtns.vue';

const meta: Meta<typeof DropdownBtns> = {
  title: 'components/Buttons/DropdownBtns',
  component: DropdownBtns,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['red', 'primary', 'black', 'green'],
    },
    list: {
      control: 'object',
      description: 'ID, name and click handler',
    },
  },
  args: {
    label: 'Button',
    color: 'red',
    list: [{ id: 1, name: 'One', click: (...args: any) => { /** event clicker */ } }],
  },
};

export default meta;
type Story = StoryObj<typeof meta>

export const Red: Story = {
  args: { color: 'red' },
};

export const Black: Story = {
  args: { color: 'black' },
};

export const Green: Story = {
  args: { color: 'green' },
};

export const Primary: Story = {
  args: { color: 'primary' },
};
