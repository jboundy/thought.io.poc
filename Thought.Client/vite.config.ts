import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __API_URL__: env.REACT_APP_API_URL,
    },
    plugins: [react()],
  };
});
