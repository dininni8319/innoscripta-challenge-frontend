import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   hmr:{
  //     host: "0.0.0.0",
  //     clientPort: 5173
  //   }, // needed for the Docker Container port mapping to work
  //   strictPort: true,
  //   port: 5173, // you can replace this port with any port
  // },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})
