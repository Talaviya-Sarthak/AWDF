import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite configuration for the TaskFlow dashboard.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
