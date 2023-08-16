import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// export default defineConfig({
//     optimizeDeps: {
//         exclude: []   // 指定哪些依赖不进行依赖预构建
//     }
// })

// 策略模式
const envResolver = {
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
};

// command: build | serve
// mode 默认为 development | production
// mode:
export default defineConfig(({ command, mode }) => {
  // 是build还是serve取决于是执行 vite 还是 vite build
  console.log("command", command);
  const env = loadEnv(mode, process.cwd(), ""); // process.cwd() 返回当前node进程的工作目录(终端启动的目录)，第三个参数默认为 .env
  console.log(env);  // 此时这里的env就存在 APP_KEY
  return envResolver[command]();
});

// vite.config.js是服务端运行的
