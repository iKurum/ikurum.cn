import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const resolve = require('path').resolve
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{
      find: "@", replacement: resolve(__dirname, 'src'),
    }],
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx']
  },
  build: {
    rollupOptions: {
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //     }
      //   }
      // }
    }
  }
})
