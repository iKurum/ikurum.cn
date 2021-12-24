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
  }
})
