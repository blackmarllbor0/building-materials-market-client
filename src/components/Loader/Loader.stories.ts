import type { Meta, StoryObj } from '@storybook/vue3';
import Loader from './LoaderComponent.vue';

const meta: Meta<typeof Loader> = {
  title: 'Loaders/Hourglass',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'The entire size you pass will be transported to the "em" unit.',
    },
    color: {
      options: ['red', 'primary', 'black', 'green'],
      table: {
        defaultValue: { summary: 'red' },
        type: { summary: 'select' },
      },
    },
    title: {
      table: {
        defaultValue: { summary: 'Hourglass Loader' },
        type: { summary: 'text' },
      },
      description: 'The inscription will be displayed when you hover the cursor over loader',
    },
  },
  args: {
    size: 5,
  },
};

export default meta;
type Story = StoryObj<typeof meta>

export const Red: Story = {
  args: { color: 'red' },
};

export const Green: Story = {
  args: { color: 'green' },
};

export const Primary: Story = {
  args: { color: 'primary' },
};

export const Black: Story = {
  args: { color: 'black' },
};

export const Big: Story = {
  args: { size: 10 },
};

export const Medium: Story = {
  args: { size: 5 },
};

export const Small: Story = {
  args: { size: 1 },
};
