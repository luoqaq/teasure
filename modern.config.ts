import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  source: {
    mainEntryName: 'index',
  },
  html: {
    disableHtmlFolder: true,
  },
  output: {
    distPath: {
      html: '',
    },
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack', // Set to 'experimental-rspack' to enable rspack ⚡️🦀
      // bundler: 'webpack', // Set to 'experimental-rspack' to enable rspack ⚡️🦀
    }),
    tailwindcssPlugin(),
  ],
});
