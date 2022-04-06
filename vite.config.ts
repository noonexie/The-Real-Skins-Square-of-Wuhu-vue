import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  // 配置文件别名 vite1.0 是 /@/  2.0改为/@
  //这里是将src目录配置别名为/@方便在项目中导入src目录下的文件
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 强制预构建插件包
  // optimizeDeps: {
  //   include: ["axios"],
  // },
  // 打包配置
  build: {
    base: "./",
    // target: "modules",
    // outDir: "dist", // 指定输出路径
    // assetsDir: "assets", //指定生成静态资源的存放路径
    // minify: "terser", //混淆器，terset构建后文件体积更小
  },
  // 本地运行配置，及反向代理配置
  server: {
    https: false, // 是否开启 https
    open: false, // 是否自动在浏览器打开
    port: 3030, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 后台接口
        changeOrigin: true, //是否设置同源，输入是的
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
