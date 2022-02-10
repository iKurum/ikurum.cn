import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const resolve = require('path').resolve

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: './', // 测试环境
  resolve: {
    alias: [{
      find: "@", replacement: resolve(__dirname, 'src'),
    }, {
      find: "@style", replacement: resolve(__dirname, 'src/style'),
    }, {
      find: "@common", replacement: resolve(__dirname, 'src/common'),
    }, {
      find: "@components", replacement: resolve(__dirname, 'src/components'),
    }, {
      find: "@ts", replacement: resolve(__dirname, 'src/d.ts'),
    }],
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx']
  }
})
