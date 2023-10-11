import type { Meta, StoryObj } from '@storybook/vue3';

import MyHeader from './Header.vue';

const meta = {
  title: 'Example/Header',
  component: MyHeader,
  render: (args: any) => ({
    components: { MyHeader },
    setup() {
      return { args };
    },
    template: '<my-header :user="args.user" />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};
