import type { Preview } from "@storybook/react-vite";
import "aria-lab/styles.css";
import "aria-lab/theme/default.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: "light", value: "#ffffff" },
        dark: { name: "dark", value: "#09090b" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light" },
  },
};

export default preview;
