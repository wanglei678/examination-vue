import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: './',
  server: {
    port: 8443,
    open: true,
    proxy: {
      '/ooo': {
        target: 'https://127.0.0.1:443', // node服务端口
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ooo/, '')
      }
    }
  },
  build: {
    target: 'es2015'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@router': path.resolve(__dirname, 'src/router')
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/styles/variable.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
}));
