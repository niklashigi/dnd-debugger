import type { UserConfig } from "vite";

import reactPlugin from "@vitejs/plugin-react";

const config: UserConfig = {
  plugins: [reactPlugin()],
};

export default config;
