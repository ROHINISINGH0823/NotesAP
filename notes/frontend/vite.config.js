import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.entry.js', // Adjust path if necessary
    },
  },
});