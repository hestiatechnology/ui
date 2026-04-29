import type { Preview } from "@storybook/angular";
import { withThemeByClassName } from "@storybook/addon-themes";

// Make html/body track the active theme background so the canvas flips correctly.
// .sbdocs-preview override is needed because the Docs page uses its own Storybook
// theme (always light) that sets an explicit white background on the story card.
const themeStyle = document.createElement("style");
themeStyle.textContent = `
  html, body {
    background: var(--h-background);
    color: var(--h-foreground);
    transition: background 200ms, color 200ms;
    margin: 0;
  }
  html.dark .sbdocs-preview {
    background: var(--h-background) !important;
  }
`;
document.head.appendChild(themeStyle);

// Inject the textile SVG sprite so h-textile-icon resolves #ti-* symbols.
fetch("/icons/textile-icons.svg")
  .then(r => r.text())
  .then(svg => {
    const div = document.createElement("div");
    div.innerHTML = svg;
    document.body.insertBefore(div.firstElementChild!, document.body.firstChild);
  });

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "",
        Dark:  "dark",
      },
      defaultTheme: "Light",
    }),
  ],
  parameters: {
    // Disable the built-in backgrounds toolbar — theme switching handles it.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
