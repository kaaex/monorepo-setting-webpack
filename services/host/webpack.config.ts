import webpack from "webpack";
import path from "path";
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
  buildWebpack,
} from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  platform?: BuildPlatform;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
  };

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    platform: env.platform ?? "desktop",
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      /* 
        Первая настройка name - название самого микро фронтенда  
      */
      name: "host",
      /* 
        Далее указываем название файла, которое грубо говоря, будет удаленно подключатся к host контейнеру 
        filename - по умолчание название  remoteEntry.js  
      */
      filename: "remoteEntry.js",
      /* 
        Самая важная опция здесь мы указываем что мы хотим предоставить к приложению контейнеру в нашем случае
        на ружу отдаем наш роутер
      */
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },
      /* 
        В shared указываются как библиотеки у нас общие и какие должны шарится
      */
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
