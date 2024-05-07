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
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? "development",
    platform: env.platform ?? "desktop",
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      /* 
        Первая настройка name - название самого микро фронтенда  
      */
      name: "admin",
      /* 
        Далее указываем название файла, которое грубо говоря, будет удаленно подключатся к host контейнеру 
        filename - по умолчание название  remoteEntry.js  
      */
      filename: "remoteEntry.js",
      /* 
        Самая важная опция здесь мы указываем что мы хотим предоставить к приложению контейнеру в нашем случае
        на ружу отдаем наш роутер
      */
      exposes: {
        "./Router": "./src/router/Router.tsx",
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
