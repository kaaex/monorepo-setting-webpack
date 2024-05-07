import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev: boolean = options.mode === "development";

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const babelLoader = buildBabelLoader(options);

  return [assetLoader, scssLoader, tsLoader /* babelLoader */, svgrLoader];
}

/* {

  module: {
    TODO: `rules` - {
      rules: в массиве рулс, указываются те самые лоудеры в определенном порядке 
      ВАЖНО!!! ПОРЯДОК ВАЖЕН 
    }

    TODO: `test` - {
          test: указывается регулярка, название тех файлов которые мы хотим обрабатывать (обычно расширение)
    }

    TODO: `use` - {
          use: указывается название лоудера, можно передавать массив или одиночное название
           ts-loader умеет работать с JSX, если мы не использовали тайпскрипт: нужен был бы babel-loader
    }

    TODO: `exclude` - {
          exclude: то, что мы не обрабатываем
    }

    rules: [
      Лоудер для обработки assets
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      Лоудер для обработки CSS файлов
      {
          test: /\.css$/i,
          use: [ 
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName - настраивает уникальный путь для module css 
                  localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]",
                },
              },
            },
            "css-loader"
          ],
      },

      Лоудер для поддержки тайп скрипта
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers - функция позволяет менять пользовательский интерфейс без перезагрузки страницы
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: true, - ключ позволяет исключать проверку тайп скрипта при билде проекта
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      };

      Лоудер позволяет использовать svg файлы в стиле компонентов
      {
        test: /\.svg$/i,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      };
    ],
  },

} */
