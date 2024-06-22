import type { UserConfig } from "vite";

import reactPlugin from "@vitejs/plugin-react";

const config: UserConfig = {
  server: {
    port: 5656,
  },
  plugins: [reactPlugin()],
};

export default config;
