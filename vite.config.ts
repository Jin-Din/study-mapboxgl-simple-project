import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";

import createPlugins from "./vite/plugins";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_APP_CONTEXT_PATH,
    plugins: createPlugins(env, command === "build"),
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 内网服务器-测试环境
          target: "http://172.16.60.137:7777/",
          // 正式互联网环境
          // target: 'http://gz.sxsty.org.cn:10091',
          //开发环境
          // target: 'http://192.168.3.114:7777/',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
        ["/sjzt-api"]: {
          //数据中台
          // 内网服务器
          // target: 'http://172.16.60.116:8000/',
          //互联网环境
          // target: 'http://123.139.56.114:8801',
          // 正式互联网环境
          target: "https://gz.sxsty.org.cn:10091",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + "/sjzt-api"), ""),
        },
        ["/ywzx-api"]: {
          //业务中心的服务代理
          // 正式互联网环境
          target: "https://gz.sxsty.org.cn:19091",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + "/ywzx-api"), ""),
        },
      },
      hmr: {
        overlay: false,
      },
    },
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "~": resolve(__dirname, "./"),
        "@public": resolve(__dirname, "./public"),
        "@": resolve(__dirname, "./src"),
        "@comps": resolve(__dirname, "src/components"),
        "@assets": resolve(__dirname, "src/assets"),
        "@api": resolve(__dirname, "src/api"),
        "@libs": resolve(__dirname, "src/libs"),
        "@utils": resolve(__dirname, "src/utils"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@views": resolve(__dirname, "src/views"),
        "@store": resolve(__dirname, "src/store"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "~/src/assets/styles/element/index.scss" as *;`, //element 独立处理// 全局引入element-plus样式文件
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    build: {
      outDir: env.VITE_APP_OUT_DIR,
      commonjsOptions: {
        //默认内部只处理了node_modules，需要将"packages/"也标识处理 --mars3d
        include: /node_modules|packages/,
      },
      minify: "terser",
      terserOptions: {
        compress: {
          //打包移除 console.log 和 debugger
          drop_console: command === "build",
          drop_debugger: command === "build",
        },
        format: {
          comments: false, // 删除注释comments
        },
      },
      rollupOptions: {
        //解决isCE
        external: ["vue"],
        output: {
          globals: {
            vue: "vue",
          },
        },
      },
    },
  };
});
