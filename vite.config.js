import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //   host: 'sgg.vidarelevante.com.br',
    //   port: 5173,
    //   strictPort: true,
    //   cors: true
    // },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
