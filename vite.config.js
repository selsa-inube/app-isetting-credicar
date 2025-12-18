import vitesconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitesconfigPaths(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        // "./App": "./src/App",
        // "./usePortalData": "./src/hooks/usePortalData",
        // "./ErrorPage": "./src/components/layout/ErrorPage",
        // "./SelectBusinessUnitsRoutes": "./src/routes/selectBusinessunits",
        "./MainNavigation": "./src/routes/mainNavigation",
        "./Accordion": "./src/design/data/accordions/index.tsx",
        "./BoxAttribute":
          "./src/design/feedback/boxAttributes/containerAttribute/index.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 3000,
    strictPort: true,
    cors: true,
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@enum": path.resolve(__dirname, "./src/enum"),
      "@design": path.resolve(__dirname, "./src/design"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@ptypes": path.resolve(__dirname, "./src/types"),
      "@forms": path.resolve(__dirname, "./src/forms"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@events": path.resolve(__dirname, "./src/events"),
    },
  },
});
