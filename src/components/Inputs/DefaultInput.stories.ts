import type { Meta, StoryObj } from '@storybook/vue3';
import DefaultInput from './DefaultInput.vue';

const meta: Meta<typeof DefaultInput> = {
  title: 'components/Inputs/DefaultInput',
  component: DefaultInput,
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
    disable: {
      control: 'boolean',
      description: `Can be useful when interacting with checkboxes. For example, arranging delivery.
      If true, the field becomes unavailable for input.`,
      defaultValue: { summary: false },
    },
    labelColor: {
      defaultValue: { summary: '#000' },
    },
  },
  args: {
    width: '1000px',
    color: 'red',
    label: 'Input Label',
    disable: false,
    fontSize: '15px',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { disable: false },
};

export const Disable: Story = {
  args: { disable: true },
};

export const LongerWidth: Story = {
  args: { width: '1000px' },
};

export const MiddleWidth: Story = {
  args: { width: '500px' },
};

export const ShortWidth: Story = {
  args: { width: '100px' },
};
