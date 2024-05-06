import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Mulearn-Todo-Task1/",
  plugins: [react()],
});
