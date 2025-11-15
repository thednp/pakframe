import { defineConfig, type PluginOption } from "vite";
// import pakframe from "@vitejs/plugin-pakframe";
import pakframe from "pakframe/vite";
import tailwind from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    pakframe() as PluginOption,
    tailwind()
  ],
  // ssr: {
    // optimizeDeps: {
    //   noDiscovery: true,
    //   exclude: [],
    //   include: [],
    // }
  // }
});
