import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import path from "path";
const ViteAliases = require("./plugins/ViteAliases");
import { createHtmlPlugin } from "vite-plugin-html";
const CreateHtmlPlugin = require("./plugins/CreateHtmlPlugin");
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig({
  optimizeDeps: {
    exclude: [], // 不进行依赖预构建
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //     "@assets": path.resolve(__dirname, "./src/assets"),
  //   },
  // },
  envPrefix: "ENV_", // 配置vite注入客户端环境教研的ENV前缀，默认是 VITE_
  css: {
    // 对css的行为进行配置
    modules: {
      // 是对css模块化的默认行为进行覆盖
      localsConvention: "camelCaseOnly",
      scopeBehaviour: "global", // "global"  默认local，开启模块化
    },
    preprocessorOptions: {
      // key+config，key代表预处理器的名
      less: {
        // less中的数学计算
        // 在webpack里面就给less-loader配置即可
        math: "always",
        globalVars: {
          // 定义全局变量
          mainColor: "red",
        },
      },
      // sass: {},
    },
    devSourcemap: true, // 开启sourceMap，默认为false
    // 配置postcss 内联格式，如果不配置，vite则会自动找postcss.config.js
    // postcss: {
    //   plugins: [postcssPresetEnv()],
    // },
  },
  plugins: [
    ViteAliases(),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: "首页", // 向html注入变量 title
    //     },
    //   },
    // }),
    CreateHtmlPlugin({
      inject: {
        data: {
          title: "首页",
        },
      },
    }),
    viteMockServe(), // 开箱即用，会自动找根目录下的mock文件夹
  ],
});
