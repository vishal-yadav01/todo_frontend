import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-redirects',
      writeBundle() {
        const src = resolve(__dirname, 'public/_redirects');
        const dest = resolve(__dirname, 'dist/_redirects');
        if (fs.existsSync(src)) fs.copyFileSync(src, dest);
      },
    },
  ],
  build: {
    sourcemap: false,
    outDir: 'dist',
  },
});
