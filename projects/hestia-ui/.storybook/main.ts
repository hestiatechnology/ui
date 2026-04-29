import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      define: {
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({ experimentalZoneless: false }),
      },
    });
  },
  staticDirs: [
    { from: "../src/lib/icons", to: "/icons" },
  ],
};
export default config;
