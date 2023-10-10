// import type { Preview } from '@storybook/vue3';
//
// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//   },
// };
//
// export default preview;

import '@quasar/extras/roboto-font/roboto-font.css';
// These are optional
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

// Loads the quasar styles and registers quasar functionality with storybook
import 'quasar/dist/quasar.css';
import { setup } from '@storybook/vue3';
import { Quasar } from 'quasar';

// This is also where you would setup things such as pinia for storybook

setup((app) => {
  app.use(Quasar, {});
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
