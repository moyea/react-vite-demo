import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import reactPluginSvg from 'vite-plugin-react-svg'

export default defineConfig({
  build: {
    outDir:'build'
  },
  plugins: [
    tsConfigPaths(),
    reactPluginSvg()
  ]
})