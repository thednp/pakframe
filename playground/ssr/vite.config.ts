import { defineConfig } from "vite";
import pakframe from "@vitejs/plugin-pakframe";
// import pakframe from "pakframe/vite";
import tailwind from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    pakframe(),
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
