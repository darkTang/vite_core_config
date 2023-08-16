import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // 配置rollup的一些构建策略
    rollupOptions: {
      output: {
        // 静态资源，不包括js脚本
        assetFileNames: "[name]-[hash].[ext]",
      },
    },
    assetsInlineLimit: 4096, // 默认为4Kb，小于则会用base64
    // outDir: "dist"  配置输出跟目录，默认第三天
    // assetsDir: "assets",
    // emptyOutDir: true  // 默认为true，每次打包都会先清除dist目录
  },
});
