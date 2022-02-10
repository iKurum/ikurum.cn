import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// import { markdown } from './src/components/md/mdToJs'

const resolve = require('path').resolve
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{
      find: "@", replacement: resolve(__dirname, 'src'),
    }, {
      find: "@style", replacement: resolve(__dirname, 'src/style'),
    }, {
      find: "@components", replacement: resolve(__dirname, 'src/components'),
    }, {
      find: "@ts", replacement: resolve(__dirname, 'src/d.ts'),
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
